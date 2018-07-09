import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import LazyLoadList from '@root/components/LazyLoadList';
import ListSection from '@root/components/ListSection';
import BackButton from '@root/components/BackButton';
import ListRow from '@root/components/ListRow';
import LabelContainer from '@root/components/LabelContainer';
import Phrases from '@root/modules/financing/Phrases';
import DAO from '@root/modules/financing/DAO';
class Transaction extends Component {
    render = () => {


        return (
            <ListSection key={this.props.item.id}>
                <ListRow><LabelContainer label={<Flex><div className='bc-title-decorator bc-icon-1-7 bc-gap-2-right' /><div className='bc-font-tag-3'>{this.props.item.name}</div></Flex>}><div className='bc-font-tag-3'>{this.props.item.time}</div></LabelContainer></ListRow>
                <ListRow><LabelContainer label={Phrases['transConfirmAmt']}><div className='bc-font-active'>{this.props.item.confirmamt}</div></LabelContainer></ListRow>
                <ListRow><LabelContainer label={Phrases['transAmt']}><div className='bc-font-link'>{this.props.item.amt}</div></LabelContainer></ListRow>
                <ListRow><LabelContainer label={Phrases['transType']}>{this.props.item.type}</LabelContainer></ListRow>
                <ListRow><LabelContainer label={Phrases['transResult']}>{this.props.item.result}</LabelContainer></ListRow>
            </ListSection>)
    }
}



class TransactionList extends Component {

    state = {
        groupIndex: 0,
        transactionList: []
    };
    componentDidMount = () => {
        this.getNextItemList();
    }
    getNextItemList = () => {
        let respData = DAO.getTransactionList(this.state.groupIndex);
        if (respData === undefined) {
            return true;
        } else {
            setTimeout(this.setState({
                groupIndex: this.state.groupIndex + 1,
                transactionList: [...this.state.transactionList, ...respData]
            }), 300)
            return false;
        }
    }
    renderRow = (rowData, sectionID, rowID) => {

        return (<Transaction key={rowData.id} item={rowData} />)

    }
    render = () => {

        return (<div><div className='bc-gap-withbottom-1'>

            <LazyLoadList
                onEndReached={this.getNextItemList} renderRow={this.renderRow} data={this.state.transactionList} />
        </div>
            </div>

        )
    }
}

export default TransactionList;
