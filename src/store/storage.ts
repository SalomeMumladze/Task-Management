class Storage {
  /**
   * Save value
   */
  set(key: string, val: any) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  /**
   * Load raw value
   */
  load<T = any>(key: string, def?: T): T {
    const stored = localStorage.getItem(key);

    if (stored == null) {
      return def as T;
    }

    try {
      return JSON.parse(stored);
    } catch {
      return def as T;
    }
  }

  /**
   * ONLY helper you requested
   */
  getBool(key: string, def = false): boolean {
    const val = this.load(key, def);
    return Boolean(val);
  }

  /**
   * Remove key
   */
  remove(key: string) {
    localStorage.removeItem(key);
  }
}

// singleton
const storage = new Storage();

export default storage;
