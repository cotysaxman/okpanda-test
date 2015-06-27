/**
 * Created by Coty on 6/28/2015.
 */

window.addEventListener("onload", new function(event) {
    //document.getElementById("newUserButton").addEventListener("onclick", addUser);
    window.USER_TYPE = 'teacher';
    refreshTeacherList();
});

function addUser(){
    //test
    //alert(httpGet("http://okpandatest.site90.net/test.php"));

    //add user
    var name = document.getElementById("newUserName").value;
    alert(httpGet("http://okpandatest.site90.net/new_user.php?name=" + name));
    refreshTeacherList();
}

function httpGet(theUrl){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText.split("XXendXdataXX")[0];
}

function studentMode(){
    window.USER_TYPE = 'student';
    document.getElementById("studentButton").className = "hide";
}

function getTeachers(){
    var teacherList = httpGet("http://okpandatest.site90.net/teacher_list.php");
    return teacherList;
}

function refreshTeacherList(){
    var teacherList = getTeachers();
    var teachers = teacherList.split( /\n/g);
    var userList = document.getElementById("userList");
    userList.innerHTML = "";
    for(var i = 0; i < teachers.length; i++){
        if(!teachers[i]) continue;
        userList.innerHTML += '<div class="teacher" onclick="openTeacher(\'' + teachers[i] + '\')">' +
            teachers[i] + '</div>';
    }
}

function openTeacher(teacher){
    window.CURRENT_TEACHER = teacher;
    var teacherData = httpGet("http://okpandatest.site90.net/open_teacher.php?name=" + teacher);
    alert(teacherData);
    document.getElementById("schedule").className = "show";
    document.getElementById("userSelect").className = "hide";
    teacherDataPoints = teacherData.split("-");
    for(var i = 0; i < teacherDataPoints.length; i++){
        var data = teacherDataPoints[i];
        if(!data) continue;
        console.log(data);
        if(data.indexOf("x") == 0){
            document.getElementById(data.substring(1)).className = "timeSlot reserved";
        } else {
            console.log(data);
            document.getElementById(data).className = "timeSlot open";
        }
    }

    var elements = document.getElementsByClassName("timeSlot");
    for(var i = 0; i < elements.length; i++){
        elements[i].onclick = toggleOpen(elements[i]);
    }

    document.getElementById("saveButton").className = "show";
    document.getElementById("saveButton").onclick = submitData();

}

var submitData = function(){
    return function(){
        var elements = document.getElementsByClassName("timeSlot");
        var output = "";
        for(var i = 0; i < elements.length; i++){
            var element = elements[i];
            if (element.className.match(/(?:^|\s)open(?!\S)/)) {
                output += "-" + element.id;
            } else if (element.className.match(/(?:^|\s)reserved(?!\S)/)) {
                output += "-x" + element.id;
            }
        }
        alert(httpGet("http://okpandatest.site90.net/update_teacher.php?name=" + window.CURRENT_TEACHER + "&data=" + output));
    }
};

var toggleOpen = function(element) {
    return function() {
        if (element.className.match(/(?:^|\s)open(?!\S)/)) {
            if(window.USER_TYPE == 'teacher') element.className = element.className.replace(/(?:^|\s)open(?!\S)/g, '');
            else if(window.USER_TYPE == 'student') element.className = "timeSlot reserved";
        } else if (element.className.match(/(?:^|\s)reserved(?!\S)/)) {
            if(window.USER_TYPE == 'teacher') alert("You can't close a slot that's already reserved! Contact your student ;)");
            else if(window.USER_TYPE == 'student') element.className = "timeSlot open";
        } else {
            if(window.USER_TYPE == 'teacher') element.className = "timeSlot open";
            else if(window.USER_TYPE == 'student') alert("Sorry. That time is not available.");
        }
    }
}