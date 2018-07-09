import React, { Component } from 'react';
import LabelContainer from '@root/components/LabelContainer';
import accounting from 'accounting';
class MyInput extends Component {
    state = {
        format: {
            mobile: '\\d',
            currency: '\\d',
            bankcard: '\\d',
            phone: '\\d-',
            id: '\\da-zA-Z',
            captcha: '\\d',
            default: '\\d\\D'
        }
    }
    unformat = () => {
        let type = this.props.type;
        let value = this.refs.control.value;
        if (this['_unformat_' + type] !== undefined) {
            value = this['_unformat_' + type](value);
        } else {
            value = this['_unformat_default'](value);
        }
        return value;
    }
    _unformat_mobile = (value) => {
        value = value.replace(new RegExp(this.getInvalidChar(), "gm"), '');
        value = value.substring(0, 11);
        return value;
    }
    _unformat_currency = (value) => {
        value = value.replace(new RegExp(this.getInvalidChar(), "gm"), '');
        return value;
    }
    _unformat_bankcard = (value) => {
        value = value.replace(new RegExp(this.getInvalidChar(), "gm"), '');
        value = value.substring(0, 32);
        return value;
    }
    _unformat_phone = (value) => {
        value = value.replace(new RegExp(this.getInvalidChar(), "gm"), '');
        value = value.substring(0, 20);
        return value;
    }
    _unformat_id = (value) => {
        value = value.replace(new RegExp(this.getInvalidChar(), "gm"), '');
        value = value.substring(0, 20);
        return value;
    }
    _unformat_captcha = (value) => {
        value = value.replace(new RegExp(this.getInvalidChar(), "gm"), '');
        value = value.substring(0, 6);
        return value;
    }
    _unformat_default = (value) => {
        return value;
    }

    format = () => {
        //获取当前组件的type和value值
        let type = this.props.type;
        let value = this.props.value;
        //根据传入的type类型来进行数据处理
        if (this['_format_' + type] !== undefined) {
            value = this['_format_' + type](value);
        } else {
            value = this['_format_default'](value);
        }
        return value;

    }

    _format_default = (value) => {
        if (value === undefined) {
            return '';
        }
        return value;
    }

    _format_mobile = (value) => {
        if (value === undefined) {
            return '';
        }
        let newValArray = [];
        newValArray[0] = value.substring(0, 3);
        let remainString = value.substring(3);
        while (remainString !== "") {
            newValArray.push(remainString.substring(0, 4));
            remainString = remainString.substring(4);
        }
        value = newValArray.join(' ');
        return value;
    }
    _format_currency = (value) => {
        if (value === undefined || value === '') {
            return '';
        }
        value = accounting.formatMoney(value, '￥', 0);
        return value;
    }
    _format_bankcard = (value) => {
        if (value === undefined) {
            return '';
        }
        let newValArray = [];
        let remainString = value;
        while (remainString !== "") {
            newValArray.push(remainString.substring(0, 4));
            remainString = remainString.substring(4);
        }
        value = newValArray.join(' ');

        return value;
    }
    _format_phone = (value) => {
        if (value === undefined) {
            return '';
        }
        return value;
    }
    _format_id = (value) => {
        if (value === undefined) {
            return '';
        }
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
        return value;
    }
    _format_captcha = (value) => {
        if (value === undefined) {
            return '';
        }
        return value;
    }
    componentDidUpdate = () => {
        if (this.validLen !== undefined) {
            this.moveCursor();
        }
    }
    moveCursor = () => {
        let control = this.refs.control;
        let value = control.value;
        let indicator = 0;
        let cursorLocation = 0;
        control.focus();
        while (indicator < this.validLen && cursorLocation < value.length) {
            let valchar = value.substring(cursorLocation, cursorLocation + 1);
            if ((new RegExp(this.getValidChar()).test(valchar))) {
                indicator++;
            }
            cursorLocation++;
        }
        let selectionStart = control.selectionStart;
        let selectionEnd = control.selectionEnd;
        if (selectionStart === selectionEnd) {
            selectionStart = cursorLocation;
        }
        selectionEnd = cursorLocation;
        control.setSelectionRange(selectionStart, selectionEnd);
    }
    handleChange = () => {
        let validLen = this.getValidCharLen();
        this.validLen = validLen;
        this.props.feedbackValue(this.unformat());

    }
    getValidCharLen = () => {
        let cursorPos = this.refs.control.selectionEnd;
        let value = this.refs.control.value;
        let validCharLen = 0;
        for (let i = 0; i < cursorPos; i++) {
            let valchar = value.substring(i, i + 1);
            if ((new RegExp(this.getValidChar()).test(valchar))) {
                validCharLen++;
            }
        }
        return validCharLen;
    }
    getValidChar = () => {
        let format = this.state.format[this.props.type];
        if (format === undefined) {
            format = this.state.format['default'];
        }
        return '[' + format + ']';

    }
    getInvalidChar = () => {
        let format = this.state.format[this.props.type];
        if (format === undefined) {
            format = this.state.format['default'];
        }
        return '[^' + format + ']';

    }
    render = () => {
        let inputType = 'text';
        if (this.props.type === 'password') {
            inputType = 'password';
        } else if (['mobile', 'phone', 'bankcard', 'captcha', 'currency'].includes(this.props.type)) {
            inputType = 'tel';
        }
        return (
            <div>
                {this.props.children}   <input ref='control' type={inputType} onChange={this.handleChange} value={this.format()} placeholder={this.props.placeholder} />
            </div>
        );
    }
}
export default MyInput;


