
// Hawaiian Star Compass - 32 Houses (Correct Traditional Sequence)
// The compass is circular: houses 1-16 go around once, then 17-32 repeat the same positions
export const starHouses = [
  // KOʻOLAU QUADRANT (North) - Houses 1-4
  { id: 1, name: "Koʻolau", quadrant: "Koʻolau", description: "True North. The primary northern house where Hōkūpaʻa (Polaris) guides the way. This house marks the cardinal direction and remains constant throughout the year.", angle: 0, season: "both" },
  { id: 2, name: "Koʻolau ʻĀkau", quadrant: "Koʻolau", description: "Northern Koʻolau. The northern windward house between true north and the northeastern sky.", angle: 22.5, season: "both" },
  { id: 3, name: "Koʻolau Komohana", quadrant: "Koʻolau", description: "Northwestern Koʻolau. Marks the transition from north toward the western houses.", angle: 45, season: "both" },
  { id: 4, name: "Koʻolau Hema", quadrant: "Koʻolau", description: "Southern Koʻolau. The southern edge of the northern quadrant, transitioning toward east.", angle: 67.5, season: "both" },

  // HIKINA QUADRANT (East) - Houses 5-8
  { id: 5, name: "Hikina", quadrant: "Hikina", description: "True East. Where Makaliʻi (Pleiades) rises at equinox. This is the cardinal eastern point for all navigation, marking balance in the year.", angle: 90, season: "Makaliʻi" },
  { id: 6, name: "Hikina ʻĀkau", quadrant: "Hikina", description: "Northern Hikina. The northeastern house between true east and the northern sky.", angle: 112.5, season: "both" },
  { id: 7, name: "Hikina Koʻolau", quadrant: "Hikina", description: "Windward Hikina. Marks the transition from east toward the northern houses.", angle: 135, season: "both" },
  { id: 8, name: "Hikina Kona", quadrant: "Hikina", description: "Southern Hikina. The southern edge of the eastern quadrant, transitioning toward south.", angle: 157.5, season: "both" },

  // KONA QUADRANT (South) - Houses 9-12
  { id: 9, name: "Kona", quadrant: "Kona", description: "True South. The cardinal southern point. Ke Aliʻi o Kona i ka Lewa (Canopus) reigns here as the chief of the southern sky.", angle: 180, season: "both" },
  { id: 10, name: "Kona Hikina", quadrant: "Kona", description: "Eastern Kona. The southeastern house between true south and the eastern sky.", angle: 202.5, season: "both" },
  { id: 11, name: "Kona Komohana", quadrant: "Kona", description: "Western Kona. Marks the transition from south toward the western houses.", angle: 225, season: "both" },
  { id: 12, name: "Kona Hema", quadrant: "Kona", description: "Deep Southern Kona. The deepest southern edge, transitioning toward west.", angle: 247.5, season: "both" },

  // KOMOHANA QUADRANT (West) - Houses 13-16
  { id: 13, name: "Komohana", quadrant: "Komohana", description: "True West. Where Makaliʻi sets at equinox. This marks the cardinal western point in the sky.", angle: 270, season: "Makaliʻi" },
  { id: 14, name: "Komohana Kona", quadrant: "Komohana", description: "Southern Komohana. The southwestern house between true west and the southern sky.", angle: 292.5, season: "both" },
  { id: 15, name: "Komohana Koʻolau", quadrant: "Komohana", description: "Northern Komohana. Marks the transition from west toward the northern houses.", angle: 315, season: "both" },
  { id: 16, name: "Komohana ʻĀkau", quadrant: "Komohana", description: "Northwestern Komohana. The northern edge of the western quadrant, completing the first circle back toward north.", angle: 337.5, season: "both" },

  // MIRROR/REPEAT - Houses 17-32 (same positions as 1-16)
  { id: 17, name: "Koʻolau", quadrant: "Koʻolau", description: "True North (repeated). The compass completes its circular journey back to the starting point.", angle: 0, season: "both" },
  { id: 18, name: "Koʻolau ʻĀkau", quadrant: "Koʻolau", description: "Northern Koʻolau (repeated).", angle: 22.5, season: "both" },
  { id: 19, name: "Koʻolau Komohana", quadrant: "Koʻolau", description: "Northwestern Koʻolau (repeated).", angle: 45, season: "both" },
  { id: 20, name: "Koʻolau Hema", quadrant: "Koʻolau", description: "Southern Koʻolau (repeated).", angle: 67.5, season: "both" },
  { id: 21, name: "Hikina", quadrant: "Hikina", description: "True East (repeated).", angle: 90, season: "Makaliʻi" },
  { id: 22, name: "Hikina ʻĀkau", quadrant: "Hikina", description: "Northern Hikina (repeated).", angle: 112.5, season: "both" },
  { id: 23, name: "Hikina Koʻolau", quadrant: "Hikina", description: "Windward Hikina (repeated).", angle: 135, season: "both" },
  { id: 24, name: "Hikina Kona", quadrant: "Hikina", description: "Southern Hikina (repeated).", angle: 157.5, season: "both" },
  { id: 25, name: "Kona", quadrant: "Kona", description: "True South (repeated).", angle: 180, season: "both" },
  { id: 26, name: "Kona Hikina", quadrant: "Kona", description: "Eastern Kona (repeated).", angle: 202.5, season: "both" },
  { id: 27, name: "Kona Komohana", quadrant: "Kona", description: "Western Kona (repeated).", angle: 225, season: "both" },
  { id: 28, name: "Kona Hema", quadrant: "Kona", description: "Deep Southern Kona (repeated).", angle: 247.5, season: "both" },
  { id: 29, name: "Komohana", quadrant: "Komohana", description: "True West (repeated).", angle: 270, season: "Makaliʻi" },
  { id: 30, name: "Komohana Kona", quadrant: "Komohana", description: "Southern Komohana (repeated).", angle: 292.5, season: "both" },
  { id: 31, name: "Komohana Koʻolau", quadrant: "Komohana", description: "Northern Komohana (repeated).", angle: 315, season: "both" },
  { id: 32, name: "Komohana ʻĀkau", quadrant: "Komohana", description: "Northwestern Komohana (repeated). The compass completes its full circular journey.", angle: 337.5, season: "both" },
];

