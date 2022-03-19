import React, { PureComponent } from 'react';
import {
  Accordion, Card, Button, Row,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/lib/connect/connect';
import { getHelpData } from '../../_actions';
import BreadCrumb from '../../_components/BreadCrumb/BreadCrumb';
import './Help.scss';

class Help extends PureComponent {
  state = {
    keyExpanded: 0,
  };

  componentDidMount() {
    const { getHelpData } = this.props;

    getHelpData();
  }

  handleToggle = (key) => {
    const { keyExpanded } = this.state;
    if (key === keyExpanded) {
      this.setState({ ...this.state, keyExpanded: null });
    } else {
      this.setState({ ...this.state, keyExpanded: key });
    }
  };

  render() {
    const { keyExpanded } = this.state;
    const { helpData, language } = this.props;

    return (
      <div className="pageContainer help_page">
        <BreadCrumb
          title="help"
          json={[
            {
              title: 'home',
              status: 'parent',
              url: '/',
            },
            {
              title: 'help',
              status: 'current',
            },
          ]}
        />
        <Row>
          <div className="col-12">
            <Accordion defaultActiveKey={keyExpanded}>
              {helpData
                && helpData[language].map((item, key) => (
                  <Card className={keyExpanded === key ? 'active' : ''}>
                    <Card.Header>
                      <Accordion.Toggle
                        as={Button}
                        variant="link"
                        eventKey={key}
                        onClick={() => this.handleToggle(key)}
                      >
                        <p>{item.title}</p>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={key}>
                      <Card.Body>
                        <div
                          className="dangerous_p"
                          dangerouslySetInnerHTML={{ __html: item.freeText }}
                        />
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}
            </Accordion>
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  helpData: state.branchReducer.helpData,
  language: state.mainReducer.locale,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getHelpData }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Help);
