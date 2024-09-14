import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="animate-pulse text-3xl font-bold text-blue-500">
        Loading...
      </div>
      <Loader className="animate-spin text-blue-500" />
    </div>
  );
};

export default Loading;
