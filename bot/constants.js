import { pingReact, pongReact, testReact } from "./reacts/ping.js";
import { pingCommand, pongCommand, testCommand } from "./commands/ping.js";

const slashReacts = {
  ping: pingReact,
  pong: pongReact,
  test: testReact,
};

const slashCommands = [pingCommand, pongCommand, testCommand];

export { slashReacts, slashCommands };
