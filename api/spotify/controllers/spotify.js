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

async function getGenres(ctx) {
    const {email}  = ctx?.request?.auth;
    return await strapi.services['spotify'].getGenres(email);
}

async function getPlaylistByGenres(ctx) {
    const {email}  = ctx?.request?.auth;
    const {genreId} = ctx.params;
    const {limit} = ctx.query;
    return await strapi.services['spotify'].getPlaylistByGenres(email, genreId, limit);
}

// async function getTracks(ctx) {
//     const {email}  = ctx?.request?.auth;
//     const {trackEndpoint} = ctx.query;
//     return await strapi.services['spotify'].getTracks(email, trackEndpoint);
// }

module.exports = {getToken, getGenres, getPlaylistByGenres, 
    // getTracks
};
