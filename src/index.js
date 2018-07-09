import React from 'react';
import ReactDOM from 'react-dom';
import App from '@root/App';
import '@root/modules/common/style/antd_mobile_cover.css'
import '@root/modules/common/style/bankcomm-font.css'
import '@root/modules/common/style/bankcomm-gap.css'
import '@root/modules/common/style/bankcomm-icon.css'
import '@root/modules/common/style/bankcomm.css'
try {
    ReactDOM.render(<App />, document.getElementById('root'));
} 
catch (err) {
    alert(err.name + " :" + err.message);
}finally{

}