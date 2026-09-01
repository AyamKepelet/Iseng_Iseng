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
        if(User_value1 === "" && User_value2 === ""){
            alert("data tidak boleh kosong")
        }else{
            
        const users = await response.json()
        let li = document.createElement("li")
        const p1 = document.createElement("p")
        p1.textContent = User_value1
        const p2 = document.createElement("p")
        p2.textContent = User_value2
        resultENV.append(li)
        li.appendChild(p1)
        li.appendChild(p2)

        User_inp1.value = ""
        User_inp2.value = ""
        }
    } catch(e){
        console.error(error);
    }
    })
})

