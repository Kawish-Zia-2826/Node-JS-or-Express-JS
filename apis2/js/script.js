const apiURL = 'http://localhost:3000/api/users/'
const registerForm = $('#registerForm');
registerForm.on("submit",async function (e) {
e.preventDefault();
const formData = new FormData(this);
const res = Object.fromEntries(formData);

const data =await  fetch(apiURL+'register',{
  method:'POST',
  headers:{
    'Content-Type': 'application/json'
  }
  ,body:JSON.stringify(res)


})



if(data.ok){
  const dataa  = await  data.json();
  console.log("Registration successful");
  window.location.href = "index.html"
}else{
  console.log(dataa.message|| "Registration failed");
  
}


});


$("#loginForm").on("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const res = Object.fromEntries(formData);
    // return console.log(JSON.stringify(res));
    const data =await fetch(apiURL+'login',{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(res)
    });
    
    const dataa = await data.json();
    

    if(data.ok){
      localStorage.clear();
      localStorage.setItem("token",dataa.token);
      window.location.href = "student.html";  
    }else{
      console.log(dataa.message||"Login failed");
      
    }


});