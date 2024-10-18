import mysql from "mysql2/promise";

export const createConnection = async () => {
  return await mysql.createConnection({
    host: process.env.NEXT_PUBLIC_HOST,
    port: 3306,
    user: "root",
    password: process.env.NEXT_PUBLIC_PASSWORD,
    database: "groupby",
  });
};
