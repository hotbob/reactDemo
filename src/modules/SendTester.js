import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import ListRow from '@root/components/ListRow';
import TextInput from '@root/components/TextInput';
class SecuSimulator extends Component {
    state = {

    }
    updateValue = (fieldName, fieldValue) => {
        let object = {};
        object[fieldName] = fieldValue;
        this.setState(object);
    }
    onSubmit = () => {

        fetch(this.state.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: this.state.request
        }).then((response) => {
            return response.json()
        }).then((json) => {
            this.setState({ response: json })
        }).catch((ex) => {
            this.setState({ response: ex })
        })
    }
    render = () => {
        return (
            <div className='bc-mainbody bc-background-1'>
                <ListRow>
                    <TextInput placeholder='请输入请求URL' getValue={(value) => this.updateValue('url', value)}>URL</TextInput>
                </ListRow>
                <ListRow>
                    <textarea ref='request' placeholder='请输入请求' rows='10' style={{ width: '100%' }} onInput={() => this.updateValue('request', this.refs.request.value)}></textarea>
                </ListRow>
                <ListRow>
                    <textarea value={this.state.response.RSP_HEAD.TRACE_NO} readOnly={true} rows='10' style={{ width: '100%' }} onInput={() => console.log(123)}></textarea>
                </ListRow>
                <ListRow>
                    <Flex justify='center' className='bc-button-1 bc-font-fieldvalue-4 bc-igap-5-v' onClick={this.onSubmit}>
                        发送
                    </Flex>
                </ListRow>
            </div>

        )
    }
}

export default SecuSimulator;
