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

async function getGenres(email) {
    console.log('Access Token:', email);

    const {apiKey} = await strapi.query('user').findOne({email});
    console.log("🚀 ~ getProfile ~ apiKey:", apiKey)

    try {
        const response = await axios.get('https://api.spotify.com/v1/browse/categories', {
            headers: {
                Authorization: 'Bearer ' + apiKey
            }
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
        return 'oops';
    }
}

module.exports = { getAuthToken, getGenres };