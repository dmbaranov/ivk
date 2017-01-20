import * as con from 'app/constants/profile';
import API from 'app/utils/API';

function saveProfileData(data) {
  return {
    type: con.SAVE_PROFILE_DATA,
    payload: {
      first_name: data.first_name,
      last_name: data.last_name,
      country: data.country.title,
      city: data.city.title,
      status: data.status
    }
  };
}

export function initProfile(access_token) {
  return async dispatch => {
    const profileData = await API.getProfileData(access_token);

    dispatch(saveProfileData(profileData));
  }
}
