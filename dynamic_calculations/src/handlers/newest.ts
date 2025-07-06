// Newest returns the item with the most recent timestamp from its sources

class Newest {
  static handle(...sources) {
    if (!sources || sources.length === 0) return undefined;
    // Find the item with the most recent timestamp
    return sources.reduce((latest, item) => {
      if (!item || !item.timestamp) return latest;
      if (!latest || !latest.timestamp) return item;
      const result = new Date(item.timestamp) > new Date(latest.timestamp) ? item : latest;
      return result;
    }, undefined);
  }
}

export default Newest; 