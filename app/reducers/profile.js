import * as con from 'app/constants/profile';

const initialState = {
  first_name: '',
  last_name: '',
  country: '',
  city: '',
  status: ''
};

export default function profile(state=initialState, action) {
  switch (action.type) {
    case con.SAVE_PROFILE_DATA:
      return {
        ...state,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        country: action.payload.country,
        city: action.payload.city,
        status: action.payload.status
      };

    default:
      return state;
  }
}
