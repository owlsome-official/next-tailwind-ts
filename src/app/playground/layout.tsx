import { IcBaselineHome, IcBaselineNorthEast } from "@/components/Icons";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next.js App Router Mini-showcase",
};

const PlaygroundLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className="mb-8 flex w-full justify-between text-white">
        <div className="flex cursor-pointer items-center gap-1 self-start rounded-lg px-2 py-0.5 hover:bg-black/10">
          <IcBaselineHome />
          <Link href={"/"}>Go home</Link>
        </div>
        <div className="flex cursor-pointer items-center gap-1 self-end rounded-lg border border-solid border-black/5 bg-black/10 px-2 py-0.5 hover:bg-black/20">
          <Link
            href={"https://app-router.vercel.app/"}
            rel="noopener noreferrer"
            target="_blank"
          >
            Example with App Router Playground
          </Link>
          <IcBaselineNorthEast />
        </div>
      </div>
      <div className="w-full">
        <div className="glass-effect mb-2 flex items-center justify-center rounded-lg p-2">
          NavBar
        </div>
        {children}
      </div>
    </>
  );
};

export default PlaygroundLayout;
