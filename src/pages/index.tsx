import Link from "next/link";

const Home = () => {
  return (
    <>
      <main className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 flex-row justify-center">
          <Link href="/consumer">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              I'm consumer 🔊
            </button>
          </Link>
          <Link href="/streamer">
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              I'm streamer 🎙️
            </button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;
