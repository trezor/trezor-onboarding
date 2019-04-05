import bip39wordList from './bip39';

describe('bip39', () => {
    it('should cointain string items', () => {
        // expect(bip39wordList.length).toEqual();
        // todo: add words count, pretty useless test but why not.
        bip39wordList.forEach(word => expect(typeof word).toEqual('string'));
    });
});