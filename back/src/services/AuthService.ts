import { config } from "../config/config";
import { IUserModel } from "../models/User";
import jwt from "jsonwebtoken";

const secret = config.key.key_token;
const generateToken = (user: IUserModel) => {
     const payload = {
          email: user.email,
          password: user.password,
     };
     const options = { expiresIn: "1h" };
     return jwt.sign(payload, secret, options);
};

const verifyAccessToken = async (token: string) => {
     const match = jwt.verify(token, secret);

     if (match) return match;
     return null;
};

export { generateToken ,verifyAccessToken };
