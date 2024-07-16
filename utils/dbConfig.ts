import { clear } from "console";
import { connect } from "mongoose";
const url = process.env.URL as string;
export const dbConfig = async () => {
  connect(url).then(() => {
    clear();
    console.log("Server Up!!");
  });
};
