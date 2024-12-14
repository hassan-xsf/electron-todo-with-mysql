import mysql from "mysql2";

let db: mysql.Connection | null = null;

export const connectDB = () => {
  if (!db) {
    db = mysql.createConnection({
      host: process.env.MYSQL_HOSTNAME,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: parseInt(process.env.MYSQL_PORT || "3306", 10),
    });

    db.connect((err) => {
      if (err) {
        console.error("Could not connect to MySQL database:", err);
        process.exit(1);
      }
      console.log("Connected to MySQL database");
    });
  }
  return db;
};
