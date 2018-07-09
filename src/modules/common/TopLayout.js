import React, { Component } from 'react';
import Financing from '@root/modules/financing/Entry';
import Account from '@root/modules/account/Entry';
import SecuSimulator from '@root/modules/SecuSimulator';
import { Route, Switch } from 'react-router-dom';
import BottomNavBar from '@root/components/BottomNavBar'
import Phrases from '@root/modules/common/Phrases';
import SendTester from '@root/modules/SendTester';

class TopLayout extends Component {

    componentWillMount = () => {
        let bottomOptions = [{ title: Phrases['financing'], path: 'financing', icon: 'financing.png', selectedIcon: 'financing-selected.png' }, { title: Phrases['account'], path: 'account', icon: 'account-tab.png', selectedIcon: 'account-tab-selected.png' }];
        this.setState({ bottomOptions: bottomOptions });
    }

    render = () => {
       
        let nowPath = this.props.history.location.pathname.substring(1);
        if (nowPath === '') {
            nowPath = 'financing';
        } else if (nowPath === 'account/login'||nowPath === 'account/myinfo') {
            nowPath = 'account';
        }
        let isShowBottom = false;
        for (let i = 0; i < this.state.bottomOptions.length; i++) {
            if (nowPath === this.state.bottomOptions[i].path) {
                isShowBottom = true;
                break;
            }
        }
        return (<div>
            <div className='bc-mainbody'>
                <Switch>
                    <Route path="/account" component={Account} />
                    <Route path="/secu" component={SecuSimulator} />
                    <Route exact path="/test/send" component={SendTester} />
                    <Route path="/" component={Financing} />
                </Switch>
            </div>
            {isShowBottom ? <BottomNavBar items={this.state.bottomOptions} selectedTab={Phrases[nowPath]} /> : ''}
        </div>);
    }


}


export default TopLayout;