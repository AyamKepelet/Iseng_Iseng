document.addEventListener("DOMContentLoaded", () => {
    let table = document.getElementById("table")
    const User_inp1 = document.getElementById("User_inp1")
    const User_inp2 = document.getElementById("User_inp2")

    let id = 0

    document.getElementById("btn-Result").addEventListener("click", async (e) => {
        e.preventDefault()
    try{       

        let User_value1 = User_inp1.value
        let User_value2 = User_inp2.value
        
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
        if(!User_value1.trim() || !User_value2.trim()){
            alert("data tidak boleh kosong")
        }else{
        const data = await response.json()
        let tr = document.createElement("tr")
        tr.className = "headersTable"
        tr.dataset.id = data.id
        tr.innerHTML = `
            <td class="id">${data.id}</td>
            <td>${data.username}</td>
            <td>${data.pekerjaan}</td>
            <td><button class="DelBtn">Delete</button></td>
        `
        console.log(tr.dataset.id);
        
        table.appendChild(tr)
        User_inp1.value = ""
        User_inp2.value = ""

        const deleteBtn = tr.querySelector(".DelBtn")
        deleteBtn.addEventListener("click", async () => {
            const databaseId = tr.dataset.id
            const response = await fetch("/forms/delete",{
                method: "DELETE",
                headers: {
                    "Content-Type" :"application/json"
                },
                body: JSON.stringify({
                    id: databaseId
                })
            })
        await response.json()
        tr.remove()
    })
        }
    } catch(e){
        console.error(error);
    }
    })

    document.getElementById("DisplayBtn").addEventListener("click", async () => {
        const ul = document.getElementById("displayData")
        try{
        const response = await fetch("/displays/data", {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                id,
                username,
                pekerjaan
            })
            
        })
            console.log(body.id);
        response.json()
        }catch(err){
        console.log("gagal menampilkan data");
    }
    })
})

