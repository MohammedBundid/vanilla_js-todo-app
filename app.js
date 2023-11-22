const AddListBtn = document.getElementById('addBtn');
const userInput = document.getElementById('userInput');
const listContainer = document.getElementById('listContainer');
const actionBtns = document.querySelectorAll('.btn');


window.onload = function () {
    const savedLists = localStorage.getItem('todolist');

    if(savedLists){
        listContainer.innerHTML = savedLists;
    }
}

const generateUniqueId = () => {
    const baseAlpha = 'Text';
    const baseNum = Math.floor(Math.random() * 100000) + 1000;
    const id = `${baseAlpha}${baseNum}`;

    return id;

    // console.log(id);
}

function handleAddItem(){
    addListItem();
    saveListToLocalStorage();
}

function addListItem(){
    
    const list = userInput.value.trim();

    if (list !== ''){
        const newList = document.createElement("li");
        const itemId = generateUniqueId();
        newList.id = itemId;
        newList.textContent = list;
        
        listContainer.appendChild(newList);
        listContainer.appendChild(document.createElement('br'));

        listContainer.addEventListener('click', function(event) {
            const clickedItem = event.target;

            if(clickedItem.tagName === 'LI'){
                event.target.classList.toggle('active');
                console.log(clickedItem.id)

                event.stopImmediatePropagation();
            }
        }, true)
    
        clearInputField();
    }
    else {
        alert('input is empty');
    }

}

AddListBtn.addEventListener('click', handleAddItem);
actionBtns.forEach(btn => {
    btn.addEventListener('click', handleActionBtns)
});

userInput.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
        handleAddItem();
    }
})


function clearInputField(){
    if (userInput.value !== ''){
    
        userInput.value = '';
    }
   
}

function saveListToLocalStorage() {
    localStorage.setItem('todolist', listContainer.innerHTML)
}

function handleActionBtns(event) {

    const clickedBtn = event.target;

    if(clickedBtn.dataset.type === 'edit'){
        editList();
    }

    else if(clickedBtn.dataset.type === 'del'){
        delList();
    }

    else {
        clearList();
    }
    
}

function editList() {
    const listItems = document.querySelectorAll('li');
    
    listItems.forEach(listItem => {
        if(listItem.classList.contains('active')){
            const itemId = listItem.id;
            const current = listItem.textContent;
            userInput.value = current;
            console.log(`edited list with id: ${itemId}`);
            
        }
    })

    saveListToLocalStorage();
    
}

function delList() {

    const listItems = document.querySelectorAll('li');
    
    listItems.forEach(listItem => {
        if(listItem.classList.contains('active')){
            const itemId = listItem.id;
            console.log(`deleted list with id: ${itemId}`);

            const brElement = listItem.nextElementSibling;

            if(brElement && brElement.tagName === 'BR'){
                brElement.remove();
            }

            listItem.remove();
            
        }
    })

    saveListToLocalStorage();
    
}

function clearList() {
    listContainer.innerHTML = ''
    saveListToLocalStorage();
    
}