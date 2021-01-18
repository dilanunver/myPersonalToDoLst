// select items 
const form = document.querySelector('.toDoList');
const toDo = document.getElementById('toDo');
const addBtn = document.querySelector('.add-btn');
const container = document.querySelector('.toDoList-container');
const list = document.querySelector('.toDoList-list');
const clearBtn = document.querySelector('.clear-btn');
const colors = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const input = document.querySelector('.input');
// edit option
editSymbol = false;
let editElement = '';

// event listeners
form.addEventListener('submit', addItems);
clearBtn.addEventListener('click', clearItems);

addBtn.addEventListener('click', function(){
  let hexColor = '#';
  for(let i=0; i<6; i++){
    hexColor += colors[randomColors()]
  }
  
  document.body.style.backgroundColor = hexColor;
  input.style.borderColor = hexColor;
})
// colors 
function randomColors(){
  return Math.floor(Math.random()* colors.length)
}

// functions

// add button
function addItems(e){

e.preventDefault();
const value = toDo.value;
const id = new Date().getTime().toString();
  if(value && editSymbol){
  editElement.innerHTML = value;
  setBacktoDefault()
} else if(value && !editSymbol){
  createItems(id,value);
  container.classList.add('show-container');
  setBacktoDefault()
}
}
// delete
function deleteItems(e){
  const element = e.currentTarget.parentElement.parentElement;
  list.removeChild(element);
  if(list.children.length === 0){
    container.classList.remove('show-container')
  }
  setBacktoDefault();
}
// edit
function editItems(e){
  editElement = e.currentTarget.parentElement.previousElementSibling;
  toDo.value = editElement.innerHTML; 
  editSymbol = true;
  addBtn.textContent = 'edit';
}
setBacktoDefault();

// clear
function clearItems(){
  const items = document.querySelectorAll('.todolist-item')
  if(items.length > 0){
    items.forEach(item=>{
      list.removeChild(item)
    })
  }
  container.classList.remove('show-container');
  setBacktoDefault()
}


function createItems(id,value){
  const element = document.createElement('article');
  element.classList.add('todolist-item');
  const attr = document.createAttribute('data-id');
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = `<p class="title">${value}</p>
  <div class="btn-container">
    <button type="button" class="edit-btn">
      <i class="far fa-edit fa-2x"></i>
    </button>
    <button type="button" class="delete-btn">
      <i class="fas fa-times-circle fa-2x"></i>
    </button>
  </div>`
  const p = element.querySelector('p');
  p.contentEditable = 'true';
  p.addEventListener('click', () => p.contentEditable = 'true')
  p.addEventListener('keypress', (e) => {
    if (e.key === 'Enter')  p.contentEditable = 'false';
  })
  const deleteBtn = element.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', deleteItems);

  const editBtn = element.querySelector('.edit-btn');
  editBtn.addEventListener('click', editItems);
  list.appendChild(element);
}

function setBacktoDefault(){
  toDo.value = '';
  addBtn.textContent = 'add';
  editSymbol = false;
}