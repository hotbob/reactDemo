import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import Phrases from '@root/modules/account/Phrases';
import ListSection from '@root/components/ListSection';
import MenuItem from '@root/components/MenuItem';
import { connect } from 'react-redux';

class MyInfo extends Component {

  render() {
    let userInfo = this.props.userinfo;

    return (
      <div>
        <ListSection>
          <Flex  direction='column' className='bc-my-bg bc-igap-5-v' style={{ height: document.documentElement.clientWidth / 3 }}>
              <Flex  className='bc-cell'>
                <img className='bc-icon-40 bc-gap-6-right' src={require('@root/imgs/pics/' + userInfo.avatar)} alt='' />
              </Flex>
              <Flex className='bc-cell'>
                <div className='bc-font-fieldvalue-4 bc-gap-5-right'>
                  {userInfo.name}
                </div>
                <div className='bc-font-title-4' style={{opacity:0.7}}>
                  {userInfo.mobile}
                </div>
              </Flex>
          </Flex>
        </ListSection>
        <ListSection>
          <MenuItem onClick={() => { this.props.history.push('/financing/transactionlist'); }} icon='transaction.png'>{Phrases['transactionDetails']}</MenuItem>
          <MenuItem onClick={() => { this.props.history.push('/financing/holdlist'); }} icon='holding.png'>{Phrases['itemDetails']}</MenuItem>
        </ListSection>
        <MenuItem onClick={() => { this.props.history.push('/account/cardlist'); }} icon='cardlist.png'>{Phrases['cardlist']}</MenuItem>

      </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    userinfo: state.common_userinfo
  }
}
MyInfo = connect(mapStateToProps)(MyInfo)

export default MyInfo;
