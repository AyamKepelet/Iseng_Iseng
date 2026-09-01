document.addEventListener("DOMContentLoaded", () => {
    const resultENV = document.getElementById("result")
    const User_inp1 = document.getElementById("User_inp1")
    const User_inp2 = document.getElementById("User_inp2")
    

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
        const users = await response.json()
        let li = document.createElement("li")
        const p1 = document.createElement("p")
        p1.textContent = users.name
        const p2 = document.createElement("p")
        p2.textContent = users.pekerjaan
        resultENV.append(li)
        li.appendChild(p1)
        li.appendChild(p2)
    } catch(e){
        console.error(error);
    }
    })
})

