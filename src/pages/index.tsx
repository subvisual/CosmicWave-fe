import Home from "@/components/elements/Home";
import Player from "@/components/elements/Player";

const index = () => {
  return (
    <div className="mx-auto py-6 px-4 h-full w-full bg-[url('/home_background.png')] bg-cover flex justify-center items-center z-0 ">
      <Home />
    </div>
  );
};

export default index;
