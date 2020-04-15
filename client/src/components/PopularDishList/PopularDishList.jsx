import React from 'react';
import $ from 'jquery';
import PopularDishEntry from '../PopularDishEntry/PopularDishEntry';
import Modal from '../Modal/Modal';
import PopUpComponent from '../PopUpComponent/PopUpComponent';
import { Slider, Slide, GoLeft, GoRight, NextDish, LastDish, DishArrowRight, DishArrowLeft } from './PopularDishListStyles';
import { CloseButton, ModalStyle, CloseFormat, DishButtons } from '../Modal/ModalStyles';

const notFound = 'https://www.yorkshirecareequipment.com/wp-content/uploads/2018/09/no-image-available.jpg';

class PopularDishList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibility: false,
      scrollPosition: 5,
      dish: {},
      photos: [],
      index: 0,
    };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.setView = this.setView.bind(this);
    this.popUpComponentElement = React.createRef();
    this.outsideModalHandler = this.outsideModalHandler.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  onClickHandler(e) {
    e.preventDefault();
    if (e.target.id === 'goRight') {
      $('.slider').animate({ scrollLeft: '+=630' }, 100);
    } else {
      $('.slider').animate({ scrollLeft: '-=630' }, 100);
    }
  }

  onChangeHandler(e) {
    e.preventDefault();
    this.setState({ scrollPosition: $('.slider').scrollLeft() });
  }

  setView(e, dish, photos) {
    const { popularDishes } = this.props;
    const { index, modalVisibility } = this.state;

    if (e.preventDefault) {
      e.preventDefault();
    }
    if (e.target.className === 'closeIt' || e.target.id === 'closeModal' || e.target.className.includes('popper')) {
      this.setState({ dish: dish || {} }); // setting new dish
      this.setState({ photos: photos || [] }); // setting new photos
      this.setState({ modalVisibility: !modalVisibility }); // turning modal visibility to TRUE
      // setting index of current dish in popular dishes
      popularDishes.forEach((popularDish, i) => ((JSON.stringify(popularDish.dishName) === JSON.stringify(dish)) ? this.setState({ index: i }) : null));
    } else if (e.target.id === 'nextDish') {
      this.popUpComponentElement.current.resetPhotoBox();
      if (popularDishes[index + 1].photos.length > 0) {
        this.setState({ dish: popularDishes[index + 1] }); // setting next dish
        this.setState({ photos: popularDishes[index + 1].photos }); // setting next photos
        this.setState({ index: this.state.index + 1 }); // setting index to one more
      } else {
        this.setState({ dish: popularDishes[index + 1] }); // setting next dish
        this.setState({ photos: [{ url: notFound }] }); // setting next photos
        this.setState({ index: index + 1 }); // setting index to one more
      }
    } else if (e.target.id === 'previousDish') {
      this.popUpComponentElement.current.resetPhotoBox();
      if (popularDishes[index - 1].photos.length > 0) {
        this.setState({ dish: popularDishes[index - 1] }); // setting to previous dish
        this.setState({ photos: popularDishes[index - 1].photos }); // setting previous photos
        this.setState({ index: index - 1 }); // setting index to one less
      } else {
        this.setState({ dish: popularDishes[index - 1] }); // setting to previous dish
        this.setState({ photos: [{ url: notFound }] }); // setting previous photos
        this.setState({ index: index - 1 }); // setting index to one less
      }
    }
  }

  outsideModalHandler(e) {
    if (e.target.className.includes('modal')) {
      this.setState({ modalVisibility: false });
    }
  }

  handleKeyPress(e) {
    const escapeObj = { target: { value: '', className: 'closeIt', id: 'closeModal' } };
    if (e.keyCode === 27) this.setView(escapeObj);
  }

  render() {
    const { scrollPosition, modalVisibility, index, dish: dish, photos } = this.state;
    const { popularDishes, host } = this.props;

    return (
      <div>
        <Slider className="slider" onScroll={this.onChangeHandler}>
          {popularDishes.map((dish) => (
            <Slide id={dish.dishName}>
              <PopularDishEntry dish={dish} photos={dish.photos} buttonHandler={this.setView} />
            </Slide>
          ))}
        </Slider>
        {(scrollPosition > 20) ? <GoLeft onClick={this.onClickHandler} /> : null}
        {(scrollPosition < 890) ? <GoRight id="goRight" onClick={this.onClickHandler}> </GoRight> : null}
        {(modalVisibility)
          ? (
            <Modal>
              <ModalStyle className="modal" onClick={this.outsideModalHandler}>
                <CloseButton onClick={this.setView}>
                  <CloseFormat id="closeModal">Close</CloseFormat>
                  <div className="closeIt">&#x2715;</div>
                </CloseButton>
                <PopUpComponent dish={dish} ref={this.popUpComponentElement} handleKeyPress={this.handleKeyPress} host={host} />
                <DishButtons>
                  {(index < popularDishes.length - 1) ? (
                    <NextDish id="nextDish" onClick={this.setView}>
                      {popularDishes[index + 1].dishName}
                      <DishArrowRight />
                    </NextDish>
                  ) : null}
                  {(index > 0) ? (
                    <LastDish id="previousDish" onClick={this.setView}>
                      {popularDishes[index - 1].dishName}
                      <DishArrowLeft />
                    </LastDish>
                  ) : null}
                </DishButtons>
              </ModalStyle>
            </Modal>
          )
          : null}
      </div>
    );
  }
}

export default PopularDishList;
