import React from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import "react-multi-carousel/lib/styles.css";
import CharityVideoComponent from "../Components/charityVideoComponent";

class CharityVideosContainer extends React.Component {
  render() {
    return (
      <Container className='charity-videos-container'>
        <Carousel interval={null}>
          {this.props.links.map((link, id) => (
            <Carousel.Item>
              <CharityVideoComponent video={link} key={id} />
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    );
  }
}
export default CharityVideosContainer;
