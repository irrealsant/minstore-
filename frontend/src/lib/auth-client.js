// frontend\src\lib\auth-client.js
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:4000", // onde está nosso backend
});