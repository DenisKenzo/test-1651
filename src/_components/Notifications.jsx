import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import TranslationContainer from './TranslationContainer';
import { clearNotifications, makeRead } from '../_actions';
import NotificationsList from './NotificationsList/NotificationsList';

class Notifications extends Component {
  clearAll = () => {
    const { clearNotifications } = this.props;

    clearNotifications();
  };

  render() {
    const { language } = this.props;

    return (
      <div className="menu_dropdown_block notifications-dropdown">
        <div className="d-flex align-items-center notifications-header">
          <div className="text-uppercase">
            <p><TranslationContainer translationKey="notifications" /></p>
          </div>
          <div className="clear_btn" onClick={() => this.clearAll()}>
            <p><TranslationContainer translationKey="clear_all" /></p>
          </div>
        </div>
        <hr />
        <NotificationsList
          height={200}
        />
        <hr />
        <div>
          <Link to={`/${language}/notifications`}>
            <p className="text-center text-primary wid-100 text-uppercase">
              <TranslationContainer translationKey="view_all" />
            </p>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clearNotifications, makeRead }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
