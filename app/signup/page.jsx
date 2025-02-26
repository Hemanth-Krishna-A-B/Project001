"use client";
import { useState } from "react";
import Link from "next/link"; // Import Link from Next.js
import styles from "./signup.module.css";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    className: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing up with:", formData);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Sign Up</h2>
        
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className={styles.input} required />

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className={styles.input} required />

        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className={styles.input} required />

        <input type="text" name="className" placeholder="Class Name" value={formData.className} onChange={handleChange} className={styles.input} required />

        <button type="submit" className={styles.submit}>Sign Up</button>
      </form>

      {/* Signup text and link */}
      <div className={styles.signupText}>
        <p>Already have an account? <Link href="/login" className={styles.link}>Login</Link></p>
      </div>
    </div>
  );
}
