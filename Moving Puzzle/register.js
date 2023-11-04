let current_user;
let user_records=new Array();
const register=doument.querySelector("#register");
const login=document.querySelector("#login");

   register.addEventListener('click', (event) => {
   let name=document.getElementById("name").value
   let surname=document.getElementById("surname").value
   let pass=document.getElementById("pass").value
   let passC=document.getElementById("passConfirm").value
   let email=document.getElementById("email").value
   const register=document.querySelector("register")
     
user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]

if(user_records.some((v)=>{return v.email==email})||user_records.some((v)=>{return v.pass==pass}))
{
   alert("There is an account with this password or email already!");
}

else if(pass!=passC)
{
   alert("Different passwords");
}
else if(pass.length<6)
{
   alert("Password must be at least 6 symbols");
}
else if(name.length==0 || surname.length==0|| email.length==0)
{
   alert("All fields must be filled");
}
else
{
 user_records.push({
 "name":name,
 "surname":surname,
 "email":email,
 "pass":pass,
 "passC":passC,
 "record":0
})

localStorage.setItem("users",JSON.stringify(user_records));

 window.location='welcome.html'
}
})

login.addEventListener('click',(event)=>{

let username=document.getElementById("username").value;
let password=document.getElementById("password").value;
user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
if(user_records.some((v)=>{return v.email==username && v.pass==password}))
{
current_user=user_records.filter((v)=>{return v.email==username && v.pass==password})[0]
module.exports = {current_user};
window.location="menu.html";
}
else
{
alert('Wrong username or password');
}


})
