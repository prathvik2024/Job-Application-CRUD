const app = require('express');
const router = app.Router();
const {getRecords, insertRecords} = require('../controller/formController');

router.get('/', (req, res)=>{
    res.render('jobapplicationform');
    // res.render('demo');
})
router.post("/insert", (req, res) =>{
    console.log(req.body);
    insertRecords(req.body);
})

module.exports = router;