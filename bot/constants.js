// 追加したコマンドとその処理を一つの変数にまとめるところ
import { pingReact, pongReact, testReact } from "./reacts/reacts.js";
import { pingCommand, pongCommand, testCommand } from "./commands/commands.js";

const slashReacts = {
  ping: pingReact,
  pong: pongReact,
  test: testReact,
};

const slashCommands = [pingCommand, pongCommand, testCommand];

export { slashReacts, slashCommands };
