import Link from "next/link";
import styles from "./homepage.module.css";

const Homepage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2 className={styles.titlename}>Present_IT</h2>
        <Link className={styles.loginButton} href="/login">
          Get Engaged
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
