// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract Canvas {

  struct S_Pixel {
    uint48 color;
    address owner;
  }

  S_Pixel[256][256] public pixels;
  uint public startingPriceWei = 1 gwei;

  event PixelBought(uint8 _x, uint8 _y, uint48 _color);
  
  function buyPixel(uint8 _x, uint8 _y, uint48 _color) public payable {
      require(pixels[_x][_y].owner == address(0), 'Pixel already owned');
      require(msg.value == startingPriceWei, 'Pixel must be payed in full');
      pixels[_x][_y].color = _color;
      pixels[_x][_y].owner = msg.sender;
      emit PixelBought(_x, _y, _color);
  }
}