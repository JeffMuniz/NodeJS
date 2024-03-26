const localStorageMock = () => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      this.setItem(key, "");
    },
  };
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock(),
});
