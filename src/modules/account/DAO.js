import Host from '@root/modules/HostSimulator'
class DAO {

    login = (userid, password) => {
        return Host.login(userid, password);

    }
    register = () => {
        return Host.register();
    }
    getBankCardList = () => {
        return Host.getBankCardList();
    }
    getSecuList=()=> {
        return Host.getSecuList();
    }
    trigerCaptcha=(phoneno)=>{
        let req = {
            phoneNo:phoneno
        }
        super.sendMsg('/BBCS_ONLINE_BDP/appSendCheckCodeProcess.ajax',req,false)
    }
}

export default new DAO();