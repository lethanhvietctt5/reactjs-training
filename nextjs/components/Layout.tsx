import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  return (
    <div className="w-1/2 mx-auto my-5">
      <div className="text-5xl font-black text-center my-4">Blogs app</div>
      <div className="flex justify-evenly my-5">
        <Link href="/">
          <div
            className={
              router.pathname === "/"
                ? "text-xl cursor-pointer border-b-8 border-blue-400 px-2"
                : "text-xl cursor-pointer"
            }
          >
            Home
          </div>
        </Link>

        <Link href="/posts">
          <div
            className={
              router.pathname === "/posts"
                ? "text-xl cursor-pointer border-b-8 border-blue-400 px-2"
                : "text-xl cursor-pointer"
            }
          >
            Posts
          </div>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default Layout;
