import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Modal, Button } from "react-bootstrap";
import TransactionComponent from "./transaction-component";
import TransactionsService from "../Services/transactions-service";
import Transaction from "../Model/TransactionModel";

class ProfileDetailsComponent extends Component {
  constructor(props) {
    super(props);
    console.log(props, "testtt");
    const shortDescriptionLength = 170;
    let descriptionText = this.props.user.GetDescription();
    let username = this.props.user.GetName();
    let email = this.props.user.GetEmail();
    let iban = this.props.bankAccount.iban;
    let amount = this.props.bankAccount.amount;

    let shortDescription;
    if (descriptionText.length >= shortDescriptionLength) shortDescription = descriptionText.substring(0, shortDescriptionLength) + "..";
    else shortDescription = descriptionText;

    this.state = {
      username: username,
      description: "short",
      email: email,
      shortDescription: shortDescription,
      longDescription: descriptionText,
      show: false,
      iban: iban,
      amount: amount,
      transactionAmount: 0,
      transactionDescription: "",
    };

    this.toggleDescription = this.toggleDescription.bind(this);
    this.handleTransactionSend = this.handleTransactionSend.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }
  toggleDescription() {
    this.setState({ description: this.state.description === "short" ? "long" : "short" });
  }

  handleDescriptionChange(e) {
    this.setState({ transactionDescription: e.target.value });
  }
  handleAmountChange(e) {
    this.setState({ transactionAmount: e.target.value });
  }
  handleTransactionSend(e) {
    e.preventDefault();
    if (
      window.confirm(
        "You're about to send €" +
          this.state.transactionAmount +
          " to " +
          this.state.username +
          ", with description: " +
          this.state.transactionDescription +
          ". Are you sure you want to proceed?"
      )
    ) {
      if (this.props.user.isCharity) {
        console.log(this.props, "help");
        TransactionsService.Donate(
          this.props.mainUser.bankAccount.id,
          this.props.user.id,
          this.state.transactionAmount,
          this.state.transactionDescription
        );
        window.alert("You successfully donated €" + this.state.transactionAmount + "!");
        this.setState({ show: false });
      } else {
        TransactionsService.AddTransaction(
          this.props.mainUser.bankAccount.id,
          this.props.user.bankAccount.id,
          this.state.transactionAmount,
          this.state.transactionDescription
        );
        window.alert("You successfully sent €" + this.state.transactionAmount + " to " + this.state.username + "!");
        this.setState({ show: false });
      }
    }
  }
  MyVerticallyCenteredModal(props) {
    console.log(props, "asds");
    return (
      <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TransactionComponent {...props} profile={props.user} />
        </Modal.Body>
        <Modal.Footer>
          <Button close={() => this.setState({ show: false })}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  render() {
    console.log(this.props.user, this.props.user.isCharity, "heterererere");
    return (
      <div>
        <div id='fullname-container' className='description-text'>
          <h1>{this.state.username}</h1>
        </div>
        <div id='description-container' className='description-text'>
          <p>
            {this.state.description === "long" ? this.state.longDescription : this.state.shortDescription}
            {this.state.shortDescription === this.props.user.GetDescription() ? (
              ""
            ) : (
              <button onClick={this.toggleDescription} className='descriptionToggleButton rabobank-link'>
                {this.state.description === "long" ? " show less" : " show more"}
              </button>
            )}
          </p>
        </div>
        <hr />
        <p className='description-text'>
          Full Name: <b>{this.state.username}</b> <br />
          Email: <b>{this.state.email} </b>
          <br />
          IBAN: <b>{this.state.iban} </b> <br />
          Amount: <b>{this.state.amount} €</b>
          {/* Date of {this.props.user.isCharity ? "foundation" : "birth"}: <b>22.10.1999 </b> */}
          <br />
        </p>
        {this.props.otherUser ? (
          <button className='rabobank-button' onClick={() => this.setState({ show: true })}>
            Send a transaction
          </button>
        ) : this.props.user.isCharity ? (
          <button className='rabobank-button' onClick={() => this.setState({ show: true })}>
            Donate
          </button>
        ) : null}
        {/* <Popup modal trigger={<button className='rabobank-button'>{this.props.user.isCharity ? "Donate" : "Send a transaction"}</button>}>
          {(close) => <TransactionComponent close={close} profile={this.props.user} />}
        </Popup> */}
        {/* <this.MyVerticallyCenteredModal show={this.state.show} onHide={() => this.setState({ show: false })} profile={this.props.user} /> */}
        <Modal
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
          size='lg'
          aria-labelledby='contained-modal-title-vcenter'
          centered>
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-center'>Transaction Menu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TransactionComponent
              profile={this.props.user}
              descriptionChangeHandler={this.handleDescriptionChange}
              amountChangeHandler={this.handleAmountChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <input type='submit' id='popup-button' onClick={this.handleTransactionSend} className={"rabobank-button"} value='Send' />
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default ProfileDetailsComponent;
