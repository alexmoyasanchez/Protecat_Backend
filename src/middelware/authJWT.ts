import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";
import User from "../models/user";
import Role from "../models/role";

export const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;

    const user = await User.find({id: req.params.userId}, { password: 0 });
    if (!user) return res.status(404).json({ message: "No user found" });

    next();
    return;
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

export const isUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).populate('roles');
    const roles = await Role.find({ _id: { $in: user?.roles} });
    for (let i = 0; i < roles.length; i++) {
      console.log(roles[i].name);
      if (roles[i].name === "standard") {
        next();
        return;
      }
    }
    return res.status(403).json({ message: "Require Standard Role!" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.params.userId});
    const roles = await Role.find({ _id: { $in: user?.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require Admin Role!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};