import { createStore } from 'redux';
import rootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // використовуємо localStorage
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'], // Зберігаємо тільки вказані редюсери
  
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);
export { store, persistor };