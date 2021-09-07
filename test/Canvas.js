const Canvas = artifacts.require('./Canvas.sol');

contract("Canvas", accounts => {
  it('should be able to buy a black pixel', async () => {
    const canvasInstance = await Canvas.deployed();
    const x = 1;
    const y = 1;
    const color = parseInt('FFFFFF', 16);

    const pixelCost = await canvasInstance.startingPriceWei();
    const result = await canvasInstance.buyPixel(x, y, color, {
      from: accounts[0],
      value: pixelCost.toNumber(),
    });
    const { _x, _y, _color } = result.logs[0].args;

    assert.equal(_x, x, 'x don\'t match');
    assert.equal(_y, y, 'y don\'t match');
    assert.equal(_color, color, 'color don\'t match');
  })

  it('cannot buy a pixel that is already owned', async () => {
    const canvasInstance = await Canvas.deployed();
    const x = 2;
    const y = 2;
    const color = parseInt('FFFFFF', 16);

    const pixelCost = await canvasInstance.startingPriceWei();
    await canvasInstance.buyPixel(x, y, color, {
      from: accounts[0],
      value: pixelCost.toNumber(),
    });
    await canvasInstance.buyPixel(x, y, color, {
      from: accounts[0],
      value: pixelCost.toNumber(),
    }).then(() => assert.fail('Should throw when pixel is already owned'))
      .catch((err) => assert.include(err.message, 'revert', 'Error message should contain revert'));
  })
});