import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import defaultPfp from "../images/defaultPfp.png";
import "react-multi-carousel/lib/styles.css";

class CharityComponent extends React.Component {
  render() {
    let Description = this.props.charity.GetDescription().substring(0, 100);
    return (
      <div id='charity-container'>
        <div id='charity-info-container'>
          <img src={defaultPfp} alt={this.props.charity.GetName()} />
          <p id='charity-name'>{this.props.charity.GetName()}</p>
          <p id='charity-description'>{Description}</p>
        </div>
        <p id='charity-link'>
          <a className='rabobank-link' href={"?CharityId=" + this.props.charity.GetId()}>
            Show more
          </a>
        </p>
      </div>
    );
  }
}
export default CharityComponent;
