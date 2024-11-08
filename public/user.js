async function getuserCourses(){
  token=localStorage.getItem("token")

  try{
  res=await axios.get('https://skillup-7dhp.onrender.com/user/courses',{
    "headers":{
        "token":token
    }
  })

  if (res){

    courses=(res.data.courses)
    for(let i=0;i<courses.length;i++){
        title=courses[i].title
        des=courses[i].description
        image=courses[i].imageLink
        price=courses[i].price
        id=courses[i]._id

        divEl=document.createElement('div')
        divEl.setAttribute("id","divid"+id)
        divELtitle=document.createElement('div')
        divELdes=document.createElement('div')
        divELimage=document.createElement('div')
        imgele=document.createElement('img')
        imgele.setAttribute('src',`${image}`)
        divELimage.appendChild(imgele)
        divELprice=document.createElement('div')
        divedit=document.createElement('button')
        divedit.innerHTML='Buy'
        
        divedit.setAttribute("onclick",`buyCourse('${id}')`)

        divELdes.innerHTML="desciption"+": "+des
            divELprice.innerHTML="Price"+":"+price
            divELtitle.innerHTML="Title"+": "+title

            divEl.append(
                divELtitle,
                divELimage,
                divELdes,

                divELprice,
                divedit
                )

            
            document.getElementById('datauser').appendChild(divEl)
    

    }

  }

  }
  catch(e){
    alert(e.message)
    window.location.href="./sell.html"
  }
}

getuserCourses()


async function buyCourse(id){

try{
const resposne =await axios.post(`https://skillup-7dhp.onrender.com/user/courses/${id}`,{},{
    "headers":{
        "token":localStorage.getItem("token")
    }
})

console.log(resposne)
}
catch(e){
    alert(e.message)
}



}