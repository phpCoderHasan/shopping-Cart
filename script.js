// variable declaration
let table1 = document.querySelector('.tableContainer tbody');
let add = document.querySelector('.add');
let discount = document.querySelector('.discount')
let totalDiscount = document.querySelector('.totalDiscount')
let Qnty = document.querySelector('.totalQnty')
let neatPrice = document.querySelector('.neatPrice')
let totalprice = document.querySelector('.totalprice')

// initialize primary array
let arrdata = [
    { id: 0, item: 'alu', qnty: 4, rate: 25, total: 100 },
    { id: 1, item: 'potol', qnty: 5, rate: 20, total: 100 },
    { id: 2, item: 'begun', qnty: 5, rate: 50, total: 250 },
    { id: 3, item: 'morich', qnty: 3, rate: 200, total: 600 },
]



let chck = true;

chck ? arrmake() : arrEdit()
neatTotal()

function arrmake(){
   var tr= arrTraverse();
    table1.innerHTML=tr;
}


// arraytraverse


function arrTraverse(){
     let tr = ''
    for(let i=0;i<arrdata.length;i++){
        tr += `
        <tr id=${i}>
            <td>${i + 1}</td>
            <td>${arrdata[i].item}</td>
            <td>${arrdata[i].qnty}</td>
            <td>${arrdata[i].rate}</td>
            <td>${(arrdata[i].total).toFixed(2)}
            <div id=${arrdata[i].id} class='action'>
            <button onmouseover="edit(chk=true)"; class="edit"><i class="fa fa-pencil"></i></button>
            <button onmouseover="delt()"; class="delete"><i class="fa fa-lg fa-trash"></i></button></div>
            </td>

        </tr>
        `
    }
    return tr;
    
}

// add row 

function addRow(){
    let trr='';

    trr = `
        <tr>
                <td>${arrdata.length + 1}.</td>
                <td><input type='text' placeholder='items'></td>
                <td><input type='number'  placeholder='qty'></td>
                <td><input type='number'  placeholder='rate'></td>
            
                <td>
                    <button class="saveItems">save</button>
                </td>

            </tr>
    `
  return trr;
    
}

function arrEdit(){
    var result=arrTraverse() +addRow()
    table1.innerHTML=result;
 }

// add items and save 


add.addEventListener('click',(e) =>{
    if(chck==true){
        chck = false;
        arrEdit();
        e.target.innerText = 'Cancel'
    }

    else {
        chck =true;
        arrmake();
        e.target.innerText = 'Add Item'
    }

    let saveData = document.querySelector('.saveItems')
    saveData.addEventListener('click',(e) => {
        let item = e.target.parentElement.parentElement.children[1].firstChild.value;
        let qnty = e.target.parentElement.parentElement.children[2].firstChild.value;
        let rate = e.target.parentElement.parentElement.children[3].firstChild.value;
        
        if(item == '' ||qnty =='' || rate ==''){
            alert("Please Fill All section..!! and try again.")
        }

        else if(qnty<=0 || rate <=0){
            alert("Quantity and Rate must not be 0 !!!!")
        }

        else{
            let new_arrdata_Obj ={
                id: arrdata.length,
                item: item,
                qnty: qnty,
                rate: rate,
                total: qnty*rate
                
            }

            arrdata.push(new_arrdata_Obj);
            chck=true;
            arrmake();
            add.innerText = 'Add Item';
        //    allCalc();
        neatTotal()
        }
    })
}) 

// add items and save perfectly done

// array making dynalically

function arraymake(editid) {
    let tr = ''
    for (let i = 0; i < arrdata.length; i++) {
        if(editid==arrdata[i].id){
           tr += `
            <tr>
                <td>${i + 1}.</td>
                <td><input type='text' value=${arrdata[i].item} /></td>
                <td><input type='text' value=${arrdata[i].qnty} /></td>
                <td><input type='text' value=${arrdata[i].rate} /></td>
                <td>${(arrdata[i].total).toFixed(2)}
                 <div id=${arrdata[i].id} class='action'>
                    <button onMouseOver="edit(chk=false)"; class="edit"><i class="fa fa-lg fa-window-close"></i></button>
                    <button onMouseOver="delt()"; class="delete"><i class="fa fa-lg fa-trash"></i></button>
                    <button onClick="saveChange(this)" class="save"><i class="fa fa-lg fa-folder-open"></i></button></div>
                </td>

            </tr>
            `
        }
        else {
            tr += `
            <tr>
                <td>${i + 1}.</td>
                <td>${arrdata[i].item}</td>
                <td>${arrdata[i].qnty}</td>
                <td>${arrdata[i].rate}</td>
                <td>${(arrdata[i].total).toFixed(2)}
                <div id=${arrdata[i].id} class='action'>
                    <button onMouseOver="edit(chk=true)"; class="edit"><i class="fa fa-pencil"></i></button>
                    <button onMouseOver="delt()"; class="delete"><i class="fa fa-lg fa-trash"></i></button></div>
                </td>

            </tr>
            `

        }
    }
    table1.innerHTML=tr;
 
}

// array item edit done
  
// delete item
function delt() {
    let deleteItem = document.querySelectorAll('.delete')
   
 

    deleteItem.forEach((a) => {
        a.addEventListener('click', () => {
            let btnId = a.parentElement.id
            let dt = arrdata.filter(b => {
                return b.id != btnId
            })

            arrdata = dt;
            arraymake();
            neatTotal();
        })
      
    })
    
}


// delete item done
// edit item start
function edit(chk) {
    let editItem = document.querySelectorAll('.edit')
    editItem.forEach((a) => {
        a.addEventListener('click', () => {
            if(chk){
                let editid = a.parentElement.id;
                arraymake(editid);
            }
            else{ 
                arraymake(null);
            }        
        })
      
    })
    
}

// edit item done
// save changes start
function saveChange(a) {
   let id = a.parentElement.id
   let item = a.parentElement.parentElement.children[1].firstChild.value
   let qnty = a.parentElement.parentElement.children[2].firstChild.value
   let rate = a.parentElement.parentElement.children[3].firstChild.value
        arrdata.forEach(a => {
        if (a.id == id) {
            a.item = item
            a.qnty = qnty
            a.rate = rate
            a.total = (qnty * rate)

        }
    })

arrmake();
neatTotal()

}

// savechanges done

// calculation start
neatTotal()
function neatTotal(){
    var neatValue =0;
for(let i=0;i<arrdata.length;i++){
   
neatValue += (arrdata[i].total); 
}
neatPrice.innerHTML=neatValue;
totalprice.innerHTML=neatValue;

let initialDis=0;
discount.addEventListener("keyup",(e) => {
    let discunt=e.target.value;
    if(discunt=>0 && discunt<=100){
        let disc=neatValue*discunt/100;
        totalDiscount.innerHTML=disc;
        
        let totalPrice=neatValue-disc;
        totalprice.innerHTML=totalPrice;
    }
    
})

}

// calculation end

// Happy codding. Stay With javascript. Thank you.


