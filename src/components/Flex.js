import React, { Component } from 'react';
import '@root/modules/common/style/flex.css';
class Flex extends Component {
    static defaultProps = {
        direction: 'row',
        justify: 'start',
        align: 'center',
        wrap: 'nowrap'
    }

    render = () => {
        let className = 'bc-flexbox ';
        let styleName = {};

        className = className + 'bc-flexbox-direction-' + this.props.direction + ' ';

        className = className + 'bc-flexbox-justify-' + this.props.justify + ' ';

        className = className + 'bc-flexbox-align-' + this.props.align + ' ' + 'bc-flexbox-align-content-' + this.props.align + ' ';

        className = className + 'bc-flexbox-' + this.props.wrap;

        if (this.props.className !== undefined && this.props.className !== "") {
            className = className + ' ' + this.props.className;
        }
        if (this.props.style !== undefined) {
            styleName = this.props.style;
        }
        return (
            <div style={styleName} className={className}>
                {this.props.children}
            </div>
        )
    }
}
export default Flex;