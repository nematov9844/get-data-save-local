const elCatogory = document.querySelector(".catagory");
const elProduct = document.querySelector(".product");
const elHero = document.querySelector(".hero")
const slides = document.querySelector(".swiper-wrapper")
const baseUrl = "https://data-lesson-13.vercel.app";

const swiper = new Swiper('.swiper', {
  loop: true, // Slayder loop bo'lsin
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
  },
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
  autoplay: {
      delay: 3000, // Har bir slaydni 3 soniyadan keyin almashtirish
      disableOnInteraction: false, // Foydalanuvchi o'zaro ta'sirida avtomatik o'chmasligi
  },
});




async function renderHero(data){
  try {
    const res = await fetch(`${baseUrl}/banners`);
    const data = await res.json();
    slides.innerHTML = data.map((item)=>{
return `
<div class="swiper-slide">
<div class="w-[80%] mx-auto  flex justify-between px-5">
    
    <div class="flex-1">
        <img src="${item.img}" class="w-full h-[80vh] " alt="">
    </div>
</div>
</div>

`
    });
  } catch (err) {
    console.log(err);
  }
  
  
  
  
}

renderHero()

async function getData() {
  try {
    const res = await fetch(`${baseUrl}/catalog`);
    const data = await res.json();
    render(data);
  } catch (err) {
    console.log(err);
  }
}
async function addDisplay(active) {
    if (active) {
      try {
        const res = await fetch(`${baseUrl}/${active}`);
        const data = await res.json();
        render(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await fetch(`${baseUrl}/phones`);
        const data = await res.json();
        renderDefoult(data,`${baseUrl}/phones`);
      } catch (error) {
        console.log(error);
      }
    }
  
  }
  


async function renderDefoult(data,path) {
  if (data) {
    elProduct.innerHTML = data
      .map((item) => {
        return `
        <div data-item="${path}/${item.id}"  class="flex flex-col">
      <img data-item="${path}/${item.id}"  src="${item.img}" alt="">
          <h1 data-item="${path}/${item.id}" >${item.title}</h1>
          <h1 data-item="${path}/${item.id}" >${item.rame}</h1>
          <h1 data-item="${path}/${item.id}" >${item.brand}</h1>
          <h1 data-item="${path}/${item.id}" >${item.price}</h1>
      </div>
        `;
      })
      .join("");
  }
}

async function render(data) {
  elCatogory.innerHTML = data.map((item) => {
    return `<div class=" grid grid-cols-1 gap-4 bg-gray-300 py-3 it  font-bold">
    <img src="${item.img}" class="min-h-full min-w-full" alt="">
    <div class="flex flex-col gap-4 items-start px-3  h-full">
    <h1>
    ${item.name}
    </h1>
    <h1>${item.text}</h1>
    <button data-path=${item.name} class="w-[120px] h-[35px] bg-blue-500 rounded-md outline-none text-white font-semibold+ " >Ko'proq</button>    

    </div>
    </div>`;
  }).join("");
}
addDisplay();
getData();

elCatogory.addEventListener("click" ,async function(e){
 const path = e.target.dataset.path
 if(path){
try {
    const res = await fetch(`${baseUrl}/${path}`)
const data = await res.json()
renderBtn(data, `${baseUrl}/${path}`)
} catch (error) {
    console.log(error);
}
 }
})
elProduct.addEventListener('click', async (e) => {
  const card = e.target.closest('[data-item]');
  if (card) {
    const dataId = card.dataset.item; 
    console.log("Clicked item ID:", dataId);
    try {
      const res = await fetch(`${dataId}`);
      if (!res.ok) {
        throw new Error(`Fetch failed with status: ${res.status}`);
      }
      const data = await res.json();
      saveLocal(data);
      console.log("Data saved to localStorage:", data);
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  }
});

function saveLocal(data) {
  let saveLocal = JSON.parse(localStorage.getItem("users")) || [];
  
  let saves = saveLocal.filter((item) => item.id !== data.id);

  saves.push(data);

  localStorage.setItem("users", JSON.stringify(saves));
}



function renderBtn (data , path){
    elProduct.innerHTML = data
    .map((item) => {
      return `
      <div data-item="${path}/${item.id}"  class="flex flex-col">
      <img data-item="${path}/${item.id}"  src="${item.img}" alt="">
          <h1 data-item="${path}/${item.id}" >${item.title}</h1>
          <h1 data-item="${path}/${item.id}" >${item.rame}</h1>
          <h1 data-item="${path}/${item.id}" >${item.brand}</h1>
          <h1 data-item="${path}/${item.id}" >${item.price}</h1>
      </div>
      `;
    })
    .join("");
}
