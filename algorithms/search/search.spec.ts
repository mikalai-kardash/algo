import { expect } from 'chai';
import { Search } from './models';
import { SlowSearch } from './slow';
import { KmpSearch } from './kmp';

describe('search api', () => {

    describe('slow', () => {
        const slow: Search = new SlowSearch();

        const finds = (text: string, val: string, expectedIndex: number | undefined): void => {
            const ix = slow.indexOf(text, val);
            expect(ix).to.eq(expectedIndex);
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

    describe('kmp', () => {

        const kmp: Search = new KmpSearch();

        const finds = (text: string, val: string, expectedIndex: number | undefined): void => {
            const ix = kmp.indexOf(text, val);
            expect(ix).to.eq(expectedIndex);
        };

        const self = 'self';

        const pattern1 = 'cabaabaaaabaabaaab';
        const value1 = 'aabaaba';

        describe('success', () => {

            it('finds itself', () => {
                finds('self', 'self', 0);
            });

            it(`finds '${value1}' within '${pattern1}'`, () => {
                finds('cabaabaaaabaabaaab', 'aabaaba', 8);
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

});
