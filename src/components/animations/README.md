# Animations

I am sure there is a react library that deals with animations.
But to leverage the full power of CSS animations, I needed something that would update faster than a react DOM while still being stateful.

I imagine framer motion would do such a thing but if I should be honest, my main problem with framer was performance. Perhaps I had been using it wrongly but Framer had previously failed to meet my expectations. To be truly fast while implementing a timeline, I believe something closer an imperative paradigm is needed after all, the underlying architecture is imperative even if CSS is not.

FInally, I needed something that made use of unbridled CSS syntax in obvious way allowing me to make use of the familiar @keyframes syntax which is more portable and clean. CSS problem has always been that it looks too easy while it is actually hard ( an issue that stuff like flexbox has fixed so much that there are only 4 unintuitive things in CSS; which are easily found on the mdn site) but the much overlooked fact there is that is a very visually appealing language. Pack in something opinionated like less,scss or stylus and you have the most beautiful way to do everything it does (no offence to any of the animation libraries)

# Architecture

All animations are described in the form of ##acts##. The acts are arranged sequentially in a timeline. An orchestrator is then reponsible for starting the timeline when all the refs are loaded, pausing the timeline when one or two refs are updated, notifying the timeline of changes in arguments, advancing the timeline and stopping the timeline.
