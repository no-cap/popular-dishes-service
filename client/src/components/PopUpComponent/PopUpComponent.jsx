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
    const { photos, dishName, price, description, reviews } = this.props.dish;
    const { host } = this.props;
    return (
      <ItemDescription>
        <PhotoBox photos={photos} ref={this.photoBoxElement} />
        <SmallDescriptionFormatter>
          <Name>{dishName}</Name>
          <Price>{`${price}`}</Price>
        </SmallDescriptionFormatter>
        <ReviewsFormatter>
          <SmallDescriptionBorder>
            <p>{description}</p>
          </SmallDescriptionBorder>
          <ReviewsBox reviews={reviews} host={host} />
        </ReviewsFormatter>
      </ItemDescription>
    );
  }
}

export default PopUpComponent;
