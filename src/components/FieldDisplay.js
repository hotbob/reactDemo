import React, { Component } from 'react';
import { Flex } from 'antd-mobile';

class FieldDisplay extends Component {
    static defaultProps = {
        type: '1',
        align: 'center'
    }
    render = () => {
        return (
            <Flex align={this.props.align} direction='column'>
                <div className={'bc-gap-3-bottom bc-font-fieldvalue-' + this.props.type}>{this.props.fieldValue}</div>
                <div className={'bc-font-fieldname-' + this.props.type}>{this.props.fieldName}</div>
            </Flex>
        )

    }
}
export default FieldDisplay;