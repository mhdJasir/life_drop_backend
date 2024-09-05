import express from 'express';
import sequelize from './config/database';
import User from './models/user'; 


const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  try {
    await sequelize.sync();
    const users = await User.findAll();
    console.log(users);
    res.send(users);
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {  
  console.log(`Server is running on http://localhost:${port}`);
});
