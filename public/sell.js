async function userSignup(){
    const username=document.getElementById('signupusername').value
    const password=document.getElementById('signuppassword').value
    try{
        const response=await axios.post('https://skillup-7dhp.onrender.com/user/signup',{
            "username":username,
            "password":password
        })
        window.location.href='./sell.html'

    }
    catch(e){
        if (e.response.status==409){
            ele=document.getElementById('signupzoderror')
            ele.innerHTML="Username Taken"
            ele.style.display="block"

        }
        if (e.response.status==400){
            console.log(e)
            ele=document.getElementById('signupzoderror')
            ele.innerHTML=e.response.data.message
            ele.style.display='block'
        }


    }
    
}

async function userSignin(){
    try{
    const username=document.getElementById('signinusername').value
    const password=document.getElementById('signinpassword').value
    const response= await axios.post('https://skillup-7dhp.onrender.com/user/signin',{
        "username":username,
        "password":password
    })
    
    if (response.data.token){
        token=response.data.token
        localStorage.setItem("token",token)
        console.log('User is Signin')
        window.location.href="./userdashboard.html"
    
    }

    else{
        ele= document.getElementById('signinerror')
        ele.style.display='block'
        
    }
}
catch(e){

    ele= document.getElementById('signinerror')
    ele.style.display='block'

}


}


async function adminSignin(){
    const username=document.getElementById('adminusername').value
    const password=document.getElementById('adminpassword').value
    const response= await axios.post('https://skillup-7dhp.onrender.com/admin/signin',{
        "username":username,
        "password":password
    })
    if (response.data.token){
        token=response.data.token
        localStorage.setItem("token",token)
        console.log('Admin is Signin')
        window.location.href='./admindashboard.html'

    }
    else{
        alert('invalid Credential')
    }


}

function errorHandle(id){
    console.log(id)
    ele=document.getElementById(id)
    ele.style.display='none'
}


function navbarDashboard(){
    token=localStorage.getItem("token")
    if(token){
        ele=document.getElementById('links')

        div=document.createElement('div')
        div1=document.createElement('div')


        a=document.createElement('a')
        b=document.createElement('a')

        a.setAttribute('href','userdashboard.html')
        a.innerHTML='UserDashboard'
        div.appendChild(a)
        
        b.setAttribute('href','admindashboard.html')
        b.innerHTML='AdminDashboard'
        div1.appendChild(b)

     
     
        
        ele.appendChild(div)
        ele.appendChild(div1)
    }

}

navbarDashboard()

