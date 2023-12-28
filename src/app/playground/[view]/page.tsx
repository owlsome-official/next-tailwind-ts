import { SSRDelay } from "@/actions/ssr-delay";

type Props = {
  params: {
    view: string;
  };
};

const Page = async (props: Props) => {
  let bg = "";
  switch (props.params.view) {
    case "red":
      bg = "bg-red-300 text-red-600";
      break;
    case "green":
      bg = "bg-green-300 text-green-600";
      break;
    case "blue":
      bg = "bg-blue-300 text-blue-600";
      break;
    default:
      break;
  }

  // NOTE: A simple loading for demonstration of SSR Component
  const res = await SSRDelay(props.params.view);

  return (
    <div
      className={[
        "flex h-full w-full items-center justify-center rounded-lg text-2xl",
        bg,
      ].join(" ")}
    >
      {res}
    </div>
  );
};

export default Page;
