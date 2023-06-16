import Player from "@/components/modules/Player";
import Link from "next/link";

const Home = () => {
  return (
    <main className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-row gap-4 justify-center items-center">
        {/* <Player /> */}
        <Link href="/streamer">
          <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            I am streamer 🎙️
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Home;
