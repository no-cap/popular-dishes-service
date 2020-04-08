import React from 'react';
import MenuItem from '../MenuItem/MenuItem';
import { FullMenuFormat } from './FullMenuStyles';

class FullMenu extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.props.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.props.handleKeyPress, false);
  }

  render() {
    const { restaurantName, popularDishes } = this.props;
    return (
      <FullMenuFormat>
        <h3><strong>Menu for {restaurantName}</strong></h3>
        {popularDishes.map((dish) => <MenuItem dish={dish} />)}
      </FullMenuFormat>
    );
  }
}

export default FullMenu;
