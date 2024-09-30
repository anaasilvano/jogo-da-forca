let palavraAtual; // Fixed variable name from 'palavrantual' to 'palavraAtual'
let dicaAtual; // Fixed variable name from 'dicaAtual' to 'dicaAtual'
let letrasAdivinhadas = [];
const tentativasMaximas = 6;
let tentativasRestantes;

// Função para iniciar o jogo
function iniciarJogo() { // Fixed function name from 'iniciarlogo' to 'iniciarJogo'
    // Escolher um índice aleatório
    const indiceAleatorio = Math.floor(Math.random() * palavras.length);
    palavraAtual = palavras[indiceAleatorio]; // Fixed variable name
    dicaAtual = dicas[indiceAleatorio];
    letrasAdivinhadas = [];
    tentativasRestantes = tentativasMaximas;
    atualizarDisplayDoJogo();
    limparBoneco()
}

function verificarTecla(event) {
    if (event.key === "Enter") {
        adivinharLetra();
    }
}

// Adiciona o evento de escuta para o campo de entrada
document.getElementById("guess").addEventListener("keydown", verificarTecla);

function limparBoneco(){
    const forca = document.getElementById("forca");
    forca.innerHTML = "";
}


// Função para atualizar a exibição do jogo
function atualizarDisplayDoJogo() {
    let palavraExibida = "";
    for (let i = 0; i < palavraAtual.length; i++) {
        const letra = palavraAtual[i]; // Fixed variable name
        if (letrasAdivinhadas.indexOf(letra) !== -1 || letra === "") {
            palavraExibida += letra;
        } else {
            palavraExibida += "_";
        }
    }

    document.getElementById("palavra").textContent = palavraExibida;
    document.getElementById("dica").textContent = `Dica: ${dicaAtual}`; // Fixed string interpolation
    document.getElementById("status").textContent = `Tentativas restantes: ${tentativasRestantes}`; // Fixed string interpolation
    document.getElementById("attempts").textContent = `Letras já tentadas: ${letrasAdivinhadas.join(", ")}`; // Fixed string interpolation
}

// Atualiza a função adivinharLetra para chamar desenharBoneco
function adivinharLetra() {
    const entradaAdivinhacao = document.getElementById("guess");
    const letraAdivinhada = entradaAdivinhacao.value.toLowerCase();
    if (
        letraAdivinhada.length === 1 &&
        /^[a-záéíóúãõç]+$/.test(letraAdivinhada) // Fixed regex pattern
    ) {
        if (letrasAdivinhadas.indexOf(letraAdivinhada) === -1) {
            letrasAdivinhadas.push(letraAdivinhada);

            let letraNaoEncontrada = true;
            for (let i = 0; i < palavraAtual.length; i++) {
                if (palavraAtual[i] === letraAdivinhada) {
                    letraNaoEncontrada = false;
                    break;
                }
            }
            if (letraNaoEncontrada) {
                tentativasRestantes--;
            }
            atualizarDisplayDoJogo();
            desenharBoneco(); // Atualiza o boneco
            let palavraCompleta = true;
            for (let i = 0; i < palavraAtual.length; i++) {
                if (letrasAdivinhadas.indexOf(palavraAtual[i]) === -1 && palavraAtual[i] !== " ") {
                    palavraCompleta = false;
                    break;
                }
            }

            if (palavraCompleta) {
                document.getElementById("status").textContent = "Você venceu!";
            } else if (tentativasRestantes <= 0) {
                document.getElementById("status").textContent = `Você perdeu! A palavra era: ${palavraAtual}`; // Fixed string interpolation
            }
        }
    }
    entradaAdivinhacao.value = "";
}

// Iniciar o jogo quando o documento for carregado
document.addEventListener("DOMContentLoaded", iniciarJogo);

function iniciarJogo() {
    const indiceAleatorio = Math.floor(Math.random() * palavras.length);
    palavraAtual = palavras[indiceAleatorio];
    dicaAtual = dicas[indiceAleatorio];
    letrasAdivinhadas = [];
    tentativasRestantes = tentativasMaximas;
    atualizarDisplayDoJogo();
    limparBoneco();

    // Adiciona o evento de escuta para o campo de entrada
    document.getElementById("guess").addEventListener("keydown", verificarTecla);
}

// Função para detectar a tecla pressionada
function verificarTecla(event) {
    if (event.key === "Enter") {
        adivinharLetra();
    }
}