import {NOTIFICATIONS_ALERT, NOTIFICATIONS_MASK, NOTIFICATIONS_MASK_REMOVE} from 'state/types';

const NOTIFICATIONS_ALERTS_CLEAR = 'NOTIFICATIONS_ALERTS_CLEAR';

const initialState = {mask: null, alert: null};
const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case NOTIFICATIONS_MASK:
      return Object.assign({}, state, {mask: payload});
    case NOTIFICATIONS_MASK_REMOVE:
      return Object.assign({}, state, {mask: null});
    case NOTIFICATIONS_ALERT:
      return Object.assign({}, state, {alert: payload});
    case NOTIFICATIONS_ALERTS_CLEAR:
      return Object.assign({}, state, {alert: null});
    default:
      return state;
  }
};

const clearAllAlerts = () => ({type: NOTIFICATIONS_ALERTS_CLEAR});

export {reducer, clearAllAlerts};
