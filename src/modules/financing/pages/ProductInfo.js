import React, { Component } from 'react';
import { Modal, Toast, Flex } from 'antd-mobile';
import { connect } from 'react-redux';
import FieldDisplay from '@root/components/FieldDisplay';
import ProgressBar from '@root/components/ProgressBar';
import BackButton from '@root/components/BackButton';
import Radio from '@root/components/Radio';
import ListSection from '@root/components/ListSection';
import ListRow from '@root/components/ListRow';
import Link from '@root/components/Link';
import DAO from '@root/modules/financing/DAO';
import Phrases from '@root/modules/financing/Phrases';
import TextInput from '@root/components/TextInput';
import LabelContainer from '@root/components/LabelContainer';
import accounting from 'accounting'
import Password from '@root/components/Password';

class ProductionInfo extends Component {

    state = {
        loginAlert: false
    }
    componentWillUnmount = () => {
        this.props.saveprestate(this.state);
    }
    componentWillMount = () => {
        let initState;
        if (this.props.history.action === 'POP' && this.props.preState !== undefined) {
            initState = this.props.preState;
            initState.reload = true;
        } else {
            initState = { production: DAO.getProduction(this.props.itemId) };
        }
        this.setState(initState);
    }
    componentDidMount = () => {
        if (this.state.scrollY !== undefined) {
            window.scroll(0, this.state.scrollY);
        } else {
            window.scrollTo(0, 0);
        }
    }
    validateamount = () => {
        let errors = [];
        let amt = accounting.unformat(this.state.amount);
        let minAmt = accounting.unformat(this.state.production.minAmount);
        let increaseAmt = accounting.unformat(this.state.production.increaseAmount);
        if (amt === 0) {
            errors[errors.length] = Phrases['amtRequired'];
        }

        if (amt < minAmt) {
            errors[errors.length] = Phrases['amtLessThanMin'];
        }
        if ((amt - minAmt) % increaseAmt !== 0) {

            errors[errors.length] = Phrases['amtInvalidIncrease'];
        }
        this.setState({ erramount: errors });
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
    validatepassword = () => {

    }
    updateValue = (fieldName, fieldValue) => {
        let object = {};
        object[fieldName] = fieldValue;
        this.setState(object, () => this['validate' + fieldName]());
    }
    onSubmit = () => {
        let errors = [...this.validateamount(), ...this.validateisAgreeTerms()]
        if (errors.length !== 0) {
            Toast.fail(<Flex direction='column'>{errors.map((msg) => { return <div key={msg}>{msg}</div> })}</Flex>, 1);
        } else {

            if (this.props.userinfo.userid === undefined) {
                this.openLoginAlert();
            } else {
                this.openPasswordPanel();
            }
        }
    }
    toResult = () => {
        if (this.state.password !== undefined && this.state.password.length === 6) {
            this.props.history.push('/financing/transinfo');
        }

    }
    openPasswordPanel = () => {
        this.setState({ passwordPanel: true });
    }
    closePasswordPanel = () => {
        this.setState({ passwordPanel: false });
    }
    openLoginAlert = () => {
        this.setState({ loginAlert: true });
    }
    closeLoginAlert = () => {
        this.setState({ loginAlert: false });
    }
    openLoginAlert = () => {
        this.setState({ loginAlert: true });
    }
    closeLoginAlert = () => {
        this.setState({ loginAlert: false });
    }
    goLogin = () => {
        this.props.history.push('/account/login/back');
    }
    popTerms = () => {
        this.setState({ showTerm: true });
    }
    render = () => {
        if (this.state.production === undefined) {
            return <div></div>
        }
        return (<div>
            <ListSection>
                <div className='bc-background-2 bc-igap-5-v'>
                    <Flex className='bc-igap-10-h bc-igap-8-v'>
                        <Flex className='bc-row'>
                            <Flex className='bc-cell' style={{ width: '10%' }}>
                                <BackButton />
                            </Flex>
                            <Flex justify='center' className='bc-cell bc-font-title-4' style={{ width: '80%' }}>
                                {this.state.production.name}
                            </Flex>

                            <Flex className='bc-cell' style={{ width: '10%' }}>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex className='bc-igap-8-v'>
                        <Flex className='bc-row'>
                            <Flex justify='center' className='bc-cell'>
                                <FieldDisplay fieldValue={this.state.production.profitRate + '%'} fieldName={Phrases['fieldProfitRate']} type='3' />
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex className='bc-igap-8-v'>
                        <Flex className='bc-row'>
                            <Flex justify='center' className='bc-cell' style={{ width: '32%' }}>
                                <FieldDisplay fieldValue={this.state.production.term} fieldName={Phrases['fieldTerm']} type='4' />
                            </Flex>
                            <Flex direction='column' justify='center' className='bc-cell' style={{ width: '2%', height: '37.33px' }}>
                                <Flex className='bc-separator-v-1'></Flex>
                            </Flex>
                            <Flex justify='center' className='bc-cell' style={{ width: '32%' }}>
                                <FieldDisplay fieldValue={this.state.production.risk} fieldName={Phrases['fieldRisk']} type='4' />
                            </Flex>
                            <Flex direction='column' justify='center' className='bc-cell' style={{ width: '2%', height: '37.33px' }}>
                                <Flex className='bc-separator-v-1'> </Flex>
                            </Flex>
                            <Flex justify='center' className='bc-cell' style={{ width: '32%' }}>
                                <FieldDisplay fieldValue={this.state.production.minAmount} fieldName={Phrases['fieldMinAmount']} type='4' />
                            </Flex>
                        </Flex>
                    </Flex>
                </div>
            </ListSection>

            {this.state.production.type === '开放式' ? (<ListSection>
                <ListRow>
                    <LabelContainer label={Phrases['transTime']}>
                        {Phrases['transPeriod']}
                    </LabelContainer>
                </ListRow>
                <ListRow>
                    <LabelContainer label={Phrases['buytype']}>
                        {Phrases['buymethod']}
                    </LabelContainer>
                </ListRow>
                <ListRow>
                    <LabelContainer label={Phrases['selltype']}>
                        {Phrases['sellmethod']}
                    </LabelContainer>
                </ListRow>
            </ListSection>)
                :
                (<ListSection><ListRow>
                    <ProgressBar id='financing_period'>
                        <ProgressBar.Element isFirst={true} icon='today' linetype='2' width='35%' value={this.state.production.initTime} title={Phrases['today']} align='start' />
                        <ProgressBar.Element icon='start-profit' linetype='1' width='30%' value={this.state.production.startProfitTime} title={Phrases['startProfitTime']} align='start' />
                        <ProgressBar.Element isLast={true} icon='end-day' linetype='1' width='35%' value={this.state.production.endProfitTime} title={Phrases['endProfitTime']} align='end' />
                    </ProgressBar>
                </ListRow>
                </ListSection>)}


            <ListSection>
                <ListRow>
                    <LabelContainer label={Phrases['fieldIncreaseAmount']}>
                        {this.state.production.increaseAmount}
                    </LabelContainer>
                </ListRow>
                <ListRow>
                    <LabelContainer label={Phrases['fieldAvailableAmount']}>
                        {this.state.production.availableAmount}
                    </LabelContainer>
                </ListRow>
                <ListRow>
                    <LabelContainer label={Phrases['fieldProdType']}>
                        {this.state.production.type}
                    </LabelContainer>
                </ListRow>
            </ListSection>
            <ListSection>
                {this.state.production.type === '开放式' ? "" : (
                    <ListRow>
                        <LabelContainer label={Phrases['fieldProfitAmount']}>
                            {accounting.formatMoney((accounting.unformat(this.state.amount) * this.state.production.profitRate * this.state.production.term.replace('个月', '')) / 1200, '￥')}
                        </LabelContainer>
                    </ListRow>)}
                <ListRow>
                    <TextInput align='right' getValue={(value) => this.updateValue('amount', value)} type='currency' errorMsg={this.state.erramount} defaultValue={this.state.amount}>{Phrases['amount']}</TextInput>
                </ListRow>
            </ListSection>
            <Flex align='start' className='bc-gap-10-bottom bc-igap-3-v bc-igap-10-h'>
                <Radio getValue={(value) => this.updateValue('isAgreeTerms', value)} >{Phrases['readTerms']} <Link path='financing/terms'>{Phrases['productionTermsNm']}</Link>{Phrases['readTerms1']}</Radio>
            </Flex>
            <Flex justify='center' className='bc-button-1 bc-font-fieldvalue-4 bc-igap-5-v' onClick={this.onSubmit}>
                {Phrases['buy']}
            </Flex>
            <Modal transparent={true}
                visible={this.state.loginAlert} onClose={this.closeLoginAlert} className='bc-rounded-corner'>
                <Flex direction='column' className='bc-igap-5-v'>
                    <Flex justify='center' className='bc-full-width bc-igap-5-v'>{Phrases['comment']} </Flex>
                    <Flex justify='center' className='bc-font-fieldvalue-1 bc-igap-5-v bc-background-3 bc-full-width'>{Phrases['loginAlert']} </Flex>
                    <Flex justify='center' className='bc-full-width bc-igap-5-v'>
                        <Flex>
                            <Flex justify='center' className='bc-font-fieldvalue-4 bc-button-2 bc-igap-2-v bc-igap-10-h' onClick={this.goLogin}>{Phrases['goLogin']}</Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Modal>

            <Modal transparent={true}
                popup={true}
                visible={this.state.passwordPanel} onClose={this.closePasswordPanel} animationType='slide-up'>
                <Flex justify='center' direction='column' className='bc-igap-10-h bc-igap-8-v bc-gap-15-bottom'>
                    <Flex className='bc-row bc-font-tag-3 bc-gap-5-bottom'>
                        {Phrases['enterPassoword']}
                    </Flex>
                    <Flex className='bc-gap-10-bottom'>
                        <Password getValue={(value) => this.updateValue('password', value)} />
                    </Flex>
                    <Flex className='bc-row'>
                        <Flex onClick={this.toResult} justify='center' className={'bc-font-fieldname-6 bc-igap-5-v ' + (this.state.password !== undefined && this.state.password.length === 6 ? 'bc-button-6' : 'bc-button-7')}>
                            {Phrases['confirm']}
                        </Flex>
                    </Flex>
                </Flex>
            </Modal>


        </div>);
    }
}
const mapStateToProps = (state) => {
    return {
        itemId: state.financing_itemId,
        userinfo: state.common_userinfo,
        preState: state.common_prestate['/financing/productinfo']
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        saveprestate: (state) => {
            state.password='';
            state.loginAlert=false;
            state.passwordPanel=false;
            state.url = '/financing/productinfo';
            state.scrollY = window.scrollY;
            let action = { type: '/common/savestate', prestate: state };
            dispatch(action);
        }
    };
}
ProductionInfo = connect(mapStateToProps, mapDispatchToProps)(ProductionInfo)
export default ProductionInfo;
