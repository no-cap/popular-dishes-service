import React from 'react';
import Review from './Review.jsx';
import { ReviewsLength } from '../components-style/ReviewsBox-style.jsx';

const ReviewsBox = ({ reviews }) => (
    <div>
    <ReviewsLength>Reviews ({reviews.length})</ReviewsLength>
    {reviews.map((review) => <Review data={review}/>)}
    </div>
);

export default ReviewsBox;