const express =require('express')
const mongoose=require('mongoose')
const dotEnv=require('dotenv')
const vendorRoutes=require('./routes/vendorRoute')
const firmRoutes=require('./routes/firmRoutes')
const productRoutes = require('./routes/productRoutes');
const bodyParser=require('body-parser')


const PORT=process.env.PORT||4000;

const app=express();
dotEnv.config();

app.use(bodyParser.json());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("connected"))
.catch((error)=>console.log(error));


app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes);
app.use('/product', productRoutes);


app.listen(PORT,()=>{
    console.log(`running port ${PORT}`);
})

app.use('/', (req,res)=>{
    res.send("homeeeeeeeeeeee");
})