// check rarity
export function checkRarity(rarity: number) {
  const rarities = ["Core", "Rare", "Uncommon"];
  return rarities[rarity] || "Unknown";
}

// check tier
export function checkTier(rarity: number) {
  const rarities = ["Standard", "Premium", "Elite"];
  return rarities[rarity] || "Unknown";
}

// set format category
export function formatCategory(category: string) {
  const words = category.split(" ");

  const formattedCategory = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");

  return formattedCategory;
}
