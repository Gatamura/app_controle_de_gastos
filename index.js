const app = require('./config/custom-express')();
const port = 3000;

var apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

app.listen(port,() => {
    console.log(`Server is Running on Port ${port}`)
})
