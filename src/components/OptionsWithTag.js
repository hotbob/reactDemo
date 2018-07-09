import React, { Component } from 'react';
class OptionsWithTag extends Component {
    onClick = (clickedValue) => {
        let newValueArray;
        let indexInSelected = this.getIndex(this.props.value, clickedValue);

        if (indexInSelected >= 0) {
            if (this.props.isMulti) {
                newValueArray = [...this.props.value];
                newValueArray.splice(indexInSelected, 1);
            } else {
                newValueArray = [];
            }

        } else {
            if (this.props.value === undefined) {
                newValueArray = [];
            } else {
                if (this.props.isMulti) {
                    newValueArray = [...this.props.value];
                } else {
                    newValueArray = [];
                }
            }
            newValueArray.push(clickedValue);
        }
        this.props.feedbackValue(newValueArray);
    }
    getIndex = (selectedValueArray, value) => {
        if (selectedValueArray === undefined) {
            return -1;
        } else {
            return selectedValueArray.indexOf(value);
        }
    }
    render = () => {
        return (
            <div>
                {
                    this.props.optionsData.map((item, index) => {
                        return (
                            <div key={index} onClick={() => { this.onClick(item.value) }}><div className={this.getIndex(this.props.value, item.value) >= 0 ? 'bc-background-2' : ''} style={{width:'16px',height:'16px',display:'inline-block',border: '1px solid #666',borderRadius:'50%',verticalAlign:'middle'}}></div>{item.content}</div>
                        );
                    })
                }
            </div>
        )
    }
}
export default OptionsWithTag;