import Image from "next/image";
import Link from "next/link";

import Logo from "@/public/기업로고_(주)인베랩.png";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        {/* Left: logo + text */}
        <div className="flex flex-1 items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-7 w-auto">
              <Image
                src={Logo}
                alt="Invelab 로고"
                className="h-7 w-auto"
                priority
              />
            </div>
            <span className="text-sm font-semibold tracking-tight text-slate-900">
              NatureX
            </span>
          </Link>
        </div>

        {/* Center: navigation */}
        <nav className="hidden flex-1 items-center justify-center gap-8 text-sm font-medium text-slate-600 sm:flex">
          <Link
            href="#features"
            className="transition hover:text-slate-900"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="transition hover:text-slate-900"
          >
            Pricing
          </Link>
          <Link
            href="#contact"
            className="transition hover:text-slate-900"
          >
            Contact
          </Link>
        </nav>

        {/* Right: call to action */}
        <div className="flex flex-1 justify-end">
          <button className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:px-5 sm:py-2 sm:text-sm">
            Get started
          </button>
        </div>
      </div>
    </header>
  );
}

