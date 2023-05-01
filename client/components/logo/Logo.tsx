import Link from "next/link";
import { FC } from "react";

const Logo: FC = () => {
  return (
    <Link
      href="/"
      className="text-2xl font-bold"
    >
      SpaceBlog
    </Link>
  );
}

export default Logo;