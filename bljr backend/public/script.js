document.addEventListener("DOMContentLoaded", () => {
    const resultENV = document.getElementById("result")
    const User_inp1 = document.getElementById("User_inp1")
    const User_inp2 = document.getElementById("User_inp2")
    

    document.getElementById("btn-Result").addEventListener("submit",(e) => {

        const User_value1 = User_inp1.values
        const User_value2 = User_inp2.values
        e.preventDefault()
        let li = document.createElement("li")
        const p1 = document.createElement("p")
        p1.textContent = User_value1
        const p2 = document.createElement("p")
        p2.textContent = User_value2
        resultENV.appendChild(li)
        li.appendChild(p1)
        li.appendChild(p2)
        alert("test")
    })
})

