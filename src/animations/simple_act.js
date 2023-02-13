import Act from "../components/animations/Act";
import { tick, cleanUp } from "../components/animations/time_helpers";
export default class SimpleAct extends Act {
  onEnter(els, interval, color1, color2) {
    let i = 0;
    function toggle() {
      els.forEach(function (el) {
        el.style.backgroundColor = ++i % 2 === 0 ? color1 : color2;
      });
    }
    tick(this, toggle, interval);
    this.onUpdate(function (_interval, ...args) {
      [color1, color2] = args;
      if (_interval !== interval) {
        tick(this, toggle, interval);
      }
    });
    return () => {
      cleanUp(this);
    };
  }
}
