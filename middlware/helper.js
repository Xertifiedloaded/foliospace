import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { parse, serialize } from 'cookie';

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (user) => {
  return jwt.sign(
    { 
      email: user.email, 
      portfolioId: user.portfolioId, 
      id: user.id, 
      name: user.name, 
      token: user.token ,
      username: user.username 
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// export function cookiesSerialize(token) {
//   return serialize("token", token, {
//     httpOnly: true,
//     secure: false,
//     maxAge: 3600,
//     path: "/",
//   });
// }


export function cookiesSerialize(token) {
  const isProduction = process.env.NODE_ENV === "production";

  return serialize("token", token, {
    httpOnly: true,
    secure: isProduction, 
    maxAge: 3600, 
    path: "/",
    sameSite: "Strict", 
  });
}


export const verifyToken = (req, res, next) => {
  const { token } = parse(req.headers.cookie || "");
  
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};