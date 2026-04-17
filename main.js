// Função para exibir o jogo e esconder o menu
const iniciarMenu = () => {
    const botaoComecar = document.getElementById('btn-comecar');
    const menu = document.getElementById('menu');
    const jogo = document.getElementById('jogo');

    botaoComecar.addEventListener('click', () => {
        menu.style.display = 'none';  // Esconde o menu
        jogo.style.display = 'block'; // Exibe o jogo
        iniciarJogo(); // Inicia o jogo
    });
};

// Função para verificar se a palavra formada está na lista e contém a letra obrigatória
const verificarPalavra = (palavra, listaPalavras, letraObrigatoria) => 
    listaPalavras.includes(palavra.toUpperCase()) && palavra.includes(letraObrigatoria);

// Função para adicionar uma palavra corretamente acertada sem mutar a lista original
const adicionarPalavra = (palavra, lista) => lista.concat(palavra.toUpperCase());

// Função para iniciar o jogo de acordo com a fase
const iniciarFase = (letrasSelecionadas, palavrasValidas, letraObrigatoria, palavrasAcertadas = []) => {
    // Renderizando as letras na tela em maiúsculas
    document.getElementById('gamelocal').innerHTML = letrasSelecionadas
        .map((letra, index) => {
            const estiloDestaque = letra === letraObrigatoria ? 'destaque' : 'normal';
            return `<div class="w ${estiloDestaque}" id="letra-${index}">${letra.toUpperCase()}</div>`; // Letras em maiúsculas
        })
        .join('');

    // Função para renderizar as palavras acertadas na tela
    const renderizarPalavrasAcertadas = () => {
        const divPalavrasAcertadas = document.getElementById('palavras-acertadas');
        divPalavrasAcertadas.innerHTML = `<strong>Palavras acertadas (${palavrasAcertadas.length}):</strong> ${palavrasAcertadas.join(', ')}`;
    };

    const palavraFormada = {
        valor: '',
        obter: function() {
            return this.valor;
        },
        adicionar: function(letra) {
            this.valor += letra.toUpperCase();
            return this.valor;
        },
        apagarUltimaLetra: function() {
            this.valor = this.valor.slice(0, -1);  // Remove a última letra
            return this.valor;
        },
        resetar: function() {
            this.valor = '';
            return this.valor;
        }
    };

    // Removendo qualquer listener antigo para evitar duplicações
    const botaoVerificar = document.getElementById('verificar');
    const novoBotaoVerificar = botaoVerificar.cloneNode(true);
    botaoVerificar.parentNode.replaceChild(novoBotaoVerificar, botaoVerificar);

    const botaoApagar = document.getElementById('apagar-letra');
    const novoBotaoApagar = botaoApagar.cloneNode(true);
    botaoApagar.parentNode.replaceChild(novoBotaoApagar, botaoApagar);

    // Adicionando eventos de clique para formar a palavra de maneira funcional
    letrasSelecionadas.forEach((letra, index) => {
        document.getElementById(`letra-${index}`).addEventListener('click', () => {
            palavraFormada.adicionar(letra);
            renderizarPalavraFormada(palavraFormada.obter());
        });
    });

    // Verificando a palavra quando o jogador clicar em "Verificar"
    novoBotaoVerificar.addEventListener('click', () => {
        const palavra = palavraFormada.obter();
        if (verificarPalavra(palavra, palavrasValidas, letraObrigatoria)) {
            if (!palavrasAcertadas.includes(palavra)) {
                const novasPalavrasAcertadas = adicionarPalavra(palavra, palavrasAcertadas);  // Armazenar a palavra correta sem mutação
                alert(`Parabéns! Você acertou a palavra: ${palavra}`);
                palavrasAcertadas = novasPalavrasAcertadas;
                renderizarPalavrasAcertadas();  // Atualizar a lista de palavras acertadas na tela
            } else {
                alert('Você já acertou essa palavra.');
            }
        } else {
            alert('A palavra não é válida ou não contém a letra obrigatória.');
        }

        // Verificando se todas as palavras válidas foram acertadas
        if (palavrasAcertadas.length === 10) {
            alert('Parabéns! Você acertou a quantidade necessária de palavras desta fase!');
            document.getElementById('proxima-fase').disabled = false; // Habilita o botão de próxima fase
        }

        palavraFormada.resetar();
        renderizarPalavraFormada(palavraFormada.obter());
    });

    // Desabilitar o botão de próxima fase até acertar todas as palavras
    document.getElementById('proxima-fase').disabled = true;

    // Adicionando evento para apagar a última letra
    novoBotaoApagar.addEventListener('click', () => {
        palavraFormada.apagarUltimaLetra();
        renderizarPalavraFormada(palavraFormada.obter());
    });
};

