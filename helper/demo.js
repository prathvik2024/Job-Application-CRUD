const fs = require('fs');
const path = require('path');

const readJson = async () => {
     var result = fs.readFileSync(path.join(__dirname + "/../public/js/helper/citystate.json"), "utf-8", (err, data) => {
        if (err) {
            console.log(err)
        }
    });
    return JSON.parse(result);
}
const selectBox = async ()=>{
    var selectStr = "<select name='state' id='state'>";
    await new Promise((resolve, reject)=>{
        resolve(readJson());
    }).then((result)=>{ 
        Object.keys(result).forEach((state)=>{
            selectStr += `<option value="${state}">${state}</option>`
        })
        selectStr +="</select>";
    })
    document.getElementById('citystate').innerHTML = selectStr;
}
selectBox();