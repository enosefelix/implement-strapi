module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '323945079549aa451c0ea03159394a42'),
    },
  },
  spotify: {
    baseUrl: env('SPOTIFY_BASE_URL', 'https://accounts.spotify.com'),
    clientId: env('SPOTIFY_CLIENT_ID', '69456c8696d746d795aff2337f3ad043'),
    clientSecret: env('SPOTIFY_CLIENT_SECRET', 'ce3b28063f92447a8486d1eab98919ab'),
  }
});
