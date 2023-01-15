const app = require('./app');
const { connectDatabase } = require('./config/database');


connectDatabase();

app.listen(process.env.PORT,process.env.HOST,()=>{
    console.log(`Server are running at ${process.env.HOST}:${process.env.PORT}`);
});