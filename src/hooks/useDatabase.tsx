import { Polybase } from "@polybase/client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const defaultNamespace =
  "pk/0x0de76dd111433a53057babe9cf1f1d899be2ec9ea9572a8d8304494adae3521f4913b95f0c4f9f6517c45eebfdee530e8c12f859b1b915083529efc19993e280/soundverse-boilerplate";
const collectionName = "MusicLibrary";
const db = new Polybase({ defaultNamespace });

const useDatabase = () => {
  const { address } = useAccount();
  const [records, setRecords] = useState<any>([]);

  const saveRecord = async (cid: string, metadata: string = "") => {
    const result = await db
      .collection(collectionName)
      .create([cid, address ?? "0x0", metadata]);
    return result;
  };

  const getRecord = async (cid: string) => {
    const result = await db.collection(collectionName).record(cid).get();
    return result;
  };

  useEffect(() => {
    if (address) {
      db.collection(collectionName)
        .where("owner", "==", address)
        .onSnapshot((newDoc) => {
          const newRecords = newDoc.data.map((doc) => doc.data);
          setRecords(newRecords);
        });
    }
  }, []);

  return { saveRecord, getRecord, records };
};

export default useDatabase;
