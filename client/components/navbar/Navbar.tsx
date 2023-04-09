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
            Features
          </Link>
        </li>
        <li
          className={classes.navbarItem}
        >
          <Link
            href="/"
          >
            Products
          </Link>
        </li>
        <li
          className={classes.navbarItem}
        >
          <Link
            href="/"
          >
            Testimonial
          </Link>
        </li>
        <li
          className={classes.navbarItem}
        >
          <Link
            href="/"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;