// Função para iniciar o jogo
const iniciarJogo = () => {
    const fases = [
        {
            letras: ["A", "B", "O", "R", "T", "L", "H"],
            palavrasValidas: [
              "TRABALHO", "ALTA", "ALTO", "ATOR", "BATA", "BOTA", "BOTO", "LATA", 
              "LOTA", "RATO", "ROTA", "TABA", 
              "TALO", "TARA", "TATO", "TOLA", "TOLO", "ALTAR", 
              "ATOLA", "BOATO", "BOTAR", "BROTA", "BROTO", "HORTA",
              "LOTAR", "TALHA", "TALHO", "TORRA", "TORTA", "TORTO", 
              "TRATO", "ABORTA", "ABORTO", "ARROTA", "ARROTO", 
              "ATALHO", "ATOLAR", "BARATA", "BARATO", "BATATA","BOLOTA", 
              "BROTAR", "TALHAR", "TOALHA", "TORRAR", "TRALHA", 
              "TRATAR", "TRATOR", "ABORTAR", "ARROTAR",
              "BATALHA", "BATALHAR", "TÁRTARO", "TRABALHAR"
            ],
            letraObrigatoria: 'T',
        },
        {
            letras: ["M", "A", "R", "T", "E", "O", "S"],
            palavrasValidas: [
              "AMAR", "AMARRAR", "AMOR", "AMORA", "AMOROSO", "AMOSTRA", "ARARA", "ARMA", 
              "ARMAR", "AROMA", "ARROTAR", "ARROTO", "ARTE", "ASTRO", "ATOR", "ATRASAR", 
              "ATRASO", "ERRAR", "ERRO", "ESTAR", "MAESTRO", "MARRETA", "MARROM", "MARTE", 
              "MATAR", "MESTRE", "METRO", "MORAR", "MORRER", "MORRO", "MORTA", "MORTE", 
              "MORTO", "MOSTRAR", "MOTOR", "ORAR", "OSTRA", "RAMO", "RARO", "RASO", 
              "RATO", "REMAR", "REMO", "RESTAR", "RESTO", "RETA", "RETO", "RETRATO", 
              "ROSA", "ROSTO", "ROTA", "ROTEAR", "SERRA", "SOMAR", "SORO", "SORTE", 
              "TERRA", "TERREMOTO", "TERROR", "TOMAR", "TORRE", "TORTA", "TORTO", "TRAMA", 
              "TRATAR", "TRATO", "TRATOR", "TREMER", "TREMOR", "TRETA"
            ],
            letraObrigatoria: 'R',
        },
        {
            letras: ["A", "E", "L", "S", "T", "V", "O"],
            palavrasValidas: ["VASO", "SELO", "SALTO", "ESTALO", "VESTE", "SOL", "SETA", "SALVO", "SELVA", "SOLTO", "VOSSO", "LEVAS", "VASTO","TESTA", "SELA", "LESTE","TESLA"],
            palavrasValidas: [
              "ASSALTO", "AVESSO", "ESSA", "ESSE", "ESTA", "ESTALO", "ESTAVA", "ESTE", 
              "LESA", "LESO", "LESTE", "OSSO", "SALA", "SALETA", "SALTO", "SALVA", 
              "SALVO", "SELA", "SELO", "SELVA", "SETA", "SETE", "SOLA", "SOLO", 
              "SOLTA", "SOLTO", "SOVA", "TESE", "TESO", "TOSSE", "TOSTA", "VALSA", 
              "VASO", "VASTA", "VASTO", "VESTE", "VOLTASTE", "TESLA",
            ],
            letraObrigatoria: 'S',
        }
    ];

    const faseAtual = {
        valor: 0,
        obter: function() {
            return this.valor;
        },
        incrementar: function() {
            this.valor += 1;
            return this.valor;
        }
    };

    const iniciarProximaFase = () => {
        if (faseAtual.obter() < fases.length) {
            const fase = fases[faseAtual.obter()];
            iniciarFase(fase.letras, fase.palavrasValidas, fase.letraObrigatoria);
            faseAtual.incrementar();
        } else {
            alert('Parabéns! Você completou todas as fases!');
        }
    };

    iniciarProximaFase();

    // Botão para avançar para a próxima fase
    const botaoProximaFase = document.getElementById('proxima-fase');
    const novoBotaoProximaFase = botaoProximaFase.cloneNode(true);
    botaoProximaFase.parentNode.replaceChild(novoBotaoProximaFase, botaoProximaFase);

    novoBotaoProximaFase.addEventListener('click', iniciarProximaFase);
};

// Função para renderizar a palavra formada pelo jogador
const renderizarPalavraFormada = (palavra) => {
    document.getElementById('palavra-formada').innerText = palavra;
};

// Inicializando o jogo quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    iniciarMenu(); // Inicia com o menu
});
