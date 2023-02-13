export const seek = (el, timeOffset, delay = 0) => {
  el.style.animationDelay = -timeOffset + delay;
};

export const raf = (act, func, id = 0) => {
  if (act.data.has("__raf-" + id))
    cancelAnimationFrame(act.data.get("__raf-" + id));
  act.data.set("__raf-" + id, func ? requestAnimationFrame(func) : null);
};

export const post = (act, func, delay = 0, id = 0) => {
  if (act.data.has("__post-" + id)) clearTimeout(act.data.get("__post-" + id));
  act.data.set("__post-" + id, func ? setTimeout(func, delay) : null);
};

export const tick = (act, func, interval, id = 0) => {
  if (act.data.has("__tick-" + id)) clearInterval(act.data.get("__tick-" + id));
  act.data.set("__tick-" + id, func ? setInterval(func, interval) : -1);
};

export const runFor = (act, time) => {
  post(act, () => act.timeline.advance(), time, "runFor");
};

export const cleanUp = (act) => {
  for (const [key, id] of act.data) {
    if (/^__raf-/.test(key)) cancelAnimationFrame(id);
    else if (/^__tick-/.test(key)) clearInterval(id);
    else if (/^__post-/.test(key)) clearTimeout(id);
    else continue;
    act.data.delete(key);
  }
};
