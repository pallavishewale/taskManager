var Task =[{parentTask: "build employee portal",
            subTask:[{
                name:"add button",
                startDate: "2023-07-19",
                endDate: "2022-04-19",
                status:"complited"
               },
               {
                name:"add status bar",
                startDate: "29/12/20123",
                endDate: "30/12/2023",
                status:"complited"
               },
               {
                name:"add status bar",
                startDate: "29/12/20123",
                endDate: "30/12/2023",
                status:"complited"
               },
               {
                name:"add edit delete button",
                startDate: "29/12/20123",
                endDate: "30/12/2023",
                status:"complited"
               }]
        },
        {parentTask: "build employee portal",
        subTask:[{
            name:"add button",
            startDate: "29/12/20123",
            endDate: "30/12/2023",
            status:"complited"
           },
           {
            name:"add status bar",
            startDate: "29/12/20123",
            endDate: "30/12/2023",
            status:"complited"
           },
           {
            name:"add edit delete button",
            startDate: "29/12/20123",
            endDate: "30/12/2023",
            status:"complited"
           }]
    }];




//add only main task
function addMainTask(){
  
    let mainTaskName = document.getElementById('main-task').value ;
    mainTaskName = mainTaskName.trimStart();
    
    if(mainTaskName){
      let newParentOnject = {parentTask: mainTaskName, subTask: []};
      Task.push(newParentOnject);
    }
    showOnPage(); 
}  

function addTaskAndSubTask(){
  
  document.getElementById('subtask-container').style.display="block";
  document.getElementById('add-mainAndSubtask').disabled = true;
  document.getElementById('add-mainTask').disabled = true;
}

//add task with subtask
function addSubTask(){
  let mainTaskName = document.getElementById('main-task').value ;
  let subTaskName = document.getElementById('Subtask-name').value ;
  let start_Date = document.getElementById('startdatePicker').value ;
  let endt_Date = document.getElementById('enddatePicker').value ;
  let status_value = document.getElementById('status').value ;

  mainTaskName = mainTaskName.trimStart();
  subTaskName = subTaskName.trimStart();

 if(mainTaskName !=""){

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

      //clear the fields
      document.getElementById('Subtask-name').value="";
      document.getElementById('startdatePicker').value ="" ;
      document.getElementById('enddatePicker').value ="";
      document.getElementById('status').value ="";

          showOnPage();
 }else
    alert("select main task name to add subtask");
}



//close the subtask container
function closeSubtask_form(){
  
  document.getElementById('subtask-container').style.display="none";
  document.getElementById('add-mainAndSubtask').disabled = false;
  document.getElementById('add-mainTask').disabled = false;

}

//add subtask
function addSubtaskByParent(button){
  const row = button.parentNode.parentNode;
  let parentTaskName = row.cells[0].textContent;
 
 // const indexToEdit =  employee.findIndex(obj => obj.id == emp_id);
  document.getElementById('main-task').value=parentTaskName;
  document.getElementById('subtask-container').style.display="block";
  document.getElementById('add-mainAndSubtask').disabled = true;
  document.getElementById('add-mainTask').disabled = true;




  
}
function deleteParent(button){

  const row = button.parentNode.parentNode;
  let parentTaskName = row.cells[0].textContent;
 
    const indexToDelete =  Task.findIndex(obj => obj.parentTask == parentTaskName);
    Task.splice(indexToDelete,1);
    showOnPage();

}



//edit subtask
function edit_record(button){
  console.log(Task);
  const row = button.parentNode.parentNode;
  let subTaskName = row.cells[0].textContent;
    const parentObjectIndex = Task.findIndex(obj => obj.subTask.name = subTaskName);
    const indexToEdit =  Task[parentObjectIndex].subTask.findIndex(obj => obj.name == subTaskName);


    
    document.getElementById('main-task').value =Task[parentObjectIndex].parentTask;
    document.getElementById('Subtask-name').value= Task[parentObjectIndex].subTask[indexToEdit].name;
    document.getElementById('startdatePicker').value = Task[parentObjectIndex].subTask[indexToEdit].startDate;
    document.getElementById('enddatePicker').value =Task[parentObjectIndex].subTask[indexToEdit].endDate;
    document.getElementById('status').value =Task[parentObjectIndex].subTask[indexToEdit].status;

    document.getElementById('subtask-container').style.display="block";
    document.getElementById('add-mainAndSubtask').disabled = true;
    document.getElementById('add-mainTask').disabled = true;
  
  
}

//delete subtask
function delete_record(button){
  let confirmation = confirm("do you want to delete sunTask ??");
  
  if(confirmation){
  const row = button.parentNode.parentNode;
  let subTaskName = row.cells[0].textContent;

  const parentObjectIndex = Task.findIndex(obj => obj.subTask.name = subTaskName);
    const indexToDelete =  Task[parentObjectIndex].subTask.findIndex(obj => obj.name == subTaskName);
    
    alert(indexToDelete);

    Task[parentObjectIndex].subTask.splice(indexToDelete,1);
     alert("deleted .. !!");
  }
  showOnPage();
    

}