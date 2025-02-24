"use client"
import { usePathname } from 'next/navigation'
import styles from './navbar.module.css'
import { MdMessage, MdNotificationsNone, MdSearch } from 'react-icons/md';

export default function Navbar(){
    const pathname = usePathname();

    return(
        <div className={styles.container}>
            <div className={styles.title}>
                {pathname.split('/').pop().toUpperCase()}
            </div>
            <div className={styles.menu}>
                <div className={styles.icons}>
                    <MdNotificationsNone/>
                    <MdMessage/>
                </div>
            </div>
        </div>

    )
}