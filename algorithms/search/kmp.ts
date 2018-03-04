import { Search } from './models';

interface IndexTable {
    [key: number]: number;
}

export class KmpSearch implements Search {

    private index(sub: string): IndexTable {

        const table: IndexTable = {};
        const len = sub.length - 1;
        let j = 0;
        let k = -1;

        table[0] = -1;

        while (j < len) {
            while (k >= 0 && sub[j] !== sub[k]) {
                k = table[k];
            }

            j = j + 1;
            k = k + 1;

            if (sub[j] === sub[k]) {
                table[j] = table[k];
            } else {
                table[j] = k;
            }
        }

        return table;
    }

    private searchIndex(text: string, sub: string, index: IndexTable): number | undefined {
        const tlen = text.length;
        const slen = sub.length;

        let i = 0;
        let j = 0;

        while (i < tlen && j < slen) {
            while (j >= 0 && text[i] !== sub[j]) {
                j = index[j];
            }

            i = i + 1;
            j = j + 1;

            if (j === slen) {
                return i - j;
            }
        }

        return undefined;
    }

    indexOf(text: string, sub: string): number | undefined {
        const prefixes = this.index(sub);
        return this.searchIndex(text, sub, prefixes);
    }
}
