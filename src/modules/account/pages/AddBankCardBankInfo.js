import React, { Component } from 'react';
import { Picker, Flex, Toast } from 'antd-mobile';
import Phrases from '@root/modules/account/Phrases';
import ListRow from '@root/components/ListRow';
import TextInput from '@root/components/TextInput';
import ListSection from '@root/components/ListSection';
import ProgressBar from '@root/components/ProgressBar';
import Radio from '@root/components/Radio';
import Link from '@root/components/Link';

class AddBankCardBankInfo extends Component {
    state = {
    }
    onSubmit = () => {
        let errors = [...this.validatecardno(), ...this.validatebank(), ...this.validatetpassword(), ...this.validateisAgreeTerms()]
        if (errors.length !== 0) {
            Toast.fail(<Flex direction='column'>{errors.map((msg) => { return <div key={msg}>{msg}</div> })}</Flex>, 1);
        } else {
            this.props.history.push('/account/addbankcard/bankinfotransrslt');
        }
    }
    componentWillMount = () => {
        this.setState(
            {
                banks: this.formatPickData(["杭州银行", "广西农信社", "中旅银行", "大连农商行"])

            }
        )
    }

    formatPickData = (valArray) => {
        let pickData = [];
        for (let i = 0; i < valArray.length; i++) {
            pickData[i] = { label: valArray[i], value: valArray[i] };
        }

        return pickData;
    }
    updateValue = (fieldName, fieldValue) => {
        let object = {};
        object[fieldName] = fieldValue;
        this.setState(object, () => this['validate' + fieldName]());
    }
    validatecardno = () => {
        let errors = [];
        if (this.state.cardno === undefined || this.state.cardno === '') {
            errors[errors.length] = Phrases['cardnoRequired'];
        }
        this.setState({ errcardno: errors });
        return errors;
    }

    validatebank = () => {
        let errors = [];
        if (this.state.bank === undefined || this.state.bank === '') {
            errors[errors.length] = Phrases['bankRequired'];
        }
        this.setState({ errbank: errors });
        return errors;
    }
    validatetpassword = () => {
        let errors = [];
        if (this.state.tpassword === undefined || this.state.tpassword === '') {
            errors[errors.length] = Phrases['tpasswordRequired'];
        }
        this.setState({ errtpassword: errors });
        return errors;
    }
    validateisAgreeTerms = () => {
        let errors = [];
        if (this.state.isAgreeTerms === false || this.state.isAgreeTerms === undefined) {
            errors[errors.length] = Phrases['termsRequired'];
        }
        this.setState({ errisAgreeTerms: errors });
        return errors;
    }
    render = () => {

        return (
            <div >
                <ListSection className='bc-background-1 bc-igap-10'>
                    <ProgressBar id='addbankcard_1'>
                        <ProgressBar.Element iconClass='bc-icon-20' isFirst={true} titleLocation='bottom' icon='personinfo' lflinetype='x' rtlinetype='3' width='30%' value={Phrases['personalinfo']} />
                        <ProgressBar.Element iconClass='bc-icon-20' titleLocation='bottom' icon='bankinfo' lflinetype='3' rtlinetype='2' width='40%' value={Phrases['bankinfo']} />
                        <ProgressBar.Element iconClass='bc-icon-20' isLast={true} titleLocation='bottom' icon='complete-unactive' lflinetype='2' rtlinetype='x' width='30%' value={Phrases['complete']} />
                    </ProgressBar>
                </ListSection>
                <ListRow>
                    <TextInput type='bankcard' align='right' placeholder={Phrases['entercardno']} getValue={(value) => this.updateValue('cardno', value)} errorMsg={this.state.errcardno}>{Phrases['cardno']}</TextInput>
                </ListRow>
                <ListRow>
                    <Picker value={this.state.bank} data={this.state.banks} cols='1' onOk={(value) => this.updateValue('bank', value)}>
                        <TextInput readonly='true' align='right' placeholder={Phrases['selbank']} errorMsg={this.state.errbank} value={this.state.bank}>{Phrases['bank']}</TextInput>
                    </Picker>
                </ListRow>
                <ListRow>
                    <TextInput type='password' align='right' placeholder={Phrases['entertpassword']} getValue={(value) => this.updateValue('tpassword', value)} errorMsg={this.state.errtpassword}>{Phrases['tpassword']}</TextInput>
                </ListRow>
                <Flex align='start' className='bc-igap-8-v bc-igap-10-h bc-background-1'>
                    <Radio getValue={(value) => this.updateValue('isAgreeTerms', value)} >{Phrases['readTerms']}<Link>{Phrases['accountTermsNm']}</Link></Radio>
                </Flex>
                <Flex direction='column' align='center' className='bc-igap-10-h bc-background-1 bc-igap-20-v'>
                    <Flex justify='center' className='bc-gap-10-bottom bc-button-2 bc-font-fieldvalue-4 bc-igap-5-v' onClick={this.onSubmit}>
                        {Phrases['confirm']}
                    </Flex>
                    <Flex justify='center' className='bc-font-fieldvalue-5 bc-button-5 bc-igap-5-v' onClick={() => this.props.history.goBack()}>
                        {Phrases['back']}
                    </Flex>
                </Flex>
            </div>
        )
    }
}
export default AddBankCardBankInfo;
