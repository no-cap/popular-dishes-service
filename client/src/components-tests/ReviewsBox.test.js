import React from 'react';
import { shallow,mount } from 'enzyme';
import ReviewsBox from '../components/ReviewsBox.jsx';
import Review from '../components/Review.jsx';


var sampleData = [
    {
        user: 'Bob',
        text: 'I love corn cheese'
    },
    {
        user: 'Bob',
        text: 'I love corn cheese'
    },
    {
        user: 'Bob',
        text: 'I love corn cheese'
    }
];

describe('ReviewsBox Unit Tests', () => {

    describe('ReviewBox should render correctly', () => {
        test('ReviewsBox should render correctly in "debug" mode', () => {

            const wrapper = shallow(<ReviewsBox reviews={sampleData} />);

            expect(wrapper).toMatchSnapshot();
        });

        test('ReviewsBox should have three children', () => {

            const wrapper = mount(<ReviewsBox reviews={sampleData} />);

            expect(wrapper.find('button')).toHaveLength(10);
        });
    });

});

