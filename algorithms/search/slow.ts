import { Search } from './models';

export class SlowSearch implements Search {
    indexOf(text: string, sub: string): number | undefined {

        if (typeof text === 'undefined') return undefined;
        if (typeof sub === 'undefined') return undefined;

        const textLength = text.length;
        const subLength = sub.length;

        if (textLength < subLength) return undefined;

        let i = 0,
            j = 0,
            found = false;

        for (; i < textLength; i++) {
            found = true;

            for (j = 0; j < subLength; j++) {
                if (text[i + j] !== sub[j]) {
                    found = false;
                    break;
                }
            }

            if (found) {
                return i;
            }
        }

        return undefined;
    }
}
