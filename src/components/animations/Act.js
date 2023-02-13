let _id = 1;
export default class Act {
  allowSwapElements = false;
  constructor() {
    this.timeline = null;
    this.data = new Map();
    this._exit = null;
    this._watch = null;
    this._watchTargets = null;
    this._restore = null;
    this._save = null;
    this.id = _id++;
    console.log("Created act " + this.id);
  }

  start(refs, ...args) {
    console.log("Starting act " + this.id);
    this._exit = this.onEnter(refs, ...args);
  }
  stop() {
    console.log("Stopping act " + this.id);
    this._exit?.();
    this._exit = null;
    this._watch = null;
    this._watchTargets = null;
    this._restore = null;
    this._save = null;
  }
  save() {
    return this._save?.();
  }
  restore(data) {
    this._restore?.(data);
  }
  //Default behaviour is to restart the animation
  updateTargets(refs) {
    if (this._watchTargets) {
      this._watchTargets(refs);
    } else this.timeline.restart();
  }
  //Default behaviour is to restart the animation
  updateArgs(args) {
    if (this._watch) {
      this._watch(...args);
    } else this.timeline.restart();
  }

  //Lifecycle methods
  onEnter(refs, arg1, arg2) {}
  onUpdate(func) {
    this._watch = func;
  }
  onRefs(func) {
    this._watchTargets = func;
  }
  onRestore(func) {
    this._restore = func;
  }
  onSave(func) {
    this._save = func;
  }
}
