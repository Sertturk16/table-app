var myArr = [];
var rows_per_page = 10;
var current_page = 1;


function createButton(buttonIndex){
    let btn = document.createElement("button");
    btn.innerText = buttonIndex;
    let buttons = document.getElementById("buttons");
    btn.classList.add("btnClass");
    btn.addEventListener("click", function(){
        document.getElementById("buttons").childNodes[current_page-1].classList.remove("active");
        current_page = buttonIndex;
        btn.classList.add("active");
        fillTable();
    });
    return btn;
}

function removeAllChildNodes() {
    parent = document.getElementById("buttons");
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

function setupButtons(){
    removeAllChildNodes();
    let buttonCount = myArr.length/rows_per_page;
    for(let i = 1;i <= Math.ceil(buttonCount);i++){
        document.getElementById("buttons").appendChild(createButton(i));
    }
    document.getElementById("buttons").childNodes[0].classList.add("active");
}

function fillTable(){
    document.getElementById("table").innerHTML = "<tr><th>" + "ID" + "</th><th>" + "Title" + "</th><th>" + "Body" + "</th></tr>"
    let start = (current_page-1)*rows_per_page;
    let end = current_page * rows_per_page;
    if(end >= myArr.length) end = myArr.length;
    let rowToPush = "";
    for(let i = start;i < end;i++){
        rowToPush += "<tr>";
        rowToPush += ("<td>" + myArr[i].id + "</td>");
        rowToPush += ("<td><b>" + myArr[i].title + "</b></td>");
        rowToPush += ("<td>" + myArr[i].body + "</td>");
        rowToPush += "</tr>";
        
    }
    document.getElementById("table").innerHTML += rowToPush;
}

function getData(){
    console.log("LOADING");
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(data => data.json())
    .then(data => {
        myArr = [...data];
        fillTable();
        setupButtons();
        console.log("LOADED");
    })
    .catch((p) => {
        console.log ("ERROR!!!",p);
    });
}

function offset(){
    if(document.getElementById("row-number").value > 0){
        if(document.getElementById("row-number").value > 50) document.getElementById("row-number").value = 50; 
        rows_per_page = document.getElementById("row-number").value;
        current_page = 1;
        fillTable();
    }
}

function minmax(){
    document.getElementById("row-number").setAttribute("min",0);
    document.getElementById("row-number").setAttribute("max",50);
}

document.onload = getData();
document.onload = minmax();

