const frm = document.querySelector("form");
const ul = document.querySelector(".listaDeTarefas");


function salvarStatus() {
    if (localStorage.getItem("status")) {
        const status = localStorage.getItem("status");
        localStorage.setItem("status", status + `;${"pendente"}`);
    } else {
        localStorage.setItem("status", "pendente");
    }
}

function exibirTarefa(tarefa) {
    // salvar o status da tarefa como pendente
    salvarStatus();

    //cria o elemento <li>
    const li = document.createElement("li");
    li.className = "pendente";
    
    //cria o elemento checkbox e img e suas configurações
    const input = document.createElement('input');
    input.type = "checkbox";
    
    const img = document.createElement("img");
    img.src = "image/excluir.png";
    img.alt = "lixeira";
    img.className = "excluir";
    
    //cria o texto
    const texto = document.createTextNode(tarefa);
    
    //criando o elemento span com a class lista
    const span = document.createElement("span");
    span.className = "lista";
    span.append(texto);
    
    
    //inserir o checkbox no li
    li.append(input, span, img);
    
    //inserindo o <li> no <ul>
    ul.append(li);
    
}

// verificação do checkbox para marca como concluido ou pendente 
// com efeito riscado ou disriscado.
ul.addEventListener("change", function(event) {
    if (event.target.type === "checkbox" && event.target.checked) {
        event.target.parentElement.className = "concluido";
    } else if (event.target.type === "checkbox") {
        event.target.parentElement.className = "pendente";
    }
})

function salvarTarefa(tarefa) {
    if (localStorage.getItem("tarefas")) {
        localStorage.setItem("tarefas", localStorage.getItem("tarefas") + `;${tarefa}`);
    } else {
        localStorage.setItem("tarefas", tarefa);
    }
}

window.addEventListener("load", () => {
    if (!localStorage.getItem("tarefas")) {
        return;
    }
    
    const tarefas = localStorage.getItem("tarefas").split(";");
    for (const e of tarefas) {
        exibirTarefa(e);
    }
})

frm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const tarefa = frm.inTarefa.value.trim();
    
    if (tarefa === "") {
        alert("Digite uma tarefa!")
        frm.reset();
        frm.inTarefa.focus();
        return;
    }
    
    exibirTarefa(tarefa);
    salvarTarefa(tarefa);
    
    // limpa o campo e mantem o foco
    frm.reset();
    frm.inTarefa.focus();
})