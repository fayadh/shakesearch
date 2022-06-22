const BASE_URL = "http://localhost:3001";
const PRODUCTION_URL = "https://shakesearch-app.herokuapp.com";

export const ENV = {
  serverURL: process.env.NODE_ENV === "production" ? PRODUCTION_URL : BASE_URL,
};
