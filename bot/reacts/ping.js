const pingReact = async (interaction) => {
  await interaction.reply("Pong");
};

const pongReact = async (interaction) => {
  await interaction.reply("Ping");
};

const testReact = async (interaction) => {
  await interaction.reply("Test");
};

export { pingReact, pongReact, testReact };
