import React, {Component, PropTypes} from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import RaceDrawer from 'components/Drawer/RaceDrawer';
import {connect} from 'react-redux';
import WithRaces from 'components/With/WithRaces';
import {bulkUploadRaces} from 'state/races';
import {isNil} from 'ramda';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 15px 10px 10px;
`;

const CreateRaceButton = styled(FontIcon)`cursor: pointer;`;

const Wrapper = styled.div`overflow: auto;`;

const Failure = styled.p`color: red;`;

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

  handleFileUpload = event => {
    const {uploadFile} = this.props;
    uploadFile(event.target.files[0]);
  };

  render() {
    const {bulkResults, races} = this.props;
    console.log(bulkResults);

    return (
      <Wrapper>
        <ButtonWrapper>
          <input type="file" placeholder="CSV File of Races" onChange={this.handleFileUpload} />
          {bulkResults && bulkResults.error && <Failure>Failed to upload CSV: {bulkResults.error}</Failure>}
          <CreateRaceButton className="material-icons" onClick={() => this.onSelectRow(-1)}>
            {' '}
            create{' '}
          </CreateRaceButton>
        </ButtonWrapper>
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
        <RaceDrawer
          isOpen={!isNil(this.state.selectedRowIndex)}
          race={races[this.state.selectedRowIndex] || {}}
          onClose={() => this.onSelectRow(null, true)}
        />
      </Wrapper>
    );
  }
}
ManageRaces.propTypes = {
  bulkResults: PropTypes.object,
  races: PropTypes.array.isRequired,
  uploadFile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  bulkResults: state.races.bulk,
});

const mapDispatchToProps = dispatch => ({
  uploadFile: file => dispatch(bulkUploadRaces(file)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WithRaces(ManageRaces));
