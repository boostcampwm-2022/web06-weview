interface CustomLocalStorage {
  getItem: (key: string) => string;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

const customLocalStorage: CustomLocalStorage = {
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e: any) {
      alert(e.message);
    }
  },

  getItem: (key) => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : null;
    } catch (e: any) {
      alert(e.message);
    }
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e: any) {
      alert(e.message);
    }
  },
};

export default customLocalStorage;
