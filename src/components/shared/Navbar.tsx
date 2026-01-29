import Image from "next/image";
import CustomButton from "./CustomButton";
import Link from "next/link";

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

  return (
    <nav className="w-full flex justify-center items-center py-6">
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
        <div>
          <CustomButton
            btnName="Book Now"
            isLink
            href={`https://api.whatsapp.com/send/?phone=971585787558&text=${encodeURIComponent(
              "Hello, I'm interested in booking a yacht."
            )}`}
            invert={isLight}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
