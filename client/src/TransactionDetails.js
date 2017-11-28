/* eslint max-len: 0 */
/* eslint no-unused-vars: 0 */
import React, {Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import '../node_modules/react-datepicker/dist/react-datepicker.css'


function dateFormatter(cell, row) {
  if (typeof cell !== 'object') {
    cell = new Date(cell);
  }

  return `${('0' + cell.getDate()).slice(-2)}/${('0' + (cell.getMonth() + 1)).slice(-2)}/${cell.getFullYear()}`;
}

const StyledDate = styled.div`
display: flex;
flex-wrap: wrap;
width: 100%;
padding: 0px calc((100vw - 860px) / 2);
justify-content: space-between;
`

export default class TransactionDetails extends React.Component {
    constructor(props){
        super(props);
          this.state = {
            members: [],
            main: [],
            sortName: undefined,
            sortOrder: undefined
          };
          this.onSortChange = this.onSortChange.bind(this);
          this.handleStartChange = this.handleStartChange.bind(this);
          this.handleEndChange = this.handleEndChange.bind(this);
          this.clearDate = this.clearDate.bind(this);
    }


    getInitialState = function() {
      return {
        date: moment(),
        enddate: moment(),
        members: this.state.members
      };
    }

    handleStartChange = function(date) {
      this.setState({date : date});
      
      if((this.state.enddate != null) && (new Date(this.state.enddate) < new Date(date))){
        this.setState({date : null});
        this.setState({enddate : null});
        return;
      }
      var updatedList = this.state.main;
      var filterStartDate = new Date(date);
      var list = [];
      updatedList.filter(function(item){
        var nativeDate = new Date(item.date);
        if(filterStartDate < nativeDate){
          list.push(item);
        }
      });
      this.setState({members: list}); 
    }
  
    handleEndChange = function(enddate) {
      
      var startDate = new Date(this.state.date);
      var filterEndDate = new Date(enddate);
      if(filterEndDate < startDate){
        return;
      }
      this.setState({enddate : enddate});
      var updatedList = this.state.main;
      var list = [];
      updatedList.filter(function(item){
        var nativeDate = new Date(item.date);
        if((filterEndDate > nativeDate) && (startDate < nativeDate)){
          list.push(item);
        }
      });
      this.setState({members: list});
    }

    onSortChange(sortName, sortOrder) {
        this.setState({
          sortName,
          sortOrder
        });
      }
      
    async componentDidMount(){
        try {
            const res = await axios.get('/api/transactions/'+ this.props.memberId);
            const members = res.data;
            const main = res.data;
            this.setState({main});
            this.setState({members});
        } catch (err) {
            console.error(err);
        }
      }

    clearDate = function() {
      this.setState({date: null});
      this.setState({enddate: null});
      this.setState({members: this.state.main});
    }

  render() {
    const options = {
      sortName: this.state.sortName,
      sortOrder: this.state.sortOrder,
      onSortChange: this.onSortChange
    };

    return (
      <div>
         <StyledDate>
            StartDate : <DatePicker selected={this.state.date} onChange={this.handleStartChange}/>
            EndDate : <DatePicker selected={this.state.enddate} onChange={this.handleEndChange}/>
            <button onClick={this.clearDate}>clear</button>
          </StyledDate>
        <BootstrapTable data={this.state.members} exportCSV striped pagination options={ options }>
          <TableHeaderColumn dataField='id' isKey={ true } dataSort={ true }>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='amount' dataSort={ true }>Amount</TableHeaderColumn>
          <TableHeaderColumn dataField='type' dataSort={ true }>Type</TableHeaderColumn>
          <TableHeaderColumn ref='nameCol' dataField='date' dataFormat={ dateFormatter } dataSort={ true }>Date</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
