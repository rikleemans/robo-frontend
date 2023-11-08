import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import TransactionModel from "../Model/TransactionModel";
class Transaction extends Component {
  state = { loading: true, transaction: null };
  componentDidMount() {
    let transaction = this.props.data;
    this.setState({ transaction: transaction, loading: false });
  }

  Popover = () => {
    let { transaction } = this.state;
    return (
      <Tooltip className='tooltip left'>
        <p> Receiver: {transaction.receiverName}</p>
        <p> Description: {transaction.description}</p>
        <p> Amount: €{transaction.amount}</p>
        <p> Date: {Date(transaction.date)}</p>
      </Tooltip>
    );
  };

  render() {
    let { transaction, loading } = this.state;

    if (loading) {
      return null;
    }
    return (
      <OverlayTrigger placement='left' overlay={this.Popover()}>
        <Container className='transaction' {...this.props} type='button'>
          <p>{transaction.receiverName}</p>
          <p>€{transaction.amount}</p>
        </Container>
      </OverlayTrigger>
    );
  }
}
export default Transaction;
