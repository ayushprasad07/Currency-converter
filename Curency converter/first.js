let Base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const amount = document.querySelector(".amount input");
const btn = document.querySelector("button");

for (select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value= currCode;
        if (select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(eve)=>{
        updateFlag(eve.target);
    })
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    let amt= document.querySelector (".amount input");
    let amtVal = amt.value;
    let from = document.querySelector(".from select");
    let fvalue = from.value;
    let to = document.querySelector(".to select");
    let tvalue = to.value;
    getVal(fvalue , tvalue, amtVal);
})

async function getVal(fvalue,tvalue,amtVal){
    let url = `${Base_url}/${fvalue.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate= data[fvalue.toLowerCase()];  /// rate will store the value of data[key]
    let getCurrValue = rate[tvalue.toLowerCase()];
    let val = amtVal * getCurrValue;
    let msg= document.querySelector(".msg");
    msg.innerText = `${amtVal} ${fvalue} = ${val} ${tvalue}`;
}
