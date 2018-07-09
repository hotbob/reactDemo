import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import LazyLoadList from '@root/components/LazyLoadList';
import OrderBar from '@root/components/OrderBar';
import ListHeader from '@root/components/ListHeader';
import ListItem from '@root/components/ListItem';
import FieldDisplay from '@root/components/FieldDisplay';
import Tag from '@root/components/Tag';
import Sticky from '@root/components/Sticky';
import Phrases from '@root/modules/financing/Phrases';
import DAO from '@root/modules/financing/DAO';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

class Item extends Component {

    onClick = () => {
        this.props.selItem(this.props.item.id);
        this.props.history.push('/financing/productinfo')
    }
    render = () => {
        return (
            <ListItem onClick={this.onClick}>
                <ListItem.Bar>
                    <Flex className='bc-row'>
                        <Flex className='bc-cell'>
                            {this.props.item.name}
                        </Flex>
                        <Flex justify='end' className='bc-cell'>
                            <Tag text={this.props.item.tag} type={this.props.item.tagtype} />
                        </Flex>
                    </Flex>
                </ListItem.Bar>
                <ListItem.Body >
                    <Flex className='bc-row'>
                        <Flex align='end' className='bc-cell'>
                            <FieldDisplay align='start' fieldName={Phrases['fieldProfitRate']} fieldValue={this.props.item.profitRate} type='2' />
                        </Flex>
                        <Flex align='end' justify='end' className='bc-cell'>
                            <Flex justify='center' className='bc-tag'>
                                <FieldDisplay fieldName={Phrases['fieldTerm']} fieldValue={this.props.item.term} />
                            </Flex>
                        </Flex>
                    </Flex>
                </ListItem.Body>
            </ListItem>)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selItem: (itemId) => {
            dispatch({
                type: '/financing/selItem',
                itemId: itemId
            });
        }
    };
}

Item = withRouter(connect(null, mapDispatchToProps)(Item))


class ItemList extends Component {

    state = {
        groupIndex: 0,
        productionList: [],
        hotProductionList: [],
    };
    componentWillUnmount = () => {
        this.props.saveprestate(this.state);
    }
    componentWillMount = () => {
        let initState;
        if (this.props.history.action === 'POP' && this.props.preState!== undefined) {
            initState = this.props.preState;
            initState.reload = true;
        } else {
            let orderOptions = [{ id: 'general', display: Phrases['general'] }, { id: 'profitRate', display: Phrases['profitRate'] }, { id: 'term', display: Phrases['term'] }];
            initState = { hotProductionList: DAO.getHotProductionList(), orderOptions: orderOptions };
        }
        this.setState(initState);
    }
    componentDidMount = () => {
        if (this.state.scrollY !== undefined) {
            window.scroll(0, this.state.scrollY);
        }
    }
    getNextItemList = () => {
        let respData = DAO.getProductionList(this.state.orderId, this.state.orderDirection, this.state.groupIndex);
        if (respData === undefined) {
            return true;
        } else {
            setTimeout(this.setState({
                groupIndex: this.state.groupIndex + 1,
                productionList: [...this.state.productionList, ...respData]
            }), 300)
            return false;
        }
    }
    renderRow = (rowData, sectionID, rowID) => {
        return (<Item key={rowData.id} item={rowData} />)

    }
    getStickyInfo = (info) => {
        this.setState({ stickyInitHeight: info.offsetTop, isStick: info.isStick })
    }
    selOrder = (orderId, orderDirection) => {

        if (this.refs.productListView !== undefined) {
            if (this.state.isStick === true) {
                this.refs.productListView.scrollTo(0, this.state.stickyInitHeight)
            }
        }
        if (this.state.reload) {
            this.setState({ reload: false });
        } else {
            this.setState({
                orderId: orderId,
                orderDirection: orderDirection,
                groupIndex: 0,
                productionList: []
            }, () => this.getNextItemList());
        }

    }
    render = () => {
        return (<div className='bc-gap-withbottom'>
            {this.state.hotProductionList !== undefined && this.state.hotProductionList.length > 0 ? (
                <div className='bc-gap-5-bottom'>
                    <ListHeader title={Phrases['hotProduction']} decorator={'hot'} />
                    {this.state.hotProductionList.map((hotProduction) => <Item key={hotProduction.id} item={hotProduction} />)}
                </div>) : ''}
            <div>
                <ListHeader title={Phrases['recommandProduction']} decorator={'recommand'} />
                <Sticky getInfo={this.getStickyInfo}>
                    <OrderBar initActiveId={this.state.orderId} initActiveOrder={this.state.orderDirection} getOrder={this.selOrder} orderOptions={this.state.orderOptions} />
                </Sticky>
                <LazyLoadList ref={"productListView"}
                    initialListSize={this.state.productionList.length} onEndReached={this.getNextItemList} renderRow={this.renderRow} data={this.state.productionList} />
            </div>
        </div>);
    }
}



const mapDispatchToListProps = (dispatch) => {
    return {
        saveprestate: (state) => {
            state.url = '/financing/itemlist';
            state.scrollY = window.scrollY;
            let action = { type: '/common/savestate', prestate: state };
            dispatch(action);
        }
    };
}
const mapStateToListProps = (state) => {
    return {
        preState: state.common_prestate['/financing/itemlist']
    }

}
ItemList = connect(mapStateToListProps, mapDispatchToListProps)(ItemList)
export default ItemList;

