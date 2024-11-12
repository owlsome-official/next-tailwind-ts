import { SSRDelay } from "@/actions/utils";

export async function generateStaticParams() {
  const availableList = ["red", "green", "blue"];

  return availableList.map((color) => ({
    slug: color,
  }));
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const Page = async ({ params }: Props) => {
  let bg = "";
  const slug = (await params).slug;
  switch (slug) {
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
  const res = await SSRDelay(slug);

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
