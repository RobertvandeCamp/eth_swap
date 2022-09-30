const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");

require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n) {
    return web3.utils.toWei(n, 'ether');
}

contract('EthSwap', (accounts) => {

    let token;
    let ethSwap;
    before(async () => {
        token = await Token.new();
        ethSwap = await EthSwap.new();
        await token.transfer(ethSwap.address, tokens('100000'))
    })

    describe('Token deployment', async () => {
        it('should have a contract name', async () => {
            const name = await token.name();
            assert.equal(name, 'DApp Token')
        });
    });
    describe('EthSwap deployment', async () => {
        it('should have a contract name', async () => {
            const name = await ethSwap.name();
            assert.equal(name, 'EthSwap Instant Exchange')
        });
        it('should have tokens in contract', async () => {
            const balance = await token.balanceOf(ethSwap.address);
            assert.equal(balance.toString(), tokens('100000'))
        });
    });
})