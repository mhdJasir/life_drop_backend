import moment from 'moment-timezone';

moment.tz.setDefault('Asia/Kolkata'); 

const localTime = moment().format('YYYY-MM-DD HH:mm:ss');

export default localTime;