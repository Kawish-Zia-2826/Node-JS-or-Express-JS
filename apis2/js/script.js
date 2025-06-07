const apiURL = 'http://localhost:3000/api/users/'
const registerForm = $('#registerForm');
registerForm.on("submit",async function (e) {
e.preventDefault();

try {
  const formData = new FormData(this);
const res = Object.fromEntries(formData);

const data =await  fetch(apiURL+'register',{
  method:'POST',
  headers:{
    'Content-Type': 'application/json'
  }
  ,body:JSON.stringify(res)


})



const dataa  = await  data.json();
if(data.ok){
      Swal.fire({
  toast: true,
  position: 'top-end',  // 👈 top-left
  icon: 'success',
  title: 'Registration successful',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
})
setTimeout(() => {

window.location.href = "index.html"
}, 2000);
}else{
  const error  = dataa.message|| "Registration failed"
  Swal.fire({
  toast: true,
  position: 'top-end',  // 👈 top-left
  icon: 'error',
  title: error,
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
})

  
}
} catch (error) {
 console.log("catch error",error.message) 
}

});


$("#loginForm").on("submit", async function (e) {
    e.preventDefault();
    try {
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
          Swal.fire({
  toast: true,
  position: 'top-end',  // 👈 top-left
  icon: 'success',
  title: 'Login successful',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
})
      setTimeout(() => {
        window.location.href = "student.html";  
      }, 2000);
    }else{
      const error = dataa.message||"Login failed";
      Swal.fire({
  toast: true,
  position: 'top-end',  // 👈 top-left
  icon: 'error',
  title: error,
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
})
      
    }
    } catch (error) {
      console.log("catch error",error.message)
    }


});