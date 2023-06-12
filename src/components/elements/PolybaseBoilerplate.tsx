import useDatabase from "@/hooks/useDatabase";
import React from "react";
import { useAccount } from "wagmi";

const PolybaseBoilerplate = () => {
  const useDb = useDatabase();

  const testName = `test${Math.floor(Math.random() * 1000)}}}`;

  const saveRecord = () => {
    void useDb.saveRecord(testName);
  };
  const getRecord = () => {
    void useDb.getRecord(testName).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className="flex flex-col">
      PolybaseBoilerplate
      <button
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        onClick={saveRecord}
      >
        Save Record
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={getRecord}
      >
        Get Record
      </button>
    </div>
  );
};

export default PolybaseBoilerplate;
