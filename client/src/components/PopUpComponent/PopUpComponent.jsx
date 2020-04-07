import React from 'react';
import PhotoBox from '../PhotoBox/PhotoBox';
import ReviewsBox from '../ReviewsBox/ReviewsBox';
import {
  SmallDescriptionFormatter,
  SmallDescriptionBorder,
  ItemDescription,
  ReviewsFormatter,
  Name,
  Price
} from './PopupComponentStyles.jsx';

class PopUpComponent extends React.Component {
  constructor(props) {
    super(props)
    this.photoBoxElement = React.createRef();
    this.resetPhotoBox = this.resetPhotoBox.bind(this);
    this.handleKeyPress = this.props.handleKeyPress;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.props.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.handleKeyPress, false);
  }

  resetPhotoBox() {
    this.photoBoxElement.current.resetCurrent();
  }

  render() {
    return (
      <ItemDescription>
        <PhotoBox photos={this.props.photos} ref={this.photoBoxElement} />
        <SmallDescriptionFormatter>
          <Name>{this.props.item.dish_name}</Name>
          <Price>{`${this.props.item.price}.00`}</Price>
        </SmallDescriptionFormatter>
        <ReviewsFormatter>
          <SmallDescriptionBorder> <p>{this.props.item.description}</p> </SmallDescriptionBorder>
          <ReviewsBox reviews={this.props.reviews} />
        </ReviewsFormatter>
      </ItemDescription>
    );
  }
}

export default PopUpComponent;
