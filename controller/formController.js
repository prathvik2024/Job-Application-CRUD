const fetch = require("node-fetch");
require('dotenv').config();
const getRecords = async (query, database) => {
    console.log(query);
    var result;
    await new Promise((resolve, reject) => {
        fetch("http://localhost:9000/queryExecute", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ query, database }),
        }).then(async (data) => {
            resolve(await data.json());
        }).catch((err) => {
            reject(err);
        })
    }).then((data) => {
        result = data;
    }).catch((err) => {
        console.log(err);
        result = err;
    })
    return await result;
}
var response, query;
const insertRecords = async (body) => {
    query = `insert into basic_info (fname, lname,email, phone, gender, city, state,designation,relationship_status, dob,address1, address2, zipcode) values("${Object.values(body).slice(0, 13).join('","')}")`;
    response = await getRecords(query, process.env.database);
    if (response.result.status) {
        const lastInsertedId = response.result.data.insertId;
        console.log(lastInsertedId);
        query = `insert into preferances (candidate_id, notice_period, current_ctc, expected_ctc, location, department) values(${lastInsertedId},"${Object.values(body).slice(Object.keys(body).findIndex((val) => { return val.includes("pc-") }), body.length).join('","')}")`;
        response = await getRecords(query, process.env.database);
        if (response.result.status) {
            query = "";
            if (body["ed-ssc-board"] != '') {
                var index = Object.keys(body).findIndex((val) => { return val.includes("ed-ssc") });
                query = `insert into education_result (candidate_id, degree_name ,course_name , university_name, passing_year, percentage) values(${lastInsertedId},"ssc","ssc", "${Object.values(body).slice(index, index + 3).join('","')}" )`;
            } if (body["ed-hsc-course"] != '') {
                var index = Object.keys(body).findIndex((val) => { return val.includes("ed-hsc") });
                query += `,(${lastInsertedId},"hsc","hsc","${Object.values(body).slice(index, index + 3).join('","')}")`;
            } if (body["ed-uni-course"] != '') {
                var index = Object.keys(body).findIndex((val) => { return val.includes("ed-uni") });
                query += `,(${lastInsertedId},"bachelor", "${Object.values(body).slice(index, index + 4).join('","')}")`;
            }
            if (body["ed-unim-course"] != '') {
                var index = Object.keys(body).findIndex((val) => { return val.includes("ed-unim") });
                query += `,(${lastInsertedId},"master", "${Object.values(body).slice(index, index + 4).join('","')}")`;
            }
            if (query !== "") {
                response = await getRecords(query, process.env.database);
            }
            query = "";
            if (body["we-company1-name"] != '') {
                var index = Object.keys(body).findIndex((val) => { return val.includes("we-company1-name") });
                query = `insert into work_experience (candidate_id, company_name , designantion, from_date, to_date) values(${lastInsertedId},"${Object.values(body).slice(index, index + 4).join('","')}" )`;
            } if (body["we-company2-name"] != '') {
                var index = Object.keys(body).findIndex((val) => { return val.includes("we-company2-name") });
                query += `(${lastInsertedId},"${Object.values(body).slice(index, index + 4).join('","')}" )`;
            } if (query !== "") {
                response = await getRecords(query, process.env.database);
            }

            query = "";
            if (body["rc-ref1-name"] != '') {
                var index = Object.keys(body).findIndex((val) => { return val.includes("rc-ref1-name") });
                query = `insert into reference_contact (candidate_id, ref_name , phone, relation) values(${lastInsertedId},"${Object.values(body).slice(index, index + 3).join('","')}" )`;
            } if (body["rc-ref2-name"] != '') {
                var index = Object.keys(body).findIndex((val) => { return val.includes("rc-ref2-name") });
                query += `(${lastInsertedId},"${Object.values(body).slice(index, index + 3).join('","')}" )`;
            } if (query !== "") {
                response = await getRecords(query, process.env.database);
            }
            query =""
            var type = ["21", "22", "23"];
            var languages = ["lk-hindi", "lk-gujarati", "lk-english"];
            query = "insert into language_known (candidate_id, op_id, read_language, write_language, speak_language) values";
            var temp = query;
            var index = Object.keys(body).findIndex((val) => { return val.includes("lk") });
            var lastIndex = Object.keys(body).findIndex((val) => { return val.includes("tech") });
            var language_known = Object.keys(body).slice(index, lastIndex);

            languages.forEach((lang, i) => {
                if (language_known.includes(lang)) {
                    query += `(${lastInsertedId},`;
                    query += `${type[i]},`;
                    if (language_known.includes(lang + "-read")) {
                        query += "1,";
                    } else {
                        query += "0,";
                    }
                    if (language_known.includes(lang + "-write")) {
                        query += "1,";
                    } else {
                        query += "0,";
                    }
                    if (language_known.includes(lang + "-speak")) {
                        query += "1";
                    } else {
                        query += "0";
                    }
                    query += "),";
                }
            })
            query = query.slice(0, query.length - 1);
            if (temp !== query) {
                response = await getRecords(query, process.env.database);
            }
            query ="";
            var index = Object.keys(body).findIndex((val) => { return val.includes("tech") });
            var lastIndex = Object.keys(body).findIndex((val) => { return val.includes("rc") });
            var techIds = ["17", "18", "19", "20"];
            var techs = ["tech-php", "tech-android", "tech-java", "tech-flutter"];
            query = "insert into technology_known (candidate_id, op_id, tech_status) values";
            var technology_known = Object.keys(body).slice(index, lastIndex);

            techs.forEach((tech, i) => {
                if (technology_known.includes(tech)) {
                    query += `(${lastInsertedId},`;
                    query += `${techIds[i]},`;
                    if (technology_known.includes(tech + "-major")) {
                        query += `"${body[tech + "-major"]}"`;
                    }
                    query += "),";
                }
            })
            query = query.slice(0, query.length - 1);
            if (temp !== query) {
                response = await getRecords(query, process.env.database);
            }
        }
    }
    console.log("insert successfully");
}
module.exports = { getRecords, insertRecords };




