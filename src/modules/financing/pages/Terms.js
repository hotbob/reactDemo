import React, { Component } from 'react';
import { Flex, Carousel } from 'antd-mobile';
import BackButton from '@root/components/BackButton';

class Terms extends Component {

    state = {

    }
    componentWillMount = () => {
        let termPages = [];
        for (let i = 0; i < 19; i++) {
            termPages[i] = (i + 1) + '.png';
        }
        this.setState({ termPages: termPages });
    }
    render = () => {
        return (<Flex className='bc-background-1 bc-full-screen'>
            <div className='bc-gap-withbottom-1  bc-full-width'>
                <Carousel autoplay={false} dots={false}>
                    {this.state.termPages.map(val => (
                        <img onLoad={() => window.dispatchEvent(new Event('resize'))} key={val} src={require('@root/imgs/pics/terms/' + val)} alt="" style={{ width: '100%', verticalAlign: 'top' }} />
                    ))}
                </Carousel>
            </div>
        </Flex>);
    }
}

export default Terms;
