document.addEventListener("DOMContentLoaded", function() {
    const adicionarTarefaBtn = document.getElementById("adicionar-tarefa");
    const novaTarefaInput = document.getElementById("nova-tarefa");
    const listaTarefas = document.getElementById("lista-tarefas");
    const areaNotas = document.getElementById("area-notas");
    const salvarNotasBtn = document.getElementById("salvar-notas");

    // Carregar tarefas salvas
    carregarTarefas();

    // Carregar notas salvas
    carregarNotas();

    adicionarTarefaBtn.addEventListener("click", function() {
        const tarefaTexto = novaTarefaInput.value.trim();
        if (tarefaTexto) {
            adicionarTarefa(tarefaTexto);
            novaTarefaInput.value = "";
            novaTarefaInput.focus();
            salvarTarefas();
        }
    });

    listaTarefas.addEventListener("click", function(event) {
        if (event.target.classList.contains("excluir-tarefa")) {
            excluirTarefa(event.target.parentElement);
            salvarTarefas();
        } else if (event.target.classList.contains("editar-tarefa")) {
            editarTarefa(event.target.parentElement);
            salvarTarefas();
        } else if (event.target.classList.contains("concluir-tarefa")) {
            concluirTarefa(event.target.parentElement);
            salvarTarefas();
        }
    });

    salvarNotasBtn.addEventListener("click", function() {
        const notasTexto = areaNotas.value.trim();
        localStorage.setItem("notas", notasTexto);
        alert("Notas salvas com sucesso!");
    });

    function adicionarTarefa(texto) {
        const novaTarefa = document.createElement("li");
        novaTarefa.className = "list-group-item d-flex justify-content-between align-items-center";
        
        const tarefaTexto = document.createElement("span");
        tarefaTexto.className = "tarefa-texto";
        tarefaTexto.textContent = texto;
        novaTarefa.appendChild(tarefaTexto);
        
        const btnConcluir = document.createElement("button");
        btnConcluir.className = "btn btn-success btn-sm concluir-tarefa";
        btnConcluir.textContent = "Concluir";
        novaTarefa.appendChild(btnConcluir);

        const btnEditar = document.createElement("button");
        btnEditar.className = "btn btn-warning btn-sm editar-tarefa";
        btnEditar.textContent = "Editar";
        novaTarefa.appendChild(btnEditar);

        const btnExcluir = document.createElement("button");
        btnExcluir.className = "btn btn-danger btn-sm excluir-tarefa";
        btnExcluir.textContent = "Excluir";
        novaTarefa.appendChild(btnExcluir);

        listaTarefas.appendChild(novaTarefa);
    }

    function excluirTarefa(tarefa) {
        listaTarefas.removeChild(tarefa);
    }

    function editarTarefa(tarefa) {
        const tarefaTexto = tarefa.querySelector(".tarefa-texto");
        const novoTexto = prompt("Editar tarefa:", tarefaTexto.textContent);
        if (novoTexto) {
            tarefaTexto.textContent = novoTexto.trim();
        }
    }

    function concluirTarefa(tarefa) {
        const tarefaTexto = tarefa.querySelector(".tarefa-texto");
        if (tarefaTexto.style.textDecoration === "line-through") {
            tarefaTexto.style.textDecoration = "";
        } else {
            tarefaTexto.style.textDecoration = "line-through";
        }
    }

    function salvarTarefas() {
        const tarefas = [];
        listaTarefas.querySelectorAll("li").forEach(tarefa => {
            const texto = tarefa.querySelector(".tarefa-texto").textContent;
            const concluida = tarefa.querySelector(".tarefa-texto").style.textDecoration === "line-through";
            tarefas.push({ texto, concluida });
        });
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }

    function carregarTarefas() {
        const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
        tarefas.forEach(tarefa => {
            adicionarTarefa(tarefa.texto);
            if (tarefa.concluida) {
                listaTarefas.lastChild.querySelector(".tarefa-texto").style.textDecoration = "line-through";
            }
        });
    }

    function carregarNotas() {
        const notasTexto = localStorage.getItem("notas") || "";
        areaNotas.value = notasTexto;
    }
});
