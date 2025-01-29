const Skeleton = () => {
  return (
    <div className="mx-auto w-full max-w-sm rounded-md p-4">
      <div className="flex animate-pulse space-x-4">
        <div className="h-10 w-10 rounded-full bg-black/30"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 rounded-sm bg-black/30"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-2 rounded-sm bg-black/30"></div>
              <div className="col-span-1 h-2 rounded-sm bg-black/30"></div>
            </div>
            <div className="h-2 rounded-sm bg-black/30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
