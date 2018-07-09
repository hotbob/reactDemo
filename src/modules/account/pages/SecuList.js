import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import BackButton from '@root/components/BackButton';
import DAO from '@root/modules/account/DAO';
import Phrases from '@root/modules/account/Phrases';
import ListRow from '@root/components/ListRow';
import { withRouter } from 'react-router-dom';

class SecuInfo extends Component {

    render = () => {
        return (
            <ListRow>
                <Flex className='bc-row'>
                    <Flex align='start' justify='end' className='bc-cell'>
                        <Flex align='start' direction='column' className='bc-cell'>
                            <Flex className='bc-font-title-1 bc-gap-3-bottom'><div className='bc-dot-1 bc-gap-3-right bc-dot-1-size' />{this.props.item.name}</Flex>
                            <Flex className='bc-font-tag-3' ><div className='bc-gap-3-right bc-dot-1-size' />({this.props.item.id})</Flex>
                        </Flex>
                        <Flex align='start'>
                            <Flex justify='center' onClick={() => this.props.history.push('/secu/' + this.props.item.name)} className='bc-button-5 bc-igap-2-v bc-igap-3-h bc-font-link'>{Phrases['signsecu']}</Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </ListRow>)

    }
}

SecuInfo = withRouter(SecuInfo)

class SecuList extends Component {
    state = {
        secuList: []
    }

    componentDidMount = () => {
        this.setState({
            secuList: DAO.getSecuList()
        })
    }
    render = () => {

        return (<div>
            <div className='bc-gap-withbottom-1 bc-background-1'>
                {this.state.secuList.map((secuInfo) => {
                    return <SecuInfo key={secuInfo.id} item={secuInfo} />
                })}
            </div>
            <Flex className='bc-fixed-1 bc-stick-bottom'>
                <Flex justify='center' className='bc-row'>
                    <div className='bc-igap-5-v'>
                        <BackButton type='3' size='15' />
                    </div>
                </Flex>
            </Flex></div>

        )
    }
}

export default SecuList;
