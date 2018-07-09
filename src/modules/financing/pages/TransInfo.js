import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import Phrases from '@root/modules/financing/Phrases';

class TransInfo extends Component {

    clickBack=()=>{
        this.props.history.push('/financing');
    }

    render = () => {
        return (<Flex direction='column' className='bc-igap-10'>
            <img src={require('@root/imgs/icons/agree.png')} alt='' className='bc-logo-1 bc-gap-10-bottom bc-gap-50-top' />
            <Flex className='bc-font-title-1 bc-gap-30-bottom'>{Phrases['congratulation']}</Flex>
            <Flex onClick={this.clickBack} justify='center' className='bc-font-fieldvalue-4 bc-button-2 bc-igap-5-v'>{Phrases['backProList']}</Flex>
        </Flex>);
    }
}

export default TransInfo;
