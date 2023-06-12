import useDatabase from "@/hooks/useDatabase";
import { MusicalNoteIcon } from "@heroicons/react/24/outline";
const FileLibrary = () => {
  const { records } = useDatabase();

  const trimCid = (cid: string) => {
    return `${cid.substring(0, 5)}...${cid.substring(
      cid.length - 5,
      cid.length
    )}`;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
      {!records?.length ? (
        <div>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Your lib looks empty 😥</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <span>Try to upload some files 🎶!</span>
          </p>
        </div>
      ) : (
        <div className="flex flex-col p-4 h-full w-full">
          <h1 className="py-2 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Your library
          </h1>
          <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
            {records?.map((record: any) => {
              const metadata = record.metadata
                ? JSON.parse(record.metadata)
                : {};
              const title = metadata.name ?? trimCid(record.id);
              return (
                <li className="flex items-center" key={record.id}>
                  <MusicalNoteIcon className="w-4 h-4 mr-1.5 text-purple-500 dark:text-purple-400 flex-shrink-0" />
                  {title}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileLibrary;
