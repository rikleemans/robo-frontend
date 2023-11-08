import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Ad from "../Components/ad";
import { Carousel } from "react-bootstrap";
import UserService from "../Services/user-service";

class AdContainer extends Component {
  state = { products: null, loading: true };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    UserService.GetProducts().then((e) => {
      console.log(e, "ha");
      this.setState({ products: e, loading: false });
    });
  }
  render() {
    let { loading, products } = this.state;
    if (loading) {
      return null;
    }
    console.log(products, "HELP ME PLES");
    return (
      <div>
        <Carousel>
          {products.map((product, i) => {
            return (
              <Carousel.Item interval={5000} key={i}>
                <Ad src={product.imageLink} link={product.link} name={product.name} />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    );
  }
}
export default AdContainer;
