import { Product } from '@/types';

export const coffeeProducts: Product[] = [
  {
    id: '1',
    name: 'Signature Blend Espresso',
    description: 'Our signature espresso blend with rich, bold flavor and perfect crema. Made from premium Arabica beans.',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=300&fit=crop',
    category: 'coffee',
    isPopular: true,
    sizes: [
      { name: 'Single', price: 0 },
      { name: 'Double', price: 2.00 },
    ],
    customizations: [
      {
        id: 'milk-type',
        name: 'Milk Type',
        required: false,
        options: [
          { id: 'whole', name: 'Whole Milk', price: 0 },
          { id: 'almond', name: 'Almond Milk', price: 0.60 },
          { id: 'oat', name: 'Oat Milk', price: 0.70 },
          { id: 'coconut', name: 'Coconut Milk', price: 0.60 },
          { id: 'soy', name: 'Soy Milk', price: 0.50 },
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Vanilla Latte',
    description: 'Smooth espresso combined with steamed milk and vanilla syrup, topped with delicate foam art.',
    price: 6.25,
    image: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400&h=300&fit=crop',
    category: 'coffee',
    isPopular: true,
    sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 1.00 },
      { name: 'Large', price: 1.75 },
    ],
    customizations: [
      {
        id: 'milk-type',
        name: 'Milk Type',
        required: false,
        options: [
          { id: 'whole', name: 'Whole Milk', price: 0 },
          { id: 'almond', name: 'Almond Milk', price: 0.60 },
          { id: 'oat', name: 'Oat Milk', price: 0.70 },
          { id: 'coconut', name: 'Coconut Milk', price: 0.60 },
          { id: 'soy', name: 'Soy Milk', price: 0.50 },
        ]
      },
      {
        id: 'sweetness',
        name: 'Sweetness Level',
        required: false,
        options: [
          { id: 'no-sugar', name: 'No Sugar', price: 0 },
          { id: 'light', name: 'Light Sweet', price: 0 },
          { id: 'medium', name: 'Medium Sweet', price: 0 },
          { id: 'extra', name: 'Extra Sweet', price: 0 },
        ]
      },
      {
        id: 'extras',
        name: 'Add Extras',
        required: false,
        maxSelections: 3,
        options: [
          { id: 'extra-shot', name: 'Extra Shot', price: 1.50 },
          { id: 'decaf', name: 'Make it Decaf', price: 0 },
          { id: 'extra-hot', name: 'Extra Hot', price: 0 },
          { id: 'whipped-cream', name: 'Whipped Cream', price: 0.75 },
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Caramel Macchiato',
    description: 'Espresso marked with dolce de leche, steamed milk, and a drizzle of sweet caramel sauce.',
    price: 6.75,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop',
    category: 'coffee',
    sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 1.00 },
      { name: 'Large', price: 1.75 },
    ],
    customizations: [
      {
        id: 'milk-type',
        name: 'Milk Type',
        required: false,
        options: [
          { id: 'whole', name: 'Whole Milk', price: 0 },
          { id: 'almond', name: 'Almond Milk', price: 0.60 },
          { id: 'oat', name: 'Oat Milk', price: 0.70 },
          { id: 'coconut', name: 'Coconut Milk', price: 0.60 },
          { id: 'soy', name: 'Soy Milk', price: 0.50 },
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Cappuccino',
    description: 'Traditional Italian cappuccino with equal parts espresso, steamed milk, and foam. Perfect balance.',
    price: 5.75,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
    category: 'coffee',
    sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 0.75 },
      { name: 'Large', price: 1.50 },
    ],
    customizations: [
      {
        id: 'milk-type',
        name: 'Milk Type',
        required: false,
        options: [
          { id: 'whole', name: 'Whole Milk', price: 0 },
          { id: 'almond', name: 'Almond Milk', price: 0.60 },
          { id: 'oat', name: 'Oat Milk', price: 0.70 },
          { id: 'coconut', name: 'Coconut Milk', price: 0.60 },
          { id: 'soy', name: 'Soy Milk', price: 0.50 },
        ]
      }
    ]
  },
  {
    id: '5',
    name: 'Mocha Delight',
    description: 'Rich espresso blended with premium chocolate, steamed milk, and topped with whipped cream.',
    price: 6.95,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    category: 'coffee',
    isNew: true,
    sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 1.25 },
      { name: 'Large', price: 2.00 },
    ],
    customizations: [
      {
        id: 'milk-type',
        name: 'Milk Type',
        required: false,
        options: [
          { id: 'whole', name: 'Whole Milk', price: 0 },
          { id: 'almond', name: 'Almond Milk', price: 0.60 },
          { id: 'oat', name: 'Oat Milk', price: 0.70 },
          { id: 'coconut', name: 'Coconut Milk', price: 0.60 },
        ]
      }
    ]
  },
];

export const coldDrinks: Product[] = [
  {
    id: '6',
    name: 'Iced Americano',
    description: 'Bold espresso shots over ice with cold water. Simple, refreshing, and energizing.',
    price: 4.75,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
    category: 'cold-drinks',
    sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 0.75 },
      { name: 'Large', price: 1.25 },
    ],
  },
  {
    id: '7',
    name: 'Cold Brew Coffee',
    description: 'Smooth, rich cold brew steeped for 20 hours. Less acidic, naturally sweet, and incredibly refreshing.',
    price: 5.25,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&h=300&fit=crop',
    category: 'cold-drinks',
    isPopular: true,
    sizes: [
      { name: 'Medium', price: 0 },
      { name: 'Large', price: 1.00 },
    ],
  },
  {
    id: '8',
    name: 'Iced Caramel Latte',
    description: 'Our signature latte served over ice with caramel syrup and topped with caramel drizzle.',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    category: 'cold-drinks',
    sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 1.00 },
      { name: 'Large', price: 1.75 },
    ],
  },
];

