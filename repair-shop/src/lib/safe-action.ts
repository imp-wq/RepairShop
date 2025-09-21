import { createSafeActionClient } from "next-safe-action";
import z from "zod";
import * as Sentry from "@sentry/nextjs";

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    })
  },
  handleServerError(e, utils) {
    console.log("Error in safe-action:", e.constructor.name);
    const { clientInput, metadata } = utils
    Sentry.captureException(e, (scope) => {
      scope.clear()
      scope.setContext('serverError', { message: e.message, stack: e.stack })
      scope.setContext('metadata', { actionName: metadata.actionName })
      scope.setContext('clientInput', { clientInput })
      return scope
    })

    if (e.constructor.name === 'DrizzleQueryError') {
      return "Database Error: Your data did not save correctly. Support will be notified."
    }
    return e.message
  }
})