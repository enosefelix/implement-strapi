module.exports = async (ctx, next) => {
    const token = ctx.request.header?.['authorization'];
    if(!token) {
        ctx.status = 401;
        return ctx.body = {
            status: false,
            error: 'EA00',
            message: 'Authorization token missing!',
        };
    }

    return await next()
}