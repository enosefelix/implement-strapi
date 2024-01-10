'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = strapi.config.get('server.admin.auth.secret');


async function signup ({email, password, ...data}) {
    const findUser = await strapi.query('user').findOne({ email });

    if(findUser) {
        throw new Error('User already exists!');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const result = await strapi.query('user').create({
            email,
            password: hashedPassword,
            ...data,
        });

        const pwd = 'password'
        const {[pwd]: _, ...user} = result;

        return user;
    } catch (e) {
        console.log(e);
    }
}

async function login({email, password}) {
    const findUser = await strapi.query('user').findOne({ email });

    if(!findUser) {
        throw new Error('User not found!');
    }

    const val = await bcrypt.compare(password, findUser.password);
    if(!val) {
        throw new Error('Invalid credentials');
    }


    const token = jwt.sign({id: findUser.id, email}, jwtSecret, {expiresIn: '1d'});
    const pwd = 'password'
    const {[pwd]: _, ...user} = findUser;

    return {token, user};
}

module.exports = {
    signup,
    login
};
