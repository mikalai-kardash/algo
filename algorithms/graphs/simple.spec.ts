import { Something } from './simple';
import { expect } from 'chai';

describe('something', function () {

    it('works', () => {
        const s = new Something();
        expect(s.something()).to.eq(1);
    });

});