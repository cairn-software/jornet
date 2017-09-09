import React, {Component, PropTypes} from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import WithRaces from 'components/With/WithRaces';

class ManageRaces extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRowIndex: null,
    };
  }

  onSelectRow(selectedRowIndex) {
    this.setState({selectedRowIndex});
  }

  render() {
    const {races} = this.props;
    console.log(this.state.selectedRowIndex);
    return (
      <Table onRowSelection={selectedIndexes => this.onSelectRow(selectedIndexes[0])}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Type</TableHeaderColumn>
            <TableHeaderColumn>Distance</TableHeaderColumn>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Website</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {races.map((row, index) => (
            <TableRow key={index} onClick={() => console.log('foo')}>
              <TableRowColumn>{row.id}</TableRowColumn>
              <TableRowColumn>{row.name}</TableRowColumn>
              <TableRowColumn>{row.type}</TableRowColumn>
              <TableRowColumn>{row.distance}</TableRowColumn>
              <TableRowColumn>{row.start_date}</TableRowColumn>
              <TableRowColumn>{row.website}</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
ManageRaces.propTypes = {
  races: PropTypes.array.isRequired,
};

export default WithRaces(ManageRaces);
