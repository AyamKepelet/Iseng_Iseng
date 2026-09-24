document.addEventListener("DOMContentLoaded", () => {
    const User_inp1 = document.getElementById("User_inp1")
    const User_inp2 = document.getElementById("User_inp2")
    let TableData = document.getElementById("TableData")

    document.getElementById("btn-Result").addEventListener("click", async (e) => {
        e.preventDefault()
    try{       

        let UsernameInp = User_inp1.value
        let PekerjaanInp = User_inp2.value
        

        if(UsernameInp == "" || PekerjaanInp == ""){
            alert("data tidak boleh kosong")
        }else{
        const response = await fetch("/forms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                username: UsernameInp,
                pekerjaan: PekerjaanInp
            })
        })

        const data = await response.json()
        let tr = document.createElement("tr")
        tr.className = "headersTable"
        tr.dataset.id = data.id
        let id =  document.createElement("td")
        id.innerHTML = `<span class="id">${tr.dataset.id}</span>`
        let tdUsername =  document.createElement("td")
        tdUsername.innerHTML = `<span class="dataUser">${data.username}</span>`
        let tdPekerjaan =  document.createElement("td")
        tdPekerjaan.innerHTML = `<span class="dataPkr">${data.pekerjaan}</span>`
        let changeBtn =  document.createElement("td")
        changeBtn.innerHTML = `<button class="ChangeBtn">Ubah</button>`
        let delBtn =  document.createElement("td")
        delBtn.innerHTML = `<button class="DelBtn">Delete</button>`
        tr.append(id,tdUsername,tdPekerjaan,changeBtn,delBtn)
        console.log(tr.dataset.id);
        TableData.appendChild(tr)
        User_inp1.value = ""
        User_inp2.value = ""

const modifyBtn = tr.querySelector(".ChangeBtn")
modifyBtn.addEventListener("click", async () => {

            const Username = tr.querySelector(".dataUser")
            const Pekerjaan = tr.querySelector(".dataPkr")

            if(modifyBtn.textContent !== "Accept"){
            Username.innerHTML = `<input class = "modifUser" value="${UsernameInp}">`
            Pekerjaan.innerHTML = `<input class = "modifPkr" value="${PekerjaanInp}">`
            modifyBtn.textContent = "Accept"
            return
            }


            const UsernameValue = Username.querySelector(".modifUser")
            const PekerjaanValue = Pekerjaan.querySelector(".modifPkr")
            
            const UpdateUsername = UsernameValue.value.trim()
            const UpdatePekerjaan = PekerjaanValue.value.trim()


            if(!UpdateUsername || !UpdatePekerjaan){
                alert("Masukkan data yang ingin diubah")
                return
            }
            console.log("line kirim");
            try{
                
            if(modifyBtn.innerHTML !== "Ubah"){
            Username.innerHTML = UpdateUsername
            Pekerjaan.innerHTML = UpdatePekerjaan
            modifyBtn.textContent = "Ubah"
            return
            }
            const responses = await fetch("/changes", {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
            username: UpdateUsername,
            pekerjaan: UpdatePekerjaan
                    })
                })
            if(!responses.ok){
                console.log("gagal menyimpan", responses.status);
                return
            }
            await responses.json()

            }catch(error){
                console.error("ada masalah", error);
            }
})

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
        console.error(e);
    }
    })
})

