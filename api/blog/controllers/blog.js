'use strict';

const { createBlogSchema, updateBlogSchema } = require("../../../schemas/blog");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

async function findBlogs(ctx) {
    try {
        return {
            statusCode: 200,
            message: 'Blogs fetched successfully!',
            data: await strapi.services['blog'].findBlogs(),
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

async function findBlog(ctx) {
    try {
        return {
            statusCode: 200,
            message: 'Blog fetched successfully!',
            data: await strapi.services['blog'].findBlog(ctx?.params?.id),
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

async function createBlog(ctx) {
    const { error, value } = createBlogSchema.validate(ctx?.request?.body);

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
        const {email} = ctx?.request?.auth;
        return {
            statusCode: 200,
            message: 'Blog created successfully!',
            data: await strapi.services['blog'].createBlog(value, email),
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

async function updateBlog(ctx) {
    const { error, value } = updateBlogSchema.validate(ctx?.request?.body);
    const {id} = ctx?.params;

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
        const {email} = ctx?.request?.auth;
        return {
            statusCode: 200,
            message: 'Blog updated successfully!',
            data: await strapi.services['blog'].updateBlog(value, email, id),
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

async function deleteBlog(ctx) {
    try {
        const {id} = ctx?.params;
        const {email} = ctx?.request?.auth;
        return {
            statusCode: 200,
            message: 'Blog deleted successfully!',
            data: await strapi.services['blog'].deleteBlog(email, id),
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

module.exports = {findBlogs, findBlog, createBlog, updateBlog, deleteBlog};
