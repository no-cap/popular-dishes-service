import React, { useState, useEffect } from 'react';
import $ from 'jquery';
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

const Review = ({ review, host }) => {
  const [readMore, setReadMore] = useState(false);
  const [username, setUsername] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const { photoUrl, rating, date, reviewText } = review;

  useEffect(() => {
    $.get(`http://${host}/api/users/${review.userId}`, (result) => {
      setUsername(result.username);
      setUserPhoto(result.userPhoto);
    });
  });

  return (
    <SingleReview>
      <PhotoCropper>
        <ProfilePic src={userPhoto} />
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
