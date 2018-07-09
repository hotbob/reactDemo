
import React, { Component } from 'react';
import { Flex } from 'antd-mobile';

class MenuItem extends Component {
    state = {
        isCover: false
    }

    onTouchStart = () => {
        this.setState({
            isCover: true
        });
    }
    onTouchEnd = () => {
        this.setState({
            isCover: false
        });
    }
    componentWillMount = () => {
        if (this.props.onClick !== undefined) {
            let clickEvents = {};
            clickEvents.onClick = this.props.onClick;
            clickEvents.onTouchStart = this.onTouchStart;
            clickEvents.onTouchEnd = this.onTouchEnd;
            this.setState({ clickEvents: clickEvents })
        }

    }
    render = () => {
        return (
            <Flex className={'bc-row bc-background-1' + (this.state.isCover ? ' bc-cover-1' : '')}>
                <Flex className='bc-igap-10-right bc-cell'>
                    <Flex className='bc-igap-10-h'>
                        <img className='bc-icon-12' src={require('@root/imgs/icons/' + this.props.icon)} alt='' />
                    </Flex>
                    <Flex className='bc-row bc-menu-row' {...this.state.clickEvents}>
                        <Flex className='bc-igap-8-v bc-font-title-1 bc-cell'>
                            {this.props.children}
                        </Flex>
                        <Flex justify='end' className='bc-igap-8-v bc-font-title-1 bc-cell'>
                            <img className='bc-icon-4' src={require('@root/imgs/icons/arrow-right-2.png')} alt='' />
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        )
    }
}
export default MenuItem;