"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./login.module.css";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    className: "",
    accessCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);
  };

  const handleReset = () => {
    setFormData({
      username: "",
      password: "",
      className: "",
      accessCode: "",
    });
  };

  const handleGetPresentation = () => {
    console.log("Fetching presentation with code:", formData.accessCode);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>

        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className={styles.input} required />

        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className={styles.input} required />

        <input type="text" name="className" placeholder="Class Name" value={formData.className} onChange={handleChange} className={styles.input} required />

        <button type="submit" className={styles.submit}>Login</button>
        
        {/* Fixed Reset Button */}
        <button type="button" className={styles.reset} onClick={handleReset}>Reset</button>
      </form>

      <div className={styles.presentation}>
        <input type="text" name="accessCode" placeholder="Enter Code" value={formData.accessCode} onChange={handleChange} className={styles.input} />
        <button onClick={handleGetPresentation} className={styles.getPresentation}>Get Presentation</button>
      </div>

      <div className={styles.signupText}>
        <p>Don't have an account? <Link href="/signup" className={styles.link}>Sign Up</Link></p>
      </div>
    </div>
  );
}
