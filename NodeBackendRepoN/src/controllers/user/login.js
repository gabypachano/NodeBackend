import { connect, disconnect } from "../../database/index.js";
import User from "../../models/user.js";

import bcrypt from "bcryptjs";
import { jwt } from "../../utils/index.js";

export const loginUser = async (req, res) => {
  const { email = "", password = "" } = req.body;

  await connect();
  const user = await User.findOne({ email });
  await disconnect();

  if (!user) {
    return res
      .status(400)
      .json({ message: "Correo o contraseña no válidos - EMAIL" });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res
      .status(400)
      .json({ message: "Correo o contraseña no válidos - Password" });
  }

  const { role, name, _id } = user;

  const token = jwt.signToken(_id, email, role);

  return res.status(200).json({
    token, //jwt
    user: {
      email,
      role,
      name,
    },
  });
};
