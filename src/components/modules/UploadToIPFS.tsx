import React, { useState } from "react";
import UploadFile from "../elements/UploadFile";
import FileLibrary from "../elements/FileLibrary";

const UploadToIPFS = () => {
  return (
    <div>
      <div
        className="p-4 my-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
        role="alert"
      >
        Connected to IPFS.
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <FileLibrary />
        </div>
        <div className="col-span-1 ">
          <UploadFile />
        </div>
      </div>
    </div>
  );
};

export default UploadToIPFS;
