import React, { Component } from 'react';
import ItemList from '@root/modules/financing/pages/ItemList';
import ProductInfo from '@root/modules/financing/pages/ProductInfo';
import TransInfo from '@root/modules/financing/pages/TransInfo';
import TransactionList from '@root/modules/financing/pages/TransactionList';
import HoldList from '@root/modules/financing/pages/HoldList';
import Terms from '@root/modules/financing/pages/Terms';
import { Route, Switch } from 'react-router-dom';
class Financing extends Component {

    render = () => {
        return (
            <Switch>
                <Route exact path="/financing/productinfo" component={ProductInfo} />
                <Route exact path="/financing/transinfo" component={TransInfo} />
                <Route exact path="/financing/transactionlist" component={TransactionList} />
                <Route exact path="/financing/holdlist" component={HoldList} />
                <Route exact path="/financing/terms" component={Terms} />
                <Route path="/" component={ItemList} />
            </Switch>
        )
    }
}

export default Financing;
