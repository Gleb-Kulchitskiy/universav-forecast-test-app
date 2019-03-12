import express from 'express';
import path from 'path';
import React from 'react';
import ReactDom from 'react-dom/server';
import {StaticRouter} from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {renderRoutes, matchRoutes} from 'react-router-config'
import routes from '../client/routes'
import rootReducer from '../redux/init';
import thunk from "redux-thunk";
import actions from '../redux/login/actions';
import Cities from './db/models/Cities';
import rq from 'request-promise';

const app = express();
const passport = require('./passport/passport');
const session = require('express-session');

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET || 'secret',
  cookie: {
    maxAge: 1209600000
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(process.cwd(), '/')));

app.get('/auth/google',
  passport.authenticate('google', {
      scope: ['email', 'profile']
    }
  ));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/charts',
    failureRedirect: '/'
  })
);

app.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    //log err
    res.redirect('/');
  });
});

app.use('/*', (req, res) => {
  const {originalUrl} = req;
  const context = {};
  const store = createStore(rootReducer, applyMiddleware(thunk));
  const matchedRoutes = matchRoutes(routes, originalUrl);
  const promises = matchedRoutes.map(({route}) => {
    return route.loadData()
  });
  Promise.all(promises).then((data) => {
    data.forEach(action => {
      store.dispatch(action)
    });
    store.dispatch(actions.user(req.user))
    const preloadedState = store.getState();
    const componentHTML = ReactDom.renderToString(
      <Provider store={store}>
        <StaticRouter location={originalUrl} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    );
    return res.end(renderHTML(componentHTML, preloadedState));

  })
});


const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:9000' : `http://localhost:${process.env.PORT || 3000}`;

function renderHTML(componentHTML, preloadedState) {
  return `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset='utf-8'>
          <meta name='viewport' content='width=device-width, initial-scale=1.0'>
          <title>Forecast</title>
          <link rel='stylesheet' href='${assetUrl}/public/assets/styles.css'>
      </head>
      <body>
        <div id='app'>${componentHTML}</div>
         <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script type='application/javascript' src='${assetUrl}/public/assets/bundle.js'></script>
      </body>
    </html>
  `;
}


setInterval(()=>rq({
  url: "http://api.openweathermap.org/data/2.5/group",
  method: "GET",
  qs: {
    id: '703448,702550,706483',
    appid: 'afac2cef819178f642b97b9cb33ff4f6',
    units: 'metric'
  }
}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    const data = JSON.parse(body)
    data.list.forEach(cityData => {
      const city = new Cities()
      city.name = cityData.name;
      city.temp = cityData.main.temp;
      city.save((err)=>{
        // log error
      })
    })
  } else {
    // eslint-disable-next-line no-console
    console.log('error' + response.statusCode);
  }
}),1000*60);


const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on: ${PORT}`);
});

process.once('SIGUSR2', function () {
  server.close(function () {
    process.kill(process.pid, 'SIGUSR2')
  })
});
