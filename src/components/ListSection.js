import React, { Component } from 'react';

class ListSection extends Component {

    render = () => {
        return (
            <div className={'bc-gap-5-bottom'+(this.props.className!==undefined?' '+this.props.className:'')}>
                {this.props.children}
            </div>
        )
    }
}
export default ListSection;