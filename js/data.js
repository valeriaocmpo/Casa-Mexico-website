/* Casa México restaurant data: locations, hours, menu and prices. Edit here; every page reads from this file. */
var LOCS = [
  { id: 'merivale', k: 'm', name: 'Merivale', street: '1491 Merivale Rd, Nepean', addr: '1491 Merivale Rd, Nepean, ON K2E 5P3', phone: '(613) 695-7899', tel: 'tel:+16136957899', map: 'https://www.google.com/maps/search/?api=1&query=Casa+Mexico+1491+Merivale+Rd+Nepean+ON', uber: 'https://www.ubereats.com/ca/search?q=Casa%20Mexico%20Merivale', skip: 'https://www.skipthedishes.com/casa-mexico',
    hours: ['1-7 pm', '12-9 pm', '12-9 pm', '12-9 pm', '12-9 pm', '12-9 pm', '12-9 pm'] },
  { id: 'preston', k: 'p', name: 'Preston', street: '226 Preston St, Little Italy', addr: '226 Preston St, Ottawa, ON K1R 7R2', phone: '(613) 695-7811', tel: 'tel:+16136957811', map: 'https://www.google.com/maps/search/?api=1&query=Casa+Mexico+226+Preston+St+Ottawa+ON', uber: 'https://www.ubereats.com/ca/store/casa-mexico-preston-st/T31c_AnKWU-yti6iDj4-Mw', skip: 'https://www.skipthedishes.com/casa-mexico-preston',
    hours: ['12-7 pm', '12-9 pm', '12-9 pm', '12-9 pm', '12-9 pm', '12-9:30 pm', '12-9:30 pm'] },
  { id: 'kanata', k: 'k', name: 'Kanata', street: '7 Kakulu Rd, Kanata', addr: '7 Kakulu Rd, Kanata, ON K2L 2L4', phone: '(613) 271-1841', tel: 'tel:+16132711841', map: 'https://www.google.com/maps/search/?api=1&query=Casa+Mexico+7+Kakulu+Rd+Kanata+ON', uber: 'https://www.ubereats.com/ca/store/casa-mexico-kanata/6z4iMhBFXgmRsMo4Aaw9cQ', skip: 'https://www.skipthedishes.com/casa-mexico-kanata',
    hours: ['12-7 pm', 'Closed', '12-8 pm', '12-8 pm', '12-8 pm', '12-9 pm', '12-9 pm'] }
];
var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
function A(x) { return { m: x, p: x, k: x }; }
var VG = 'Vegetarian', VN = 'Vegan';
var CATS = [
  { id: 'starters', label: 'Starters' },
  { id: 'traditionals', label: 'Traditionals' },
  { id: 'tacos', label: 'Tacos' },
  { id: 'platters', label: 'Platters' },
  { id: 'sides', label: 'Sides' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'bar', label: 'Bar' }
];

