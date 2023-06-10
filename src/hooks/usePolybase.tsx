import { Polybase } from "@polybase/client";
import { useEffect } from "react";
import { useAccount } from "wagmi";
const defaultNamespace = "soundverse-boilerplate";
const dbSchema = `
@public
collection Record {
  walletAddress: string;
  id: string; 
  @index(name, country);

  constructor (walletAddress: string, id: string) {
    this.walletAddress = walletAddress;
    this.id = id;
  }
}
`;
const collectionName = "Record";

const usePolybase = () => {
  const { address } = useAccount();
  const db = new Polybase({
    defaultNamespace,
  });

  useEffect(() => {
    void db?.applySchema(dbSchema, defaultNamespace);
  }, []);

  const saveRecord = async (cid: string) => {
    const result = await db
      .collection(collectionName)
      .create([address ?? "0x0", cid]);
    return result;
  };

  const getRecord = async (cid: string) => {
    const result = await db.collection(collectionName).record(cid).get();
  };

  const getAllRecords = async () => {
    if (!address) return [];
    const result = await db
      .collection(collectionName)
      .where("walletAddress", "==", address)
      .get();
  };

  return { saveRecord, getRecord, getAllRecords };
};

export default usePolybase;
