import React from 'react';
import { Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import InfiniteScroll from 'react-infinite-scroll-component';
import CouponCard from '../CouponCard/CouponCard';
import TranslationContainer from '../TranslationContainer';

class ContainerCoupons extends React.Component {
  state = {
    filterID: JSON.parse(sessionStorage.getItem('filterID') || '3'),
    currentPage: this.props.history.location.state?.page
      ? this.props.history.location.state?.page
      : 1,
  };

  handleCouponSort = (filterID, currentPage) => {
    sessionStorage.setItem('filterID', filterID);
    this.setState({ filterID, currentPage }, () => this.props.handleCoupons({ page: currentPage }));
  };

  fetchMoreData = () => {
    const { filterID, currentPage } = this.state;
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    this.handleCouponSort(filterID, currentPage + 1);
  };

  render() {
    const { filterID, currentPage } = this.state;
    const {
      coupons, classBlock, noResults, language,
    } = this.props;

    const hebrew = language === 'he';

    const russian = language === 'ru';

    return (
      <div className="coupons-container">
        {hebrew ? (
          <>
            {coupons.data.length !== 0 && (
              <div className="sort_block">
                <div className="d-flex align-items-center">
                  <div className="filter-options">
                    <span
                      onClick={() => this.handleCouponSort(1, 1)}
                      className={filterID === 1 ? 'opt-selected-filter' : ''}
                    >
                      <p>
                        <TranslationContainer translationKey="about_to" />
                      </p>
                    </span>
                    <span
                      onClick={() => this.handleCouponSort(2, 1)}
                      className={filterID === 2 ? 'opt-selected-filter' : ''}
                    >
                      <p>
                        <TranslationContainer translationKey="new" />
                      </p>
                    </span>
                    <span
                      onClick={() => this.handleCouponSort(3, 1)}
                      className={filterID === 3 ? 'opt-selected-filter' : ''}
                    >
                      <p>
                        <TranslationContainer translationKey="amount" />
                      </p>
                    </span>
                  </div>
                </div>
                <div className="results">
                  <p>
                    <span className="text-primary">{coupons.total}</span>
                    {' '}
                    <TranslationContainer translationKey="results" />
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {coupons.data.length !== 0 && (
              <div className="sort_block">
                <div className="results">
                  <p>
                    <span className="text-primary">{coupons.total}</span>
                    {' '}
                    <TranslationContainer translationKey="results" />
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <div className="filter-options">
                    <span
                      onClick={() => this.handleCouponSort(1, 1)}
                      className={filterID === 1 ? 'opt-selected-filter' : ''}
                    >
                      <p>
                        <TranslationContainer translationKey="about_to" />
                      </p>
                    </span>
                    <span
                      onClick={() => this.handleCouponSort(2, 1)}
                      className={filterID === 2 ? 'opt-selected-filter' : ''}
                    >
                      <p>
                        <TranslationContainer translationKey="new" />
                      </p>
                    </span>
                    <span
                      onClick={() => this.handleCouponSort(3, 1)}
                      className={filterID === 3 ? 'opt-selected-filter' : ''}
                    >
                      <p>
                        <TranslationContainer translationKey="amount" />
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div className="mb-6">
          {coupons.data.length > 0 ? (
            <InfiniteScroll
              className="row"
              dataLength={coupons.data.length}
              next={this.fetchMoreData}
              scrollThreshold="40%"
              hasMore={coupons.last_page > currentPage}
              loader={(
                <div className="loading_form_2">
                  <img
                    alt="loading"
                    src={`../../assets/images/loading.svg`}
                  />
                </div>
              )}
            >
              <div className="position-relative row-fluid wid-100">
                {coupons.data.map((coupon) => (
                  <div
                    className={classBlock && classBlock !== '' ? classBlock : 'col-xl-3 col-lg-4 col-md-6 col-sm-12'}
                    style={{ paddingRight: '13px', paddingLeft: '13px' }}
                    key={coupon._id}
                  >
                    <CouponCard
                      page={this.state.currentPage}
                      inSlider
                      coupon={coupon}
                    />
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          ) : (
            <Row>
              <div className="col-md-12 text-initial">
                {noResults ? (
                  <>
                    <div>
                      <p className="font-weight-bold">
                        <TranslationContainer translationKey="no_coupons_title_result" />
                      </p>
                    </div>
                    <div>
                      <p>
                        <TranslationContainer translationKey="no_coupons_desc_result" />
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="font-weight-bold">
                        <TranslationContainer translationKey="no_coupons_title" />
                      </p>
                    </div>
                    <div>
                      <p>
                        <TranslationContainer translationKey="no_coupons_desc" />
                      </p>
                    </div>
                  </>
                )}
              </div>
            </Row>
          )}
        </div>
      </div>
    );
  }
}

ContainerCoupons.prototypes = {
  handleCoupons: PropTypes.function,
  coupons: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isCouponsLoading: state.couponReducer.isCouponsLoading,
  language: state.mainReducer.locale,
});

export default withRouter(connect(mapStateToProps)(ContainerCoupons));
