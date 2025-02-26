"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./login.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    class_name: "",
    accessCode: "",
  });

  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before submitting

    const { username, password, class_name } = formData;

    if (!username || !password || !class_name) {
      setError("❌ Error: All fields are required");
      return;
    }

    try {
      const res = await signIn("credentials", {
        username,
        password,
        class_name,
        redirect: false,
      });

      if (!res || res.error) {
        setError(res?.error || "Authentication failed");
        return;
      }

      router.replace("/dashboard"); // Redirect only on success
    } catch (error) {
      setError("❌ An unexpected error occurred");
      console.error("Login error:", error);
    }
  };

  const handleReset = () => {
    setFormData({
      username: "",
      password: "",
      class_name: "",
      accessCode: "",
    });
    setError(null);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>

        {error && <p className={styles.error}>{error}</p>}

        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className={styles.input} required />

        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className={styles.input} required />

        <input type="text" name="class_name" placeholder="Class Name" value={formData.class_name} onChange={handleChange} className={styles.input} required />

        <button type="submit" className={styles.submit}>Login</button>
        <button type="button" className={styles.reset} onClick={handleReset}>Reset</button>
      </form>

      <div className={styles.signupText}>
        <p>Don't have an account? <Link href="/signup" className={styles.link}>Sign Up</Link></p>
      </div>
    </div>
  );
}
