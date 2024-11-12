"use client";

import { SSRDelay } from "@/actions/utils";
import Spinner from "@/components/Loading/Spinner";
import Link from "next/link";
import { useState } from "react";
import { OverlayLoading } from "react-loading-randomizable";

const ActionZone = () => {
  const [loading, setLoading] = useState(false);
  const handleClickTestLoading = async () => {
    setLoading(true);
    await SSRDelay("simulate_delay");
    setLoading(false);
  };

  return (
    <div id="action" className="flex items-center justify-center gap-4">
      <OverlayLoading active={loading} className="absolute inset-0" />
      <div className="flex-1 text-center">
        {loading ? (
          <Spinner />
        ) : (
          <button
            type="button"
            className="flex w-full items-center justify-center gap-1 rounded-lg ring-1 ring-black hover:bg-black/20"
            onClick={handleClickTestLoading}
          >
            Test App Loading for 5 seconds
          </button>
        )}
      </div>
      <div className="flex-1 text-center">
        <Link
          href="/playground"
          className="flex w-full items-center justify-center gap-1 rounded-lg ring-1 ring-black hover:bg-black/20"
        >
          Go to Playground (showcase)
        </Link>
      </div>
    </div>
  );
};

export default ActionZone;
