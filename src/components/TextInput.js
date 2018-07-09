
import React, { Component } from 'react';
import { Flex, Toast } from 'antd-mobile';
import accounting from 'accounting';
import LabelContainer from '@root/components/LabelContainer';

class TextInput extends Component {

    static defaultProps = {
        type: 'text',
        readonly: false
    }
    getCursortPosition = () => {
        console.log(this.refs.control.selectionEnd);
        return this.refs.control.selectionEnd;
    }

    moveCursor = (changePos) => {
        let control = this.refs.control;
        control.focus();
        let selectionStart = control.selectionStart;
        let selectionEnd = control.selectionEnd;
        if (selectionStart === selectionEnd) {
            selectionStart = changePos;
        }
        selectionEnd = changePos;
        control.setSelectionRange(selectionStart, selectionEnd);
    }

    localeCursor = (preVal, value, validCharacters) => {
        let cursorPos = this.getCursortPosition();
        let validCharLen = 0;
        for (let i = 0; i < cursorPos; i++) {
            let valchar = preVal.substring(i, i + 1);
            if ((new RegExp(validCharacters).test(valchar))) {
                validCharLen++;
            }
        }
        let indicator = 0;
        let cursorLocation = 0;
        while (indicator < validCharLen && cursorLocation < value.length) {
            let valchar = value.substring(cursorLocation, cursorLocation + 1);
            if ((new RegExp(validCharacters).test(valchar))) {
                indicator++;
            }
            cursorLocation++;
        }
        return cursorLocation;
    }

    onChange = () => {
        let preVal = this.refs.control.value;
        let value = preVal;
        let validCharacters;
        if (this.props.type === 'currency') {
            validCharacters = '^[0-9.]$';
            if (value === '' || value === '￥') {
                value = ''
            } else {
                let valueArray = value.split('.');
                value = accounting.formatMoney(accounting.unformat(valueArray[0]), '￥', 0);
                if (valueArray.length >= 2) {
                    value = value + '.';
                    if (valueArray[1].length > 0) {
                        for (let i = 0; i < 2; i++) {
                            let decChar = valueArray[1].substring(i, i + 1);
                            if (!isNaN(decChar)) {
                                value = value + decChar;
                            } else {
                                break;
                            }
                        }
                    }
                }
            }

        } else if (this.props.type === 'mobile') {
            validCharacters = '^[0-9]$';
            value = value.replace(new RegExp(' ', "gm"), '');
            value = value.substring(0, 11);
            if (isNaN(value)) {
                value = this.state.value;
            } else {
                let newValArray = [];
                newValArray[0] = value.substring(0, 3);
                let remainString = value.substring(3);
                while (remainString !== "") {
                    newValArray.push(remainString.substring(0, 4));
                    remainString = remainString.substring(4);
                }
                value = newValArray.join(' ');
            }
        } else if (this.props.type === 'bankcard') {
            validCharacters = '^[0-9]$';
            value = value.replace(new RegExp(' ', "gm"), '');
            value = value.substring(0, 32);
            if (isNaN(value)) {
                value = this.state.value;
            } else {
                let newValArray = [];
                let remainString = value;
                while (remainString !== "") {
                    newValArray.push(remainString.substring(0, 4));
                    remainString = remainString.substring(4);
                }
                value = newValArray.join(' ');
            }
        } else if (this.props.type === 'phone') {
            validCharacters = '^[0-9-]$';
            value = value.replace(new RegExp(' ', "gm"), '');
            value = value.substring(0, 20);
            if (!(new RegExp("^[0-9-]+$")).test(value) && value !== '') {
                value = this.state.value;
            }
        } else if (this.props.type === 'id') {
            validCharacters = '^[0-9a-zA-Z]$';
            value = value.replace(new RegExp(' ', "gm"), '');
            if ((new RegExp("^[0-9a-zA-Z]+$")).test(value) || value === "") {
                value = value.substring(0, 20);
                let newValArray = [];
                let isCivil = !(new RegExp("^[a-zA-Z]").test(value));
                let remainStr;
                if (isCivil) {
                    newValArray.push(value.substring(0, 6));
                    remainStr = value.substring(6);
                } else {
                    remainStr = value;
                    let head = "";
                    while (new RegExp("^[a-zA-Z]").test(remainStr)) {
                        head = head + remainStr.substr(0, 1);
                        remainStr = remainStr.substring(1);
                    }
                    newValArray.push(head);
                }

                while (remainStr !== '') {
                    newValArray.push(remainStr.substring(0, 4));
                    remainStr = remainStr.substring(4);
                }

                value = newValArray.join(' ');

            } else {
                value = this.state.value;
            }
        } else if (this.props.type === 'captcha') {
            validCharacters = '^[0-9]$';
            value = value.substring(0, 6);
            if (isNaN(value)) {
                value = this.state.value;
            }
        }

        let cursorLocation;
        if (validCharacters !== undefined) {
            cursorLocation = this.localeCursor(preVal, value, validCharacters);
        }
        this.setState({ value: value }, () => { this.componentDidUpdateState(); if (cursorLocation !== undefined) { this.moveCursor(cursorLocation); } })
    }
    onBlur = () => {
        let value;
        if (this.props.type === 'currency' && this.state.value !== '') {

            value = accounting.formatMoney(this.state.value, '￥');

        } else {
            value = this.state.value;
        }
        if (this.props.onBlur !== undefined) { this.props.onBlur() };


        this.setState({ value: value }, this.componentDidUpdateState)
    }
    onErrClick = () => {

        Toast.fail(<Flex direction='column'>{this.props.errorMsg.map((msg) => { return <div key={msg}>{msg}</div> })}</Flex>, 1);
    }
    componentWillMount = () => {
        let placeholder = '';
        if (this.props.type === 'currency') {
            placeholder = '￥';
        } else if (this.props.placeholder !== undefined) {
            placeholder = this.props.placeholder;
        }
        let value = '';
        if (this.props.defaultValue !== undefined) {
            value = this.props.defaultValue;
        }
        this.setState({ placeholder: placeholder, value: value })
    }

    componentDidUpdateState = () => {
        if (this.props.getValue !== undefined && this.state.value !== this.props.value) {
            this.props.getValue(this.state.value);
        }
        this.getCursortPosition();
    }
    componentWillReceiveProps = (nextprops) => {
        if (nextprops.value !== undefined && this.state.value !== nextprops.value) {
            let value = nextprops.value;
            this.setState({ value: value })
        }
    }

    render = () => {

        let inputType = 'text';
        if (this.props.type === 'password') {
            inputType = 'password';
        } else if (['mobile', 'phone', 'bankcard', 'captcha', 'currency'].includes(this.props.type)) {
            inputType = 'tel';
        }
        let isShowError = false;
        if (this.props.errorMsg !== undefined && this.props.errorMsg.length) {
            isShowError = true;
        }

        return (
            <LabelContainer label={this.props.children}>
                <div className={'bc-full-width'}>
                    <input readOnly={this.props.readonly} onClick={this.props.onClick !== undefined ? this.props.onClick : () => { }} ref='control' type={inputType} onChange={this.onChange} onBlur={this.onBlur} placeholder={this.state.placeholder} value={this.state.value} className={(this.props.align === 'right' ? 'bc-text-align-right' : '') + (isShowError ? ' bc-font-error' : '')} />
                </div>
                {isShowError ? <div className='bc-input-error bc-gap-1-h' onClick={this.onErrClick} /> : ''}
            </LabelContainer>
        )
    }
}
export default TextInput;


