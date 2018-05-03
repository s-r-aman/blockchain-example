const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previosHash = '') {
    this.index = index;
    this.data = data;
    this.previosHash = previosHash;
    this.timestamp = timestamp;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index + this.previosHash + this.timestamp + JSON.stringify(this.data)
    ).toString();
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createInitialBlock()];
  }

  createInitialBlock() {
    return new Block(0, '30/04/2018', null, '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previosHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (const [iteration, iterator] of this.chain.entries()) {
      if (iteration > 0) {
        const currentBlock = iterator;
        const previousBlock = this.chain[iteration - 1];

        if (currentBlock.hash !== currentBlock.calculateHash()) {
          return false;
        }
        if (currentBlock.hash !== previousBlock.hash) {
          return false;
        }
      }
    }
    return true;
  }
}

let coin = new BlockChain();

coin.addBlock(new Block(1, '01/05/18', { key: 'value' }));

coin.addBlock(new Block(2, '01/05/18', { key: 'value2' }));

console.log(JSON.stringify(coin, null, 4));

console.log('Is blockchain valid: ' + coin.isChainValid());

coin.chain[1].data = { key: 'value3' }; //  Mutation

console.log('Data has been informally Changed');

console.log('Is blockchain valid: ' + coin.isChainValid());
