import React, { PureComponent } from 'react';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import SidebarAccount from '../../_components/SidebarAccount';
import BreadCrumb from '../../_components/BreadCrumb/BreadCrumb';
import TranslationContainer from '../../_components/TranslationContainer';
import NotificationsList from '../../_components/NotificationsList/NotificationsList';
import { clearNotifications } from '../../_actions';

class Notifications extends PureComponent {
  clearAll = () => {
    const { clearNotifications } = this.props;

    clearNotifications();
  };

  render() {
    const { language, notifications } = this.props;

    const hebrew = language === 'he';
    const resize = window.innerWidth <= 428;
    return (
      <div className="Favourite-Categories account ">
        <BreadCrumb
          title={resize ? '' : 'account'}
          json={[
            {
              title: 'home',
              status: 'parent',
              url: '/',
            },
            {
              title: 'account',
              status: 'parent',
              url: '/profile',
            },
            {
              title: 'notifications',
              status: 'current',
            },
          ]}
        />
        {/* <Row> */}
        <div className="notifi-wrap">
          <div className="Favourite-Categories__Row-Sidebar">
            <SidebarAccount />
          </div>
          <div className="col-xl-9 col-lg-8 col-md-12 mb-9">
            <div className="d-flex align-items-center justify-content-between notifications-header mb-6 wrapBtn">
              <div className="text-uppercase">
                <h2>
                  <TranslationContainer translationKey="notifications" />
                </h2>
              </div>
              {notifications.length > 0 && (
                <div className="clear_btn">
                  <button
                    className="btn btn-outline-primary img-btn-left d-flex align-items-center"
                    onClick={() => this.clearAll()}
                  >
                    <img
                      src={`../assets/images/close-orange.svg`}
                    />
                    <TranslationContainer translationKey="clear_all" />
                  </button>
                </div>
              )}
            </div>
            <NotificationsList />
          </div>
          {/* </Row> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  notifications: state.userReducer.notifications,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clearNotifications }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
