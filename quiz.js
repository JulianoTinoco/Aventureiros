document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos DOM (permanecem os mesmos) ---
    const homeScreen = document.getElementById('home-screen');
    const quizSelectionContainer = document.querySelector('.quiz-selection');
    const videoModal = document.getElementById('video-modal');
    const videoChapterNumberSpan = document.getElementById('video-chapter-number');
    const youtubePlayerDiv = document.getElementById('youtube-player');
    const closeModalButton = document.querySelector('.close-button');
    const startQuizButton = document.getElementById('start-quiz-button');
    const quizScreen = document.getElementById('quiz-screen');
    const quizTitle = document.getElementById('quiz-title');
    const timerSpan = document.getElementById('timer');
    const scoreSpan = document.getElementById('score');
    const progressBar = document.getElementById('progress-bar');
    const questionCounterSpan = document.getElementById('question-counter');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const feedbackDiv = document.getElementById('feedback');
    const resultsScreen = document.getElementById('results-screen');
    const resultChapterTitle = document.getElementById('result-chapter-title');
    const finalScoreSpan = document.getElementById('final-score');
    const highScoreSpan = document.getElementById('high-score');
    const tryAgainButton = document.getElementById('try-again-button');
    const backHomeButton = document.getElementById('back-home-button');

    // --- Sons (permanecem os mesmos) ---
    const correctSound = new Audio('sounds/correct.mp3');
    const errorSound = new Audio('sounds/error.mp3');

    // --- Dados dos Quizzes (COM AS PERGUNTAS FORNECIDAS) ---
    const quizzesData = [
        {
            chapter: 1,
            title: "Uma irmã corajosa (Miriã)",
            videoId: "GibiAventura_VideoID_Cap1", // SUBSTITUA PELO ID REAL DO YOUTUBE
            questions: [
                { question: "Quem é a \"irmã corajosa\" mencionada no capítulo?", options: ["Joquebede", "A filha do Faraó", "Miriã", "Zípora"], answer: "Miriã" },
                { question: "Qual ordem o rei malvado deu sobre os bebês meninos?", options: ["Deveriam ser escravizados.", "Deveriam ser mortos ao nascer.", "Deveriam ser enviados para outra terra.", "Deveriam ser oferecidos aos deuses egípcios."], answer: "Deveriam ser mortos ao nascer." },
                { question: "Por quanto tempo a mãe conseguiu esconder o bebê em casa?", options: ["Um mês", "Seis meses", "Três meses", "Um ano"], answer: "Três meses" },
                { question: "Onde a mãe colocou o bebê depois de preparar o cestinho?", options: ["Escondido em casa", "No Rio Nilo, entre os juncos", "Aos cuidados de outra família", "No palácio do rei"], answer: "No Rio Nilo, entre os juncos" },
                { question: "Quem ficou observando o cestinho de longe?", options: ["A mãe do bebê", "O pai do bebê", "Um soldado do rei", "A irmã do bebê (Miriã)"], answer: "A irmã do bebê (Miriã)" },
                { question: "Quem encontrou o bebê no cestinho no rio?", options: ["Miriã", "A filha do rei (princesa)", "Uma serva da princesa", "O próprio rei"], answer: "A filha do rei (princesa)" },
                { question: "O que Miriã se ofereceu para fazer quando a princesa encontrou o bebê?", options: ["Levar o bebê de volta para sua mãe", "Adotar o bebê ela mesma", "Buscar uma ama para cuidar do bebê", "Esconder o bebê novamente"], answer: "Buscar uma ama para cuidar do bebê" },
                { question: "Quem Miriã chamou para ser a ama do bebê?", options: ["Uma mulher egípcia", "Uma das servas da princesa", "A própria mãe do bebê", "Uma parente distante"], answer: "A própria mãe do bebê" },
                { question: "Qual o nome do bebê que foi salvo neste evento?", options: ["Arão", "Samuel", "Moisés", "Davi"], answer: "Moisés" },
                { question: "Qual lição sobre irmãos é ensinada neste capítulo?", options: ["Ignorar os irmãos mais novos.", "Competir com os irmãos.", "Sempre cuidar dos irmãos mais novos e não maltratá-los.", "Deixar os irmãos se cuidarem sozinhos."], answer: "Sempre cuidar dos irmãos mais novos e não maltratá-los." },
                { question: "Qual lição sobre Deus é ensinada através de Miriã?", options: ["Ignorar a voz de Deus.", "Ter medo de seguir as instruções de Deus.", "Sempre ouvir a voz de Deus e seguir Suas instruções.", "Questionar as ordens de Deus."], answer: "Sempre ouvir a voz de Deus e seguir Suas instruções." },
                { question: "Qual o nome do pai de Miriã, Arão e Moisés, segundo a atividade?", options: ["Jessé", "Elcana", "Anrão", "Levi"], answer: "Anrão" },
                { question: "Qual o nome da mãe de Miriã, Arão e Moisés, segundo a atividade?", options: ["Ana", "Joquebede", "Sara", "Rebeca"], answer: "Joquebede" },
                { question: "Quem era o irmão mais velho de Miriã e Moisés, segundo a atividade?", options: ["Anrão", "Levi", "Arão", "José"], answer: "Arão" },
                { question: "Qual dom especial Miriã possuía, de acordo com a atividade (Ex 15:20)?", options: ["Cura", "Força", "Profecia", "Sabedoria"], answer: "Profecia" },
                { question: "Qual instrumento musical Miriã tocava, segundo a atividade (Ex 15:20)?", options: ["Harpa", "Flauta", "Tamborim", "Lira"], answer: "Tamborim" },
                { question: "Onde Miriã morreu, segundo a atividade (Nm 20:1)?", options: ["No Egito", "Em Canaã", "No deserto de Zim", "No Monte Sinai"], answer: "No deserto de Zim" },
                { question: "Qual rio é central na história do resgate de Moisés?", options: ["Rio Jordão", "Rio Tigre", "Rio Eufrates", "Rio Nilo"], answer: "Rio Nilo" },
                { question: "A ação de Miriã demonstra principalmente:", options: ["Medo", "Coragem e inteligência", "Indiferença", "Raiva"], answer: "Coragem e inteligência" },
                { question: "O que a mãe fez antes de Miriã entrar em cena, demonstrando fé?", options: ["Confrontou o rei", "Orou a Deus pela proteção do bebê", "Fugiu do país com o bebê", "Entregou o bebê aos soldados"], answer: "Orou a Deus pela proteção do bebê" } // Assumindo que a mãe orou, complementando a ação de preparar o cesto.
            ]
        },
        {
            chapter: 2,
            title: "O Bom Ouvinte (Samuel)",
            videoId: "GibiAventura_VideoID_Cap2", // SUBSTITUA PELO ID REAL DO YOUTUBE
            questions: [
                { question: "Onde se passava a história de Samuel como \"bom ouvinte\"?", options: ["No palácio do rei Saul", "No tabernáculo em Siló", "No templo de Jerusalém", "Em Belém"], answer: "No tabernáculo em Siló" },
                { question: "Quem era o principal pastor do local, que parecia não ver os erros dos filhos?", options: ["Samuel", "Elcana", "Eli", "Saul"], answer: "Eli" },
                { question: "Qual era o comportamento dos filhos do pastor Eli no templo?", options: ["Oravam e jejuavam", "Ensinavam o povo corretamente", "Se embebedavam, roubavam ofertas e eram violentos", "Ajudavam os pobres e necessitados"], answer: "Se embebedavam, roubavam ofertas e eram violentos" },
                { question: "O que o pastor Eli fazia em relação aos atos errados dos seus filhos?", options: ["Expulsou-os do templo", "Corrigiu-os severamente", "Não os impedia e permitia que continuassem em seus cargos", "Denunciou-os ao povo"], answer: "Não os impedia e permitia que continuassem em seus cargos" },
                { question: "Quem Deus escolheu para transmitir uma mensagem importante a Eli?", options: ["Um profeta anônimo", "O próprio filho de Eli, Hofni", "O pequeno Samuel", "Um anjo"], answer: "O pequeno Samuel" },
                { question: "O que Samuel fazia no templo desde cedo?", options: ["Brincava o dia todo", "Aprendia a lutar", "Aprendeu a temer e a confiar em Deus", "Trabalhava como cozinheiro"], answer: "Aprendeu a temer e a confiar em Deus" },
                { question: "Quantas vezes Deus chamou Samuel pelo nome antes que ele entendesse?", options: ["Uma vez", "Duas vezes", "Três vezes", "Quatro vezes"], answer: "Três vezes" }, // Deus chamou 3x, na 4a Samuel respondeu corretamente.
                { question: "Quem Samuel pensou que o estava chamando inicialmente?", options: ["Sua mãe, Ana", "Seu pai, Elcana", "O pastor Eli", "Um dos filhos de Eli"], answer: "O pastor Eli" },
                { question: "Quem instruiu Samuel sobre como responder ao chamado de Deus?", options: ["Sua mãe, Ana", "O pastor Eli", "Um anjo", "Ele descobriu sozinho"], answer: "O pastor Eli" },
                { question: "Qual foi a mensagem que Deus deu a Samuel sobre a casa de Eli?", options: ["Que Eli seria recompensado por seu serviço", "Que os filhos de Eli se arrependeriam", "Que Samuel julgaria a casa de Eli por causa dos pecados", "Que Samuel deveria fugir do templo"], answer: "Que Samuel julgaria a casa de Eli por causa dos pecados" }, // A mensagem era sobre o juízo iminente.
                { question: "Como todo Israel passou a reconhecer Samuel?", options: ["Como um guerreiro valente", "Como o filho de Eli", "Como um pequeno aventureiro e depois grande herói (profeta) de Deus", "Como um futuro rei"], answer: "Como um pequeno aventureiro e depois grande herói (profeta) de Deus" },
                { question: "Qual é a primeira lição do aventureiro Samuel mencionada no livro?", options: ["Ser forte e corajoso", "Ter os ouvidos atentos às instruções de Deus e segui-las", "Acumular riquezas", "Buscar fama e poder"], answer: "Ter os ouvidos atentos às instruções de Deus e segui-las" },
                { question: "Qual é a segunda lição mencionada para ser como Samuel?", options: ["Ser esperto e enganador", "Ser honesto, puro e temente a Deus", "Ser popular entre as pessoas", "Ser um bom músico"], answer: "Ser honesto, puro e temente a Deus" },
                { question: "Qual é a terceira lição de Samuel?", options: ["Crescer buscando seus próprios interesses", "Crescer fazendo a vontade de Deus", "Crescer para ser o mais forte", "Crescer para ser o mais rico"], answer: "Crescer fazendo a vontade de Deus" },
                { question: "De acordo com a atividade, quem era o pai de Samuel?", options: ["Eli", "Jessé", "Anrão", "Elcana"], answer: "Elcana" },
                { question: "De acordo com a atividade, quem era a mãe de Samuel?", options: ["Penina", "Miriã", "Joquebede", "Ana"], answer: "Ana" },
                { question: "Qual era o nome da outra esposa do pai de Samuel?", options: ["Ana", "Rute", "Penina", "Abigail"], answer: "Penina" },
                { question: "Onde Samuel morava quando morreu, segundo a atividade (1Sm 25:1)?", options: ["Siló", "Jerusalém", "Ramá", "Belém"], answer: "Ramá" },
                { question: "O que o capítulo enfatiza como necessário para ser um aventureiro de Cristo, inspirado em Samuel?", options: ["Ter muita força física", "Aprender a ouvir a voz de Deus e cumprir Sua vontade", "Ter muitos amigos influentes", "Nascer em uma família rica"], answer: "Aprender a ouvir a voz de Deus e cumprir Sua vontade" },
                { question: "A história de Samuel mostra a importância de:", options: ["Desobedecer aos mais velhos", "Estar atento à comunicação divina, mesmo quando jovem", "Buscar vingança contra os inimigos", "Ignorar os problemas ao redor"], answer: "Estar atento à comunicação divina, mesmo quando jovem" }
            ]
        },
        {
            chapter: 3,
            title: "Menino x Gigante (Davi)",
            videoId: "GibiAventura_VideoID_Cap3", // SUBSTITUA PELO ID REAL DO YOUTUBE
            questions: [
                { question: "Quem estava perturbando o exército israelita?", options: ["O exército egípcio", "Um gigante filisteu", "O rei Saul", "Um grupo de ladrões"], answer: "Um gigante filisteu" },
                { question: "O que o gigante fazia todo dia?", options: ["Oferecia paz aos israelitas", "Desafiava os soldados de Deus para a briga, chamando-os de covardes", "Pedia comida ao exército", "Contava histórias para os soldados"], answer: "Desafiava os soldados de Deus para a briga, chamando-os de covardes" },
                { question: "Qual era a reação dos soldados israelitas ao ouvirem a voz do gigante?", options: ["Riam dele", "Preparavam-se para lutar", "Suas pernas tremiam de medo", "Ignoravam o gigante"], answer: "Suas pernas tremiam de medo" },
                { question: "Qual era a altura aproximada do gigante mencionada no texto?", options: ["Dois metros", "Mais de três metros", "Menos de dois metros", "Cinco metros"], answer: "Mais de três metros" }, // Golias tinha cerca de 6 côvados e um palmo, próximo a 3 metros.
                { question: "O que o rei havia prometido a quem lutasse e vencesse o gigante?", options: ["Metade do reino", "Muito ouro e prata", "A mão de sua filha em casamento", "O comando do exército"], answer: "A mão de sua filha em casamento" }, // Riquezas e a filha em casamento. A opção mais específica é a filha.
                { question: "Quem apareceu em cena trazendo comida para seus irmãos?", options: ["Samuel", "Josias", "O pequeno herói chamado Davi", "O sobrinho de Paulo"], answer: "O pequeno herói chamado Davi" },
                { question: "Qual era a \"arma secreta\" que Davi trazia consigo?", options: ["Uma espada mágica", "Um escudo impenetrável", "Uma funda (estilingue)", "Um arco e flecha especial"], answer: "Uma funda (estilingue)" },
                { question: "Como Davi reagiu ao ouvir o desafio e as zombarias do gigante?", options: ["Fugiu com medo como os outros soldados", "Ficou paralisado de terror", "Não tremeu nem fugiu, confiou em Deus e decidiu lutar", "Pediu ajuda ao rei"], answer: "Não tremeu nem fugiu, confiou em Deus e decidiu lutar" },
                { question: "O que o rei quis emprestar a Davi para a luta?", options: ["Seu cavalo de guerra", "Seus melhores soldados", "Sua própria armadura e arma", "Um mapa do acampamento inimigo"], answer: "Sua própria armadura e arma" },
                { question: "Por que Davi não usou a armadura do rei?", options: ["Porque era pequena demais", "Porque ficou muito desconfortável e ele tinha sua própria arma", "Porque não gostou da cor", "Porque o gigante proibiu"], answer: "Porque ficou muito desconfortável e ele tinha sua própria arma" }, // Ele não estava acostumado.
                { question: "O que Davi já havia enfrentado e vencido para defender suas ovelhas?", options: ["Um exército inimigo", "Um leão e um urso", "Uma tempestade e uma enchente", "Ladrões de ovelhas"], answer: "Um leão e um urso" },
                { question: "O que Davi usou para derrubar o gigante?", options: ["Uma espada", "Uma lança", "Uma pedra lançada com sua funda", "Um grito poderoso"], answer: "Uma pedra lançada com sua funda" },
                { question: "Onde a pedra atingiu o gigante?", options: ["No pé", "No peito", "Na testa", "No braço"], answer: "Na testa" },
                { question: "Qual foi o resultado da luta entre Davi e o gigante?", options: ["O gigante venceu e escravizou Israel", "Davi venceu, derrubando o gigante", "A luta terminou empatada", "Os dois fugiram com medo"], answer: "Davi venceu, derrubando o gigante" },
                { question: "Qual é a primeira lição do aventureiro Davi?", options: ["Ter medo dos desafios", "Não ter medo dos gigantes da vida", "Evitar confrontos a todo custo", "Sempre usar a força bruta"], answer: "Não ter medo dos gigantes da vida" },
                { question: "Qual é a segunda lição de Davi?", options: ["Confiar apenas na própria força", "Ter fé e coragem para lutar em nome do Senhor e ser vencedor", "Desistir quando a situação parecer difícil", "Usar a armadura dos outros"], answer: "Ter fé e coragem para lutar em nome do Senhor e ser vencedor" },
                { question: "Segundo a atividade, qual o nome do pai de Davi?", options: ["Saul", "Samuel", "Jessé", "Elcana"], answer: "Jessé" },
                { question: "Quantas pedras Davi pegou para enfrentar Golias, segundo a atividade (1Sm 17:40)?", options: ["Uma", "Três", "Cinco", "Dez"], answer: "Cinco" },
                { question: "Quem era o melhor amigo de Davi, segundo a atividade (1Sm 18:1-4)?", options: ["Saul", "Jônatas", "Abner", "Samuel"], answer: "Jônatas" },
                { question: "Que instrumento musical Davi tocava, segundo a atividade (1Sm 16:23)?", options: ["Flauta", "Tamborim", "Harpa", "Trombeta"], answer: "Harpa" }
            ]
        },
        {
            chapter: 4,
            title: "Mensageira da Esperança (Menina Israelita)",
            videoId: "GibiAventura_VideoID_Cap4", // SUBSTITUA PELO ID REAL DO YOUTUBE
            questions: [
                 { question: "Quem estava desesperado por ter descoberto uma doença incurável?", options: ["O rei de Israel", "O profeta Eliseu", "Um comandante sírio chamado Naamã", "O rei da Síria"], answer: "Um comandante sírio chamado Naamã" },
                 { question: "Qual era a doença incurável que o comandante tinha?", options: ["Cegueira", "Paralisia", "Lepra", "Câncer"], answer: "Lepra" },
                 { question: "Quem na casa de Naamã sabia como ele poderia ser curado?", options: ["Sua esposa", "Um médico sírio", "Uma menina israelita que era escrava na casa", "O próprio Naamã"], answer: "Uma menina israelita que era escrava na casa" },
                 { question: "Como a menina israelita havia chegado à casa de Naamã?", options: ["Foi vendida por seus pais", "Foi trabalhar voluntariamente", "Foi levada como escrava após uma invasão síria em Israel", "Foi enviada como presente pelo rei de Israel"], answer: "Foi levada como escrava após uma invasão síria em Israel" },
                 { question: "Apesar de ter sido levada de sua pátria e feita escrava, como a menina era descrita?", options: ["Vingativa e triste", "Uma aventureira de Deus, que confiava Nele, tinha perdão e amor", "Revoltada e cheia de ódio", "Indiferente ao sofrimento de Naamã"], answer: "Uma aventureira de Deus, que confiava Nele, tinha perdão e amor" },
                 { question: "O que a menina disse à sua patroa (esposa de Naamã)?", options: ["Que Naamã merecia a doença", "Que não havia cura para a lepra", "Que existia um profeta em Israel chamado Eliseu que podia curar Naamã", "Que eles deveriam consultar os deuses da Síria"], answer: "Que existia um profeta em Israel chamado Eliseu que podia curar Naamã" },
                 { question: "Naamã acreditou na menina e pediu permissão a quem para viajar a Israel?", options: ["Ao profeta Eliseu", "À sua esposa", "Ao rei de Israel", "Ao seu rei (rei da Síria)"], answer: "Ao seu rei (rei da Síria)" },
                 { question: "Quem Naamã procurou primeiro ao chegar a Israel?", options: ["O profeta Eliseu", "A menina israelita", "O rei de Israel", "Os sacerdotes do templo"], answer: "O rei de Israel" },
                 { question: "Qual foi a instrução do profeta Eliseu para Naamã ser curado?", options: ["Oferecer sacrifícios caros", "Mergulhar sete vezes no Rio Jordão", "Orar aos deuses de Israel", "Pagar uma grande quantia em dinheiro"], answer: "Mergulhar sete vezes no Rio Jordão" },
                 { question: "Qual foi a reação inicial de Naamã à instrução de Eliseu?", options: ["Obdeceu imediatamente com fé", "Ficou zangado e achou que os rios da Síria eram melhores", "Riu da instrução", "Pediu uma instrução diferente"], answer: "Ficou zangado e achou que os rios da Síria eram melhores" },
                 { question: "O que aconteceu quando Naamã finalmente seguiu a instrução de Eliseu?", options: ["Nada aconteceu, ele continuou leproso", "Ele ficou curado da lepra", "Ele se afogou no rio", "Ele decidiu voltar para a Síria sem tentar"], answer: "Ele ficou curado da lepra" },
                 { question: "Qual a principal característica da menina israelita destacada na história?", options: ["Sua beleza física", "Sua força de vontade para escapar", "Sua fé, coragem e bondade, mesmo em situação adversa", "Sua habilidade de cozinhar"], answer: "Sua fé, coragem e bondade, mesmo em situação adversa" },
                 { question: "Qual é a primeira lição da \"menina aventureira\"?", options: ["Desconfiar de todos", "Confiar em Deus", "Buscar vingança", "Guardar segredos"], answer: "Confiar em Deus" },
                 { question: "Qual é a segunda lição ensinada por ela?", options: ["Guardar raiva no coração", "Não perdoar as pessoas", "Não guardar raiva e perdoar as pessoas", "Odiar os inimigos"], answer: "Não guardar raiva e perdoar as pessoas" },
                 { question: "Qual é a terceira lição?", options: ["Ajudar apenas os amigos", "Ignorar o sofrimento alheio", "Ajudar o próximo e ensinar sobre Deus", "Falar mal dos outros"], answer: "Ajudar o próximo e ensinar sobre Deus" },
                 { question: "Qual o nome do comandante sírio curado? (Atividade 1a)", options: ["Ben-Hadade", "Geazi", "Naamã", "Hazael"], answer: "Naamã" },
                 { question: "Qual o nome do profeta que deu as instruções para a cura? (Atividade 1c)", options: ["Elias", "Isaías", "Samuel", "Eliseu"], answer: "Eliseu" },
                 { question: "Qual o nome do rio onde Naamã foi curado? (Atividade 2a)", options: ["Nilo", "Eufrates", "Tigre", "Jordão"], answer: "Jordão" },
                 { question: "Qual era a doença de Naamã? (Atividade 4)", options: ["Cegueira", "Lepra", "Paralisia", "Febre"], answer: "Lepra" },
                 { question: "Qual o país de origem da menina cativa? (Atividade 5)", options: ["Egito", "Síria", "Babilônia", "Israel"], answer: "Israel" }
            ]
        },
        {
            chapter: 5,
            title: "O Pequeno Reformador (Josias)",
            videoId: "GibiAventura_VideoID_Cap5", // SUBSTITUA PELO ID REAL DO YOUTUBE
            questions: [
                { question: "Como estava o reino de Judá antes de Josias se tornar rei?", options: ["Em paz e prosperidade", "Fiel a Deus", "Uma bagunça, com pessoas más, egoístas e idólatras", "Governada por um rei justo"], answer: "Uma bagunça, com pessoas más, egoístas e idólatras" },
                { question: "Quem era o rei antes de Josias, descrito como péssimo?", options: ["Manassés", "Amom", "Ezequias", "Davi"], answer: "Amom" }, // Manassés também foi ruim, mas Amom foi o imediatamente anterior.
                { question: "Quantos anos Josias tinha quando se tornou rei?", options: ["Vinte anos", "Oito anos", "Doze anos", "Dezesseis anos"], answer: "Oito anos" },
                { question: "Qual foi a primeira grande ação de Josias como rei?", options: ["Construir um novo palácio", "Iniciar uma guerra contra o Egito", "Fazer uma grande reforma espiritual em Israel/Judá", "Aumentar os impostos"], answer: "Fazer uma grande reforma espiritual em Israel/Judá" },
                { question: "O que Josias mandou fazer com o templo?", options: ["Fechá-lo permanentemente", "Destruí-lo", "Abri-lo, pois estava fechado, e reformá-lo", "Transformá-lo em um palácio"], answer: "Abri-lo, pois estava fechado, e reformá-lo" },
                { question: "O que Josias fez com os ídolos e altares pagãos?", options: ["Ignorou-os", "Adorou-os como seu pai fazia", "Tirou-os do templo, quebrou os altares e expulsou os falsos profetas", "Guardou-os em um museu"], answer: "Tirou-os do templo, quebrou os altares e expulsou os falsos profetas" },
                { question: "O que foi encontrado durante a reforma do templo?", options: ["Um tesouro escondido", "O Livro da Lei (a Palavra de Deus)", "Um mapa antigo", "As ferramentas originais de construção"], answer: "O Livro da Lei (a Palavra de Deus)" },
                { question: "Após a leitura do Livro da Lei, o que Josias convidou o povo a fazer?", options: ["Celebrar uma festa pagã", "Fazer uma grande reforma de coração diante de Deus", "Ignorar o que estava escrito", "Construir mais ídolos"], answer: "Fazer uma grande reforma de coração diante de Deus" },
                { question: "Qual festa importante Josias celebrou com o povo?", options: ["Festa dos Tabernáculos", "Pentecostes", "Páscoa", "Purim"], answer: "Páscoa" },
                { question: "Como Josias é descrito em termos de caráter?", options: ["Cruel e vingativo", "Indiferente e preguiçoso", "Justo, bondoso, misericordioso e temente a Deus", "Egoísta e orgulhoso"], answer: "Justo, bondoso, misericordioso e temente a Deus" },
                { question: "Qual foi o resultado das ações de Josias para a nação?", options: ["A nação foi destruída imediatamente", "A nação ficou feliz e foi salva (temporariamente) da destruição", "Nada mudou", "O povo se revoltou contra Josias"], answer: "A nação ficou feliz e foi salva (temporariamente) da destruição" },
                { question: "Qual a primeira lição do aventureiro Josias?", options: ["Ignorar a Palavra de Deus", "Ler a Palavra de Deus e ser fiel a ela", "Usar a Palavra de Deus para benefício próprio", "Ler a Palavra de Deus apenas ocasionalmente"], answer: "Ler a Palavra de Deus e ser fiel a ela" },
                { question: "Qual a segunda lição de Josias?", options: ["Procurar fazer a própria vontade", "Procurar fazer a vontade de Deus", "Fazer a vontade dos outros", "Não se importar com a vontade de Deus"], answer: "Procurar fazer a vontade de Deus" },
                { question: "Qual a terceira lição de Josias?", options: ["Afastar as pessoas de Deus", "Convidar as pessoas para se aproximarem de Deus", "Não falar de Deus para ninguém", "Criticar quem busca a Deus"], answer: "Convidar as pessoas para se aproximarem de Deus" },
                { question: "Segundo a atividade, quem era o pai de Josias?", options: ["Manassés", "Ezequias", "Amom", "Hilquias"], answer: "Amom" },
                { question: "Qual era a capital do reino de Josias onde a Páscoa foi celebrada? (Atividade 2)", options: ["Samaria", "Hebrom", "Jericó", "Jerusalém"], answer: "Jerusalém" },
                { question: "Onde Josias morreu em batalha? (Atividade 3)", options: ["Em Jerusalém", "No vale de Megido", "No Monte Carmelo", "Em Jericó"], answer: "No vale de Megido" },
                { question: "Qual sacerdote encontrou o Livro da Lei para Josias? (Atividade 4)", options: ["Seraías", "Zadoque", "Hilquias", "Abiatar"], answer: "Hilquias" },
                { question: "Qual profetisa orientou o rei Josias após a leitura do Livro? (Atividade 5)", options: ["Débora", "Miriã", "Hulda", "Ana"], answer: "Hulda" },
                { question: "Qual o nome da mãe do rei Josias? (Atividade 7)", options: ["Atalia", "Jezabel", "Jedida", "Hamutal"], answer: "Jedida" }
            ]
        },
         {
            chapter: 6,
            title: "Fiéis em terra estranha (Daniel e amigos)",
            videoId: "GibiAventura_VideoID_Cap6", // SUBSTITUA PELO ID REAL DO YOUTUBE
            questions: [
                { question: "Quem são os quatro aventureiros mencionados no início do capítulo que foram levados cativos?", options: ["Moisés, Arão, Josué e Calebe", "Davi, Jônatas, Saul e Samuel", "Daniel, Sadraque, Mesaque e Abede-Nego", "Pedro, Tiago, João e André"], answer: "Daniel, Sadraque, Mesaque e Abede-Nego" },
                { question: "Para onde eles foram levados como prisioneiros?", options: ["Egito", "Assíria", "Babilônia", "Pérsia"], answer: "Babilônia" },
                { question: "O que eles tiveram que fazer na terra do cativeiro?", options: ["Trabalhar como escravos na construção", "Estudar muito e se tornar funcionários do governo", "Lutar no exército babilônico", "Cuidar dos jardins do palácio"], answer: "Estudar muito e se tornar funcionários do governo" },
                { question: "Qual foi uma das maiores \"batalhas\" que eles enfrentaram, descrita como um \"inimigo mortal\"?", options: ["A tentação de adorar ídolos", "A saudade de casa", "A má alimentação oferecida no palácio", "A dificuldade de aprender a língua local"], answer: "A má alimentação oferecida no palácio" }, // O texto foca na questão alimentar.
                { question: "Quem selecionou os jovens para serem auxiliares do rei?", options: ["O próprio rei Nabucodonosor", "Daniel", "O chefe dos eunucos, Aspenaz", "Um general do exército"], answer: "O chefe dos eunucos, Aspenaz" },
                { question: "Qual era o problema com a comida e bebida escolhidas pelo rei?", options: ["Era pouca comida", "Era comida estragada", "Era inapropriada, rica em gordura, pobre em fibras e com bebidas prejudiciais", "Era apenas comida vegetariana"], answer: "Era inapropriada, rica em gordura, pobre em fibras e com bebidas prejudiciais" }, // E provavelmente consagrada a ídolos.
                { question: "O que Daniel e seus amigos decidiram fazer em relação à comida do rei?", options: ["Comer e beber de tudo para agradar o rei", "Não comer a comida do rei e pedir apenas vegetais e água", "Comer escondido para ninguém ver", "Reclamar diretamente ao rei"], answer: "Não comer a comida do rei e pedir apenas vegetais e água" },
                { question: "O que eles propuseram ao cozinheiro (ou chefe responsável)?", options: ["Fugir do palácio", "Fazer um teste por dez dias com a dieta deles", "Pagar ao cozinheiro para lhes dar comida diferente", "Fazer greve de fome"], answer: "Fazer um teste por dez dias com a dieta deles" },
                { question: "Qual foi o resultado do teste de dez dias?", options: ["Eles ficaram mais fracos e doentes", "Eles ficaram iguais aos outros jovens", "Eles estavam mais fortes, saudáveis e bonitos que os outros", "O cozinheiro não permitiu o teste"], answer: "Eles estavam mais fortes, saudáveis e bonitos que os outros" },
                { question: "O que o rei percebeu sobre Daniel e seus amigos após o período de estudo?", options: ["Que eles eram rebeldes e desobedientes", "Que eles eram os mais fortes, saudáveis e inteligentes de todo o império", "Que eles não aprenderam nada", "Que eles queriam voltar para casa"], answer: "Que eles eram os mais fortes, saudáveis e inteligentes de todo o império" }, // 10x mais sábios.
                { question: "Qual é a primeira lição de Daniel e seus amigos?", options: ["Ser infiel a Cristo quando for conveniente", "Decidir ser fiel a Cristo e aos seus princípios", "Seguir os costumes locais, mesmo que errados", "Mudar de princípios conforme a situação"], answer: "Decidir ser fiel a Cristo e aos seus princípios" },
                { question: "Qual é a segunda lição, relacionada à saúde?", options: ["Comer de tudo sem restrição", "Alimentar-se corretamente (legumes, frutas, etc.) e beber muita água", "Comer apenas carne e gordura", "Beber muitos refrigerantes e bebidas fortes"], answer: "Alimentar-se corretamente (legumes, frutas, etc.) e beber muita água" },
                { question: "Qual é a terceira lição mencionada?", options: ["Ser preguiçoso nos estudos", "Ser esforçado nos estudos", "Colar nas provas", "Não dar importância à educação"], answer: "Ser esforçado nos estudos" },
                { question: "Qual o nome babilônico dado a Daniel? (Atividade 2)", options: ["Sadraque", "Mesaque", "Abede-Nego", "Beltessazar"], answer: "Beltessazar" },
                { question: "Qual o nome hebraico de Sadraque? (Atividade 3 - Resposta: Hananias)", options: ["Misael", "Azarias", "Daniel", "Hananias"], answer: "Hananias" },
                { question: "Qual o nome hebraico de Mesaque? (Atividade 1 - Resposta: Misael)", options: ["Hananias", "Azarias", "Daniel", "Misael"], answer: "Misael" },
                { question: "Qual o nome hebraico de Abede-Nego? (Atividade 4 - Resposta: Azarias)", options: ["Hananias", "Misael", "Daniel", "Azarias"], answer: "Azarias" },
                { question: "Quem era o rei da Babilônia na época? (Atividade 5)", options: ["Dario", "Ciro", "Nabucodonosor", "Belsazar"], answer: "Nabucodonosor" },
                { question: "Qual o nome do chefe dos eunucos que cuidou dos jovens? (Atividade 7)", options: ["Geazi", "Aspenaz", "Hamã", "Potifar"], answer: "Aspenaz" },
                { question: "A história de Daniel e seus amigos enfatiza a importância de:", options: ["Comprometer os princípios para sobreviver", "Manter a fidelidade a Deus mesmo em ambiente hostil e cuidar da saúde", "Buscar poder e influência a qualquer custo", "Isolar-se do mundo"], answer: "Manter a fidelidade a Deus mesmo em ambiente hostil e cuidar da saúde" }
            ]
        },
         {
            chapter: 7,
            title: "Alimento para uma multidão (Menino do Lanche)",
            videoId: "GibiAventura_VideoID_Cap7", // SUBSTITUA PELO ID REAL DO YOUTUBE
            questions: [
                { question: "Por que os discípulos estavam preocupados com a multidão?", options: ["Porque a multidão estava ficando barulhenta", "Porque estavam ouvindo Jesus há muito tempo sem comer", "Porque a multidão queria fazer Jesus rei à força", "Porque estava começando a chover"], answer: "Porque estavam ouvindo Jesus há muito tempo sem comer" },
                { question: "O que os discípulos sugeriram a Jesus?", options: ["Que Jesus continuasse pregando a noite toda", "Que Jesus mandasse a multidão embora para comprar comida", "Que Jesus pedisse comida aos ricos da multidão", "Que Jesus fizesse chover pão do céu"], answer: "Que Jesus mandasse a multidão embora para comprar comida" },
                { question: "Qual foi a resposta de Jesus à sugestão dos discípulos?", options: ["Concordou em mandar a multidão embora", "Disse que os próprios discípulos deveriam alimentá-los", "Ignorou a preocupação deles", "Pediu para esperarem até o dia seguinte"], answer: "Disse que os próprios discípulos deveriam alimentá-los" },
                { question: "Qual foi a reação dos discípulos à resposta de Jesus?", options: ["Ficaram felizes e confiantes", "Ficaram desconcertados, perguntando como fariam isso sem dinheiro ou comida", "Saíram imediatamente para comprar pão", "Começaram a recolher ofertas da multidão"], answer: "Ficaram desconcertados, perguntando como fariam isso sem dinheiro ou comida" },
                { question: "Quem apareceu neste momento com uma solução inesperada?", options: ["Um vendedor de pães", "Um pescador com muitos peixes", "Um pequeno herói, um garoto esperto e prevenido", "Uma mulher rica com um banquete"], answer: "Um pequeno herói, um garoto esperto e prevenido" },
                { question: "O que o pequeno herói tinha levado consigo?", options: ["Dinheiro para comprar comida", "Um pequeno lanche (cinco pães e dois peixinhos)", "Frutas e água", "Brinquedos para se distrair"], answer: "Um pequeno lanche (cinco pães e dois peixinhos)" },
                { question: "O que o menino fez com seu lanche?", options: ["Comeu tudo sozinho", "Escondeu para comer mais tarde", "Ofereceu seu lanchinho para Jesus", "Dividiu apenas com seus amigos"], answer: "Ofereceu seu lanchinho para Jesus" }, // Através de André.
                { question: "O que Jesus fez com os pães e peixes do menino?", options: ["Devolveu ao menino, agradecendo", "Dividiu entre os doze discípulos", "Abençoou e multiplicou o alimento", "Guardou para comer depois"], answer: "Abençoou e multiplicou o alimento" },
                { question: "Quantas pessoas foram alimentadas com o lanche multiplicado?", options: ["Cerca de 500 pessoas", "Cerca de 1.000 pessoas", "Mais de 5.000 pessoas (homens, sem contar mulheres e crianças)", "Apenas os discípulos"], answer: "Mais de 5.000 pessoas (homens, sem contar mulheres e crianças)" },
                { question: "O que aconteceu depois que todos comeram e ficaram satisfeitos?", options: ["A comida acabou exatamente", "Faltou comida para algumas pessoas", "Recolheram doze cestos cheios de sobras", "O menino pediu seu lanche de volta"], answer: "Recolheram doze cestos cheios de sobras" },
                { question: "Como Jesus se sentiu em relação à atitude do menino?", options: ["Indiferente", "Irritado por ser tão pouco", "Muito feliz por ele ter oferecido seu lanche", "Preocupado com o menino ficar com fome"], answer: "Muito feliz por ele ter oferecido seu lanche" }, // Implícito pelo uso do lanche.
                { question: "Qual é a primeira lição do \"menino do lanche\"?", options: ["Ser egoísta e não dividir", "Não ser egoísta e saber dividir com quem não tem", "Comer tudo rapidamente antes que alguém peça", "Guardar comida apenas para si mesmo"], answer: "Não ser egoísta e saber dividir com quem não tem" },
                { question: "Qual é a segunda lição mencionada?", options: ["Ser maldoso", "Ser bondoso", "Ser indiferente", "Ser vingativo"], answer: "Ser bondoso" },
                { question: "Qual é a terceira lição?", options: ["Ser descuidado e despreparado", "Ser prevenido", "Ser impulsivo", "Ser medroso"], answer: "Ser prevenido" },
                { question: "Qual é a quarta lição?", options: ["Entregar apenas o que sobra para Cristo", "Entregar tudo o que tem a Cristo", "Não entregar nada a Cristo", "Questionar antes de entregar algo a Cristo"], answer: "Entregar tudo o que tem a Cristo" },
                { question: "Qual o nome do discípulo que apresentou o menino a Jesus (João 6:8-9)? (Atividade NADÉR)", options: ["Pedro", "Tiago", "João", "André"], answer: "André" },
                { question: "Quantos pães o menino tinha? (Atividade ÃOP / CICNO)", options: ["Dois", "Cinco", "Sete", "Doze"], answer: "Cinco" },
                { question: "Quantos peixinhos o menino tinha? (Atividade IPEXE / ODIS)", options: ["Dois", "Cinco", "Sete", "Doze"], answer: "Dois" },
                { question: "A palavra MLUITÃOD desembaralhada é:", options: ["Milagre", "Comida", "Multidão", "Discípulo"], answer: "Multidão" },
                { question: "O que a história do menino do lanche ensina sobre pequenas ofertas nas mãos de Jesus?", options: ["Que pequenas ofertas são inúteis", "Que Jesus pode usar pequenas ofertas para fazer grandes coisas", "Que apenas grandes ofertas importam para Jesus", "Que devemos guardar nossas ofertas para nós mesmos"], answer: "Que Jesus pode usar pequenas ofertas para fazer grandes coisas" }
            ]
        },
         {
            chapter: 8,
            title: "Abençoados por Cristo (Crianças)",
            videoId: "GibiAventura_VideoID_Cap8", // SUBSTITUA PELO ID REAL DO YOUTUBE
            questions: [
                { question: "Por que os \"pequenos aventureiros\" estavam entusiasmados naquela manhã?", options: ["Porque iam brincar o dia todo", "Porque iam conhecer Jesus e ser abençoados por Ele", "Porque iam ganhar presentes", "Porque iam viajar para outra cidade"], answer: "Porque iam conhecer Jesus e ser abençoados por Ele" },
                { question: "Qual era a dificuldade inicial para chegar até Jesus?", options: ["O caminho era muito perigoso", "Jesus estava muito longe", "Tinham que andar alguns quilômetros", "Não sabiam onde Jesus estava"], answer: "Tinham que andar alguns quilômetros" }, // O texto não especifica, mas a outra dificuldade foi maior.
                { question: "Qual foi o maior problema quando chegaram perto de Jesus?", options: ["Jesus não estava lá", "Havia uma \"muralha\" de pessoas (adultos/discípulos) impedindo-os", "Começou a chover muito forte", "As crianças ficaram com medo de Jesus"], answer: "Havia uma \"muralha\" de pessoas (adultos/discípulos) impedindo-os" },
                { question: "Quem começou a reclamar dos pequenos heróis, dizendo que estavam atrapalhando?", options: ["O próprio Jesus", "Os fariseus e saduceus", "Os grandes heróis (discípulos) que ficavam perto de Jesus", "As próprias mães das crianças"], answer: "Os grandes heróis (discípulos) que ficavam perto de Jesus" },
                { question: "O que os discípulos pediram a Jesus em relação às mães e crianças?", options: ["Que Jesus as abençoasse rapidamente", "Que Jesus mandasse aquelas mães embora com os pequenos heróis", "Que Jesus contasse uma história para as crianças", "Que Jesus desse comida às crianças"], answer: "Que Jesus mandasse aquelas mães embora com os pequenos heróis" }, // Eles as repreenderam.
                { question: "Qual foi a reação de Jesus ao ver os discípulos impedindo as crianças?", options: ["Concordou com os discípulos", "Ficou indiferente", "Ficou aborrecido com os adultos e disse para deixarem as crianças irem a Ele", "Pediu para as crianças voltarem outro dia"], answer: "Ficou aborrecido com os adultos e disse para deixarem as crianças irem a Ele" },
                { question: "O que Jesus disse sobre as crianças?", options: ["Que elas eram barulhentas demais", "Que delas é o Reino dos Céus", "Que elas deveriam aprender a se comportar", "Que elas precisavam crescer para entender as coisas de Deus"], answer: "Que delas é o Reino dos Céus" },
                { question: "O que Jesus fez com as crianças?", options: ["Deu-lhes bronca", "Colocou-as no colo e as abençoou", "Mandou-as embora", "Deu-lhes tarefas para fazer"], answer: "Colocou-as no colo e as abençoou" },
                { question: "Como as mães e os pequenos heróis voltaram para casa naquele dia?", options: ["Tristes e decepcionados", "Felizes da vida por terem cumprido a missão e sido abençoados", "Cansados e irritados", "Com medo dos discípulos"], answer: "Felizes da vida por terem cumprido a missão e sido abençoados" },
                { question: "O que aconteceu com aqueles pequenos heróis depois?", options: ["Esqueceram-se de Jesus", "Tornaram-se inimigos dos discípulos", "Cresceram e se tornaram verdadeiros heróis de Cristo", "Afastaram-se da fé"], answer: "Cresceram e se tornaram verdadeiros heróis de Cristo" }, // Implícito pela lição final.
                { question: "Qual é a primeira lição das crianças que queriam ver Jesus?", options: ["Ter medo de se aproximar de Jesus", "Ter vontade de conhecer Jesus", "Achar que Jesus é só para adultos", "Esperar Jesus vir até você"], answer: "Ter vontade de conhecer Jesus" },
                { question: "Qual é a segunda lição?", options: ["Desistir de buscar Jesus quando há obstáculos", "Buscar Jesus", "Buscar outras pessoas em vez de Jesus", "Buscar Jesus apenas quando precisar de algo"], answer: "Buscar Jesus" },
                { question: "Qual é a terceira lição?", options: ["Não querer ser abençoado por Cristo", "Querer ser abençoado por Cristo", "Achar que não precisa da bênção de Cristo", "Ter vergonha de pedir a bênção de Cristo"], answer: "Querer ser abençoado por Cristo" },
                { question: "Qual sentimento um aventureiro de Deus NÃO pode ter, segundo a atividade (CAMEDODO)?", options: ["Coragem", "Medo", "Alegria", "Amor"], answer: "Medo" }, // Desembaralhado: MEDO COM DO
                { question: "Qual sentimento um aventureiro de Deus NÃO pode ter, segundo a atividade (BAORGULHOMO)?", options: ["Humildade", "Orgulho", "Simplicidade", "Modéstia"], answer: "Orgulho" }, // Desembaralhado: ORGULHO BAMO
                { question: "Qual sentimento um aventureiro de Deus NÃO pode ter, segundo a atividade (MEGOÍSMOFA)?", options: ["Generosidade", "Altruísmo", "Egoísmo", "Compartilhamento"], answer: "Egoísmo" }, // Desembaralhado: EGOÍSMO MFA
                { question: "Qual qualidade um pequeno herói PRECISA ter, segundo a atividade (MACORAGEMA)?", options: ["Covardia", "Coragem", "Temor", "Hesitação"], answer: "Coragem" }, // Desembaralhado: CORAGEM MA
                { question: "Qual qualidade um pequeno herói PRECISA ter, segundo a atividade (ZAHUMILDADEME)?", options: ["Arrogância", "Soberba", "Humildade", "Orgulho"], answer: "Humildade" }, // Desembaralhado: HUMILDADE ZAME
                { question: "Qual qualidade um pequeno herói PRECISA ter, segundo a atividade (LABONDADEQUE)?", options: ["Maldade", "Bondade", "Crueldade", "Indiferença"], answer: "Bondade" }, // Desembaralhado: BONDADE LAQUE
                { question: "O que a história ensina sobre o acesso das crianças a Jesus?", options: ["Que as crianças devem esperar ficar adultas para buscar Jesus.", "Que Jesus tem um lugar especial para as crianças e deseja abençoá-las.", "Que os discípulos estavam certos em proteger Jesus das crianças.", "Que as crianças não entendem as coisas espirituais."], answer: "Que Jesus tem um lugar especial para as crianças e deseja abençoá-las." }
            ]
        },
         {
            chapter: 9,
            title: "Salvo por Garoto (Sobrinho de Paulo)",
            videoId: "GibiAventura_VideoID_Cap9", // SUBSTITUA PELO ID REAL DO YOUTUBE
            questions: [
                { question: "A vida de quem estava em perigo neste capítulo?", options: ["Do centurião romano", "Do apóstolo Paulo", "Do sobrinho de Paulo", "Do governador Félix"], answer: "Do apóstolo Paulo" },
                { question: "Quem estava planejando tirar a vida dele?", options: ["Os soldados romanos", "Um grupo de homens fanáticos e malvados (judeus)", "Os discípulos de Paulo", "O rei Agripa"], answer: "Um grupo de homens fanáticos e malvados (judeus)" },
                { question: "Qual era o plano dos homens para matar Paulo?", options: ["Invadir a prisão durante a noite", "Envenenar a comida de Paulo", "Pedir ao centurião para trazer Paulo para interrogatório e matá-lo no caminho", "Contratar um assassino profissional"], answer: "Pedir ao centurião para trazer Paulo para interrogatório e matá-lo no caminho" },
                { question: "Por que esses homens estavam com tanta raiva de Paulo?", options: ["Porque Paulo lhes devia dinheiro", "Porque Paulo pregava a verdade e mostrava os erros deles", "Porque Paulo era um espião romano", "Porque Paulo havia roubado algo deles"], answer: "Porque Paulo pregava a verdade e mostrava os erros deles" },
                { question: "O que os homens juraram fazer enquanto não matassem Paulo?", options: ["Jejuariam e orariam", "Não comeriam nem beberiam nada", "Fugiriam da cidade", "Continuariam suas vidas normalmente"], answer: "Não comeriam nem beberiam nada" },
                { question: "Quem descobriu o plano dos assassinos?", options: ["O apóstolo Paulo", "O centurião romano", "Um pequeno herói misterioso, o sobrinho de Paulo", "Um dos próprios conspiradores que se arrependeu"], answer: "Um pequeno herói misterioso, o sobrinho de Paulo" },
                { question: "Onde estava o sobrinho de Paulo quando ouviu o plano?", options: ["Espiando pela janela da prisão", "Em um canto escondido, ouvindo a conversa", "Participando da reunião dos conspiradores", "Lendo uma carta sobre o plano"], answer: "Em um canto escondido, ouvindo a conversa" }, // A Bíblia não detalha, mas ele ouviu e contou.
                { question: "O que o sobrinho de Paulo fez depois de ouvir o plano?", options: ["Ficou com medo e não fez nada", "Saiu correndo para contar a Paulo e ao centurião", "Juntou-se aos conspiradores", "Tentou enfrentar os homens sozinho"], answer: "Saiu correndo para contar a Paulo e ao centurião" }, // Ele contou a Paulo, que pediu para levá-lo ao comandante.
                { question: "Qual foi a reação do centurião (comandante/tribuno) ao saber do plano?", options: ["Ignorou o aviso do rapaz", "Prendeu o sobrinho de Paulo", "Preparou um grupo de soldados para levar Paulo em segurança para outra prisão", "Decidiu libertar Paulo imediatamente"], answer: "Preparou um grupo de soldados para levar Paulo em segurança para outra prisão" },
                { question: "O que aconteceu com o plano dos assassinos?", options: ["Eles conseguiram matar Paulo", "O plano deu errado porque Paulo foi transferido", "Eles desistiram do plano", "O centurião prendeu todos os conspiradores"], answer: "O plano deu errado porque Paulo foi transferido" },
                { question: "Qual a principal característica demonstrada pelo sobrinho de Paulo?", options: ["Medo", "Coragem para dizer a verdade e salvar uma vida", "Curiosidade", "Habilidade de luta"], answer: "Coragem para dizer a verdade e salvar uma vida" },
                { question: "Qual é a primeira lição do sobrinho de Paulo?", options: ["Falar mentiras para se proteger", "Falar a verdade", "Ficar em silêncio sobre o perigo", "Exagerar a verdade"], answer: "Falar a verdade" },
                { question: "Qual é a segunda lição?", options: ["Ignorar as pessoas em perigo", "Estar sempre disposto a salvar as pessoas do perigo", "Salvar apenas os amigos", "Criar perigo para os outros"], answer: "Estar sempre disposto a salvar as pessoas do perigo" },
                { question: "Qual é a terceira lição?", options: ["Ser imprudente e descuidado", "Ser prudente", "Ser impulsivo", "Ser negligente"], answer: "Ser prudente" },
                { question: "Qual apóstolo ia ser morto na cilada, segundo a atividade 1?", options: ["Pedro", "Tiago", "João", "Paulo"], answer: "Paulo" },
                { question: "Quantas pessoas fizeram o juramento da conspiração, segundo a atividade 2?", options: ["Doze", "Vinte", "Trinta", "Quarenta (ou mais de quarenta, Atos 23:13)"], answer: "Quarenta (ou mais de quarenta, Atos 23:13)" },
                { question: "Qual parente avisou Paulo sobre a conspiração, segundo a atividade 3?", options: ["Irmão", "Primo", "Tio", "Sobrinho"], answer: "Sobrinho" },
                { question: "Qual era o cargo do líder dos soldados romanos que ouviu o aviso, segundo a atividade 4?", options: ["Tribuno (Comandante)", "Centurião", "Governador", "Soldado raso"], answer: "Tribuno (Comandante)" },
                { question: "Qual o nome do comandante (tribuno) que protegeu Paulo, segundo a atividade 6?", options: ["Cornélio", "Júlio", "Cláudio Lísias", "Sérgio Paulo"], answer: "Cláudio Lísias" },
                { question: "Qual o nome do governador para quem Paulo foi enviado, segundo a atividade 7?", options: ["Pilatos", "Herodes", "Félix", "Festo"], answer: "Félix" }
            ]
        },
         {
            chapter: 10,
            title: "Um pequeno Herói de Cristo (Você)",
            videoId: "GibiAventura_VideoID_Cap10", // SUBSTITUA PELO ID REAL DO YOUTUBE
            questions: [
                 { question: "Quem é o \"último aventureiro de Cristo\" apresentado neste capítulo?", options: ["Um personagem bíblico desconhecido", "O autor do livro", "O leitor do livro (Você)", "Um anjo"], answer: "O leitor do livro (Você)" },
                 { question: "O que se sabe sobre a identidade desse herói (nome, pais, cidade)?", options: ["Todos os detalhes são conhecidos", "Nada é conhecido especificamente, pois pode ser qualquer leitor", "Sabe-se apenas o nome", "Sabe-se apenas a cidade"], answer: "Nada é conhecido especificamente, pois pode ser qualquer leitor" },
                 { question: "Segundo o texto, esse herói é real ou fictício?", options: ["Fictício, como os super-heróis", "Real", "Uma mistura de real e fictício", "Depende da imaginação do leitor"], answer: "Real" },
                 { question: "Onde esse pequeno herói pode ser encontrado?", options: ["Apenas em histórias antigas", "Em sua família, ou lendo/ouvindo o livro agora", "Somente no céu", "Em países distantes"], answer: "Em sua família, ou lendo/ouvindo o livro agora" },
                 { question: "Qual a primeira característica listada para reconhecer esse herói?", options: ["Ignora as pessoas", "Cuida das pessoas, principalmente dos irmãos", "Briga com os irmãos", "Pensa apenas em si mesmo"], answer: "Cuida das pessoas, principalmente dos irmãos" },
                 { question: "Qual a segunda característica?", options: ["Não ouve a voz de Jesus", "Sabe ouvir a voz de Jesus e cumpre Sua vontade", "Segue a própria vontade", "Ouve a voz de Jesus, mas não obedece"], answer: "Sabe ouvir a voz de Jesus e cumpre Sua vontade" },
                 { question: "Qual a terceira característica?", options: ["Não tem coragem para lutar por Jesus", "Tem coragem para lutar em nome de Jesus", "Luta contra Jesus", "É covarde"], answer: "Tem coragem para lutar em nome de Jesus" },
                 { question: "Qual a quarta característica?", options: ["Não tem fé em Deus", "Tem fé em Deus e procura testemunhar Dele", "Tem vergonha de falar de Deus", "Duvida do poder de Deus"], answer: "Tem fé em Deus e procura testemunhar Dele" },
                 { question: "Qual a quinta característica?", options: ["Não ajuda na casa de Deus", "Tem disposição para ajudar a construir ou reformar a casa de Deus", "Atrapalha os trabalhos na casa de Deus", "Critica a casa de Deus"], answer: "Tem disposição para ajudar a construir ou reformar a casa de Deus" },
                 { question: "Qual a sexta característica?", options: ["Não lê a Bíblia", "Lê a Bíblia e segue seus ensinamentos", "Lê a Bíblia, mas não segue", "Acha a Bíblia chata"], answer: "Lê a Bíblia e segue seus ensinamentos" },
                 { question: "Qual a sétima característica, relacionada à saúde?", options: ["Alimenta-se mal e não bebe água", "Alimenta-se corretamente e tem princípios de saúde", "Come apenas doces e frituras", "Não se preocupa com a saúde"], answer: "Alimenta-se corretamente e tem princípios de saúde" },
                 { question: "Qual a oitava característica, relacionada ao compartilhamento?", options: ["É egoísta e não divide o lanche", "Não é egoísta, gosta de dividir e ama ajudar o próximo", "Pega o lanche dos outros", "Ajuda o próximo apenas por interesse"], answer: "Não é egoísta, gosta de dividir e ama ajudar o próximo" },
                 { question: "Qual a nona característica?", options: ["Evita conhecer Jesus", "Procura conhecer Jesus e quer ser abençoado por Ele", "Acha que não precisa de Jesus", "Tem medo de Jesus"], answer: "Procura conhecer Jesus e quer ser abençoado por Ele" },
                 { question: "Qual a décima característica?", options: ["É imprudente e fala mentiras", "É prudente e fala a verdade", "Fala a verdade só às vezes", "É imprudente e fala mal dos outros"], answer: "É prudente e fala a verdade" },
                 { question: "O que o texto diz se você percebeu que tem algumas dessas qualidades?", options: ["Que você precisa mudar tudo", "Que você acabou de descobrir mais um pequeno herói de Cristo: É você!", "Que essas qualidades não são importantes", "Que você ainda não é um herói"], answer: "Que você acabou de descobrir mais um pequeno herói de Cristo: É você!" },
                 { question: "O que o texto sugere se você acha que não tem nenhuma das qualidades?", options: ["Que você deve desistir", "Ler novamente, pois algumas características podem se aplicar, e sempre há tempo para mudar", "Que você nunca será um herói", "Que você deve procurar outro livro"], answer: "Ler novamente, pois algumas características podem se aplicar, e sempre há tempo para mudar" },
                 { question: "Qual a recompensa final para os pequenos heróis de Cristo?", options: ["Fama e fortuna na Terra", "Poder sobre os outros", "A vida eterna", "Uma estátua em sua homenagem"], answer: "A vida eterna" },
                 { question: "O que o \"comando central do Espírito Santo\" pode fazer a qualquer momento?", options: ["Criticar o pequeno herói", "Chamar você para uma nova missão", "Dar férias ao pequeno herói", "Ignorar o pequeno herói"], answer: "Chamar você para uma nova missão" },
                 { question: "Qual destas palavras NÃO é uma qualidade do aventureiro de Cristo, segundo a atividade?", options: ["Amor", "Paciência", "Inveja", "Coragem"], answer: "Inveja" }, // A inveja é um sentimento negativo, oposto às virtudes cristãs.
                 { question: "O que é necessário fazer para se tornar um herói de Cristo, segundo a conclusão do livro?", options: ["Ter superpoderes", "Ser fiel a Deus, orar, ler a Bíblia, ir à igreja, pregar e seguir as instruções do Espírito Santo", "Ser famoso e rico", "Nascer com um destino heróico"], answer: "Ser fiel a Deus, orar, ler a Bíblia, ir à igreja, pregar e seguir as instruções do Espírito Santo" }
            ]
        },
    ];

    // --- Variáveis de Estado do Quiz (permanecem as mesmas) ---
    let currentQuizData = null;
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let timerInterval = null;
    let timeLeft = 60; // Tempo por pergunta (ou total, ajustar lógica se necessário)
    const TIME_PER_QUESTION = 60; // Segundos por pergunta

    // --- Funções (shuffleArray, loadQuizSelection, handleChapterSelection, etc. permanecem as mesmas) ---

    // Função para embaralhar um array (Algoritmo Fisher-Yates)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Troca elementos
        }
        return array;
    }

    // Função para carregar a seleção de quizzes na tela inicial
    function loadQuizSelection() {
        quizSelectionContainer.innerHTML = ''; // Limpa container
        quizzesData.forEach(quiz => {
            const button = document.createElement('button');
            button.classList.add('btn');
            button.textContent = `Cap. ${quiz.chapter}: ${quiz.title}`;
            button.dataset.chapter = quiz.chapter; // Armazena o capítulo no botão
            button.addEventListener('click', handleChapterSelection);
            quizSelectionContainer.appendChild(button);
        });
    }

    // Função chamada ao clicar em um capítulo
    function handleChapterSelection(event) {
        const chapterNumber = parseInt(event.target.dataset.chapter);
        currentQuizData = quizzesData.find(quiz => quiz.chapter === chapterNumber);

        if (currentQuizData) {
            // Prepara e mostra o modal do vídeo
            videoChapterNumberSpan.textContent = currentQuizData.chapter;
            // Incorpora o vídeo do YouTube (simples iframe por enquanto)
            // LEMBRE-SE DE SUBSTITUIR OS IDs ABAIXO PELOS REAIS!
            youtubePlayerDiv.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${currentQuizData.videoId || 'dQw4w9WgXcQ'}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`; // Adicionei um videoId de fallback
            // Mostra o Modal
            videoModal.classList.add('show');
        } else {
            console.error("Dados do quiz não encontrados para o capítulo:", chapterNumber);
        }
    }

     // Função para fechar o Modal
     function closeModal() {
        videoModal.classList.remove('show');
        // Para o vídeo ao fechar
         youtubePlayerDiv.innerHTML = ''; // Remove o iframe para parar o vídeo
     }

    // Função para iniciar o quiz após ver o vídeo
    function startQuiz() {
        closeModal(); // Fecha o modal caso ainda esteja aberto

        // Verifica se há perguntas suficientes
        if (!currentQuizData || !currentQuizData.questions || currentQuizData.questions.length === 0) {
            console.error("Não há perguntas disponíveis para este capítulo.");
            alert("Erro: Não há perguntas para este capítulo. Por favor, escolha outro.");
            switchScreen(homeScreen); // Volta para a tela inicial
            return; // Impede a continuação
        }


        // Seleciona 10 perguntas aleatórias do banco de questões do capítulo
        // Se houver menos de 10, usa todas as disponíveis
        const numberOfQuestionsToSelect = Math.min(10, currentQuizData.questions.length);
        currentQuestions = shuffleArray([...currentQuizData.questions]).slice(0, numberOfQuestionsToSelect);

        // Verifica novamente se, após o slice, há perguntas
         if (currentQuestions.length === 0) {
            console.error("Erro ao selecionar perguntas aleatórias.");
            alert("Erro ao carregar as perguntas. Tente novamente.");
            switchScreen(homeScreen);
            return;
        }


        currentQuestionIndex = 0;
        score = 0;
        scoreSpan.textContent = `Pontos: ${score}`;
        feedbackDiv.textContent = '';
        feedbackDiv.className = 'feedback'; // Reseta classes do feedback

        // Transição de tela
        switchScreen(quizScreen);

        quizTitle.textContent = `Quiz Capítulo ${currentQuizData.chapter}: ${currentQuizData.title}`;
        loadQuestion();
    }

    // Função para carregar a pergunta atual
    function loadQuestion() {
        // Verifica se ainda há perguntas e se o índice é válido
        if (currentQuestionIndex < currentQuestions.length && currentQuestions[currentQuestionIndex]) {
            const questionData = currentQuestions[currentQuestionIndex];
            questionText.textContent = questionData.question;
            optionsContainer.innerHTML = ''; // Limpa opções anteriores


            // Embaralha as opções para variar a posição da resposta correta
            const shuffledOptions = shuffleArray([...questionData.options]);

            shuffledOptions.forEach(option => {
                const button = document.createElement('button');
                button.classList.add('option-btn');
                button.textContent = option;
                button.addEventListener('click', handleAnswerSelection);
                optionsContainer.appendChild(button);
            });

            // Atualiza contador e barra de progresso
             const progressPercentage = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
            progressBar.style.width = `${progressPercentage}%`;
            questionCounterSpan.textContent = `Pergunta ${currentQuestionIndex + 1}/${currentQuestions.length}`;


            // Inicia o timer para a pergunta
            startTimer();
        } else {
             // Se não houver mais perguntas válidas, encerra o quiz.
            console.log("Fim das perguntas ou índice inválido. Mostrando resultados.");
            showResults();
        }
    }

    // Função para iniciar o contador de tempo
    function startTimer() {
        clearInterval(timerInterval); // Limpa timer anterior
        timeLeft = TIME_PER_QUESTION;
        timerSpan.textContent = `Tempo: ${timeLeft}s`;
        timerSpan.style.color = 'var(--text-color)'; // Reset color
        timerSpan.style.fontWeight = 'normal'; // Reset font weight

        timerInterval = setInterval(() => {
            timeLeft--;
            timerSpan.textContent = `Tempo: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                handleTimeOut();
            }
             // Piscar quando o tempo estiver acabando (ex: 10 segundos)
            if (timeLeft <= 10 && timeLeft > 0) { // Evita piscar no 0
                timerSpan.style.color = timeLeft % 2 === 0 ? 'var(--incorrect-color)' : 'var(--text-color)';
                timerSpan.style.fontWeight = 'bold';
            }

        }, 1000);
    }

    // Função chamada quando o tempo da pergunta acaba
    function handleTimeOut() {
        feedbackDiv.textContent = "Tempo esgotado!";
        feedbackDiv.className = 'feedback incorrect'; // Usa a classe de erro
        disableOptions();
        playSound(errorSound);

        // Pausa antes de ir para a próxima pergunta
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 1500); // Espera 1.5 segundos
    }

    // Função chamada ao clicar em uma opção de resposta
    function handleAnswerSelection(event) {
        clearInterval(timerInterval); // Para o timer da pergunta
        disableOptions(); // Desabilita outros cliques

        const selectedButton = event.target;
        const selectedAnswer = selectedButton.textContent;
        const correctAnswer = currentQuestions[currentQuestionIndex].answer;

        if (selectedAnswer === correctAnswer) {
            // Resposta Correta
            score += 10 + Math.max(0, timeLeft); // Pontos base + bônus de tempo
            selectedButton.classList.add('correct');
            feedbackDiv.textContent = "Correto!";
            feedbackDiv.className = 'feedback correct';
            playSound(correctSound);
        } else {
            // Resposta Incorreta
            selectedButton.classList.add('incorrect');
            feedbackDiv.textContent = `Errado! A resposta era: ${correctAnswer}`;
            feedbackDiv.className = 'feedback incorrect';
            playSound(errorSound);

            // Destacar a resposta correta também
            Array.from(optionsContainer.children).forEach(button => {
                if (button.textContent === correctAnswer) {
                    // Adiciona a classe correta, mas não desabilita novamente (já está)
                    // Evita sobrescrever a classe 'incorrect' do botão clicado, se for o caso
                    if (!button.classList.contains('incorrect')) {
                         button.classList.add('correct');
                    }
                }
            });
        }

        scoreSpan.textContent = `Pontos: ${score}`;

        // Pausa antes de ir para a próxima pergunta
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 2000); // Espera 2 segundos para ver o feedback
    }

    // Função para desabilitar os botões de opção
    function disableOptions() {
        Array.from(optionsContainer.children).forEach(button => {
            button.disabled = true;
            button.classList.add('disabled'); // Adiciona classe para estilização opcional
            // Remove event listener para garantir que não haja cliques duplos
            button.removeEventListener('click', handleAnswerSelection);
        });
    }

     // Função segura para tocar sons (evita erros se o áudio não carregar)
    function playSound(sound) {
        if (sound && typeof sound.play === 'function') {
            sound.play().catch(error => console.error("Erro ao tocar som:", error));
        }
    }


    // Função para mostrar a tela de resultados
    function showResults() {
        clearInterval(timerInterval); // Garante que o timer parou
        switchScreen(resultsScreen);

        // Garante que currentQuizData existe antes de acessar propriedades
        if (currentQuizData) {
            resultChapterTitle.textContent = `${currentQuizData.chapter}: ${currentQuizData.title}`;
            finalScoreSpan.textContent = score;

            // Lógica do Ranking Local (LocalStorage)
            const highScoreKey = `quizHighScore_chapter${currentQuizData.chapter}`;
            const currentHighScore = parseInt(localStorage.getItem(highScoreKey) || "0");

            if (score > currentHighScore) {
                localStorage.setItem(highScoreKey, score.toString());
                highScoreSpan.textContent = score; // Novo recorde!
                highScoreSpan.innerHTML += ' <span style="color: var(--correct-color); font-weight: bold;">(Novo Recorde!)</span>'; // Feedback visual
            } else {
                highScoreSpan.textContent = currentHighScore;
            }
        } else {
             // Caso algo dê errado e currentQuizData seja nulo
            resultChapterTitle.textContent = "Erro - Capítulo não definido";
            finalScoreSpan.textContent = score;
            highScoreSpan.textContent = "N/A";
            console.error("currentQuizData está nulo ao mostrar resultados.");
        }
    }

     // Função para trocar entre as telas com animação
    function switchScreen(targetScreen) {
        // Esconde todas as telas ativas
        document.querySelectorAll('.screen.active').forEach(screen => {
            screen.classList.remove('active');
        });
         // Adiciona a classe ativa à tela alvo DEPOIS que as outras foram desativadas
         // Isso garante que a transição CSS funcione corretamente
         setTimeout(() => {
              targetScreen.classList.add('active');
              window.scrollTo(0, 0); // Resetar scroll
         }, 50); // Pequeno delay para permitir que a remoção da classe 'active' ocorra
    }

    // --- Event Listeners ---
    closeModalButton.addEventListener('click', closeModal);
    startQuizButton.addEventListener('click', startQuiz);

    tryAgainButton.addEventListener('click', () => {
         // Reinicia o quiz do *mesmo* capítulo, se currentQuizData ainda estiver definido
         if (currentQuizData) {
             startQuiz(); // Re-inicia a lógica do quiz selecionado
         } else {
             console.error("Não é possível tentar novamente: dados do quiz não definidos.");
             switchScreen(homeScreen); // Volta para casa como fallback
         }
    });

    backHomeButton.addEventListener('click', () => {
        // Volta para a tela de seleção de capítulos
         switchScreen(homeScreen);
         currentQuizData = null; // Reseta o quiz atual ao voltar para casa
    });

    // --- Inicialização ---
    loadQuizSelection();
    // Garante que a tela inicial é a ativa e as outras não no carregamento
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    homeScreen.classList.add('active');


});