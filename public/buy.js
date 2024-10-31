async function getPurchasedCourses(){

    try{
    const response=await axios.get('http://localhost:3000/user/purchaseCourses',{
        "headers":{"token":localStorage.getItem("token")}
    })

    courses=(response.data.courses)
    if(courses[0]){
    courses=courses[0].courses
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
        

        divELdes.innerHTML="desciption"+": "+des
            divELprice.innerHTML="Price"+":"+price
            divELtitle.innerHTML="Title"+": "+title

            divEl.append(
                divELtitle,
                divELimage,
                divELdes,
                divELprice,
                )

            
            document.getElementById('yourcourses').appendChild(divEl)
    

    }
}else{
    alert('No course to Show')
}




}

catch(e){
    alert(e.message)
    window.location.href="./sell.html"
}
}
getPurchasedCourses()
