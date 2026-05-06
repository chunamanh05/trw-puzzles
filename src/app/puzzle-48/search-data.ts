export type Article = {
  id: number;
  title: string;
  description: string;
  category: string;
  content: string;
  location: string;
  price: string;
  type: "villa" | "penthouse" | "estate" | "mansion" | "retreat";
};

export const articles: Article[] = [
  {
    id: 1,
    title: "Azure Cliffside Villa",
    description: "Perched above the Pacific Ocean, this architectural masterpiece redefines coastal living with infinity pools and panoramic sea views.",
    category: "Featured",
    content: "Perched above the Pacific Ocean with 270-degree panoramic sea views, this architectural masterpiece redefines coastal living. The villa features floor-to-ceiling glass walls, a cantilevered infinity pool, and a private helipad. Designed by award-winning architect Tadao Ando, the structure seamlessly merges indoor and outdoor living. Five ensuite bedrooms, a home cinema, wine cellar, and chef's kitchen complete this once-in-a-generation offering.",
    location: "Malibu, California",
    price: "$48,500,000",
    type: "villa",
  },
  {
    id: 2,
    title: "The Obsidian Penthouse",
    description: "A sky-high sanctuary crowning Manhattan's most iconic address, offering 360-degree views of the New York skyline.",
    category: "New Listing",
    content: "Crowning Manhattan's most iconic address, The Obsidian Penthouse offers 360-degree views of New York City's unparalleled skyline. Three levels of glass and steel command the entire top floor of the 100-story tower. The interior features rare black Italian marble, a private rooftop garden, a heated pool, and direct elevator access. This is the pinnacle of vertical living, conceived for those who demand absolute exclusivity and discretion.",
    location: "Manhattan, New York",
    price: "$82,000,000",
    type: "penthouse",
  },
  {
    id: 3,
    title: "Versailles Estate",
    description: "A timeless French château spanning 14 acres, faithfully restored to its former grandeur with every modern luxury discreetly integrated.",
    category: "Heritage",
    content: "Sprawling across 14 private acres in Bel Air, this faithfully restored French château embodies classical European grandeur with every modern luxury discreetly integrated. Original 18th-century stonework is preserved alongside a state-of-the-art smart home system, geothermal heating, and a 20-car underground garage. The estate includes formal gardens, a polo pitch, a carriage house, and a private vineyard producing 2,000 bottles per year.",
    location: "Bel Air, Los Angeles",
    price: "$135,000,000",
    type: "estate",
  },
  {
    id: 4,
    title: "Kyoto Mountain Retreat",
    description: "A serene sanctuary where ancient Japanese aesthetics meet contemporary minimalism amidst cedar forests and natural hot springs.",
    category: "International",
    content: "Nestled deep within the cedar forests of Arashiyama, this extraordinary retreat seamlessly fuses Wabi-sabi philosophy with contemporary minimalism. The property encompasses three separate pavilions, each with its own private garden and indoor-outdoor bath fed by a natural hot spring. The main pavilion features a tensho-style tea room, a meditation garden, and a koi pond. An adjacent guest pavilion and a dedicated staff quarters ensure privacy for all who reside here.",
    location: "Kyoto, Japan",
    price: "$22,000,000",
    type: "retreat",
  },
  {
    id: 5,
    title: "The Riviera Mansion",
    description: "An icon of the French Côte d'Azur, this legendary Belle Époque mansion offers unrivaled Mediterranean Sea access and storied history.",
    category: "International",
    content: "An enduring icon of the French Riviera, this legendary Belle Époque mansion was originally commissioned for a European royal family in 1887. Perched directly above the Mediterranean with its own private beach and deep-water mooring for a superyacht, the property has hosted artists, statesmen, and cultural figures across its storied history. Fourteen opulent bedrooms, a grand ballroom, and terraced gardens descending to the sea make this one of Europe's most significant private residences.",
    location: "Cap Ferrat, France",
    price: "$210,000,000",
    type: "mansion",
  },
  {
    id: 6,
    title: "Sonoran Desert Sanctuary",
    description: "Where stark desert beauty and bold modernist architecture converge in a home that commands the silence of the American Southwest.",
    category: "Featured",
    content: "A radical statement in modernist desert architecture, this sanctuary emerges organically from the Sonoran landscape as if sculpted from the earth itself. Raw concrete, rammed earth walls, and local sandstone are deployed with gallery-like precision. The central atrium opens to the desert sky, while a spring-fed negative-edge pool appears to dissolve into the horizon. Solar-powered and fully autonomous, this home functions as a completely self-sufficient ecosystem.",
    location: "Scottsdale, Arizona",
    price: "$19,750,000",
    type: "villa",
  },
  {
    id: 7,
    title: "Highland Forest Estate",
    description: "A majestic Scottish baronial castle modernised with discreet luxury, overlooking a private loch within 300 acres of highland wilderness.",
    category: "Heritage",
    content: "A majestic 19th-century Scottish baronial castle, sensitively modernised to discreetly house 21st-century luxury. The castle overlooks its own private loch and is surrounded by 300 acres of untouched Highland wilderness teeming with red deer and golden eagles. Inside, original vaulted ceilings and carved fireplaces coexist with bespoke cabinetry, smart environmental systems, and a spa level within the ancient tower. The estate includes a five-bedroom keeper's lodge and full salmon fishing rights.",
    location: "Scottish Highlands, UK",
    price: "$38,000,000",
    type: "estate",
  },
  {
    id: 8,
    title: "Bali Clifftop Retreat",
    description: "An ethereal collection of hand-crafted pavilions suspended above the Indian Ocean, offering the most private luxury in all of Southeast Asia.",
    category: "International",
    content: "Suspended 200 metres above the Indian Ocean on a sheer volcanic cliff, this ethereal compound consists of seven hand-crafted pavilions constructed entirely from reclaimed teak, volcanic stone, and woven alang-alang. Each pavilion is oriented to capture the panorama of the ocean and the sacred Mount Agung. Dawn yoga on the clifftop platform, private plunge pools carved from solid rock, and an on-site team of Balinese healers provide an experience of absolute restoration.",
    location: "Uluwatu, Bali",
    price: "$14,200,000",
    type: "retreat",
  },
];
