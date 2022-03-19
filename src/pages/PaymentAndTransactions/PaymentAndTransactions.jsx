import React, { PureComponent } from 'react';
import connect from 'react-redux/es/connect/connect';
import { Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import SidebarAccount from '../../_components/SidebarAccount';
import TranslationContainer from '../../_components/TranslationContainer';
import BreadCrumb from '../../_components/BreadCrumb/BreadCrumb';
import './PaymentAndTransactions.scss';
import '../../assets/tabs.scss';
import Transactions_history from './components/Transactions_history/Transactions_history';
import Payments_method from './components/Payment_methods/Payments_method';

const tabsClasses = ['react-tabs'];
const tabPanelClasses = ['react-tabs__tab-panel'];

class PaymentAndTransactions extends PureComponent {
  state = {
    tabIndex:
      this.props.location.pathname.split('/')[3] === 'payment_methods' ? 1 : 0,
  };

  handleTabChange = (tabIndex) => {
    this.setState({ ...this.state, tabIndex });
    this.props.history.push(
      `/${
        this.props.language
      }/payment-transactions${
        tabIndex === 0 ? '/transactions_history' : '/payment_methods'}`,
    );
  };

  render() {
    const { tabIndex, tabName } = this.state;
    const { language } = this.props.language;
    const resize = window.innerWidth <= 428;
    return (
      <div className=" Account Profile ">
        <div className="Profile-Row">
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
                title: 'profile_menu_6',
                status: 'current',
              },
            ]}
          />
          <Row>
            <div className="col-xl-3 col-lg-4">
              <SidebarAccount />
            </div>
            <div className="col-xl-9 col-lg-8 col-md-12">
              <div className="text-uppercase">
                <h2>
                  <TranslationContainer translationKey="profile_menu_6" />
                </h2>
              </div>
              <div className="payments_title">
                <span>
                  <TranslationContainer translationKey="account_payments" />
                </span>
              </div>
              <div className="wrapper">
                <Tabs
                  className={tabsClasses}
                  selectedIndex={tabIndex}
                  onSelect={this.handleTabChange}
                >
                  <TabList>
                    <Tab>
                      <TranslationContainer
                        translationKey={
                          resize ? 'transactions' : 'transactions_history'
                        }
                      />
                    </Tab>
                    <Tab>
                      <TranslationContainer
                        translationKey="payment_methods"
                      />
                    </Tab>
                  </TabList>

                  <TabPanel className={tabPanelClasses}>
                    <Transactions_history />
                  </TabPanel>
                  <TabPanel className={tabPanelClasses}>
                    <Payments_method />
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  user: state.auth.user,
});

export default withRouter(connect(mapStateToProps)(PaymentAndTransactions));
