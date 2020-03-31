import React from 'react';
import { shallow, mount } from 'enzyme';
import PopUpComponent from '../components/PopUpComponent.jsx';
import Review from '../components/Review.jsx';
import PhotoEntry from '../components/PhotoEntry.jsx';
import PopularDishEntry from '../components/PopularDishEntry.jsx';
import PopularDishList from '../components/PopularDishList.jsx';

// for making a mock event
const mockEventGenerator = (str) => {
    return {
        target: {
            name: 'todo',
            value: str,
        },
        preventDefault: () => { },
    };
};

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

var samplePopularDishes = [
    {
        item: sampleItem,
        photos: samplePhotos,
        reviews: sampleReviews
    },
    {
        item: sampleItem,
        photos: samplePhotos,
        reviews: sampleReviews
    },
    {
        item: sampleItem,
        photos: samplePhotos,
        reviews: sampleReviews
    },
    {
        item: sampleItem,
        photos: samplePhotos,
        reviews: sampleReviews
    },
    {
        item: sampleItem,
        photos: samplePhotos,
        reviews: sampleReviews
    },
    {
        item: sampleItem,
        photos: samplePhotos,
        reviews: sampleReviews
    },
    {
        item: sampleItem,
        photos: samplePhotos,
        reviews: sampleReviews
    },
    {
        item: sampleItem,
        photos: samplePhotos,
        reviews: sampleReviews
    },
    {
        item: sampleItem,
        photos: samplePhotos,
        reviews: sampleReviews
    },
    {
        item: sampleItem,
        photos: samplePhotos,
        reviews: sampleReviews
    }
]

describe('PopularDishList Unit test', () => {
    // just seeing if the component even renders correctly
    describe('PopularDishList should render correctly', () => {
        test('PopularDishList should render correctly in "debug" mode', () => {

            const wrapper = shallow(<PopularDishList popularDishes={samplePopularDishes} />);

            expect(wrapper).toMatchSnapshot();
        });

        test('PopularDishList should have not have the pop up initially', () => {
            const wrapper = shallow(<PopularDishList popularDishes={samplePopularDishes} />);
            expect(wrapper.find(PopUpComponent)).toHaveLength(0);
            expect(wrapper.find(PopularDishEntry)).toHaveLength(3);
            expect(wrapper.find('button')).toHaveLength(1);
        });


    });

    describe('PopularDishList Unit Interaction test', () => {
        describe('onClickHandler', () => {
            test('it should invoke the correct method when a change event is emitted', () => {
                const mockClickHandler = jest.fn();
                const wrapper = shallow(<PopularDishList popularDishes={samplePopularDishes} />);
                wrapper.instance().onClickHandler = mockClickHandler;
                wrapper.instance().forceUpdate();
                wrapper.find('button').at(0).simulate('click');
                expect(mockClickHandler).toHaveBeenCalled();
            });
            // testing that click
            test('it should correctly update the state when a change event is emitted', () => {
                const wrapper = mount(<PopularDishList popularDishes={samplePopularDishes} />);
                wrapper.find('button').simulate('click', mockEventGenerator('right'));
                wrapper.find('button').simulate('click', mockEventGenerator('right'));
                wrapper.find('button').simulate('click', mockEventGenerator('right'));
                wrapper.find('button').simulate('click', mockEventGenerator('right'));
                wrapper.find('button').simulate('click', mockEventGenerator('left'));
                wrapper.find('button').simulate('click', mockEventGenerator('left'));
                expect(wrapper.instance().state.currentView).toBe(0)
            });
        });
    });

});
