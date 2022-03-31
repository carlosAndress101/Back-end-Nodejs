import mongoose from "mongoose";
import moduloEnv from "../env/index";

moduloEnv.settingEnv();
const connetDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DATA, {
      useUnifiedTopology: true,
    });
    console.log("database connected successfully");
  } catch (error) {
    console.log("database fails to connect");
    console.log(error);
    process.exit(1);
  }
};

export default {connetDB};
