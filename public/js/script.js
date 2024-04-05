const isNull = (str) => {
    return str.trim() === '';
}
const isAlpha = (str) => {
    return !(/^[a-z]+$/i.test(str));
}
const isAlphaNumeric = (str) => {
    return !(/^[a-zA-Z0-9_ ]*$/.test(str));
}
const is1Digit = (str) => {
    return !(/[1-4]{1}/.test(str));
}
const is2Digit = (str) => {
    return !(/\b([0-9]|[1-9][0-9])\b/.test(str));
}
const isMulAlpha = (str) => {
    return !(/^[a-zA-Z_ ]*$/.test(str));
}
const isEmail = (str) => {
    return !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str));
}
const isPhone = (str) => {isAlpha
    return str < 6666666666;
}
const isDate = (str) => {
    return /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(str);
}
const isYear = (str) => {
    return ((/[0-9]{4}/.test(parseInt(str)) && str.length > 4));
}
const isZip = (str) => {
    return !(/[0-9]{6}/.test(str));
}
const isPercentage = (str) => {
    return isNaN(parseFloat(str)) || parseFloat(str) > 100 || parseFloat(str) < 0;
}
const isChecked = (str) => {

}
// document.getElementById('ed-add-btn').addEventListener('click',
//     function (event) {
//         var education = document.getElementById('ed-select').value;
//         document.getElementById("ed-" + education).classList.remove('d-none');
//     });
// const removeEducation = (id) => {
//     document.getElementById(id.id.split('-delete')[0]).classList.add('d-none');
// }
// document.getElementById('we-add-btn').addEventListener('click',
//     function (event) {
//         if (document.getElementById('we-company1').classList.contains('d-none')) {
//             document.getElementById('we-company1').classList.remove('d-none');
//         } else {
//             document.getElementById('we-company2').classList.remove('d-none');
//         }
//     });
// document.getElementById('rc-add-btn').addEventListener('click',
//     function (event) {
//         if (document.getElementById('rc-ref1').classList.contains('d-none')) {
//             document.getElementById('rc-ref1').classList.remove('d-none');
//         } else {
//             document.getElementById('rc-ref2').classList.remove('d-none');
//         }
//     });
document.getElementById('form-submit').addEventListener('click', function (event) {
    var noneBlocks = ["ed-ssc", "ed-hsc", "ed-bachelore", "ed-master", "we-company1", "we-company2", "rc-ref1", "rc-ref2"];
    var errorArr = ['Please Select any value from select Box!!', "Please enter valid alphabets!!", "Please enter valid values!!",
        "Please only enter in 1 to 4 range of digit!!", "Please only enter in 1 to 99 range of digit!!", "Please enter valid email address!!", "Please enter 10 digits and valid phone number!!",
        "Please enter valid date!!", "Please enter full year like 2017, 2018!!", "Please enter an alphanumeric value!!", "Please enter valid zip code!!", "Please enter valid Percentage as per format!!", "Please select atleast one value!!"];
    var validationFuncArr = ['isNull', 'isAlpha', 'isMulAlpha', 'is1Digit', 'is2Digit', 'isEmail', 'isPhone', 'isDate', 'isYear', 'isAlphaNumeric', 'isZip', 'isPercentage', 'isChecked'];
    document.querySelectorAll('span').forEach((elm) => {
        elm.classList.add('d-none');
    })
    for (let i = 0; i < validationFuncArr.length; i++) {
        document.querySelectorAll("." + validationFuncArr[i]).forEach((elm) => {
            if (isNull(elm.value.trim()) || eval(validationFuncArr[i] + (`("${elm.value.trim()}")`))) {
                if (document.getElementById(elm.id + '-error') !== null) {
                    var temp = elm.id.split("-");
                    var noneBlocksId = temp[0] + temp[1];
                    if (document.getElementById(elm.id) !== null && !noneBlocks.includes(noneBlocksId)) {
                        document.getElementById(elm.id + '-error').classList.remove('d-none');
                        document.getElementById(elm.id + '-error').innerHTML = errorArr[i];
                    }
                }
            }
        })
    }
    var flag = true;
    var formValidate = true;
    document.querySelectorAll('span').forEach((elm) => {
        if (!document.getElementById(elm.id).classList.contains("d-none")) {
            formValidate = false;
        }
        if (!noneBlocks.includes(elm.id.split("-")[0])) {
            if (!elm.classList.contains('d-none') && flag) {
                flag = false
                document.getElementById(elm.id.split('-error')[0]).focus();
            }
        }
    });
    if (formValidate) {
        document.getElementById('form-submit').type = "submit";
    }
})