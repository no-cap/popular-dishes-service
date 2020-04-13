import React from 'react';
import Review from '../Review/Review';
import { ReviewsLength } from './ReviewsBoxStyle';

const ReviewsBox = ({ reviews }) => (
  <div>
    <ReviewsLength>{`Reviews (${reviews.length})`}</ReviewsLength>
    {reviews.map((review) => <Review key={review.reviewId} review={review} />)}
  </div>
);

export default ReviewsBox;
