import Link from "next/link";
import { FC } from "react";

const Logo: FC = () => {
    return (
        <Link
            href="/"
        >
            <a
                className="text-2xl font-bold"
            >
                SpaceBlog
            </a>
        </Link>
    );
}

export default Logo;