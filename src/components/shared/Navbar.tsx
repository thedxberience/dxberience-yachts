"use client";

import Image from "next/image";
import CustomButton from "./CustomButton";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Yacht for Hire", href: "/yachts" },
  { label: "Contact Us", href: "/#contact" },
];

type NavbarProps = {
  variant?: "light" | "dark";
};

const Navbar = ({ variant = "dark" }: NavbarProps) => {
  const isLight = variant === "light";
  const linkTextColor = isLight ? "text-primary" : "text-white";
  const logoFilter = isLight ? "invert" : "";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative z-50 w-full flex justify-center items-center py-6">
      <div className="w-11/12 flex justify-between items-center">
        <div className="dxberience_logo relative w-[136.34px] h-[33.29px] lg:w-[172px] lg:h-[42px]">
          <Link href={"/"}>
            <Image
              src={"/dxberience_logo.png"}
              alt="Dxberience Logo"
              fill
              className={`object-cover ${logoFilter}`}
            />
          </Link>
        </div>

        <div
          className={`hidden lg:flex items-center gap-10 text-xs tracking-[0.2em] uppercase ${linkTextColor} font-noah`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-opacity hover:opacity-80"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="hidden lg:block">
          <CustomButton
            btnName="Book Now"
            isLink
            href={`https://api.whatsapp.com/send/?phone=971585787558&text=${encodeURIComponent(
              "Hello, I'm interested in booking a yacht."
            )}`}
            invert={isLight}
          />
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`lg:hidden relative h-5 w-6 ${linkTextColor}`}
        >
          <span
            className={`absolute left-0 top-0 block h-[2px] w-6 bg-current transition-transform duration-200 ${
              isOpen ? "translate-y-[9px] rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-[9px] block h-[2px] w-6 bg-current transition-opacity duration-200 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 top-[18px] block h-[2px] w-6 bg-current transition-transform duration-200 ${
              isOpen ? "-translate-y-[9px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-sm lg:hidden">
          <div className="w-11/12 mx-auto py-6 flex flex-col gap-5 text-white text-sm tracking-[0.2em] uppercase">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-opacity hover:opacity-80"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <CustomButton
                btnName="Book Now"
                isLink
                href={`https://api.whatsapp.com/send/?phone=971585787558&text=${encodeURIComponent(
                  "Hello, I'm interested in booking a yacht."
                )}`}
                invert
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
