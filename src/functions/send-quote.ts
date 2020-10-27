import '@twilio-labs/serverless-runtime-types';
import { ServerlessFunctionSignature } from '@twilio-labs/serverless-runtime-types/types';
import { getRandomQuote } from '../quotes/getQuote';

import { withErrorHandling } from '../utils/withErrorHandling';

export const handler: ServerlessFunctionSignature = async (context, event, callback) => {
    const twilioClient = context.getTwilioClient();

    return withErrorHandling(callback, async () => {
        const quote = await getRandomQuote();

        await twilioClient.messages.create({
            body: quote,
            to: '[REDACTED]',
            from: process.env.PHONE_NUMBER
        });
    });
};