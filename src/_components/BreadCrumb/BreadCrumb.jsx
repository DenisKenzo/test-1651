import React from 'react';
import connect from 'react-redux/es/connect/connect';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import TranslationContainer from '../TranslationContainer';

import './BreadCrumb.scss';

function BreadCrumb({
  title,
  titleOwn,
  language,
  img,
  additional_name,
  json,
  history,
}) {
  const hebrew = language === 'he';
  return (
    <>
      {hebrew ? (
        <>
          <div className="mobile-breadcrumbs breadcrumbs-title align-items-center">
            <h2 className="mb-5 mt-4">
              {img && <img src={img} />}
              {title ? (
                <TranslationContainer translationKey={title} />
              ) : (
                titleOwn
              )}
            </h2>
          </div>
          <div className="BreadCrumbs">
            <div className="BreadCrumbs-Row">
              <div className="">
                {json.map((element, key) => (
                  <span key={`breadcrumb${key}`}>
                    {element.status === 'parent' ? (
                      <Link to={`/${language}${element.url}`}>
                        <p className="text-primary">
                          <TranslationContainer
                            translationKey={element.title}
                          />
                        </p>
                      </Link>
                    ) : (
                      <p>
                        {' '}
                        {element.title ? (
                          <TranslationContainer
                            translationKey={element.title}
                          />
                        ) : (
                          element.titleOwn
                        )}
                        {' '}
                      </p>
                    )}

                    {key < json.length - 1 && (
                      <img
                        src={`../../assets/images/arrow-right-breadcrumb.svg`}
                      />
                    )}
                  </span>
                ))}
              </div>
              <div className="breadcrumbs-title align-items-center">
                <h2>
                  {img && <img src={img} />}
                  {title ? (
                    <TranslationContainer translationKey={title} />
                  ) : (
                    titleOwn
                  )}
                </h2>
                {additional_name && (
                  <div>
                    <h2 className="text-primary size-18">{additional_name}</h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mobile-breadcrumbs breadcrumbs-title align-items-center ">
            <h2 className="mb-5 mt-4">
              {img && <img src={img} />}
              {title ? (
                <TranslationContainer translationKey={title} />
              ) : (
                titleOwn
              )}
            </h2>
          </div>
          <div className="BreadCrumbs">
            <div className="BreadCrumbs-Row">
              <div className="breadcrumbs-title align-items-center">
                <h2>
                  {img && <img src={img} />}
                  {title ? (
                    <TranslationContainer translationKey={title} />
                  ) : (
                    titleOwn
                  )}
                </h2>
                {additional_name && (
                  <div>
                    <h2 className="text-primary size-18">{additional_name}</h2>
                  </div>
                )}
              </div>

              <div className="">
                {json.map((element, key) => (
                  <span key={`breadcrumb${key}`}>
                    {element.status === 'parent' ? (
                      <Link to={`/${language}${element.url}`}>
                        <p className="text-primary">
                          <TranslationContainer
                            translationKey={element.title}
                          />
                        </p>
                      </Link>
                    ) : (
                      <p>
                        {' '}
                        {element.title ? (
                          <TranslationContainer
                            translationKey={element.title}
                          />
                        ) : (
                          element.titleOwn
                        )}
                        {' '}
                      </p>
                    )}

                    {key < json.length - 1 && (
                      <img
                        src={`../../assets/images/arrow-right-breadcrumb.svg`}
                      />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
});

export default connect(mapStateToProps)(BreadCrumb);
