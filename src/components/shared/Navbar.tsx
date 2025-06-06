import Image from "next/image";
import CustomButton from "./CustomButton";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-center items-center py-6">
      <div className="w-11/12 flex justify-between items-center">
        <div className="dxberience_logo relative w-[136.34px] h-[33.29px] lg:w-[172px] lg:h-[42px]">
          <Link href={"/"}>
            <Image
              src={"/dxberience_logo.png"}
              alt="Dxberience Logo"
              fill
              className="object-cover"
            />
          </Link>
        </div>
        <div>
          <CustomButton
            btnName="Contact us"
            isLink
            href="https://api.whatsapp.com/send/?phone=971585787558&text=Hello%2C+I%27m+interested+in+your+yachts+for+rent"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
