type RecentTool = { name: string; category: string; href: string };
type Listener = () => void;

const MAX = 6;
let _recent: RecentTool[] = [];
const _listeners: Listener[] = [];

export const recentTools = {
  get list(): RecentTool[] { return _recent; },
  add(name: string, category: string, href: string) {
    _recent = [{ name, category, href }, ..._recent.filter(t => t.name !== name)].slice(0, MAX);
    _listeners.forEach(fn => fn());
  },
  subscribe(fn: Listener) {
    _listeners.push(fn);
    return () => { const i = _listeners.indexOf(fn); if (i >= 0) _listeners.splice(i, 1); };
  },
};
