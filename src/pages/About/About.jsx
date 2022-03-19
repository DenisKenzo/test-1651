import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';

import BreadCrumb from '../../_components/BreadCrumb/BreadCrumb';
import { userService } from '../../_services/user.service';
import './About.scss';

class About extends Component {
  state = {
    imageError: false,
    aboutTxt: null,
    img: null,
    aboutTitle: null,
  };

  componentDidMount() {
    try {
      this.getStartInfo();
    } catch (e) {
      console.log('error getting content', e);
    }
  }

  getStartInfo = async () => {
    const { language } = this.props;

    const result = await userService.aboutContentSite();
    const data = result[1];
    const aboutTitle = data[language][0].title;
    const aboutTxt = data[language][0].freeText;
    const img = result[0].pictures[0].name;

    this.setState({ aboutTxt, img, aboutTitle });
  };

  onImageError = () => {
    this.setState({
      imageError: true,
    });
  };

  render() {
    const {
      img, aboutTxt, aboutTitle, imageError,
    } = this.state;

    return (
      <div className="pageContainer about">
        <BreadCrumb
          titleOwn={aboutTitle}
          json={[
            {
              title: 'home',
              status: 'parent',
              url: '/',
            },
            {
              title: 'about',
              status: 'current',
            },
          ]}
        />
        <div className="row justify-content-start">
          <div className="col-xl-6 col-lg-6 col-sm-12">
            <div className="description" dangerouslySetInnerHTML={{ __html: aboutTxt }} />
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-12">
            {!imageError && (
              <img
                alt="about_img"
                className="about_img"
                src={img && `${process.env.REACT_APP_URL_IMG}/content/pictures/${img}`}
                onError={this.onImageError}
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
});

export default connect(mapStateToProps)(About);
