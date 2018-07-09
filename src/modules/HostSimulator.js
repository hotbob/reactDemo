import moment from 'moment'
import accounting from 'accounting'
class HostSimulator {

    //tags = ['tag-1', 'tag-2'];
    tags = ['tag-1'];
    names = ['天添利A款', '天添利B款', '得利宝A款', '得利宝B款', '得利宝C款', '得利宝D款', '沃德添利C款', '沃德添利D款'];
    terms = ['3个月', '6个月', '12个月', '24个月', '36个月'];
    risks = ['稳健', '较低', '中等', '中高', '较高'];
    transactions = ['申购', '认购'];
    //banks = ["杭州银行", "广西农信社", "中旅银行", "大连农商行"];
    //banksColor = ["blue", "green", "red", "orange"];
    banks = ["广西农信社"];
    banksColor = ["green"];
    userinfo = { userid: 'test', password: '123456', name: '张先生', mobile: '139****6639', avatar: 'avatar.png' };
    genProduction = (id) => {
        const initDate = moment(new Date())
        let prod = {};
        prod.id = id;
        prod.tag = this.getRadomVal(this.tags);
        prod.name = this.getRadomVal(this.names);
        prod.initTime = initDate.format('YYYY-MM-DD');
        if (prod.name.indexOf('添利') !== -1) {
            prod.term = '开放式';
            prod.startProfitTime = initDate.add(1, 'days').format('YYYY-MM-DD');
            prod.endProfitTime = '赎回日';
            prod.type = '开放式';
            prod.profitRate = (2 + Math.random() * 2).toFixed(1);

        } else {
            prod.term = this.getRadomVal(this.terms);
            prod.startProfitTime = initDate.add(Math.ceil(Math.random() * 10), 'days').format('YYYY-MM-DD');
            prod.endProfitTime = initDate.add(prod.term.replace('个月', ''), 'months').format('YYYY-MM-DD');
            prod.type = '封闭式';
            prod.profitRate = (4 + Math.random() * 2).toFixed(1);

        }
        prod.minAmount = accounting.formatMoney(50000, "￥", 0);
        prod.availableAmount = accounting.formatMoney(Math.ceil(Math.random() * 1000) * 10000, "￥");
        prod.increaseAmount = accounting.formatMoney(Math.ceil(Math.random() * 2) * 10000, "￥");
        prod.risk = this.getRadomVal(this.risks);

        return prod;

    }
    genTransaction = (id) => {
        const initDate = moment(new Date())
        let transaction = {};
        transaction.id = id;
        transaction.name = this.getRadomVal(this.names);
        transaction.amt = accounting.formatMoney(Math.ceil(Math.random() * 5) * 10000, "￥");
        transaction.type = this.getRadomVal(this.transactions);
        if (transaction.type === '认购') {
            transaction.confirmamt = transaction.amt;
        } else {

            transaction.confirmamt = accounting.formatMoney(accounting.unformat(transaction.amt) * (8 + Math.ceil(Math.random() * 2)) / 10, "￥");
        }
        transaction.result = '确认成功';
        transaction.time = initDate.subtract(Math.ceil(Math.random() * 10), 'days').format('YYYY-MM-DD');
        return transaction;
    }
    genHold = (id) => {
        const initDate = moment(new Date())
        let item = {};
        item.id = id;
        item.name = this.getRadomVal(this.names);
        item.amt = accounting.formatMoney(Math.ceil(Math.random() * 5) * 10000, "￥");
        item.cusnm = this.userinfo.name;
        item.time = initDate.add(Math.ceil(Math.random() * 50), 'days').format('YYYY-MM-DD');
        return item;
    }
    genBankCard = (id) => {
        let item = {};
        item.bank = this.banks[id];
        item.cardType = '储蓄卡';
        item.cardNo = '**** **** **** ' + (999 + Math.ceil(Math.random() * 8999));
        item.color = this.banksColor[id];
        return item;
    }

    genHoldList = () => {

        let id = (new Date()).getTime();
        this.sumHoldAmt = 0;
        this.holdList = [];
        for (let i = 0; i < 15; i++) {
            let hold = this.genHold(id++);
            this.holdList[i] = hold;
            this.sumHoldAmt = this.sumHoldAmt + accounting.unformat(this.holdList[i].amt)
        }

        this.sumHoldAmt = accounting.formatMoney(this.sumHoldAmt, '￥', 0);
    }

    genTransactionList = () => {

        let id = (new Date()).getTime();
        this.transactionList = [];
        for (let i = 0; i < 40; i++) {
            let transaction = this.genTransaction(id++);
            this.transactionList[i] = transaction;
        }
    }

