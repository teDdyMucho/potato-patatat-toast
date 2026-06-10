let _hasReview = false;
let _pendingCount = 0;
let _fetched = false;

export const reviewCache = {
  get hasReview() { return _hasReview; },
  get pendingCount() { return _pendingCount; },
  get fetched() { return _fetched; },
  set(hasReview: boolean, pendingCount: number) {
    _hasReview = hasReview;
    _pendingCount = pendingCount;
    _fetched = true;
  },
  reset() {
    _hasReview = false;
    _pendingCount = 0;
    _fetched = false;
  },
};
