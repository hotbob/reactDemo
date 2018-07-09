import React, { Component } from 'react';
import { Flex } from 'antd-mobile';

class Tag extends Component {
    static defaultProps = {
        type: 'basic'
    }
    render = () => {
        return (
            <Flex justify='center' className={'bc-igap-1-v bc-font-tag-1 bc-tag bc-tag-' + this.props.type}>
                {this.props.text}
            </Flex>
        )

    }
}
export default Tag;