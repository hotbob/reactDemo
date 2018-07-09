import React, { Component } from 'react';

class ListRow extends Component {

    render = () => {
        return (
            <div className='bc-background-1 bc-igap-10-h'>
                <div className='bc-list-row bc-igap-8-v'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default ListRow;