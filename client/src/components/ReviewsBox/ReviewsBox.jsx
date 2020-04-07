import React from 'react';
import Review from '../Review/Review';
import { ReviewsLength } from './ReviewsBoxStyle';

const ReviewsBox = ({ reviews }) => (
  <div>
    <ReviewsLength>{`Reviews (${reviews.length})`}</ReviewsLength>
    {reviews.map((review) => <Review data={review} />)}
  </div>
);

export default ReviewsBox;
