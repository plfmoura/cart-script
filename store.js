const produtos = [
  {
    id: 1,
    nome: "produto1",
    valor: 50.00,
    imagem: "https://cdn.pixabay.com/photo/2017/01/13/04/56/t-shirt-1976334_960_720.png"
  },
  {
    id: 2,
    nome: "produto2",
    valor: 50.00,
    imagem: "https://www.pngarts.com/files/5/Plain-Red-T-Shirt-PNG-Pic.png"
  },
  {
    id: 3,
    nome: "produto3",
    valor: 50.00,
    imagem: "https://www.pngarts.com/files/1/T-Shirt-PNG-Picture.png"
  },
  {
    id: 4,
    nome: "produto4",
    valor: 50.00,
    imagem: "https://www.pngarts.com/files/1/T-Shirt-PNG-Background-Image.png"
  },
  {
    id: 5,
    nome: "produto5",
    valor: 50.00,
    imagem: "https://www.pngarts.com/files/1/T-Shirt-PNG-Image.png"
  },
  {
    id: 6,
    nome: "produto6",
    valor: 50.00,
    imagem: "https://www.pngarts.com/files/1/T-Shirt-Transparent-Background-PNG.png"
  },
  {
    id: 7,
    nome: "produto7",
    valor: 50.00,
    imagem: "https://www.pngarts.com/files/1/T-Shirt-PNG-Transparent-Image.png"
  },
  {
    id: 8,
    nome: "produto8",
    valor: 50.00,
    imagem: "https://www.pngarts.com/files/1/T-Shirt-Transparent-Images.png"
  },
]

// pegar os produtos do array de objetos e criar os produtos dentro da loja
const pegarProdutos = produtos.map((response) => {
  const storeContainer = document.querySelector('.store-container')
  let newDiv = document.createElement("div");
  newDiv.classList.add("card");
  newDiv.innerHTML = `
    <img src=${response.imagem} alt=${response.nome} class="card-img"/>
    <h1>${response.nome}</h1>
    <p class="price">R$ ${response.valor}</p>
    <div>
        <button class="button card-button">Adicionar ao Carrinho</button>
    </div>
  `
  storeContainer.appendChild(newDiv)
})


// toques nos botões 
document.addEventListener("click", (e) => {
  if(e.target.matches(".btn-danger")){
    remover();
  }
  if(e.target.matches(".card-button")){
    adicionarCarrinho();
  }
  if(e.target.matches(".btn-purchase")){
    comprar();
  }
});

// função para atualizar o valor dos itens no carrinho de compras 
const atualizaQuantidade = (e) => {
  if(isNaN(e.target.value) || e.target.value >= 1) {
    atualizaTotal();
  } else {
    e.target.value = 1;
  }
};

// função para atualizar total do carrinho de compras 
const atualizaTotal = () => {
  let total = 0;
  const filaCarrinho = document.querySelectorAll(".cart-items .cart-row");
  for(let i = 0; i < filaCarrinho.length; i++) {
    const precoCarrinho = filaCarrinho[i].querySelector(".cart-price");
    let quantidade = filaCarrinho[i].querySelector(".cart-quantity-input").value;
    let valorItem = parseFloat(precoCarrinho.innerHTML.replace("R$ ", ""));
    total = total + valorItem * quantidade;
  }
  total = Math.round(total * 100) / 100;
  document.querySelector(".cart-total-price").innerHTML = `R$ ${total}`;
};

// função para criar elementos dentro do carrinho
const desenharElementos = (titulo, preco) => {
  let card_row = document.createElement("div");
  card_row.classList.add("cart-row");
  let item = `
    <div class="cart-item cart-column">
      <span class="cart-item-title">${titulo}</span>
    </div>
    <span class="cart-price cart-column">${preco}</span>
    <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1" min="1" max="20" />
      <button class="button btn-danger" type="button">remover</button>
    </div>
  `;
  card_row.innerHTML = item;
  let itemsCarrinho = document.querySelector(".cart-items");
  itemsCarrinho.appendChild(card_row);

  card_row
    .querySelector(".cart-quantity-input")
    .addEventListener("change", atualizaQuantidade);
};

//função para adicionar ao carrinho 
const adicionarCarrinho = () => {
  let elemento = event.target.parentElement.parentElement;
  let tituloElemento = elemento.querySelector("h1").innerText;
  let precoElemento = elemento.querySelector(".price").innerText;
  let nome = document.querySelectorAll(".cart-item-title");
  for (let i = 0; i < nome.length; i++) {
    if (nome[i].innerHTML === tituloElemento) {
      alert("O item já foi adicionado ao carrinho");
      return;
    }
  }
  desenharElementos(tituloElemento, precoElemento);
  atualizaTotal();
};

//Função para Remover item do carrinho
const remover= () => {
  event.target.parentElement.parentElement.remove();
  atualizaTotal();
}

//Função para finalizar compras
const comprar= () => {
  const items = document.querySelectorAll(".cart-items .cart-row ");
  if (items.length != 0) {
    for (let i = 0; i < items.length; i++) {
      items[i].remove();
    }
    atualizaTotal();
    alert("Recebemos seu pagamento!");
  } else {
    alert("Você ñao tem compras");
  }
}

// //ação de alterar valor ao aumentar os itens
// for (let i = 0; i < quantidade.length; i++) {
//   quantidade[i].addEventListener("change", atualizaQuantidade);
// }