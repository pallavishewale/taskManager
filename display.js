
// show data on html page
function showOnPage(){


    var parentTaskRows ='';
    // Using forEach loop to iterate through the array
    Task.forEach((task) => {
    
        parentTaskRows += `<tr class="parentRow" >
                            <td colspan="4" class="parentRowdata">${task.parentTask}</td>
                            <td class="parentTaskAction"> <button id="edit-button" id="edit" class="addSubtask-button" onclick="addSubtaskByParent(this)" >Add Subtask</button>
                            <button id="delete-button" id ="delete" class ="delete-button" onclick="deleteParent(this)"> delete </button>
                            </td>
                       
                          </tr>`;
        if(task.subTask.length>0){
          parentTaskRows+= `<tr>
                            <th>Subtask Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Action</th>
                            
                          </tr>`;
    
        }
       task.subTask.forEach((subTask) => {
         parentTaskRows +=     `<tr>
                              <td>${subTask.name}</td>
                              <td>${subTask.startDate}</td>
                              <td>${subTask.endDate}</td>
                              <td>${subTask.status}</td>
                              <td> <button id="edit-button" id="edit" class="edit-button" onclick="edit_record(this)" >Edit</button>
                              <button id="delete-button" id ="delete" class ="delete-button" onclick="delete_record(this)"> delete </button>
                              </td>
                            </tr>`;
       });
       
      });
    
    
      var tableBody = document.querySelector(".taskTable-tbody");
    tableBody.innerHTML = parentTaskRows;
    }