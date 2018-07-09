import React, { Component } from 'react';
import { ListView, Flex, ActivityIndicator } from 'antd-mobile';
import Phrases from '@root/components/Phrases';
class LazyLoadList extends Component {

    state = {
        isLoading: false,
        isDataLoaded: false
    }

    dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => { console.log(row1); console.log(row2) },
    })
    onEndReached = (event) => {
        if (this.state.isLoading) {
            return;
        }
        this.setState({ isLoading: true }, () => {
            let dataLoaded = this.props.onEndReached();
            this.setState({
                isLoading: false,
                isDataLoaded: dataLoaded
            });
        });

    }

    scrollTo = (x, y) => {
        this.listView.scrollTo(x, y);
    }
    render = () => {
        return (
            <ListView
                className={this.props.className !== undefined ? this.props.className : ''}
                ref={(listView) => this.listView = listView}
                dataSource={this.dataSource.cloneWithRows(this.props.data)}
                renderFooter={() => (<Flex className='bc-igap-2-v' justify='center'>
                    {this.state.isDataLoaded ? Phrases['loaded'] : <ActivityIndicator text={Phrases['loading']} />}
                </Flex>)}
                initialListSize={this.props.initialListSize||5}
                renderRow={this.props.renderRow}
                useBodyScroll={true}
                onEndReached={this.onEndReached}
                pageSize={10}
                onEndReachedThreshold={200}
            />
        )

    }
}
export default LazyLoadList;