import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import SvgIcon from '@root/components/SvgIcon';
import { withRouter } from 'react-router-dom';
import Phrases from '@root/components/Phrases';

class ListHeader extends Component {
    static defaultProps = {
        decorator: true
    }
    render = () => {
        return (
            <Flex className='bc-igap-10-h bc-header bc-igap-5-v'>
                <Flex className='bc-row'>
                    <Flex className='bc-cell'>
                        {this.props.decorator === true ? (
                            <div className='bc-title-decorator bc-icon-1-7 bc-gap-2-right' />
                        ) : ''}
                        {(typeof this.props.decorator) === 'string' ? (
                            <img src={require('@root/imgs/icons/' + this.props.decorator + '.png')} alt='' className='bc-gap-2-right bc-icon-8' />
                        ) : ''}
                        <div className='bc-font-title-1 bc-gap-6-right'>{this.props.title}</div>
                        {this.props.subtitle !== undefined ? (
                            <div className='bc-font-subtitle-2'>{this.props.subtitle}</div>
                        ) : ''}
                    </Flex>
                    {this.props.link === undefined ? '' : (
                        <Flex justify='end' className='bc-font-subtitle-1 bc-cell'>
                            <div onClick={() => this.props.history.push(this.props.link)}>{Phrases['more']}</div>
                            <SvgIcon src={require('@root/imgs/icons/right-arrow.svg')} className='bc-icon-6' />
                        </Flex>)}
                </Flex>
            </Flex>
        )

    }
}
export default withRouter(ListHeader);