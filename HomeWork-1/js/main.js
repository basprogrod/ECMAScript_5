

const createForm = document.querySelector('#create-form'),
      editForm   = document.querySelector('#edit-form'),
      mainTable  = document.querySelector('.main__table'),
      stuf       = [];

let countOfRow = 0,
    currentEditRow = null

createForm.elements.forEach = Array.prototype.forEach;
editForm.elements.forEach = Array.prototype.forEach;

/*--------------------------------Viev--------------------------------*/
const view = {
    showEditWindow: function () {

        currentEditRow = this;
        const arr = [];
        let n = currentEditRow.parentElement.parentElement.count;
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
        // model.changeInfo(currentEditRow);
        
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
            el.innerHTML += `<div class="table__cell table__cell-btns"><button class="edit">редактировать</button> <button class="delete">удалить</button></div>`;
        });
        const arrBtnsEdit = document.querySelectorAll('.edit');
        for (let i = 0; i < arrBtnsEdit.length; i++) {
            arrBtnsEdit[i].addEventListener('click', view.showEditWindow);
        }
        
    },
    removeAllRows: function () {

        let length = mainTable.children.length
        for (var i = 0; i < length; i++) {
            if(i === 0) continue;
            mainTable.children[mainTable.children.length - 1].remove();     
        }
    }

}
/*--------------------------------end Viev--------------------------------*/

/*--------------------------------Model--------------------------------*/
const model = {

    changeInfo: function(self) {
        let arr = model.getInfo(editForm);
        let n = currentEditRow.parentElement.parentElement.count;
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
        this.expiriens = obj.expiriens;
        this.dateOfEmployment = obj.dateOfEmployment;
        this.organization = obj.organization;
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













