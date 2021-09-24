// Define Ui vars
const form = document.querySelector("#task-form");
const tasklist = document.querySelector(".collection");
const clearBtn= document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput= document.querySelector("#task");



 function gettasks(){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
   tasks.forEach(function(task){
        //create li elementy
    const li=document.createElement('li');
    li.className='collection-item';
    li.appendChild(document.createTextNode(task));
    //create new link elementy
   
    const link=document.createElement('a');
    link.className="delete-item secondary-content";
    link.innerHTML='<i class="fas fa-times"></i>';
    
    li.appendChild(link);
    tasklist.appendChild(li);
   });

}



 function clearTaskFromLocalStorage(){
  localStorage.clear();
 }
function clearTask(e){
  tasklist.innerHTML="";
     clearTaskFromLocalStorage();
}

function filtertask(e){
    const text=e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task) {
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display="block";
            }else{
                task.style.display="none";
            }
        }
    );
}

 function removeTaskFromLocalStorage(taskItem){
     console.log(taskItem);
     let tasks;
     if(localStorage.getItem('tasks')=== null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent===task){
            tasks.splice(index,1);

        }

    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
function removeTask(e){
   
            if(e.target.parentElement.classList.contains("delete-item")){
                if(confirm("Are you sure you want to delete?")){

                    e.target.parentElement.parentElement.remove();
                    // e.target.parentElement.parentElement.remove();
                  removeTaskFromLocalStorage(e.target.parentElement.parentElement);  
            
                 }
        }
    
}

 function storeTaskInLocalStorage(task){
    let tasks;
     if(localStorage.getItem('tasks')=== null){
         tasks=[];
     }
     else{
         tasks=JSON.parse(localStorage.getItem('tasks'));
     }
     tasks.push(task);
     localStorage.setItem('tasks',JSON.stringify(tasks));

 }

function addTask(e){
    if(taskInput.value===''){
        alert('Add a task');
    }
    
    //create li elementy
    const li=document.createElement('li');
    li.className='collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link elementy
  
    const link=document.createElement('a');
    link.className="delete-item secondary-content";
    link.innerHTML='<i class="fas fa-times"></i>';
   
    li.appendChild(link);
    tasklist.appendChild(li);

    storeTaskInLocalStorage(taskInput.value);

    taskInput.value='';

    e.preventDefault();
}
// load all events listeners
function loadEventsListeners(){
    //add task event
     document.addEventListener('DOMContentLoaded', gettasks);
     form.addEventListener('submit',addTask);
     tasklist.addEventListener('click',removeTask);
     clearBtn.addEventListener('click',clearTask);
     filter.addEventListener('keyup',filtertask);
}
//Add task eventfunction addTask function
loadEventsListeners();