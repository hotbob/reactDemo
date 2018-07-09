import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import Phrases from '@root/modules/account/Phrases';

class RegTrasnInfo extends Component {

    clickProList = () => {
        this.props.history.push('/financing');
    }

    clickAddBankCard = () => {
        this.props.history.push('/account/addBankCard');
    }
    render = () => {
        return (<Flex direction='column' className='bc-igap-10'>
            <img src={require('@root/imgs/icons/agree.png')} alt='' className='bc-logo-1 bc-gap-10-bottom bc-gap-50-top' />
            <Flex className='bc-font-title-1 bc-gap-10-bottom'>{Phrases['congratulationReg']}</Flex>
            <Flex className='bc-gap-10-bottom bc-full-width'>
                <Flex onClick={this.clickProList} justify='center' className='bc-font-fieldvalue-4 bc-button-2 bc-igap-5-v'>{Phrases['goProList']}</Flex>
            </Flex>
            <Flex className='bc-gap-10-bottom bc-full-width'>
                <Flex onClick={this.clickAddBankCard} justify='center' className='bc-font-fieldvalue-5 bc-button-5 bc-igap-5-v'>{Phrases['goBindingCard']}</Flex>
            </Flex>
        </Flex>);
    }
}

export default RegTrasnInfo;