// Key Navigation Stars - Aligned with correct house names
export const navigationStars = [
  {
    name: "Hōkūpaʻa",
    commonName: "Polaris (North Star)",
    houses: ["Koʻolau"],
    season: "both",
    significance: "Marks true north. Orientation reference only; not used to steer, but to hold north."
  },
  {
    name: "Makaliʻi",
    commonName: "Pleiades",
    houses: ["Hikina", "Komohana"],
    season: "Makaliʻi",
    significance: "The star cluster that opens the Makaliʻi season. Rises in the east (Hikina) and sets in the west (Komohana) at equinox. Key marker of Makahiki and primary navigation reference."
  },
  {
    name: "Ke Aliʻi o Kona i ka Lewa",
    commonName: "Canopus",
    houses: ["Kona"],
    season: "both",
    significance: "Very bright southern star marking true south. Extremely important for latitude and direction."
  },
  {
    name: "Hōkūleʻa",
    commonName: "Arcturus",
    houses: ["Hikina Kona"],
    season: "Kau wela",
    significance: "The zenith star of Hawaiʻi. Passes directly overhead at Hawaiian latitude. Critical for confirming position during summer voyages."
  },
  {
    name: "ʻAʻā",
    commonName: "Sirius",
    houses: ["Kona Hikina"],
    season: "both",
    significance: "The brightest star in the sky. Important winter navigation marker in the southeastern sky."
  },
  {
    name: "Kaluakoko",
    commonName: "Betelgeuse (Orion)",
    houses: ["Hikina ʻĀkau"],
    season: "Makaliʻi",
    significance: "Prominent red star used as a strong directional reference in the northeastern sky."
  },
  {
    name: "Nanamua & Nanahope",
    commonName: "Castor & Pollux (Gemini)",
    houses: ["Hikina Kona"],
    season: "Makaliʻi",
    significance: "The twin stars that rise together marking the southeastern sky during winter months."
  },
  {
    name: "Hikianalia",
    commonName: "Spica (Virgo)",
    houses: ["Kona Hikina"],
    season: "Kau wela",
    significance: "Seasonal timing marker in the southeastern sky. Used to illustrate shifting star paths during summer."
  }
];

export const seasons = [
  {
    id: "both",
    name: "All Seasons",
    description: "Houses active throughout the year"
  },
  {
    id: "Makaliʻi",
    name: "Makaliʻi Season",
    description: "Winter season (November-April). Cooler weather, northern winds, and the appearance of Makaliʻi star cluster. These stars and star groups that are actually used for night navigation during Makaliʻi season, when they are prominent in the evening and night sky. Many houses will not have a star listed. That is correct."
  },
  {
    id: "Kau wela",
    name: "Kau wela Season",
    description: "Summer season (May-October). Warmer weather, southern trade winds, and the zenith passage of Hōkūleʻa. During Kau wela, nights are shorter and fewer stars are emphasized for navigation. Traditional wayfinding relied more on the sun, winds, clouds, and ocean swells. The stars shown here are examples traditionally observed during the summer season and were used as confirmers rather than primary navigation anchors."
  }
];
