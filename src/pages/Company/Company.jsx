import React, { PureComponent } from 'react';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

import { withRouter } from 'react-router-dom';
import ContainerCoupons from '../../_components/ContainerCoupons';
import { getCategories, getCompanyById, getCoupons } from '../../_actions';
import BreadCrumb from '../../_components/BreadCrumb/BreadCrumb';
import './Company.scss';

class Company extends PureComponent {
  componentDidMount() {
    this.props.getCompanyById(this.props.match.params.idCompany);
    this.handleCoupons();
  }

  handleCoupons = ({ page } = {}) => {
    this.props.getCoupons({
      page,
      userToken: this.props.user.remember_token,
      companyID: this.props.match.params.idCompany,
    });
  };

  render() {
    const { coupons, company, language } = this.props;

    return (
      <div className="company">
        <div
          className="container-fluid"
          style={{
            backgroundImage:
              `url('${
                company
                && company.coverImg
                && process.env.REACT_APP_URL_IMG + company.coverImg.URL
              }')`,
          }}
        >
          <div className="overlay-block">
            <div className={`container ${language === 'he' && 'rtl-company-info'}`}>
              <div className="d-flex justify-content-between all-contact">
                <div className="d-flex st-block">
                  {company && company.logoImg && company.logoImg.URL && (
                    <div
                      className="logo-block"
                      style={{
                        backgroundImage:
                          `url('${
                            process.env.REACT_APP_URL_IMG
                          }${company.logoImg.URL
                          }')`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                  )}
                  {company && (
                    <div>
                      <div className="company-name">
                        <p>{company.name && company.name}</p>
                      </div>
                      <div className="d-flex info-text-contact align-items-center">
                        {company.city && company.street && (
                          <div className="he-lang-company">
                            <img
                              className="img-company"
                              src={`../assets/images/location-orange.svg`}
                            />
                            <p>
                              {company.city}
                              {`, ${company.street}`}
                            </p>
                          </div>
                        )}
                        {company.phoneCompany && (
                          <div className={`he-lang-company ${language === 'he' && 'phone'}`}>
                            <img
                              className="img-company"
                              src={`../assets/images/phone.svg`}
                            />
                            <span className={`he-lang-company ${language === 'he' && 'phone'}`}><a href={`tel:${company.phoneCompany}`}>{company.phoneCompany}</a></span>
                          </div>
                        )}
                        {company.emailCompany && (
                          <div className="he-lang-company">
                            <img
                              className="img-company"
                              src={`../assets/images/mail-orange.svg`}
                            />
                            <p>{company.emailCompany}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {company?.website && (
                  <div>
                    <a
                      href={company.website}
                      className="btn-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p>{company.website}</p>
                      <img
                        className="link-company"
                        src={`../assets/images/external-link.svg`}
                      />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <BreadCrumb
            title="our_coupons"
            additional_name={company && company.name}
            json={[]}
          />
          <div>
            {coupons && coupons.data && (
              <ContainerCoupons
                coupons={coupons}
                handleCoupons={this.handleCoupons}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  coupons: state.couponReducer.coupons,
  company: state.branchReducer.company,
  user: state.auth.user,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCoupons, getCompanyById }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Company));
