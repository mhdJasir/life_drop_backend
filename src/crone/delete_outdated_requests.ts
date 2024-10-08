import cron from 'node-cron';
import { BloodRequest } from '../models/blood_requests';
import { Op } from 'sequelize';


const deleteInvalidRequests=  cron.schedule('* * * * *', async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    await BloodRequest.destroy({
        where: {
          date_of_requirement: {
            [Op.lt]: today
          }
        }
      });
});


export default deleteInvalidRequests;