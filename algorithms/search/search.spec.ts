import { expect } from 'chai';
import { Search } from './models';
import { SlowSearch } from './slow';
import { KmpSearch } from './kmp';
import { AnjushkaSearch } from './anjushka';
import { BMSearch } from './bm';

interface TestCase {
    text: string;
    sub: string;
    result: number | undefined;
}

interface SearchAlgorithm {
    search: Search;
    name: string;
}

const tests: TestCase[] = [
    {
        text: 'self',
        sub: 'self',
        result: 0,
    },
    {
        text: 'cabaabaaaabaabaaab',
        sub: 'aabaaba',
        result: 8,
    },
    {
        text: 'self-made',
        sub: 'self',
        result: 0,
    },
    {
        text: 'elbow mellon',
        sub: 'w m',
        result: 4,
    },
    {
        text: 'elbow mellon',
        sub: 'llon',
        result: 8,
    },
    {
        text: 'asdf',
        sub: 'asdf+',
        result: undefined,
    },
    {
        text: '1',
        sub: '2',
        result: undefined,
    },
];

const searches: SearchAlgorithm[] = [
    {
        search: new SlowSearch(),
        name: 'very slow',
    },
    {
        search: new KmpSearch(),
        name: 'knuth morriss pratt',
    },
    // {
    //     search: new AnjushkaSearch(),
    //     name: 'anjushka mega search',
    // },
    {
        search: new BMSearch(),
        name: 'boyer moore',
    },
];

describe('search api', () => {

    const verify = (search: Search, tc: TestCase): void => {
        const actual = search.indexOf(tc.text, tc.sub);
        expect(actual).to.eq(tc.result);
    };

    searches.forEach(s => {
        describe(`${s.name}`, () => {
            tests.forEach(tc => {
                it(`looking '${tc.sub}' within '${tc.text}'`, () => {
                    verify(s.search, tc);
                });
            });
        });
    });

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

    xdescribe('anjushka', () => {
        const kmp: Search = new AnjushkaSearch();

        const finds = (text: string, val: string, expectedIndex: number | undefined): void => {
            const ix = kmp.indexOf(text, val);
            expect(ix).to.eq(expectedIndex);
        };

        describe('success', () => {

            it('finds itself', () => {
                finds('self', 'self', 0);
            });

            it('finds Hooligan in Hoola-Hoola girls like Hooligans', () => {
                finds('Hoola-Hoola girls like Hooligans', 'Hooligan', 23);
            });

            it('eq to 0 when starts from substring', () => {
                finds('self-made', 'self', 0);
            });

            it('finds string', () => {
                finds('elbow mellon', 'w m', 4);
            });

            it('finds text in the end', () => {
                finds('elbow mellon', 'llon', 'elbow me'.length);
            });
        });

    });

    describe('bm', () => {

        const search: Search = new BMSearch();
        const finds = (text: string, val: string, expectedIndex: number | undefined): void => {
            const ix = search.indexOf(text, val);
            expect(ix).to.eq(expectedIndex);
        };

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

    });

});
