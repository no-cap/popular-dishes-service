import React from 'react';
import $ from 'jquery';

import { 
  PhotoImage, 
  Cropper, 
  PopularDish, 
  PopularDishText, 
  PopularDishName, 
  PriceBox,
  Price
} from '../components-style/PopularDishEntry-style.jsx';

var notFound = 'https://www.yorkshirecareequipment.com/wp-content/uploads/2018/09/no-image-available.jpg';



class PopularDishEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.handleBlackSpace = this.handleBlackSpace.bind(this)
  }

  onClickHandler(e) {
    e.preventDefault();
    this.props.buttonHandler(e, this.props.item, this.props.photos);
  }
  // attempt at handling different sized images. A lot harder than anticipated;
  handleBlackSpace(url) {
    var temporaryImage = new Image()
    temporaryImage.src = url;
    $(temporaryImage).one('load', function () {
      var orgWidth = temporaryImage.width;
      var orgHeight = temporaryImage.height;
      if ((orgWidth / orgHeight) < (192 / 140)) {
        return 'tooShort';
      }
      if ((orgHeight / orgWidth) > (140 / 192)) {
        return 'tooTall';
      }
    });
  }

  render() {
    return (
      <div onClick={this.onClickHandler}>
        <PopularDish className="popper">
          <Cropper>
            {(this.props.photos.length > 0) ? 
              <PhotoImage src={this.props.photos[0].url} size={this.handleBlackSpace(this.props.photos[0].url)} className="popper"/> : 
              <PhotoImage src={notFound} size={this.handleBlackSpace(notFound)} className="popper"/>
            }
          </Cropper>
          <PopularDishText className="popper">
            <PopularDishName className="popper">{this.props.item.dish_name}</PopularDishName>
            <br/>
            <span className="popper"> {this.props.photos.length} Photos &#183; {this.props.item.review_count} Reviews </span>
          </PopularDishText>
          <PriceBox className="popper">
            <Price primary className="popper">${this.props.item.price}</Price>
            <Price className="popper">${this.props.item.price}</Price>
          </PriceBox>
        </PopularDish>
      </div>
    )
  }
}

export default PopularDishEntry;
