export const claimManage = [...new Array(65)].map((item, key) => ({
  date: "06/18/22",
  predictions: "Predictions Info_" + (key + 1),
  user: "Username_" + (key + 1),
  status: key % 3,
}));
