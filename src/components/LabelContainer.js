import React, { Component } from 'react';
import { Flex } from 'antd-mobile';

class LabelContainer extends Component {

    render = () => {
        return (
            <Flex className='bc-row'>
                <Flex className='bc-label bc-font-title-3'>
                    {this.props.label}
                </Flex>
                <Flex justify='end' className='bc-cell bc-font-fieldvalue-1'>
                   {this.props.children}
                </Flex>
            </Flex>
        )
    }
}
export default LabelContainer;