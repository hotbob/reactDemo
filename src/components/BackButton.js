
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class BackButton extends Component {
    static defaultProps = {
        size: '6',
        type:'1'
    }

    onClick=()=>{
        this.props.history.goBack();
    }
    render = () => {
        return (
            <img onClick={this.onClick} src={require('@root/imgs/icons/arrow-left-'+this.props.type+'.png')} alt="" className={'bc-icon-' + this.props.size} />
        )

    }
}
export default withRouter(BackButton);