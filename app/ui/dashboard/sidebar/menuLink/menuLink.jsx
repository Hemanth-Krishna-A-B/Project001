import Link from "next/link";
import styles from "./menuLink.module.css";

export default function MenuLink({ item }) {
    const Icon = item.icon;
    return (
        <Link href={item.path} className={styles.container}>
            <Icon className={styles.icon} /> {}
            <span>{item.title}</span>
        </Link>
    );
}
