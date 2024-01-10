// async function basicAuth (ctx, next) {
//     try {  
//       const user = await strapi
//         .query('user') 
//         .findOne({ email });
  
//       if (!user) {
//         throw new Error('User not found!');
//       }
  
//       const val = await bcrypt.compare(password, user.password);
//       if(!val) {
//         throw new Error('Invalid credentials');
//       }
//       // Go to next policy or will reach the controller's action.
//       return await next();
//     } catch (e) {
//         ctx.status = 401;
  
//         return ctx.body = {
//           status: false,
//           error: 'EA00',
//           message: e.message,
//         };
//     }
  
// };
const jwt = require('jsonwebtoken');

module.exports = async (ctx, next)=> {
  const jwtSecret = strapi.config.get('server.admin.auth.secret');

  const apiKey = ctx.request.header?.['api-key'];
  if (!apiKey) {
    ctx.status = 401;

    return ctx.body = {
      status: false,
      error: 'EA00',
      message: 'Unauthorized!',
    };
  }

  try {
    const {email, id} = jwt.verify(apiKey, jwtSecret);
    if(!email) {
      throw new Error('invalid api-key');
    }
    ctx.request.auth = {email, id};
    return await next();
  }catch(e) {
    if (e instanceof jwt.JsonWebTokenError) {
      ctx.status = 401;
      return ctx.body = {
        status: false,
        error: 'EA00',
        message: 'Unauthorized!',
      };
    }
  }
}