// {
//     'bd-fname': 'Prathvik',
//     'bd-lname': 'Sankaliya',
//     'bd-email': 'prathvik@gmail.com',
//     'bd-phone': '9723816724',
//     'bd-gender': 'Male',
//     'bd-city': 'Limbdi',
//     'bd-state': 'Gujarat',
//     'bd-designation': 'software developer',
//     'bd-relation': 'Single',
//     'bd-date': '2024-03-14',
//     'bd-address1': 'matam chok limbdi',
//     'bd-address2': 'surendranagar market road',
//     'bd-zipcode': '363421',
//     'ed-select': 'ssc',
//     'ed-ssc-board': 'GSEB',
//     'ed-ssc-year': '2017',
//     'ed-ssc-pr': '89',
//     'ed-hsc-board': 'GSEB',
//     'ed-hsc-year': '2019',
//     'ed-hsc-pr': '79',
//     'ed-uni-course': 'BCA',
//     'ed-uni-name': 'Saurashtra University',
//     'ed-uni-year': '2022',
//     'ed-uni-pr': '98',
//     'ed-unim-course': 'MCA',
//     'ed-unim-name': 'DDU',
//     'ed-unim-year': '2024',
//     'ed-unim-pr': '89',
//     'we-company1-name': 'esparkBiz',
//     'we-company1-designation': 'SDE',
//     'we-company1-from': '2024-03-07',
//     'we-company1-to': '2024-03-14',
//     'we-company2-name': '',
//     'we-company2-designation': '',
//     'we-company2-from': '',
//     'we-company2-to': '',
//     'lk-hindi': 'lk-hindi',
//     'lk-hindi-read': 'lk-hindi-read',
//     'lk-hindi-write': 'lk-hindi-write',
//     'lk-hindi-speak': 'lk-hindi-speak',
//     'lk-guj': 'lk-guj',
//     'lk-guj-write': 'lk-guj-write',
//     'lk-guj-speak': 'lk-guj-speak',
//     'tech-php': 'tech-php',
//     'tech-php-major': 'tech-php-e',
//     'tech-android': 'tech-android',
//     'tech-android-major': 'tech-android-e',
//     'tech-flutter': 'tech-flutter',
//     'tech-flutter-major': 'tech-flutter-b',
//     'rc-ref1-name': 'Prathvik Sankaliya',
//     'rc-ref1-phone': '9723816724',
//     'rc-ref1-relation': 'CEO',
//     'rc-ref2-name': '',
//     'rc-ref2-phone': '',
//     'rc-ref2-relation': '',
//     'pc-notice': '1',
//     'pc-curr-ctc': '43',
//     'pc-exp-ctc': '75',
//     'pc-location': 'Ahmedabad',
//     'pc-department': 'Marketing'
//   }




// {
//     'bd-fname': 'asth',
//     'bd-lname': 'aertrh',
//     'bd-email': 'john@gmail.com',
//     'bd-phone': '9723816724',
//     'bd-gender': 'on',
//     'bd-city': 'Limbdi',
//     'bd-state': 'Gujarat',
//     'bd-designation': 'a wrwyt',
//     'bd-relation': 'Single',
//     'bd-date': '2024-03-13',
//     'bd-address1': 'j etyh',
//     'bd-address2': 'aetyh aeer',
//     'bd-zipcode': '363421',
//     'ed-select': 'ssc',
//     'ed-ssc-board': 'ghdg',
//     'ed-ssc-year': '456',
//     'ed-ssc-pr': '43',
//     'ed-hsc-board': 'adth',
//     'ed-hsc-year': '3452',
//     'ed-hsc-pr': '43',
//     'ed-uni-course': 'dfgh',
//     'ed-uni-name': 'fyhj e',
//     'ed-uni-year': '456',
//     'ed-uni-pr': '44',
//     'ed-unim-course': '',
//     'ed-unim-name': '',
//     'ed-unim-year': '',
//     'ed-unim-pr': '',
//     'we-company1-name': '',
//     'we-company1-designation': '',
//     'we-company1-from': '',
//     'we-company1-to': '',
//     'we-company2-name': '',
//     'we-company2-designation': '',
//     'we-company2-from': '',
//     'we-company2-to': '',
//     'rc-ref1-name': '',
//     'rc-ref1-phone': '',
//     'rc-ref1-relation': '',
//     'rc-ref2-name': '',
//     'rc-ref2-phone': '',
//     'rc-ref2-relation': '',
//     'pc-notice': '1',
//     'pc-curr-ctc': '43',
//     'pc-exp-ctc': '75',
//     'pc-location': 'Ahmedabad',
//     'pc-department': 'Marketing'
//   }

