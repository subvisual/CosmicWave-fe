import usePolybase from "@/hooks/usePolybase";
import React, { useEffect, useState } from "react";

const FileLibrary = () => {
  const [cids, setCids] = useState<any>([]);

  const polybase = usePolybase();

  useEffect(() => {
    const retrieveRecords = async () => {
      await polybase.getAllRecords().then((records) => {
        setCids(records);
      });
    };
    void retrieveRecords();
  }, [polybase]);
  return (
    <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
      {!cids.length ? (
        <>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Your lib looks empty 😥</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <span>Try to upload some files 🎶!</span>
          </p>
        </>
      ) : (
        <>
          <h1>Your library</h1>
          <ul>
            {cids?.map((cid: any) => (
              <li key={cid}>{cid}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default FileLibrary;
