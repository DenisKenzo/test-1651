import { applicationsConstants } from '../_constants/application.constant';
import { applicationService } from '../_services';

export function getApplicationStatus(status) {
  return (dispatch) => {
    applicationService.settingsApplications(status).then((data) => {
      dispatch(success(data));
    });
  };

  function success(status) {
    return { type: applicationsConstants.SET_APPLICATIONS_STATUS, status };
  }
}
