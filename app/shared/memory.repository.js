const MemoryRepository = (seed) => {
  const items = seed || [];

  const selectAll = async () => items;

  const selectById = async (id) => items.find((item) => item.id == id);

  const selectByKeyValue = async (key, value) => items.filter((item) => item[key] == value);

  const selectByContent = async (content) => items.filter((item) => isIncluded(content, item));

  const insert = async (item) => {
    const index = getIndex(item.id);
    if (index >= 0) return undefined;
    items.push(item);
    return item;
  };

  const update = async (id, item) => {
    const index = getIndex(id);
    if (index < 0) return undefined;
    items[index] = item;
    return items[index];
  };

  const patch = async (id, patch) => {
    const index = getIndex(id);
    if (index < 0) return undefined;
    const current = items[index];
    const patched = { ...current, ...patch };
    items[index] = patched;
    return items[index];
  };

  const deleteById = async (id) => {
    const index = getIndex(id);
    if (index < 0) return;
    items.splice(index, 1);
  };

  const isIncluded = (content, item) => {
    for (const key in item) {
      if (item[key].includes(content)) return true;
    }
    return false;
  };
  const getIndex = (id) => items.findIndex((item) => item.id == id);
  /**
   * In Memory Data persistance
   * @description Specific for in memory database
   */
  const memoryRepository = {
    selectAll,
    selectById,
    selectByKeyValue,
    selectByContent,
    insert,
    update,
    patch,
    deleteById,
  };
  return memoryRepository;
};

module.exports = MemoryRepository;
