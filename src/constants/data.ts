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
