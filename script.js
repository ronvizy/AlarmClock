let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");
let stopwch= document.getElementsByClassName("inner");
const hrsInp = document.getElementById("hrsInp");
const minInp = document.getElementById("minInp");
const activeAlarms = document.getElementById("activeAlarms");
const setAlarm = document.getElementById("set");

let alarmsArr = [];
let maxLen=5; //TO RESTRICT USER ATMOST 5 ALARMS

let alarmSound = new Audio("alarm.wav");

let initialHour=0, initialMin=0, alarmIndex=0;

let clearAll=document.getElementById("clearAllB");


const appendZero = (value) => (value < 10 ? "0"+ value: value);

// setInterval(()=>{
//     let currentTime=new Date();
//     hrs.innerHTML=appendZero(currentTime.getHours());
//     min.innerHTML=appendZero(currentTime.getMinutes());
//     sec.innerHTML=appendZero(currentTime.getSeconds());
// },1000)

//search for value in object
const searchObject = (parameter, value) => {
    let alarmObject, objIndex;
    let exist = false;
    
    alarmsArr.forEach((alarm, index) => {
        if(alarm[parameter] == value){ 
            exist=true;
            alarmObject=alarm;
            objIndex = index;
            console.log("obj: found, exist: ",exist);
            return false;
        }
    });
    //console.log("obj: found, exist: ",exist);
    return[exist, alarmObject, objIndex];
};


//Displaying Time
function displayTimer(){
    
    let currentTime=new Date();
    hrs.innerHTML=appendZero(currentTime.getHours());
    min.innerHTML=appendZero(currentTime.getMinutes());
    sec.innerHTML=appendZero(currentTime.getSeconds());
        // console.log(currentTime.getSeconds());

        //alarm
        alarmsArr.forEach((alarm, index)=>{
            if(alarm.isActive){
                console.log("alarm: ",alarm.id," is active");
                console.log("active: ",alarm.alarmHour,":",alarm.alarmMin, "curent time: ",appendZero(currentTime.getHours()),":",currentTime.getMinutes());
                if(
                    alarm.alarmHour == appendZero(currentTime.getHours()) && alarm.alarmMin == currentTime.getMinutes()
                ) {
                    console.log("Alarm time beepbeep");
                    console.log(alarm.alarmHour);
                    alarmSound.play();
                    alarmSound.loop = true;
                }
            }
        })

}

const InputCheck = (inputVal) => {
    // if(inputVal==null){
    //     inputVal=0;
    // }
    inputVal = parseInt(inputVal);
    if(inputVal < 10){
        inputVal = appendZero(inputVal);
    }
    return inputVal;
}

hrsInp.addEventListener("input", () => {
    hrsInp.value = InputCheck(hrsInp.value);
});

minInp.addEventListener("input", () => {
    minInp.value = InputCheck(minInp.value);
});

//create alarm div

const createAlarm = (alarmObject) => {
    
    const {id, alarmHour, alarmMin }=alarmObject; //destructive assignment

    //alarm Div

    let alarmDiv= document.createElement("div");
    alarmDiv.classList.add("alarmDiv");
    alarmDiv.classList.add("fade-out");
    alarmDiv.setAttribute("data-id", id);
    alarmDiv.innerHTML='<span>'+alarmHour+' : '+alarmMin+'</span>'
    console.log(alarmDiv);

    //checkBox

    let checkbox= document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.addEventListener("click", (e)=> {
        if(e.target.checked){
            console.log("alarm Started");
            startAlarm(e);
        }
        else{
            console.log("alarm off");
            stopAlarm(e);
        }
    });
    alarmDiv.appendChild(checkbox);

    //dleteButton
    let deleteButton=document.createElement("button");
    deleteButton.innerHTML = '<i class="fa-solid fa-square-minus"></i>';
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", (e) => {
        deleteAlarm(e);
        console.log("deleted");
        });
    alarmDiv.appendChild(deleteButton);
    activeAlarms.appendChild(alarmDiv);
};

//set Alarm

setAlarm.addEventListener("click", ()=>{
    if(maxLen<=alarmsArr.length){
        alert("Alarm Stack full");
        return
    }


    alarmIndex += 1;
    
    // alarmObject
    let alarmObject= {};
    alarmObject.id= alarmIndex+'_'+hrsInp.value+'_'+minInp.value;
    console.log(alarmObject.id);
    alarmObject.alarmHour = hrsInp.value;
    alarmObject.alarmMin = minInp.value;
    alarmObject.isActive = false;
    console.log(alarmObject);
    alarmsArr.push(alarmObject);
    createAlarm(alarmObject);
    hrsInp.value=appendZero(initialHour);
    minInp.value= appendZero(initialMin)

});

//start alarm

const startAlarm = (e) => {
    console.log("Start alarm called");
    let searchId=e.target.parentElement.getAttribute("data-id");
    let [exist, obj, index]=searchObject("id", searchId);
    //console.log(exist);

    if(exist){
        console.log("exist: ",exist)
        alarmsArr[index].isActive=true;
    }
};

//stop alarm

const stopAlarm = (e) => {
    let searchId = e.target.parentElement.getAttribute("data-id");
    let [exist, obj, index] = searchObject("id", searchId);
    if(exist){
        alarmsArr[index].isActive = false;
        alarmSound.pause();
    }
};

//delete alarm

const deleteAlarm =(e) =>{
    
    console.log("delete button execution");
    let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
    let [exist, obj, index]= searchObject("id", searchId);
    console.log(exist);
    if(exist){
        alarmSound.pause();
        console.log("Exist: ");
        setTimeout(e.target.parentElement.parentElement.remove(),2000);
        
        // searchId.parentElement.parentElement.removeChild(element)
        alarmsArr.splice(index, 1);    
    }
};

clearAll.addEventListener("click", ()=>{
    
    console.log("before",alarmsArr);
    activeAlarms.innerHTML="";
    alarmsArr.forEach((alarm) => {
        
    })
    alarmsArr.length=0;
    console.log(alarmsArr);
    
});

window.onload = () => {
    console.log('window running');
    setInterval(displayTimer);

    initialHour=0;
    initialMin=0;
    alarmIndex=0;
    alarmsArr=[];
    hrsInp.value=appendZero(initialHour);
    minInp.value=appendZero(initialMin);

}



//alarms


