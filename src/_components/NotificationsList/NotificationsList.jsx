import React, { Component } from 'react';
import ScrollBar from 'react-scrollbars-custom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { makeRead } from '../../_actions';
import TranslationContainer from '../TranslationContainer';
import withLanguage from '../withLanguage';

// import './NotificationsList.scss'

class NotificationsList extends Component {
  makeRead = (id) => {
    const { makeRead } = this.props;

    makeRead(id);
  };

  render() {
    const { notifications, height, language } = this.props;

    return (
      <>
        {notifications.length > 0 ? (
          <div className="notificationsList">
            <div className="position-relative">
              <ScrollBar
                style={{
                  position: '',
                  minHeight: '200px',
                  height: height ? `${height}px` : '100%',
                }}
                autohide="true"
                noScrollX
                // isRtl
              >
                {notifications.map((notification, index) => {
                  const expired_at = moment(
                    notification.data.expired_at,
                    'YYYY-MM-DD',
                  ).diff(moment().startOf('day'), 'days');

                  const created_at = moment()
                    .startOf('day')
                    .diff(moment(notification.createdAt), 'days', false);

                  return (
                    <div
                      key={index}
                      className="notification d-flex align-items-center"
                      onClick={() => (notification.readAt === null
                        ? this.makeRead(notification.notificationID)
                        : null)}
                    >
                      <div>
                        <img
                          src={`../assets/images/notifications/${notification.data.notificationStatus}.svg`}
                        />
                      </div>
                      <div>
                        <div className="titleNotif">
                          <p>
                            {notification.data.notificationTitle[language]}
                            {/* .replace('[EN]', '')
                              .replace('[HE]', '')
                              .replace('[RU]', '')} */}
                          </p>
                        </div>
                        <div className="notifWrap">
                          {notification.data.notificationText && (
                            <div className="description">
                              <p
                                className="mb-2"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    notification.data.notificationText[language],
                                }}
                              />
                              <p>
                                {created_at === 0 ? (
                                  <TranslationContainer translationKey="today" />
                                ) : (
                                  <TranslationContainer
                                    translationKey="created_at"
                                    variableBlock={['day']}
                                    valueBlock={[created_at]}
                                  />
                                )}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="status-container">
                        <div
                          className={`status ${
                            notification.readAt !== null ? 'read' : 'unread'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </ScrollBar>
            </div>
          </div>
        ) : (
          <div className="no_notification">
            <div className="m-3">
              <div className="d-flex justify-content-center">
                <img
                  src={`../assets/images/illustration-bell.svg`}
                />
              </div>
              <div className="mt-2 d-flex justify-content-center">
                <p>
                  <TranslationContainer translationKey="no_notifications" />
                </p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  notifications: state.userReducer.notifications,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    makeRead,
  },
  dispatch,
);

export default withLanguage(
  connect(mapStateToProps, mapDispatchToProps)(NotificationsList),
);
