export default class Pixel {
  constructor(props) {
    this.x = props.x;
    this.y = props.y;
    this.color = props.color;
    this.owner = props.owner;
  }

  get hexColor() {
    return ('00000' + this.color.toString(16)).slice(-6);
  }
}