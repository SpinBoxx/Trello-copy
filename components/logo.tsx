import { cn } from "@/lib/utils";
import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";

const headingFont = localFont({
  src: "../public/fonts/font.woff2",
});

const Logo = () => {
  return (
    <Link href="/">
      <div className="hidden items-center gap-x-2 transition hover:opacity-75 md:flex">
        <Image src="/logo.svg" alt="Logo" width={30} height={30} />
        <p className={cn(headingFont.className, "text-lg text-neutral-700")}>
          Taskify
        </p>
      </div>
    </Link>
  );
};

export default Logo;
