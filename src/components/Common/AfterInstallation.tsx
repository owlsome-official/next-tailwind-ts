import Image from "next/image";

import NextJSIcon from "@/assets/icons/nextjs.svg";
import ReactIcon from "@/assets/icons/react.svg";
import LogoImage from "@/assets/logo/logo.png";
import pkg from "../../../package.json";

const AfterInstallation = () => {
  return (
    <div className="w-full p-1.5">
      <div className="flex flex-col p-8">
        <div className="mb-4 flex flex-col justify-between sm:flex-row">
          <div className="bg-gradient-to-l from-accent to-accent bg-clip-text text-2xl font-bold text-transparent">
            After Installation
          </div>
          <div className="flex flex-col items-end gap-1 text-base">
            <div className="flex items-center gap-1 rounded-full bg-black/10 px-4 py-0.5 shadow-inner">
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
              <strong>Template v{pkg.version}</strong>
            </div>
            <div className="flex items-center gap-2 text-right text-xs font-bold">
              <a
                href="https://www.pantone.com/color-of-the-year/2024"
                target="_blank"
                className="flex items-center gap-1"
              >
                <div className="h-3 w-3 bg-[#FFBE98] shadow" />
                Pantone Color of the Year 2024 - Peach Fuzz
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto my-4 w-full max-w-xs rounded-xl bg-black/10 p-1.5 text-center shadow-inner">
          <div className="flex flex-col items-center">
            <Image
              priority
              src={LogoImage}
              alt="logo"
              className="w-[30vw] max-w-40"
            />
            <div className="py-0.5">
              <div>This is the way -- Mandalorian</div>
            </div>
          </div>
        </div>
        <div className="py-4">
          <strong>
            You have to edit text by name below this{" "}
            <span className="text-accent">
              {`(Spoiled Alert!, use "Find All and Replace")`}
            </span>
          </strong>
          <ul className="list-[upper-roman] break-words pl-8">
            <li>REPLACE_WITH_YOUR_PROJECT_NAME</li>
            <li>REPLACE_WITH_YOUR_APP_API</li>
            <li>REPLACE_WITH_YOUR_APP_GIT_LINK</li>
          </ul>
        </div>
        <sup className="opacity-10">
          จะรู้ได้ไงคนไหนคนไทย ถ้าแบ่งปันให้กันใช้ละคนไทยแน่นอน
        </sup>
      </div>
    </div>
  );
};

export default AfterInstallation;
