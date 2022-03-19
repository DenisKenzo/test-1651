import React, { PureComponent } from 'react';
import connect from 'react-redux/es/connect/connect';
import { Row } from 'react-bootstrap';
import BreadCrumb from '../../_components/BreadCrumb/BreadCrumb';
import SidebarAccount from '../../_components/SidebarAccount';
import CouponCard from '../../_components/CouponCard/CouponCard';
import TranslationContainer from '../../_components/TranslationContainer';
import RemoveFromWishlist from '../../_modals/RemoveFromWishlist';
import './SavedCoupons.scss';

class SavedCoupons extends PureComponent {
  state = {
    // favouriteCoupons: null,
    removeModal: false,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.favouriteCoupons !== state.favouriteCoupons) {
      return {
        favouriteCoupons: props.favouriteCoupons,
      };
    }

    return null;
  }

  render() {
    const { favouriteCoupons, removeModal } = this.state;
    const resize = window.innerWidth <= 428;
    return (
      <div className="account Favourite-Categories ">
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
              title: 'saved_coupons',
              status: 'current',
            },
          ]}
        />
        <div className="Favourite-Categories__Row">
          <div className="Favourite-Categories__Row-Sidebar">
            <SidebarAccount />
          </div>
          <div className="col-xl-9 col-lg-8 col-md-12">
            <div className="text-uppercase d-flex justify-content-between align-items-center wrapBtn">
              <h2>
                <TranslationContainer translationKey="saved_coupons" />
              </h2>
              {favouriteCoupons && favouriteCoupons.length > 0 && (
                <button
                  onClick={() => this.showModal()}
                  className="btn btn-outline-primary img-button"
                  style={{ marginTop: '15px' }}
                >
                  <img src={`../assets/images/clear.svg`} />
                  <TranslationContainer translationKey="clear_all_coupons" />
                </button>
              )}
            </div>
            {favouriteCoupons && favouriteCoupons.length > 0 ? (
              <Row className="mt-2">
                {favouriteCoupons
                  && favouriteCoupons.map((coupon) => (
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <CouponCard key={coupon._id} coupon={coupon} />
                    </div>
                  ))}
              </Row>
            ) : (
              <Row className="mt-2">
                <div className="saved-coupons__no-coupons-saved col-md-12">
                  <div>
                    <p className="font-weight-bold">
                      <TranslationContainer translationKey="no_coupons_saved_1" />
                    </p>
                  </div>
                  <div>
                    <p>
                      <TranslationContainer translationKey="no_coupons_saved_2" />
                    </p>
                  </div>
                  <div>
                    <p>
                      <TranslationContainer translationKey="no_coupons_saved_3" />
                    </p>
                  </div>
                </div>
              </Row>
            )}
          </div>
        </div>
        {removeModal && (
          <RemoveFromWishlist
            showModal={this.showModal}
            modalLogin={removeModal}
          />
        )}

        {/* <AgreeModal /> */}
      </div>
    );
  }

  showModal = () => {
    this.setState({
      ...this.state,
      removeModal: !this.state.removeModal,
    });
  };
}

const mapStateToProps = (state) => ({
  favouriteCoupons: state.couponReducer.favouriteCoupons,
});

export default connect(mapStateToProps)(SavedCoupons);
