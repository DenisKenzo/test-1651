import React, { PureComponent } from 'react';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import {
  getCategories,
  getCoupons,
  searchCoupons,
  getExtraCoupons,
} from '../../_actions';
import ContainerCoupons from '../../_components/ContainerCoupons';
import { TRANSLATIONS } from '../../_constants';
import TranslationContainer from '../../_components/TranslationContainer';

class Search extends PureComponent {
  state = {
    searchTerm:
      this.props.match.params.value === '*'
        ? ''
        : this.props.match.params.value,
    valuetext: this.props.match.params.value,
  };

  componentDidMount() {
    this.handleCoupons();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.value !== prevProps.match.params.value) {
      this.setState(
        {
          searchTerm: this.props.match.params.value,
          valuetext: this.props.match.params.value,
        },
        this.handleCoupons,
      );
    }
  }

  handleCoupons = ({ page } = {}) => {
    const search = this.state.searchTerm;
    const args = { page };
    if (search !== '') {
      args.q = search;
    }
    this.props.searchCoupons(args);
    this.setState({ value: '', valuetext: search });
  };

  handleChange = (value) => {
    this.setState({ searchTerm: value, value });
  };

  handleSubmit = (e) => {
    if (e.key === 'Enter') {
      this.setState(
        { searchTerm: e.target.value, value: e.target.value },
        this.handleCoupons,
      );
    }
  };

  handleSearchClick = () => {
    this.handleCoupons();
  };

  render() {
    const { coupons, loadingHotCoupons, language } = this.props;
    const { value, searchTerm, valuetext } = this.state;

    return (
      <div>
        <div className="container mb-6 mt-6">
          <div className="d-flex flex-column flex-lg-row justify-content-lg-between align-items-lg-center">
            <div className="d-flex">
              <h1 className="search-h1">
                <TranslationContainer translationKey="search_term" />
                <span className="text-primary search-term">
                  {' '}
                  {valuetext.length !== 0 ? valuetext : '*'}
                  {' '}
                </span>
              </h1>
            </div>
            <div className="d-flex">
              <div>
                <p>
                  {coupons && (
                    <TranslationContainer
                      translationKey="result_found"
                      variableBlock={['total']}
                      valueBlock={[coupons.total]}
                    />
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="row mt-6 search_big">
            <div className="col-12">
              <input
                className="search"
                placeholder={TRANSLATIONS[language].search}
                value={value}
                onChange={(e) => this.handleChange(e.target.value)}
                onKeyUp={(e) => this.handleSubmit(e)}
              />
              <div
                className="search-btn"
                onClick={() => this.handleSearchClick()}
              >
                <img src={`../assets/images/zoom.svg`} />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          {coupons && coupons.data && (
            <ContainerCoupons
              coupons={coupons}
              isLoading={loadingHotCoupons}
              handleCoupons={this.handleCoupons}
              noResults
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  loadingHotCoupons: state.couponReducer.loadingHotCoupons,
  coupons: state.couponReducer.coupons,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { searchCoupons, getExtraCoupons, getCategories },
    dispatch,
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
