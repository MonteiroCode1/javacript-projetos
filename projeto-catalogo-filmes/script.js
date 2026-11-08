const formCadastro = document.querySelector("#cadastro");
const formPesquisa = document.querySelector("#pesquisa");
const listarFilmes = document.querySelector('#lista-filmes');

function criarCardsFilmes(titulo, genero, image) {
    // gerando um element divs
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    div2.className = "acoes";
    // gerando o elemento img e inserindo a image
    const img =  document.createElement("img");
    img.src = image;
    img.alt = `pôster do filme ${titulo}`;
    
    // gerando o elemento p
    const p = document.createElement("p");
    const textTitulo = document.createTextNode(titulo);
    p.appendChild(textTitulo);

    // gerandos os spans
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    span1.className = "genero";
    const textGenero = document.createTextNode(genero);
    span1.appendChild(textGenero);
    span2.className = "status";
    span2.appendChild(document.createTextNode("Não assistido"));

    // gerando os botoes da div2
    const button1 = document.createElement("button");
    const button2 = document.createElement("button");
    button1.className = "inAssistir";
    button2.className = "inExcluir";

    const textAssistir = document.createTextNode("já Assistiu?");
    const textExcluir = document.createTextNode("Excluir");

    button1.appendChild(textAssistir);
    button2.appendChild(textExcluir);

    // inserindo os valores
    div2.append(button1, button2);
    div1.append(img, p, span1, span2, div2);

    // inserindo no lista filmes

    listarFilmes.appendChild(div1);
}


formCadastro.addEventListener("submit", function(e) {
    e.preventDefault();

    const titulo = formCadastro.inTitulo.value;
    const genero = formCadastro.inGenero.value;
    const img = formCadastro.inImage.value;

    criarCardsFilmes(titulo, genero, img);

    formCadastro.reset();
    formCadastro.inTitulo.focus();
})