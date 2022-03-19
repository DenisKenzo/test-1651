import { userService } from '../_services/user.service';
import { alertsConstants } from '../_constants';

export const getCurrentPosition = (handleGeocode) => {
  userService.getCoord().then((result) => handleGeocode(result));
};

export const getLocation = (dispatch) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      userService.updateCoord({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },
    (error) => {
      dispatch({ type: alertsConstants.LOCATION, error });
    },
    { enableHighAccuracy: true, maximumAge: 0 },
  );
};
