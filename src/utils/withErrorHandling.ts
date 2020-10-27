import { ServerlessCallback } from "@twilio-labs/serverless-runtime-types/types";

/**
 * Wraps a likely-to-fail operation in a function that
 * catches errors and calls a callback to handle them. 
 * 
 * @param cb 
 * The Twilio Serverless Callback Function
 * 
 * @param f 
 * The likely to fail transient operation to perform.
 */
export async function withErrorHandling<T>(
    cb: ServerlessCallback,
    f: () => Promise<T>
) {
    try {
        await f();
        return cb(null);
    } catch (e) {
        return cb(e);
    }
}