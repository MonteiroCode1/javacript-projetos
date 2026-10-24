const frm = document.querySelector("form");
const ul = document.querySelector(".listaDeTarefas");
const aside = document.querySelector(".statusDasTarefas");
const resp = document.querySelector("#contador");

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


ul.addEventListener("click", function(event) {
    const listStatus = localStorage.getItem("status").split(";");
    const listTarefa = localStorage.getItem("tarefas").split(";");
    
    let chave;
    if (event.target.classList.contains("excluir")) {
        for (let i = 0; i < listTarefa.length; i++) {
            if (event.target.parentElement.innerText === listTarefa[i]) {
                chave = i;
                ul.removeChild(event.target.parentElement);
                break;
            }
        }
        
        listTarefa.splice(chave, 1);
        listStatus.splice(chave, 1);
        
        localStorage.setItem("tarefas", listTarefa.join(";"));
        localStorage.setItem("status", listStatus.join(";"));
    }
    
})





// verificação do checkbox para marca como concluido ou pendente 
// com efeito riscado ou disriscado.
ul.addEventListener("change", function(event) {  
    if (event.target.type === "checkbox" && event.target.checked) {
        event.target.parentElement.className = "concluido";
    } else if (event.target.type === "checkbox") {
        event.target.parentElement.className = "pendente";
    }
    
    
    const inputs = ul.querySelectorAll("input[type='checkbox']");
    const status = localStorage.getItem("status").split(";");
    
    inputs.forEach(function(item, index) {
        if (item.checked) {
            status[index] = item.parentElement.className;
        } else {
            status[index] = item.parentElement.className;
        }
    })

    localStorage.setItem("status", status.join(";"));
})

//altera o local de status quando alguma tarefa é concluido

function salvarTarefa(tarefa) {
    
    if (localStorage.getItem("tarefas")) {
        localStorage.setItem("tarefas", localStorage.getItem("tarefas") + `;${tarefa}`);
    } else {
        localStorage.setItem("tarefas", tarefa);
    }
}

function exibirStatus() {
    const li = ul.querySelectorAll("li");
    const status = localStorage.getItem("status").split(";");
    
    li.forEach(function(item, index) {
        const check = item.querySelector("input[type='checkbox']");
        if (status[index] === "concluido") {
            check.checked = true;
        }
        item.className = status[index];
    })
}

window.addEventListener("load", () => {
    if (!localStorage.getItem("tarefas")) {
        return;
    }
    
    const tarefas = localStorage.getItem("tarefas").split(";");
    for (const e of tarefas) {
        exibirTarefa(e);
    }
    
    exibirStatus();
})

//usando delegação de eventos
aside.addEventListener("click", function(event) {
    // verificação de qual ID foi clicado
    switch(event.target.id) {
        case "inTodos":
          const totalTarefas = localStorage.getItem("tarefas").split(";").length;
          resp.innerText = totalTarefas;
          resp.style.color = "white";
          break;

        case "inPendentes":
            const pendente = localStorage.getItem("status").split(";");
            const totalPendente = pendente.filter(elemento => elemento === "pendente");
            resp.innerText = totalPendente.length;
            resp.style.color = "orange";
            break;

        case "inConcluidas":
            const concluido = localStorage.getItem("status").split(";");
            const totalConcluido = concluido.filter(elemento => elemento === "concluido");
            resp.innerText = totalConcluido.length;
            resp.style.color = "#2F82F4";
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
    
    let aux = 0;
    if (localStorage.getItem("tarefas")) {
        const listTarefa = localStorage.getItem("tarefas").split(";");
        
        
        for (const e of listTarefa) {
            if (tarefa.toLowerCase() === e.toLowerCase()) {
                aux += 1;
            }
        }
    }
    
    if (aux > 0) {
        alert("você já cadastrou essa tarefa!");
        frm.reset();
        frm.inTarefa.focus();
        return;
    }
    
    exibirTarefa(tarefa);
    salvarTarefa(tarefa);
    salvarStatus();
    
    // limpa o campo e mantem o foco
    frm.reset();
    frm.inTarefa.focus();
})
