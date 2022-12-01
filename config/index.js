const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "https://playground-l9aacxvzj-yordaniss.vercel.app/";
