import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import Phrases from '@root/modules/account/Phrases';
import ListSection from '@root/components/ListSection';
import ProgressBar from '@root/components/ProgressBar';
class AddBankCardResult extends Component {

    clickProList = () => {
        this.props.history.push('/financing');
    }


    clickAddBankCard = () => {
        this.props.history.push('/account/addBankCard');
    }
    render = () => {
        return (<div><ListSection className='bc-background-1 bc-igap-10'>
            <ProgressBar id='addbankcard_1'>
                <ProgressBar.Element iconClass='bc-icon-20' isFirst={true} titleLocation='bottom' icon='personinfo' lflinetype='x' rtlinetype='3' width='30%' value={Phrases['personalinfo']} />
                <ProgressBar.Element iconClass='bc-icon-20' titleLocation='bottom' icon='bankinfo' linetype='3' width='40%' value={Phrases['bankinfo']} />
                <ProgressBar.Element iconClass='bc-icon-20' isLast={true} titleLocation='bottom' icon='complete' lflinetype='3' rtlinetype='x' width='30%' value={Phrases['complete']} />
            </ProgressBar>
        </ListSection>
            <Flex direction='column' className='bc-igap-10'>
                <img src={require('@root/imgs/icons/smile.png')} alt='' className='bc-logo-1 bc-gap-10-bottom' />
                <Flex className='bc-font-title-1 bc-gap-10-bottom'>{Phrases['congratulationReg']}</Flex>
                <Flex className='bc-gap-10-bottom bc-full-width'>
                    <Flex onClick={this.clickProList} justify='center' className='bc-font-fieldvalue-4 bc-button-2 bc-igap-5-v'>{Phrases['goProList']}</Flex>
                </Flex>
                <Flex className='bc-gap-10-bottom bc-full-width'>
                    <Flex onClick={this.clickAddBankCard} justify='center' className='bc-font-fieldvalue-5 bc-button-5 bc-igap-5-v'>{Phrases['goBindingCard2']}</Flex>
                </Flex>
            </Flex>
        </div>);
    }
}

export default AddBankCardResult;
