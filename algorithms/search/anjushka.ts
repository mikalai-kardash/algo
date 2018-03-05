import { Search } from './models';

export class AnjushkaSearch implements Search {
    indexOf(s: string, p: string): number | undefined {
        let i = 0;
        let j = 0;
        let k = 0;
        let t = 0;
        let matchIndex = -1;

        for (i = 0; i < s.length;) {
            matchIndex = -1;
            for (j = 0; j < p.length; j++) {
                if (s[i + j] === p[j]) {
                    if (j === 0) matchIndex = i;
                    if (i > 0) {
                        if (p[t] === s[i + j]) {
                            k = i + j - t;
                            t = t + 1;
                        } else {
                            t = 0;
                            k = j;
                        }
                    }
                } else {
                    i = i + k;
                    break;
                }
            }

            if (j === p.length) return matchIndex;
        }

        return undefined;
    }
}
