import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import LazyLoadList from '@root/components/LazyLoadList';
import ListSection from '@root/components/ListSection';
import BackButton from '@root/components/BackButton';
import FieldDisplay from '@root/components/FieldDisplay';
import MaskNo from '@root/components/MaskNo';
import Phrases from '@root/modules/financing/Phrases';
import DAO from '@root/modules/financing/DAO';
import Link from '@root/components/Link';
import ListItem from '@root/components/ListItem';
class Hold extends Component {
    render = () => {
        return (
            <ListSection className='bc-background-1'>
                <ListItem.Bar className='bc-border-1 bc-igap-10-h'>
                    <Flex className='bc-row'>
                        <Flex className='bc-cell bc-igap-3-v'>
                            <div className='bc-font-tag-3'>
                                {this.props.item.name}
                            </div>
                        </Flex>
                    </Flex>
                </ListItem.Bar>
                <ListItem.Body className='bc-border-1'>
                    <Flex className='bc-row'>
                        <Flex justify='center' className='bc-cell bc-igap-8-v'>
                            <FieldDisplay align='center' fieldName={Phrases['fieldAsset']} fieldValue={<MaskNo isMask={this.props.isMask}>{this.props.item.amt}</MaskNo>} type='2' />
                        </Flex>
                    </Flex>
                </ListItem.Body>
                <ListItem.Bar>
                    <Flex className='bc-row bc-igap-10-h'>
                        <Flex className='bc-cell bc-igap-3-v' style={{ width: '49%' }}>
                            <div className='bc-gap-5-right bc-font-subtitle-2'>{Phrases['Holder']}</div><Link>{this.props.item.cusnm}</Link>
                        </Flex>
                        <Flex direction='column' justify='center' className='bc-cell' style={{ width: '2%', height: '20px' }}>
                            <Flex className='bc-separator-v-2'></Flex>
                        </Flex>
                        <Flex justify='end' className='bc-cell  bc-igap-3-v' style={{ width: '49%' }}>
                            <div className='bc-gap-2-right bc-font-subtitle-2'>{Phrases['holdEndTime']}</div><Link>{this.props.item.time}</Link>
                        </Flex>
                    </Flex>
                </ListItem.Bar>
            </ListSection>)
    }
}



class HoldList extends Component {

    state = {
        groupIndex: 0,
        holdList: [],
        isMask: false
    };
    changeMaskFlag = () => {
        this.setState({ isMask: !this.state.isMask })
    }
    componentDidMount = () => {
        let sumAmt = DAO.getSumAmt();
        this.setState({ sumAmt: sumAmt })
        this.getNextItemList();
    }
    getNextItemList = () => {
        let respData = DAO.getHoldList(this.state.groupIndex);
        if (respData === undefined) {
            return true;
        } else {
            setTimeout(this.setState({
                groupIndex: this.state.groupIndex + 1,
                holdList: [...this.state.holdList, ...respData]
            }), 300)
            return false;
        }
    }
    renderRow = (rowData, sectionID, rowID) => {

        return (<Hold isMask={this.state.isMask} key={rowData.id} item={rowData} />)

    }
    render = () => {

        return (<div>
            <ListSection>
                <Flex className='bc-igap-10-h bc-hd-bg' style={{ height: document.documentElement.clientWidth / 2 }}>
                    <Flex className='bc-row'>
                        <Flex style={{ width: '20%' }}><BackButton size='8' /></Flex>
                        <Flex direction='column' justify='center' style={{ width: '60%' }}> <div className='bc-font-title-4 bc-gap-5-bottom'>{Phrases['fieldSumAmt']}</div>  <div className='bc-font-fieldvalue-6'><MaskNo isMask={this.state.isMask}>{this.state.sumAmt}</MaskNo></div></Flex>
                        <Flex justify='center' style={{ width: '20%' }}><img onClick={this.changeMaskFlag} className='bc-icon-15' src={require('@root/imgs/icons/' + (this.state.isMask ? 'mask.png' : 'unmask.png'))} alt='' /></Flex>
                    </Flex>
                </Flex>
            </ListSection>
            <LazyLoadList onEndReached={this.getNextItemList} renderRow={this.renderRow} data={this.state.holdList} />
        </div>


        )
    }
}

export default HoldList;
