// Collects the things the loader should wait for (fonts, the 3D chunk, the
// first rendered frame) and reports real progress rather than a fake timer.

const tasks = [];
const listeners = new Set();
let done = 0;

const notify = () => {
  const p = tasks.length ? done / tasks.length : 0;
  listeners.forEach((fn) => fn(p));
};

export function track(promise) {
  tasks.push(promise);
  notify();
  Promise.resolve(promise)
    .catch(() => {}) // a failed task still counts as finished — never hang the loader
    .finally(() => {
      done++;
      notify();
    });
  return promise;
}

export function onProgress(fn) {
  listeners.add(fn);
  notify();
  return () => listeners.delete(fn);
}

// A deferred the 3D scene resolves on its first frame.
let resolveFirstFrame;
export const firstFrame = new Promise((r) => (resolveFirstFrame = r));
export const markFirstFrame = () => resolveFirstFrame?.();