export const foodItems: Product[] = [
  {
    id: '9',
    name: 'Artisan Croissant',
    description: 'Buttery, flaky croissant baked fresh daily. Perfect with your morning coffee.',
    price: 3.95,
    image: 'https://images.unsplash.com/photo-1555507036-ab794f77c85d?w=400&h=300&fit=crop',
    category: 'food',
  },
  {
    id: '10',
    name: 'Avocado Toast',
    description: 'Smashed avocado on artisan sourdough, topped with everything seasoning and a drizzle of olive oil.',
    price: 8.95,
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e0?w=400&h=300&fit=crop',
    category: 'food',
    isPopular: true,
  },
  {
    id: '11',
    name: 'Breakfast Sandwich',
    description: 'Fresh egg, aged cheddar, and applewood bacon on a toasted English muffin.',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=400&h=300&fit=crop',
    category: 'food',
  },
  {
    id: '12',
    name: 'Blueberry Muffin',
    description: 'House-made muffin bursting with fresh blueberries and a golden, tender crumb.',
    price: 4.25,
    image: 'https://images.unsplash.com/photo-1622485421520-15b36886db52?w=400&h=300&fit=crop',
    category: 'food',
  },
];

export const desserts: Product[] = [
  {
    id: '13',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream.',
    price: 6.95,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
    category: 'dessert',
    isPopular: true,
  },
  {
    id: '14',
    name: 'Chocolate Brownie',
    description: 'Decadent fudge brownie made with premium dark chocolate. Served warm with a scoop of vanilla ice cream.',
    price: 5.75,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop',
    category: 'dessert',
  },
  {
    id: '15',
    name: 'New York Cheesecake',
    description: 'Creamy, rich cheesecake with a graham cracker crust and your choice of berry compote.',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop',
    category: 'dessert',
  },
];

export const allProducts = [...coffeeProducts, ...coldDrinks, ...foodItems, ...desserts];