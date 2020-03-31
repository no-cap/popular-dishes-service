import React from 'react';
import StarBox from './starbox.jsx';
import Star from './star.jsx';
import PersonIcon from './personIcon.jsx';
import StarType from '../components-style/TypesOfStars.jsx';

import { 
    SingleReview, 
    PhotoCropper, 
    ProfilePic, 
    UserName, 
    TinyPairIcon, 
    FriendCount, 
    TinyStar, 
    UserReviews,
    StarContainer,
    Date,
    ReviewText
} from '../components-style/SingleReview.jsx'

class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.data.text,
            readMore: false
        };
        this.onClickHandler = this.onClickHandler.bind(this);
        this.dateFormatter = this.dateFormatter.bind(this);
    }
    // handles clicking on Read more / Read less
    onClickHandler(e) {
        this.setState({ readMore: !this.state.readMore })
    }
    // Formats Dates
    dateFormatter(date) {
        var arr = date.slice(0, 11).split("-");
        if (arr[1][0] === '0') {
            var dateWithZero = arr[1] + '/' + arr[0] + '/' + arr[2];
            return dateWithZero.slice(1);
        } else {
            return arr[1] + '/' + arr[0] + '/' + arr[2];
        }
    }

    render() {
        return (
            <SingleReview >
                <PhotoCropper> <ProfilePic src={this.props.data.userphoto} /> </PhotoCropper>
                <UserName> {this.props.data.username} </UserName>
                <TinyPairIcon > 
                    <PersonIcon /> 
                </TinyPairIcon>
                <FriendCount > {this.props.data.friends} </FriendCount>
                <TinyStar> 
                    <StarType type="mini" rating={4}> <Star/> 
                </StarType> </TinyStar>
                <UserReviews> {this.props.data.reviews} </UserReviews>
                <StarContainer> 
                    <StarBox rating={this.props.data.rating} /> 
                </StarContainer>
                <Date> {this.dateFormatter(this.props.data.date)} </Date>
                <ReviewText>
                    <div id={this.props.data.user}>{(this.state.readMore) ? this.state.text : this.state.text.split(" ").slice(0, 22).join(" ")}</div>
                    {(this.props.data.text.split(" ").length > 22) ? <button onClick={this.onClickHandler}> {(this.state.readMore) ? 'Read less' : 'Read more'} </button> : null}
                </ReviewText>
            </SingleReview>
        )
    }
}

export default Review;


// { JSON.stringify(this.props.data) }