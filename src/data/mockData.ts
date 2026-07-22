// ============================================================
// Vatika Naturals – GO IN 20 — Mock Data
// All data is simulated for demonstration purposes only.
// ============================================================

export interface Participant {
  id: number;
  name: string;
  city: string;
  avatar: string;
  likes: number;
  rank: number;
  points: number;
  movement: "up" | "down" | "stable";
  videoTitle: string;
  joinedDaysAgo: number;
}

export interface Store {
  id: number;
  name: string;
  area: string;
  distance: string;
  isOpen: boolean;
  phone: string;
  address: string;
}

export interface Reward {
  id: number;
  tier: "bronze" | "silver" | "gold" | "grand";
  title: string;
  description: string;
  pointsRequired: number;
  icon: string;
  claimed: number;
  total: number;
}

export interface CommunityStats {
  participants: number;
  videos: number;
  reach: string;
  rewardsClaimed: number;
}

export const communityStats: CommunityStats = {
  participants: 8423,
  videos: 3150,
  reach: "1.2M",
  rewardsClaimed: 426,
};

export const participants: Participant[] = [
  {
    id: 1,
    name: "Ayesha Rahman",
    city: "Dhaka",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ayesha&backgroundColor=c8e6b9",
    likes: 2847,
    rank: 1,
    points: 9850,
    movement: "stable",
    videoTitle: "My 20-Min Morning Routine ✨",
    joinedDaysAgo: 12,
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    city: "Chattogram",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Nusrat&backgroundColor=c8e6b9",
    likes: 2134,
    rank: 2,
    points: 8720,
    movement: "up",
    videoTitle: "Vatika Changed My Hair Game 💚",
    joinedDaysAgo: 8,
  },
  {
    id: 3,
    name: "Maliha Tasnim",
    city: "Sylhet",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Maliha&backgroundColor=c8e6b9",
    likes: 1956,
    rank: 3,
    points: 7980,
    movement: "up",
    videoTitle: "20 Minutes is All You Need 🌿",
    joinedDaysAgo: 15,
  },
  {
    id: 4,
    name: "Farzana Akter",
    city: "Rajshahi",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Farzana&backgroundColor=c8e6b9",
    likes: 1678,
    rank: 4,
    points: 6540,
    movement: "down",
    videoTitle: "Busy Mom Hair Hack 💁‍♀️",
    joinedDaysAgo: 20,
  },
  {
    id: 5,
    name: "Sadia Islam",
    city: "Dhaka",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sadia&backgroundColor=c8e6b9",
    likes: 1423,
    rank: 5,
    points: 5890,
    movement: "up",
    videoTitle: "No More Overnight Oil! 🎯",
    joinedDaysAgo: 5,
  },
  {
    id: 6,
    name: "Nabila Hossain",
    city: "Khulna",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Nabila&backgroundColor=c8e6b9",
    likes: 1287,
    rank: 6,
    points: 5210,
    movement: "down",
    videoTitle: "College Life x Vatika 📚",
    joinedDaysAgo: 18,
  },
  {
    id: 7,
    name: "Rumana Aktar",
    city: "Dhaka",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Rumana&backgroundColor=c8e6b9",
    likes: 1105,
    rank: 7,
    points: 4780,
    movement: "up",
    videoTitle: "Self-Care Sunday 🌸",
    joinedDaysAgo: 9,
  },
  {
    id: 8,
    name: "Tasmia Khan",
    city: "Chattogram",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Tasmia&backgroundColor=c8e6b9",
    likes: 989,
    rank: 8,
    points: 4320,
    movement: "stable",
    videoTitle: "From Frizz to Fab 💫",
    joinedDaysAgo: 22,
  },
  {
    id: 9,
    name: "Priya Das",
    city: "Sylhet",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Priya&backgroundColor=c8e6b9",
    likes: 876,
    rank: 9,
    points: 3990,
    movement: "up",
    videoTitle: "Quick Fix Before Class 🎓",
    joinedDaysAgo: 14,
  },
  {
    id: 10,
    name: "Jannatul Ferdous",
    city: "Rajshahi",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Jannatul&backgroundColor=c8e6b9",
    likes: 754,
    rank: 10,
    points: 3650,
    movement: "down",
    videoTitle: "Vatika x My Routine 🌿",
    joinedDaysAgo: 25,
  },
  {
    id: 11,
    name: "Mehjabin Chowdhury",
    city: "Dhaka",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Mehjabin&backgroundColor=c8e6b9",
    likes: 643,
    rank: 11,
    points: 3280,
    movement: "up",
    videoTitle: "Weekend Vibes with Vatika 🌺",
    joinedDaysAgo: 11,
  },
  {
    id: 12,
    name: "Sumaiya Alam",
    city: "Khulna",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sumaiya&backgroundColor=c8e6b9",
    likes: 521,
    rank: 12,
    points: 2910,
    movement: "stable",
    videoTitle: "Natural Hair, Natural Me 🍃",
    joinedDaysAgo: 30,
  },
];

