import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Sticky extends Component {
    state = {
        isStick: false
    }

    componentDidMount = () => {
        let el = ReactDOM.findDOMNode(this);
        this.setState({
            offsetTop: el.offsetTop,
            selfHeight: el.offsetHeight
        }, () => window.onscroll = this.onscroll);
    }
    componentWillUnmount = () => {
        window.onscroll = undefined;
    }
    onscroll = () => {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (!this.state.isStick) {
            if (scrollTop > this.state.offsetTop) {
                this.setState({ isStick: true }, () => { if (this.props.getInfo !== undefined) { this.props.getInfo(this.state) } });
            }
        } else {
            if (scrollTop < this.state.offsetTop) {
                this.setState({ isStick: false }, () => { if (this.props.getInfo !== undefined) { this.props.getInfo(this.state) } });
            }
        }
    }

    render = () => {
        return (<div style={this.state.isStick ? {marginBottom:this.state.selfHeight+'px'} :{}}>
            <div className={this.state.isStick ? 'bc-stick-top bc-fixed-1' : ''}>
                {this.props.children}
            </div>
        </div>
        )

    }
}
export default Sticky;