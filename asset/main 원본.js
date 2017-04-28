var data;
var req = new XMLHttpRequest(); //ajax 통신을 할 객체 생성
req.open("GET", "./asset/list.json"); //json 파일을 받아옴
req.send();

var phonecheck;

if($(window).width()<600){
    phonecheck=true;
}
else{
    phonecheck=false;
}

req.onreadystatechange = function() {
    if (req.readyState == 4) {
        if (req.status == 200) { //만약 모든 파일을 다 받아왔으면
            data = JSON.parse(req.response);
            
        }
    }
};

$(document).ready(function() {
    // menu 클래스 바로 하위에 있는 a 태그를 클릭했을때

    var temptarget;
    var target;

    $(".title").click(function(event) {
        event.stopPropagation();        //span과 img로 겹쳐 있으니 중복 클릭 이벤트 방지
        temptarget = target;
        target = $(event.target).get(0);
        listClickEvent(target, temptarget);
    });

    $(".icons>li").click(function(event) {
        temptarget = target;
        target = $(event.target).get(0);
        listClickEvent(target, temptarget);

    });
});


function listClickEvent(target, temptarget) {
    var submenu = $("#main");

    // submenu 가 화면상에 보일때는 위로 보드랍게 접고 아니면 아래로 보드랍게 펼치기
    if (submenu.is(":visible")) {
        if (target !== temptarget) {        
            listUp(target);
            
            target.animate({
              top:100,
              left:200
            });
        }
        else {          //똑같은것을 선택하면 접기
            submenu.slideUp();
        }
    }
    else {              
        listUp(target);
        submenu.slideDown();
    }
}


function listUp(target) {

    // req.setRequestHeader('Cache-Control', 'no-cache');

    if (target.className == "icon-tools") var key = "Tools";
    else if (target.className == "icon-graduation-cap") var key = "Academy";
    else if (target.className == "icon-edit") var key = "Edit";
    else if (target.className == "icon-flow-merge") var key = "Training";
    else if (target.className == "icon-language") var key = "Language";
    else if (target.className == "icon-network") var key = "Network";
    else if (target.className == "icon-book") var key = "Book";
    else if (target.className == "icon-lightbulb") var key = "ETC";
    else if (target.className == "title") var key = "SSG";

    createHtml(key);
}



function createHtml(key) {

    document.getElementById("col1").innerHTML = "";
    document.getElementById("col2").innerHTML = "";
    document.getElementById("col3").innerHTML = "";
    document.getElementById("mainHead").innerHTML = "";
    document.getElementById("mainLine").innerHTML = "";

    //req.onreadystatechange = function() {
    //if (this.readyState == 4) { //만약 모든 파일을 다 받아왔으면

    //var data = JSON.parse(this.response);

    if (key == "Training")
        document.getElementById("mainHead").setAttribute('class', 'Training');
    else if (key == "Tools")
        document.getElementById("mainHead").setAttribute('class', 'Tools');
    else if (key == "Edit")
        document.getElementById("mainHead").setAttribute('class', 'Edit');
    else
        document.getElementById("mainHead").removeAttribute('class');

    document.getElementById("mainHead").innerHTML = data[key][0].title;
    document.getElementById("mainLine").innerHTML = data[key][0].explanation;

    for (var i = 1, j = 1; i < data[key].length; i++) {
        var div = document.getElementById("col" + String(j)); //div 태그 가져오기
        //console.log(div);

        //a태그 생성
        var a = document.createElement("a");

        if (key == "SSG") {
            a.href = "#";
            a.setAttribute('onclick', 'return false;');
        }
        else {
            a.href = data[key][i].href;
            a.target = "_blank"
        }

        //img 태그 생성
        var img = document.createElement("img")
        img.src = data[key][i].src;
        //h4태그 생성
        var h4 = document.createElement("h4")
        h4.innerHTML = data[key][i].hvalue;

        var hr = document.createElement("hr");

        var p = document.createElement("p");
        p.innerHTML = data[key][i].pvalue;

        a.appendChild(img);
        a.appendChild(h4);
        a.appendChild(hr);
        a.appendChild(p);
        div.appendChild(a);
        if(phonecheck==false){
            if (j == 3)
                j = 0;
            j++;
        }
    }
    //    }
    // };
    // req.send();
}

