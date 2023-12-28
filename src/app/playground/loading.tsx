import Skeleton from "@/components/Loading/Skeleton";

const Loading = () => {
  return (
    <div className="flex min-h-full flex-col items-center justify-center">
      <div className="mx-10">
        <Skeleton />
        To show loading component works, this is mock delay for 5 seconds from
        server-side.
      </div>
    </div>
  );
};

export default Loading;
