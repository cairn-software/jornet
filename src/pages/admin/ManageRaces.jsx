import React, {Component, PropTypes} from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import RaceDrawer from 'components/Drawer/RaceDrawer';
import WithRaces from 'components/With/WithRaces';
import {isNil} from 'ramda';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const CreateRaceButton = styled(FontIcon)`
  cursor: pointer;
`;

class ManageRaces extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRowIndex: null,
    };
  }

  onSelectRow(selectedRowIndex, shouldClose) {
    if (isNil(selectedRowIndex) && !shouldClose) {
      return;
    }
    this.setState({selectedRowIndex});
  }

  render() {
    const {races} = this.props;

    return (
      <div>
        <Table onRowSelection={selectedIndexes => this.onSelectRow(selectedIndexes[0], false)}>
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
              <TableRow key={index}>
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
        <ButtonWrapper>
          <CreateRaceButton className="material-icons" onClick={() => this.onSelectRow(-1)}> create </CreateRaceButton>
        </ButtonWrapper>
        <RaceDrawer
          isOpen={!isNil(this.state.selectedRowIndex)}
          race={races[this.state.selectedRowIndex] || {}}
          onClose={() => this.onSelectRow(null, true)}
        />
      </div>
    );
  }
}
ManageRaces.propTypes = {
  races: PropTypes.array.isRequired,
};

export default WithRaces(ManageRaces);
