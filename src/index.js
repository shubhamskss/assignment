const express=require("express")
const bodyParser=require('body-parser')
const routes=require("./routes/route")
const mongoose=require("mongoose")
const app=express()
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://shubhamskss:EG0LdZhg8keV3dA2@cluster0.qhjri.mongodb.net/shubham?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', routes);


app.listen(process.env.PORT || 3700, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3700))
});
