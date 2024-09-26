import moment from 'moment-timezone';

moment.tz.setDefault('Asia/Kolkata');


function getNow(): string {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

export default getNow;


