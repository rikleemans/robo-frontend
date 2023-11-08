import React from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CharityComponent from "../Components/charity";

class CharitiesContainer extends React.Component {
  render() {
    const ButtonGroup = ({ next, previous, goToSlide, carouselState }) => {
      return (
        <div className='custom-button-group'>
          <div className={"left-button"}>
            <button onClick={() => previous()}>
              <i className='arrow left' />
            </button>
          </div>
          <div className={"right-button"}>
            <button onClick={() => next()}>
              <i className='arrow right' />
            </button>
          </div>
        </div>
      );
    };

    let SupportedCharities = this.props.charities;
    let user = this.props.user;
    const responsive = {
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    };
    return (
      <Container className='charities-container'>
        <p className='title'>Charities supported by {user.GetName().split(" ")[0]}</p>

        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass='carousel-container'
          dotListClass='custom-dot-list-style'
          focusOnSelect={true}
          removeArrowOnDeviceType={["superLargeDesktop", "desktop", "tablet", "mobile"]}
          itemClass='charity-container'
          customButtonGroup={<ButtonGroup />}
          renderButtonGroupOutside={false}>
          {SupportedCharities.map((charity, id) => (
            <CharityComponent charity={charity} key={id} />
          ))}
        </Carousel>
      </Container>
    );
  }
}
export default CharitiesContainer;
