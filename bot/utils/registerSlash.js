// import section
import { REST, Routes } from "discord.js";
import { slashCommands } from "../constants.js";
import dotenv from "dotenv";
dotenv.config();

const registerSlash = async () => {
  // variables section
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
  const commands = slashCommands;

  try {
    console.log("refreshing slash commands...");
    await rest.put(Routes.applicationCommands(process.env.APP_ID), {
      body: commands,
    });
    console.log("refreshing has been done!");
  } catch (error) {
    console.log(error);
  }
};

export default registerSlash;
