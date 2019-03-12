import actions from './actions';

const initState = null;

export default function (state = initState, action) {
  switch (action.type) {
    case actions.GET_USER: {
      return state
    }
    case actions.USER: {
      return action.payload || state;
    }
    default:
      return state;
  }
}