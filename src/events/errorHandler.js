// The following code was not tested

import { t } from "tasai";
import { EventEmitter } from "node:events";

const eventEmitter = new EventEmitter();

eventEmitter.on(
  /unhandledRejection|uncaughtException|rejectionHandled|uncaughtExceptionMonitor|warning|beforeExit|exit/,
  async (eventName, ...args) => {
    console.log(
      t.bgBrightBlack.toFunction()(`[${eventName}] `) +
        t.bold.white.toFunction()(`${eventName}: ${args.join(" || ")}`)
    );
  }
);
console.log(
  t.bgBrightBlack.toFunction()("[errorHandler] ") +
    t.bold.white.toFunction()("Loaded")
);
