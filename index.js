const input = document.querySelector('input')
const add = document.querySelector('.button-style-add')
// cross = document.getElementById('list-item-id')
const toDoList = document.querySelector('.todo-list')
const itemsLeft = document.querySelector('.items-left')
const activetiem = document.getElementById('active')
const completeditem = document.getElementById('completed')
const allItem = document.getElementById('all')
const clearCompletedItem = document.getElementById('clear-completed')


let allTodoList = localStorage.getItem('todo');
allTodoList = JSON.parse(allTodoList);



function GetAllToDo(allTodoList) {
    if (allTodoList == null || allTodoList.length == 0) {
        toDoList.innerText = ""
        toDoList.appendChild(noitemFoundMessage("No items Found !!!"))
        // toDoList.style.color = "white"
        // toDoList.style.display = "flex"
        // toDoList.style.justifyContent = "center"
        toDoList.style.alignItems = "center"
        return
    }

    toDoList.innerHTML = ''
    if (Array.isArray(allTodoList)) {
        let TotalItemLeft = 0
        allTodoList.forEach((val) => {
            AppendListElementToArray(val)
            if (val.completed == false) {
                TotalItemLeft++
            } else {
                setStylingForCompleteToDo(val.id)
            }
        })
        itemsLeft.innerText = TotalItemLeft + " items left"

    }

}


GetAllToDo(allTodoList)

function GetActiveTodo() {
    if (Array.isArray(allTodoList)) {
        const activeToDoList = allTodoList.filter((val) => !val.completed)
        // console.log(activeToDoList)
        GetAllToDo(activeToDoList)
    }
}


activetiem.addEventListener('click', (e) => {
    GetActiveTodo()
})



function GetAllCompletedToDo() {
    if (Array.isArray(allTodoList)) {
        const completedToDoList = allTodoList.filter((val) => val.completed)
        GetAllToDo(completedToDoList)
        return
    }
}


completeditem.addEventListener('click', (e) => {
    // console.log(e)
    GetAllCompletedToDo()
})


allItem.addEventListener('click', (e) => {
    // console.log(e)
    // console.log(allTodoList)
    GetAllToDo(allTodoList)
})



function AppendListElementToArray(todovalueStausObject) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    const para = document.createElement("p");
    const image = document.createElement("img")
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')
    const div3 = document.createElement('div')

    let TotalItemLeftString = document.querySelector('.items-left')
    TotalItemLeft = TotalItemLeftString.innerText.split(" ")[0]

    div1.setAttribute('class', 'list-item')
    div2.setAttribute('class', 'button-and-task')
    div3.setAttribute('class', 'image')


    li.setAttribute("class", "task");
    li.setAttribute("id", todovalueStausObject.id);
    button.setAttribute("class", "button-style");
    button.setAttribute("id", todovalueStausObject.id)
    para.innerText = todovalueStausObject.task;
    image.setAttribute("class", "cross")
    image.setAttribute("src", "./images/icon-cross.svg")
    image.setAttribute("alt", "cross image is not loaded")
    image.setAttribute("id", todovalueStausObject.id)

    toDoList.appendChild(li);
    li.appendChild(div1)
    div1.appendChild(div2)
    div2.appendChild(button)
    div2.appendChild(para)
    div1.appendChild(div3)
    div3.appendChild(image)


    TotalItemLeft++;
    itemsLeft.innerText = TotalItemLeft + " items left"


    image.addEventListener('click', (e) => {
        // console.log(e)
        // console.log(e.target.id)
        deleteToDoListFromDOM(e.target.id)
    })


    button.addEventListener('click', (e) => {
        console.log(e)
        console.log(e.target.id)
        markAsCompleteFromDOM(e.target.id)
    })




}


function addElementInTodoArray(todovalue) {
    let Todo = localStorage.getItem('todo');
    Todo = JSON.parse(Todo);

    if (Todo == null) {
        Todo = [];
    }

    const toDoValueStausObject = {
        id: generateUniqueId(),
        task: todovalue,
        completed: false
    };


    Todo.push(toDoValueStausObject);

    console.log(allTodoList)

    if (allTodoList == null || allTodoList.length == 0) {
        toDoList.innerHTML = ''
    }

    allTodoList = Todo

    localStorage.setItem('todo', JSON.stringify(Todo));

    return toDoValueStausObject
}

