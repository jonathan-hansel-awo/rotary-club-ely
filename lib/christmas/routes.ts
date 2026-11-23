// Transcribed from the club's 2026 route schedule and alphabetical street list.
// The dated schedule resolves Mawson Close's impossible "Thursday 7th" entry.
// Cambridge Road appears on both 11 and 17 December in the dated schedule.
// Gilbert Scott Drive and part of Kings Avenue appear only in the alphabetical list.
export const collectionYear = 2026;
export const donationUrl = "https://www.mygivinghub.com/";
// Add the confirmed tracker URL here when the club provides it.
export const trackerUrl: string | null = null;
export type CollectionRoute = { day: number; weekday: string; streets: string[]; note?: string };
export const routes: CollectionRoute[] = [
  {
    "day": 7,
    "weekday": "Monday",
    "streets": [
      "Cromwell Road",
      "Chief Street",
      "West End (part)",
      "Little Lane",
      "Hills Lane",
      "Fieldside",
      "St Ethelwold’s Close",
      "Beald Way",
      "Walsingham Way",
      "St Ovin’s Green",
      "West Fen Road (part)",
      "Downham Road (part)",
      "Egremont Street"
    ]
  },
  {
    "day": 8,
    "weekday": "Tuesday",
    "streets": [
      "Downham Road (part)",
      "Upherds Lane",
      "West Fen Road (part)",
      "Dunstan Street",
      "Althorpe Court",
      "Priors Court",
      "Kent Close",
      "Benedict Street",
      "St Andrews Way",
      "Merlin Drive",
      "Herons Close",
      "Wren Close",
      "Falcon Mews",
      "Northwold",
      "Elmfield",
      "Arundel",
      "Fleetwood"
    ]
  },
  {
    "day": 9,
    "weekday": "Wednesday",
    "streets": [
      "Lynn Road (part)",
      "John Amner Close",
      "Meldon Place",
      "Dalton Way",
      "St Audreys Way",
      "Buckingham Drive",
      "Lynton Drive",
      "Lynton Close",
      "Bentham Way",
      "Abbott Thurston Avenue",
      "Philippa Close",
      "King Edgar Close"
    ]
  },
  {
    "day": 10,
    "weekday": "Thursday",
    "streets": [
      "The Chase",
      "Mawson Close",
      "Yorke Way",
      "Canterbury Avenue",
      "Longfields",
      "St Johns Road",
      "Morley Drive",
      "Murfitt Close",
      "Hollendale Way",
      "Meadow Way",
      "Briars Grove",
      "Pasture Grove",
      "Hereward Street",
      "Debden Green",
      "Hamilton Road",
      "Landsdown Close",
      "West End (part)"
    ]
  },
  {
    "day": 11,
    "weekday": "Friday",
    "streets": [
      "The Gallery",
      "Silver Street",
      "Parade Lane",
      "St Marys Street (part)",
      "Cambridge Road (part)",
      "Marriott Drive",
      "Houghton Gardens",
      "Barton Road",
      "Barton Square",
      "Barton Mews",
      "Back Hill",
      "Dovehouse Close",
      "Potters Lane",
      "Station Road",
      "Castlehythe",
      "Annesdale",
      "Victoria Street",
      "Broad Street",
      "Jubilee Terrace",
      "Ship Lane",
      "Cardinals Way",
      "Lisle Lane (part)",
      "Willow Walk",
      "Willow Grove",
      "Waterside",
      "Osier Close",
      "Fore Hill"
    ]
  },
  {
    "day": 14,
    "weekday": "Monday",
    "streets": [
      "New Barns Road (part)",
      "New Barns Avenue",
      "High Barns",
      "Larkfield Road",
      "Clayway",
      "Ramsey Road",
      "Deacons Lane",
      "Lynn Road (part)",
      "The Paddock",
      "Appleby Park"
    ]
  },
  {
    "day": 15,
    "weekday": "Tuesday",
    "streets": [
      "New Barns Road (part)",
      "Bohemond Street",
      "Crauden Gardens",
      "Beech Lane",
      "Prickwillow Road",
      "Mulberry Way",
      "Birch Close",
      "Aspen Close",
      "Buckthorn",
      "Sycamore Lane",
      "Ash Grove",
      "Henley Way",
      "Summer Hayes",
      "Juniper Drive",
      "Guelder Rose",
      "Holly Walk",
      "Douglas Court",
      "St Martin’s Walk",
      "Newnham Street",
      "Nutholt Lane"
    ]
  },
  {
    "day": 16,
    "weekday": "Wednesday",
    "streets": [
      "Kings Avenue (part)",
      "Canute Crescent",
      "Bishop Laney Drive",
      "Langham Way",
      "Thirlby Gardens",
      "Goodwin Grove",
      "Longchamp Drive",
      "Allen Road",
      "Turner Drive",
      "Merivale Way",
      "Carey Close",
      "Wilford Drive",
      "Felton Way",
      "Compton Fields"
    ]
  },
  {
    "day": 17,
    "weekday": "Thursday",
    "streets": [
      "Tower Road",
      "Cambridge Road (part)",
      "The Turnpike",
      "Gateway Gardens",
      "Witchford Road",
      "Pilgrims Way",
      "Norfolk Road",
      "Bedford Close",
      "Suffolk Close",
      "Warwick Drive",
      "Northampton Close",
      "Leicester Close",
      "Hertford Close",
      "Elysian Close"
    ]
  },
  {
    "day": 18,
    "weekday": "Friday",
    "streets": [
      "Columbine Road",
      "Teasel Drive",
      "Mallow Close",
      "Cam Drive",
      "Stour Green",
      "Wensum Way",
      "Chelmer Way",
      "The Medway",
      "Welland Place",
      "Nene Road",
      "Wissey Way"
    ]
  },
  {
    "day": 21,
    "weekday": "Monday",
    "streets": [
      "Beresford Road",
      "Kingsley Walk",
      "Alexander Chase",
      "Darwin Close",
      "Collier Close",
      "Brooke Grove",
      "Tennyson Place"
    ],
    "note": "Starts at the St Johns Road end of Beresford Road."
  },
  {
    "day": 22,
    "weekday": "Tuesday",
    "streets": [
      "Monarch Way",
      "Brimstone Drive",
      "Cleopatra Close",
      "Skipper Walk",
      "Emperor Green",
      "Red Admiral Street",
      "Apollo Chase",
      "Williams Close",
      "Lumley Close",
      "Fitzgerald Close",
      "Morton Close"
    ]
  }
];
export const streetIndex: { street: string; days: number[] }[] = [
  {
    "street": "Abbott Thurston Avenue",
    "days": [
      9
    ]
  },
  {
    "street": "Alexander Chase",
    "days": [
      21
    ]
  },
  {
    "street": "Allen Road",
    "days": [
      16
    ]
  },
  {
    "street": "Althorpe Court",
    "days": [
      8
    ]
  },
  {
    "street": "Annesdale",
    "days": [
      11
    ]
  },
  {
    "street": "Apollo Chase",
    "days": [
      22
    ]
  },
  {
    "street": "Appleby Park",
    "days": [
      14
    ]
  },
  {
    "street": "Arundel",
    "days": [
      8
    ]
  },
  {
    "street": "Ash Grove",
    "days": [
      15
    ]
  },
  {
    "street": "Aspen Close",
    "days": [
      15
    ]
  },
  {
    "street": "Back Hill",
    "days": [
      11
    ]
  },
  {
    "street": "Barton Mews",
    "days": [
      11
    ]
  },
  {
    "street": "Barton Road",
    "days": [
      11
    ]
  },
  {
    "street": "Barton Square",
    "days": [
      11
    ]
  },
  {
    "street": "Beald Way",
    "days": [
      7
    ]
  },
  {
    "street": "Bedford Close",
    "days": [
      17
    ]
  },
  {
    "street": "Beech Lane",
    "days": [
      15
    ]
  },
  {
    "street": "Benedict Street",
    "days": [
      8
    ]
  },
  {
    "street": "Bentham Way",
    "days": [
      9
    ]
  },
  {
    "street": "Beresford Road",
    "days": [
      21
    ]
  },
  {
    "street": "Birch Close",
    "days": [
      15
    ]
  },
  {
    "street": "Bishop Laney Drive",
    "days": [
      16
    ]
  },
  {
    "street": "Bohemond Street",
    "days": [
      15
    ]
  },
  {
    "street": "Briars Grove",
    "days": [
      10
    ]
  },
  {
    "street": "Brimstone Drive",
    "days": [
      22
    ]
  },
  {
    "street": "Broad Street",
    "days": [
      11
    ]
  },
  {
    "street": "Brooke Grove",
    "days": [
      21
    ]
  },
  {
    "street": "Buckingham Drive",
    "days": [
      9
    ]
  },
  {
    "street": "Buckthorn",
    "days": [
      15
    ]
  },
  {
    "street": "Cam Drive",
    "days": [
      18
    ]
  },
  {
    "street": "Cambridge Road",
    "days": [
      11,
      17
    ]
  },
  {
    "street": "Canterbury Avenue",
    "days": [
      10
    ]
  },
  {
    "street": "Canute Crescent",
    "days": [
      16
    ]
  },
  {
    "street": "Cardinals Way",
    "days": [
      11
    ]
  },
  {
    "street": "Carey Close",
    "days": [
      16
    ]
  },
  {
    "street": "Castlehythe",
    "days": [
      11
    ]
  },
  {
    "street": "Chelmer Way",
    "days": [
      18
    ]
  },
  {
    "street": "Chief Street",
    "days": [
      7
    ]
  },
  {
    "street": "Clayway",
    "days": [
      14
    ]
  },
  {
    "street": "Cleopatra Close",
    "days": [
      22
    ]
  },
  {
    "street": "Collier Close",
    "days": [
      21
    ]
  },
  {
    "street": "Columbine Road",
    "days": [
      18
    ]
  },
  {
    "street": "Compton Fields",
    "days": [
      16
    ]
  },
  {
    "street": "Crauden Gardens",
    "days": [
      15
    ]
  },
  {
    "street": "Cromwell Road",
    "days": [
      7
    ]
  },
  {
    "street": "Dalton Way",
    "days": [
      9
    ]
  },
  {
    "street": "Darwin Close",
    "days": [
      21
    ]
  },
  {
    "street": "Deacons Lane",
    "days": [
      14
    ]
  },
  {
    "street": "Debden Green",
    "days": [
      10
    ]
  },
  {
    "street": "Douglas Court",
    "days": [
      15
    ]
  },
  {
    "street": "Dovehouse Close",
    "days": [
      11
    ]
  },
  {
    "street": "Downham Road (Egremont Street - St Andrews Way)",
    "days": [
      8
    ]
  },
  {
    "street": "Downham Road (West Fen Road - Egremont Street)",
    "days": [
      7
    ]
  },
  {
    "street": "Dunstan Street",
    "days": [
      8
    ]
  },
  {
    "street": "Egremont Street",
    "days": [
      7
    ]
  },
  {
    "street": "Elmfield",
    "days": [
      8
    ]
  },
  {
    "street": "Elysian Close",
    "days": [
      17
    ]
  },
  {
    "street": "Emperor Green",
    "days": [
      22
    ]
  },
  {
    "street": "Falcon Mews",
    "days": [
      8
    ]
  },
  {
    "street": "Felton Way",
    "days": [
      16
    ]
  },
  {
    "street": "Fieldside",
    "days": [
      7
    ]
  },
  {
    "street": "Fitzgerald Close",
    "days": [
      22
    ]
  },
  {
    "street": "Fleetwood",
    "days": [
      8
    ]
  },
  {
    "street": "Fore Hill",
    "days": [
      11
    ]
  },
  {
    "street": "Gateway Gardens",
    "days": [
      17
    ]
  },
  {
    "street": "Gilbert Scott Drive",
    "days": [
      9
    ]
  },
  {
    "street": "Goodwin Grove",
    "days": [
      16
    ]
  },
  {
    "street": "Guelder Rose",
    "days": [
      15
    ]
  },
  {
    "street": "Hamilton Road",
    "days": [
      10
    ]
  },
  {
    "street": "Henley Way",
    "days": [
      15
    ]
  },
  {
    "street": "Hereward Street",
    "days": [
      10
    ]
  },
  {
    "street": "Herons Close",
    "days": [
      8
    ]
  },
  {
    "street": "Hertford Close",
    "days": [
      17
    ]
  },
  {
    "street": "High Barns",
    "days": [
      14
    ]
  },
  {
    "street": "Hills Lane",
    "days": [
      7
    ]
  },
  {
    "street": "Hollendale Way",
    "days": [
      10
    ]
  },
  {
    "street": "Holly Walk",
    "days": [
      15
    ]
  },
  {
    "street": "Houghton Gardens",
    "days": [
      11
    ]
  },
  {
    "street": "John Amner Close",
    "days": [
      9
    ]
  },
  {
    "street": "Jubilee Terrace",
    "days": [
      11
    ]
  },
  {
    "street": "Juniper Drive",
    "days": [
      15
    ]
  },
  {
    "street": "Kent Close",
    "days": [
      8
    ]
  },
  {
    "street": "King Edgar Close",
    "days": [
      9
    ]
  },
  {
    "street": "Kings Avenue (excluding Bentham Way area)",
    "days": [
      16
    ]
  },
  {
    "street": "Kings Avenue (From Lynn Road to Bentham Way)",
    "days": [
      9
    ]
  },
  {
    "street": "Kingsley Walk",
    "days": [
      21
    ]
  },
  {
    "street": "Landsdown Close",
    "days": [
      10
    ]
  },
  {
    "street": "Langham Way",
    "days": [
      16
    ]
  },
  {
    "street": "Larkfield Road",
    "days": [
      14
    ]
  },
  {
    "street": "Leicester Close",
    "days": [
      17
    ]
  },
  {
    "street": "Lisle Lane (part)",
    "days": [
      11
    ]
  },
  {
    "street": "Little Lane",
    "days": [
      7
    ]
  },
  {
    "street": "Longchamp Drive",
    "days": [
      16
    ]
  },
  {
    "street": "Longfields",
    "days": [
      10
    ]
  },
  {
    "street": "Lumley Close",
    "days": [
      22
    ]
  },
  {
    "street": "Lynn Road (Egremont Street – John Amner Close)",
    "days": [
      14
    ]
  },
  {
    "street": "Lynn Road (John Amner Close – King Edgar Close)",
    "days": [
      9
    ]
  },
  {
    "street": "Lynton Close",
    "days": [
      9
    ]
  },
  {
    "street": "Lynton Drive",
    "days": [
      9
    ]
  },
  {
    "street": "Mallow Close",
    "days": [
      18
    ]
  },
  {
    "street": "Marriott Drive",
    "days": [
      11
    ]
  },
  {
    "street": "Mawson Close",
    "days": [
      10
    ]
  },
  {
    "street": "Meadow Way",
    "days": [
      10
    ]
  },
  {
    "street": "Meldon Place",
    "days": [
      9
    ]
  },
  {
    "street": "Merivale Way",
    "days": [
      16
    ]
  },
  {
    "street": "Merlin Drive",
    "days": [
      8
    ]
  },
  {
    "street": "Monarch Way",
    "days": [
      22
    ]
  },
  {
    "street": "Morley Drive",
    "days": [
      10
    ]
  },
  {
    "street": "Morton Close",
    "days": [
      22
    ]
  },
  {
    "street": "Mulberry Way",
    "days": [
      15
    ]
  },
  {
    "street": "Murfitt Close",
    "days": [
      10
    ]
  },
  {
    "street": "Nene Road",
    "days": [
      18
    ]
  },
  {
    "street": "New Barns Avenue",
    "days": [
      14
    ]
  },
  {
    "street": "New Barns Road (Excluding opposite shop near Beech Lane)",
    "days": [
      15
    ]
  },
  {
    "street": "New Barns Road (opposite Shop near Beech Lane)",
    "days": [
      14
    ]
  },
  {
    "street": "Newnham Street",
    "days": [
      15
    ]
  },
  {
    "street": "Norfolk Road",
    "days": [
      17
    ]
  },
  {
    "street": "Northampton Close",
    "days": [
      17
    ]
  },
  {
    "street": "Northwold",
    "days": [
      8
    ]
  },
  {
    "street": "Nutholt Lane",
    "days": [
      15
    ]
  },
  {
    "street": "Osier Close",
    "days": [
      11
    ]
  },
  {
    "street": "Parade Lane",
    "days": [
      11
    ]
  },
  {
    "street": "Pasture Grove",
    "days": [
      10
    ]
  },
  {
    "street": "Philippa Close",
    "days": [
      9
    ]
  },
  {
    "street": "Pilgrims Way",
    "days": [
      17
    ]
  },
  {
    "street": "Potters Lane",
    "days": [
      11
    ]
  },
  {
    "street": "Prickwillow Road",
    "days": [
      15
    ]
  },
  {
    "street": "Priors Court",
    "days": [
      8
    ]
  },
  {
    "street": "Ramsey Road",
    "days": [
      14
    ]
  },
  {
    "street": "Red Admiral Street",
    "days": [
      22
    ]
  },
  {
    "street": "Ship Lane",
    "days": [
      11
    ]
  },
  {
    "street": "Silver Street",
    "days": [
      11
    ]
  },
  {
    "street": "Skipper Walk",
    "days": [
      22
    ]
  },
  {
    "street": "St Andrews Way",
    "days": [
      8
    ]
  },
  {
    "street": "St Audreys Way",
    "days": [
      9
    ]
  },
  {
    "street": "St Ethelwold’s Close",
    "days": [
      7
    ]
  },
  {
    "street": "St Johns Road",
    "days": [
      10
    ]
  },
  {
    "street": "St Martin’s Walk",
    "days": [
      15
    ]
  },
  {
    "street": "St Marys Street (part)",
    "days": [
      11
    ]
  },
  {
    "street": "St Ovin’s Green",
    "days": [
      7
    ]
  },
  {
    "street": "Station Road",
    "days": [
      11
    ]
  },
  {
    "street": "Stour Green",
    "days": [
      18
    ]
  },
  {
    "street": "Suffolk Close",
    "days": [
      17
    ]
  },
  {
    "street": "Summer Hayes",
    "days": [
      15
    ]
  },
  {
    "street": "Sycamore Lane",
    "days": [
      15
    ]
  },
  {
    "street": "Teasel Drive",
    "days": [
      18
    ]
  },
  {
    "street": "Tennyson Place",
    "days": [
      21
    ]
  },
  {
    "street": "The Chase",
    "days": [
      10
    ]
  },
  {
    "street": "The Gallery",
    "days": [
      11
    ]
  },
  {
    "street": "The Medway",
    "days": [
      18
    ]
  },
  {
    "street": "The Paddock",
    "days": [
      14
    ]
  },
  {
    "street": "The Turnpike",
    "days": [
      17
    ]
  },
  {
    "street": "Thirlby Gardens",
    "days": [
      16
    ]
  },
  {
    "street": "Tower Road",
    "days": [
      17
    ]
  },
  {
    "street": "Turner Drive",
    "days": [
      16
    ]
  },
  {
    "street": "Upherds Lane",
    "days": [
      8
    ]
  },
  {
    "street": "Victoria Street",
    "days": [
      11
    ]
  },
  {
    "street": "Walsingham Way",
    "days": [
      7
    ]
  },
  {
    "street": "Warwick Drive",
    "days": [
      17
    ]
  },
  {
    "street": "Waterside",
    "days": [
      11
    ]
  },
  {
    "street": "Welland Place",
    "days": [
      18
    ]
  },
  {
    "street": "Wensum Way",
    "days": [
      18
    ]
  },
  {
    "street": "West End",
    "days": [
      7
    ]
  },
  {
    "street": "West End (Chiefs Street - St Mary's Street)",
    "days": [
      10
    ]
  },
  {
    "street": "West Fen Road (Downham Road - St Ovins Green)",
    "days": [
      7
    ]
  },
  {
    "street": "West Fen Road (St Ovins Green - Dunstan Street)",
    "days": [
      8
    ]
  },
  {
    "street": "Wilford Drive",
    "days": [
      16
    ]
  },
  {
    "street": "Williams Close",
    "days": [
      22
    ]
  },
  {
    "street": "Willow Grove",
    "days": [
      11
    ]
  },
  {
    "street": "Willow Walk",
    "days": [
      11
    ]
  },
  {
    "street": "Wissey Way",
    "days": [
      18
    ]
  },
  {
    "street": "Witchford Road",
    "days": [
      17
    ]
  },
  {
    "street": "Wren Close",
    "days": [
      8
    ]
  },
  {
    "street": "Yorke Way",
    "days": [
      10
    ]
  }
];
export function routeDate(day: number) {
 return `${routes.find(route => route.day === day)?.weekday} ${day} December`;
}
