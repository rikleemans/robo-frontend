import { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

class Ad extends Component {
  constructor(props) {
    super(props);
  }
  Popover = () => {
    return (
      <Tooltip className='tooltip'>
        <p>{this.props.name}</p>
      </Tooltip>
    );
  };
  render() {
    return (
      <OverlayTrigger placement='right' overlay={this.Popover()}>
        <div>
          <a href={this.props.link}>
            <img className='responsive-img ad' src={this.props.src} alt='rabobank advertisement'></img>
          </a>
        </div>
      </OverlayTrigger>
    );
  }
}
export default Ad;
