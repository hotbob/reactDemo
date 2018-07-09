import React, { Component } from 'react';
import { Flex } from 'antd-mobile';

class Radio extends Component {

    static defaultProps = {
        type: '1'
    }
    state = {
        checked: false
    }
    componentDidUpdateState = () => {
        if (this.props.getValue !== undefined) {
            this.props.getValue(this.state.checked);
        }
    }
    onClick = () => {

        this.setState({ checked: !this.state.checked }, this.componentDidUpdateState);

    }
    render = () => {
        return (
            <Flex align='start' onClick={this.onClick}>

                <div className={'bc-gap-3-right bc-radio-' + this.props.type + (this.state.checked ? ' bc-radio-checked' : '')}>
                </div>
                <div>
                    {this.props.children}
                </div>
            </Flex>
        )

    }
}
export default Radio;