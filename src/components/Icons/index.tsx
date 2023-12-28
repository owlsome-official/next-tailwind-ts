import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

// Google Material Icons Set (Thanks: https://iconbuddy.app/ic)

export const IcBaselineNorthEast = (props: Props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="currentColor"
      d="M9 5v2h6.59L4 18.59L5.41 20L17 8.41V15h2V5z"
    ></path>
  </svg>
);

export const IcBaselineDone = (props: Props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="currentColor"
      d="M9 16.2L4.8 12l-1.4 1.4L9 19L21 7l-1.4-1.4z"
    ></path>
  </svg>
);

export const IcBaselineHome = (props: Props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"></path>
  </svg>
);
