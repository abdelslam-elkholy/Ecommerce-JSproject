//////// Global Vriables //////////

// Main Div
const mainContent = document.querySelector("#mainContent");
const cartContent = document.querySelector("#cartContent");
const singleProduct = document.querySelector('.singleProduct')
let data = [];
let cartItems = [];
//Categories Buttons
const allBtn = document.querySelector(".btn-all");
const womenBtn = document.querySelector(".btn-women");
const menBtn = document.querySelector(".btn-men");
const accesBtn = document.querySelector(".btn-acces");
const elecBtn = document.querySelector(".btn-elec");
const searchInpt = document.querySelector(".searchInput");
// Search Button
const searchBtn = document.querySelector(".search-btn");
const dropdown = document.querySelector(".dropSearch");

/////////// Functionality ////////////

// To Append Data in on Item
let appenData = (p, cls, div) => {
  let proDiv = document.createElement("div");
  let desc = p.description;
  let title = p.title;
  let newTitle = title.slice(0, 25);
  let newDesc = desc.slice(0, 100);

    if(div==singleProduct)
    {
      proDiv.style.width = "25rem";
    }
    else{
      proDiv.style.width = "18rem";
    }
    


  
  proDiv.innerHTML = `  <img src="${
    p.image
  }" class=" border-0 p-2"  alt="" style="height:15rem!important"${p.title}">
        <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title">${p.title.length < 25 ? title : newTitle}</h5>
          <p class="card-text">${
            p.description.length < 100 ? desc : newDesc + "..."
          }</p>
          <div class=" text-center fw-bold link-danger mb-2">
           
            ${p.price} $ 
           </div>
           <div class="d-flex justify-content-between mt-auto ">
            <a href="./product.html" class="btn btn-danger" onclick="getIdOfProduct(${p.id})">View More</a>
            <button class="btn btn-primary" onclick="addToCart(${
              p.id
            })">Add to cart</button>
           </div>

        </div>`;

  proDiv.classList.add(cls);
  proDiv.classList.add("mb-5");
  proDiv.classList.add("shadow");
  proDiv.classList.add("border-0");
  // proDiv.style.
  
  div.appendChild(proDiv);

};

let getData = async () => {
  
    const response = await fetch("https://fakestoreapi.com/products")
     data = await response.json()

    console.log(data)


};

//To Get Data From API

const loadData = async(e) => {
  await getData();
  console.log(data);
  if (e == 0) {
    
    mainContent.innerHTML = "";
    data.map((el) => {
      appenData(el, "card", mainContent);
    });
  } else {
    console.log("im working from else");
    let filtered = data.filter((el) => el.category === e);
    console.log(filtered);
    mainContent.innerHTML = "";
    filtered.map((ele) => appenData(ele, "card", mainContent));
  }

  changCartNum();
};

// Serach Function
let searchFunc = () => {
  console.log("working in search");
  dropdown.innerHTML = "";

  let searchValue = document.querySelector(".searchInput").value;
  if (searchValue !== "") {
    let filtered = data.filter((el) =>
      el.title.toLowerCase().includes(`${searchValue.toLowerCase()}`)
    );
    filtered.map((el) => {
      //  let element = document.createElement('select')
      let element = document.createElement("li");
      //  element.innerHTML=''
      element.innerHTML = ` <button class="dropdown-item" type="button"  onclick="getIdOfProduct(${el.id})" >
         <a href="./product.html" style="text-decoration: none;color:black;font-weight: bold"> ${el.title.slice(0, 35)}</a>
         </button>`;
      // element.innerHTML=`<option value="${el.id}">${el.title}</option>`
      dropdown.appendChild(element);
    });
  }
};

// Active Btns
function addActive(btn) {
  allBtn.classList.remove("btn-danger");
  womenBtn.classList.remove("btn-danger");
  menBtn.classList.remove("btn-danger");
  accesBtn.classList.remove("btn-danger");
  elecBtn.classList.remove("btn-danger");
  allBtn.classList.add("btn-light");
  womenBtn.classList.add("btn-light");
  menBtn.classList.add("btn-light");
  accesBtn.classList.add("btn-light");
  elecBtn.classList.add("btn-light");

  btn.classList.add("btn-danger");
  btn.classList.remove("btn-light");
}


// adding to cart
let addToCart = (id) => {
  let check = JSON.parse(localStorage.getItem('cartItems'));
  if (!check)
  {
    
    cartItems.push(id);
  }
  else{
    cartItems = JSON.parse(localStorage.getItem('cartItems'))
    cartItems.push(id);
  }


  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  changCartNum();
};

let changCartNum = () => {
  let cartNum = document.querySelector(".cartNum");
  let products = JSON.parse(localStorage.getItem("cartItems"));
  cartNum.innerHTML = products? products.length:0
};

let displayCartProducts = async() => {
  await getData()
  changCartNum();
  let price = 0;
  document.querySelector('#price').innerHTML = price.toFixed(2)
  console.log(data);
  const products = JSON.parse(localStorage.getItem("cartItems"));
  console.log(products);
  const choosen = []
  cartContent.innerHTML = ''
  for(let i =0; i < products.length; i++)
  {
    let product = data.find(el => el.id == products[i])
     
      choosen.push(product)
      price += product.price
  }
  document.querySelector('#price').innerHTML = price.toFixed(2)
  console.log(choosen);
  choosen.map(el => {
    
    
    let product = document.createElement('div')
    product.innerHTML = 
    `
    <img src="${el.image}" class=" border-0 p-2"  alt="" style="height:10rem!important; max-width:15rem"${el.title} image">
          <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title">${el.title}</h5>
            <p class="card-text">${el.description}</p>
            <div class=" text-center fw-bold link-danger mb-2"> 
              ${el.price} $ 
             </div>
             <button class="btn btn-md btn-danger col-3" onclick="removeItem(${el.id})">Remove</button>
          </div>`;
  
    product.classList.add("col");
    product.classList.add("m-3");
    product.classList.add("p-3");
    product.classList.add("shadow");
    product.classList.add("border-0");
    product.classList.add("fs-6");
    // product.style.height = '20rem'
    cartContent.appendChild(product);
    
    
  })
};

let removeItem = (id)=>
{
  const products = JSON.parse(localStorage.getItem("cartItems"));
  let position = products.indexOf(id);
  products.splice(position, 1)
  localStorage.setItem("cartItems", JSON.stringify(products));
  console.log(products);
  displayCartProducts()

}

let removeAll=()=>
{

  localStorage.removeItem('cartItems')
  displayCartProducts()
}

let getIdOfProduct = (id)=>
{
   localStorage.setItem('productId', id)
  
}
let showSingleProduct = async()=>
{
  singleProduct.innerHTML=''
  let newId = localStorage.getItem('productId')
  console.log(`i'm working from single product`);
  await getData()
  let product = data.find(el => el.id == newId)
  appenData(product,"card",singleProduct)
}
// getData()

// Functions Calling
// window.onload = loadData(0);

allBtn.addEventListener("click", () => {
  loadData(0);
  addActive(allBtn);
});
womenBtn.addEventListener("click", () => {
  addActive(womenBtn);
  loadData("women's clothing");
});
menBtn.addEventListener("click", () => {
  addActive(menBtn);
  loadData("men's clothing");
});
accesBtn.addEventListener("click", () => {
  addActive(accesBtn);
  loadData("jewelery");
});
elecBtn.addEventListener("click", () => {
  addActive(elecBtn);
  loadData("electronics");
});

searchInpt.addEventListener("input", searchFunc);
