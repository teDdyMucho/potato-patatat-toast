let _open = true;

export const sidebarState = {
  get open() { return _open; },
  toggle() { _open = !_open; return _open; },
};