// add Event listener for button click
add.addEventListener('click', (e) => {
    const toDoValue = input.value.trim()
    if (localStorage.getItem('todo') === null) {
        toDoList.innerHTML = ''
    }
    if (toDoValue) {
        const todovalueStausObject = addElementInTodoArray(toDoValue);
        // console.log(todovalueStausObject)
        AppendListElementToArray(todovalueStausObject);
        input.value = '';
    }

});



function isCompletedTodo(id) {
    console.log(allTodoList)
    allTodoList.forEach((val) => {
        if (val.id == id) {
            return val.completed
        }
    })

    return false

}


function deleteToDoListFromDOM(id) {
    const removalId = document.getElementById(id)
    console.log(removalId)
    removalId.remove()


    if (!isCompletedTodo(id)) {
        TotalItemLeft = itemsLeft.innerText.split(" ")[0]
        itemsLeft.innerText = (TotalItemLeft - 1) + " items left"
    }

    allTodoList = allTodoList.filter((val) => val.id != id)

    if (allTodoList == null || allTodoList == []) {
        toDoList.innerText = "No Todo item Found !!!"
        toDoList.style.color = "white"
        toDoList.style.display = "flex"
        toDoList.style.justifyContent = "center"
        toDoList.style.alignItems = "center"
    }

    localStorage.setItem('todo', JSON.stringify(allTodoList))
}



function setStylingForCompleteToDo(id) {
    const mainId = document.getElementById(id)

    const button = mainId.querySelector('.button-style')
    const para = mainId.querySelector('p')
    const image = mainId.querySelector('img')



    button.style.backgroundColor = '#91a5ef'
    button.style.backgroundImage = "url('./images/icon-check.svg')"
    button.style.backgroundRepeat = 'no-repeat'
    button.style.backgroundPosition = 'center';


    para.style.color = '#727272'
    para.style.textDecoration = 'line-through'

    image.remove()
}


function markAsCompleteFromDOM(id) {

    setStylingForCompleteToDo(id)

    if (!isCompletedTodo(id)) {
        TotalItemLeft = itemsLeft.innerText.split(" ")[0]
        itemsLeft.innerText = (TotalItemLeft - 1) + " items left"
    }

    allTodoList.forEach((val) => {
        if (val.id == id) {
            val.completed = true
        }
    })



    localStorage.setItem('todo', JSON.stringify(allTodoList))
}


function removeCompletedElement(allTodoList) {
    if (Array.isArray(allTodoList)) {
        return allTodoList.reduce((acc, val) => {
            if (val.completed == false) {
                acc.push(val)
            }
            return acc
        }, [])

    }
}


function clearCompleted() {

    allTodoList = removeCompletedElement(allTodoList)

    console.log(allTodoList)

    localStorage.setItem('todo', JSON.stringify(allTodoList))

    GetAllToDo(allTodoList)
}



clearCompletedItem.addEventListener('click', (e) => {
    console.log(e)
    clearCompleted()
})

input.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        console.log("enter key is pressed")
        const toDoValue = input.value.trim()
        if (localStorage.getItem('todo') === null) {
            toDoList.innerHTML = ''
        }
        if (toDoValue) {
            const todovalueStausObject = addElementInTodoArray(toDoValue);
            // console.log(todovalueStausObject)
            AppendListElementToArray(todovalueStausObject);
            input.value = '';
        }
    }
})



function generateUniqueId() {
    return Date.now().toString() + Math.floor(Math.random() * 1000).toString();
}

const uniqueId = generateUniqueId();
console.log(uniqueId);  // Example output: "1696249803546793"



function noitemFoundMessage(message) {
    
    div = document.createElement('div')
    div.style.color = "white"
    div.style.display = "flex"
    div.style.justifyContent = "center"
    div.style.alignItems = "center"
    div.innerText = message
    div.style.height = '100%'
    div.style.width = '100%'
    
    return div
}
