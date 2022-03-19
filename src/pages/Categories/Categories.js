import React, { PureComponent } from 'react';
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import { getCategories } from '../../_actions';
import TranslationContainer from '../../_components/TranslationContainer';
import { TRANSLATIONS } from '../../_constants';
import BreadCrumb from '../../_components/BreadCrumb/BreadCrumb';

class Categories extends PureComponent {
  state = {
    itemsToShow: 12,
    allCategories: null,
    categories: null,
  };

  static getDerivedStateFromProps(props, state) {
    if (
      JSON.stringify(props.categories) !== JSON.stringify(state.allCategories)
    ) {
      return {
        categories: props.categories,
        allCategories: props.categories,
      };
    }

    return null;
  }

  componentDidMount() {
    const { getCategories } = this.props;

    getCategories();
  }

  render() {
    const { categories, itemsToShow } = this.state;
    const { language } = this.props;
    const meta = {
      title: 'Categories Page',
      description: 'Categories page',
      canonical: 'http://example.com/path/to/page',
      meta: {
        charset: 'utf-8',
        name: {
          keywords: 'categories',
        },
      },
    };
    const resize = window.innerWidth <= 428;
    return (
      <DocumentMeta {...meta}>
        <div className="container categories">
          <div className="mt-4 mb-5 d-md-none d-sm-flex leftPosition">
            <button
              onClick={this.backHistory}
              className="btn btn-outline-primary img-btn-left btn-blocked text-capitalize align-items-center d-flex"
            >
              <img src={`../assets/images/arrow-left.svg`} />
              <TranslationContainer translationKey="back" />
            </button>
          </div>
          <BreadCrumb
            title="categories"
            json={[
              {
                title: 'home',
                status: 'parent',
                url: '/',
              },
              {
                title: 'categories',
                status: 'current',
              },
            ]}
          />
          {!resize && (
            <div className="row search_big">
              <div className="col-12">
                <input
                  className="search"
                  placeholder={TRANSLATIONS[language].search}
                  onKeyUp={(e) => this.search(e)}
                />
                <div className="search-btn">
                  <img src={`../assets/images/zoom.svg`} />
                </div>
              </div>
            </div>
          )}
          <div className="row mt-2 categories_block">
            {categories?.slice(0, itemsToShow).map((category, key) => (
              <Link
                to={`/${language}/category/${category._id}`}
                key={`category${key}`}
                className="col-xl-2 col-lg-3 col-md-6 col-sm-6 col-md-offset-2 responsive_cat"
              >
                <div className="category">
                  <div>
                    <img
                      className="imgCatWrap"
                      src={`${process.env.REACT_APP_URL_IMG}${category.imgPath}`}
                    />
                  </div>
                  <div className="p-category">
                    <p>
                      {category.name[language] && category.name[language]}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {categories?.length > itemsToShow && (
            <div className="row mt-4 justify-content-center">
              <button
                className="btn btn-outline-primary btn-lg"
                onClick={() => this.showMore()}
              >
                <TranslationContainer translationKey="show_more" />
              </button>
            </div>
          )}
        </div>
      </DocumentMeta>
    );
  }

  backHistory = () => {
    this.props.history.goBack();
  };

  showMore = () => {
    this.setState({
      ...this.state,
      itemsToShow: this.state.itemsToShow + this.state.itemsToShow,
    });
  };

  search = (e) => {
    const { allCategories } = this.state;
    const { language } = this.props;

    let categories = allCategories;

    if (e.target.value !== '') {
      categories = allCategories.filter((category) => (
        category.name[language]
          .toLowerCase()
          .indexOf(e.target.value.toLowerCase()) > -1
      ));
    }

    this.setState({
      ...this.state,
      itemsToShow: 12,
      categories,
    });
  };
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  categories: state.branchReducer.categories,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCategories }, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Categories),
);
