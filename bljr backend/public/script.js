document.addEventListener("DOMContentLoaded", () => {
    const table = document.querySelector("table")
    const User_inp1 = document.getElementById("User_inp1")
    const User_inp2 = document.getElementById("User_inp2")
    function deleteContent(){
        let btn = document.createElement("button")
        btn.textContent = "delete"
        btn.addEventListener("click",() => {
        fetch("/forms/delete", {
            method: "DELETE",
        })

        

        })
        return btn
    }
    let id = 0

    document.getElementById("btn-Result").addEventListener("click", async (e) => {
        e.preventDefault()
    try{
        const User_value1 = User_inp1.value
        const User_value2 = User_inp2.value        

        console.log(User_value1);
        console.log(User_value2);
        
        const response = await fetch("/forms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                username: User_value1,
                pekerjaan: User_value2
            })
        })
        if(User_value1 === "" && User_value2 === ""){
            alert("data tidak boleh kosong")
        }else{
            
        await response.json()
        let tr = document.createElement("tr")
        const td1 = document.createElement("td")
        td1.textContent = id++
        const td2 = document.createElement("td")
        td2.textContent = User_value1
        const td3 = document.createElement("td")
        td3.textContent = User_value2

        table.append(tr)
        tr.append(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(deleteContent())

        User_inp1.value = ""
        User_inp2.value = ""
        }
    } catch(e){
        console.error(error);
    }
    })


})

