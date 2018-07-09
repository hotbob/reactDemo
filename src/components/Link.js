import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Link extends Component {
    onClick = (event) => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        if (this.props.path !== undefined) {
            this.props.history.push('/' + this.props.path);
        }
    }
    render = () => {


        return (
            <span className='bc-font-link' onClick={this.onClick}>
                {this.props.children}
            </span>
        )

    }
}
export default withRouter(Link);