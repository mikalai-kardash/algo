import { expect } from 'chai';
import { Search } from './models';
import { SlowSearch } from './slow';

describe('search api', () => {

    const slow: Search = new SlowSearch();

    const finds = (text: string, val: string, expectedIndex: number | undefined): void => {
        const ix = slow.indexOf(text, val);
        expect(expectedIndex).to.eq(ix);
    };

    describe('success', () => {

        it('finds itself', () => {
            finds('self', 'self', 0);
        });

        it('eq to 0 when starts from substring', () => {
            finds('self-made', 'self', 0);
        });

        it('finds string', () => {
            finds('elbow mellon', 'w m', 4);
        });

        it('finds text in the end', () => {
            finds('elbow mellon', 'llon', 8);
        });

    });

    describe('undefined', () => {
        it('when string is larger than text', () => {
            finds('asdf', 'asdf+', undefined);
        });

        it('cannot find string', () => {
            finds('1', '2', undefined);
        });
    });

});
