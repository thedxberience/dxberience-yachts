"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  const [scrolled, setScrolled] = useState(false);
  const [reachedFooter, setReachedFooter] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);

  const handleDomChecking = useCallback(() => {
    if (document && footerRef.current) {
      const windowScrollHeight = document.documentElement.scrollHeight;
      const footerHeight = footerRef.current.getBoundingClientRect().height;
      const footerOffsetHeight = windowScrollHeight - footerHeight * 2 - 100;
      if (window.scrollY >= footerOffsetHeight) {
        setReachedFooter(true);
      } else {
        setReachedFooter(false);
      }
    }
  }, []);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      handleDomChecking();
    };
  }, [handleDomChecking]);

  function openWhatsapp() {
    window.open("https://wa.me/+971585787558", "_blank");
  }

  function toPageTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="footer relative w-full bg-bottom bg-cover"
    >
      <div className="absolute inset-0 bg-[#0B1615] bg-opacity-85" />
      <div className="relative w-full py-12 lg:py-16 text-white">
        <div className="w-11/12 max-w-7xl mx-auto flex flex-col gap-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr_1.1fr]">
            <div className="flex flex-col gap-4">
              <div className="relative w-[190px] h-[64px]">
                <Link href="/">
                  <Image
                    src="/dxberience_logo.png"
                    alt="Dxberience logo"
                    className="object-cover"
                    fill
                  />
                </Link>
              </div>
              <p className="text-sm text-white/80 max-w-xs">
                Luxury yachting, designed for those who expect more.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-sm tracking-[0.2em] uppercase text-white">
                Get in touch
              </h3>
              <p className="text-sm text-white/80">
                3320 Townsend Cremela Ground Free zone estate, Dubai
              </p>
              <div className="flex flex-col gap-3 text-sm text-white/80">
                <div className="flex items-center gap-3">
                  <Image src="/phone.svg" alt="Phone" width={18} height={18} />
                  <a href="tel:+971585787558">+971 58 578 7558</a>
                </div>
                <div className="flex items-center gap-3">
                  <Image src="/window.svg" alt="Email" width={18} height={18} />
                  <a href="mailto:support@thedxberience.com">
                    support@thedxberience.com
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-sm tracking-[0.2em] uppercase text-white">
                Stay up to date
              </h3>
              <form className="w-full">
                <div className="flex w-full items-center justify-between border border-white/70 px-4 py-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="ENTER EMAIL"
                    className="w-full bg-transparent text-xs tracking-[0.2em] uppercase text-white placeholder:text-white/70 outline-none"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-3 border border-white bg-white px-4 py-2 text-xs uppercase text-black"
                  >
                    Submit
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-black text-[10px]">
                      →
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="border-t border-white/40 pt-6">
            <nav className="flex flex-wrap items-center justify-center gap-6 text-xs tracking-[0.2em] uppercase text-white/90">
              <Link href="/#about">About</Link>
              <Link href="/yachts">Yacht for Hire</Link>
              <Link href="/#contact">Contact Us</Link>
              <Link href="#">Blogs</Link>
              <Link href="#">Terms & Conditions</Link>
              <Link href="#">Privacy Policy</Link>
            </nav>
          </div>

          <div className="border-t border-white/40 pt-6 flex flex-col items-center gap-3">
            <span className="text-xs tracking-[0.3em] uppercase text-white/80">
              Follow Us
            </span>
            <Link
              href="https://www.instagram.com/thedxberience?igsh=MTdyY2k5NTdpZW5kcA=="
              target="_blank"
            >
              <Image
                width={24}
                height={24}
                src="/footer_insta.svg"
                alt="Instagram"
              />
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col fixed right-5 ${reachedFooter ? "bottom-60 md:bottom-40" : "bottom-6"
          } md:right-5  gap-5 z-30 md:flex-row`}
      >
        <button
          type="button"
          onClick={openWhatsapp}
          className="flex items-center justify-center"
        >
          <Image
            src="/images/whatsapp.png"
            alt="WhatsApp"
            width={40}
            height={40}
          />
        </button>
        {scrolled && (
          <button
            type="button"
            onClick={toPageTop}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black border border-white/60"
          >
            <Image
              src="/to_page_top.svg"
              alt="scroll-to-top"
              width={20}
              height={20}
            />
          </button>
        )}
      </div>
    </footer>
  );
}

export default Footer;
