'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const {signupSchema, loginSchema} = require('../../../schemas/user');

async function signup (ctx) {
    console.log("🚀 ~ signup ~ ctx:", ctx)
    const { error, value } = signupSchema.validate(ctx?.request?.body);
    console.log("🚀 ~ signup ~ value:", value)
    if (error) {
        ctx.status = 400;

        return ctx.body = {
          statusCode: 400,
          error: 'Bad Request',
          message: 'Request data validation failed! Check details property.',
          details: error.details,
        };
    }
    try {
        return {
            statusCode: 200,
            message: 'Signup successful!',
            data: await strapi.services['user'].signup(value),
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

async function login (ctx) {
    console.log("🚀 ~ login ~ ctx:", ctx)
    const { error, value } = loginSchema.validate(ctx?.request?.body);
    console.log("🚀 ~ login ~ value:", value)
    if (error) {
        ctx.status = 400;

        return ctx.body = {
          statusCode: 400,
          error: 'Bad Request',
          message: 'Request data validation failed! Check details property.',
          details: error.details,
        };
    }
    try {
        return {
            statusCode: 200,
            message: 'Login successful!',
            data: await strapi.services['user'].login(value),
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

module.exports = {signup, login};
