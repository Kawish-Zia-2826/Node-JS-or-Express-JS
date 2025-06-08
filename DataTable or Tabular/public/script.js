$(document).ready(function () {
  $('#myTable').DataTable( {
    ajax: {
        url: 'http://localhost:3000/api/users',
        dataSrc: 'data'
    },
    columns: [
     {data:"first_name"},
     {data:"last_name"},
     {data:"email"},
     {data:"phone"},
     {data:'_id',
      render:function(data,type,row){
          return `
          <button onclick="view('${data}')">View</button>
          <button onclick="update('${data}')">update</button>
          <button onclick="delete('${data}')">delete</button>
          `
      },
     } 

        
      
    ]
    ,  buttons: [
        'copy', 'excel', 'pdf'
    ],
    layout: {
        topStart: 'buttons'
    }
} );
});





  // 👇 Ye event AJAX response milne ke baad chalta hai
//   $("#userTable").on("xhr.dt", function (e, settings, json, xhr) {
//     console.log("AJAX response:", json.data); // ✅ Yahan full response dekh sakte ho
//   });
// });

// $.ajax({
//   type: "GET",
//   url: "http://localhost:3000/api/users",
//   data: "data",
//   dataType: "json",
//   success: function (response) {
//     console.log(response);

//   }
// });
