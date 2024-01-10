const blogs = require('./blogs.json')
module.exports = async () => {
  const published_at = new Date().toISOString();
  await blogs.forEach(blog => {
      strapi.query('blog').model.forge({...blog, published_at }).save(null, {method: 'insert'});
     });
}
