import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { hideAlert } from '../_actions/alerts.actions';

class Alerts extends React.Component {
  render() {
    const { alerts, hideAlert } = this.props;

    return (
      <div className="alerts">
        { alerts && Object.entries(alerts).map((alert, index) => {
          const _id = alert[0];
          const alertElement = alert[1][1];
          const alertShow = alert[1][0];

          return (
            <div key={index} className={alertShow ? 'alerts_block' : 'alerts_none'}>
              {alertElement.type === 'success' && (
              <div className="alert-block success-alert">
                <img src={`../assets/images/alerts/success.svg`} />
                <p>{alertElement.text}</p>
                <span onClick={() => hideAlert(alertElement, _id)}>
                  <img
                    src={`../assets/images/alerts/close.svg`}
                  />
                </span>
              </div>
              )}
              {alertElement.type === 'danger' && (
              <div className="alert-block danger-alert">
                <img src={`../assets/images/alerts/danger.svg`} />
                <p>{alertElement.text}</p>
                <img
                  onClick={() => hideAlert(alertElement, _id)}
                  src={`../assets/images/alerts/close.svg`}
                />
              </div>
              )}
              {alertElement.type === 'info' && (
              <div className="alert-block info-alert">
                <img src={`../assets/images/alerts/info.svg`} />
                <p>{alertElement.text}</p>
                <img
                  onClick={() => hideAlert(alertElement, _id)}
                  src={`../assets/images/alerts/close.svg`}
                />
              </div>
              )}
              {alertElement.type === 'warning' && (
              <div className="alert-block warning-alert">
                <img src={`../assets/images/alerts/warning.svg`} />
                <p>{alertElement.text}</p>
                <img
                  onClick={() => hideAlert(alertElement, _id)}
                  src={`../assets/images/alerts/close.svg`}
                />
              </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  alerts: state.alertsReducer.alerts,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ hideAlert }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
