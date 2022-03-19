import React, { PureComponent } from 'react';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

import ScrollBar from 'react-scrollbars-custom';
import {
  getCategories,
  handleCategoryRemove,
  handleCategorySelect,
} from '../../_actions';
import SidebarAccount from '../../_components/SidebarAccount';
import BreadCrumb from '../../_components/BreadCrumb/BreadCrumb';
import TranslationContainer from '../../_components/TranslationContainer';

import './FavouriteCategories.scss';

class FavouriteCategories extends PureComponent {
  componentDidMount() {
    const { getCategories } = this.props;

    getCategories();
  }

  render() {
    const { categories, language, favouriteCategories } = this.props;

    const langClass = {
      he: '',
      ru: 'ru',
      en: 'en',
    };

    const hebrew = language === 'he';
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
              title: 'favourite_categories',
              status: 'current',
            },
          ]}
        />
        <div className="Favourite-Categories__Row">
          <div className="Favourite-Categories__Row-Sidebar">
            <SidebarAccount />
          </div>

          <div className="Favourite-Categories__Row-Content">
            <div className="Favourite-Categories__Row-Title">
              <div className="text-uppercase">
                <h2 className="mb-2">
                  <TranslationContainer translationKey="favourite_categories" />
                </h2>
              </div>
              <div className="mt-2 mobile-margin">
                <p>
                  {' '}
                  <span>
                    {favouriteCategories && favouriteCategories.length !== 0 ? (
                      <p>
                        <TranslationContainer translationKey="categories_selected_1" />
                        <span className="text-primary">
                          {favouriteCategories.length}
                        </span>
                        <TranslationContainer translationKey="categories_selected_2" />
                      </p>
                    ) : (
                      <TranslationContainer translationKey="no_categories_selected" />
                    )}
                  </span>
                </p>
              </div>
            </div>
            <ScrollBar
              style={{ position: '', height: '620px' }}
              className={langClass[language]}
              autoHide
              noScrollX
              rtl={hebrew}
            >
              <div className=" Favourite-Categories__Row-List" style={{}}>
                {categories?.map((category) => {
                  const favourite = favouriteCategories
                      && favouriteCategories.some(
                        (categoryCurrent) => category._id && categoryCurrent._id === category._id,
                      );
                  return (
                    <div
                      key={category._id}
                      className="Favourites-Item"
                      onClick={() => this.handleCategorySelect(favourite, category)}
                    >
                      <div
                        className={
                            `Favourites-Item__Category${
                              favourite ? ' checked' : ' no_checked'}`
                          }
                      >
                        {favourite ? (
                          <div className="checker checked" />
                        ) : (
                          <div className="checker unchecked" />
                        )}
                        <div>
                          <img
                            src={`${process.env.REACT_APP_URL_IMG}${category.imgPath}`}
                          />
                        </div>
                        <div className="p-category">
                          <p>
                            {category.name[language]
                                && category.name[language]}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollBar>
          </div>
        </div>
      </div>
    );
  }

  handleCategorySelect = (favourite, category) => {
    const { handleCategorySelect, handleCategoryRemove, language } = this.props;

    !favourite
      ? handleCategorySelect(category, language)
      : handleCategoryRemove(category, language);
  };
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  categories: state.branchReducer.categories,
  favouriteCategories: state.branchReducer.favouriteCategories,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getCategories, handleCategorySelect, handleCategoryRemove },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteCategories);
