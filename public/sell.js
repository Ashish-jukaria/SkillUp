async function userSignup(){
    const username=document.getElementById('signupusername').value
    const password=document.getElementById('signuppassword').value

    const response=await axios.post('http://localhost:3000/user/signup',{
        "username":username,
        "password":password
    })

    console.log(response)
}

async function userSignin(){
    const username=document.getElementById('signinusername').value
    const password=document.getElementById('signinpassword').value
    const response= await axios.post('http://localhost:3000/user/signin',{
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
        alert('Wrong Credentials')
    }


}


async function adminSignin(){
    const username=document.getElementById('adminusername').value
    const password=document.getElementById('adminpassword').value
    const response= await axios.post('http://localhost:3000/admin/signin',{
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

