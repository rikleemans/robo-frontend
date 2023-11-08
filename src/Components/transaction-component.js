import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "reactjs-popup/dist/index.css";
import { FormControl, FormGroup } from "react-bootstrap";

class TransactionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { close: this.props.close, userName: this.props.userName, amount: 0, description: "" };
  }
  render() {
    return (
      <div className={"popup-container"}>
        <div className={"content"}>
          <form>
            {/* <label htmlFor={"transactionValue"}>
              The amount that you want to send to <b>{this.props.profile.name}</b>:
            </label>{" "} */}
            <br />
            <FormGroup>
              <FormControl
                type='number'
                className=''
                name={"transactionValue"}
                placeholder='The amount you want to send'
                onChange={this.props.amountChangeHandler}
              />
            </FormGroup>
            <br />
            <FormGroup>
              <FormControl
                type='text'
                as='textarea'
                name={"transactionDescription"}
                placeholder='Description'
                onChange={this.props.descriptionChangeHandler}
              />
            </FormGroup>
            <br />
            {/* <input type='submit' id='popup-button' onClick={this.handleSend} className={"rabobank-button"} value='send' /> */}
          </form>
        </div>
      </div>
    );
  }
}
export default TransactionComponent;
