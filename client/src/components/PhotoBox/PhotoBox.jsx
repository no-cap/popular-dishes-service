import React from 'react';
import $ from 'jquery';
import {
  PhotoBoxFormat, PhotoImage, LeftArrow, RightArrow, Caption, Caption2, CaptionCropper, Photos,
} from './PhotoBoxStyles';

class PhotoBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPhoto: 0,
    };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.resetCurrent = this.resetCurrent.bind(this);
    this.handleBlackSpace = this.handleBlackSpace.bind(this);
    this.switchPhotosOnKeyPress = this.switchPhotosOnKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.switchPhotosOnKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.switchPhotosOnKeyPress, false);
  }

  onClickHandler(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    if (e.target.className.includes('button right')) {
      if (this.state.currentPhoto === this.props.photos.length - 1) {
        this.setState({ currentPhoto: 0 });
      } else {
        this.setState({ currentPhoto: this.state.currentPhoto + 1 });
      }
    } else if (this.state.currentPhoto === 0) {
      this.setState({ currentPhoto: this.props.photos.length - 1 });
    } else {
      this.setState({ currentPhoto: this.state.currentPhoto - 1 });
    }
  }

  resetCurrent() {
    this.setState((state) => ({ ...state, currentPhoto: 0 }));
  }

  // eslint-disable-next-line class-methods-use-this
  handleBlackSpace(url) {
    const temporaryImage = new Image();
    temporaryImage.src = url;
    $(temporaryImage).one('load', () => {
      const orgWidth = temporaryImage.width;
      const orgHeight = temporaryImage.height;
      if ((orgWidth / orgHeight) > (800 / 600)) {
        return 'tooTall';
      }
    });
  }

  switchPhotosOnKeyPress(e) {
    const rightObj = { target: { className: 'button right' } };
    const leftObj = { target: { className: 'left' } };
    if (e.keyCode === 39) this.onClickHandler(rightObj);
    if (e.keyCode === 37) this.onClickHandler(leftObj);
  }

  render() {
    return (
      <div>
        {(this.props.photos.length > 0)
          ? (
            <div>
              <PhotoBoxFormat>
                <PhotoImage src={this.props.photos[this.state.currentPhoto]} size={this.handleBlackSpace(this.props.photos[this.state.currentPhoto])} />
              </PhotoBoxFormat>
              <LeftArrow onClick={this.onClickHandler} />
              <RightArrow onClick={this.onClickHandler} className="button right" />
              <CaptionCropper>
                <Caption2>{this.props.photos[this.state.currentPhoto].caption}</Caption2>
              </CaptionCropper>
              <Caption>{this.props.photos[this.state.currentPhoto].caption}</Caption>
              <Photos>
                {this.state.currentPhoto + 1}
                {' '}
                of
                {' '}
                {this.props.photos.length}
              </Photos>
            </div>
          )
          : (
            <div>
              <PhotoBoxFormat>
                <PhotoImage src="https://www.yorkshirecareequipment.com/wp-content/uploads/2018/09/no-image-available.jpg" className="photo" />
              </PhotoBoxFormat>
              <LeftArrow onClick={this.onClickHandler} />
              <RightArrow onClick={this.onClickHandler} />
              <Photos>0 of 0</Photos>
            </div>
          )}
      </div>
    );
  }
}

export default PhotoBox;
