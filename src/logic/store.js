export let _store = {
  useLightTheme: true,
};
export let _subscriptions = [];
export let _setStore = (s) => {
  _store = s;
  _subscriptions.forEach((e) => e(s));
};
