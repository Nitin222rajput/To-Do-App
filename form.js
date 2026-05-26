let form = document.querySelector("form")

let dateInput = document.querySelector("#dates");
let categoryInput = document.querySelector("#Category")
let workInput = document.querySelector("#work")
let timeInput = document.querySelector("#times")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let date = dateInput.value;
    let category = categoryInput.value;
    let work = workInput.value;
    let time = timeInput.value;

    if (!date || !category || !work || !time) {
        alert("please fill all the fields")
        return;
    }

    let id = Number(JSON.parse(localStorage.getItem("editId")));
    let allcards = JSON.parse(localStorage.getItem("workTask")) || [];

    if(id){
        allcards= allcards.map((card)=>{
            if(card.id===id){
                return{...card,date,category,work,time}
            }
            return card;
        })
    }else{
        allcards.push( {
        id: Date.now(),
        date,
        category,
        work,
        time
    })
    }

    
    localStorage.setItem("workTask", JSON.stringify(allcards));
    localStorage.removeItem("editId")
    form.reset();
    window.location.href = "index.html";
})

// function saveCard(data) {
//     let oldData = JSON.parse(localStorage.getItem("workTask")) || [];
//     oldData.push(data);
//     localStorage.setItem("workTask", JSON.stringify(oldData));
// }

function editCard() {
    let id = JSON.parse(localStorage.getItem("editId"));
    if(!id)return;
    let allcards = JSON.parse(localStorage.getItem("workTask")) || [];

    let updateCard = allcards.find((card) => {
        return card.id === id;
    })
    if (updateCard) {
        dateInput.value = updateCard.date;
        categoryInput.value = updateCard.category;
        workInput.value = updateCard.work;
        timeInput.value = updateCard.time;
    }
}

editCard();