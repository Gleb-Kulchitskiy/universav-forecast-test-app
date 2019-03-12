import actions from './actions';

const initState = {};

export default function (store = initState, action) {

  switch (action.type) {
    case actions.SET_WEATHER: {
      return action.payload
    }
    default:
      return store;
  }
}