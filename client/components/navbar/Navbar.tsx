import Link from "next/link";
import { FC } from "react";
import classes from "./Navbar.module.css";

const Navbar: FC = () => {
    return (
        <nav className={classes.navbar}>
            <ul className={classes.navbarList}>
                <li
                    className={classes.navbarItem}
                >
                    <Link
                        href="/"
                    >
                        <a>
                            Features
                        </a>
                    </Link>
                </li>
                <li
                    className={classes.navbarItem}
                >
                    <Link
                        href="/"
                    >
                        <a>
                            Products
                        </a>
                    </Link>
                </li>
                <li
                    className={classes.navbarItem}
                >
                    <Link
                        href="/"
                    >
                        <a>
                            Testimonial
                        </a>
                    </Link>
                </li>
                <li
                    className={classes.navbarItem}
                >
                    <Link
                        href="/"
                    >
                        <a>
                            Contact
                        </a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
export default Navbar;