import { render, screen } from "@testing-library/react";
import Act from "./Act";

const timers = [];
const tick = (act, f) => {
  act.data.set("__test_tick", f);
  timers.push(f);
};
const cleanUp = (act) => {
  if (act.data.has("__test_tick")) {
    timers.splice(timers.indexOf(act.data.get("__test_tick")), 1);
    act.data.delete("__test_tick");
  }
};
const advance = (time = 1) => {
  while (time--) timers.forEach((e) => e());
};

class TestAct extends Act {
  onEnter(els, speed) {
    let i = 0;
    tick(
      this,
      () => {
        i++;
        els.forEach((e) => {
          e.data += speed;
        });
      },
      100
    );
    this.onRefs((_els) => {
      els = _els;
    });
    this.onUpdate((_speed) => {
      i = (i * speed) / _speed;
      speed = _speed;
    });
    this.onSave(() => {
      return { i, speed };
    });
    this.onRestore(({ i: _i, speed: _speed }) => {
      let m = i;
      i += (_i * _speed) / speed;
      let n = Math.round((i - m) * speed);
      els.forEach((e) => {
        e.data += n;
      });
    });
    return () => {
      els.forEach((e) => (e.data -= Math.round(speed * i)));
      cleanUp(this);
    };
  }
}

test("Act update", () => {
  const act = new TestAct();
  const fixtures = [{ data: 100 }];
  act.start(fixtures.slice(), 50);
  const [a] = fixtures;
  expect(act.data.size).toBe(1);
  expect(a.data).toBe(100);

  advance();
  expect(a.data).toBe(150);
  advance();
  advance();
  expect(a.data).toBe(250);
});

test("Act updateArgs", () => {
  const act = new TestAct();
  const fixtures = [{ data: 100 }];
  act.start(fixtures.slice(), 50);
  const [a] = fixtures;
  expect(act.data.size).toBe(1);
  expect(a.data).toBe(100);

  advance(3);
  expect(a.data).toBe(250);
  act.updateArgs([100]);
  expect(a.data).toBe(250);
  advance();
  expect(a.data).toBe(350);
});

test("Act updateTargets", () => {
  const act = new TestAct();
  const fixtures = [{ data: 100 }, { data: 200 }];
  act.start(fixtures.slice(), 50);
  const [a, b] = fixtures;
  expect(act.data.size).toBe(1);
  expect(a.data).toBe(100);

  advance(3);
  expect(a.data).toBe(250);
  expect(b.data).toBe(350);
  act.updateTargets([b, { data: 200 }]);
  expect(a.data).toBe(250);
  expect(b.data).toBe(350);
  advance();
  expect(a.data).toBe(250);
  expect(b.data).toBe(400);
});

test("Act save and restore", () => {
  const act = new TestAct();
  const fixtures = [{ data: 100 }, { data: 200 }];
  act.start(fixtures.slice(), 50);
  const [a, b] = fixtures;
  expect(act.data.size).toBe(1);
  expect(a.data).toBe(100);

  advance(3);
  expect(a.data).toBe(250);
  expect(b.data).toBe(350);
  const m = act.save();
  act.stop();
  expect(a.data).toBe(100);
  expect(b.data).toBe(200);

  const act2 = new TestAct();
  act2.start([b, { data: 200 }], 100);
  advance();
  expect(b.data).toBe(300);
  act2.restore(m);
  expect(b.data).toBe(450);
});
