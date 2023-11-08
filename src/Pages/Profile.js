import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Tabs, Tab } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import { Navigate } from "react-router-dom";
import NavbarComponent from "../Components/navbar";
import ProfileLeftContainerComponent from "../Containers/profile-container-left";
import ProfileDetailsComponent from "../Components/profile-details";
import UserService from "../Services/user-service";
import Curve from "../Components/curve";
import axios from "axios";

import User from "../Model/User";

import MockCharitiesService from "../Services/MockCharityService";

import CharitiesContainer from "../Containers/charities-container";
import TransactionContainer from "../Containers/transaction-container";
import CharityVideosContainer from "../Containers/charity-videos-container";
import AdContainer from "../Containers/ad-container";
import AboutUs from "./Aboutus";

class Profile extends Component {
  state = { loggedOut: false, loading: true, user: null, otherUser: false, bankAccount: null };

  async componentDidMount() {
    this.setState({ isCharity: false, loading: true, user: null });
    await UserService.GetUser()
      .then((x) => {
        this.setState({ user: x });
        // await this.LoadBankAccount();
      })
      .catch((x) => {
        this.setState({ loggedOut: true, loading: false });
      });
    if (this.state.user) {
      await UserService.GetBankAccountById(this.state.user.bankAccountId)
        .then((e) => {
          let user = this.state.user;
          user.bankAccount = e;
          this.setState({ bankAccount: e, loading: false, user: user, mainUser: user });
        })
        .catch((e) => {
          console.log(e, "hheheh");
          this.setState({ loading: false });
        });
    }
    // }

    // console.log(bankAccountResponse.data);
    if (this.state.user != null) {
      // UserService.GetBankAccountById(this.state.user.ban)
    }
  }
  async LoadUser(user) {
    this.setState({ loading: true });
    console.log(user, "test");
    await UserService.GetByName(user.label)
      .then((e) => {
        this.setState({ user: e, otherUser: true });
      })
      .catch((e) => {
        this.setState({ loading: false });
        console.log(e, "hohoho");
      });
    if (this.state.user) {
      console.log(this.state.user, "hmhmhmhmhmh2141251212312312");
      await UserService.GetBankAccountById(this.state.user.bankAccountId)
        .then((e) => {
          let user = this.state.user;
          user.bankAccount = e;
          this.setState({ bankAccount: e, loading: false, user: user });
          console.log(this.state.user, "tttmhmhmhhhhmhm");
        })
        .catch((e) => {
          console.log(e, "hheheh");
          this.setState({ loading: false });
        });
    }
    // this.setState({ user: user });
  }
  LoadBankAccount() {}

  render() {
    const { loading, loggedOut, user } = this.state;
    if (loading) {
      return null;
    }
    console.log(this.state, "teest");

    if (loggedOut) {
      return <Navigate to='../login' />;
    }

    let displayedProfile = new Profile();
    let charitiesService = new MockCharitiesService();
    this.props.location.search.split("?CharityId=").length !== 1 //if the url contains CharityId
      ? (displayedProfile = charitiesService.GetCharity(this.props.location.search.split("?CharityId=")[1].split("&")[0])) //get the charity by the charity id
      : //else
        (displayedProfile = user); //whatever else

    return (
      <div>
        <NavbarComponent onUserChange={this.LoadUser.bind(this)} />
        <Container fluid className='pb-5 page profile-page'>
          {displayedProfile.isCharity && displayedProfile.GetVideoLinks() !== "" ? (
            <Row className='align-items-center justify-content-md-center charity-row'>
              <CharityVideosContainer links={displayedProfile.GetVideoLinks()} />
              {
                //<CharityVideoComponent link={profile.GetVideoLink()} />
              }
            </Row>
          ) : null}
          <Row className='align-items-center justify-content-md-center profile-row'>
            <Col md={12} lg={4} className='profile-col-left'>
              {!displayedProfile.isCharity ? (
                <ProfileLeftContainerComponent user={displayedProfile} mainUser={this.state.mainUser} otherUser={this.state.otherUser} />
              ) : (
                <AdContainer />
              )}
            </Col>
            <Col md={12} lg={6} className='profile-col-right p-3'>
              <ProfileDetailsComponent
                user={displayedProfile}
                mainUser={this.state.mainUser}
                bankAccount={this.state.bankAccount}
                otherUser={this.state.otherUser}
              />
            </Col>
          </Row>
          <Row className='align-items-center justify-content-md-center secondary-row'>
            <Col md={12} lg={4} className='profile-col-left ad'>
              {!displayedProfile.isCharity ? <AdContainer /> : null}
            </Col>
            <Col md={12} lg={6} className={displayedProfile.isCharity ? "d-none" : "profile-secondary-col p-3"}>
              <Tabs defaultActiveKey={displayedProfile.isCharity ? "transactions" : "charities"} transition={false}>
                {displayedProfile.isCharity ? (
                  ""
                ) : (
                  <Tab eventKey='charities' title='Charities' className='tab'>
                    <CharitiesContainer user={displayedProfile} charities={charitiesService.GetAllCharities()} />
                  </Tab>
                )}
                <Tab
                  eventKey='transactions'
                  title='Transactions'
                  className='tab transactionTab'
                  tabClassName={this.state.otherUser ? "d-none" : ""}>
                  <TransactionContainer user={displayedProfile} />
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
        <Curve />
        <AboutUs />
      </div>
    );
  }
}
export default Profile;
