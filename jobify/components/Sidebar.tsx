"use client";
import logo from "@/assets/logo.svg";
import links from "@/utils/links";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar: React.FC = (): React.ReactElement => {
  const pathname = usePathname();
  return (
    <aside className="py-4 px-8 bg-muted h-full ">
      <Link href={"/jobs"}>
        <Image src={logo} alt="logo" className="me-auto" />
      </Link>
      <div className="flex flex-col mt-20 gap-y-4">
        {links.map((link, index) => (
          <Button
            asChild
            key={link.href}
            variant={pathname === link.href ? "default" : "link"}
          >
            <Link
              href={link.href}
              className="flex items-center !justify-start gap-x-2"
            >
              {link.icon} <span className="capitalize">{link.label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
