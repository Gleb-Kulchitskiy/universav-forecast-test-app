import Login from './components/Login/Login';
import Charts from './components/Charts/Charts';
import NotFound from './components/NotFound/NotFound';
import Cities from '../server/db/models/Cities';
import forecastActions from '../redux/forecast/actions';

const routes = [
  {
    path: '/',
    exact: true,
    component: Login,
    loadData: () => (Promise.resolve({type: 'dummy'}))
  },
  {
    path: '/charts',
    exact: true,
    component: Charts,
    loadData: () => (new Promise((res) => {
        Cities.aggregate([
          {
            $project: {
              hour: {$hour: "$created_at"},
              min: {$minute: "$created_at"},
              temp: "$temp",
              name: "$name"
            }
          },
          {
            $match: {min: {"$eq": 0}}
          },
        ])
          .then(function (data) {
            let mappedData = data.reduce((prev, cur) => {
              prev[cur.name]
                ? prev[cur.name].push({temp: cur.temp, hour: cur.hour})
                : prev[cur.name] = [{temp: cur.temp, hour: cur.hour}]
              ;
              return prev;
            }, {});
            res({type: forecastActions.SET_WEATHER, payload: mappedData})
          })
      }
    ))
  },
  {
    path: '*',
    exact: true,
    component: NotFound,
    loadData: () => ({type: 'dummy'})
  }
];

export default routes;