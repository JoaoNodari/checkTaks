const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')

// Criando Arra para guardar as tarefas
let minhaListaDeItens = [] 

// Função que adiciona a tarefa no array
function adicionarNovaTarefa() { 
    if (input.value.trim() !== '') {
        minhaListaDeItens.push({
            tarefa: input.value,
            concluido: false
        })
        input.value = '' // Limpa o input após pegar o que o usuário escreveu
        mostrarTarefas()
    } else {
        alert('Por favor, insira uma tarefa.')
    }
}

function mostrarTarefas() {

    let novaLi = '' // Cria uma variável vazia

    minhaListaDeItens.forEach((item, posicao) => { // Aqui ele percorre todos os items(tarefas) no array minhaListaDeItens e adiciona na variável novaLi
        novaLi +=  
        `
        <li class="task ${item.concluido && "done"}">
            <i class="fa-solid fa-check" onclick="concluirTarefa(${posicao})"></i>
            <p>${item.tarefa}</p>
            <i class="fa-solid fa-trash" class="deletar-item" onclick="deletarItem(${posicao})"></i>
        </li>
        `
    })

    listaCompleta.innerHTML = novaLi // Aqui la na div list-tasks ele adiciona as li

    localStorage.setItem('listaDeTarefas', JSON.stringify(minhaListaDeItens))
    // listaDeTarefas: É o nome que temos que dar
    // JSON.stringify(minhaListaDeItens): O localStorage só aceita string, então transformamos o array que tem objeto em string com o JSON.
}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1) // Aqui ele pega a lista, e com o splice ele deleta determinada posição que eu pedi.
    mostrarTarefas() // Aqui eu chamo a função novamente para que a li excluida não fique aparecendo na tela.
}

function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluido = !minhaListaDeItens[posicao].concluido
    mostrarTarefas()
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('listaDeTarefas')
    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage) // Transforma novamente para objeto
    }
    mostrarTarefas()
}

recarregarTarefas()
button.addEventListener('click', () => {
    adicionarNovaTarefa()
})
