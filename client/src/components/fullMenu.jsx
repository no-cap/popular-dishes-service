import React from 'react';
import MenuItem from './menuItem.jsx';
import { FullMenuFormat } from '../components-style/FullMenu-style.jsx';

class FullMenu extends React.Component {
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
        return (
            <FullMenuFormat>
                <h3><strong>Menu for {this.props.restaurant}</strong> </h3>
                {this.props.items.map((data) => <MenuItem data={data} />)}
            </FullMenuFormat>
        )
    }
}


export default FullMenu;
