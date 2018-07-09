import React, { Component } from 'react';

class SvgIcon extends Component {

    render = () => {
        return (
            <svg className={'am-icon' + (this.props.className !== undefined ? ' ' + this.props.className : '')}>
                <use xlinkHref={this.props.src} />
            </svg>
        )
    }
}
export default SvgIcon;