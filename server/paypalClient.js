import paypal from "@paypal/checkout-server-sdk";

// This sets up the connection to PayPal's sandbox (test) environment.
// When you're ready for REAL payments later, you switch this to
// paypal.core.LiveEnvironment and update the .env credentials.
function environment() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

const client = new paypal.core.PayPalHttpClient(environment());

export { client, paypal };
