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
}

let coin = new BlockChain();

coin.addBlock(new Block(1, '01/05/18', { key: 'value' }));

coin.addBlock(new Block(2, '01/05/18', { key: 'value2' }));

console.log(JSON.stringify(coin, null, 4));
