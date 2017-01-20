import * as con from 'app/constants/long-poll';

const initialState = {
  lpKey: '',
  lpServer: '',
  lpTs: '',
  updates: [],
  requestNumber: '',
  isFetching: false
};

export default function longPoll(state=initialState, action) {
  switch (action.type) {
    case con.SAVE_LP_DATA:
      return {
        ...state,
        lpKey: action.payload.lpKey,
        lpServer: action.payload.lpServer,
        lpTs: action.payload.lpTs,
        isFetching: false
      };

    case con.UPDATE_LP_TS:
      return {
        ...state,
        lpTs: action.payload.lpTs,
        updates: action.payload.updates,
        requestNumber: action.payload.requestNumber,
        isFetching: false
      };

    default:
      return state;
  }
}
