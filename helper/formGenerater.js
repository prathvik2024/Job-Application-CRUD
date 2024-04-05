function generateSelectBox(name = "", selectLabel = '', optionKey = [], optionValue = [], multiple = false, parentClasses = '', parentStyle = '', classes = '', style = '', lableClasses) {
    var selectBoxStr = `<div${(parentClasses !== '') ? ` class="${parentClasses}"` : ""}${(parentStyle !== '') ? ` style="${parentStyle}"` : ""}><label class="${lableClasses}">${selectLabel}</label><select class="form-select ${(classes !== '') ? ` ${classes}` : ''}" name="${name}" id="" ${(multiple) ? 'multiple' : ''} ${(style !== '') ? ` style="${style}"` : ''}>`;
    for (let i = 0; i < optionValue.length; i++) {
        selectBoxStr += `<option value="${optionKey[i]}">${optionValue[i]}</option>`;
    }
    selectBoxStr += '</select></div>';
    return selectBoxStr;
}
// console.log(generateSelectBox('car', true, [1, 2, 3, 4], ['BMW', 'AUDI', 'MECLERAN', 'ALTO'], false, 'dg', 'arg', 'afg', 'ad'));

function generateRadioGroup(radioName = '', radioid = '', radioLable = '', radioButtons = [], checked = '', parentClasses = '', parentStyle = '', classes = '', style = '', lableClasses) {
    var radioGroupStr = `<label class="${lableClasses}">${radioLable}</label>`;
    for (let i = 0; i < radioButtons.length; i++) {
        radioGroupStr += `<div class="form-check ${(parentClasses !== '') ? ` ${parentClasses}` : ''}" ${(parentStyle !== '') ? `style="${parentStyle}"` : ''}><input class="form-check-input ${(classes !== '') ? ` ${classes}` : ''}" ${(style !== '') ? `style="${style}"` : ''} type="radio" name="${radioName}" id="${radioid}" ${(checked == radioButtons[i] && checked != '') ? 'checked' : ''}>
        <label class="form-check-label" for="flexCheckDefault">${radioButtons[i]}</label></div>`;
    }
    return radioGroupStr;
}
// console.log(generateRadioGroup('gender', '','gender',['Male', 'Female', 'Others'], 'Female', 'form-check-inline', 'arg', 'ar', 'arg', 'mr-3'));
function generateCheckboxGroup(checkboxName = '', checkboxid = '', checkboxLable = '', checkboxs = [], checked = [], topclass ='',parentClasses = '', parentStyle = '', classes = '', style = '', lableClasses) {
    var checkboxGroupStr = `<div class="${topclass}"><label class="${lableClasses}">${checkboxLable}</label><div>`;
    for (let i = 0; i < checkboxs.length; i++) {
        checkboxGroupStr += `<div class="form-check-inline" ${(parentStyle !== '') ? `style="${parentStyle}"` : ''}><input class="form-check-input ${(classes !== '') ? ` ${classes}` : ''}" ${(style !== '') ? `style="${style}"` : ''} type="checkbox" name="${checkboxName}" id="${checkboxid}" ${(checked.includes(checkboxs[i]) && checked != '') ? 'checked' : ''}>
        <label class="form-check-label" for="flexCheckDefault">${checkboxs[i]}</label></div>`;
    }
    return checkboxGroupStr+='</div></div>';
}
// console.log(generateCheckboxGroup('hobby[]', 'Hobbies',['Dancing', 'Playing', 'Singing', 'Outing'],['Singing', 'Outing'], 'dfg', 'adft', 'a', 'ar'));

function generateInputbox(type = 'text', inputLabel = '', inputName = '', value = '', placeholder = '', id = '', parentClasses = '', parentStyle = '', classes = '', style = '', lableClasses = '') {
    var inputBoxGen = `<div class="form-group ${(parentClasses !== '') ? ` ${parentClasses}` : ''}" ${(parentStyle !== '') ? `style="${parentStyle}"` : ''}>
    <label for="" class="${lableClasses}">${inputLabel}</label>
    <input type="${type}" class="form-control ${(classes !== '') ? ` ${classes}` : ''}" ${(style !== '') ? `style="${style}"` : ''} id="${id}" placeholder="${placeholder}" name="${inputName}" value=${(value !== '') ? value : ''}>
  </div>`
    return inputBoxGen;
}
// console.log(generateInputbox('text', 'First Name', 'fname', 'Enter a First Name...', '', 'col-md-2'));
function generatetextArea(textAreaLabel = '', textareaName = '', value = '', placeholder = '', id = '', rows = '3', cols = '', parentClasses = '', parentStyle = '', classes = '', style = '', lableClasses = '') {
    var textAreaStr = `<div class="form-group ${(parentClasses !== '') ? ` ${parentClasses}` : ''}" ${(parentStyle !== '') ? `style="${parentStyle}"` : ''}>
    <label for="" class="${lableClasses}">${textAreaLabel}</label>
    <textarea class="form-control ${(classes !== '') ? ` ${classes}` : ''}" ${(style !== '') ? `style="${style}"` : ''} id="${id}" rows="${rows}" cols="${cols}" name="${textareaName}" placeholder="${placeholder}">${(value !== '') ? value : ''}</textarea>
  </div>`;
    return textAreaStr;
}
function inRow(str = ''){
    var temp = '<div class="row">';
    temp += str;
    temp+= '</div>'
    return temp;
}
// console.log(generatetextArea('Address', 'address', '', 'Enter an Address..', '', '3', '', 'col-md-2'));
module.exports = { generateCheckboxGroup, generateRadioGroup, generateSelectBox, generateInputbox, generatetextArea, inRow };