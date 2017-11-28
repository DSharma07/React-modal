import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TransactionDetails from './TransactionDetails';
import GraphDetails from './Graph';

class MemberDetails extends React.Component {

  dont_close_modal = (e) => {
    e.stopPropagation();
  }
 
  render() {
    if(!this.props.show) {
      return null;
    }

    const StyledBackdrop = styled.div`
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: rgba(0,0,0,0.3);
    padding: 50px;
    
    `

    const StyledModal = styled.div`
    border-radius: 5px;
    max-width: 100%;
    height: 100%;
    margin: 0px auto;
    padding: 45px;
    background-color: #fff;
    overflow-y: scroll;
    `

    const StyledName = styled.h3`
      display: inline
    `
    const StyledMail = styled.h4`
    display: inline;
    `
    const StyledCross = styled.span`
    float: right;
    font-size: 28px;
    cursor: pointer;
    display: inline-block;
    `

    return (
    <StyledBackdrop onClick={this.dont_close_modal.bind(this)}>
      <StyledModal>
        <StyledCross onClick={this.props.onClose}>&times;</StyledCross>
        <StyledName>{this.props.member.first_name}&nbsp;{this.props.member.last_name}</StyledName> 
         <StyledMail><br></br>{this.props.member.email}</StyledMail><hr />
          <TransactionDetails memberId={this.props.member.id}/>
          <hr/>
          <GraphDetails memberId={this.props.member.id} />
        </StyledModal>
      </StyledBackdrop>
    );
  }
}

MemberDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  memberId: PropTypes.any,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default MemberDetails;
