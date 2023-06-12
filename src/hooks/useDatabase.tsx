import { Polybase } from "@polybase/client";
import { useAccount } from "wagmi";

const defaultNamespace =
  "pk/0x0de76dd111433a53057babe9cf1f1d899be2ec9ea9572a8d8304494adae3521f4913b95f0c4f9f6517c45eebfdee530e8c12f859b1b915083529efc19993e280/soundverse-boilerplate";

const collectionName = "MusicLibrary";
const db = new Polybase({ defaultNamespace });

const useDatabase = () => {
  const { address } = useAccount();

  const saveRecord = async (cid: string) => {
    const result = await db
      .collection(collectionName)
      .create([cid, address ?? "0x0"]);
    return result;
  };

  const getRecord = async (cid: string) => {
    const result = await db.collection(collectionName).record(cid).get();
    return result;
  };

  const getAllRecords = async () => {
    if (!address) return [];
    const result = await db
      .collection(collectionName)
      .where("owner", "==", address)
      .get();
    return result;
  };

  return { saveRecord, getRecord, getAllRecords };
};

export default useDatabase;
