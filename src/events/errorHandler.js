// The following code was not tested

import { t } from "tasai";

export const Event = {
  name: 'errorHandler',
  run: async (client, error) => {
    const events = ["unhandledRejection", "uncaughtException", "rejectionHandled", "uncaughtExceptionMonitor", "warning", "beforeExit", "exit"];
    for (const event of events) {
      process.on(event, (...args) => console.log(
        t.bgBrightBlack.toFunction()(`[${event}] `) +
        t.bold.white.toFunction()(`${event}: ${args.join(" || ")}`)
      ));
    }
    console.log(
      t.bgBrightBlack.toFunction()("[errorHandler] ") +
      t.bold.white.toFunction()("Loaded")
    );
  }
}