var NOTES = {
  tacos: 'Sold one at a time, so mix and match. On Tuesdays every taco is $6.',
  platters: 'Made for sharing with the table.',
  bar: 'Margaritas come with a Tajín rim. Upgrade any margarita to mezcal, Maestro Dobel or Don Julio.'
};
var MENU = [
  { c: 'starters', n: 'Guacamole & Chips', t: [VN], pr: A('$17.90') },
  { c: 'starters', n: 'Pico de Gallo & Chips', t: [VN], pr: A('$14.90') },
  { c: 'starters', n: 'Nachos Casa México', d: 'Refried beans, pico de gallo, pickled jalapeños, sour cream, queso fresco, guacamole', t: [VG], note: 'Add chicken or birria +$6', pr: A('$24.75') },
  { c: 'starters', n: 'Mexican Fries', d: 'Fries, mozzarella, birria, chipotle mayo, pico de gallo, cilantro', t: ['Spicy'], pr: A('$17.75') },
  { c: 'starters', n: 'Elote', d: 'Street corn topped with chipotle mayo, Tajín and queso fresco', t: [VG], pr: A('$8.90') },
  { c: 'starters', n: 'Sopa de Tortilla', d: 'Tomato soup, crispy corn tortilla strips, avocado, sour cream, mozzarella, cilantro', t: [VG], pr: { m: 'Sm $8.90 / Reg $13.50', p: '$8.90', k: 'Sm $8.90 / Lg $13.50' } },

  { c: 'traditionals', n: 'Quesabirrias', d: 'Three quesadillas with birria, cilantro and onion, with a side of birria broth', fav: true, pr: A('$27.00') },
  { c: 'traditionals', n: 'Enchiladas', d: 'Three rolled tortillas with lettuce, tomato, radish, sour cream and queso fresco. Served with rice and refried beans', t: [VG, 'Spicy'], pr: A('$27.50') },
  { c: 'traditionals', n: 'Tacos Dorados', d: 'Three crispy rolled tacos', t: [VG], pr: A('$25.00') },
  { c: 'traditionals', n: 'Chilaquiles', d: 'Salsa verde or roja, tortilla chips, sour cream, queso fresco, cilantro, onion', t: [VG, 'Spicy'], pr: A('$23.00') },
  { c: 'traditionals', n: 'Quesadillas', d: 'Three quesadillas with pico de gallo and sour cream', t: [VG], pr: A('$16.50') },
  { c: 'traditionals', n: 'Tacos de Arrachera', d: 'Three tacos with grilled flank steak fajitas', pr: A('$31.00') },

  { c: 'tacos', n: 'Birria', d: 'Shredded beef marinated in adobo, cilantro, onion', fav: true, pr: A('$7.00') },
  { c: 'tacos', n: 'Pastor', d: 'Pork in our traditional pastor marinade, pineapple, cilantro, onion', pr: { m: '$7.00', p: '$7.00' } },
  { c: 'tacos', n: 'Tinga', d: 'Shredded chicken and onion in tomato-chipotle sauce, cilantro', pr: A('$6.75') },
  { c: 'tacos', n: 'Carnitas', d: 'Shredded pork, cilantro, onion', pr: A('$6.75') },
  { c: 'tacos', n: 'Aguacate', d: 'Crispy avocado, pickled vegetables, red cabbage, carrots, chipotle mayo, cilantro', t: [VG], pr: A('$6.75') },
  { c: 'tacos', n: 'Coliflor', d: 'Crispy cauliflower, pickled vegetables, red cabbage, carrots, chipotle mayo, cilantro', t: [VG], pr: A('$6.75') },
  { c: 'tacos', n: 'Pescado', d: 'Soda-battered fish, pickled vegetables, lettuce, chipotle mayo, cilantro', pr: { m: '$9.25', p: '$9.25', k: '$9.00' } },
  { c: 'tacos', n: 'Camarón', d: 'Soda-battered shrimp, pickled vegetables, red cabbage, chipotle mayo, cilantro', pr: { m: '$9.25', p: '$9.25', k: '$9.00' } },
  { c: 'tacos', n: 'Gringa', d: 'Pastor with a cheese crust, pineapple, cilantro, onion', pr: { m: '$9.25', p: '$9.25', k: '$9.00' } },

  { c: 'platters', n: 'Amigo', d: '8 quesabirrias', pr: A('$65.00') },
  { c: 'platters', n: 'Taco', d: '10 tacos of your choice', note: 'Seafood and gringa +$2 each', pr: A('$62.00') },
  { c: 'platters', n: 'Fiesta', d: '4 quesabirrias and 4 tacos', pr: A('$62.00') },

  { c: 'sides', n: 'Guacamole', t: [VN], pr: A('Sm $3.00 / Lg $12.90') },
  { c: 'sides', n: 'Pico de Gallo', t: [VN], pr: { m: 'Sm $2.00 / Lg $9.25', p: 'Sm $2.00 / Lg $9.25', k: 'Sm $2.00 / Lg $9.50' } },
  { c: 'sides', n: 'Tortilla Chips', t: [VN], pr: A('$4.00') },
  { c: 'sides', n: 'Rice', t: [VN], pr: A('$3.50') },
  { c: 'sides', n: 'Refried Beans', t: [VN], pr: A('$3.75') },
  { c: 'sides', n: 'Birria Broth', pr: A('$4.50') },

  { c: 'desserts', n: 'Churros', d: 'Coated in cinnamon sugar, with your choice of sauce', pr: { m: '2 pcs $9.75 / 10 pcs $44.50', k: '2 pcs $9.75 / 10 pcs $44.50' } },
  { c: 'desserts', n: 'Mini Churros', d: 'Coated in cinnamon sugar, with condensed milk, chocolate or caramel', pr: { p: '4 pcs $9.75 / 20 pcs $44.10' } },
  { c: 'desserts', n: 'Tres Leches Cake', pr: A('$8.25') },
  { c: 'desserts', n: 'Platanitos', d: 'Fried plantain with condensed milk', t: [VG], pr: A('$8.25') },

  { c: 'drinks', n: 'Horchata', pr: A('Glass $4.25 / Pitcher $11.75') },
  { c: 'drinks', n: 'Tamarindo', pr: { m: 'Glass $4.25 / Pitcher $11.75', k: 'Glass $4.25 / Pitcher $11.75' } },
  { c: 'drinks', n: 'Mangonada', d: 'Mango slush with chamoy and Tajín', pr: A('$13.50') },
  { c: 'drinks', n: 'Mango Smoothie', pr: { k: '$7.00' } },
  { c: 'drinks', n: 'Mocktails', d: { m: 'Piña colada, margarita or mojito', p: 'Tequila sunrise, piña colada, margarita or mojito', k: 'Margarita, tequila sunrise, piña colada, strawberry daiquiri or mojito' }, pr: A('$7.50') },
  { c: 'drinks', n: 'Chelada or Michelada', d: 'Made with Corona 0.0%', pr: A('$7.00 / $8.00') },
  { c: 'drinks', n: 'Mexican Coca-Cola', pr: A('$4.90') },
  { c: 'drinks', n: 'Jarritos', pr: A('$4.90') },
  { c: 'drinks', n: 'Pop', pr: { k: '$3.25' } },
  { c: 'drinks', n: 'Perrier', pr: A('$3.85') },
  { c: 'drinks', n: 'Coffee', pr: { m: '$3.35' } },
  { c: 'drinks', n: 'Americano', pr: { k: '$3.35' } },
  { c: 'drinks', n: 'Nespresso Americano or Espresso', pr: { p: '$4.10' } },
  { c: 'drinks', n: 'Tea', pr: A('$3.35') },

  { c: 'bar', n: 'Margarita', d: '1.5 oz Jose Cuervo', pr: A('$14.50') },
  { c: 'bar', n: 'Margarita Casa', d: '2 oz Jose Cuervo with Grand Marnier', fav: true, pr: A('$19.00') },
  { c: 'bar', n: 'Flavoured Margaritas', d: { m: 'Spicy, spicy mango, tamarindo or azul', p: 'Spicy, spicy mango or azul', k: 'Jalapeño, mango, tamarindo, azul or spicy' }, pr: A('$14.50') },
  { c: 'bar', n: 'Margarita Madre', d: '5 oz, built for sharing', pr: { p: '$36.00' } },
  { c: 'bar', n: 'Paloma', d: 'Jose Cuervo, grapefruit soda, Tajín rim', pr: A('$14.50') },
  { c: 'bar', n: 'Michelada', d: 'Beer, Clamato, Tabasco, Maggi, Worcestershire, Tajín, lime', pr: A('$14.50') },
  { c: 'bar', n: 'Chelada', d: 'Beer, lime, salt', pr: { m: '$10.00', p: '$10.00' } },
  { c: 'bar', n: 'Red Sangria', pr: A('Glass $13.50 / Pitcher $39.00') },
  { c: 'bar', n: 'Mojito', pr: A('$15.50') },
  { c: 'bar', n: 'Cuba Libre', d: 'Rum, Coke, lime', pr: A('$14.50') },
  { c: 'bar', n: 'Piña Colada', pr: A('$14.50') },
  { c: 'bar', n: 'Strawberry Daiquiri', pr: { k: '$14.50' } },
  { c: 'bar', n: 'Tequila Sunrise', pr: { p: '$14.50' } },
  { c: 'bar', n: 'Mexican Submarine', pr: { p: '$14.50' } },
  { c: 'bar', n: 'Carajillo', pr: { p: '$14.50' } },
  { c: 'bar', n: 'Gin or Vodka Tonic', pr: { m: '$14.50', p: '$14.50' } },
  { c: 'bar', n: 'Cocktail Tower', d: '3 litres', pr: { p: '$65.00' } },
  { c: 'bar', n: 'Draft Beer', d: '16 oz Dos Equis or Stella', pr: { p: '$12.00' } },
  { c: 'bar', n: 'Beer Tower', d: '3 litres', pr: { p: '$57.00' } },
  { c: 'bar', n: 'Bottled Beer', d: { m: 'Dos Equis, Corona, Modelo, Negra Modelo, Sol, Tecate', p: 'Corona, Modelo, Negra Modelo, Sol, Tecate', k: 'Dos Equis, Corona, Modelo, Negra Modelo, Sol, Tecate' }, pr: A('$9.00') },
  { c: 'bar', n: 'Cubetazo', d: 'Bucket of 5 beers', pr: A('$40.00') },
  { c: 'bar', n: 'Corona 0.0%', pr: A('$4.95') },
  { c: 'bar', n: 'Ruffino Pinot Grigio', d: 'Italy', pr: A('9 oz $14.95 / Bottle $41.50') },
  { c: 'bar', n: 'Casillero del Diablo Cabernet Sauvignon', d: 'Chile', pr: A('9 oz $14.95 / Bottle $41.50') },
  { c: 'bar', n: 'Tequila & Mezcal', d: { m: 'Don Julio Blanco, Casamigos Reposado, Maestro Dobel, 1800 Blanco, Reposado and Añejo, Jose Cuervo Especial, mezcal', p: 'Don Julio Blanco, Casamigos Reposado, Maestro Dobel, 1800 Blanco, Reposado and Añejo, Jose Cuervo Especial, mezcal', k: 'Don Julio Blanco, 1800 Reposado, Jose Cuervo Especial, mezcal' }, pr: A('$7-15 per oz') }
];
