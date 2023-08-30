const main = document.getElementById('main');
const details = document.getElementById('details')
const modalBox = document.getElementById('modal')
const dataLoad = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/ai/tools')
  const data = await res.json();
  const tools = data.data.tools;
  cardRender(tools)
  
}
dataLoad()

function cardRender(tools) {
  tools.forEach(tool => {
    const div = document.createElement('div')
    div.innerHTML = `
  <div class="border p-4 rounded-md">
    <div class="rounded-md w-full h-48 overflow-hidden bg-gradient-to-r from-slate-300 to-orange-300">
       <img class="" src="${tool.image}" alt="">
    </div>
      
      <h1 class="mt-4 font-semibold">Features</h1>
      <ul>
        <li>1.${tool.features[0]}</li>
        <li>2.${tool.features[1]}</li>
        <li>3.${tool.features[2]}</li>
      </ul>
      <hr class="my-4 border-gray-300 border-[1px]">
      <h1 class="font-bold">${tool.name}</h1>
      <div class="flex justify-between">
        <div class="flex items-center gap-2">
          <img src="./Frame.png" alt="">
          <h1 class="font-medium">${tool.published_in}</h1>
        </div>
        <button onclick="buttonFun(${tool.id})" class="btn btn-circle btn-outline">
        <i class="fa-solid w-full fa-arrow-right"></i>
        </button>
      </div>
      
    </div>
  `
    main.appendChild(div)
    // modalRender(tool)
  });
}


const buttonFun = async id =>{
   id = id.toString().padStart(2, 0)
 
  const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
  const data = await res.json();
  const tool = data.data
  console.log(tool);
  
    modalBox.innerHTML = `
    <dialog id="my_modal_3" class="modal ">
    <form method="dialog" class=" bg-white p-10 rounded-lg max-w-none w-2/3 relative flex justify-center gap-5">
    <button class="btn btn-circle btn-outline absolute right-[-20px] top-[-20px] bg-slate-200">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
</button>
      <div class="border rounded-lg bg-amber-50 border-orange-500 p-8 flex flex-col items-center justify-center gap-5">
        <h1 class="font-bold mb-2 m-0 w-2/3 text-center">${tool.description}</h1>
        <div class="flex gap-2 items-center text-center font-bold">
          <h1 class="p-4 border text-zinc-500">${tool.pricing[0]?.price} <br>${tool.pricing[0]?.plan}</h1>
          <h1 class="p-4 border text-red-700">${tool.pricing[1]?.price} <br>${tool.pricing[1]?.plan}</h1>
          <h1 class="p-4 border text-purple-500">${tool.pricing[2]?.price} <br>${tool.pricing[2]?.plan}</h1>
        </div>
        <div class="flex gap-4">
          <div>
            <h1 class="font-semibold">Features</h1>
            <ul>
              <li>${tool.features[1]?.feature_name}</li>
              <li>${tool.features[2]?.feature_name}</li>
              <li>${tool.features[3]?.feature_name}</li>
            </ul>
          </div>

          <div>
            <h1 class="font-semibold">Integretions</h1>
            <li>${tool.integrations[0]}</li>
            <li>${tool.integrations[1]}</li>
            <li>${tool.integrations[2]}</li>
          </div>
        </div>
      </div>
      <div class="w-[60%] rounded-lg text-center border p-6" >
        <img class="rounded-lg w-full" src="${tool.image_link[0]}" alt="">
        <h1 class=" mt-5">${tool.input_output_examples[0]?.input}</h1>
        <h1 class=" mb-5">${tool.input_output_examples[0]?.output}</h1>
      </div>
    </form>
  </dialog>
    `
    my_modal_3.showModal()
}