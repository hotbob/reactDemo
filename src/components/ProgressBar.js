import React, { Component } from 'react';
import { Flex } from 'antd-mobile';


class TitleBar extends Component {

    render = () => {
        return <Flex align={this.props.align} direction='column' className='bc-igap-3-v'>
            {this.props.title !== undefined ? <div className={this.props.titleClass === undefined ? 'bc-font-subtitle-2 bc-igap-1-bottom' : this.props.titleClass}>{this.props.title}</div> : ''}
            {this.props.value !== undefined ? <div>{this.props.value}</div> : ''}
        </Flex>
    }
}


class Element extends Component {

    static defaultProps = {
        align: 'center',
        titleLocation:'top'
    }
    render = () => {

        let lflinetype;
        let rtlinetype;
        if (this.props.linetype !== undefined) {
            lflinetype = this.props.linetype;
            rtlinetype = this.props.linetype;
        }
        if (this.props.lflinetype !== undefined) {
            lflinetype = this.props.lflinetype;
        }
        if (this.props.rtlinetype !== undefined) {
            rtlinetype = this.props.rtlinetype;
        }

        return (
            <Flex key={this.props.id + '_' + this.props.index} style={this.props.width !== undefined ? { width: this.props.width } : {}}>
                {this.props.align !== 'center' && this.props.align !== 'end' && !this.props.isFirst ? <div className='bc-gap-2-right' /> : ''}
                <Flex direction='column' align={this.props.align} className='bc-flex-grow-1'>
                    {this.props.titleLocation === 'top' ? <TitleBar {...this.props} /> : ''}

                    <Flex className='bc-row'>
                        {this.props.align === 'end' || this.props.align === 'center' ? <div className={'bc-flex-grow-1 bc-progress-line-' + lflinetype} /> : ''}
                        {this.props.icon !== undefined ? <img src={require('@root/imgs/icons/' + this.props.icon + '.png')} alt="" className={(this.props.iconClass === undefined ? 'bc-icon-x-11' : this.props.iconClass) + (this.props.align === 'end' || this.props.align === 'center' ? ' bc-gap-2-left' : '') + (this.props.align === 'start' || this.props.align === 'center' ? ' bc-gap-2-right' : '')} /> : ''}
                        {this.props.align === 'start' || this.props.align === 'center' ? <div className={'bc-flex-grow-1 bc-progress-line-' + rtlinetype} /> : ''}
                    </Flex>
                    {this.props.titleLocation === 'bottom' ? <TitleBar  {...this.props} /> : ''}
                </Flex>
                {this.props.align !== 'center' && this.props.align !== 'start' && !this.props.isLast ? <div className='bc-gap-2-left' /> : ''}
            </Flex>
        )

    }
}


class ProgressBar extends Component {
    static Element = Element;
    render = () => {
        if (this.props.id === undefined) {
            throw Object.assig({}, { message: 'id is required for progress bar' });
        }

        return (
            <Flex className={'bc-row' + this.props.className !== undefined ? ' ' + this.props.className : ''} justify='center'>
                {this.props.children}
            </Flex>
        )

    }
}
export default ProgressBar;