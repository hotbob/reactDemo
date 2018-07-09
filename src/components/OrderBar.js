
import React, { Component } from 'react';
import { Flex } from 'antd-mobile';

class OrderBar extends Component {

    state = {
        activeId: '',
        activeOrder: 'desc'
    }

    componentWillMount = () => {
        this.setState(
            { activeId: this.props.initActiveId || this.props.orderOptions[0].id, activeOrder: this.props.initActiveOrder || 'desc' }
            , () => this.props.getOrder(this.state.activeId, this.state.activeOrder));
    }
    onClickOrder = (clickedId) => {
        let newState;

        if (clickedId === this.state.activeId) {

            if ('desc' === this.state.activeOrder) {
                newState = {
                    activeOrder: 'asc'
                };
            } else {
                newState = {
                    activeOrder: 'desc'
                };
            }

        } else {
            newState = {
                activeId: clickedId,
                activeOrder: 'desc'
            };
        }
        this.setState(newState, () => { this.props.getOrder(this.state.activeId, this.state.activeOrder) });
    }


    render = () => {
        return (<Flex className='bc-font-title-3 bc-list-row bc-row bc-igap-5-v'>
            {this.props.orderOptions.map((orderInfo) => {
                return (
                    <Flex className='bc-cell' key={orderInfo.id} justify='center' onClick={() => this.onClickOrder(orderInfo.id)}>
                        <div className={'bc-gap-3-right' + (orderInfo.id === this.state.activeId ? ' bc-font-active' : '')}>
                            {orderInfo.display}
                        </div>
                        <Flex direction='column' >
                            <img src={orderInfo.id === this.state.activeId && this.state.activeOrder === "asc" ? require('@root/imgs/icons/asc-arrow-active.png') : require('@root/imgs/icons/asc-arrow.png')} alt="" className='bc-icon-4 bc-gap-1-bottom' />
                            <img src={orderInfo.id === this.state.activeId && this.state.activeOrder === "desc" ? require('@root/imgs/icons/desc-arrow-active.png') : require('@root/imgs/icons/desc-arrow.png')} alt="" className='bc-icon-4' />
                        </Flex>

                    </Flex>)
            })}
        </Flex>)

    }
}


export default OrderBar;
