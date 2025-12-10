import { createContext, useContext, useState, useEffect } from 'react';

const content = {
  en: {
    start: "Dinner. Done. In 20 minutes.",
    sub: "No washing. No chopping. Just cooking.",
    btn_start: "Start Eating",
    reveal: "Hold to see ingredients",
    timer: "Start Timer",
    nav: { home: "Menu", cart: "Box", cook: "Cook", profile: "Chef" },
    searchPlaceholder: "Search recipes...",
    whyEasy: {
      title: "Why this is easy",
      noChopping: "No Chopping",
      noWashing: "No Washing",
      preMeasured: "Pre-Measured",
      quickCook: "Quick Cook"
    },
    nutrition: {
      title: "Nutrition",
      calories: "kcal",
      protein: "Protein",
      fat: "Fat",
      carbs: "Carbs",
      perServing: "per serving",
      servings: "Servings",
      editRecipe: "Edit Recipe",
      removeIngredients: "Remove Ingredients",
      saveChanges: "Save Changes",
      cancel: "Cancel",
      customized: "Customized"
    },
    price: {
      currency: "TND",
      total: "Total",
      boxTotal: "Box Total",
      perMeal: "per meal"
    },
    addToBox: "Add to Box",
    selectDay: "Select a delivery day",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    today: "Today",
    noDelivery: "No delivery on this date",
    yourBox: "Your Box",
    items: "items",
    empty: "Your box is empty",
    cookMode: "Cook Mode",
    step: "Step",
    of: "of",
    nextStep: "Next Step",
    prevStep: "Previous Step",
    finish: "Finish Cooking",
    exitCook: "Exit",
    profile: {
      title: "My Profile",
      memberSince: "Member since",
      preferences: "Preferences",
      dietary: "Dietary",
      allergies: "Allergies",
      household: "Household Size",
      settings: "Settings",
      notifications: "Notifications",
      language: "Language",
      darkMode: "Dark Mode",
      support: "Help & Support",
      logout: "Sign Out",
      save: "Save",
      dietaryOptions: ["Balanced", "Vegetarian", "Vegan", "Pescatarian", "Keto", "Paleo", "Gluten-Free"],
      allergyOptions: ["None", "Dairy", "Eggs", "Fish", "Shellfish", "Tree Nuts", "Peanuts", "Wheat", "Soy"],
      householdOptions: ["1 person", "2 people", "3 people", "4 people", "5+ people"]
    },
    meals: [
      { name: "Pan-Seared Duck Breast", time: "15", tags: "Zero-Prep", ingredients: ["Bell Peppers", "Duck Breast", "Orange Sauce", "Fresh Thyme"], steps: ["Open Cup A (Peppers)", "Sauté for 4 mins on high heat", "Add Duck and sear 3 mins each side", "Pour Sauce B, simmer 2 mins"] },
      { name: "Truffle Mushroom Risotto", time: "18", tags: "Zero-Prep", ingredients: ["Arborio Rice", "Mushrooms", "Truffle Oil", "Parmesan"], steps: ["Pour rice into heated pan", "Add mushroom mix gradually", "Stir continuously for 15 mins", "Finish with truffle oil drizzle"] },
      { name: "Herb-Crusted Salmon", time: "12", tags: "Zero-Prep", ingredients: ["Salmon Fillet", "Herb Crust", "Lemon Butter", "Asparagus"], steps: ["Press herb crust onto salmon", "Pan-sear skin-side down 4 mins", "Flip and cook 3 mins more", "Serve with lemon butter"] },
      { name: "Korean BBQ Beef Bowl", time: "14", tags: "Zero-Prep", ingredients: ["Marinated Beef", "Sesame Rice", "Kimchi", "Gochujang Sauce"], steps: ["Cook rice as directed", "Sear beef strips 3 mins", "Arrange bowl with toppings", "Drizzle with gochujang"] },
      { name: "Mediterranean Lamb Chops", time: "16", tags: "Zero-Prep", ingredients: ["Lamb Chops", "Feta Cream", "Olives", "Rosemary"], steps: ["Season lamb with rosemary", "Sear 4 mins each side", "Rest for 2 mins", "Top with feta cream"] },
      { name: "Thai Coconut Curry", time: "15", tags: "Zero-Prep", ingredients: ["Chicken", "Coconut Curry", "Jasmine Rice", "Thai Basil"], steps: ["Heat curry paste in pan", "Add chicken, cook 5 mins", "Pour coconut sauce, simmer", "Serve over jasmine rice"] },
      { name: "Seared Scallops", time: "10", tags: "Zero-Prep", ingredients: ["Sea Scallops", "Brown Butter", "Capers", "Microgreens"], steps: ["Pat scallops very dry", "Sear 2 mins each side", "Add butter and capers", "Plate with microgreens"] },
      { name: "Wagyu Beef Tataki", time: "8", tags: "Zero-Prep", ingredients: ["Wagyu Beef", "Ponzu Sauce", "Daikon", "Green Onion"], steps: ["Sear beef 30 secs each side", "Slice thinly against grain", "Arrange with garnishes", "Drizzle ponzu sauce"] }
    ]
  },
  fr: {
    start: "Le dîner. Prêt. En 20 minutes.",
    sub: "Ni lavage. Ni découpe. Juste le plaisir.",
    btn_start: "À Table",
    reveal: "Maintenez pour voir les ingrédients",
    timer: "Lancer Minuteur",
    nav: { home: "Menu", cart: "Panier", cook: "Cuisine", profile: "Chef" },
    searchPlaceholder: "Rechercher des recettes...",
    whyEasy: {
      title: "Pourquoi c'est facile",
      noChopping: "Pas de Découpe",
      noWashing: "Pas de Lavage",
      preMeasured: "Pré-Mesuré",
      quickCook: "Cuisson Rapide"
    },
    nutrition: {
      title: "Nutrition",
      calories: "kcal",
      protein: "Protéines",
      fat: "Lipides",
      carbs: "Glucides",
      perServing: "par portion",
      servings: "Portions",
      editRecipe: "Modifier la Recette",
      removeIngredients: "Retirer des Ingrédients",
      saveChanges: "Enregistrer",
      cancel: "Annuler",
      customized: "Personnalisé"
    },
    price: {
      currency: "TND",
      total: "Total",
      boxTotal: "Total du Panier",
      perMeal: "par repas"
    },
    addToBox: "Ajouter au Panier",
    selectDay: "Choisir un jour de livraison",
    days: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
    monthsShort: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
    today: "Aujourd'hui",
    noDelivery: "Pas de livraison ce jour",
    yourBox: "Votre Panier",
    items: "articles",
    empty: "Votre panier est vide",
    cookMode: "Mode Cuisine",
    step: "Étape",
    of: "sur",
    nextStep: "Étape Suivante",
    prevStep: "Étape Précédente",
    finish: "Terminer",
    exitCook: "Quitter",
    profile: {
      title: "Mon Profil",
      memberSince: "Membre depuis",
      preferences: "Préférences",
      dietary: "Régime",
      allergies: "Allergies",
      household: "Taille du Foyer",
      settings: "Paramètres",
      notifications: "Notifications",
      language: "Langue",
      darkMode: "Mode Sombre",
      support: "Aide & Support",
      logout: "Déconnexion",
      save: "Enregistrer",
      dietaryOptions: ["Équilibré", "Végétarien", "Végétalien", "Pescétarien", "Keto", "Paléo", "Sans Gluten"],
      allergyOptions: ["Aucune", "Produits Laitiers", "Œufs", "Poisson", "Crustacés", "Fruits à Coque", "Arachides", "Blé", "Soja"],
      householdOptions: ["1 personne", "2 personnes", "3 personnes", "4 personnes", "5+ personnes"]
    },
    meals: [
      { name: "Magret de Canard Poêlé", time: "15", tags: "Zéro Prépa", ingredients: ["Poivrons", "Magret de Canard", "Sauce Orange", "Thym Frais"], steps: ["Ouvrir le Pot A (Poivrons)", "Saisir 4 min à feu vif", "Ajouter le canard, 3 min par côté", "Verser la Sauce B, mijoter 2 min"] },
      { name: "Risotto aux Truffes", time: "18", tags: "Zéro Prépa", ingredients: ["Riz Arborio", "Champignons", "Huile de Truffe", "Parmesan"], steps: ["Verser le riz dans la poêle chaude", "Ajouter les champignons progressivement", "Remuer continuellement 15 min", "Finir avec l'huile de truffe"] },
      { name: "Saumon en Croûte d'Herbes", time: "12", tags: "Zéro Prépa", ingredients: ["Filet de Saumon", "Croûte aux Herbes", "Beurre Citronné", "Asperges"], steps: ["Appuyer la croûte sur le saumon", "Saisir côté peau 4 min", "Retourner et cuire 3 min", "Servir avec le beurre citronné"] },
      { name: "Bol de Bœuf BBQ Coréen", time: "14", tags: "Zéro Prépa", ingredients: ["Bœuf Mariné", "Riz au Sésame", "Kimchi", "Sauce Gochujang"], steps: ["Cuire le riz comme indiqué", "Saisir le bœuf 3 min", "Disposer les garnitures", "Arroser de gochujang"] },
      { name: "Côtelettes d'Agneau", time: "16", tags: "Zéro Prépa", ingredients: ["Côtelettes d'Agneau", "Crème de Feta", "Olives", "Romarin"], steps: ["Assaisonner avec le romarin", "Saisir 4 min par côté", "Reposer 2 min", "Garnir de crème de feta"] },
      { name: "Curry Thaï au Coco", time: "15", tags: "Zéro Prépa", ingredients: ["Poulet", "Curry au Coco", "Riz Jasmin", "Basilic Thaï"], steps: ["Chauffer la pâte de curry", "Ajouter le poulet, cuire 5 min", "Verser la sauce coco, mijoter", "Servir sur riz jasmin"] },
      { name: "Saint-Jacques Poêlées", time: "10", tags: "Zéro Prépa", ingredients: ["Coquilles St-Jacques", "Beurre Noisette", "Câpres", "Micropousses"], steps: ["Sécher les coquilles", "Saisir 2 min par côté", "Ajouter beurre et câpres", "Dresser avec micropousses"] },
      { name: "Tataki de Bœuf Wagyu", time: "8", tags: "Zéro Prépa", ingredients: ["Bœuf Wagyu", "Sauce Ponzu", "Daikon", "Oignon Vert"], steps: ["Saisir 30 sec par côté", "Trancher finement", "Disposer avec garnitures", "Arroser de ponzu"] }
    ]
  },
  ar: {
    start: "عشاء فاخر. جاهز. في 20 دقيقة.",
    sub: "لا غسيل. لا تقطيع. متعة الطبخ فقط.",
    btn_start: "ابدأ رحلة التذوق",
    reveal: "اضغط مطولاً لرؤية المكونات",
    timer: "ابدأ المؤقت",
    nav: { home: "القائمة", cart: "الصندوق", cook: "طبخ", profile: "الشيف" },
    searchPlaceholder: "ابحث عن الوصفات...",
    whyEasy: {
      title: "لماذا هذا سهل",
      noChopping: "بدون تقطيع",
      noWashing: "بدون غسيل",
      preMeasured: "مقاس مسبقاً",
      quickCook: "طبخ سريع"
    },
    nutrition: {
      title: "القيمة الغذائية",
      calories: "سعرة",
      protein: "بروتين",
      fat: "دهون",
      carbs: "كربوهيدرات",
      perServing: "لكل حصة",
      servings: "الحصص",
      editRecipe: "تعديل الوصفة",
      removeIngredients: "إزالة المكونات",
      saveChanges: "حفظ التغييرات",
      cancel: "إلغاء",
      customized: "مخصص"
    },
    price: {
      currency: "د.ت",
      total: "المجموع",
      boxTotal: "إجمالي الصندوق",
      perMeal: "للوجبة"
    },
    addToBox: "أضف إلى الصندوق",
    selectDay: "اختر يوم التوصيل",
    days: ["إثن", "ثلا", "أرب", "خمي", "جمع", "سبت", "أحد"],
    months: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
    monthsShort: ["ينا", "فبر", "مار", "أبر", "ماي", "يون", "يول", "أغس", "سبت", "أكت", "نوف", "ديس"],
    today: "اليوم",
    noDelivery: "لا يوجد توصيل في هذا التاريخ",
    yourBox: "صندوقك",
    items: "عناصر",
    empty: "صندوقك فارغ",
    cookMode: "وضع الطبخ",
    step: "الخطوة",
    of: "من",
    nextStep: "الخطوة التالية",
    prevStep: "الخطوة السابقة",
    finish: "إنهاء الطبخ",
    exitCook: "خروج",
    profile: {
      title: "ملفي الشخصي",
      memberSince: "عضو منذ",
      preferences: "التفضيلات",
      dietary: "النظام الغذائي",
      allergies: "الحساسية",
      household: "حجم الأسرة",
      settings: "الإعدادات",
      notifications: "الإشعارات",
      language: "اللغة",
      darkMode: "الوضع المظلم",
      support: "المساعدة والدعم",
      logout: "تسجيل الخروج",
      save: "حفظ",
      dietaryOptions: ["متوازن", "نباتي", "نباتي صرف", "بيسكاتاري", "كيتو", "باليو", "خالي من الغلوتين"],
      allergyOptions: ["لا يوجد", "منتجات الألبان", "البيض", "الأسماك", "المحار", "المكسرات", "الفول السوداني", "القمح", "الصويا"],
      householdOptions: ["شخص واحد", "شخصان", "3 أشخاص", "4 أشخاص", "5+ أشخاص"]
    },
    meals: [
      { name: "صدور البط المحمّرة", time: "15", tags: "بدون تحضير", ingredients: ["فلفل حلو", "صدر البط", "صلصة البرتقال", "زعتر طازج"], steps: ["افتح العلبة أ (الفلفل)", "قلي 4 دقائق على نار عالية", "أضف البط واقليه 3 دقائق لكل جانب", "اسكب الصلصة واتركها تغلي دقيقتين"] },
      { name: "ريزوتو الفطر بالكمأة", time: "18", tags: "بدون تحضير", ingredients: ["أرز أربوريو", "فطر", "زيت الكمأة", "جبن بارميزان"], steps: ["اسكب الأرز في المقلاة الساخنة", "أضف خليط الفطر تدريجياً", "حرك باستمرار لمدة 15 دقيقة", "أنهِ بزيت الكمأة"] },
      { name: "سلمون بقشرة الأعشاب", time: "12", tags: "بدون تحضير", ingredients: ["فيليه سلمون", "قشرة أعشاب", "زبدة ليمون", "هليون"], steps: ["اضغط قشرة الأعشاب على السلمون", "اقلِ جانب الجلد 4 دقائق", "اقلب واطبخ 3 دقائق أخرى", "قدم مع زبدة الليمون"] },
      { name: "طبق اللحم الكوري", time: "14", tags: "بدون تحضير", ingredients: ["لحم متبل", "أرز بالسمسم", "كيمتشي", "صلصة كوتشوجانغ"], steps: ["اطبخ الأرز كما هو موضح", "اقلِ شرائح اللحم 3 دقائق", "رتب الطبق مع الإضافات", "رش صلصة كوتشوجانغ"] },
      { name: "ريش الضأن المتوسطية", time: "16", tags: "بدون تحضير", ingredients: ["ريش ضأن", "كريمة الفيتا", "زيتون", "إكليل الجبل"], steps: ["تبل الضأن بإكليل الجبل", "اقلِ 4 دقائق لكل جانب", "اتركها ترتاح دقيقتين", "زين بكريمة الفيتا"] },
      { name: "كاري جوز الهند التايلندي", time: "15", tags: "بدون تحضير", ingredients: ["دجاج", "كاري جوز الهند", "أرز ياسمين", "ريحان تايلندي"], steps: ["سخن معجون الكاري", "أضف الدجاج واطبخ 5 دقائق", "اسكب صلصة جوز الهند", "قدم فوق أرز الياسمين"] },
      { name: "أسقلوب محمّر", time: "10", tags: "بدون تحضير", ingredients: ["أسقلوب بحري", "زبدة بنية", "كبر", "براعم صغيرة"], steps: ["جفف الأسقلوب جيداً", "اقلِ دقيقتين لكل جانب", "أضف الزبدة والكبر", "قدم مع البراعم"] },
      { name: "تاتاكي لحم واغيو", time: "8", tags: "بدون تحضير", ingredients: ["لحم واغيو", "صلصة بونزو", "دايكون", "بصل أخضر"], steps: ["اقلِ اللحم 30 ثانية لكل جانب", "قطع شرائح رفيعة", "رتب مع الزينة", "رش صلصة البونزو"] }
    ]
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const t = content[language];

  const fontClass = {
    heading: isRTL ? 'font-amiri' : 'font-playfair',
    body: isRTL ? 'font-tajawal' : 'font-inter'
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL, fontClass }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

