

let table=document.querySelector("#records_container");
seeRecords();


function seeRecords(){
    let  user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
user_records.forEach(element => {
   if(element.flag==true)
        {table.innerHTML+=`
        <tr class="record_item" id="my_record">
            <td> ${element.name}</td>
            <td> ${element.surname}</td>
            <td> ${element.email}</td>
            <td> ${element.record}</td>
        </tr>
        `}
    else{
        table.innerHTML+=`
        <tr class="record_item">
            <td> ${element.name}</td>
            <td> ${element.surname}</td>
            <td> ${element.email}</td>
            <td> ${element.record}</td>
        </tr>
        `
    }

})
}

window.localStorage.getItem('user');