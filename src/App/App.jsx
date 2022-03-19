import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PersistGate } from 'redux-persist/integration/react';
import { bindActionCreators } from 'redux';
import { persistor } from '../_helpers';
import MainComponent from '../_components/MainComponent';
import { CouponDetails } from '../pages/CouponDetails';
import { PrivateRoute } from '../_components/PrivateRoute';
import {
  About,
  Category,
  Categories,
  Company,
  CompanyRegister,
  FavouriteCategories,
  Contact,
  Help,
  Home,
  NearBy,
  Privacy,
  NotFound,
  Profile,
  Search,
  Notifications,
  QrApplication,
  SavedCoupons,
  Settings,
  Terms,
  SuitableForMe,
} from '../pages';

import '../assets/_components.scss';
import { getApplicationStatus } from '../_actions';
import Transactions_history from '../pages/PaymentAndTransactions/components/Transactions_history/Transactions_history';

class App extends React.Component {
  componentDidMount() {
    const { getApplicationStatus } = this.props;

    window.addEventListener(
      'load',
      () => {
        // new Accessibility({ textPixelMode: true }, language);
      },
      false,
    );

    getApplicationStatus();
  }

  triggerSorted = () => {
    this.setState({ ...this.state, sorted: '' });
  };

  render() {
    return (
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <Switch>
            <MainComponent triggerSorted={this.triggerSorted}>
                <Route
                  path="/:lang/coupon/:id/:status?"
                  component={() => <CouponDetails />}
                />
                <Route
                  path="/:lang/search/:value"
                  component={() => <Search />}
                />
                <Route
                  path="/:lang/categories"
                  component={() => <Categories />}
                />
                <Route
                  path="/:lang/company/:idCompany"
                  component={() => <Company />}
                />
                <Route path="/:lang/category/:id" render={Category} />
                <Route
                  path="/:lang/register_as_manufacturer"
                  component={() => <CompanyRegister />}
                />
                <Route path="/:lang/about" component={() => <About />} />
                <Route path="/:lang/help" component={() => <Help />} />
                <Route path="/:lang/contact" component={() => <Contact />} />
                <Route path="/:lang/terms_of_use" component={() => <Terms />} />
                <Route path="/:lang/privacy" component={() => <Privacy />} />
                <PrivateRoute
                  path="/:lang/profile"
                  component={() => <Profile />}
                />
                {/* <PrivateRoute
                  path="/:lang/payment-transactions"
                  component={() => <PaymentAndTransactions />}
                /> */}
                <PrivateRoute
                  path="/:lang/transactions-history"
                  component={() => <Transactions_history />}
                />
                <PrivateRoute
                  path="/:lang/settings"
                  component={() => <Settings />}
                />
                <PrivateRoute
                  path="/:lang/saved-coupons"
                  component={() => <SavedCoupons />}
                />

                <PrivateRoute
                  path="/:lang/preffered_categories"
                  component={() => <FavouriteCategories />}
                />

                <PrivateRoute
                  path="/:lang/notifications"
                  component={() => <Notifications />}
                />

                <PrivateRoute
                  path="/:lang/suitable_for_me"
                  component={() => <SuitableForMe />}
                />

                <PrivateRoute
                  path="/:lang/nearby"
                  component={() => <NearBy />}
                />
                <Route path="/:lang/qr" component={() => <QrApplication />} />

                <Route
                  path="/:lang/"
                  exact
                  component={() => <Home ref={this.refSorted} />}
                />
                <Route
                  path="/"
                  exact
                  component={() => <Home ref={this.refSorted} />}
                />

                <Route path="*" component={NotFound} />
            </MainComponent>
          </Switch>
        </div>
      </PersistGate>
    );
  }
}

App.proptypes = {
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    getApplicationStatus,
  },
  dispatch,
);

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export { connectedApp as App };
