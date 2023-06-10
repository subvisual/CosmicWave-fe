import usePolybase from "@/hooks/usePolybase";
import React, { useEffect, useState } from "react";

interface Props {
  ipfs: any;
}

const UploadFile = ({ ipfs }: Props) => {
  const [fileHash, setFileHash] = useState(null);
  const [error, setError] = useState<any>(null);

  const polybase = usePolybase();
  useEffect(() => {
    if (!fileHash) return;
    void polybase.saveRecord(fileHash);
  }, [fileHash]);

  const captureFile = async (file: any) => {
    const fileDetails = {
      path: file.name,
      content: file,
    };

    const options = {
      wrapWithDirectory: true,
    };

    try {
      const added = await ipfs.add(file);
      setFileHash(added.cid.toString());
      console.log(added.cid.toString());
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
              SVG, PNG, JPG or GIF (MAX. 800x400px)
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
            href={`https://127.0.0.1:5001/ipfs/${fileHash}`}
            rel="noreferrer"
            className="inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="w-full mr-3">
              <span className="font-bold">CID</span> {fileHash}
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
