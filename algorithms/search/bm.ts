import { Search } from './models';

interface CharTable {
    [key: string]: number;
}

class SymbolTable {
    private max: number;
    private table: CharTable = {};

    constructor(sub: string) {
        this.max = sub.length;

        for (let i = 0; i < this.max; i++) {
            const d = this.max - i - 1;
            const c = sub[i];

            this.table[c] = d;
        }
    }

    public getFromChar(c: string): number {
        return this.table[c] || this.max;
    }
}

export class BMSearch implements Search {

    indexOf(text: string, sub: string): number | undefined {
        const tl = text.length;
        const sl = sub.length;

        if (sl > tl) return undefined;

        const table = new SymbolTable(sub);

        let i = sl;
        let j = sl;
        let k = 0;

        do {
            j = sl;
            k = i;

            do {
                k = k - 1;
                j = j - 1;
            } while (j > 0 && text[k - 1] === sub[j - 1]);

            const unmatched = text[i - 1];
            i = i + table.getFromChar(unmatched);
        } while (i <= tl && j > 0);

        if (j <= 0) {
            return k;
        }

        return undefined;
    }
}
