'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

const axios = require('axios');
const clientId = strapi.config.get('server.spotify.clientId');
const clientSecret = strapi.config.get('server.spotify.clientSecret');

// const instance = axios.create({
//   baseURL: strapi.config.get('server.spotify.baseUrl'),
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//   },
// });

async function getAuthToken(email) {
    const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
        headers: {
          'Authorization': `Basic ${Buffer.from(clientId + ':' + clientSecret).toString('base64')}`,
        }
      });
    const token = response?.data?.access_token;

    await strapi.query('user').update({email}, {apiKey: token})
    
    return {access_token: token};
}

async function getProfile(accessToken) {
    console.log('Access Token:', accessToken); // Add this line

    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };

    try {
        const response = await axios.get('https://api.spotify.com/v1/me', config);
        return response.data;
    } catch (error) {
        console.error(error);
        return 'oops';
    }
}

module.exports = { getAuthToken, getProfile };