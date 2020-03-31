import React from 'react';
import $ from 'jquery';
import { PhotoBoxFormat, PhotoImage, LeftArrow, RightArrow, Caption, Caption2, CaptionCropper, Photos } from '../components-style/PhotoBox-style.jsx';

class PhotoBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPhoto: 0
    };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.resetCurrent = this.resetCurrent.bind(this);
    this.handleBlackSpace = this.handleBlackSpace.bind(this);
    this.switchPhotosOnKeyPress = this.switchPhotosOnKeyPress.bind(this);
  }

  resetCurrent() {
    this.setState({ currentPhoto: 0 });
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
    } else {
      if (this.state.currentPhoto === 0) {
        this.setState({ currentPhoto: this.props.photos.length - 1 });
      } else {
        this.setState({ currentPhoto: this.state.currentPhoto - 1 });
      }
    }
  }

  handleBlackSpace(url) {
    var temporaryImage = new Image()
    temporaryImage.src = url;
    $(temporaryImage).one('load', function () {
      var orgWidth = temporaryImage.width;
      var orgHeight = temporaryImage.height;
      if ((orgWidth/orgHeight) > (800/600)) {
        return 'tooTall';
      } 
    });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.switchPhotosOnKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.switchPhotosOnKeyPress, false);
  }

  switchPhotosOnKeyPress(e) {
    var rightObj = { target: { className: "button right" } }
    var leftObj = { target: { className: "left" } }
    if (e.keyCode === 39) this.onClickHandler(rightObj);
    if (e.keyCode === 37) this.onClickHandler(leftObj);
  }

  render() {
    return (
      <div>
        {(this.props.photos.length > 0) ?
          <div>
            <PhotoBoxFormat>
                <PhotoImage src={this.props.photos[this.state.currentPhoto].url} size={this.handleBlackSpace(this.props.photos[this.state.currentPhoto].url)}></PhotoImage>
            </PhotoBoxFormat>
            <LeftArrow onClick={this.onClickHandler}/>
            <RightArrow onClick={this.onClickHandler} className="button right"/>
            <CaptionCropper>
              <Caption2>{this.props.photos[this.state.currentPhoto].caption}</Caption2>
            </CaptionCropper>
            <Caption>{this.props.photos[this.state.currentPhoto].caption}</Caption>
            <Photos>{this.state.currentPhoto + 1} of {this.props.photos.length}</Photos>
          </div> :
          <div>
            <PhotoBoxFormat>
                <PhotoImage src='https://www.yorkshirecareequipment.com/wp-content/uploads/2018/09/no-image-available.jpg' className="photo"></PhotoImage>
            </PhotoBoxFormat>
            <LeftArrow onClick={this.onClickHandler}/>
            <RightArrow onClick={this.onClickHandler}/>
            <Photos>0 of 0</Photos>
          </div>
        }
      </div>
    )

  }

}


export default PhotoBox;