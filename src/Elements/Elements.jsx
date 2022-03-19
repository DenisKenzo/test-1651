import React, { PureComponent } from 'react';
import TranslationContainer from '../_components/TranslationContainer';

class Elements extends PureComponent {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-2">
            <div className="m-2"><button className="btn btn-primary btn-lg">Button lg</button></div>
            <div className="m-2"><button className="btn btn-outline-primary btn-lg">Button outline lg</button></div>
            <div className="m-2"><button className="btn btn-primary btn-sm">Button sm</button></div>
            <div className="m-2"><button className="btn btn-outline-primary btn-sm">Button outline sm</button></div>
            <div className="m-2"><button className="btn btn-tag">Button tag</button></div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-2">
            <div className="m-2"><h1><TranslationContainer translationKey="title" /></h1></div>
            <hr />
            <div className="m-2"><h2><TranslationContainer translationKey="title" /></h2></div>
            <hr />
            <div className="m-2"><h3><TranslationContainer translationKey="title" /></h3></div>
            <hr />
            <div className="m-2"><h4><TranslationContainer translationKey="title" /></h4></div>
            <hr />
            <div className="m-2"><p><TranslationContainer translationKey="description" /></p></div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-2" />
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-2" />
        </div>
      </div>

    );
  }
}

export default Elements;
