
import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

class BottomNavBar extends Component {
    render = () => {
        return (
            <div className='bc-fixed-1 bc-stick-bottom' >
                <TabBar
                    unselectedTintColor="#999999"
                    tintColor="#2a81cb"
                    barTintColor="#fcfcfc"
                >
                    {this.props.items.map((item) => {
                        return (<TabBar.Item
                            title={item.title}
                            key={item.path}
                            icon={<img src={require('@root/imgs/icons/' + item.icon)} alt='' className='bc-icon-x-11 bc-gap-1-bottom' />}
                            selectedIcon={<img src={require('@root/imgs/icons/' + item.selectedIcon)} alt='' className='bc-icon-x-11 bc-gap-1-bottom' />}
                            selected={this.props.selectedTab === item.title}
                            onPress={() => {
                                if (this.props.history.location.pathname.substring(1) !== item.path) {
                                    this.props.history.push('/' + item.path);
                                }
                            }}
                        >
                        </TabBar.Item>)
                    })}
                </TabBar>
            </div>)

    }
}


export default withRouter(BottomNavBar);
