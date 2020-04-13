import React from 'react';
import $ from 'jquery';
import Modal from '../Modal/Modal';
import FullMenu from '../FullMenu/FullMenu';
import PopularDishList from '../PopularDishList/PopularDishList';
import { CloseButton, ModalStyle, CloseFormat } from '../Modal/ModalStyles';
import { AppBody, Title, AllItems } from './AppStyles';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      // eslint-disable-next-line no-undef
      restaurantId: '5e92696964027734e0a2063a',
      restaurant: null,
      visibleMenu: false,
      popularDishes: [],
    };
    this.getDishes = this.getDishes.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.outsideModalHandler = this.outsideModalHandler.bind(this);
  }

  componentDidMount() {
    const { restaurantId } = this.state;
    this.getDishes(restaurantId);
  }

  getDishes(restaurantId) {
    $.get(`http://localhost:3000/api/restaurants/${restaurantId}`, (data) => {
      const { _id, restaurantName, dishes } = data;
      const tempDishes = dishes.map((dish) => {
        dish.photos = dish.reviews.map((review) => review.photoUrl);
        return dish;
      });
      this.setState((state) => ({ ...state, restaurantId: _id, restaurantName, popularDishes: tempDishes }));
    });
  }

  showMenu() {
    const { visibleMenu } = this.state;
    this.setState((state) => ({ ...state, visibleMenu: !visibleMenu }));
  }

  outsideModalHandler(e) {
    if (e.target.className.includes('modal')) {
      this.setState({ visibleMenu: false });
    }
  }

  handleKeyPress(e) {
    if (e.keyCode === 27) this.setState({ visibleMenu: false });
  }

  render() {
    // <Star />
    const { restaurantName, popularDishes, visibleMenu } = this.state;
    const modal = (
      <Modal>
        <ModalStyle className="modal" onClick={this.outsideModalHandler}>
          <CloseButton className="closeIt" onClick={this.showMenu}>
            <CloseFormat id="closeModal">Close</CloseFormat>
            &#x2715;
          </CloseButton>
          <FullMenu restaurant={restaurantName} popularDishes={popularDishes} handleKeyPress={this.handleKeyPress} />
        </ModalStyle>
      </Modal>
    );
    return (
      <AppBody>
        <Title>Popular Dishes</Title>
        <AllItems onClick={this.showMenu}>View Full Menu</AllItems>
        <PopularDishList popularDishes={popularDishes} />
        {visibleMenu ? modal : null}
      </AppBody>
    );
  }
}

export default App;
