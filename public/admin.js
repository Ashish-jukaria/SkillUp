
async function getCourses(){
    token=localStorage.getItem("token")

    try{
    
    response=await axios.get('https://skillup-7dhp.onrender.com/admin/courses',{
        "headers":{
            "token":token 
        }
    })
    console.log(response)
    if (response){

        document.getElementById('data').innerHTML=''

        courses=(response.data.courses)
        for(let i=0;i<courses.length;i++){
            title=courses[i].title
            description=courses[i].description
            id=courses[i]._id
            image=courses[i].imageLink
            price=courses[i].price

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
            divedit.innerHTML='Edit'

            divedit.setAttribute("onclick",`editCourse('${id}','${title}','${description}','${image}','${price}')`)
            
            divELdes.innerHTML="desciption"+": "+description
            divELprice.innerHTML="Price"+":"+price
            divELtitle.innerHTML="Title"+": "+title

            divEl.append(
                divELtitle,
                divELimage,
                divELdes,
                divELprice,
                divedit
                )

            
            document.getElementById('data').appendChild(divEl)



        }
    }
    else{
        window.location.href('./sell.html')
    }

}
catch(e){
    window.location.href=("./sell.html")

}
}

getCourses()


async function editCourse(id,title,desciption,image,price) {
    ele=document.getElementById('divid'+id)
    ele.innerHTML=''


    divELtitle=document.createElement('div')
    inputtitle=document.createElement('input')
    divELtitle.innerHTML="Title"+": "
    inputtitle.setAttribute("value",title)
    inputtitle.setAttribute("id","title"+id)
    divELtitle.appendChild(inputtitle)

    divELdes=document.createElement('div')
    inputdes=document.createElement('input')
    inputdes.setAttribute("value",desciption)
    inputdes.setAttribute("id","des"+id)
    divELdes.innerHTML="Description"+": "
    divELdes.appendChild(inputdes)

    divELimage=document.createElement('div')
    inputimage=document.createElement('input')
    inputimage.setAttribute("value",image)
    inputimage.setAttribute("id","image"+id)
    divELimage.innerHTML="image"+": "
    divELimage.appendChild(inputimage)

    divELprice=document.createElement('div')
    inputprice=document.createElement('input')
    inputprice.setAttribute("value",price)
    inputprice.setAttribute("id","price"+id)
    inputprice.setAttribute("type","number")
    divELprice.innerHTML="Price"+": "

    divELprice.appendChild(inputprice)

    divedit=document.createElement('button')
    
    divselect=document.createElement('select')
    divselect.setAttribute('id',"pub"+id)
    divoption1=document.createElement('option')
    divoption2=document.createElement('option')

    divoption1.setAttribute("value","true")
    divoption2.setAttribute("value","false")
    divoption1.innerHTML="True"
    divoption2.innerHTML="False"
    divselect.append(divoption1,divoption2)

    
    divedit.innerHTML='Submit'

    divedit.setAttribute("onclick",`submitEditedCourse('${id}')`)
    
    ele.append(
        divELtitle,
        divELdes,
        divELimage,
        divELprice,
        divselect,
        divedit
        )



    
}

async function submitEditedCourse(id) {
    const token=localStorage.getItem("token")
    title =document.getElementById('title'+id).value 
    des=document.getElementById('des'+id).value
    image=document.getElementById('image'+id).value
    price=document.getElementById('price'+id).value
    pub=document.getElementById('pub'+id).value

    price=parseInt(price)

    if (pub==="true"){
        pub=true
    }
    else{
        pub=false
    }
    await axios.put(`http://localhost:3000/admin/courses/${id}`,{
        title: title,
        description: des,
        price: price,
        imageLink: image,
        published: pub,
        
    },{
        "headers":{"token":token}
    })

    getCourses()
    
}