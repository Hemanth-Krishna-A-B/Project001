import styles from "./sidebar.module.css";
import { HiOutlinePresentationChartBar, HiOutlineDocumentReport } from "react-icons/hi";
import { MdAssignmentAdd } from "react-icons/md";
import { BsDatabaseCheck } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6"; 
import { AiOutlineLogout } from "react-icons/ai";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";

const menuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "Presentations",
                path: "/dashboard/presentations",
                icon: <HiOutlinePresentationChartBar />,
            },
            {
                title: "Questions",
                path: "/dashboard/questions",
                icon: <MdAssignmentAdd />,
            },
            {
                title: "Reports",
                path: "/dashboard/reports",
                icon: <HiOutlineDocumentReport />,
            },
            {
                title: "Database",
                path: "/dashboard/myfiles",
                icon: <BsDatabaseCheck />,
            },
            {
                title: "Active Users",
                path: "/dashboard/users",
                icon: <FaUsers />,
            },
            {
                title: "LogOut",
                path: "/",
                icon: <AiOutlineLogout />,
            },
        ],
    },
];

export default function Sidebar() {
    return (
        <div className={styles.container}>
            {/*  User Section */}
            <div className={styles.user}>
                <Image className={styles.userImage} src="/noavatar.png" alt="User Avatar" width={50} height={50} />
                <div className={styles.userDetails}>
                    <span className={styles.username}>User Admin</span>
                    <span className={styles.userTitle}>Administrator</span>
                </div>
            </div>

            {/* Sidebar Menu */}
            <ul className={styles.list}>
                {menuItems.map((category) => (
                    <li key={category.title}>
                        {category.list.map((item) => (
                            <MenuLink key={item.title} item={item} />
                        ))}
                    </li>
                ))}
            </ul>

            {/* "Share" Button */}
            <div className={styles.buttonContainer}>
                <button className={styles.buttons}>Share</button>
            </div>
        </div>
    );
}
