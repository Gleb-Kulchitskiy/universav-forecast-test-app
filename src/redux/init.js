import {combineReducers} from 'redux';
import user from './login/reducer';
import forecast from './forecast/reduser'

export default combineReducers({
  user,
  forecast
});