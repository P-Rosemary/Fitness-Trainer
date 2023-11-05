function validateForm(){
    let firstName = 
        document.getElementById("firstNameInput").value; 
    let lastName = 
        document.getElementById("lastNameInput").value; 
    let location = 
        document.getElementById("locationInput").value; 
    let appointmentDateTime = 
        document.getElementById("dateTimeInput").value;
    
    if(firstName == ""){
        alert("First Name is required");
        return false;
    }

    if(lastName == ""){
        alert("Last Name is required");
        return false;
    }

    if(location == ""){
        alert("Location is required");
        return false;
    }

    if(appointmentDateTime == ""){
        alert("Select your appointment Date & Time");
        return false;
    }

   return true; 
}

function addData() { 
    
 if(validateForm() == true){
    // Get input values 
    let firstName = 
        document.getElementById("firstNameInput").value; 
    let lastName = 
        document.getElementById("lastNameInput").value; 
    let location = 
        document.getElementById("locationInput").value; 
    let appointmentDateTime = 
        document.getElementById("dateTimeInput").value; 
    
    
    var appointmentList;
    if(localStorage.getItem("appointmentList") == null){
        appointmentList = [];
    }
    else{
        appointmentList = JSON.parse(localStorage.getItem("appointmentList"))
    }

    appointmentList.push({
        firstName: firstName,
        lastName: lastName,
        location: location,
        appointmentDateTime: appointmentDateTime,
    });

    localStorage.setItem("appointmentList", JSON.stringify(appointmentList));
    showData();

    // Clear input fields 
    clearInputs(); 

  }
} 

function editData(index) { 

    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var appointmentList;
    if(localStorage.getItem("appointmentList") == null){
        appointmentList = [];
    }
    else{
        appointmentList = JSON.parse(localStorage.getItem("appointmentList"))
    }

    document.getElementById("firstNameInput").value = appointmentList[index].firstName;
    document.getElementById("lastNameInput").value = appointmentList[index].lastName;
    document.getElementById("locationInput").value = appointmentList[index].location;
    document.getElementById("dateTimeInput").value = appointmentList[index].appointmentDateTime;

    document.querySelector("#Update").onclick = function(){
        if(validateForm() == true){

            appointmentList[index].firstName = document.getElementById("firstNameInput").value;
            appointmentList[index].lastName = document.getElementById("lastNameInput").value;
            appointmentList[index].location = document.getElementById("locationInput").value;
            appointmentList[index].appointmentDateTime = document.getElementById("dateTimeInput").value;

            localStorage.setItem("appointmentList", JSON.stringify(appointmentList));

            showData();

            clearInputs();
            
            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }    
    }

 
}

function deleteData(index) { 
    var appointmentList;
    if(localStorage.getItem("appointmentList") == null){
        appointmentList = [];
    }
    else{
        appointmentList = JSON.parse(localStorage.getItem("appointmentList"))
    }

    appointmentList.splice(index, 1);
    localStorage.setItem("appointmentList", JSON.stringify(appointmentList));
    showData();

}

function clearInputs() { 
    
    // Clear input fields 
    document.getElementById("firstNameInput").value = ""; 
    document.getElementById("lastNameInput").value = ""; 
    document.getElementById("locationInput").value = ""; 
    document.getElementById("dateTimeInput").value = ""; 
}

function showData(){
    var appointmentList;
    if(localStorage.getItem("appointmentList") == null){
        appointmentList = [];
    }
    else{
        appointmentList = JSON.parse(localStorage.getItem("appointmentList"))
    }

    var html = "";

    appointmentList.forEach(function (element,index){
        html += "<tr>";
        html += "<td><b>" + element.firstName + "</b></td>";
        html += "<td><b>" + element.lastName + "</b></td>";
        html += "<td><b>" + element.location + "</b></td>";
        html += "<td><b>" + element.appointmentDateTime + "</b></td>";
        html += "<td>" + '<button onclick="editData(' + index + ')">Edit</button>'+ 
        '<button onclick="deleteData(' + index + ')">Delete</button>' + "</td>";
        html += "</tr>"
    });

    document.querySelector("#outputTable tbody").innerHTML = html;
}

document.onload = showData();