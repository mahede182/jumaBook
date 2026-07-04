export interface BookingData {
  id: string;
  rating: string;
  reviewsCount: string;
  date: string;
  title: string;
  originalPrice: string;
  discountedPrice: string;
  discountTag: string;
  status: 'Upcoming' | 'Completed';
  imageUrl: string;
}

export const BOOKINGS: BookingData[] = [
  {
    id: '1',
    rating: '4.95',
    reviewsCount: '657',
    date: '10/6/13 . 07:59 pm',
    title: 'From Saudia arabia\nHarry potter warner Bros\nStudio Tickets with...',
    originalPrice: '17.000',
    discountedPrice: '16.000',
    discountTag: '5% off',
    status: 'Upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1549643276-fdf2fab574f5?w=400&q=80',
  },
  {
    id: '2',
    rating: '4.80',
    reviewsCount: '230',
    date: '12/8/23 . 02:15 pm',
    title: 'Dubai Desert Safari\nVIP Red Dune Bashing\nCamel Ride & BBQ...',
    originalPrice: '25.000',
    discountedPrice: '20.000',
    discountTag: '20% off',
    status: 'Upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80',
  },
  {
    id: '3',
    rating: '5.00',
    reviewsCount: '1,204',
    date: '05/4/21 . 10:00 am',
    title: 'Burj Khalifa At the Top\nLevel 124 & 125 Entry\nTickets + Fast Track...',
    originalPrice: '40.000',
    discountedPrice: '38.000',
    discountTag: '5% off',
    status: 'Upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80',
  },
  {
    id: '4',
    rating: '4.75',
    reviewsCount: '412',
    date: '02/11/20 . 09:30 am',
    title: 'Louvre Abu Dhabi\nGeneral Admission\nSkip the line entry...',
    originalPrice: '15.000',
    discountedPrice: '15.000',
    discountTag: '',
    status: 'Completed',
    imageUrl: 'https://images.unsplash.com/photo-1549643276-fdf2fab574f5?w=400&q=80',
  },
  {
    id: '5',
    rating: '4.90',
    reviewsCount: '89',
    date: '08/9/19 . 04:45 pm',
    title: 'Museum of the Future\nAccess to all floors\nImmersive Experience...',
    originalPrice: '22.000',
    discountedPrice: '19.800',
    discountTag: '10% off',
    status: 'Completed',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80',
  },
];

export interface ItineraryItem {
  id: number;
  title: string;
  subtitle: string;
  type: string;
  stopNumber?: number;
}

export const ITINERARY_DATA: ItineraryItem[] = [
  { id: 1, title: 'Madina munawara', subtitle: 'Start point', type: 'start' },
  { id: 2, title: 'Al-Masjid an-Nabawi', subtitle: '', type: 'stop', stopNumber: 1 },
  { id: 3, title: 'Jannat al-Baqi (Baqi Cemetery)', subtitle: 'Tickets included', type: 'stop', stopNumber: 2 },
  { id: 4, title: 'Masjid Quba', subtitle: '', type: 'stop', stopNumber: 3 },
  { id: 5, title: 'Masjid Qiblatain', subtitle: '', type: 'stop', stopNumber: 4 },
  { id: 6, title: 'Dar Al-Madina Museum', subtitle: 'End point (Ending point would be start point)', type: 'end' },
];

export const ITINERARY_INFO = {
  duration: '5 Hours',
  transport: 'AC Minibus',
};

export const REVIEWS_DATA = {
  score: '4.95',
  count: '617',
  ratings: [
    { stars: 5, pct: '70%' },
    { stars: 4, pct: '12%' },
    { stars: 3, pct: '3%' },
    { stars: 2, pct: '2%' },
    { stars: 1, pct: '1%' },
  ],
  featured: {
    name: 'Haydn',
    date: '10 June 2023',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=haydn',
    comment: 'Cruising up past the cliffs as the sun returns in the late afternoon is an experience in a place of absolute historical wonders that is truly awe inspiring.',
    photos: [
      'https://images.unsplash.com/photo-1549643276-fdf2fab574f5?w=200&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=200&q=80',
      'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=200&q=80',
    ],
  },
};

export const KEY_INFO_DATA = {
  duration: '11 Hours',
  groupSizeLabel: 'Group size ( Up to 4 guests per session )',
  groupSizeValue: 'Snack included',
};
