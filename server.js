require('es6-promise').polyfill();
require('isomorphic-fetch');
require('@babel/register');
require('dotenv').config();

const {connectMongoose, addFixturesDataForDb} = require('./src/server/db/init');
const mongoUrl = (process.env.DB_PORT && process.env.DB_HAME)
  ? `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`
  : 'mongodb://localhost:27017/mydb';

connectMongoose(mongoUrl, {useNewUrlParser: true})
  .then(() => {
    if (process.env.NODE_ENV !== 'production') {
      addFixturesDataForDb()
    }
  });

['.css', '.less', '.sass', '.ttf', '.woff', '.woff2', 'jpg'].forEach((ext) => require.extensions[ext] = () => {
});
require('./src/server/index.js');

