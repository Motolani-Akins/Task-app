//Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

function loadEventListeners(){
    //Add task event
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);
    //Clear Task Event
    clearBtn.addEventListener('click', clearTasks);
    //Filter Tasks Event
    filter.addEventListener('keyup', filterTasks);
}

//Add Task
function addTask(e) {
      if(taskInput.value === '' ) {

        alert('Add a Task');
      }

      //Create li Element
      const li = document.createElement('li');

      //Create class
      li.className = 'collection-item';

      //Create text node and append to li
      li.appendChild(document.createTextNode(taskInput.value));

      //Create new link element
      const link = document.createElement('a');

      //Add class
      link.className = 'delete-item secondary-content';

      //Add icon html
      link.innerHTML = '<i class= "fa fa-remove"></i>';

      //Append the link to the li
      li.appendChild(link);

      //Append the li to the ul
      taskList.appendChild(li);

      //Store in local storage
      storeTaskInLocalStorage();
      

     
//Clear input
taskInput.value = '';

    e.preventDefault();
}

//Store task
function storeTaskInLocalStorage(task){
    let tasks;
    if (localStorage.getItem('tasks') === null ) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {   
        e.target.parentElement.parentElement.remove();
        }
    }
}

//Clear Tasks
function clearTasks(e) {
    while(taskList.firstChild)
    taskList.removeChild(taskList.firstChild);
}

//filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item =task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else { 
            task.style.display = 'none';
        }
    })
}
