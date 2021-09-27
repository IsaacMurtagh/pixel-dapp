// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract Canvas {

  struct S_Pixel {
    uint24 color;
    address owner;
  }

  S_Pixel[20][20] public pixels;
  uint public startingPriceWei = 1 gwei;

  event PixelBought(uint8 _x, uint8 _y, uint24 _color);
  
  function buyPixel(uint8 _x, uint8 _y, uint24 _color) public payable {
      require(pixels[_x][_y].owner == address(0), 'Pixel already owned');
      require(msg.value == startingPriceWei, 'Pixel must be payed in full');
      pixels[_x][_y].color = _color;
      pixels[_x][_y].owner = msg.sender;
      emit PixelBought(_x, _y, _color);
  }

  function getRow(uint _row) public view returns(S_Pixel[20] memory) {
    return pixels[_row];
  }
}