"use client";
import { useState } from "react";
import Link from "next/link"; 
import styles from "./signup.module.css";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    class_name: "",
  });

  const route = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, class_name } = formData;

    if (!username || !email || !password || !class_name) {
      alert(" All fields are required.");
      return;
    }

    setLoading(true);

    try {
      // Check if the user already exists
      const res1 = await fetch("/api/userExist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res1.ok) {
        throw new Error("Failed to check user existence");
      }

      const data = await res1.json();
      if (data.user) {
        alert("User already exists! Please login instead.");
        setLoading(false);
        return; // Stops signup
      }

      // If user does not exist, proceed with signup
      const res2 = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res2.ok) {
        alert("Signup successful!");
        setFormData({ username: "", email: "", password: "", class_name: "" }); 
        route.replace('/dashboard');
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(" An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Sign Up</h2>

        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className={styles.input} required />

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className={styles.input} required />

        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className={styles.input} required />

        <input type="text" name="class_name" placeholder="Class Name" value={formData.class_name} onChange={handleChange} className={styles.input} required />

        <button type="submit" className={styles.submit} disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <div className={styles.signupText}>
        <p>Already have an account? <Link href="/login" className={styles.link}>Login</Link></p>
      </div>
    </div>
  );
}
