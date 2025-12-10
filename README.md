# 🍳 Cheffy - Zero-Prep Luxury Meal Kits

<div align="center">

**Dinner. Done. In 20 minutes.**

*No washing. No chopping. Just cooking.*

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-FF0055?logo=framer)](https://www.framer.com/motion/)

</div>

---

## 📖 About

**Cheffy** is a premium mobile-first meal kit delivery application that revolutionizes home cooking by eliminating all preparation work. Our luxury meal kits come with pre-washed, pre-chopped, and pre-measured ingredients — all you need to do is cook!

Designed for busy professionals, food enthusiasts, and anyone who wants restaurant-quality meals at home without the hassle of meal prep.

---

## ✨ Features

### 🏠 **Home Screen - Recipe Discovery**
- **Beautiful Meal Cards** - Swipeable cards with high-quality plated dish images
- **Hold-to-Reveal** - Press and hold on any meal card to see the raw ingredients
- **Smart Search** - Filter recipes in real-time as you type
- **Auto-hiding Header** - Header hides on scroll down for immersive browsing
- **Nutritional Information** - View calories, protein, fat, and carbs at a glance

### 📦 **Box / Cart - Meal Planning**
- **Date-based Scheduling** - Select specific delivery dates for each meal
- **14-Day Calendar** - Plan your meals up to 2 weeks in advance
- **Recipe Customization** - Adjust serving sizes (1-6 portions)
- **Ingredient Removal** - Remove specific ingredients from any recipe
- **Dynamic Pricing** - See real-time total in Tunisian Dinar (TND)
- **Per-Date Filtering** - View meals organized by delivery date

### 👨‍🍳 **Cook Mode - Guided Cooking**
- **Step-by-Step Instructions** - Clear, numbered cooking steps
- **Built-in Timer** - Visual circular countdown timer (4 minutes default)
- **Progress Tracking** - See which step you're on out of total steps
- **Gesture Navigation** - Swipe or tap to navigate between steps
- **Exit Anytime** - Easy exit button to return to home

### 👤 **Profile - Personalization**
- **Dietary Preferences** - Choose from Balanced, Vegetarian, Vegan, Pescatarian, Keto, Paleo, Gluten-Free
- **Allergy Management** - Select multiple allergies (Dairy, Eggs, Fish, Shellfish, Tree Nuts, Peanuts, Wheat, Soy)
- **Household Size** - Configure portions for 1-5+ people
- **Push Notifications** - Toggle notifications on/off
- **Dark Mode** - Full dark theme support
- **Multi-language** - Switch between English, French, and Arabic

---

## 🌍 Internationalization (i18n)

Cheffy supports **3 languages** with full RTL (Right-to-Left) support:

| Language | Direction | Fonts |
|----------|-----------|-------|
| 🇬🇧 English | LTR | Inter, Playfair Display |
| 🇫🇷 French | LTR | Inter, Playfair Display |
| 🇸🇦 Arabic | RTL | Tajawal, Amiri |

The entire UI dynamically adapts to RTL layout including:
- Navigation order
- Text alignment
- Icon positioning
- Gesture directions

---

## 🍽️ Available Recipes

| Recipe | Prep Time | Price (TND) |
|--------|-----------|-------------|
| Pan-Seared Duck Breast | 15 min | 45.00 |
| Truffle Mushroom Risotto | 18 min | 38.00 |
| Herb-Crusted Salmon | 12 min | 52.00 |
| Korean BBQ Beef Bowl | 14 min | 35.00 |
| Mediterranean Lamb Chops | 16 min | 68.00 |
| Thai Coconut Curry | 15 min | 32.00 |
| Seared Scallops | 10 min | 58.00 |
| Wagyu Beef Tataki | 8 min | 75.00 |

Each recipe includes:
- ✂️ **No Chopping** - All ingredients pre-cut
- 💧 **No Washing** - Everything clean and ready
- ⚖️ **Pre-Measured** - Exact portions included
- ⏱️ **Quick Cook** - 8-18 minutes maximum

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18.3** | UI Framework with Hooks |
| **Vite 5.4** | Build tool & Dev server |
| **Tailwind CSS 3.4** | Utility-first styling |
| **Framer Motion 11** | Animations & gestures |
| **Lucide React** | Beautiful icon library |
| **Google Fonts** | Custom typography |

---

## 📱 App Architecture

```
src/
├── App.jsx                 # Main app with routing & state
├── main.jsx                # React entry point
├── index.css               # Global styles & Tailwind
├── components/
│   ├── MobileContainer.jsx # iPhone frame wrapper
│   ├── BottomNav.jsx       # Tab navigation bar
│   ├── MealCard.jsx        # Recipe card with hold gesture
│   └── LanguageToggle.jsx  # Language switcher
├── screens/
│   ├── Onboarding.jsx      # Welcome screen
│   ├── Home.jsx            # Recipe feed & search
│   ├── ProductDetail.jsx   # Full recipe view
│   ├── LogisticsHub.jsx    # Cart & scheduling
│   ├── CookMode.jsx        # Guided cooking
│   └── Profile.jsx         # User settings
└── context/
    └── LanguageContext.jsx # i18n provider
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/cheffy.git
cd cheffy

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```
cheffy/
├── public/              # Static assets
├── src/                 # Source code
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── eslint.config.js     # ESLint rules
```

---

## 🎨 Design System

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Emerald 600 | `#059669` | Primary actions, active states |
| Emerald 800 | `#065F46` | Buttons, CTAs |
| Slate 50 | `#F8FAFC` | Light background |
| Gray 900 | `#111827` | Dark mode background |
| Saffron | `#F4A261` | Accent, cooking time |

### Typography

- **Headings**: Playfair Display (English/French), Amiri (Arabic)
- **Body**: Inter (English/French), Tajawal (Arabic)

### Spacing

Uses Tailwind's default spacing scale with mobile-first responsive design.

---

## 🔄 User Workflow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Onboarding │────▶│  Home/Menu   │────▶│   Details   │
└─────────────┘     └──────────────┘     └─────────────┘
                           │                     │
                           ▼                     ▼
                    ┌──────────────┐     ┌─────────────┐
                    │   Profile    │     │  Add to Box │
                    └──────────────┘     └─────────────┘
                                               │
                           ┌───────────────────┘
                           ▼
                    ┌──────────────┐     ┌─────────────┐
                    │  Box/Cart    │────▶│  Cook Mode  │
                    └──────────────┘     └─────────────┘
                           │                     │
                           ▼                     ▼
                    ┌──────────────┐     ┌─────────────┐
                    │  Customize   │     │   Finish!   │
                    └──────────────┘     └─────────────┘
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Team

Built with ❤️ for food lovers who value their time.

---

<div align="center">

**[⬆ Back to Top](#-cheffy---zero-prep-luxury-meal-kits)**

</div>
