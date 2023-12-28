"use client";

import { IcBaselineDone } from "@/components/Icons";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
const Template = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const pathname = usePathname().split("/").at(-1);
  return (
    <div className="flex gap-2">
      <div className="glass-effect flex min-h-[200px] w-1/4 flex-col items-center justify-center rounded-lg p-2">
        {["", "red", "green", "blue"].map((color) => {
          const path = "/playground/" + color;
          return (
            <button
              key={color}
              type="button"
              className={[
                "m-2 flex w-full items-center justify-center gap-1 rounded-lg border border-solid hover:bg-black/30",
                color === pathname
                  ? "border-white bg-white/20"
                  : "border-black/5 bg-black/10",
              ].join(" ")}
              onClick={() => {
                router.push(path);
              }}
            >
              {color?.toUpperCase() || "DEFAULT"}
              {color === pathname && <IcBaselineDone />}
            </button>
          );
        })}
      </div>
      <div className="glass-effect w-3/4 rounded-lg">{children}</div>
    </div>
  );
};

export default Template;
