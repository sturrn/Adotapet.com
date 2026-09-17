class Usuario {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }
}

class Animal {
    constructor(id, nomeAnimal, especie, raca, sexo, idade, porte, cor, cidade, regiao) {
        this.id = id;
        this.nomeAnimal = nomeAnimal;
        this.especie = especie;
        this.raca = raca;
        this.sexo = sexo;
        this.idade = idade;
        this.porte = porte;
        this.cor = cor;
        this.cidade = cidade;
        this.regiao = regiao;
        this.status = "false";
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

    adicionar(nomeAnimal, especie, raca, sexo, idade, porte, cor, cidade, regiao) {
        const animal = new Animal(this.IdSucessor, nomeAnimal, especie, raca, sexo, idade, porte, cor, cidade, regiao);
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
        this.status = false;
    }

    mudarStatus(id) {
        if (this.status) {
            return "adotado"
        }
        else {
            return "Nao adotado"
        }
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
                <p>Região: ${animal.regiao}</p>
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
        const regiao = document.getElementById("regiao").value;


        gerenciador.adicionar(nomeAnimal, especie, raca, sexo, idade, porte, cor, cidade, regiao);
        window.location.href = "index.html";
    });
}


const botao = document.getElementById("modoEscuro");
 
botao.addEventListener("click", function() {
    document.body.classList.toggle("modo-escuro");
 
    if (document.body.classList.contains("modo-escuro")) {
        botao.innerHTML = "☀️ Modo claro";
    } else {
        botao.innerHTML = "🌙 Modo escuro";
    }
});



gerenciador.exibir();