export default class Timeline {
  constructor(triggerUpdate, acts) {
    this.acts = acts.map((E) => new E());
    this.triggerUpdate = triggerUpdate;
    this.index = 0;
    this.targets = [];
    this.args = [];
    this.running = false;
    this.acts.forEach((e) => (e.timeline = this));
  }

  get act() {
    return this.acts[this.index];
  }
  updateTargets(targets) {
    if (this.running) this.act.updateTargets(targets);
    this.targets = targets;
  }
  updateArgs(new_args) {
    if (this.running) this.act.updateArgs(new_args);
    this.args = new_args;
  }
  resume() {
    if (this.running) return;
    console.log("Starting timeline with state: " + this.index);
    this.running = true;
    this.act.start(this.targets, ...this.args);
  }
  stop() {
    if (!this.running) return;
    console.log("Stopping timeline with state: " + this.index);
    this.act.stop();
    this.running = false;
  }
  seek(index) {
    const running = this.running;
    if (index !== this.index) this.stop();
    this.index = index;
    if (running) this.resume();
  }
  restart() {
    if (!this.running) return this.resume();
    console.log("Restarting timeline...");
    const data = this.act.save();
    this.stop();
    this.resume();
    this.act.restore(data);
  }
  advance(act) {
    const index = this.acts.indexOf(act);
    if (index === this.index) this.seek(index + 1);
  }
}
