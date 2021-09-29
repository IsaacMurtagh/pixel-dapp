export default class Pixel {
  constructor(props) {
    this.x = props.x;
    this.y = props.y;
    this.color = props.color;
    this.owner = props.owner;
    this.hoverColor;
  }

  get hexColor() {
    return this.decimalToHex(this.color);
  }

  get hasOwner() {
    return !!parseInt(this.owner);
  }

  decimalToHex(color) {
    return ('00000' + color.toString(16)).slice(-6);
  }
}