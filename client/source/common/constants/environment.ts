const BASE_URL = "http://localhost:3001";
const PRODUCTION_URL = "https://shakesearch-app.herokuapp.com";

console.log("server url", process.env.SERVER_URL);
console.log("process.env", process.env);

export const ENV = {
  serverURL: process.env.NODE_ENV === "production" ? PRODUCTION_URL : BASE_URL,
};
