import React, { Component } from 'react';

class MaskNo extends Component {

    render = () => {
        return (
            <span>
                {this.props.isMask?this.props.children.replace(new RegExp('[0-9]', "gm"),'*'):this.props.children}
            </span>
        )

    }
}
export default MaskNo;