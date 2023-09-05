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

function renderizaProdutos(){
    let html = '';
    for(let i = 0; i < produtos.length; i++){
        html = html + criaProduto(produtos[i], i);
    }
    return html;
}

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

const container = document.querySelector('#container');
container.innerHTML = renderizaProdutos();

