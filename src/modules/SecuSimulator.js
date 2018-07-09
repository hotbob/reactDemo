import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import ListRow from '@root/components/ListRow';

class SecuSimulator extends Component {
    state = {
        loading: true,
        imgindex: 1
    }
    onLoaded = () => {
        let height=document.documentElement.clientHeight-55;
        this.setState({ loading: false,height:height});
    }
    nextPage = () => {
        if (this.state.imgindex < 49) {
            this.setState({ loading: true, imgindex: ++this.state.imgindex });
        } else {
            this.props.history.push('/financing');
        }
    }
    render = () => {
        return (
            <div className='bc-mainbody bc-background-1'>
                <ListRow>
                    <Flex justify='center' className='bc-font-title-5'>
                        {this.props.history.location.pathname.substring(this.props.history.location.pathname.lastIndexOf('/') + 1)}
                    </Flex>
                </ListRow>


                {this.state.loading ? <Flex justify='center' className='bc-font-title-5'>loading</Flex> : ''}
                <img onClick={this.nextPage} onLoad={() => this.onLoaded()} style={this.state.loading === false ? { 'width': '100%', 'height': this.state.height+'px' } : { 'display': 'none' }} src={require('@root/imgs/pics/secu/' + this.state.imgindex + '.jpg')} alt='' />



            </div>

        )
    }
}

export default SecuSimulator;
