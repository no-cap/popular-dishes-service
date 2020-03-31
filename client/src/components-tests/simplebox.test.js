import React from 'react';
import { shallow } from 'enzyme';
import SimpleBox from '../components/simplebox.jsx';
describe('Components should render correctly', () => {
  test('SimpleBox should render correctly in "debug" mode', () => {
    const component = shallow(<SimpleBox myValue={5} />);

    expect(component).toMatchSnapshot();
  });
});