const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());

app.use(cors());

const getindicesData = require('../controllers/getIndexdata');
const insertApi = require('../controllers/registration');
const updateApi = require('../controllers/userdetailsupdate');
const deleteApi = require('../controllers/deleteuserdetails');

//Testing 
app.get('/',  (req, res) => { //done
   res.send({
      status:200,
      message:'API is working fine!'
   })
})

// Get elastic indices data 
app.get('/search/alldata/:index', (req, res) => { //done
   getindicesData.getEachIndicesData(req, res);
})

// Get single elastic indices data 
app.post('/search/single/data', (req, res) => { //done
   getindicesData.getEachIndicesSingleRecord(req, res);
})

// Get repeated field data from the indices //students
app.get('/search/repeated/data', (req, res) => {
   getindicesData.getRepeatedFieldIndicesData(req, res);
})

// Insert single data into Elastic-search directly // indices students
app.post('/insert/single/data', (req, res) => { //done
   insertApi.insertSingleData(req, res);
});

// Update single data into Elastic-search // indices students
app.put('/update/user/data', (req, res) => { //done if data is not there then insert new records if "doc_as_upsert" : true || if its false if record is not there then it will throw an error
   updateApi.updateSingleData(req, res);
});


// Delete single data from Elastic-search // indices students
app.delete('/delete/user/data', (req, res) => {  //single and bulk
   deleteApi.deleteUserData(req, res);
});


// Delete indices from Elastic-search // indices students
app.delete('/delete/:index', (req, res) => { //done
   deleteApi.deleteElasticSearchIndex(req, res);
});

module.exports = app;