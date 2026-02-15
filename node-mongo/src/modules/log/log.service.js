import { db } from "../../DB/connection.js";

export const createCappedLogs = () => {
  db.createCollection("logs", {
    capped: true,
    size: 1024 * 1024,
  });
};

export const addNewLog = async (logData) => {
  return await db.collection("logs").insertOne(logData);
};
