import React, { Component } from 'react';
import { Flex, Toast } from 'antd-mobile';
import { connect } from 'react-redux'
import ListSection from '@root/components/ListSection';
import ListRow from '@root/components/ListRow';
import TextInput from '@root/components/TextInput';
import Link from '@root/components/Link';
import Phrases from '@root/modules/account/Phrases';
import DAO from '@root/modules/account/DAO';
class Login extends Component {
  state = {}

  onSubmit = () => {
    let errors = [...this.validateuserid(), ...this.validatepassword()]
    if (errors.length !== 0) {
      Toast.fail(<Flex direction='column'>{errors.map((msg) => { return <div key={msg}>{msg}</div> })}</Flex>, 1);
    } else {
      let userinfo = DAO.login(this.state.userid, this.state.password);
      if (userinfo === undefined) {
        Toast.fail(<Flex direction='column'><div>{Phrases['invaliduser']}</div></Flex>, 1);
        let errors = [Phrases['invaliduser']]
        this.setState({ erruserid: errors, errpassword: errors });
      } else {
        this.props.login(userinfo);
        if (this.props.history.location.pathname === '/account/login/back') {
          this.props.history.goBack();
        } else {
          this.props.history.push('/account/myinfo');
        }

      }
    }
  }

  validateuserid = () => {
    let errors = [];
    if (this.state.userid === undefined || this.state.userid === '') {
      errors[errors.length] = Phrases['useridRequired'];
    }
    this.setState({ erruserid: errors });
    return errors;
  }
  validatepassword = () => {
    let errors = [];
    if (this.state.password === undefined || this.state.password === '') {
      errors[errors.length] = Phrases['passwordRequired'];
    }
    this.setState({ errpassword: errors });
    return errors;
  }
  updateValue = (fieldName, fieldValue) => {
    let object = {};
    object[fieldName] = fieldValue;
    this.setState(object, () => this['validate' + fieldName]());
  }
  render = () => {
    return (
      <div className='bc-background-1 bc-full-screen'>
        <Flex justify='center'>
          <img className='bc-icon-80 bc-gap-25-top' src={require('@root/imgs/icons/ProLogo.png')} alt='' />
        </Flex>
        <Flex justify='center'>
          <div className="bc-font-link bc-font-size-12">{Phrases['consignmentmanagement']}</div>
        </Flex>
        <Flex justify='center' className="bc-gap-10-bottom bc-igap-3-v">
          <div className="bc-font-link bc-font-size-8">{Phrases['enconsignmentmanagement']}</div>
        </Flex>

        <ListSection>
          <ListRow>
            <TextInput placeholder={Phrases['enteruserid']} getValue={(value) => this.updateValue('userid', value)} errorMsg={this.state.erruserid}><img className='bc-icon-8 bc-gap-3-right' src={require('@root/imgs/icons/account.png')} alt='' />{Phrases['userid']}</TextInput>
          </ListRow>
          <ListRow>
            <TextInput placeholder={Phrases['enterpassword']} type='password' getValue={(value) => this.updateValue('password', value)} errorMsg={this.state.errpassword}><img className='bc-icon-8 bc-gap-3-right' src={require('@root/imgs/icons/password.png')} alt='' />{Phrases['password']}</TextInput>
          </ListRow>
        </ListSection>
        <div className='bc-igap-5-v bc-igap-10-h'>
          <Flex onClick={this.onSubmit} justify='center' className='bc-font-fieldvalue-4 bc-button-2 bc-igap-5-v'>{Phrases['login']}</Flex>
        </div>
        <Flex className='bc-igap-5-bottom bc-igap-10-h'>
          <Flex className='bc-row'>
            <Flex className='bc-cell'>
              <Link path='account/register'>{Phrases['goRegister']}</Link>
            </Flex>
            <Flex className='bc-cell' justify='end'>
              <Link path='account/resetpassword'>{Phrases['goResetPasswrod']}</Link>
            </Flex>
          </Flex>
        </Flex>

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

Login = connect(null, mapDispatchToProps)(Login)


export default Login;
