import React, { PureComponent } from 'react';
import connect from 'react-redux/es/connect/connect';
import ScrollspyNav from 'react-scrollspy-nav';
import { Row } from 'react-bootstrap';

import { userService } from '../../_services/user.service';
import BreadCrumb from '../../_components/BreadCrumb/BreadCrumb';

class Privacy extends PureComponent {
  state = {
  };

  componentDidMount() {
    userService.privacySite().then((response) => this.setState({ ...this.state, privacyData: response }));
  }

  render() {
    const { language } = this.props;
    const { privacyData } = this.state;

    return (
      <div className="container terms_privacy">
        <BreadCrumb
          title="privacy_policy"
          json={[
            {
              title: 'home',
              status: 'parent',
              url: '/',
            },
            {
              title: 'privacy_policy',
              status: 'current',
            },
          ]}
        />
        <div className="row">
          {
                        privacyData && privacyData[0].pictures[0].URL && (
                        <div className="container mb-6">
                          <Row>
                            <div className="col-12">
                              <img className="wid-100" src={`${process.env.REACT_APP_DOMAIN_URL}/storage${privacyData[0].pictures[0].URL}`} />
                            </div>
                          </Row>
                        </div>
                        )
                    }
          <div className="col-lg-3 col-md-12 d-flex flex-column justify-content-around text-center">

            <div className="menu">
              <div className="menu_block sticky-top">
                {privacyData && (
                <ScrollspyNav
                  scrollTargetIds={privacyData[1][language].map((value, key) => `section_${key}`)}
                  scrollDuration="1000"
                  activeNavClass="is-current"
                >
                  {
                                        privacyData && privacyData[1][language].map((value, key) => <li><a href={`#section_${key}`}><p>{value.title}</p></a></li>)
                                    }
                </ScrollspyNav>
                )}
              </div>
            </div>

          </div>

          <div className="col-lg-9 col-md-12 position-mobile">
            {
                            privacyData && privacyData[1][language].map((value, key) => (
                              <section className="pb-6 content_box" id={`section_${key}`}>
                                <h2>{value.title}</h2>

                                <div><p className="dangerous_p" dangerouslySetInnerHTML={{ __html: value.freeText }} /></div>
                              </section>
                            ))
                        }

          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
});

export default connect(mapStateToProps)(Privacy);
