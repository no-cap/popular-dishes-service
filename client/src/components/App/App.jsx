import React from 'react';
import axios from 'axios';
import Modal from '../Modal/Modal';
import FullMenu from '../FullMenu/FullMenu';
import PopularDishList from '../PopularDishList/PopularDishList';
import { CloseButton, ModalStyle, CloseFormat } from '../Modal/ModalStyles';
import { AppBody, Title, AllItems } from './AppStyles';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      restaurant: null,
      visibleMenu: false,
    };
    this.getItems = this.getItems.bind(this);
    this.getPhotos = this.getPhotos.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.outsideModalHandler = this.outsideModalHandler.bind(this);
  }

  componentDidMount() {
    axios.get('popularDishes/getCompany')
      .then((response) => {
        this.setState({ restaurant: response.data[0] });
        this.getItems(response.data[0].restaurant_id);
      }) // with the restaurant_id get the popular items
      .then(() => {
        this.setState({ doneLoading: true });
      });
  }

  getReviews(obj, dish_id) {
    axios.get('popularDishes/getReviews', { params: { dish_id, numberOfReviews: obj.item.review_count } })
      .then((response) => {
        obj.reviews = response.data;
        this.setState({ items: this.state.items.concat(obj) });
      });
  }

  getPhotos(item, dish_id) {
    axios.get('popularDishes/getPhotos', { params: { dish_id } })
      .then((response) => {
        const obj = {};
        obj.item = item;
        obj.photos = response.data;
        // this.setState({ items: this.state.items.concat(obj) });
        this.getReviews(obj, dish_id);
      });
  }

  getItems(number) {
    axios.get('popularDishes/getItems', { params: { restaurant_id: number } })
      .then((response) => {
        const items = response.data;
        for (let i = 0; i < items.length; i += 1) {
          this.getPhotos(items[i], items[i].dish_id);
        }
      });
  }

  showMenu() {
    this.setState({ visibleMenu: !this.state.visibleMenu });
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
    return (
      <AppBody>
        {(true)
          ? (
            <div>
              <Title>Popular Dishes</Title>
              <AllItems onClick={this.showMenu}> View Full Menu </AllItems>
              <PopularDishList popularDishes={this.state.items} />
              {(this.state.visibleMenu) ? (
                <Modal>
                  <ModalStyle className="modal" onClick={this.outsideModalHandler}>
                    <CloseButton className="closeIt" onClick={this.showMenu}>
                      <CloseFormat id="closeModal">Close</CloseFormat>
                      &#x2715;
                    </CloseButton>
                    <FullMenu restaurant={this.state.restaurant.restaurant_name} items={this.state.items} handleKeyPress={this.handleKeyPress} />
                  </ModalStyle>
                </Modal>
              ) : null}
            </div>
          )
          : null}
      </AppBody>
    );
  }
}

export default App;
