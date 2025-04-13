// Tipuri de date pentru aplicația de închiriere mașini

export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  pricePerDay: number;
  originalPricePerDay?: number; // Optional: Original price before discount
  pricePerWeek: number;
  pricePerMonth: number;
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  transmission: 'manual' | 'automatic';
  seats: number;
  doors: number;
  availableFrom: string; // format ISO
  availableTo: string; // format ISO
  features: string[];
  imageUrl: string;
  rating: number; // 1-5
  location: string;
  description: string;
  category: 'economy' | 'compact' | 'midsize' | 'luxury' | 'suv' | 'van';
}

export interface Booking {
  id: string;
  carId: string;
  userId: string;
  startDate: string; // format ISO
  endDate: string; // format ISO
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  drivingLicense: string;
  bookings?: string[]; // IDs of bookings
}
