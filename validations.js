
function updateEndDate(){
    var startDate = document.getElementById('startdatePicker');
    var endDate = document.getElementById('enddatePicker');

    if(startDate.value!==""){
        endDate.min = startDate.value;
    }
    calculateDays();
}

 
function updateStartDate(){
    var startDate = document.getElementById('startdatePicker');
    var endDate = document.getElementById('enddatePicker');

    if(endDate.value!==""){
        startDate.setAttribute('max', endDate.value);
    }
    calculateDays();
    enableStatusDropdown() ;
    
}


  function enableStatusDropdown() {
    var endDate = document.getElementById('enddatePicker');
    //var startDate = document.getElementById('startdatePicker');
    var selectOptions= document.getElementById('status');
    var currentDate = moment().format("YYYY-MM-DD");
  
    selectOptions.innerHTML ="";

  if(endDate.value!==""){
    if (endDate.value < currentDate) {
        const options = [
          { value: '', text: '' },
            { value: 'completed', text: 'completed' },
            { value: 'Due passed', text: 'Due passed' },
            { value: 'Cancelled', text: 'Cancelled' },
        
          ];

        // Create and append new options to the select element
        options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.text = option.text;
        selectOptions.appendChild(optionElement);
  });
    }
    if (endDate.value >= currentDate) {
        const options = [
          { value: '', text: '' },
            { value: 'completed', text: 'completed' },
            { value: 'Inprogress', text: 'Inprogress' },
            { value: 'Cancelled', text: 'Cancelled' },
        
          ];
     // Create and append new options to the select element
     options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.text = option.text;
        selectOptions.appendChild(optionElement);
    });
    }
    }
  }


 function  calculateDays(){
    var startDate = document.getElementById('startdatePicker').value;
    var endDate = document.getElementById('enddatePicker').value;
  if(startDate && endDate){
    var splitstartDate = startDate.split('-');
    var splitEndDate = endDate.split('-');
    var startMonth = parseInt(splitstartDate[1],10);
    var endMonth = parseInt(splitEndDate[1],10);
     
    var days =1;

    if( parseInt(splitstartDate[1],10)== parseInt(splitEndDate[1],10)){
         days += parseInt(splitEndDate[2],10) - parseInt(splitstartDate[2],10);   ///if both in same month
    }
    else{
      days =1;
      const daysBetweenMonths = [0,31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      days+= daysBetweenMonths[startMonth]-parseInt(splitstartDate[2],10); 
      days+= parseInt(splitEndDate[2],10);

      if(startMonth+1 != endMonth){      // if there is no gap between two months  no need of for loop
        for(i= startMonth+1 ; i< endMonth ;i++){
          days += daysBetweenMonths[i];
        }
      }
    }
    console.log(days);
     var count = document.getElementById('daycount').innerHTML =days;
     //count.value = days;
  }
  }