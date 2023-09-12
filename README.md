# Projeto Carinho!

<p align="center">
  <img src="#>
</p>

Este repositório contém um projeto de carrossel de imagens para que os alunos do 2º ano do ensino médio com habilitação profissional de **TÉCNICO EM INFORMÁTICA PARA INTERNET** possam desenvolver a lógica da troca das imagens em **JavaScript puro**.


## O carrinho está sendo controlado usando o seguinte código JavaScript:

**Define o Array produtos, contendo dois objetos(um para cada item)**
  const produtos = [
      {
          id: '1',
          nome: 'Interfaces Web II',
          prof: 'Prof Kelly',
          preco_de: 80,
          preco_por: 50,
          descricao: 'O melhor curso de Java Script',
          img: './assets/1.png'
      },

      {
          id: '2',
          nome: 'Gestão de Conteúdo Web II',
          prof: 'Prof Kelly',
          preco_de: 80,
          preco_por: 50,
          descricao: 'O melhor curso de Java Script',
          img: './assets/3.png'
      }
  ];

**Função *renderizaProduto()* usada para selecionar e adicionar os produtos criados na função *criaProduto()* ao html da página**
  function renderizaProdutos(){
      let html = '';
      for(let i = 0; i < produtos.length; i++){
          html = html + criaProduto(produtos[i], i);
      }
      return html;
  }

**Função *criaProduto()* retorna o valor HTML que será introduzido mais tarde na página, com as informações dos items vendidos**
  function criaProduto(produtos, index){
    return `
        <div class="curso">
    <img class="inicio" title="t" src="${produtos.img}">
    <div class="curso-info">
        <h4>${produtos.nome}</h4>
        <p>${produtos.prof}</p>
        <p>${produtos.descricao}</p>
    </div>
    <div class="curso-preco">
        <span class="preco-de">R$${produtos.preco_de}</span>
        <span class="preco-por">R$${produtos.preco_por}</span>
        <button class="btncar btn-add" data-index="${index}"></button>
    </div>
    </div>
    `;
}

**Seleciona o container e integra os items na página através das funções pré-definindas, e do innerHTML**
  const container = document.querySelector('#container');
  container.innerHTML = renderizaProdutos();

**Define a constante carrinhoItems como objeto**
  const carrinhoItens = {};

**Função *renderizaCarrinho*, para cada id no objeto carrinhoItens, adiciona os items ao carrinho através do innerHTML e da função *criaItemCarrinho()***
  function renderizaCarrinho(){
      let html = '';
      for (let produtoId in carrinhoItens) {
          html = html + criaItemCarrinho(carrinhoItens[produtoId]);
      }
      document.querySelector('.carrinho_itens').innerHTML = html;
  };

**Função *criaItemCarrinho()* retorna o valor HTML que será introduzido mais tarde na página, adicionando os items ao carrinho ao lado**
  function criaItemCarrinho(produto){
      return `
      <div class = "carrinho_compra">
          <h4>${produto.nome}</h4>
          <p>Preço Unidade: ${produto.preco_por}| Quantidade:${produto.quantidade}</p>
          <p>Valor: R$:${produto.preco_por*produto.quantidade}</p>
          <button data-produto-id="${produto.id}" class="btn-remove"></button>
      </div>
      `;
  }

**Função *criaCarrinhoTotal()* define e soma o valor total da compra a partir do valore quantidade dos produtos, e retorna o valor HTML que será introduzido no fim do carrinho, com os valores finais da compra**

  function criaCarrinhoTotal(){
    let total = 0;
    for(let produtoId in carrinhoItens){
        total = total + carrinhoItens[produtoId].preco_por * carrinhoItens[produtoId].quantidade;
    }

    document.querySelector('.carrinho_total').innerHTML = `
    <h4>Total: <strong>R$${total}</strong></h4>
    <a href="#" target="_blank">
        <ion-icon name="card-outline"></ion-icon>
        <strong>Comprar Agora</strong>
    </a>
    `
}

**Função *adicionaItemNoCarrinho()* verifica se o valor já existe no carrinho, se não, adiciona o item no carrinho e inicia a quantidade em 0. Então adiciona +1 a quantidade do produto e executa as funções *renderizaCarrinho()* e *criaCarrinhoTotal()***

  function adicionaItemNoCarrinho(produto){
    if(!carrinhoItens[produto.id]){
        carrinhoItens[produto.id] = produto;
        carrinhoItens[produto.id].quantidade = 0;
    }++carrinhoItens[produto.id].quantidade;
    renderizaCarrinho();
    criaCarrinhoTotal();
}

**Adiciona um ouvinte ao evento click nos elementos do body e inicializa a função anonima que vai:** 

**1º Verificar se o botão possui a classe *btn-add*, obtém o valor do atributo *data-index* desse botão, pelo parseInt, define o produto e o adiciona ao carrinho usando a função *adicionaItemNoCarrinho()***
  document.body.addEventListener('click', function (event) {
    const elemento = event.target;
    if (elemento.classList.contains('btn-add')) {
        const index = parseInt(elemento.getAttribute('data-index'), 10);
        const produto = produtos[index];
        adicionaItemNoCarrinho(produto);
        };
    
**2º Verificar se o botão possui a classe *btn-remove*, obtém o valor do atributo *data-produto-id* e se existe apenas um item no carrinho, ele seja removido do carrinho, já se houver mais de um, seja removido -1 de sua quantidade**
    if (elemento.classList.contains('btn-remove')){   
        const produtoId = elemento.getAttribute('data-produto-id');
        if (carrinhoItens[produtoId].quantidade <= 1) {
            delete carrinhoItens[produtoId];
        }   else {
            --carrinhoItens[produtoId].quantidade;
        } 

**3º Chama as funções *renderizaCarrinho()* e *criaCarrinhoTotal()***
    renderizaCarrinho();
    criaCarrinhoTotal();
}
});