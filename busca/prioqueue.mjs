//
// Implementa um min-heap
// (uma arvore binaria em que o menor elemento sempre esta na raiz)
//
// Elementos devem ser objetos que sao comparados pela propriedade f
//
// Ref.: "Introduction to Algorithms" - Cormen, Leiserson, Rivest & Stein
// 3rd edition, MIT Press, 2009.
//
export class MinHeap {
    constructor() {
        this.contents = [];
        this.capacity = 0;
        this.size = 0;
    }

    // remove o menor elemento do heap e reestabelece a ordem correta
    removeMin() {
        if (this.size < 1)
            return null;

        // guarda o menor elemento e coloca o ultimo elemento na raiz
        let min = this.contents[0];
        this.contents[0] = this.contents[this.size-1];
        this.size -= 1;

        // chama minHeapify para reestabelecer a propriedade do minheap
        this.minHeapify(0);

        return min;
    }

    adiciona(no) {
        let indice = this.size;
        if (this.capacity == this.size) {
            this.contents.push(no);
            this.capacity += 1;
        }
        this.insertNode(indice, no);
        this.size += 1;
    }


    // --- Metodos internos --------------------------------

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

        if (l < this.size && this.contents[i].f > this.contents[l].f) {
            min = l;
        }

        if (r < this.size && this.contents[min].f > this.contents[r].f) {
            min = r;
        }

        // se i nao for o menor no, troca de lugar com o menor e continua
        // recursivamente
        if (min !== i) {
            this.swapNodes(i, min);
            this.minHeapify(min);
        }
    }

    // insere um no e procura o local correto para ele no heap
    insertNode(i, node) {
        this.contents[i] = node;
        while (i > 0 && this.contents[this.pai(i)].f > this.contents[i].f) {
            this.swapNodes(i, this.pai(i));
            i = this.pai(i);
        }
    }

    // adiciona nos com valores simples no heap
    // apenas para testes
    adicionaValores(...vals) {
        for (let v of vals) {
            this.contents.push({ f: v });
            this.size += 1;
            this.capacity += 1;
        }
    }
}


// uma fila de prioridade que retorna os nos de valor minimo primeiro
export class PriorityQueue {
    constructor() {
        this.heap = new Heap();
    }

    removeMin() {
        return this.heap.removeMin();
    }

    adiciona(no) {
        this.heap.adiciona(no);
    }
}


// ordena um array de numeros em ordem crescente.
// coloca os elementos do array original em um heap, e remove
// os itens na ordem, colocando no array result
export function heapSort(a) {
    let heap = new MinHeap();

    for (let v of a) {
        heap.adiciona({ f: v });
    }

    let result = [];
    while (heap.size > 0) {
        let n = heap.removeMin();
        result.push(n.f);
    }

    return result;
}
