async function addCourse() {
    token=localStorage.getItem("token")
    title=document.getElementById('title').value 
    des=document.getElementById('des').value 
    image=document.getElementById('image').value 
    price=document.getElementById('price').value 
    pub=document.getElementById('pub').value
    try{
    if (pub==="true"){
        pub=true
    }
    else{
        pub=false
    }
    const res=await axios.post('http://localhost:3000/admin/courses',{
        title: title,
        description: des,
        price: parseInt(price),
        imageLink: image,
        published: pub
    },{
        "headers":{"token":token}
    })
    console.log('success')
    window.location.href="./admindashboard.html"

}
catch(e){
    window.location.href="./adminform.html"
}

    
}