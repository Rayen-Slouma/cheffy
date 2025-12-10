import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import MobileContainer from './components/MobileContainer';
import BottomNav from './components/BottomNav';
import Onboarding from './screens/Onboarding';
import Home from './screens/Home';
import ProductDetail from './screens/ProductDetail';
import LogisticsHub from './screens/LogisticsHub';
import CookMode from './screens/CookMode';
import Profile from './screens/Profile';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [boxItems, setBoxItems] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cookingMeal, setCookingMeal] = useState(null);
  // Selected delivery date (default to 2 days from now)
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date.toDateString(); // Store as string for easy comparison
  });

  const handleStart = () => {
    setShowOnboarding(false);
  };

  const handleSelectMeal = (meal) => {
    setSelectedMeal(meal);
  };

  const handleCloseDetail = () => {
    setSelectedMeal(null);
  };

  const handleAddToBox = () => {
    if (selectedMeal) {
      // Check if same meal already exists for this date
      const existsForDate = boxItems.find(
        item => item.id === selectedMeal.id && item.deliveryDate === selectedDeliveryDate
      );
      if (!existsForDate) {
        setBoxItems(prev => [...prev, { ...selectedMeal, deliveryDate: selectedDeliveryDate }]);
      }
    }
    setSelectedMeal(null);
    setActiveTab('cart');
  };

  const handleRemoveFromBox = (itemId, deliveryDate) => {
    setBoxItems(prev => prev.filter(item => !(item.id === itemId && item.deliveryDate === deliveryDate)));
  };

  const handleUpdateBoxItem = (itemId, customizations, deliveryDate) => {
    setBoxItems(prev => prev.map(item =>
      (item.id === itemId && item.deliveryDate === deliveryDate)
        ? { ...item, customizations }
        : item
    ));
  };

  const handleDateChange = (date) => {
    setSelectedDeliveryDate(date.toDateString());
  };

  const handleCookFinish = () => {
    setCookingMeal(null);
    setActiveTab('home');
  };

  const handleSelectCookingMeal = (meal) => {
    setCookingMeal(meal);
  };

  const handleExitCookMode = () => {
    setCookingMeal(null);
    setActiveTab('home');
  };

  const isCookMode = activeTab === 'cook' && cookingMeal !== null;

  return (
    <LanguageProvider>
      <MobileContainer isDarkMode={isDarkMode}>
        <AnimatePresence mode="wait">
          {showOnboarding ? (
            <Onboarding key="onboarding" onStart={handleStart} isDarkMode={isDarkMode} />
          ) : (
            <div key="main" className="relative w-full h-full">
              {/* Main Content Area */}
              <AnimatePresence mode="wait">
                {activeTab === 'home' && (
                  <Home key="home" onSelectMeal={handleSelectMeal} isDarkMode={isDarkMode} />
                )}
                {activeTab === 'cart' && (
                  <LogisticsHub
                    key="cart"
                    boxItems={boxItems}
                    selectedDeliveryDate={selectedDeliveryDate}
                    onDateChange={handleDateChange}
                    onRemoveItem={handleRemoveFromBox}
                    onUpdateItem={handleUpdateBoxItem}
                    isDarkMode={isDarkMode}
                  />
                )}
                {activeTab === 'cook' && (
                  <CookMode
                    key="cook"
                    boxItems={boxItems}
                    cookingMeal={cookingMeal}
                    onSelectMeal={handleSelectCookingMeal}
                    onFinish={handleCookFinish}
                    onExit={handleExitCookMode}
                    isDarkMode={isDarkMode}
                  />
                )}
                {activeTab === 'profile' && (
                  <Profile
                    key="profile"
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  />
                )}
              </AnimatePresence>

              {/* Product Detail Overlay */}
              <AnimatePresence>
                {selectedMeal && (
                  <ProductDetail
                    key="product-detail"
                    meal={selectedMeal}
                    onClose={handleCloseDetail}
                    onAddToBox={handleAddToBox}
                    isDarkMode={isDarkMode}
                  />
                )}
              </AnimatePresence>

              {/* Bottom Navigation - hide in active cook mode */}
              {!(activeTab === 'cook' && cookingMeal !== null) && (
                <BottomNav
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  boxCount={boxItems.length}
                  boxTotal={boxItems.reduce((sum, item) => sum + (item.price || 0), 0)}
                  isDarkMode={isDarkMode}
                />
              )}
            </div>
          )}
        </AnimatePresence>
      </MobileContainer>
    </LanguageProvider>
  );
}

export default App;
