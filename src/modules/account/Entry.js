import React, { Component } from 'react';
import Login from '@root/modules/account/pages/Login';
import MyInfo from '@root/modules/account/pages/MyInfo';
import Register from '@root/modules/account/pages/Register';
import RegTrasnInfo from '@root/modules/account/pages/RegTrasnInfo';
import BankCardList from '@root/modules/account/pages/BankCardList';
import AddBankCardPersonInfo from '@root/modules/account/pages/AddBankCardPersonInfo';
import AddBankCardBankInfo from '@root/modules/account/pages/AddBankCardBankInfo';
import AddBankCardResult from '@root/modules/account/pages/AddBankCardResult';
import SecuList from '@root/modules/account/pages/SecuList';
import ResetPassword from '@root/modules/account/pages/ResetPassword';
import ResetPswRslt from '@root/modules/account/pages/ResetPswRslt';
import { connect } from 'react-redux';

import { Route, Switch } from 'react-router-dom';
class Account extends Component {
    render = () => {
        let renderPage;
        if (this.props.userinfo.userid !== undefined) {
            renderPage = MyInfo;
        } else {
            renderPage = Login;
        }

        return (
            <Switch>
                <Route exact path="/account/resetpswrslt" component={ResetPswRslt} />
                <Route exact path="/account/resetpassword" component={ResetPassword} />
                <Route exact path="/account/regTrasnInfo" component={RegTrasnInfo} />
                <Route exact path="/account/register" component={Register} />
                <Route exact path="/account/cardList" component={BankCardList} />
                <Route exact path="/account/signing" component={BankCardList} />
                <Route exact path="/account/signing/seculist" component={SecuList} />
                <Route exact path="/account/addbankcard" component={AddBankCardPersonInfo} />
                <Route exact path="/account/addbankcard/bankinfo" component={AddBankCardBankInfo} />
                <Route exact path="/account/addbankcard/bankinfotransrslt" component={AddBankCardResult} />
                <Route path="/account" component={renderPage} />
            </Switch>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userinfo: state.common_userinfo
    }

}
Account = connect(mapStateToProps)(Account)
export default Account;
