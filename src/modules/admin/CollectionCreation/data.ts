export const collectionCreation = [...new Array(4)].map((item, key) => ({
    name: "Collection " + (key + 1),
    status: key % 4,
    details: "Edit",
  }));
  