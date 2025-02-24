
"use client";

import Link from "next/link";
import styles from "./menuLink.module.css";
import { usePathname } from "next/navigation";

export default function MenuLink({ item }) {
    const pathName = usePathname(); // Get the current route path

    return (
        <Link 
            href={item.path} 
            className={`${styles.container} ${pathName === item.path ? styles.active : ""}`}
        >
            {item.icon}
            <span>{item.title}</span>
        </Link>
    );
}
