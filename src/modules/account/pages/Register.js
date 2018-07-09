import React, { Component } from 'react';
import { Flex, Toast } from 'antd-mobile';
import ListSection from '@root/components/ListSection';
import ListRow from '@root/components/ListRow';
import TextInput from '@root/components/TextInput';
import BackButton from '@root/components/BackButton';
import Phrases from '@root/modules/account/Phrases';
import DAO from '@root/modules/account/DAO';
import { connect } from 'react-redux'

class Register extends Component {
    state = {
        count: 0,
        maxCount: 60
    }
    onSubmit = () => {
        let errors = [...this.validatephoneno(), ...this.validatecaptcha(), ...this.validatepassword(), ...this.validatepassword2()]
        if (errors.length !== 0) {
            Toast.fail(<Flex direction='column'>{errors.map((msg) => { return <div key={msg}>{msg}</div> })}</Flex>, 1);
        } else {
            let userinfo = DAO.register();
            this.props.login(userinfo);
            this.props.history.push('/account/regTrasnInfo')
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
    validatepassword = () => {
        let errors = [];
        if (this.state.password === undefined || this.state.password === '') {
            errors[errors.length] = Phrases['passwordRequired'];
        }
        this.setState({ errpassword: errors });
        return errors;
    }
    validatecaptcha = () => {
        let errors = [];
        if (this.state.captcha === undefined || this.state.captcha === '') {
            errors[errors.length] = Phrases['idcodeRequired'];
        }
        this.setState({ erridcode: errors });
        return errors;
    }
    validatepassword2 = () => {
        let errors = [];
        if (this.state.password2 === undefined || this.state.password2 === '') {
            errors[errors.length] = Phrases['password2Required'];
        }
        if (this.state.password !== this.state.password2) {
            errors[errors.length] = Phrases['password2Error'];
        }

        this.setState({ errpassword2: errors });
        return errors;
    }
    updateValue = (fieldName, fieldValue) => {
        let object = {};
        object[fieldName] = fieldValue;
        this.setState(object, () => this['validate' + fieldName]());
    }
    render = () => {
        return (
            <div className='bc-background-1 bc-full-screen bc-igap-10-v'>
                <ListSection>
                    <ListRow>
                        <TextInput type='mobile' placeholder={Phrases['enterphoneno']} getValue={(value) => this.updateValue('phoneno', value)} errorMsg={this.state.errphoneno}><img className='bc-icon-8 bc-gap-3-right' src={require('@root/imgs/icons/phone.png')} alt='' />{Phrases['phoneno']}</TextInput>
                    </ListRow>
                    <ListRow>
                        {/* <Flex>
                            <TextInput type='idcode' placeholder={Phrases['enteridcode']} getValue={(value) => this.updateValue('idcode', value)} errorMsg={this.state.erridcode}><img className='bc-icon-8 bc-gap-3-right' src={require('@root/imgs/icons/idcode.png')} alt='' />{Phrases['idcode']}</TextInput>
                            <Flex justify='center' className='bc-font-tag-1 bc-button-4 bc-igap-5-v'>{Phrases['getidcode']}</Flex>
                        </Flex> */}
                        <Flex>
                            <TextInput type='captcha' placeholder={Phrases['entercaptcha']} getValue={(value) => this.updateValue('captcha', value)} errorMsg={this.state.errcaptcha}><img className='bc-icon-8 bc-gap-3-right' src={require('@root/imgs/icons/idcode.png')} alt='' />{Phrases['captcha']}</TextInput>
                            <Flex justify='center' onClick={this.getCaptcha} className={'bc-font-tag-1 bc-igap-5-v' + (this.state.count > 0 ? ' bc-button-4' : ' bc-button-8')}>
                                {this.state.count > 0 ? this.state.count + Phrases['getcaptcha1'] : Phrases['getcaptcha']}
                            </Flex>
                        </Flex>
                    </ListRow>
                    <ListRow>
                        <TextInput placeholder={Phrases['enterpassword']} type='password' getValue={(value) => this.updateValue('password', value)} errorMsg={this.state.errpassword}><img className='bc-icon-8 bc-gap-3-right' src={require('@root/imgs/icons/password.png')} alt='' />{Phrases['password']}</TextInput>
                    </ListRow>
                    <ListRow>
                        <TextInput placeholder={Phrases['enterpassword2']} type='password' getValue={(value) => this.updateValue('password2', value)} errorMsg={this.state.errpassword2}><img className='bc-icon-8 bc-gap-3-right' src={require('@root/imgs/icons/password.png')} alt='' />{Phrases['password2']}</TextInput>
                    </ListRow>
                </ListSection>
                <div className='bc-igap-5-v bc-igap-10-h'>
                    <Flex onClick={this.onSubmit} justify='center' className='bc-font-fieldvalue-4 bc-button-2 bc-igap-5-v'>{Phrases['register']}</Flex>
                </div>
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

Register = connect(null, mapDispatchToProps)(Register)
export default Register;
