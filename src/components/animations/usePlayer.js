import { useEffect, useMemo, useRef, useState } from "react";
import Timeline from "./Timeline";

const arrayEquals = (a, b) => {
  return a.length === b.length && a.every((e, i) => e === b[i]);
};
/**
 * @typedef {import("react").Ref} Ref;
 * @callback UpdatePlayerCallback
 * @param {number} new_state
 * @param {Array<Ref>} refs
 * @param {Array<any>} args
 */
/**
 * @param {Array<Act>} acts
 * @returns {[number, UpdatePlayerCallback, Player]}
 */
export default function usePlayer(acts) {
  const [, _triggerUpdate] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const timeline = useMemo(() => new Timeline(_triggerUpdate, acts), acts);
  const ref = useRef({ timeline: null }).current;
  if (timeline !== ref.timeline) {
    if (ref.timeline) ref.timeline.stop();
    ref.timeline = timeline;
  }

  const state = ref.timeline.index;
  let raw_refs = [];
  const updateRefs = () => {
    //Update targets in case refs have changed
    const new_targets = raw_refs.map((e) => e.current);
    const changed = !arrayEquals(new_targets, ref.timeline.targets);
    if (!changed) return;
    const waitForRefs = !new_targets.every(Boolean);
    console.log("waitForRefs :>> ", waitForRefs);
    if (waitForRefs) {
      if (ref.timeline.running) ref.timeline.stop();
      ref.timeline.updateTargets(new_targets);
    } else {
      ref.timeline.updateTargets(new_targets);
      if (!ref.timeline.running) ref.timeline.resume();
    }
  };

  /**
   * @type {UpdatePlayerCallback}
   */
  const setState = (new_state, refs = [], args = []) => {
    console.log("Setting state");
    raw_refs = refs.filter(Boolean);
    const targets = raw_refs.map((e) => e.current);
    //Wait for all refs to be loaded
    const waitForRefs = !targets.every(Boolean);
    if (state !== new_state) {
      //Change of state
      ref.timeline.stop();
      ref.timeline.updateArgs(args);
      ref.timeline.updateTargets(targets);
      ref.timeline.seek(new_state);
      if (!waitForRefs) ref.timeline.resume();
    } else {
      if (!arrayEquals(args, ref.timeline.args)) {
        const new_targets = raw_refs.map((e) => e.current);
        //Dynamic updates should only work when we change one thing at a time.
        if (!arrayEquals(new_targets, ref.timeline.targets))
          ref.timeline.stop();
        ref.timeline.updateArgs(args);
      }
      updateRefs();
    }
  };

  useEffect(updateRefs);
  //Auto Cleanup
  useEffect(() => {
    if (timeline.targets.every(Boolean)) timeline.resume();
    return () => timeline.stop();
  }, [timeline]);
  return [state, setState, ref.timeline];
}
