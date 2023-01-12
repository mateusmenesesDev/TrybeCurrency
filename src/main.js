const btn = document.querySelector('#search');
const currency = document.querySelector('#currency');
const currencyItem = document.querySelector('#template').firstElementChild;
const currencyBox = document.querySelector('.currency-box--items');
const currencyInfo = document.querySelector('#currency-box--info');
import Swal from 'sweetalert2'

{/* <span class="currency-item--name">BRL</span>
<span class="currency-item--value">3.210</span> */}


btn.addEventListener('click', (e)=>{
  e.preventDefault();
  if (currency.value === '') {
    Swal.fire(`Você precisa passar um valor`);
    return
  }
  currencyBox.innerHTML = ''
  currencyInfo.innerHTML = ''
  fetch(`https://api.exchangerate.host/latest?base=${currency.value}`)
  .then((response)=> response.json())
  .then((result) => {
    const base = result.base;
    if (base === currency.value.toUpperCase()) {
      currencyInfo.innerHTML = `Valores referentes a 1 ${currency.value}`
      Object.entries(result.rates).map((item)=>{
        const itemHTML = currencyItem.cloneNode(true);
        itemHTML.children[1].innerHTML = item[0];
        itemHTML.children[2].innerHTML = item[1].toFixed(3);
        currencyBox.appendChild(itemHTML);
      })
    } else {
      Swal.fire(`Algo deu errado :(
        Tem certeza que a moeda pesquisada existe?`);
    }
  }).catch((erro)=>{
    Swal.fire(`Algo deu errado na requisição`);
    console.log(erro);
  })
})