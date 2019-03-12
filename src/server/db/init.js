const mongoose = require('mongoose');
const random = require('random');
const moment = require('moment');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;
const Cities = require('./models/Cities');
const User = require('./models/Cities');

const connectMongoose = (uri, ops) => {
  return mongoose
    .connect(uri, ops)
    .then(() => {
      if (process.env.NODE_ENV !== 'production') {
        return Promise.all([
          new Promise((res, rej) => {
              Cities.deleteMany({}, (err => {
                  if (err) {
                    // log err
                    rej(err)
                  }
                  // eslint-disable-next-line no-console
                  console.log('-collection cities dropped-',)
                  res()
                })
              )
            }
          ),
          new Promise((res, rej) => {
              User.deleteMany({}, (err => {
                  if (err) {
                    // log err
                    rej(err)
                  }
                  // eslint-disable-next-line no-console
                  console.log('-collection users dropped-',)
                  res()
                })
              )
            }
          )
        ])
      }
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error('mongoose connection failed:', err)
    })
};

const addFixturesDataForDb = () => {
  return new Promise((res) => {
      let start = moment().subtract(1, "days").valueOf();
      const finish = moment().valueOf();
      while (start < finish) {
        ([
            {name: 'Kiev', temp: random.float(5, 15).toFixed(2).toString()},
            {name: 'Lviv', temp: random.float(5, 15).toFixed(2).toString()},
            {name: 'Kharkiv', temp: random.float(5, 15).toFixed(2).toString()}
          ].forEach(cityData => {
              const moment = require('moment');
              const datePlusMin = moment(start);
              const city = new Cities();
              city.name = cityData.name;
              city.temp = cityData.temp;
              city.created_at = datePlusMin;
              city.save()
            }
          )
        );
        start = moment(start).add(1, 'minute').valueOf();
      }
      res()
    }
  )
};

module.exports = {connectMongoose, addFixturesDataForDb};

