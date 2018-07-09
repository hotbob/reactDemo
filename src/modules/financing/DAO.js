import Phrases from '@root/modules/financing/Phrases'
import Host from '@root/modules/HostSimulator'
import accounting from 'accounting'
class DAO {
    transform = (productionList) => {
        for (let i = 0; i < productionList.length; i++) {
            if (productionList[i].tag === 'tag-1') {
                productionList[i].tagtype = 'highlight';
            } else {
                productionList[i].tagtype = 'basic';
            }
            productionList[i].tag = Phrases[productionList[i].tag];
            productionList[i].profitRate = accounting.formatMoney(productionList[i].profitRate, '%', 1, undefined, undefined, '%v%s');
        }

        return productionList;
    }
    getProduction = (itemId) => {
        return Host.getProduction(itemId);

    }
    getProductionList = (orderId, orderDirection, groupIndex) => {
        let resultList = Host.getProductionList(orderId, orderDirection, groupIndex);
        if (resultList.length !== 0) {
            return this.transform(resultList);
        }

    }

    getTransactionList = (groupIndex) => {
        let resultList = Host.getTransactionList(groupIndex);
        if (resultList.length !== 0) {
            return resultList;
        }

    }
    getHoldList = (groupIndex) => {
        let resultList = Host.getHoldList(groupIndex);
        if (resultList.length !== 0) {
            return resultList;
        }

    }
    getHotProductionList = () => {
        return this.transform(Host.getHotProductionList());
    }
    getSumAmt = () => {
        return Host.getSumAmt();
    }
}

export default new DAO();