const createForm = document.querySelector('#create-form'),
      editForm   = document.querySelector('#edit-form'),
      mainTable  = document.querySelector('.main__table'),
      stuf       = [];

let countOfRow = 0,
    currentRow = null,
    isValid = true;

createForm.elements.forEach = Array.prototype.forEach;
editForm.elements.forEach = Array.prototype.forEach;

/*--------------------------------Viev--------------------------------*/
    const view = {
        showEditWindow: function () {

            currentRow = this;
            const arr = [];
            let n = currentRow.parentElement.parentElement.count;
            // let inps = editForm.elements;

            editForm.elements[1].value = stuf[n].type;
            editForm.elements[2].value = stuf[n].name;
            editForm.elements[3].value = stuf[n].surname;
            editForm.elements[4].value = stuf[n].patronym;
            editForm.elements[5].value = stuf[n].age;
            editForm.elements[6].checked = stuf[n].hasChildren;
            editForm.elements[7].value = stuf[n].status;
            editForm.elements[8].value = stuf[n].expiriens;
            editForm.elements[9].value = stuf[n].dateOfEmployment;
            editForm.elements[10].value = stuf[n].organization;
            


            console.log(editForm.elements)

            console.log(stuf[n])
            // model.changeInfo(currentRow);
            
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
        showCreateWindow: function (e) {
            e.preventDefault();
            document.querySelector('#create-window').classList.add('active')
        },
        closeCreateWindow: function (e) {
            e.preventDefault();
            document.querySelector('#create-window').classList.remove('active')
        },
        closeEditWindow: function (e) {
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
            rows.forEach(function(el, i){
                el.count = i;
                el.innerHTML += `<div class="table__cell">${stuf[i].name}</div>`;
                el.innerHTML += `<div class="table__cell">${stuf[i].surname}</div>`;
                el.innerHTML += `<div class="table__cell">${stuf[i].age}</div>`;
                el.innerHTML += `<div class="table__cell">${stuf[i].organization}</div>`;
                el.innerHTML += `<div class="table__cell">${stuf[i].status}</div>`;
                el.innerHTML += `<div class="table__cell table__cell-btns">
                <button class="full-info">все данные</button>
                <button class="edit">редактировать</button>
                <button class="delete">удалить</button></div>`;
            });
            const arrBtnsEdit   = document.querySelectorAll('.edit'),
                  arrBtnsDelete = document.querySelectorAll('.delete'),
                  arrBtnsFullInfo = document.querySelectorAll('.full-info');

            // цикл записать в фунцю в control
            for (let i = 0; i < arrBtnsEdit.length; i++) {
                arrBtnsEdit[i].addEventListener('click', view.showEditWindow);
                arrBtnsDelete[i].addEventListener('click', model.delete);
                arrBtnsFullInfo[i].addEventListener('click', view.getFullInfo);
            }
            
        },
        removeAllRows: function () {

            let length = mainTable.children.length
            for (var i = 0; i < length; i++) {
                if(i === 0) continue;
                mainTable.children[mainTable.children.length - 1].remove();     
            }
        },

        getFullInfo: function() {
            console.log('op')
            document.querySelector('#allInfo').classList.add('active');
            currentRow = this;
            let n = currentRow.parentElement.parentElement.count;
            console.log(n);
            let rows = document.querySelectorAll('.row');
            
            rows[0].children[1].innerHTML = stuf[n].type;
            rows[1].children[1].innerHTML = stuf[n].name;
            rows[2].children[1].innerHTML = stuf[n].surname;
            rows[3].children[1].innerHTML = stuf[n].patronym;
            rows[4].children[1].innerHTML = stuf[n].age;
            rows[5].children[1].innerHTML = stuf[n].hasChildren ? 'Есть' : 'Нет';
            rows[6].children[1].innerHTML = stuf[n].status;
            rows[7].children[1].innerHTML = stuf[n].expiriens;
            rows[8].children[1].innerHTML = stuf[n].dateOfEmployment;
            rows[9].children[1].innerHTML = stuf[n].organization;
     

            

        },
        fullInfoClose: function() {
            console.log('op')
            this.parentElement.classList.remove('active');
        }

    }
/*--------------------------------end Viev--------------------------------*/

/*--------------------------------Model--------------------------------*/
    const model = {

        changeInfo: function(self) {
            let arr = model.getInfo(editForm);
            let n = currentRow.parentElement.parentElement.count;
            let counter=0;

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

            
            console.log(stuf[n])
            console.log(arr)
            console.log(n)

            console.log();
            view.newRow();


        },

        getInfo: function (form) {

            const info = []; // инфа из формы
            form.elements.forEach(function(el){
               
                if(el.tagName === 'INPUT' || el.tagName === 'SELECT') {

                    if(el.type === 'checkbox') {
                        info.push(el.checked); 
                    } else {
                        info.push(el.value);
                    }

                }
            })

            return info
        },
        createEmployee: function (e) {
            e.preventDefault();
            // получаем массив данныйх из формы
            if(isValid) {
                const arr = model.getInfo(createForm);
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
                stuf.push(new model.Employee(opts));
                
                view.newRow();
            } else {
                alert('не корректно заполнена форма!')
            }
        },

        Person: function (obj) {
            this.name = obj.name || 'не указано';
            this.age = obj.age || 'не указано';
            this.surname = obj.surname || 'не указано';
            this.patronym = obj.patronym || 'не указано';
        },

        Employee: function (obj) {
            model.Person.call(this, obj);
            this.type = obj.type;
            this.hasChildren = obj.hasChildren;
            this.status = obj.status;
            this.expiriens = obj.expiriens || 'не указано';
            this.dateOfEmployment = obj.dateOfEmployment || 'не указано';
            this.organization = obj.organization;
        },

        validate: function() {

            console.dir(this.id)

            switch (this.id) {
                case 'name':
                    if(+this.value) {
                        alert('поле не должно содержать числа');
                        isValid = false;
                    } else {
                        isValid = true;
                    }
                    break;
                case 'surname':
                    if(+this.value) {
                        alert('поле не должно содержать числа');
                        isValid = false;
                    } else {
                        isValid = true;
                    }
                    break;
                case 'patronym':

                    if(+this.value) {
                        alert('поле не должно содержать числа');
                        isValid = false;
                    } else {
                        isValid = true;
                    }
                    break;
                case 'name-editForm':

                    if(+this.value) {
                        alert('поле не должно содержать числа');
                        isValid = false;
                    } else {
                        isValid = true;
                    }
                    break;
                case 'surname-editForm':

                    if(+this.value) {
                        alert('поле не должно содержать числа');
                        isValid = false;
                    } else {
                        isValid = true;
                    }
                    break;
                case 'patronym-editForm':

                    if(+this.value) {
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

        }

    }
/*--------------------------------end Model--------------------------------*/

model.Person.prototype.getFullInfoJSON = function() {
    return JSON.stringify(this);
    // return this;
}

model.Employee.prototype = Object.create(model.Person.prototype);


/*--------------------------------Control--------------------------------*/
    document.querySelector('#create').addEventListener('click', view.showCreateWindow),
    document.querySelector('#close-create-window').addEventListener('click', view.closeCreateWindow),
    document.querySelector('#close-edit-window').addEventListener('click', view.closeEditWindow),
    document.querySelector('#form-clean-btn').addEventListener('click', view.cleanForm),
    document.querySelector('#form-edit-clean-btn').addEventListener('click', view.cleanForm),
    document.querySelector('#form-create-btn').addEventListener('click', model.createEmployee),
    document.querySelector('#form-change-btn').addEventListener('click', model.changeInfo),
    document.querySelector('#allInfo-close').addEventListener('click', view.fullInfoClose),
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
/*--------------------------------end control--------------------------------*/



// document.querySelector('#select-1').addEventListener('change', swicthForm);


 


// function swicthForm(e) {

//     if(this.value === 'val-1') {
//         document.querySelector('#section-1').classList.add('active');
//         document.querySelector('#section-2').classList.remove('active');
//     } else {
//         document.querySelector('#section-1').classList.remove('active');
//         document.querySelector('#section-2').classList.add('active');
//     }

// }