export const stores: Store[] = [
  {
    id: 1,
    name: "Beauty Plus",
    area: "Gulshan",
    distance: "0.8 km",
    isOpen: true,
    phone: "+880 1712-345678",
    address: "House 45, Road 11, Gulshan-2, Dhaka",
  },
  {
    id: 2,
    name: "Shajgoj Partner Store",
    area: "Dhanmondi",
    distance: "1.2 km",
    isOpen: true,
    phone: "+880 1898-765432",
    address: "Road 27, Dhanmondi, Dhaka",
  },
  {
    id: 3,
    name: "Glow Cosmetics",
    area: "Banani",
    distance: "2.1 km",
    isOpen: false,
    phone: "+880 1556-789012",
    address: "Block E, Banani, Dhaka",
  },
  {
    id: 4,
    name: "Natural Care",
    area: "Mirpur",
    distance: "3.5 km",
    isOpen: true,
    phone: "+880 1912-456789",
    address: "Section 10, Mirpur, Dhaka",
  },
  {
    id: 5,
    name: "Fresh Mart Beauty",
    area: "Gulshan",
    distance: "1.0 km",
    isOpen: true,
    phone: "+880 1678-901234",
    address: "DCC Market, Gulshan-1, Dhaka",
  },
  {
    id: 6,
    name: "Ruposhi Beauty House",
    area: "Dhanmondi",
    distance: "1.8 km",
    isOpen: true,
    phone: "+880 1845-234567",
    address: "Satmasjid Road, Dhanmondi, Dhaka",
  },
  {
    id: 7,
    name: "Laboni Cosmetics",
    area: "Banani",
    distance: "2.4 km",
    isOpen: true,
    phone: "+880 1723-567890",
    address: "Road 11, Banani DOHS, Dhaka",
  },
  {
    id: 8,
    name: "Green Glow Store",
    area: "Mirpur",
    distance: "4.2 km",
    isOpen: false,
    phone: "+880 1934-678901",
    address: "Pallabi, Mirpur-12, Dhaka",
  },
];

export const rewards: Reward[] = [
  {
    id: 1,
    tier: "bronze",
    title: "Vatika Hair Oil Kit",
    description: "A complete Vatika Naturals hair care starter kit with coconut enriched oil.",
    pointsRequired: 500,
    icon: "🥉",
    claimed: 312,
    total: 500,
  },
  {
    id: 2,
    tier: "silver",
    title: "Spa Voucher ৳2,000",
    description: "Luxury spa treatment voucher at partner salons across Bangladesh.",
    pointsRequired: 2000,
    icon: "🥈",
    claimed: 89,
    total: 200,
  },
  {
    id: 3,
    tier: "gold",
    title: "Samsung Galaxy Buds",
    description: "Premium wireless earbuds — because your 20 minutes deserve great music.",
    pointsRequired: 5000,
    icon: "🥇",
    claimed: 23,
    total: 50,
  },
  {
    id: 4,
    tier: "grand",
    title: "Luxury Cox's Bazar Trip",
    description:
      "5-star resort experience for 2 at Cox's Bazar — flights, hotel, spa, and dining included.",
    pointsRequired: 10000,
    icon: "🏆",
    claimed: 0,
    total: 3,
  },
];

export const areas = ["Gulshan", "Dhanmondi", "Mirpur", "Banani"] as const;
export const cities = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna"] as const;
export const filterCities = ["All", "Dhaka", "Chattogram", "Sylhet"] as const;
