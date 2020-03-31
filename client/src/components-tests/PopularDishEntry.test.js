import React from 'react';
import { shallow, mount } from 'enzyme';
import PopUpComponent from '../components/PopUpComponent.jsx';
import Review from '../components/Review.jsx';
import PhotoEntry from '../components/PhotoEntry.jsx';
import PopularDishEntry from '../components/PopularDishEntry.jsx';

var sampleItem = {
    name: 'Corn Cheese',
    price: 8.50,
    description: 'Corn with Cheese'
}

var sampleReviews = [
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

var samplePhotos = [
    {
        url: 'https://s3-media0.fl.yelpcdn.com/bphoto/EhwQv7W3nmJqdXhvCW7pJg/o.jpg',
        caption: 'Red Dragon roll was so good!! We devoured it in record timing!'
    },
    {
        url: 'https://s3-media0.fl.yelpcdn.com/bphoto/EhwQv7W3nmJqdXhvCW7pJg/o.jpg',
        caption: 'Red Dragon roll was so good!! We devoured it in record timing!'
    },
    {
        url: 'https://s3-media0.fl.yelpcdn.com/bphoto/EhwQv7W3nmJqdXhvCW7pJg/o.jpg',
        caption: 'Red Dragon roll was so good!! We devoured it in record timing!'
    },
    {
        url: 'https://s3-media0.fl.yelpcdn.com/bphoto/EhwQv7W3nmJqdXhvCW7pJg/o.jpg',
        caption: 'Red Dragon roll was so good!! We devoured it in record timing!'
    }
];

describe('PopularDishEntry Unit test', () => {
    // just seeing if the component even renders correctly
    describe('PopularDishEntry should render correctly', () => {
        test('PopularDishEntry should render correctly in "debug" mode', () => {

            const wrapper = shallow(<PopularDishEntry item={sampleItem} photos={samplePhotos} reviews={sampleReviews} />);

            expect(wrapper).toMatchSnapshot();
        });

        test('PopularDishEntry should have not have the pop up initially', () => {
            const wrapper = mount(<PopularDishEntry item={sampleItem} photos={samplePhotos} reviews={sampleReviews} />);
            expect(wrapper.find(PopUpComponent)).toHaveLength(0);
        });

        
    });

    describe('PopularDishEntry Unit Interaction test', () => {
        describe('onClickHandler', () => {
            test('it should invoke the correct method when a change event is emitted', () => {
                const mockClickHandler = jest.fn();
                const wrapper = shallow(<PopularDishEntry item={sampleItem} photos={samplePhotos} reviews={sampleReviews} />);
                wrapper.instance().onClickHandler = mockClickHandler;
                wrapper.instance().forceUpdate();
                wrapper.find('div').at(0).simulate('click');
                expect(mockClickHandler).toHaveBeenCalled();
            });
            // testing that click button increase photo count
            test('it should correctly update the state when a change event is emitted', () => {
                const wrapper = shallow(<PopularDishEntry item={sampleItem} photos={samplePhotos} reviews={sampleReviews} />);
                wrapper.find('div').at(0).simulate('click');
                expect(wrapper.instance().state.visiblePopUp).toBe(true);
                expect(wrapper.find(PopUpComponent)).toHaveLength(1);
                wrapper.find('div').at(0).simulate('click');
                expect(wrapper.find(PopUpComponent)).toHaveLength(0);
            });
        });
    });

    describe('PopularDishEntry Unit Integration test', () => {
        describe('onClickHandler for review after PopUp is visible', () => {
            test('Review component should work', () => {
                const wrapper = mount(<PopularDishEntry item={sampleItem} photos={samplePhotos} reviews={sampleReviews} />);
                wrapper.find('div').at(0).simulate('click');
                const reviewWrapper = wrapper.find(Review).first();
                expect(reviewWrapper.state().readMore).toEqual(false);
                expect(reviewWrapper.find('div').at(1).text()).toBe('I love')
                reviewWrapper.setState({'readMore': true});
                expect(reviewWrapper.state().readMore).toEqual(true);
                expect(reviewWrapper.find('div').at(1).text()).toBe('I love corn cheese')
            });
        });
    });

});
