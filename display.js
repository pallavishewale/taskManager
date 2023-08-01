
// show data on html page
function showOnPage(Task) {


  var parentTaskRows = '';
  // Using forEach loop to iterate through the array
  Task.forEach((task, parentIndex) => {

    parentTaskRows += `<tr class="parentRow" >
                            <td colspan="4" class="parentRowdata">${task.parentTask}</td>
                            <td class="parentTaskAction"> <button id="edit-button" id="edit" class="addSubtask-button" onclick="addSubtaskByParent(this)" >Add Subtask</button>
                            <button id="delete-button" id ="delete" class ="delete-button" onclick="deleteParent(${parentIndex})"> delete </button>
                            </td>
                       
                          </tr>`;
    if (task.subTask.length > 0) {
      parentTaskRows += `<tr>
                            <th>Subtask Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Action</th>
                            
                          </tr>`;

    }
    task.subTask.forEach((subTask, subTaskIndex) => {
     
        if (subTask.status === "completed") {
          parentTaskRows += `<tr id="completed">
                              <td >${subTask.name}</td>
                              <td>${subTask.startDate}</td>
                              <td>${subTask.endDate}</td>
                              <td >${subTask.status}</td>
                              <td> <button id="edit-button" id="edit" class="edit-button" onclick="edit_record(${parentIndex},${subTaskIndex})" >Edit</button>
                              <button id="delete-button" id ="delete" class ="delete-button" onclick="delete_record(${parentIndex},${subTaskIndex})"> delete </button>
                              </td>
                            </tr>`;
        }else{
          parentTaskRows += `<tr>
          <td >${subTask.name}</td>
          <td>${subTask.startDate}</td>
          <td>${subTask.endDate}</td>
          <td >${subTask.status}</td>
          <td> <button id="edit-button" id="edit" class="edit-button" onclick="edit_record(${parentIndex},${subTaskIndex})" >Edit</button>
          <button id="delete-button" id ="delete" class ="delete-button" onclick="delete_record(${parentIndex},${subTaskIndex})"> delete </button>
          </td>
        </tr>`;
        }
     

     


    });
    
  });


  var tableBody = document.querySelector(".taskTable-tbody");
  tableBody.innerHTML = parentTaskRows;


}