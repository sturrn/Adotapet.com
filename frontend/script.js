class Usuario {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }
}

class Animal {
    constructor(id, nomeAnimal, especie, raca, sexo, idade, porte, cor, cidade, estado) {
        this.id = id;
        this.nomeAnimal = nomeAnimal;
        this.especie = especie;
        this.raca = raca;
        this.sexo = sexo;
        this.idade = idade;
        this.porte = porte;
        this.cor = cor;
        this.cidade = cidade;
        this.estado = estado;
        this.status = false;
    }
}

class GerenciadorAnimal {
    constructor() {
        this.lista = JSON.parse(localStorage.getItem("animais")) || [];
        this.IdSucessor = this.lista.reduce(
            (maiorId, animal) => Math.max(maiorId, animal.id),
            0
        ) + 1;
    }

    salvar() {
        localStorage.setItem("animais", JSON.stringify(this.lista));
    }

    adicionar(nomeAnimal, especie, raca, sexo, idade, porte, cor, cidade, estado) {
        const animal = new Animal(this.IdSucessor, nomeAnimal, especie, raca, sexo, idade, porte, cor, cidade, estado);
        this.lista.push(animal);
        this.IdSucessor++;
        this.salvar();
        this.exibir();

    }

    remover(id) {
        this.lista = this.lista.filter(
            animal => animal.id !== id
        )
        this.salvar();
        this.exibir();
    }

    alternarStatus(id) {
        const animal = this.lista.find(item => item.id === id);
        if (animal) {
            animal.status = !animal.status;
            this.salvar();
            this.exibir();
        }
    }

    mudarStatus(id) {
        const animal = this.lista.find(item => item.id === id);
        if (!animal) {
            return "Nao adotado";
        }
        return animal.status ? "adotado" : "Nao adotado";
    }

    exibir() {
        if (!listaAnimais) {
            return;
        }

        listaAnimais.innerHTML = ``;
        if (this.lista.length === 0) {
            listaAnimais.innerHTML = "Nenhum animal cadastrado para adoção..."
        } else {
            const listadalista = document.createElement("ul");
            listadalista.classList.add("listadalista");
            this.lista.forEach(animal => {
                const cardAnimal = document.createElement("li");
                cardAnimal.innerHTML = `
                <div class="carD">
                <h1>Nome do animal: ${animal.nomeAnimal}</h1>
                <p>Especie: ${animal.especie}</p>
                <p>Raça: ${animal.raca}</p>
                <p>Sexo: ${animal.sexo}</p>
                <p>Idade: ${animal.idade}</p>
                <p>Porte: ${animal.porte}</p>
                <p>Cor: ${animal.cor}</p>
                <p>Cidade: ${animal.cidade}</p>
                <p>Estado: ${animal.estado}</p>
                <p>Status: ${this.mudarStatus(animal.id)}</p>
                <button class="buttonCard" data-id="${animal.id}" data-acao="remover">Remover</button>
                <button class="buttonCard" data-id="${animal.id}" data-acao="status">${animal.status ? "Adotado" : "Adotar"}</button>
                </div>
            `
                listadalista.appendChild(cardAnimal);
            });
            listaAnimais.appendChild(listadalista);
        }
    }
}


const listaAnimais = document.getElementById("listaAnimais");
const formPessoa = document.getElementById("formPessoa");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const botaoPessoa = document.getElementById("botaoPessoa");
const formulario = document.getElementById("formulario");
const pesquisa = document.getElementById("pesquisa");
const lupa = document.getElementById("lupa");

const gerenciador = new GerenciadorAnimal();
if (formulario) {

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();
        const nomeAnimal = document.getElementById("nomeAnimal").value;
        const especie = document.getElementById("especie").value;
        const raca = document.getElementById("raca").value;
        const sexo = document.getElementById("sexo").value;
        const idade = document.getElementById("idade").value;
        const porte = document.getElementById("porte").value;
        const cor = document.getElementById("cor").value;
        const cidade = document.getElementById("cidade").value;
        const estado = document.getElementById("estado").value;


        gerenciador.adicionar(nomeAnimal, especie, raca, sexo, idade, porte, cor, cidade, estado);
        window.location.href = "animais.html";
    });
}


const modo = document.getElementById("modoEscuro");

modo.addEventListener("click", () => {
    document.body.classList.toggle("claro");

    if (document.body.classList.contains("claro")) {
        modo.textContent = " Modo escuro";
    } else {
        modo.textContent = "Modo claro";
    }

});

if (listaAnimais) {
    listaAnimais.addEventListener("click", function (e) {
        const botaoAnimal = e.target.closest("button");
        if (!botaoAnimal) {
            return;
        }

        const id = Number(botaoAnimal.dataset.id);
        const acao = botaoAnimal.dataset.acao;

        if (acao === "remover") {
            gerenciador.remover(id);
        }

        if (acao === "status") {
            gerenciador.alternarStatus(id);
        }
    });
}

function pesquisar() {
  if (!pesquisa || !listaAnimais) 
    return;
 
  const termo = pesquisa.value.trim().toLowerCase();
  const cards = document.querySelectorAll("#listaAnimais .listadalista li");
 
  gerenciador.lista.forEach((animal, i) => {
    const texto = `${animal.nomeAnimal} ${animal.estado} ${animal.especie}`.toLowerCase();
    cards[i].hidden = !texto.includes(termo);
  });
}
 
pesquisa.addEventListener("input", pesquisar);

gerenciador.exibir();
