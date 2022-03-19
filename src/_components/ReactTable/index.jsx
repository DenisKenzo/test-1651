import React from 'react';
import ReactTable from 'react-table/react-table';
import { withRouter } from 'react-router-dom';
import TranslationContainer from '../TranslationContainer';

class Table extends React.Component {
  render() {
    const {
      height,
      noRowSelect,
      loading,
      noPagination,
      pageSizeItems,
      linkRow,
      noItems,
      defaultSorted,
      ...rest
    } = this.props;

    return (
      <ReactTable
        defaultSorted={defaultSorted}
        data={this.props.data}
        columns={this.props.columns}
        manual
        resizable={false}
        {...rest}
        className="-striped -highlight text-center"
        NoDataComponent={() => (
          <div className="rt-noData">
            <TranslationContainer
              translationKey={noItems || 'no_items'}
            />
          </div>
        )}
      />
    );
  }
}

export default withRouter(Table);
