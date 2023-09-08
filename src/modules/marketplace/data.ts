export const cardTypeOption = new Map<number, {name: string, id: number}>([
  [3, {
    name: "Day/Month",
    id: 1
  }],
  [4, {
    name: "Year",
    id: 4
  }],
  [2,{
    name: "Category",
    id: 2
  }],
  [5,{
    name: "Trigger",
    id: 5
  }],
  [1,{
    name: "Crafting",
    id: 1
  }]
]);

export const triggerTypeOption = new Map<number, { id: number; name: string }>([
  [
    1,
    {
      name: "Major",
      id: 1,
    },
  ],
  [
    2,
    {
      name: "Minor Tier1",
      id: 2,
    },
  ],
  [
    3,
    {
      name: "Minor Tier2",
      id: 3,
    },
  ],
]);

export const collectionOption = new Map<number, { id: number; name: string }>([
  [
    1,
    {
      id: 1,
      name: "Genesis",
    },
  ],
]);

export const statusOption = new Map<number, { id: number; name: string }>([
  [
    1,
    {
      name: "Owned",
      id: 1,
    },
  ],
  [
    2,
    {
      name: "For Sale",
      id: 2,
    },
  ],
  [
    3,
    {
      name: "Not for sale",
      id: 3,
    },
  ],
]);

export const cardData = [
  {
    image: "/assets/nfts/1.png",
    name: "BoredApe",
    type: "Day/Month",
    rarity: "Rare",
  },
  {
    image: "/assets/nfts/2.png",
    name: "BoredApe",
    type: "Crafting",
    rarity: "Rare",
    owned: 1,
  },
  {
    image: "/assets/nfts/2.png",
    name: "BoredApe",
    type: "Category",
    rarity: "Rare",
    status: "For Sale",
  },
  {
    image: "/assets/nfts/2.png",
    name: "BoredApe",
    type: "Day/Month",
    rarity: "Rare",
    status: "For Sale",
    owned: 1,
  },
  {
    image: "/assets/nfts/1.png",
    name: "BoredApe",
    type: "Trigger",
    rarity: "Rare",
    owned: 2,
  },
  {
    image: "/assets/nfts/1.png",
    name: "BoredApe",
    type: "Category",
    rarity: "Rare",
  },
  {
    image: "/assets/nfts/2.png",
    name: "BoredApe",
    type: "Crafting",
    rarity: "Rare",
    status: "For Sale",
    owned: 1,
  },
  {
    image: "/assets/nfts/1.png",
    name: "BoredApe",
    type: "Trigger",
    rarity: "Rare",
  },
  {
    image: "/assets/nfts/1.png",
    name: "BoredApe",
    type: "Day/Month",
    rarity: "Rare",
  },
  {
    image: "/assets/nfts/1.png",
    name: "BoredApe",
    type: "Day/Month",
    rarity: "Rare",
  },
  {
    image: "/assets/nfts/1.png",
    name: "BoredApe",
    type: "Trigger",
    rarity: "Rare",
    status: "For Sale",
    owned: 3,
  },
  {
    image: "/assets/nfts/1.png",
    name: "BoredApe",
    type: "Day/Month",
    rarity: "Rare",
  },
];

export const packData = [
  {
    image: "/assets/buy.png",
    name: "BoredApe",
    rarity: "Rare",
  },
  {
    image: "/assets/buy.png",
    name: "BoredApe",
    rarity: "Rare",
    owned: 1,
  },
  {
    image: "/assets/buy.png",
    name: "BoredApe",
    rarity: "Rare",
    status: "For Sale",
  },
  {
    image: "/assets/buy.png",
    name: "BoredApe",
    rarity: "Rare",
    status: "For Sale",
    owned: 1,
  },
  {
    image: "/assets/buy.png",
    name: "BoredApe",
    rarity: "Rare",
    owned: 2,
  },
  {
    image: "/assets/buy.png",
    name: "BoredApe",
    rarity: "Rare",
  },
  {
    image: "/assets/buy.png",
    name: "BoredApe",
    rarity: "Rare",
    status: "For Sale",
    owned: 1,
  },
  {
    image: "/assets/buy.png",
    name: "BoredApe",
    rarity: "Rare",
  },
  {
    image: "/assets/buy.png",
    name: "BoredApe",
    rarity: "Rare",
  },
  {
    image: "/assets/buy.png",
    name: "BoredApe",
    rarity: "Rare",
  },
  {
    image: "/assets/buy.png",
    name: "BoredApe",
    rarity: "Rare",
    status: "For Sale",
    owned: 3,
  },
  {
    image: "/assets/buy.png",
    name: "BoredApe",
    rarity: "Rare",
  },
];
