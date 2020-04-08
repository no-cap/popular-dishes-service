import React from 'react';
import $ from 'jquery';

import {
  PhotoImage,
  Cropper,
  PopularDish,
  PopularDishText,
  PopularDishName,
  PriceBox,
  Price,
} from './PopularDishEntryStyles';

const notFound = 'https://www.yorkshirecareequipment.com/wp-content/uploads/2018/09/no-image-available.jpg';


class PopularDishEntry extends React.Component {
  constructor(props) {
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.handleBlackSpace = this.handleBlackSpace.bind(this);
  }

  onClickHandler(e) {
    e.preventDefault();
    this.props.buttonHandler(e, this.props.dish, this.props.photos);
  }

  // attempt at handling different sized images. A lot harder than anticipated;
  // eslint-disable-next-line class-methods-use-this
  handleBlackSpace(url) {
    const temporaryImage = new Image();
    temporaryImage.src = url;
    $(temporaryImage).one('load', () => {
      const orgWidth = temporaryImage.width;
      const orgHeight = temporaryImage.height;
      if ((orgWidth / orgHeight) < (192 / 140)) {
        return 'tooShort';
      }
      if ((orgHeight / orgWidth) > (140 / 192)) {
        return 'tooTall';
      }
    });
  }

  render() {
    const { photos, dish } = this.props;
    return (
      <div onClick={this.onClickHandler} >
        <PopularDish className="popper">
          <Cropper>
            {(photos.length > 0)
              ? <PhotoImage src={photos[0].url} size={this.handleBlackSpace(photos[0].url)} className="popper" />
              : <PhotoImage src={notFound} size={this.handleBlackSpace(notFound)} className="popper" />}
          </Cropper>
          <PopularDishText className="popper">
            <PopularDishName className="popper">{dish.dishName}</PopularDishName>
            <br />
            <span className="popper">{photos.length} Photos &#183; {dish.reviews.length} Reviews</span>
          </PopularDishText>
          <PriceBox className="popper">
            <Price primary className="popper">${dish.price}</Price>
            <Price className="popper">${dish.price}</Price>
          </PriceBox>
        </PopularDish>
      </div>
    );
  }
}

export default PopularDishEntry;
