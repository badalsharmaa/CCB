export const CATEGORIES = [
  { id: 'All', name: 'All Menu', icon: '/assets/order_page_icons/image.png' },
  { id: 'Street Foods', name: 'Street Foods', icon: '/assets/order_page_icons/street_foods.png' },
  { id: 'Special Thali', name: 'Special Thali', icon: '/assets/order_page_icons/special_thali.png' },
  { id: 'Fish & Shrimp Curries', name: 'Fish & Shrimp', icon: '/assets/order_page_icons/shrimp_&_fish.png' },
  { id: 'Tangra Indo-Chinese', name: 'Indo-Chinese', icon: '/assets/order_page_icons/indo_chinese.png' },
  { id: 'Biryani / Rice', name: 'Biryani / Rice', icon: '/assets/order_page_icons/briyani_&_rice.png' },
  { id: 'Daily Lunch Special', name: 'Lunch Special', icon: '/assets/order_page_icons/lunch_special.png' },
  { id: 'Curries', name: 'Curries', icon: '/assets/order_page_icons/curries.png' },
  { id: 'Tandoor', name: 'Tandoor', icon: '/assets/order_page_icons/tandoor.png' },
  { id: 'Bread from Tandoor', name: 'Breads', icon: '/assets/order_page_icons/breads.png' },
  // { id: 'Catering Trays', name: 'Catering Trays', icon: '/assets/order_page_icons/curries.png' },
  { id: 'Desserts', name: 'Desserts', icon: '/assets/order_page_icons/desserts.png' },
  { id: 'Drinks', name: 'Drinks', icon: '/assets/order_page_icons/drinks.png' },
];

