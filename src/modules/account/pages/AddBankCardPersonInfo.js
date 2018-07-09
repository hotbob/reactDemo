import React, { Component } from 'react';
import MyInput from '@root/components/MyInput';
import Flex from '@root/components/Flex';
import Options from '@root/components/Options';
import OptionsWithTag from '@root/components/OptionsWithTag';
import Toast from '@root/components/Toast';
class AddBankCardPersonInfo extends Component {
    state = {
        optionsData: [
            {
                content: 'this is the first item!',
                value: 'value001'
            },
            {
                content: 'this is the second item!',
                value: 'value002'
            },
            {
                content: 'this is the three item!',
                value: 'value003'
            },
            {
                content: 'this is the four item!',
                value: 'value004'
            }
        ],
        content:'<div>这是toast</div>',
    }
    updateValue = (fieldName, fieldValue) => {
        let object = {};
        object[fieldName] = fieldValue;
        this.setState(object);
    }


    selected = (valueArray) => {
        this.setState({
            selectedArray: valueArray
        });
    }

    showToast =()=>{
        this.setState({
            visible: true
        });
    }

    render = () => {
        return (
            <div>
                <MyInput type='mobile' feedbackValue={(value) => this.updateValue('mobile', value)} value={this.state.mobile} placeholder='请输入手机号码'>手机：</MyInput>
                <MyInput type='bankcard' feedbackValue={(value) => this.updateValue('bankcard', value)} value={this.state.bankcard} placeholder='请输入银行卡号'>银行卡号：</MyInput>
                <MyInput type='phone' feedbackValue={(value) => this.updateValue('phone', value)} value={this.state.phone} placeholder='请输入公司电话'>公司电话：</MyInput>
                <MyInput type='id' feedbackValue={(value) => this.updateValue('idCode', value)} value={this.state.idCode} placeholder='请输入证件号码'>证件号码：</MyInput>
                <MyInput type='captcha' feedbackValue={(value) => this.updateValue('captcha', value)} value={this.state.captcha} placeholder='请输入验证码'>验证码：</MyInput>
                <MyInput type='text' feedbackValue={(value) => this.updateValue('testText', value)} value={this.state.testText} placeholder='请输入内容'>常规输入：</MyInput>
                <MyInput type='currency' feedbackValue={(value) => this.updateValue('currency', value)} value={this.state.currency} placeholder='请输入金额'>金额：</MyInput>
                <Flex justify='center' align='center'>
                    adsfadsfs
                </Flex>

              {/* <Options isMulti={true} optionsData={this.state.optionsData} feedbackValue={this.selected} value={this.state.optionv}/> */}
                
                <OptionsWithTag isMulti={true} optionsData={this.state.optionsData} feedbackValue={this.selected} value={this.state.selectedArray}/>
               
            </div>

        )
    }
}
export default AddBankCardPersonInfo;
