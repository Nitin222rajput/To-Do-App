let cards = document.querySelector(".cards")
let selectDate = document.querySelector("#selectDate")
let dateInput = document.querySelector("#dateInput")
let categoryList = document.querySelector(".categoryList")


function renderCards(data){
    cards.innerHTML="";

    data.forEach((card)=>{
        createCard(card);
    })
}

function createCard(data){

    let div = document.createElement("div");
    div.classList.add("card");


    let category = document.createElement("p");
    category.textContent = `Category -: ${data.category}`;


    let work = document.createElement("p");
    work.textContent = `Work -: ${data.work}`;

    let date = document.createElement("p");
    date.textContent = `Date -: ${data.date}`;


    let time = document.createElement("p");
    time.textContent = `Time -: ${data.time}`;


    let editBtn = document.createElement("button");
    editBtn.classList.add("edit");
    editBtn.textContent = "Edit";
    editBtn.dataset.id = data.id;


    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.textContent = "Delete";
    deleteBtn.dataset.id = data.id;


    div.appendChild(category);
    div.appendChild(work);
    div.appendChild(date)
    div.appendChild(time);
    div.appendChild(editBtn);
    div.appendChild(deleteBtn);


    cards.appendChild(div);

}

cards.addEventListener("click",(e)=>{
    if(e.target.classList.contains("delete")){
        let id = Number(e.target.dataset.id);
        deleteCard(id);
    }
})

function deleteCard(id){
    let allcards=JSON.parse(localStorage.getItem("workTask"))||[];

    let updateCard = allcards.filter((card)=>{ 
        return card.id!==id;
    })
    localStorage.setItem("workTask",JSON.stringify(updateCard))
    renderCards(updateCard)
}

cards.addEventListener("click",(e)=>{
    if(e.target.classList.contains("edit")){
        let id = Number(e.target.dataset.id);
        localStorage.setItem("editId",JSON.stringify(id));
        window.location.href="form.html";
    }
})

selectDate.addEventListener("click",()=>{
    dateInput.showPicker();
})

dateInput.addEventListener("change",(e)=>{
    let allcards=JSON.parse(localStorage.getItem("workTask"))||[];
    let filteredCards = allcards.filter((card)=>{
        return card.date === dateInput.value;
    })
    if(filteredCards.length===0){
        return alert("No Cards Found !!")
    }
    renderCards(filteredCards);

    let dateOutput= document.querySelector(".dateOutput")

    let date= new Date(dateInput.value);

    let changedFormate = date.toLocaleDateString("en-IN",{
        day:"numeric",
        month:"long",
        year:"numeric"
    })

    dateOutput.textContent=changedFormate;
    
})

categoryList.addEventListener("click",(e)=>{
    if(e.target.tagName==="BUTTON"){

        let allButton = categoryList.querySelectorAll("button")

        allButton.forEach((button)=>{
            button.classList.remove("active")
        })

        e.target.classList.add("active")

        let clickedCategory = e.target.textContent;
        let allcards=JSON.parse(localStorage.getItem("workTask"))||[];
        let filteredCards = allcards.filter((card)=>{
            return card.category===clickedCategory;
        })
        if(filteredCards.length===0){
            return alert("No Card Found !!")
        }
        renderCards(filteredCards)
    }
})


let allcards=JSON.parse(localStorage.getItem("workTask"))||[];
renderCards(allcards)