import React, { Component } from 'react';
import { Flex } from 'antd-mobile';

class Bar extends Component {

    render = () => {
        return (
            <Flex className={'bc-igap-2-v bc-font-title-2'+(this.props.className!==undefined?' '+this.props.className:'')}>
                {this.props.children}
            </Flex>
        )

    }
}

class Body extends Component {

    render = () => {
        return (
            <Flex className={'bc-igap-2-v'+(this.props.className!==undefined?' '+this.props.className:'')}>
                {this.props.children}
            </Flex>
        )

    }
}


class ListItem extends Component {
    static Bar = Bar;
    static Body = Body;
    state = {
        isCover: false
    }

    onTouchStart = () => {
        this.setState({
            isCover: true
        });
    }
    onTouchEnd = () => {
        this.setState({
            isCover: false
        });
    }
    componentWillMount = () => {
        if (this.props.onClick !== undefined) {
            let clickEvents = {};
            clickEvents.onClick = this.props.onClick;
            clickEvents.onTouchStart = this.onTouchStart;
            clickEvents.onTouchEnd = this.onTouchEnd;
            this.setState({ clickEvents: clickEvents })
        }

    }
    render = () => {
        return (
            <div {...this.state.clickEvents} className={'bc-igap-20-h bc-igap-3-v bc-background-1' + (this.state.isCover ? ' bc-cover-1' : '')}>
                {this.props.children}
            </div>
        )

    }
}


export default ListItem;