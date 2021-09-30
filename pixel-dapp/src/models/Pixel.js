export default class Pixel {
  constructor(props) {
    this.x = props.x;
    this.y = props.y;
    this.color = props.color;
    this.owner = props.owner;
    this.hoverColor;
  }

  get hexColor() {
    return `#${this.decimalToHex(this.color)}`;
  }

  get rgbColor() {
    const { r, g, b } = this.hexToRgb(this.hexColor);
    return `rgb(${r}, ${g}, ${b})`;
  }

  get hasOwner() {
    return !!parseInt(this.owner);
  }

  decimalToHex(color) {
    return ('000000' + color.toString(16)).slice(-6);
  }

  hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  
}