import React, { useState } from "react";
import ConnectToIPFS from "../elements/ConnectToIPFS";
import UploadFile from "../elements/UploadFile";

const UploadToIPFS = () => {
  const [ipfs, setIpfs] = useState(undefined);

  return (
    <>
      <ConnectToIPFS setIpfs={setIpfs}></ConnectToIPFS>
      {ipfs && (
        <>
          <div
            className="p-4 my-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            Connected to IPFS.
          </div>

          <UploadFile ipfs={ipfs} />
        </>
      )}
    </>
  );
};

export default UploadToIPFS;
