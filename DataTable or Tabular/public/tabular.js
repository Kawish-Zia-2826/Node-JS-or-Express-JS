var table = new Tabulator("#example-table", {
    
    layout:"fitColumns",
    ajaxURL:"http://localhost:3000/api/users",
     ajaxResponse:function(url, params, response){
    return response.data;
    },
    
 pagination:true,
    paginationSize:10,
    paginationSizeSelector:[10, 25, 50, 100],
    placeholder:"No Data Set",
    columns:[
        {title:"FirstName", field:"first_name",headerFilter:"input"},
        {title:"LastName", field:"last_name"},
        {title:"email", field:"email"},
        {title:"Gender", field:"gender"},
        {title:"Actions", 
          formatter:function () {
            return `
            <button>view</button>
            <button>update</button>
            <button>delete</button>
            `
          }
        },
        
    ],
});


document.getElementById("print-table").addEventListener("click", function(){
   table.print(false, true);
});

document.getElementById("download-csv").addEventListener("click", function(){
    table.download("csv", "data.csv");
});

//trigger download of data.json file
document.getElementById("download-json").addEventListener("click", function(){
    table.download("json", "data.json");
});

//trigger download of data.xlsx file
document.getElementById("download-xlsx").addEventListener("click", function(){
    table.download("xlsx", "data.xlsx", {sheetName:"My Data"});
});

//trigger download of data.pdf file
document.getElementById("download-pdf").addEventListener("click", function(){
    table.download("pdf", "data.pdf", {
        orientation:"portrait", //set page orientation to portrait
        title:"Example Report", //add title to report
    });
});

//trigger download of data.html file
document.getElementById("download-html").addEventListener("click", function(){
    table.download("html", "data.html", {style:true});
});

var fieldEl = document.getElementById("filter-field");
var typeEl = document.getElementById("filter-type");
var valueEl = document.getElementById("filter-value");

function updateData() {
var field = fieldEl.value
var type = typeEl.value
var val = valueEl.value
if(val){
   table.setFilter(field,type, val);
}

}

valueEl.addEventListener('keyup',updateData)