'use strict';

const { calculateReadingTime } = require("../../../config/utilities");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

async function findBlogs() {
    return await strapi.query('blog').find();
}

async function findBlog(id) {
    console.log("🚀 ~ findBlog ~ id:", id)
    return await strapi.query('blog').findOne({id});
}

async function createBlog(data, email) {
    const {body, ...rest} = data;
    const findUser = await strapi.query('user').findOne({ email });

    if(!findUser) {
        throw new Error('User not found!');
    }

    const readTime = await calculateReadingTime(body);
    return await strapi.query('blog').create(
        {
            ...rest,
            body, 
            readTime, 
            status: 'Pending', 
            author: findUser.id,
        }
    );
}

async function updateBlog(data, email, blogId) {
    const {body, ...rest} = data;
    const findUser = await strapi.query('user').findOne({ email });

    if(!findUser) {
        throw new Error('User not found!');
    }

    const blog = await findBlog(blogId);

    if(!blog) {
        throw new Error('Blog not found!');
    }

   if(body) {
    const readTime = await calculateReadingTime(body);
    return await strapi.query('blog').update({id: blogId}, {
        ...rest,
        body, 
        readTime, 
        status: 'Pending',
    })
   }

   return await strapi.query('blog').update({id: blogId}, {
    ...data
   })
}

async function deleteBlog(email, blogId) {
    const findUser = await strapi.query('user').findOne({ email });

    if(!findUser) {
        throw new Error('User not found!');
    }

    const blog = await findBlog(blogId);

    if(!blog) {
        throw new Error('Blog not found!');
    }

    if(blog?.author?.id !== findUser?.id) {
        throw new Error('You are not authorized to delete this blog!');
    }

    return await strapi.query('blog').delete({id: blogId});
}

module.exports = {findBlogs, findBlog, createBlog, updateBlog, deleteBlog};
