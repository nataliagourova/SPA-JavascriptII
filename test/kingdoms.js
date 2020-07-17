const expect = require('chai').expect;
const kingdom = require('../data');

describe('kingdom module', () => {
    it("returns requested kingdom", () => {
        const result = kingdom.getItem('animals');
        expect(result).to.deep.equal({
            name: 'animals',
            legs: 4,
            fluidtemp: 'hot',
            mobile: true    
            });
    })
    it("fails when invalid kingdom", () => {
        const result = kingdom.getItem('spiders');
        expect(result).to.be.undefined;

    });
    it("adds a new kingdom", () => {
        const result = kingdom.addItem({
            name: 'spiders',
            legs: 8,
            fluidtemp: 'neutral',
            mobile: true  
        });
        expect(result.added).to.be.true;
    });
    it("fails when add not successful", () => {
        const result = kingdom.addItem({
            name: 'amphibia',
            legs: 0,
            fluidtemp: 'neutral',
            mobile: true    
        });
        expect(result.added).to.be.false;
    });
    it("deletes requested kingdom", () => {
        const result = kingdom.deleteItem('amphibia');
        expect(result.deleted).to.be.true;
    });
    it("fails when delete not successful", () => {
        const result = kingdom.deleteItem('aliens');
        expect(result.deleted).to.be.false;
    });
});
