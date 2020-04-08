import React, { useState } from 'react';
import StarBox from '../Starbox/Starbox';
import Star from '../Starbox/Star';
import PersonIcon from '../PersonIcon/PersonIcon';
import StarType from '../Starbox/StarStyles';

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
  ReviewText,
} from './ReviewStyles';

const Review = ({ review }) => {
  const [readMore, setReadMore] = useState(false);
  const { username, photoUrl, rating, date, reviewText } = review;
  return (
    <SingleReview>
      <PhotoCropper>
        <ProfilePic src={photoUrl} />
      </PhotoCropper>
      <UserName>{username}</UserName>
      <TinyPairIcon>
        <PersonIcon />
      </TinyPairIcon>
      <FriendCount>{Math.floor(Math.random * 100)}</FriendCount>
      <TinyStar>
        <StarType type="mini" rating={rating}><Star /></StarType>
      </TinyStar>
      <UserReviews>{Math.floor(Math.random * 100)}</UserReviews>
      <StarContainer>
        <StarBox rating={rating} />
      </StarContainer>
      <Date>{date}</Date>
      <ReviewText>
        <div id={username}>{(readMore) ? reviewText : reviewText.split(' ').slice(0, 22).join(' ')}</div>
        {(reviewText.split(' ').length > 22) ? (
          <button onClick={() => {setReadMore(!readMore)}}>{readMore ? 'Read less' : 'Read more'}</button>
        ) : null}
      </ReviewText>
    </SingleReview>
  );
};

export default Review;
