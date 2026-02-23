import Image from "next/image";

import NextJSIcon from "@/assets/icons/nextjs.svg";
import ReactIcon from "@/assets/icons/react.svg";
import LogoImage from "@/assets/logo/logo.png";
import pkg from "../../../package.json";

const AfterInstallation = () => {
  return (
    <div className="w-full p-1.5">
      <div className="flex flex-col p-8">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="text-accent text-2xl font-bold tracking-tight">
            After Installation
          </div>
          <div className="flex flex-col items-end gap-1.5 text-base">
            <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-4 py-1 shadow-sm backdrop-blur-sm">
              <Image
                priority
                src={ReactIcon}
                alt="react-icon"
                className="w-4"
              />
              <Image
                priority
                src={NextJSIcon}
                alt="nextjs-icon"
                className="w-4"
              />
              <strong className="text-sm">Template v{pkg.version}</strong>
            </div>
            <a
              href="https://www.pantone.com/color-of-the-year/2026"
              target="_blank"
              className="group flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-80"
            >
              <div className="h-3 w-3 rounded-sm border border-accent-soft/30 bg-[#F1F0EC] shadow-sm" />
              <span>Pantone 2026 — Cloud Dancer</span>
            </a>
          </div>
        </div>

        <div className="mx-auto my-4 w-full max-w-xs overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-2 text-center shadow-inner backdrop-blur-sm">
          <div className="flex flex-col items-center gap-1">
            <Image
              priority
              src={LogoImage}
              alt="logo"
              className="w-[30vw] max-w-40"
            />
            <p className="text-sm italic opacity-70">
              This is the way — Mandalorian
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
          <strong className="text-sm">
            You have to edit text by name below this{" "}
            <span className="text-primary-deep font-bold">
              {`(Spoiled Alert!, use "Find All and Replace")`}
            </span>
          </strong>
          <ul className="mt-2 list-[upper-roman] space-y-0.5 pl-8 text-sm wrap-break-word opacity-90">
            <li>REPLACE_WITH_YOUR_PROJECT_NAME</li>
            <li>REPLACE_WITH_YOUR_APP_API</li>
            <li>REPLACE_WITH_YOUR_APP_GIT_LINK</li>
          </ul>
        </div>

        <sup className="mt-4 opacity-5">
          จะรู้ได้ไงคนไหนคนไทย ถ้าแบ่งปันให้กันใช้ละคนไทยแน่นอน
        </sup>
      </div>
    </div>
  );
};

export default AfterInstallation;
