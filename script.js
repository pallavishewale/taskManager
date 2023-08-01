var searchRecords =[];
var Task =[];




//----------------------------add only main task
function addMainTask(){
  
    let mainTaskName = document.getElementById('main-task').value ;
    mainTaskName = mainTaskName.trimStart();
    
    if(mainTaskName){
      let newParentOnject = {parentTask: mainTaskName, subTask: []};
      Task.push(newParentOnject);
    }
    showOnPage(Task); 
}  

function addTaskAndSubTask(){
  
  document.getElementById('subtask-container').style.display="block";
  document.getElementById('add-mainAndSubtask').disabled = true;
  document.getElementById('add-mainTask').disabled = true;
}

//----------------------------------add task with subtask
function addSubTask(){
  let mainTaskName = document.getElementById('main-task').value ;
  let subTaskName = document.getElementById('Subtask-name').value ;
  let start_Date = document.getElementById('startdatePicker').value ;
  let endt_Date = document.getElementById('enddatePicker').value ;
  let status_value = document.getElementById('status').value ;

  mainTaskName = mainTaskName.trimStart();
  subTaskName = subTaskName.trimStart();

 if(mainTaskName !=""){
   if(subTaskName && start_Date && endt_Date && status_value){
      let newSubTask ={name: subTaskName , startDate: start_Date, endDate:endt_Date, status: status_value };

      const parentTaskIndex = Task.findIndex(task => task.parentTask === mainTaskName);

      if (parentTaskIndex !== -1) {
        // If parentTask is found, push the newSubTask to the subTask array
        Task[parentTaskIndex].subTask.push(newSubTask);
        console.log('New subtask added successfully!');
      } else {
        // If parentTask is not found, create a new Task object with the given parentTask name and the new subtask
        const newTask = {
          parentTask: mainTaskName,
          subTask: [newSubTask]
        };
        Task.push(newTask);
        console.log('Parent task not found. Created a new task and added the subtask.');
      }

      clearfileds();

      showOnPage(Task);
    }else{
      alert("fill all fields");
    }
 }else
    alert("select main task name to add subtask");
}



//-----------------------------------close the subtask container
function closeSubtask_form(){
  document.getElementById('main-task').value="";
  document.getElementById('subtask-container').style.display="none";
  document.getElementById('add-mainAndSubtask').disabled = false;
  document.getElementById('add-mainTask').disabled = false;
  clearfileds();

}

//-----------------------------add subtask
function addSubtaskByParent(button){
  const row = button.parentNode.parentNode;
  let parentTaskName = row.cells[0].textContent;
 
 // const indexToEdit =  employee.findIndex(obj => obj.id == emp_id);
  document.getElementById('main-task').value=parentTaskName;
  document.getElementById('subtask-container').style.display="block";
  document.getElementById('add-mainAndSubtask').disabled = true;
  document.getElementById('add-mainTask').disabled = true;
  
}

//-------------------Delete Parent Task
function deleteParent(indexToDelete){
  let confirmation = confirm("do you want to delete main Task ??");
  if(confirmation){
  
    Task.splice(indexToDelete,1);
    showOnPage(Task);
    alert("deleted successfully..!");
  }
}



//-----------------------------edit subtask
function edit_record(parentObjectIndex,indexToEdit){
 
    document.getElementById('main-task').value =Task[parentObjectIndex].parentTask;
    document.getElementById('Subtask-name').value= Task[parentObjectIndex].subTask[indexToEdit].name;
    document.getElementById('startdatePicker').value = Task[parentObjectIndex].subTask[indexToEdit].startDate;
    document.getElementById('enddatePicker').value =Task[parentObjectIndex].subTask[indexToEdit].endDate;
    document.getElementById('status').value =Task[parentObjectIndex].subTask[indexToEdit].status;

 //alert(Task[parentObjectIndex].subTask[indexToEdit].status);
    document.getElementById('subtask-container').style.display="block";
    document.getElementById('add-mainTask').disabled = true;
  document.getElementById('add-mainAndSubtask').disabled = true;
  enableStatusDropdown() ;
  Task[parentObjectIndex].subTask.splice(indexToEdit,1);
    
  
}

//---------------------------------------delete subtask
function delete_record(parentObjectIndex,indexToDelete){

  let confirmation = confirm("do you want to delete sunTask ??");
  
  if(confirmation){
 

    Task[parentObjectIndex].subTask.splice(indexToDelete,1);
     alert("deleted .. !!");
  }
  showOnPage(Task);
    

}




//----------------------------------------- search functionality----------------------------------

function search() {
  let searchBy = document.getElementById("search").value;
  searchBy = searchBy.trimStart();

  let search_value = document.getElementById("search-field").value;

  switch (searchBy) {
    case "main Task Name":
      searchRecords = filterByMainTaskName(Task, search_value);
      break;
    case "Subtask Name":
     searchRecords = filterBySubTaskName(Task, search_value);
      break;
    case "start Date":
      searchRecords = filterByStartDate(Task, search_value);
      break;
    case "End Date":
      searchRecords = filterByEndDate(Task, search_value);
      break;
    case "status":
      searchRecords = filterByStatus(Task, search_value);
      break;
    default:
      alert("choose search by option");
  }

  console.log(searchRecords);
  showOnPage(searchRecords);
  document.getElementById("search-field").value="";
}

// Filter tasks by main task name
function filterByMainTaskName(taskArray, mainTaskName) {
  mainTaskName = mainTaskName.trim().toLowerCase();

  return taskArray.filter((task) =>
    task.parentTask.toLowerCase().includes(mainTaskName)
  );
}

// Filter tasks by subtask name
function filterBySubTaskName(taskArray, subTaskName) {
  subTaskName = subTaskName.trim().toLowerCase();
  return taskArray.map((task) => ({
    
    ...task,                                         //spread oparator
    subTask: task.subTask.filter((subTask) =>
      subTask.name.toLowerCase().includes(subTaskName)
      
    ),
  })).filter((task) => task.subTask.length > 0);
}

// Filter tasks by start date
function filterByStartDate(taskArray, startDate) {
  startDate = startDate.trim(); // Date format: YYYY-MM-DD
  return taskArray.map((task) => ({
    ...task,
    subTask: task.subTask.filter((subTask) => subTask.startDate === startDate),
  })).filter((task) => task.subTask.length > 0);
}

// Filter tasks by end date
function filterByEndDate(taskArray, endDate) {
  endDate = endDate.trim(); // Date format: YYYY-MM-DD
  return taskArray.map((task) => ({
    ...task,
    subTask: task.subTask.filter((subTask) => subTask.endDate === endDate),
  })).filter((task) => task.subTask.length > 0);
}

// Filter tasks by status
function filterByStatus(taskArray, status) {
  status = status.trim().toLowerCase();
  return taskArray.map((task) => (
    {
    ...task,
    subTask: task.subTask.filter((subTask) =>
      subTask.status.toLowerCase().includes(status)
    ),
})).filter((task) => task.subTask.length > 0);
}



function clearfileds(){
  //clear the fields
  document.getElementById('Subtask-name').value="";
  document.getElementById('startdatePicker').value ="" ;
  document.getElementById('enddatePicker').value ="";
  document.getElementById('status').value ="";
}


