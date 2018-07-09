import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import DAO from '@root/modules/account/DAO';
import { withRouter } from 'react-router-dom';

class BankCard extends Component {
    onClick = () => {
        if (this.props.history.location.pathname === '/account/signing') {
            this.props.history.push('/account/signing/seculist')
        }
    }
    render = () => {
        return (
            <Flex onClick={this.onClick} direction='column' className={'bc-font-fieldname-6  bc-card bc-gap-5-bottom bc-igap-10 bc-card-color-' + this.props.item.color}>
                <Flex className='bc-row'>
                    <Flex justify='center' className='bc-card-logo-size bc-card-logo bc-gap-6-right'>
                        <img className='bc-icon-15-15' src={require('@root/imgs/icons/' + this.props.item.bank + '.png')} alt='' />
                    </Flex>
                    <div className='bc-gap-3-right'>{this.props.item.bank}</div>
                    <div className='bc-font-fieldvalue-4' >{this.props.item.cardType}</div>
                </Flex>
                <Flex className='bc-row'>
                    <div className='bc-card-logo-size bc-gap-6-right'></div>{this.props.item.cardNo}
                </Flex>

            </Flex>)

    }
}

BankCard=withRouter(BankCard);

class BankCardList extends Component {
    state = {
        bankCardList: []
    }

    componentDidMount = () => {
        this.setState({
            bankCardList: DAO.getBankCardList()
        })
    }
    goAddBankCard = () => {
        this.props.history.push('/account/addbankcard')
    }
    render = () => {

        return (
            <div className='bc-igap-10-h bc-igap-5-v'>
                {this.state.bankCardList.map((cardInfo) => {
                    return <BankCard key={cardInfo.bank} item={cardInfo} />
                })}
                <Flex onClick={this.goAddBankCard} justify='center' className={'bc-card-holder bc-font-fieldname-6  bc-card bc-igap-10'}>

                    <img onClick={this.onClick} src={require('@root/imgs/icons/add.png')} alt="" className='bc-icon-15' />

                </Flex>
            </div>


        )
    }
}

export default BankCardList;