export const MENU_ITEMS = [
  // STREET FOODS (Starters)
  { id: 101, category: "Street Foods", name: "Dalhousie Chicken Sandwich", price: 11.99, description: "Chicken tikka sandwich with chutney, mayo, onion, cucumber & cheese", image: "/assets/menu_assets/dalhousie_chicken_sandwich.png", spicy: false, veg: false, rating: 4.9, reviews: 210 },
  { id: 102, category: "Street Foods", name: "Pav Bhaji", price: 8.99, description: "Spicy mashed vegetables in tomato gravy served with buttered buns", image: "/assets/menu_assets/pav_bhaji.png", spicy: true, veg: true, rating: 4.8, reviews: 340 },
  { id: 103, category: "Street Foods", name: "Ghugni Ar Pauruti", price: 8.99, description: "Vegetarian. Yellow peas curry served with bread", image: "/assets/menu_assets/ghugni_ar_pauruti.png", spicy: false, veg: true, rating: 4.7, reviews: 150 },
  { id: 104, category: "Street Foods", name: "Street King Egg Roll", price: 10.99, description: "Classic Kolkata street-style egg roll with flaky flatbread, onion-cucumber salad & spices", image: "/assets/menu_assets/street_king_egg_roll.png", spicy: false, veg: false, rating: 4.9, reviews: 420 },
  { id: 105, category: "Street Foods", name: "Singara (Samosa)", price: 5.99, description: "Vegetarian. Fried pastry filled with spiced potatoes & peas", image: "/assets/menu_assets/singara.png", spicy: false, veg: true, rating: 4.8, reviews: 280 },
  { id: 106, category: "Street Foods", name: "Samosa Chaat", price: 8.99, description: "Samosa topped with chickpea curry, chutneys & spices", image: "/assets/menu_assets/samosa_chaat.png", spicy: false, veg: true, rating: 4.8, reviews: 190 },
  { id: 107, category: "Street Foods", name: "Aloo Tikki Chaat", price: 8.99, description: "Crispy potato patties with chutneys, curd & spices", image: "/assets/menu_assets/aloo_tikki_chaat.png", spicy: false, veg: true, rating: 4.7, reviews: 160 },
  { id: 108, category: "Street Foods", name: "Fuchka (Paani Poori) (7 Pcs)", price: 6.99, description: "Vegetarian. Crispy puris filled with spicy tangy water & stuffing", image: "/assets/menu_assets/fuchka.png", spicy: false, veg: true, rating: 4.9, reviews: 500 },
  { id: 109, category: "Street Foods", name: "Dahi Fuchka (7 Pcs)", price: 6.99, description: "Vegetarian. Puri filled with yogurt, chutneys & spices", image: "/assets/menu_assets/dahi_fuchka.png", spicy: false, veg: true, rating: 4.8, reviews: 220 },
  { id: 110, category: "Street Foods", name: "Chicken Egg Roll (1 Pc)", price: 12.49, description: "Crispy roll filled with seasoned chicken, shredded carrots & cabbage", image: "/assets/menu_assets/chicken_egg_roll.png", spicy: false, veg: false, rating: 4.9, reviews: 310 },
  { id: 111, category: "Street Foods", name: "Calcutta Style Vegetable Cutlet (2 Pcs)", price: 7.99, description: "Vegetarian. Crunchy cutlets made with beetroot, carrots & peanuts, deep-fried", image: "/assets/menu_assets/vegetable_cutlet.png", spicy: false, veg: true, rating: 4.6, reviews: 140 },
  { id: 112, category: "Street Foods", name: "Bengali Egg Devil (2 Pcs)", price: 8.99, description: "Half boiled egg stuffed with spiced mashed potato, coated & deep-fried", image: "/assets/menu_assets/egg_devil.png", spicy: false, veg: false, rating: 4.7, reviews: 110 },
  { id: 113, category: "Street Foods", name: "Calcutta Fish Fry (2 Pcs)", price: 10.99, description: "Fresh marinated fish fillet, deep-fried with crispy breadcrumb coating", image: "/assets/menu_assets/fish_fry.png", spicy: false, veg: false, rating: 4.8, reviews: 190 },
  { id: 114, category: "Street Foods", name: "Jhal Muri", price: 6.99, description: "Vegetarian. Puffed rice mixed with spices", image: "/assets/menu_assets/jhal_muri.png", spicy: false, veg: true, rating: 4.7, reviews: 250 },
  { id: 115, category: "Street Foods", name: "Veg Sandwich", price: 9.99, description: "Mixed vegetables layered in bread with an Indian-style twist", image: "/assets/menu_assets/veg_sandwich.png", spicy: false, veg: true, rating: 4.5, reviews: 80 },
  { id: 116, category: "Street Foods", name: "Mutton Cutlet", price: 10.99, description: "Minced mutton mixed with spices, breaded & deep-fried", image: "/assets/menu_assets/mutton_cutlet.png", spicy: false, veg: false, rating: 4.8, reviews: 170 },
  { id: 117, category: "Street Foods", name: "Kolkata Mughlai Paratha", price: 15.99, description: "Flaky stuffed flatbread with egg and onions, pan-fried", image: "/assets/menu_assets/kolkata_mughlai_paratha.png", spicy: false, veg: false, rating: 4.9, reviews: 380 },

  // SPECIAL THALI
  { id: 150, category: "Special Thali", name: "Brunch Special", price: 11.99, description: "2 pcs koraisutir kochuri, aloor dom (5 oz), narkol cholar dal (5 oz), and 1 gulab jamun", image: "/assets/menu_assets/brunch_special.png", spicy: false, veg: true, rating: 4.8, reviews: 120 },
  { id: 151, category: "Special Thali", name: "Weekend Special", price: 24.99, description: "Includes white rice, veg dal, jhuri aloo bhaja, echorer dalna, chicken or mutton kosha, katla kalia, and gulab jamun", image: "/assets/menu_assets/weekend_special.png", spicy: false, veg: false, rating: 4.9, reviews: 85 },
  { id: 152, category: "Special Thali", name: "Koraisutir Kochuri (1 Pc)", price: 2.99, description: "Deep-fried bread stuffed with spiced green peas", image: "/assets/menu_assets/koraisutir_kochuri.png", spicy: false, veg: true, rating: 4.7, reviews: 60 },

  // FISH & SHRIMP CURRIES
  { id: 180, category: "Fish & Shrimp Curries", name: "Shrimp Malai Curry", price: 18.99, description: "Tender shrimp cooked in a creamy coconut milk sauce with mild spices", image: "/assets/menu_assets/shrimp_malai_curry.png", spicy: false, veg: false, rating: 4.9, reviews: 150 },
  { id: 181, category: "Fish & Shrimp Curries", name: "Shrimp Curry", price: 18.99, description: "Shrimp simmered in a traditional onion-tomato gravy with Indian spices", image: "/assets/menu_assets/shrimp_curry.png", spicy: false, veg: false, rating: 4.7, reviews: 90 },
  { id: 182, category: "Fish & Shrimp Curries", name: "Shrimp Tikka Masala", price: 18.99, description: "Grilled shrimp cooked in a rich, creamy tomato-based masala sauce", image: "/assets/menu_assets/shrimp_tikka_masala.png", spicy: false, veg: false, rating: 4.8, reviews: 110 },
  { id: 183, category: "Fish & Shrimp Curries", name: "Shrimp Butter Masala", price: 18.99, description: "Shrimp in a buttery, creamy tomato gravy with aromatic spices", image: "/assets/menu_assets/shrimp_butter_masala.png", spicy: false, veg: false, rating: 4.8, reviews: 85 },
  { id: 184, category: "Fish & Shrimp Curries", name: "Fish Kalia (Katla)", price: 9.99, description: "Katla fish cooked in a rich onion-tomato gravy with traditional spices", image: "/assets/menu_assets/fish_kalia.png", spicy: false, veg: false, rating: 4.7, reviews: 130 },

  // TANGRA INDO-CHINESE
  { id: 201, category: "Tangra Indo-Chinese", name: "Tangra Chilli Chicken", price: 13.99, description: "Crispy chicken stir-fried with bell peppers, onions & chili sauce", image: "/assets/menu_assets/tangra_chilli_chicken.png", spicy: true, veg: false, rating: 4.8, reviews: 290 },
  { id: 202, category: "Tangra Indo-Chinese", name: "Tangra Chilli Fish", price: 14.99, description: "Crispy fish tossed with bell peppers, onions & green chilies", image: "/assets/menu_assets/tangra_chilli_fish.png", spicy: true, veg: false, rating: 4.7, reviews: 150 },
  { id: 203, category: "Tangra Indo-Chinese", name: "Tangra Chilli Paneer", price: 14.99, description: "Fried paneer tossed with onions, bell peppers & spicy chili sauce", image: "/assets/menu_assets/tangra_chilli_paneer.png", spicy: true, veg: true, rating: 4.7, reviews: 180 },
  { id: 204, category: "Tangra Indo-Chinese", name: "Tangra Chilli Shrimp", price: 15.99, description: "Battered fried shrimp tossed with onion, capsicum & tangy chili sauce", image: "/assets/menu_assets/tangra_chilli_shrimp.png", spicy: true, veg: false, rating: 4.8, reviews: 140 },
  { id: 205, category: "Tangra Indo-Chinese", name: "Gobi Manchurian", price: 10.99, description: "Crispy cauliflower tossed in sweet, sour & spicy Manchurian sauce", image: "/assets/menu_assets/gobi_manchurian.png", spicy: false, veg: true, rating: 4.7, reviews: 180 },
  { id: 206, category: "Tangra Indo-Chinese", name: "Chicken Manchurian", price: 13.99, description: "Deep-fried chicken sautéed with onions, peppers & Manchurian sauce", image: "/assets/menu_assets/chicken_manchurian.png", spicy: false, veg: false, rating: 4.7, reviews: 120 },
  { id: 207, category: "Tangra Indo-Chinese", name: "Fish Manchurian", price: 13.99, description: "Batter-fried fish tossed with onion, bell pepper & Manchurian sauce", image: "/assets/menu_assets/fish_manchurian.png", spicy: false, veg: false, rating: 4.6, reviews: 90 },
  { id: 208, category: "Tangra Indo-Chinese", name: "Chilli Eggplant", price: 10.99, description: "Eggplant cooked in savory, spicy chili sauce with herbs", image: "/assets/menu_assets/chilli_eggplant.png", spicy: true, veg: true, rating: 4.5, reviews: 75 },
  { id: 209, category: "Tangra Indo-Chinese", name: "Jumbo Chicken Lollipop (5 Pcs)", price: 17.99, description: "Crispy fried chicken wings tossed in Indo-Chinese sauce", image: "/assets/menu_assets/jumbo_chicken_lollipop.png", spicy: false, veg: false, rating: 4.9, reviews: 200 },
  { id: 210, category: "Tangra Indo-Chinese", name: "Veg Fried Rice", price: 12.49, description: "Stir-fried rice with mixed vegetables, ginger & garlic", image: "/assets/menu_assets/veg_fried_rice.png", spicy: false, veg: true, rating: 4.6, reviews: 210 },
  { id: 211, category: "Tangra Indo-Chinese", name: "Egg Fried Rice", price: 13.99, description: "Rice stir-fried with eggs & vegetables", image: "/assets/menu_assets/egg_fried_rice.png", spicy: false, veg: false, rating: 4.7, reviews: 190 },
  { id: 212, category: "Tangra Indo-Chinese", name: "Chicken Fried Rice", price: 14.99, description: "Rice stir-fried with chicken & vegetables", image: "/assets/menu_assets/chicken_fried_rice.png", spicy: false, veg: false, rating: 4.8, reviews: 320 },
  { id: 213, category: "Tangra Indo-Chinese", name: "Shrimp Fried Rice", price: 15.99, description: "Rice stir-fried with shrimp & vegetables", image: "/assets/menu_assets/shrimp_fried_rice.png", spicy: false, veg: false, rating: 4.7, reviews: 130 },
  { id: 214, category: "Tangra Indo-Chinese", name: "Mixed Fried Rice", price: 18.99, description: "Rice with chicken, shrimp, egg & mixed vegetables", image: "/assets/menu_assets/mixed_fried_rice.png", spicy: false, veg: false, rating: 4.9, reviews: 110 },
  { id: 215, category: "Tangra Indo-Chinese", name: "Veg Chowmein", price: 12.99, description: "Stir-fried noodles with vegetables, soy sauce & spices", image: "/assets/menu_assets/veg_chowmein.png", spicy: false, veg: true, rating: 4.6, reviews: 180 },
  { id: 216, category: "Tangra Indo-Chinese", name: "Egg Chowmein", price: 13.99, description: "Noodles with shredded egg & vegetables", image: "/assets/menu_assets/egg_chowmein.png", spicy: false, veg: false, rating: 4.7, reviews: 160 },
  { id: 217, category: "Tangra Indo-Chinese", name: "Chicken Chowmein", price: 14.99, description: "Stir-fried noodles with chicken, vegetables & eggs", image: "/assets/menu_assets/chicken_chowmein.png", spicy: false, veg: false, rating: 4.8, reviews: 290 },
  { id: 218, category: "Tangra Indo-Chinese", name: "Shrimp Chowmein", price: 15.99, description: "Noodles stir-fried with shrimp & vegetables", image: "/assets/menu_assets/shrimp_chowmein.png", spicy: false, veg: false, rating: 4.7, reviews: 120 },
  { id: 219, category: "Tangra Indo-Chinese", name: "Mixed Chowmein", price: 18.99, description: "Noodles with chicken, shrimp & vegetables", image: "/assets/menu_assets/mixed_chowmein.png", spicy: false, veg: false, rating: 4.9, reviews: 105 },
  { id: 220, category: "Tangra Indo-Chinese", name: "Veg Manchow Soup (8 oz)", price: 7.99, description: "Spicy vegetable soup topped with crispy noodles", image: "/assets/menu_assets/veg_manchow_soup.png", spicy: true, veg: true, rating: 4.6, reviews: 90 },
  { id: 221, category: "Tangra Indo-Chinese", name: "Chicken Manchow Soup (8 oz)", price: 8.99, description: "Hot & spicy chicken soup with garlic, soy & vegetables", image: "/assets/menu_assets/chicken_manchow_soup.png", spicy: true, veg: false, rating: 4.7, reviews: 110 },

  // BIRYANI / RICE
  { id: 301, category: "Biryani / Rice", name: "Calcutta Chicken Dum Biryani", price: 16.99, description: "Chicken layered with fragrant basmati rice, spices & caramelized onions", image: "/assets/menu_assets/calcutta_chicken_dum_biryani.png", spicy: false, veg: false, rating: 4.9, reviews: 450 },
  { id: 302, category: "Biryani / Rice", name: "Calcutta Goat Dum Biryani", price: 17.99, description: "Tender goat cooked with basmati rice, saffron & spices, served with egg & potatoes", image: "/assets/menu_assets/calcutta_goat_dum_biryani.png", spicy: false, veg: false, rating: 4.9, reviews: 380 },
  { id: 303, category: "Biryani / Rice", name: "Calcutta Veg Pulao", price: 13.99, description: "Vegetarian. Mildly spiced basmati rice with vegetables", image: "/assets/menu_assets/calcutta_veg_pulao.png", spicy: false, veg: true, rating: 4.6, reviews: 120 },
  { id: 304, category: "Biryani / Rice", name: "White Steamed Basmati Rice", price: 3.99, description: "Vegetarian. Plain steamed basmati rice", image: "/assets/menu_assets/white_steamed_basmati_rice.png", spicy: false, veg: true, rating: 4.5, reviews: 80 },
  { id: 305, category: "Biryani / Rice", name: "Veg Biryani", price: 15.99, description: "Basmati rice cooked with mixed vegetables, herbs & aromatic spices", image: "/assets/menu_assets/veg_biryani.png", spicy: false, veg: true, rating: 4.7, reviews: 150 },
  { id: 306, category: "Biryani / Rice", name: "Basanti Pulao", price: 13.99, description: "Sweet fragrant yellow rice with peas, carrots & nuts", image: "/assets/menu_assets/basanti_pulao.png", spicy: false, veg: true, rating: 4.8, reviews: 190 },

  // DAILY LUNCH SPECIAL
  { id: 401, category: "Daily Lunch Special", name: "Lunch Special with Vegetable / Paneer Curry", price: 14.99, description: "Includes rice, naan, veg dal, sabzi & choice of veg or paneer curry", image: "/assets/menu_assets/lunch_special_with_vegetable.png", spicy: false, veg: true, rating: 4.7, reviews: 160 },
  { id: 402, category: "Daily Lunch Special", name: "Lunch Special with Chicken Dishes", price: 16.99, description: "Includes rice, naan, veg dal, sabzi & choice of chicken curry", image: "/assets/menu_assets/lunch_special_with_chicken.png", spicy: false, veg: false, rating: 4.8, reviews: 210 },
  { id: 403, category: "Daily Lunch Special", name: "Lunch Special with Goat Dishes", price: 18.99, description: "Includes rice, naan, veg dal, sabzi & choice of goat curry", image: "/assets/menu_assets/lunch_special_with_goat.png", spicy: false, veg: false, rating: 4.8, reviews: 140 },
  { id: 404, category: "Daily Lunch Special", name: "Fish Thali", price: 17.99, description: "Includes basmati rice, naan, veg dal, vegetable curry & fish", image: "/assets/menu_assets/fish_thali.png", spicy: false, veg: false, rating: 4.7, reviews: 95 },

  // CURRIES
  { id: 501, category: "Curries", name: "Aloo Gobi", price: 12.99, description: "Vegetarian. Potatoes and cauliflower cooked with spices in onion gravy", image: "/assets/menu_assets/aloo_gobi.png", spicy: false, veg: true, rating: 4.6, reviews: 120 },
  { id: 502, category: "Curries", name: "Saag Paneer", price: 12.99, description: "Vegetarian. Spinach cooked with paneer and Indian spices", image: "/assets/menu_assets/saag_paneer.png", spicy: false, veg: true, rating: 4.7, reviews: 150 },
  { id: 503, category: "Curries", name: "Paneer Butter Masala", price: 12.99, description: "Vegetarian. Paneer cooked in creamy tomato-cashew gravy", image: "/assets/menu_assets/paneer_butter_masala.png", spicy: false, veg: true, rating: 4.8, reviews: 250 },
  { id: 504, category: "Curries", name: "Kadai Paneer", price: 12.99, description: "Vegetarian, spicy. Paneer cooked with bell peppers, onions & spices", image: "/assets/menu_assets/kadai_paneer.png", spicy: true, veg: true, rating: 4.7, reviews: 140 },
  { id: 505, category: "Curries", name: "Navratan Shahi Korma", price: 13.49, description: "Vegetarian. Mixed vegetables in creamy cashew-based gravy", image: "/assets/menu_assets/navratan_shahi_korma.png", spicy: false, veg: true, rating: 4.6, reviews: 90 },
  { id: 506, category: "Curries", name: "Moong Dal / Veg Dal", price: 11.99, description: "Vegetarian. Lentils cooked with tomato, onion, ginger, garlic & spices", image: "/assets/menu_assets/moong_dal_veg_dal.png", spicy: false, veg: true, rating: 4.7, reviews: 110 },
  { id: 507, category: "Curries", name: "Bhindi Masala", price: 12.99, description: "Vegetarian. Okra cooked with onion, tomato & spices", image: "/assets/menu_assets/bhindi_masala.png", spicy: false, veg: true, rating: 4.6, reviews: 130 },
  { id: 508, category: "Curries", name: "Chicken Curry (Bone-In)", price: 15.99, description: "Spicy. Chicken cooked in traditional onion-based gravy", image: "/assets/menu_assets/chicken_curry_bone_in.png", spicy: true, veg: false, rating: 4.8, reviews: 280 },
  { id: 509, category: "Curries", name: "Butter Chicken", price: 14.99, description: "Boneless chicken cooked in creamy tomato-based sauce", image: "/assets/menu_assets/butter_chicken.png", spicy: false, veg: false, rating: 4.9, reviews: 410 },
  { id: 510, category: "Curries", name: "Chicken Tikka Masala", price: 14.99, description: "Chicken cooked in rich tomato gravy with spices", image: "/assets/menu_assets/chicken_tikka_masala.png", spicy: false, veg: false, rating: 4.8, reviews: 350 },
  { id: 511, category: "Curries", name: "Madrasi Chicken", price: 14.99, description: "Spicy. Chicken cooked in Madras-style onion sauce with coconut milk", image: "/assets/menu_assets/madrasi_chicken.png", spicy: true, veg: false, rating: 4.7, reviews: 160 },
  { id: 512, category: "Curries", name: "Chicken Korma", price: 14.99, description: "Chicken cooked in creamy cashew-onion gravy", image: "/assets/menu_assets/chicken_korma.png", spicy: false, veg: false, rating: 4.7, reviews: 140 },
  { id: 513, category: "Curries", name: "Saag Chicken", price: 14.99, description: "Chicken cooked with spinach and spices", image: "/assets/menu_assets/saag_chicken.png", spicy: false, veg: false, rating: 4.8, reviews: 190 },
  { id: 514, category: "Curries", name: "Goat Curry", price: 17.99, description: "Goat cooked in traditional onion-based gravy", image: "/assets/menu_assets/goat_curry.png", spicy: false, veg: false, rating: 4.8, reviews: 220 },
  { id: 515, category: "Curries", name: "Mutton Ghugni", price: 12.99, description: "Goat curry combined with yellow peas for a unique flavor", image: "/assets/menu_assets/mutton_ghugni.png", spicy: false, veg: false, rating: 4.7, reviews: 150 },
  { id: 516, category: "Curries", name: "Mutton Kosha", price: 18.99, description: "Slow-cooked goat in rich, thick spiced gravy", image: "/assets/menu_assets/mutton_kosha.png", spicy: false, veg: false, rating: 4.9, reviews: 270 },
  { id: 517, category: "Curries", name: "Chicken Kosha (Bone-In)", price: 16.99, description: "Slow-cooked chicken in traditional spiced onion gravy", image: "/assets/menu_assets/chicken_kosha_bone_in.png", spicy: false, veg: false, rating: 4.8, reviews: 110 },

  // TANDOOR
  { id: 601, category: "Tandoor", name: "Tandoori Chicken Legs (2 Whole Legs)", price: 15.99, description: "Spicy. Chicken legs marinated in yogurt, ginger, garlic & spices, roasted in a tandoor", image: "/assets/menu_assets/tandoori_chicken_legs.png", spicy: true, veg: false, rating: 4.8, reviews: 240 },
  { id: 602, category: "Tandoor", name: "Tandoori Paneer Tikka", price: 15.99, description: "Spicy. Paneer marinated with yogurt, ginger, garlic & spices, roasted in a tandoor", image: "/assets/menu_assets/tandoori_paneer_tikka.png", spicy: true, veg: true, rating: 4.7, reviews: 180 },

  // BREAD FROM TANDOOR
  { id: 701, category: "Bread from Tandoor", name: "Plain Naan", price: 2.99, description: "Vegetarian. Soft Indian flatbread baked in a traditional tandoor", image: "/assets/menu_assets/plain_naan.png", spicy: false, veg: true, rating: 4.8, reviews: 350 },
  { id: 702, category: "Bread from Tandoor", name: "Garlic Naan", price: 3.99, description: "Vegetarian. Naan topped with garlic, baked in a tandoor", image: "/assets/menu_assets/garlic_naan.png", spicy: false, veg: true, rating: 4.9, reviews: 420 },
  { id: 703, category: "Bread from Tandoor", name: "Onion Kulcha", price: 4.99, description: "Vegetarian. Stuffed flatbread filled with spiced onions", image: "/assets/menu_assets/onion_kulcha.png", spicy: false, veg: true, rating: 4.7, reviews: 150 },
  { id: 704, category: "Bread from Tandoor", name: "Tandoori Roti", price: 2.99, description: "Whole wheat bread baked in a traditional tandoor", image: "/assets/menu_assets/tandoori_roti.png", spicy: false, veg: true, rating: 4.6, reviews: 120 },
  { id: 705, category: "Bread from Tandoor", name: "Butter Naan", price: 3.49, description: "Soft naan brushed with butter", image: "/assets/menu_assets/butter_naan.png", spicy: false, veg: true, rating: 4.8, reviews: 100 },

  // // CATERING TRAYS
  // { id: 801, category: "Catering Trays", name: "Goat Biryani (Full Tray)", price: 144.99, description: "Serves 20–22 people. Basmati rice with goat, cooked with aromatic spices, nuts & raisins", image: "/assets/menu_assets/goat_biryani_full_tray.png", spicy: false, veg: false, rating: 4.9, reviews: 45 },
  // { id: 802, category: "Catering Trays", name: "Chicken Biryani (Full Tray)", price: 134.99, description: "Serves 20–22 people. Basmati rice with chicken, flavored with saffron & herbs", image: "/assets/menu_assets/chicken_biryani_full_tray.png", spicy: false, veg: false, rating: 4.8, reviews: 38 },
  // { id: 803, category: "Catering Trays", name: "Chicken Biryani (Half Tray)", price: 79.99, description: "Chicken biryani cooked with traditional spices & herbs", image: "/assets/menu_assets/chicken_biryani_half_tray.png", spicy: false, veg: false, rating: 4.8, reviews: 22 },
  // { id: 804, category: "Catering Trays", name: "Goat Biryani (Half Tray)", price: 84.99, description: "Goat with bone cooked with spices, garnished with fried onions", image: "/assets/menu_assets/goat_biryani_half_tray.png", spicy: false, veg: false, rating: 4.8, reviews: 19 },
  // { id: 805, category: "Catering Trays", name: "Goat Kosha (Tray)", price: 220.00, description: "Rich goat preparation with basmati rice, spices, nuts & herbs", image: "/assets/menu_assets/goat_kosha_tray.png", spicy: false, veg: false, rating: 4.9, reviews: 12 },

  // DESSERTS
  { id: 901, category: "Desserts", name: "Rasmalai", price: 4.49, description: "Soft cheese dumplings soaked in sweet, cardamom-flavored milk", image: "/assets/menu_assets/rasmalai.png", spicy: false, veg: true, rating: 4.9, reviews: 280 },
  { id: 902, category: "Desserts", name: "Gulab Jamun", price: 4.49, description: "Deep-fried milk dumplings soaked in sugar syrup", image: "/assets/menu_assets/gulab_jamun.png", spicy: false, veg: true, rating: 4.8, reviews: 310 },
  { id: 903, category: "Desserts", name: "Mishti Doi (5 oz)", price: 4.49, description: "Vegetarian. Traditional Bengali sweet yogurt", image: "/assets/menu_assets/mishti_doi.png", spicy: false, veg: true, rating: 4.9, reviews: 350 },
  { id: 904, category: "Desserts", name: "Nolen Gurer Rasogolla (2 Pcs)", price: 5.99, description: "Vegan. Rasgulla flavored with date palm jaggery", image: "/assets/menu_assets/nolen_gurer_rasogolla.png", spicy: false, veg: true, rating: 4.8, reviews: 120 },
  { id: 905, category: "Desserts", name: "Nolen Gurer Sondesh (2 Pcs)", price: 5.99, description: "Bengali sweet made with chhena and date palm jaggery", image: "/assets/menu_assets/nolen_gurer_sondesh.png", spicy: false, veg: true, rating: 4.7, reviews: 90 },
  { id: 906, category: "Desserts", name: "Chanar Jilapi (2 Pcs)", price: 5.99, description: "Deep-fried cheese spirals soaked in sugar syrup", image: "/assets/menu_assets/chanar_jilapi.png", spicy: false, veg: true, rating: 4.7, reviews: 85 },
  { id: 907, category: "Desserts", name: "Langcha (2 Pcs)", price: 5.99, description: "Fried milk sweets soaked in sugar syrup", image: "/assets/menu_assets/langcha.png", spicy: false, veg: true, rating: 4.6, reviews: 70 },
  { id: 908, category: "Desserts", name: "Jolbhora Gurer Sandesh", price: 5.99, description: "Soft chhena sweets filled with liquid jaggery", image: "/assets/menu_assets/jolbhora_gurer_sandesh.png", spicy: false, veg: true, rating: 4.8, reviews: 110 },

  // DRINKS
  { id: 1001, category: "Drinks", name: "Coke / Diet Coke / Pepsi / Sprite / Coke Zero / Fanta", price: 2.99, description: "Classic refreshing soft drink options", image: "/assets/menu_assets/coke.png", spicy: false, veg: true, rating: 4.5, reviews: 150 },
  { id: 1002, category: "Drinks", name: "Mango Lassi", price: 3.99, description: "Traditional yogurt-based drink blended with mango", image: "/assets/menu_assets/mango_lassi.png", spicy: false, veg: true, rating: 4.8, reviews: 290 },
  { id: 1003, category: "Drinks", name: "Masala Tea", price: 2.49, description: "Indian spiced tea", image: "/assets/menu_assets/masala_tea.png", spicy: false, veg: true, rating: 4.7, reviews: 210 },
  { id: 1004, category: "Drinks", name: "Thums Up", price: 2.99, description: "Bold cola-flavored soda", image: "/assets/menu_assets/thums_up.png", spicy: false, veg: true, rating: 4.6, reviews: 180 },
  { id: 1005, category: "Drinks", name: "Kokum Sharbat", price: 3.99, description: "Vegetarian, vegan. Refreshing drink made from kokum fruit", image: "/assets/menu_assets/kokum_sharbat.png", spicy: false, veg: true, rating: 4.5, reviews: 90 },
  { id: 1006, category: "Drinks", name: "Aam Panna", price: 3.99, description: "Cooling drink made from raw mango with spices", image: "/assets/menu_assets/aam_panna.png", spicy: false, veg: true, rating: 4.6, reviews: 110 },
  { id: 1007, category: "Drinks", name: "Rose Milk", price: 3.99, description: "Chilled milk flavored with rose syrup", image: "/assets/menu_assets/rose_milk.png", spicy: false, veg: true, rating: 4.7, reviews: 130 },
  { id: 1008, category: "Drinks", name: "Limca", price: 2.99, description: "Refreshing lemon-lime soda", image: "/assets/menu_assets/limca.png", spicy: false, veg: true, rating: 4.6, reviews: 140 },
];
