export function setStorage(name, value) {
    uni.setStorageSync(name, JSON.stringify(value));
}

export function getStorage(name) {
    const value = uni.getStorageSync(name);
    if (value) {
        return JSON.parse(value);
    }
}

export function removeStorage(name) {
    uni.removeStorageSync(name);
}

export function clear() {
    uni.clearStorageSync();
}
