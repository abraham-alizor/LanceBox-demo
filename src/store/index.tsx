import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {MMKV} from 'react-native-mmkv';

// Initialize MMKV storage
const storage = new MMKV({
  id: 'invoice-app-storage',
  encryptionKey: 'invoice-secure-key',
});

// Create MMKV storage adapter for Zustand
const mmkvStorage = {
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ? Promise.resolve(value) : Promise.resolve(null);
  },
  setItem: (name: string, value: string) => {
    storage.set(name, value);
    return Promise.resolve();
  },
  removeItem: (name: string) => {
    storage.delete(name);
    return Promise.resolve();
  },
};

interface InvoiceItem {
  itemDescription: string;
  quantity: number;
  price: number;
  currency: string;
  amount: number;
  invoiceTitle: string;
}

interface ClientInfo {
  clientName: string;
  yourName: string;
  insuranceDate: Date | null;
  currency: string;
}

interface BankInfo {
  bankNumber: string;
  bankName: string;
  accountName: string;
  paymentTerms: string;
}

interface InvoiceStoreState {
  clientInfo: ClientInfo | null;
  invoiceItems: InvoiceItem[];
  bankInfo: BankInfo | null;
  setClientInfo: (data: ClientInfo) => void;
  setBankInfo: (data: BankInfo) => void;
  addInvoiceItem: (item: InvoiceItem) => void;
  removeInvoiceItem: (index: number) => void;
  resetForm: () => void;
}

interface StoreState {
  accessToken: string;
  setAccessToken: (token: string) => void;
  removeAccessToken: () => void;
}

// Persist the access token store
export const useStore = create<StoreState>()(
  persist(
    set => ({
      accessToken: '',
      setAccessToken: accessToken => set({accessToken}),
      removeAccessToken: () => set({accessToken: ''}),
    }),
    {
      name: 'access-token-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);

// Persist the invoice store
export const useInvoiceStore = create<InvoiceStoreState>()(
  persist(
    set => ({
      // Initial state
      clientInfo: null,
      invoiceItems: [],
      bankInfo: null,

      // Actions
      setClientInfo: (data: ClientInfo) =>
        set(state => ({
          ...state,
          clientInfo: data,
        })),

      setBankInfo: (data: BankInfo) =>
        set(state => ({
          ...state,
          bankInfo: data,
        })),

      addInvoiceItem: item =>
        set(state => ({
          ...state,
          invoiceItems: [...state.invoiceItems, item],
        })),

      removeInvoiceItem: index =>
        set(state => ({
          ...state,
          invoiceItems: state.invoiceItems.filter((_, i) => i !== index),
        })),

      resetForm: () =>
        set({
          clientInfo: null,
          invoiceItems: [],
          bankInfo: null,
        }),
    }),
    {
      name: 'invoice-storage',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: state => ({
        clientInfo: state.clientInfo,
        invoiceItems: state.invoiceItems,
        bankInfo: state.bankInfo,
      }),
    },
  ),
);
