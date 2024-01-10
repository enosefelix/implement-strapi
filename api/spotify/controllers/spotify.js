'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

async function getToken(ctx) {
    const {email}  = ctx?.request?.auth;
    try {
        return {
            data: await strapi.services['spotify'].getAuthToken(email),
        }
    } catch (e) {
        ctx.status = e.code || 406;
            const body = {
                statusCode: 406,
                error: 'Not Acceptable!',
                message: e.message
            }
        
        return ctx.body = body;
    }
}

async function getProfile(ctx) {
    console.log("🚀 ~ getProfile ~ ctx:", ctx)
    const accessToken = ctx.request.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
    return await strapi.services['spotify'].getProfile(accessToken);
}

module.exports = {getToken, getProfile};
