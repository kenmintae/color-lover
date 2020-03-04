import store from "store2";

function testStorage(): boolean {
  const test = "test";
  try {
    store.set(test, test);
    store.remove(test);
    return true;
  } catch (e) {
    console.error("app could not access any storage options.");
    return false;
  }
}

export function saveToStorage(namespace: string, key: string, data: any): void {
  if (testStorage() === true) {
    const keyWithPrefix = `${namespace}-${key}`
    store.set(keyWithPrefix, data);
  }
}

export function removeFromStorage(namespace: string, key: string): void {
  if (testStorage() === true) {
    const keyWithPrefix = `${namespace}-${key}`
    store.remove(keyWithPrefix);
  }
}

export function clearStorage(prefix: string): void {
  if (testStorage() === true) {
    store.each((key, _) => {
      if (key.includes(prefix)) {
        store.remove(key);
      }
    });
  }
}
