'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();
const clientId = strapi.config.get('server.spotify.clientId');
const clientSecret = strapi.config.get('server.spotify.clientSecret');

async function getAuthToken(email) {
    const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
        headers: {
          'Authorization': `Basic ${Buffer.from(clientId + ':' + clientSecret).toString('base64')}`,
        }
      });
    const token = response?.data?.access_token;

    await redis.set(`${email}:token`, token, 'EX', 3600)
    
    return {access_token: token};
}

async function getGenres(email) {
    const apiKey = await redis.get(`${email}:token`);
    const response = await axios.get('https://api.spotify.com/v1/browse/categories', {
        headers: {
            Authorization: 'Bearer ' + apiKey
        }
    });
    return response?.data?.categories?.items;
}

async function getPlaylistByGenres(email, genreId, limit) {
    const apiKey = await redis.get(`${email}:token`);
    const response = await axios.get(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
        headers: {
            Authorization: 'Bearer ' + apiKey
        }
    });
    return response?.data?.playlists?.items;
}

module.exports = { getAuthToken, getGenres, getPlaylistByGenres };