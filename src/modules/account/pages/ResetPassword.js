import React, { Component } from 'react';
import { Flex, Toast } from 'antd-mobile';
import ListSection from '@root/components/ListSection';
import ListRow from '@root/components/ListRow';
import TextInput from '@root/components/TextInput';
import BackButton from '@root/components/BackButton';
import Phrases from '@root/modules/account/Phrases';
import DAO from '@root/modules/account/DAO';
import { connect } from 'react-redux'

class ResetPassword extends Component {
    state = {
      
    }
    onSubmit = () => {
        let errors = [...this.validatephoneno(), ...this.validatecaptcha(), ...this.validatepassword(), ...this.validatepassword2()]
        if (errors.length !== 0) {
            Toast.fail(<Flex direction='column'>{errors.map((msg) => { return <div key={msg}>{msg}</div> })}</Flex>, 1);
        } else {
            let userinfo = DAO.register();
            this.props.login(userinfo);
            this.props.history.push('/account/resetpswrslt')
        }
    }
    validatephoneno = () => {
        let errors = [];
        if (this.state.phoneno === undefined || this.state.phoneno === '') {
            errors[errors.length] = Phrases['phonenoRequired'];
        }
        this.setState({ errphoneno: errors });
        return errors;
    }
    getCaptcha = () => {
        let errors = [...this.validatephoneno()];
        if (errors.length !== 0) {
            Toast.fail(<Flex direction='column'>{errors.map((msg) => { return <div key={msg}>{msg}</div> })}</Flex>, 2);
        } else {
            if (this.state.count === 0) {
                this.setState({ count: this.state.maxCount }, () => {
                    // DAO.trigerCaptcha(this.state.phoneno.replace(new RegExp(" ", "gm"), ""));
                    let timerId = setInterval(() => {
                        let count = this.state.count;
                        count -= 1;
                        if (count < 1) {
                            clearInterval(this.state.timerId);
                        }
                        this.setState({ count: count });
                    }, 1000)
                    this.setState({ timerId: timerId });
                })

            }
        }
    }
    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    render = () => {
        return (
            <div className='bc-background-1 bc-full-screen bc-igap-10-v'>
             
            </div>);
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: (userinfo) => {
            let action = { type: '/common/login' };
            action = { ...action, ...userinfo };
            dispatch(action);
        }
    };
}

ResetPassword = connect(null, mapDispatchToProps)(ResetPassword)
export default ResetPassword;
