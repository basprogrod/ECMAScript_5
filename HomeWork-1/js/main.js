function init() {



    /*--------------------------------Viev--------------------------------*/
        const view = {
            demo: function() {
                // не знаю где исползовать spread в моей дз.
                // просто в консоль выведу, в принципе работа его понятна 
                function func(a,b, ...arr) {
                    console.log(a,b, arr);
                }     
                func(1,2,3,4,5,6,7,8); 

                console.log('')               
            },
            start: function(e) {
                document.querySelector('.hide').classList.remove('hide');
                document.getElementById('container').classList.add('hide');
            },
            showEditWindow: function () {

                currentRow = this;
                const arr  = [];
                let   n    = currentRow.parentElement.parentElement.count;

                editForm.elements[1].value   = stuf[n].type;
                editForm.elements[2].value   = stuf[n].name;
                editForm.elements[3].value   = stuf[n].surname;
                editForm.elements[4].value   = stuf[n].patronym;
                editForm.elements[5].value   = stuf[n].age;
                editForm.elements[6].checked = stuf[n].hasChildren;
                editForm.elements[7].value   = stuf[n].status;
                editForm.elements[8].value   = stuf[n].expiriens;
                editForm.elements[9].value   = stuf[n].dateOfEmployment;
                editForm.elements[10].value  = stuf[n].organization;
                
                document.querySelector('#edit-window').classList.add('active');
            },
            cleanForm: function () {
                createForm.elements.forEach(function(el){
                    if(el.tagName === 'INPUT') {
                        el.value = '';
                    }
                });
                editForm.elements.forEach(function(el){
                    if(el.tagName === 'INPUT') {
                        el.value = '';
                    }
                });
            },
            showCreateWindow: e => {
                e.preventDefault();
                document.querySelector('#create-window').classList.add('active')
            },
            closeCreateWindow: e => {
                e.preventDefault();
                document.querySelector('#create-window').classList.remove('active')
            },
            closeEditWindow: e => {
                e.preventDefault();
                document.querySelector('#edit-window').classList.remove('active')
            },
            newRow: function () {
                this.removeAllRows();
                const row = document.createElement('div');
                row.classList.add('table__row');
                row.classList.add('for-fill');

                stuf.forEach(function(el, i) {
                    mainTable.appendChild(row.cloneNode()); // добавляем ряд в таблицу


                });

                countOfRow++;
                this.fillRow();
            },
            fillRow: function () {
                const rows = document.querySelectorAll('.for-fill');
                rows.forEach = Array.prototype.forEach;
                function status(i) {
                    let str = '';
                    switch (stuf[i].status) {
                        case 'cleaner':
                            str = 'уборщица';
                            break;
                        case 'proger':
                            str = 'программист';
                            break;
                        case 'teacher':
                            str = 'учитель';
                            break;
                        default:
                            // statements_def
                            break;
                    }
                    switch (stuf[i].vehicle) {
                        case 'bus':
                            str = 'водитель автобуса';
                            break;
                        case 'car':
                            str = 'водитель автомобилья';
                            break;
                        case 'guzh':
                            str = 'водитель повозки';
                            break;
                        default:
                            // statements_def
                            break;
                    }

                    return str;
                }

                
                rows.forEach(function(el, i){
                    // деструктуризация
                    let {name, surname, age, organization} = stuf[i];
                    el.count = i;
                    el.innerHTML += `<div class="table__cell">${name}</div>`;
                    el.innerHTML += `<div class="table__cell">${surname}</div>`;
                    el.innerHTML += `<div class="table__cell">${age}</div>`;
                    el.innerHTML += `<div class="table__cell">${organization}</div>`;
                    el.innerHTML += `<div class="table__cell">${status(i)}</div>`;
                    el.innerHTML += `<div class="table__cell table__cell-btns">
                    <button class="full-info">подробнее</button>
                    <button class="edit">редактировать</button>
                    <button class="delete">удалить</button></div>`;
                });

                const arrBtnsEdit     = document.querySelectorAll('.edit'),
                      arrBtnsDelete   = document.querySelectorAll('.delete'),
                      arrBtnsFullInfo = document.querySelectorAll('.full-info');

                // цикл записать в фунцю в control
                for (let i = 0; i < arrBtnsEdit.length; i++) {
                    arrBtnsEdit[i].addEventListener('click', view.showEditWindow);
                    arrBtnsDelete[i].addEventListener('click', model.delete);
                    arrBtnsFullInfo[i].addEventListener('click', view.showFullInfo);
                }
                
            },
            removeAllRows: function () {

                let length = mainTable.children.length
                for (var i = 0; i < length; i++) {
                    if(i === 0) continue;
                    mainTable.children[mainTable.children.length - 1].remove();     
                }
            },

            showFullInfo: function() {
                console.log('op');

                currentRow = this;
                let n      = currentRow.parentElement.parentElement.count;
                let rowsInd   = document.querySelectorAll('.row-ind'); 
                let rowsTr  = document.querySelectorAll('.row-tr'); 

                if(stuf[n]._self === 'industrial') {
                    document.querySelector('#allInfo').classList.add('active');     
                    rowsInd[0].children[1].innerHTML = stuf[n].type === 'val-1' ? 'индустриальное' : 'транспортное';
                    rowsInd[1].children[1].innerHTML = stuf[n].name;
                    rowsInd[2].children[1].innerHTML = stuf[n].surname;
                    rowsInd[3].children[1].innerHTML = stuf[n].patronym;
                    rowsInd[4].children[1].innerHTML = stuf[n].age;
                    rowsInd[5].children[1].innerHTML = stuf[n].hasChildren ? 'Есть' : 'Нет';
                    rowsInd[6].children[1].innerHTML = stuf[n].status;
                    rowsInd[7].children[1].innerHTML = stuf[n].expiriens;
                    rowsInd[8].children[1].innerHTML = stuf[n].dateOfEmployment;
                    rowsInd[9].children[1].innerHTML = stuf[n].organization;

                } else {

                    document.querySelector('#allInfo-2').classList.add('active');         
                    rowsTr[0].children[1].innerHTML = stuf[n].type === 'val-1' ? 'индустриальное' : 'транспортное';
                    rowsTr[1].children[1].innerHTML = stuf[n].name;
                    rowsTr[2].children[1].innerHTML = stuf[n].surname;
                    rowsTr[3].children[1].innerHTML = stuf[n].patronym;
                    rowsTr[4].children[1].innerHTML = stuf[n].age;
                    rowsTr[5].children[1].innerHTML = stuf[n].hasChildren ? 'Есть' : 'Нет';
                    rowsTr[6].children[1].innerHTML = stuf[n].vehicle;
                    rowsTr[7].children[1].innerHTML = stuf[n].expiriens;
                    rowsTr[8].children[1].innerHTML = stuf[n].dateOfEmployment;
                    rowsTr[9].children[1].innerHTML = stuf[n].organization;

                }

         
            },
            fullInfoClose: function() {
                // console.log('op')
                this.parentElement.classList.remove('active');
            },
            changeForm: function() {
                // console.log('op')
                if (this.value === 'val-2') {
                    document.querySelectorAll('.change')[0].classList.add('active');
                    document.querySelectorAll('.change')[1].classList.add('active');
                    document.querySelectorAll('.change-edit')[0].classList.add('active');
                    document.querySelectorAll('.change-edit')[1].classList.add('active');
                } else {
                    document.querySelectorAll('.change')[0].classList.remove('active');
                    document.querySelectorAll('.change')[1].classList.remove('active');
                    document.querySelectorAll('.change-edit')[0].classList.remove('active');
                    document.querySelectorAll('.change-edit')[1].classList.remove('active');
                }
            }

        }
    /*--------------------------------end Viev--------------------------------*/

    /*--------------------------------Model--------------------------------*/
        const model = {

            ajaxGet: function() {
             
              let request = new XMLHttpRequest();

              request.onreadystatechange = function () {

                if(request.readyState == 4 && request.status == 200) {
                  // console.log(request.responseText)
                  // $('.box').html(request.responseText);

                }else{

                  $('.box').html('ошибка');

                }

              }

              request.open('POST', 'server.html');

              request.send()
            },

            changeInfo: function(self) {

                let arr     = model.getInfo(editForm);
                let n       = currentRow.parentElement.parentElement.count;
                let counter = 0;

                if(stuf[n].self === 'industr') {

                    stuf[n].type             = editForm.elements[1].value; 
                    stuf[n].name             = editForm.elements[2].value; 
                    stuf[n].surname          = editForm.elements[3].value; 
                    stuf[n].patronym         = editForm.elements[4].value; 
                    stuf[n].age              = editForm.elements[5].value; 
                    stuf[n].hasChildren      = editForm.elements[6].checked; 
                    stuf[n].status           = editForm.elements[7].value; 
                    stuf[n].expiriens        = editForm.elements[8].value; 
                    stuf[n].dateOfEmployment = editForm.elements[9].value; 
                    stuf[n].organization     = editForm.elements[10].value;

                } else {

                    stuf[n].type             = editForm.elements[1].value; 
                    stuf[n].name             = editForm.elements[2].value; 
                    stuf[n].surname          = editForm.elements[3].value; 
                    stuf[n].patronym         = editForm.elements[4].value; 
                    stuf[n].age              = editForm.elements[5].value; 
                    stuf[n].hasChildren      = editForm.elements[6].checked; 
                    stuf[n].vehicle          = editForm.elements[7].value; 
                    stuf[n].expiriens        = editForm.elements[8].value; 
                    stuf[n].dateOfEmployment = editForm.elements[9].value; 
                    stuf[n].organization     = editForm.elements[10].value;

                }

                view.newRow();


            },

            getInfo: function (form) {

                const info = []; // инфа из формы
                // form.elements.forEach(function(el){
                createInputs.forEach(function(el){
                   
                    if(el.tagName === 'INPUT' || el.tagName === 'SELECT') {

                        if(el.type === 'checkbox') info.push(el.checked); 
                        else info.push(el.value);

                    }

                });

                return info;
            },
            createEmployee: function (e) {
                e.preventDefault();
                // получаем массив данныйх из формы
                if(isValid) {
                    const arr  = model.getInfo(createForm); 
                    // console.log(arr)
                    const opts = {};

                    [
                        opts.type,             
                        opts.name,             
                        opts.surname,        
                        opts.patronym,       
                        opts.age,          
                        opts.hasChildren,  
                        opts.status,    
                        opts.vehicle,      
                        opts.expiriens,      
                        opts.dateOfEmployment,
                        opts.organization
                    ] = arr;

                    switch (createSelect_1.value) {
                        case 'val-1':
                            stuf.push(new model.EmployeeIndustr(opts));
                            break;
                        case 'val-2':
                            stuf.push(new model.EmployeeTrans(opts));
                            break;
                    }
                   
                    view.newRow();

                } else {
                    alert('не корректно заполнена форма!');
                }
            },

            Person: function (obj) {
                this.name     = obj.name     || 'не указано';
                this.age      = obj.age      || 'не указано';
                this.surname  = obj.surname  || 'не указано';
                this.patronym = obj.patronym || 'не указано';
            },

            EmployeeIndustr: function (obj) {
                model.Person.call(this, obj);
                this._self = 'industrial';
                this.type             = obj.type;
                this.hasChildren      = obj.hasChildren;
                this.status           = obj.status;
                this.expiriens        = obj.expiriens        || 'не указано';
                this.dateOfEmployment = obj.dateOfEmployment || 'не указано';
                this.organization     = obj.organization;
            },
            EmployeeTrans: function (obj) {
                model.Person.call(this, obj);
                this._self = 'transport';
                this.type             = obj.type;
                this.hasChildren      = obj.hasChildren;
                this.expiriens        = obj.expiriens        || 'не указано';
                this.dateOfEmployment = obj.dateOfEmployment || 'не указано';
                this.organization     = obj.organization;
                this.vehicle = obj.vehicle;

            },

            validate: function() {

                // console.dir(this.id)
                const arr = this.value.split('');   
                function func(el) {
                    return el.charCodeAt() < 57;
                } 

                switch (this.id) {
                    
                    case 'name':
                        if(arr.some(func)) {
                            alert('поле не должно содержать числа');
                            isValid = false;
                        } else {
                            isValid = true;
                        }
                        break;
                    case 'surname':
                        if(arr.some(func)) {
                            alert('поле не должно содержать числа');
                            isValid = false;
                        } else {
                            isValid = true;
                        }
                        break;
                    case 'patronym':

                        if(arr.some(func)) {
                            alert('поле не должно содержать числа');
                            isValid = false;
                        } else {
                            isValid = true;
                        }
                        break;
                    case 'name-editForm':

                        if(arr.some(func)) {
                            alert('поле не должно содержать числа');
                            isValid = false;
                        } else {
                            isValid = true;
                        }
                        break;
                    case 'surname-editForm':

                        if(arr.some(func)) {
                            alert('поле не должно содержать числа');
                            isValid = false;
                        } else {
                            isValid = true;
                        }
                        break;
                    case 'patronym-editForm':

                        if(arr.some(func)) {
                            alert('поле не должно содержать числа');
                            isValid = false;
                        } else {
                            isValid = true;
                        }
                        break;
                    case 'expiriens' || 'expiriens-editForm':

                        if(+this.value >= 50) {
                            alert('стаж не может быть больше 50 лет')
                            isValid = false;
                        } else if(+this.value <= 0) {
                            alert('стаж дольжен быть больше 0 лет')
                            isValid = false;
                        } else {
                            isValid = true;
                        }
                        break;
                    case 'expiriens-editForm':

                        if(+this.value >= 50) {
                            alert('стаж не может быть больше 50 лет');
                            isValid = false;
                        } else if(+this.value <= 0) {
                            alert('стаж дольжен быть больше 0 лет');
                            isValid = false;
                        } else {
                            isValid = true;
                        }
                        break;
                }

                
            },
            delete: function() {

                currentRow = this;
                let n = currentRow.parentElement.parentElement.count;

                if(confirm('Вы уверены что хотите удалить?')) {
                   stuf.splice(n,1);
                   view.newRow(); 
                }

            },
            loadToBD: function() {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/homework3', false);
                xhr.setRequestHeader("Content-type","application/json");
                xhr.send(JSON.stringify(upl[i]));
                
            },
            document: function(e) {
                view.start()
                const 
                    container = document.createElement('div'),
                    table     = document.createElement('div'),
                    row       = document.createElement('div'),
                    cell      = document.createElement('div');


                    container.classList.add('container'); 
                    table.classList.add('main__table'); 
                    table.classList.add('table'); 
                    row.classList.add('table__row'); 
                    cell.classList.add('table__cell');

                const arr = [
                    'Имя'        ,
                    'Фамилия'    ,
                    'Возраст'    ,
                    'Организация',
                    'Должность'
                ];


                    for (let i = 0; i < 6; i++) {

                        let el = cell.cloneNode();
                        
                        if (i <= 4)  {
                            el.innerHTML = arr[i]
                        } 

                        row.appendChild(el)
                    } 

                    table.appendChild(row);
                    container.appendChild(table);

                    document.getElementsByTagName('body')[0].appendChild(container);

                    conrtol.start();



            }

        }
    /*--------------------------------end Model--------------------------------*/

    model.Person.prototype.showFullInfoJSON = function() {
        return JSON.stringify(this);
    }
    model.Person.prototype.self = function() {
        return this._self;
    }

    model.EmployeeIndustr.prototype = Object.create(model.Person.prototype);
    model.EmployeeTrans.prototype   = Object.create(model.Person.prototype);


    /*--------------------------------Control--------------------------------*/
        document.querySelector('#start').addEventListener('click', model.document)
        document.querySelector('#demo').addEventListener('click', view.demo)

        const conrtol = {

            start: function(e) {
                const createForm     = document.querySelector('#create-form'),
                      editForm       = document.querySelector('#edit-form'),
                      mainTable      = document.querySelector('.main__table'),
                      createSelect_1 = document.querySelector('#create-select-1'),
                      createInputs   = document.querySelectorAll('.create-ipn'),
                      stuf           = [];

                let   countOfRow = 0,
                      currentRow = null,
                      isTrans    = false,
                      isValid    = true;

                window.createForm = createForm;
                window.editForm = editForm;
                window.mainTable = mainTable;
                window.createSelect_1 = createSelect_1;
                window.createInputs = createInputs;
                window.stuf = stuf;

                window.countOfRow = countOfRow;
                window.currentRow = currentRow;
                window.isTrans = isTrans;
                window.isValid = isValid;



                createForm.elements.forEach = Array.prototype.forEach;
                editForm.elements.forEach   = Array.prototype.forEach;
                createInputs.forEach   = Array.prototype.forEach;
                document.querySelector('#create-select-1').addEventListener('change', view.changeForm),
                // document.querySelector('.load-from-bd').addEventListener('change', view.changeForm),
                document.querySelector('#create').addEventListener('click', view.showCreateWindow),
                document.querySelector('#close-create-window').addEventListener('click', view.closeCreateWindow),
                document.querySelector('#close-edit-window').addEventListener('click', view.closeEditWindow),
                document.querySelector('#form-clean-btn').addEventListener('click', view.cleanForm),
                document.querySelector('#form-edit-clean-btn').addEventListener('click', view.cleanForm),
                document.querySelector('#form-create-btn').addEventListener('click', model.createEmployee),
                document.querySelector('#form-change-btn').addEventListener('click', model.changeInfo),
                document.querySelector('#allInfo-close').addEventListener('click', view.fullInfoClose),
                document.querySelector('#allInfo-close-2').addEventListener('click', view.fullInfoClose),
                document.querySelector('#expiriens').addEventListener('blur', model.validate),
                document.querySelector('#name').addEventListener('blur', model.validate),
                document.querySelector('#surname').addEventListener('blur', model.validate),
                document.querySelector('#patronym').addEventListener('blur', model.validate),
                document.querySelector('#age').addEventListener('blur', model.validate),
                document.querySelector('#expiriens-editForm').addEventListener('blur', model.validate),
                document.querySelector('#name-editForm').addEventListener('blur', model.validate),
                document.querySelector('#surname-editForm').addEventListener('blur', model.validate),
                document.querySelector('#patronym-editForm').addEventListener('blur', model.validate),
                document.querySelector('#age-editForm').addEventListener('blur', model.validate),
                document.querySelector('#form-change-btn').addEventListener('click', function(e){
                 e.preventDefault();
                });
            }
        }
    /*--------------------------------end Control--------------------------------*/














}