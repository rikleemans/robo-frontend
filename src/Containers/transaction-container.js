import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Transaction from "../Components/transaction";
import TransactionsService from "../Services/transactions-service";

//The purpose of this class is to store all transactions in one container
//It makes the code clearer
class TransactionContainer extends Component {
  state = { loading: true };
  constructor(props) {
    super(props);

    //Should be replaced with actual request
    //let transactions = [];
    this.state = { transactions: [] };
    /*let t1 = { name: "name1" };
    let t2 = { name: "name2" };
    let t3 = { name: "name3" };
    let t4 = { name: "name4" };
    let t5 = { name: "name5" };
    let t6 = { name: "name5" };
    let t7 = { name: "name5" };

    transactions.push(t1);
    transactions.push(t2);
    transactions.push(t3);
    transactions.push(t4);
    transactions.push(t5);
    transactions.push(t6);
    transactions.push(t7);*/
  }
  componentDidMount() {
    this.loadTransactions();
  }
  async loadTransactions() {
    console.log(this.props.user);
    this.setState({ loading: true });
    if (this.props.user.bankAccount) {
      TransactionsService.GetByUserId(this.props.user.bankAccount.id)
        .then((e) => {
          console.log(e, "hmhhm");
          this.setState({ transactions: e.data, loading: false });
        })
        .catch((e) => {
          console.log(e);
          this.setState({ loading: false });
        });
    }
  }
  render() {
    if (this.state.loading) {
      return null;
    }
    return (
      <>
        {this.state.transactions.map((data, id) => {
          return <Transaction key={id} data={data} />;
        })}
      </>
    );
  }
}
export default TransactionContainer;