    genProductionList = () => {

        let id = (new Date()).getTime();
        this.productionList = [];
        for (let i = 0; i < 40; i++) {
            let production = this.genProduction(id++);
            this.productionList[i] = production;
        }
    }
    getRadomVal = (valArray) => {
        return valArray[Math.floor(Math.random() * valArray.length)]
    }
    sortprofitRateasc = (aItem, bItem) => {
        let rslt = aItem.profitRate - bItem.profitRate;
        if (rslt === 0) {
            rslt = aItem.id - bItem.id;
        }
        return rslt;
    }
    sortprofitRatedesc = (aItem, bItem) => {
        let rslt = bItem.profitRate - aItem.profitRate;
        if (rslt === 0) {
            rslt = bItem.id - aItem.id;
        }
        return rslt;
    }
    sorttermasc = (aItem, bItem) => {
        let rslt = this.terms.indexOf(aItem.term) - this.terms.indexOf(bItem.term);
        if (rslt === 0) {
            rslt = aItem.id - bItem.id;
        }
        return rslt;
    }
    sorttermdesc = (aItem, bItem) => {
        let rslt = this.terms.indexOf(bItem.term) - this.terms.indexOf(aItem.term);
        if (rslt === 0) {
            rslt = bItem.id - aItem.id;
        }
        return rslt;
    }
    sortgeneralasc = (aItem, bItem) => {
        let rslt = this.names.indexOf(aItem.name) - this.names.indexOf(bItem.name);
        if (rslt === 0) {
            rslt = this.tags.indexOf(aItem.tag) - this.tags.indexOf(bItem.tag);
            if (rslt === 0) {
                rslt = aItem.id - bItem.id;
            }
        }
        return rslt;

    }
    sortgeneraldesc = (aItem, bItem) => {
        let rslt = this.names.indexOf(bItem.name) - this.names.indexOf(aItem.name);
        if (rslt === 0) {
            rslt = this.tags.indexOf(bItem.tag) - this.tags.indexOf(aItem.tag);
            if (rslt === 0) {
                rslt = bItem.id - aItem.id;
            }
        }
        return rslt;

    }
    sorttimeasc = (aItem, bItem) => {
        if (moment(aItem.time).isSame(moment(bItem.time), 'day')) {
            return aItem.id - bItem.id;
        } else if (moment(aItem.time).isAfter(moment(bItem.time), 'day')) {
            return 1;
        } else {
            return -1;
        }
    }
    sorttimedesc = (aItem, bItem) => {
        if (moment(bItem.time).isSame(moment(aItem.time), 'day')) {
            return bItem.id - aItem.id;
        } else if (moment(bItem.time).isAfter(moment(aItem.time), 'day')) {
            return 1;
        } else {
            return -1;
        }

    }
    sortstartProfitTimeasc = (aItem, bItem) => {
        if (moment(aItem.startProfitTime).isSame(moment(bItem.startProfitTime), 'day')) {
            return aItem.id - bItem.id;
        } else if (moment(aItem.startProfitTime).isAfter(moment(bItem.startProfitTime), 'day')) {
            return 1;
        } else {
            return -1;
        }
    }
    sortstartProfitTimedesc = (aItem, bItem) => {
        if (moment(bItem.startProfitTime).isSame(moment(aItem.startProfitTime), 'day')) {
            return bItem.id - aItem.id;
        } else if (moment(bItem.startProfitTime).isAfter(moment(aItem.startProfitTime), 'day')) {
            return 1;
        } else {
            return -1;
        }
    }
    login = (userid, password) => {

        if (this.userinfo.userid === userid && this.userinfo.password === password) {
            return this.userinfo;
        }
    }
    register = () => {
        return this.userinfo;
    }

    getProduction = (itemId) => {
        for (let i = 0; i < this.productionList.length; i++) {
            let production = this.productionList[i];
            if (production.id === itemId) {
                return production;
            };
        }
    }

    getTransactionList = (groupIndex) => {
        if (this.transactionList === undefined) {
            this.genTransactionList();
            this.transactionList.sort(this['sorttimedesc']);
        }
        let resultList = [];
        for (let i = 0; i < 10; i++) {
            let val = this.transactionList[groupIndex * 10 + i];
            if (val === undefined) {
                break;
            } else {
                let newObject = {};
                resultList[i] = Object.assign(newObject, val);
            }
        }
        return resultList;
    }

    getBankCardList = () => {
        let cardList = [];
        for (let i = 0; i <this.banks.length; i++) {
            cardList[i] = this.genBankCard(i);
        }


        return cardList;
    }
    getSumAmt = () => {
        if (this.sumHoldAmt === undefined) {
            this.genHoldList();
            this.holdList.sort(this['sorttimeasc']);
        }
        return this.sumHoldAmt;
    }
    getHoldList = (groupIndex) => {
        if (this.holdList === undefined) {
            this.genHoldList();
            this.holdList.sort(this['sorttimedesc']);
        }
        let resultList = [];
        for (let i = 0; i < 10; i++) {
            let val = this.holdList[groupIndex * 10 + i];
            if (val === undefined) {
                break;
            } else {
                let newObject = {};
                resultList[i] = Object.assign(newObject, val);
            }
        }
        return resultList;
    }

    getProductionList = (orderId, orderDirection, groupIndex) => {
        if (this.productionList === undefined) {
            this.genProductionList();
        }
        if (this.orderId !== orderId || this.orderDirection !== orderDirection) {
            this.productionList.sort(this['sort' + orderId + orderDirection]);
        }
        let resultList = [];
        for (let i = 0; i < 10; i++) {
            let val = this.productionList[groupIndex * 10 + i];
            if (val === undefined) {
                break;
            } else {
                let newObject = {};
                resultList[i] = Object.assign(newObject, val);
            }
        }
        return resultList;
    }
    getSecuList = () => {
        return [{ name: '渤海证券有限公司', id: '000145' }, { name: '东莞证券有限公司', id: '0005698' }, { name: '海通证券有限公司', id: '0004588' }, { name: '东莞证券有限公司', id: '融资证券-000025' }]
    }
    getHotProductionList = () => {
        if (this.productionList === undefined) {
            this.genProductionList();
        }
        if (this.hotProductionList === undefined) {
            this.hotProductionList = [];
            for (let i = 0; i < 2; i++) {
                this.hotProductionList[i] = this.productionList[i];
            }
        }
        let cloneList = [];
        for (let i = 0; i < this.hotProductionList.length; i++) {
            let newObject = {};
            cloneList[i] = Object.assign(newObject, this.hotProductionList[i]);
        }
        return cloneList;
    }
}
let instance = new HostSimulator();
export default instance;