document.querySelector('#create').addEventListener('click', showCreateWindow),
document.querySelector('#close-create-window').addEventListener('click', closeCreateWindow),
document.querySelector('#form-clean-btn').addEventListener('click', cleanForm),
document.querySelector('#form-create-btn').addEventListener('click', createEmployee),
document.querySelector('#select-1').addEventListener('click', swicthForm)

const createForm = document.querySelector('#create-form'),
mainTable = document.querySelector('.main__table');
createForm.elements.forEach = Array.prototype.forEach;
const stuf = [];

function swicthForm(e) {
    if(this.value === 'val-1') console.log(this.value);
    if(this.value === 'val-2') console.log(this.value);

}

function cleanForm() {
    createForm.elements.forEach(function(el){
        if(el.tagName === 'INPUT') {
            el.value = '';
        }
    });
}

function showCreateWindow(e) {
    e.preventDefault();
    document.querySelector('#create-window').classList.add('active')
}

function closeCreateWindow(e) {
    e.preventDefault();
    document.querySelector('#create-window').classList.remove('active')
}

function getInfo() {

    const info = []; // инфа из формы
    createForm.elements.forEach(function(el){
       
        if(el.tagName === 'INPUT' || el.tagName === 'SELECT') {

            if(el.type === 'checkbox') {
                info.push(el.checked); 
            } else {
                info.push(el.value);
            }

        }
    })

    return info
}

function createEmployee(e) {
    e.preventDefault();
    // получаем массив данныйх из формы
    const arr = getInfo();
    const opts = {};
    opts.type = arr[0];
    opts.name = arr[1];
    opts.surname = arr[2];
    opts.patronym = arr[3];
    opts.age = arr[4];
    opts.hasChildren = arr[5];
    opts.status = arr[6];
    opts.expiriens = arr[7];
    opts.dateOfEmployment = arr[8];
    opts.organization = arr[9];
    stuf.push(new Employee(opts));
    // console.log(stuf);
    newRow();
}
let countOfRow = 0;
function newRow() {
    removeAllRows();
    const row = document.createElement('div');
    row.classList.add('table__row');
    row.classList.add('for-fill');
    row.innerHTML += `<div class="table__cell">${stuf[0].name}</div>`;
    row.count = countOfRow;
    stuf.forEach(function(el) {
        mainTable.appendChild(row.cloneNode()); // добавляем ряд в таблицу
        // console.log(el)
    });

    countOfRow++;
    fillRow();


}

function fillRow() {
    const rows = document.querySelectorAll('.for-fill');
    rows.forEach = Array.prototype.forEach;
    // console.log(rows)
    rows.forEach(function(el, i){
        el.innerHTML += `<div class="table__cell">${stuf[i].name}</div>`;
        el.innerHTML += `<div class="table__cell">${stuf[i].surname}</div>`;
        el.innerHTML += `<div class="table__cell">${stuf[i].age}</div>`;
        el.innerHTML += `<div class="table__cell">${stuf[i].organization}</div>`;
        el.innerHTML += `<div class="table__cell">${stuf[i].status}</div>`;
        el.innerHTML += `<div class="table__cell table__cell-btns"><button>редактировать</button> <button>удалить</button></div>`;
    });
}

function removeAllRows() {

    let length = mainTable.children.length
    for (var i = 0; i < length; i++) {
        if(i === 0) continue;
        mainTable.children[mainTable.children.length - 1].remove();     
    }
}

function Person(obj) {
    this.name = obj.name || 'не указано';
    this.age = obj.age || 'не указано';
    this.surname = obj.surname || 'не указано';
    this.patronym = obj.patronym || 'не указано';
}

function Employee(obj) {
    Person.call(this, obj);
    this.type = obj.type;
    this.hasChildren = obj.hasChildren;
    this.status = obj.status;
    this.dateOfEmployment = obj.dateOfEmployment;
    this.organization = obj.organization;
}

Person.prototype.getFullInfoJSON = function() {
    return JSON.stringify(this);
    // return this;
}

Employee.prototype = Object.create(Person.prototype);