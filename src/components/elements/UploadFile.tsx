import useDatabase from "@/hooks/useDatabase";
import React, { useEffect, useState } from "react";
import * as musicMetadata from "music-metadata-browser";
import useHelia from "@/hooks/useHelia";
import useDrand from "@/hooks/useDrand";

const UploadFile = () => {
  const [fileHash, setFileHash] = useState<
    { fileHash: string; metadata: any } | undefined
  >(undefined);
  const [error, setError] = useState<any>(null);

  const polybase = useDatabase();
  const helia = useHelia();
  const { drandNode, getRandomness } = useDrand();

  useEffect(() => {
    if (!fileHash) return;

    const addRecord = async () => {
      if (!drandNode)
        throw new Error(
          "drandNode not initialized. Unable to generate record id"
        );
      const randInt = await getRandomness();
      console.log("randint", randInt);
      // TODO - add randInt to record as record id
      await polybase
        .saveRecord(fileHash.fileHash, fileHash.metadata)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          setError(err);
        });
    };
    if (fileHash) {
      void addRecord();
    }
  }, [fileHash]);

  const captureFile = async (file: any) => {
    const _metadata = await musicMetadata.parseBlob(file);
    const metadata = JSON.stringify({ name: file.name, ..._metadata.format });

    try {
      const fileCid = await helia.uploadFile(file);
      setFileHash({ fileHash: fileCid, metadata });
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    void captureFile(event.target.files[0]);
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              MP3 or WAV
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept=".mp3,audio/*"
            onChange={(e) => {
              handleSubmit(e);
            }}
          />
        </label>
      </div>

      {fileHash && (
        <div className="my-4">
          <a
            id="gateway-link"
            target="_blank"
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            href={`https://127.0.0.1:5001/ipfs/${fileHash.fileHash}`}
            rel="noreferrer"
            className="inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="w-full mr-3">
              <span className="font-bold">CID</span> {fileHash.fileHash}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        </div>
      )}

      {error && (
        <div className="bg-red pa3 center mv3 white">
          Error: {error.message || error}
        </div>
      )}
    </div>
  );
};

export default UploadFile;
