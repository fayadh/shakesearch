const BASE_URL = "http://localhost:3001";

console.log("server url", process.env.SERVER_URL);
console.log("process.env", process.env);

export const ENV = {
  serverURL: process.env.SERVER_URL ?? BASE_URL,
};
