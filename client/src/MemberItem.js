import React, { Component } from 'react';
import styled from 'styled-components';
import MemberDetails from  './MemberDetails';

class MemberItem extends Component {
    constructor(props) {
      super(props);
  
      this.state = { isOpen: false };

      this.toggleModal = this.toggleModal.bind(this);
    }
    
    toggleModal = () => {
      this.setState({
          isOpen: !this.state.isOpen
        });
      }

    render() {
        const StyledWrapper = styled.div`
        background-color: rgba(255, 255, 255, 0.7);
        width: 220px;
        height: 180px;
        margin: 25px;
        border-radius: 2px;
        box-shadow: 0 2px 3px 5px rgba(0, 0, 0, 0.1);
        transition: 200ms all ease-in-out;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    
        &:hover {
            cursor: pointer;
            background-color: rgba(255, 255, 255, 0.85);
            box-shadow: 0 2px 3px 5px rgba(0, 0, 0, 0.2);
        }
    `;
    
        const StyledName = styled.h2`
        text-align: center;
    `
      
        
      return (
            <StyledWrapper onClick={this.toggleModal}>
                <StyledName>
                    {this.props.member.first_name}&nbsp;{this.props.member.last_name}
                </StyledName>
                <MemberDetails show={this.state.isOpen} member={this.props.member}
                  onClose={this.toggleModal}>
                </MemberDetails>
            </StyledWrapper>
       );
    }
  }
  
  export default MemberItem;
