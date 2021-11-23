// getting all required elements
const inputBox=document.querySelector(".inputField input");
const addBtn=document.querySelector(".inputField button");
const todolist=document.querySelector(".todolist");
const deleteAllBtn=document.querySelector(".footer button");
inputBox.onkeyup=()=>{
    let userData=inputBox.value;
    if(userData.trim()!=0){
        addBtn.classList.add("active");
    }else{
        addBtn.classList.remove("active");
    }
}
showTasks();
addBtn.onclick=()=>{
    let userData=inputBox.value; //getting user entered value
    let getLocalStorage=localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage==null){ //if localstorage is null
        listArr=[]; //creating blank array
    }else{
        listArr=JSON.parse(getLocalStorage); //transforming json string into a js object
    }
    listArr.push(userData); //pushing or adding user data
    localStorage.setItem("New Todo",JSON.stringify(listArr));////transforming json string into a js object
    showTasks(); //calling showTasks function
    addBtn.classList.remove("active");
}

// function to add task list inside ul
function showTasks(){
    let getLocalStorage=localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage==null){ //if local is null
        listArr=[]; //creating blank array
    }else{
        listArr=JSON.parse(getLocalStorage); //transforming json string into a js object
    }
    const pendingNumb=document.querySelector(".pendingNumb");
    pendingNumb.textContent=listArr.length;//passing the length value in pendingNumb
    if(listArr.length>0){ //if array lengthis greater than 0
        deleteAllBtn.classList.add("active");
    }else{
        deleteAllBtn.classList.remove("active");
    }
    let newLiTag='';
    listArr.forEach((element,index) => {
        newLiTag+=`<li>${element}<span onclick="deleteTask(${index})";><img src="https://img.icons8.com/ios-glyphs/30/000000/trash--v1.png"/></span></li>`;
    });
    todolist.innerHTML=newLiTag; //adding new li tag inside ul tag
    inputBox.value="";  //once task added leave the input field blank
}

// delete task function
function deleteTask(index){
    let getLocalStorage=localStorage.getItem("New Todo");
    listArr=JSON.parse(getLocalStorage);
    listArr.splice(index,1); //delete or remove the particular indexed li
    //after remove the li again update the local storage
    localStorage.setItem("New Todo",JSON.stringify(listArr));
    showTasks();
}

// delete all tasks function
deleteAllBtn.onclick=()=>{
    listArr=[]; //empty an array
    //after delete all task again update the local storage
    localStorage.setItem("New Todo",JSON.stringify(listArr));
    showTasks();
}