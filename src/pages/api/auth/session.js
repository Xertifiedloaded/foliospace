import cookie from "cookie";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const decoded = jwt.verify(token, 'mankindsnnjndjsnwulskidsnzjsdnj');

      return res.status(200).json({
        message: "Token is valid",
        decoded,
      });
    } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
