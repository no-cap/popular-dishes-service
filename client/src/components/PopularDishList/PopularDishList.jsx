import React from 'react';
import $ from 'jquery';
import PopularDishEntry from '../PopularDishEntry/PopularDishEntry.jsx';
import Modal from '../Modal/Modal.jsx';
import PopUpComponent from '../PopUpComponent/PopUpComponent.jsx';
import {
  Slider, Slide, GoLeft, GoRight, NextDish, LastDish, DishArrowRight, DishArrowLeft,
} from './PopularDishList-style.jsx';
import {
  CloseButton, ModalStyle, CloseFormat, DishButtons,
} from '../Modal/ModalStyles.jsx';

const notFound = 'https://www.yorkshirecareequipment.com/wp-content/uploads/2018/09/no-image-available.jpg';

class PopularDishList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibility: false,
      scrollPosition: 5,
      item: {},
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

  setView(e, item, photos) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    if (e.target.className === 'closeIt' || e.target.id === 'closeModal' || e.target.className.includes('popper')) {
      this.setState({ item: item || {} }); // setting new item
      this.setState({ photos: photos || [] }); // setting new photos
      this.setState({ modalVisibility: !this.state.modalVisibility }); // turning modal visibility to TRUE
      // setting index of current dish in popular dishes
      this.props.popularDishes.forEach((popularDish, index) => ((JSON.stringify(popularDish.item) === JSON.stringify(item)) ? this.setState({ index }) : null));
    } else if (e.target.id === 'nextDish') {
      this.popUpComponentElement.current.resetPhotoBox();
      if (this.props.popularDishes[this.state.index + 1].photos.length > 0) {
        console.log(JSON.stringify(this.props.popularDishes[2].photos));
        this.setState({ item: this.props.popularDishes[this.state.index + 1].item }); // setting next item
        this.setState({ photos: this.props.popularDishes[this.state.index + 1].photos }); // setting next photos
        this.setState({ index: this.state.index + 1 }); // setting index to one more
      } else {
        this.setState({ item: this.props.popularDishes[this.state.index + 1].item }); // setting next item
        this.setState({ photos: [{ url: notFound }] }); // setting next photos
        this.setState({ index: this.state.index + 1 }); // setting index to one more
      }
    } else if (e.target.id === 'previousDish') {
      this.popUpComponentElement.current.resetPhotoBox();
      if (this.props.popularDishes[this.state.index - 1].photos.length > 0) {
        this.setState({ item: this.props.popularDishes[this.state.index - 1].item }); // setting to previous item
        this.setState({ photos: this.props.popularDishes[this.state.index - 1].photos }); // setting previous photos
        this.setState({ index: this.state.index - 1 }); // setting index to one less
      } else {
        this.setState({ item: this.props.popularDishes[this.state.index - 1].item }); // setting to previous item
        this.setState({ photos: [{ url: notFound }] }); // setting previous photos
        this.setState({ index: this.state.index - 1 }); // setting index to one less
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
    return (
      <div>
        <Slider className="slider" onScroll={this.onChangeHandler}>
          {this.props.popularDishes.map((popularDish, index) => (
            <Slide id={index}>
              <PopularDishEntry item={popularDish.item} photos={popularDish.photos} buttonHandler={this.setView} />
            </Slide>
          ))}
        </Slider>
        {(this.state.scrollPosition > 20) ? <GoLeft onClick={this.onClickHandler} /> : null}
        {(this.state.scrollPosition < 890) ? <GoRight id="goRight" onClick={this.onClickHandler}> </GoRight> : null}
        {(this.state.modalVisibility)
          ? (
            <Modal>
              <ModalStyle className="modal" onClick={this.outsideModalHandler}>
                <CloseButton onClick={this.setView}>
                  <CloseFormat id="closeModal">Close</CloseFormat>
                  <div className="closeIt">&#x2715;</div>
                </CloseButton>
                <PopUpComponent item={this.state.item} photos={this.state.photos} reviews={this.props.popularDishes[this.state.index].reviews} ref={this.popUpComponentElement} handleKeyPress={this.handleKeyPress} />
                <DishButtons>
                  {(this.state.index < this.props.popularDishes.length - 1) ? (
                    <NextDish id="nextDish" onClick={this.setView}>
                      {this.props.popularDishes[this.state.index + 1].item.dish_name}
                      <DishArrowRight />
                    </NextDish>
                  ) : null}
                  {(this.state.index > 0) ? (
                    <LastDish id="previousDish" onClick={this.setView}>
                      {this.props.popularDishes[this.state.index - 1].item.dish_name}
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
