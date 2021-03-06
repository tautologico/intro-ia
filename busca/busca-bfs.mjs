// funcao auxiliar criada para ajudar a especificar acoes
function acao(destino, custo) {
    return { destino: destino, custo: custo };
}

export let estadosRomenia = [
    {
        estado: 'Arad',
        acoes: [ acao('Zerind', 75), acao('Sibiu', 140), acao('Timisoara', 118) ]
    },

    {
        estado: 'Zerind',
        acoes: [ acao('Arad', 75), acao('Oradea', 71) ]
    },

    {
        estado: 'Timisoara',
        acoes: [ acao('Arad', 118), acao('Lugoj', 111) ]
    },

    {
        estado: 'Sibiu',
        acoes: [ acao('Arad', 140), acao('Oradea', 151), acao('Fagaras', 99),
                 acao('Rimnicu Vilcea', 80)]
    },

    {
        estado: 'Oradea',
        acoes: [ acao('Zerind', 71), acao('Sibiu', 151) ]
    },

    {
        estado: 'Lugoj',
        acoes: [ acao('Timisoara', 111), acao('Mehadia', 70) ]
    },

    {
        estado: 'Mehadia',
        acoes: [ acao('Lugoj', 70), acao('Drobeta', 75) ]
    },

    {
        estado: 'Drobeta',
        acoes: [ acao('Mehadia', 75), acao('Craiova', 120) ]
    },

    {
        estado: 'Craiova',
        acoes: [ acao('Drobeta', 120), acao('Rimnicu Vilcea', 146), acao('Pitesti', 138) ]
    },

    {
        estado: 'Rimnicu Vilcea',
        acoes: [ acao('Sibiu', 80), acao('Craiova', 146), acao('Pitesti', 97) ]
    },

    {
        estado: 'Fagaras',
        acoes: [ acao('Sibiu', 99), acao('Bucharest', 211) ]
    },

    {
        estado: 'Pitesti',
        acoes: [ acao('Rimnicu Vilcea', 97), acao('Craiova', 138), acao('Bucharest', 101) ]
    },

    {
        estado: 'Giurgiu',
        acoes: [ acao('Bucharest', 90) ]
    },

    {
        estado: 'Bucharest',
        acoes: [ acao('Fagaras', 211), acao('Pitesti', 101), acao('Giurgiu', 90),
                 acao('Urziceni', 85) ]
    },

    {
        estado: 'Urziceni',
        acoes: [ acao('Bucharest', 85), acao('Vaslui', 142), acao('Hirsova', 98) ]
    },

    {
        estado: 'Hirsova',
        acoes: [ acao('Urziceni', 98), acao('Eforie', 86) ]
    },

    {
        estado: 'Eforie',
        acoes: [ acao('Hirsova', 86) ]
    },

    {
        estado: 'Vaslui',
        acoes: [ acao('Urziceni', 142), acao('Iasi', 92) ]
    },

    {
        estado: 'Iasi',
        acoes: [ acao('Vaslui', 92), acao('Neamt', 87) ]
    },

    {
        estado: 'Neamt',
        acoes: [ acao('Iasi', 87) ]
    }
];


export class No {
    constructor(estado, custo, pai, acao) {
        this.estado = estado;
        this.custo = custo;
        this.pai = pai;
        this.acao = acao;
    }

    toString() {
        return `(${this.estado}, ${this.custo})`;
    }

    filhos(problema) {
        let estado_acoes = problema.espacoEstados.find(ea => this.estado == ea.estado);

        if (!estado_acoes)
            return [];

        let resultado = [];
        for (acao of estado_acoes.acoes) {
            let novoNo = new No(acao.destino, this.custo + acao.custo, this,
                                acao.destino);
            resultado.push(novoNo);
        }

        return resultado;
    }

    constroiSolucao() {
        let no = this;
        let solucao = [];

        while (no != null) {
            solucao.unshift(no);  // adiciona no na frente da solucao
            no = no.pai;
        }

        return solucao;
    }
}

export class Problema {
    constructor(inicial, objetivo, espacoEstados) {
        this.inicial = inicial;
        this.objetivo = objetivo;
        this.espacoEstados = espacoEstados;
    }
}

// constantes para situacao atual da busca
const BUSCA_INICIANDO = 0;
const BUSCA_EM_CURSO = 1;
const BUSCA_FALHA = 2;
const BUSCA_SUCESSO = 3;

export class BuscaLargura {
    constructor(problema) {
        this.problema = problema;
        this.fronteira = [problema.inicial];
        this.visitados = [problema.inicial.estado];
        this.situacao = BUSCA_INICIANDO;
        this.solucao = [];
    }

    efetuarBusca() {
        while (this.situacao != BUSCA_FALHA && this.situacao != BUSCA_SUCESSO) {
            this.passoBusca();
        }

        if (this.situacao == BUSCA_FALHA) {
            console.log("Busca falhou");
        } else {
            console.log("Solucao encontrada: ");
            console.log(this.mostraSolucao());
        }
    }

    passoBusca() {
        if (this.situacao == BUSCA_FALHA) {
            console.log("Busca falhou");
            return;
        }

        if (this.situacao == BUSCA_SUCESSO) {
            console.log("Busca encontrou a solucao");
            return;
        }

        let no = this.fronteira.shift();

        if (!no) {
            this.situacao = BUSCA_FALHA;
            return;
        }

        console.log('no atual: estado ' + no.estado + ' - custo: ' + no.custo);

        if (this.problema.objetivo(no)) {
            this.solucao = no.constroiSolucao();
            this.situacao = BUSCA_SUCESSO;
            return;
        }

        for (let filho of no.filhos(this.problema)) {
            if (!this.fronteira.includes(filho) && !this.visitado(filho.estado)) {
                this.fronteira.push(filho);
                this.visitados.push(filho.estado);
            }
        }
    }

    visitado(estado) {
        return this.visitados.includes(estado);
    }

    mostraSolucao() {
        return this.solucao.map(n => String(n)).join(' -> ') +
            ` | Custo: ${this.solucao[this.solucao.length - 1].custo}`;
    }

    mostraFronteira() {
        return '[' + this.fronteira.map(n => String(n)).join(" ") + ']';
    }
}

let no_arad = new No('Arad', 0, null, null);

export let problemaRomenia = new Problema(no_arad,
                                          no => no.estado == 'Bucharest',
                                          estadosRomenia);
