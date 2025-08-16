export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'coffee' | 'food' | 'dessert' | 'cold-drinks';
  sizes?: Size[];
  customizations?: Customization[];
  isPopular?: boolean;
  isNew?: boolean;
}

export interface Size {
  name: string;
  price: number;
}

export interface Customization {
  id: string;
  name: string;
  options: CustomizationOption[];
  required?: boolean;
  maxSelections?: number;
}

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedSize?: Size;
  selectedCustomizations: SelectedCustomization[];
  totalPrice: number;
}

export interface SelectedCustomization {
  customizationId: string;
  customizationName: string;
  selectedOptions: CustomizationOption[];
}

export interface UserPreferences {
  favoriteProducts: string[];
  defaultCustomizations: Record<string, SelectedCustomization[]>;
  deliveryAddress?: Address;
  paymentMethods: PaymentMethod[];
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'cash';
  label: string;
  lastFour?: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  orderDate: Date;
  estimatedTime?: number;
  deliveryAddress?: Address;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  hours: StoreHours;
  coordinates: {
    lat: number;
    lng: number;
  };
  amenities: string[];
  driveThru?: boolean;
}

export interface StoreHours {
  [key: string]: {
    open: string;
    close: string;
    closed?: boolean;
  };
}