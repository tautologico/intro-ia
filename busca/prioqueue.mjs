//
// Implementa um min-heap
// (uma arvore binaria em que o menor elemento sempre esta na raiz)
//
// Elementos devem ser objetos que sao comparados pela propriedade value
//
export class MinHeap {
    constructor() {
        this.contents = [];
        this.capacity = 0;
        this.size = 0;
    }

    // obtem o indice do no pai do no de numero i
    pai(i) {
        return Math.floor((i - 1) / 2);
    }

    // obtem o indice do filho esquerdo do no de numero i
    filhoEsquerdo(i) {
        return i * 2 + 1;
    }

    // obtem o indice do filho direito do no de numero i
    filhoDireito(i) {
        return i * 2 + 2;
    }

    // troca o conteudo de dois nos do heap, com indices i e j
    swapNodes(i, j) {
        let temp = this.contents[i];
        this.contents[i] = this.contents[j];
        this.contents[j] = temp;
    }

    // reestabelece a ordem do heap, assumindo que os filhos do
    // no de numero i estao corretos, mas o no i pode ser maior
    // que um de seus filhos
    minHeapify(i) {
        let l = this.filhoEsquerdo(i);
        let r = this.filhoDireito(i);

        // encontra qual o menor dos tres nos: i, l ou r
        let min = i;

        if (l < this.size && this.contents[i].value > this.contents[l].value) {
            min = l;
        }

        if (r < this.size && this.contents[min].value > this.contents[r].value) {
            min = r;
        }

        // se i nao for o menor no, troca de lugar com o menor e continua
        // recursivamente
        if (min !== i) {
            this.swapNodes(i, min);
            this.minHeapify(min);
        }
    }

    // adiciona nos com valores simples no heap
    // apenas para testes
    adicionaValores(...vals) {
        for (let v of vals) {
            this.contents.push(noComValor(v));
            this.size += 1;
            this.capacity += 1;
        }
    }
}

// funcoes utilitarias para ajudar nos testes
function noComValor(v) {
    return { value: v };
}
