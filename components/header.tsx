import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 bg-background/75 py-6 px-10">
      <nav className="container flex mx-auto max-w-3xl items-center justify-between">
        <div>
          <Link href={"/"} className="font-serif text-2xl font-bold">
            JAY
          </Link>
        </div>
        <ul className="flex items-center gap-3 lg:gap-6 font-light text-muted-foreground">
          <li className="transition-colors hover:text-foreground text-sm lg:text-base">
            <Link href="/posts">Posts</Link>
          </li>
          <li className="transition-colors hover:text-foreground text-sm lg:text-base">
            <Link href="/projects">Projects</Link>
          </li>{" "}
          <li className="transition-colors hover:text-foreground text-sm lg:text-base">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
        <div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};
