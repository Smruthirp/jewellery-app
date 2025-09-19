import Link from "next/link";
import { SITE_TITLE } from "../../constants/global";
import { NAV_ITEMS } from "./header.constants";

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between bg-[#18392b] px-8 py-5 text-white shadow-md">
      <span className="text-2xl font-bold tracking-wide">{SITE_TITLE}</span>
      <nav>
        <ul className="flex gap-8 text-lg font-medium">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group relative transition-colors duration-300 hover:text-[#AFE1AF]"
              >
                <span className="transition-colors duration-300">
                  {item.label}
                </span>
                <span
                  className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#AFE1AF] transition-all duration-300 group-hover:w-full"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
