import React, { Component } from 'react';
import { Flex } from 'antd-mobile';

class Password extends Component {
    state = {
        id: 'Password',
        value: '',
        valueArray: []
    }
    static defaultProps = {
        length: '6'
    }
    componentWillMount = () => {
        this.putValToArray();
    }
    componentDidMount = () => {
        this.refs.control.focus();
    }
    onClick = () => { this.refs.control.focus() }
    onChange = () => {
        let value = this.refs.control.value;
        if (value.length > this.props.length) {
            value = value.substring(0, this.props.length);
        }
        this.setState({ value: value }, () => { this.putValToArray(); this.props.getValue(this.state.value);})
    }

    putValToArray = () => {
        let valueArray = [];
        for (let i = 0; i < this.props.length; i++) {
            valueArray[i] = { value: this.state.value.charAt(i) };
        }
        this.setState({ valueArray: valueArray });
    }

    render = () => {
        return (
            <div style={{ width: (51 * this.props.length + 1) + 'px' }}>
                <Flex className='bc-password-wrap'>
                    {this.state.valueArray.map((i, index) => {
                        return (
                            <Flex justify='center' className='bc-password-input' onClick={this.onClick} key={this.props.id + '_' + index}>{i.value !== '' ? <div className='bc-dot-2'></div> : ''}</Flex>)
                    })}
                    <input style={{ position: 'fixed', zIndex: '-1', opacity: '0' }} ref='control' onChange={this.onChange} value={this.state.value} />

                </Flex>
            </div>

        )

    }
}
export default Password;