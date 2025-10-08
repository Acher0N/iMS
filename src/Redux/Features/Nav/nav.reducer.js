/**
 * Navigation Redux Slice
 * Manages navigation state, sidebar, breadcrumbs, and routing
 */

import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  // Sidebar state
  sidebar: {
    isOpen: true,
    isPinned: false,
    width: 280,
    collapsed: false,
    variant: "permanent", // 'permanent' | 'persistent' | 'temporary'
  },

  // Navigation structure
  navigation: [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: "Dashboard",
      path: "/dashboard",
      active: false,
      children: [],
    },
    {
      id: "pos",
      title: "Point of Sale",
      icon: "PointOfSale",
      path: "/pos",
      active: false,
      children: [],
    },
    {
      id: "inventory",
      title: "Inventory",
      icon: "Inventory",
      path: "/inventory",
      active: false,
      children: [
        { id: "products", title: "Products", path: "/inventory/products" },
        {
          id: "categories",
          title: "Categories",
          path: "/inventory/categories",
        },
        { id: "stock", title: "Stock Management", path: "/inventory/stock" },
      ],
    },
    {
      id: "sales",
      title: "Sales",
      icon: "Sell",
      path: "/sales",
      active: false,
      children: [
        { id: "invoices", title: "Invoices", path: "/sales/invoices" },
        { id: "receipts", title: "Receipts", path: "/sales/receipts" },
        { id: "returns", title: "Returns", path: "/sales/returns" },
      ],
    },
    {
      id: "purchase",
      title: "Purchase",
      icon: "ShoppingCart",
      path: "/purchase",
      active: false,
      children: [
        { id: "orders", title: "Purchase Orders", path: "/purchase/orders" },
        { id: "receiving", title: "Receiving", path: "/purchase/receiving" },
        { id: "returns", title: "Returns", path: "/purchase/returns" },
      ],
    },
    {
      id: "buyers",
      title: "Customers",
      icon: "People",
      path: "/buyers",
      active: false,
      children: [
        { id: "list", title: "Customer List", path: "/buyers/list" },
        { id: "groups", title: "Customer Groups", path: "/buyers/groups" },
      ],
    },
    {
      id: "suppliers",
      title: "Suppliers",
      icon: "Business",
      path: "/suppliers",
      active: false,
      children: [
        { id: "list", title: "Supplier List", path: "/suppliers/list" },
        {
          id: "categories",
          title: "Supplier Categories",
          path: "/suppliers/categories",
        },
      ],
    },
    {
      id: "reports",
      title: "Reports",
      icon: "Assessment",
      path: "/reports",
      active: false,
      children: [
        { id: "sales", title: "Sales Reports", path: "/reports/sales" },
        {
          id: "inventory",
          title: "Inventory Reports",
          path: "/reports/inventory",
        },
        { id: "tax", title: "Tax Reports", path: "/reports/tax" },
        {
          id: "financial",
          title: "Financial Reports",
          path: "/reports/financial",
        },
      ],
    },
    {
      id: "settings",
      title: "Settings",
      icon: "Settings",
      path: "/settings",
      active: false,
      children: [
        { id: "general", title: "General", path: "/settings/general" },
        { id: "users", title: "Users", path: "/settings/users" },
        { id: "company", title: "Company Info", path: "/settings/company" },
        { id: "taxes", title: "Tax Settings", path: "/settings/taxes" },
        { id: "zatca", title: "ZATCA Settings", path: "/settings/zatca" },
      ],
    },
  ],

  // Breadcrumb navigation
  breadcrumbs: [],

  // Current page state
  currentPage: {
    title: "",
    subtitle: "",
    path: "",
    icon: null,
    actions: [],
  },

  // Page history
  history: [],
  maxHistoryLength: 10,

  // Quick actions
  quickActions: [
    {
      id: "new-invoice",
      title: "New Invoice",
      icon: "Receipt",
      action: "CREATE_INVOICE",
    },
    {
      id: "new-customer",
      title: "New Customer",
      icon: "PersonAdd",
      action: "CREATE_CUSTOMER",
    },
    {
      id: "new-product",
      title: "New Product",
      icon: "Add",
      action: "CREATE_PRODUCT",
    },
    {
      id: "pos-mode",
      title: "POS Mode",
      icon: "PointOfSale",
      action: "ENTER_POS",
    },
  ],

  // Search state
  search: {
    isOpen: false,
    query: "",
    results: [],
    recentSearches: [],
    isSearching: false,
  },

  // Tabs state (for pages with tabs)
  tabs: {
    activeTab: 0,
    tabs: [],
  },

  // Loading states
  loading: {
    navigation: false,
    breadcrumbs: false,
  },

  error: null,
};

// Navigation slice
const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    // Sidebar actions
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },

    setSidebarOpen: (state, action) => {
      state.sidebar.isOpen = action.payload;
    },

    toggleSidebarPin: (state) => {
      state.sidebar.isPinned = !state.sidebar.isPinned;
    },

    setSidebarWidth: (state, action) => {
      state.sidebar.width = action.payload;
    },

    toggleSidebarCollapse: (state) => {
      state.sidebar.collapsed = !state.sidebar.collapsed;
    },

    setSidebarVariant: (state, action) => {
      state.sidebar.variant = action.payload;
    },

    // Navigation actions
    setActiveNavItem: (state, action) => {
      const itemId = action.payload;

      // Reset all navigation items
      const resetActive = (items) => {
        items.forEach((item) => {
          item.active = false;
          if (item.children && item.children.length > 0) {
            resetActive(item.children);
          }
        });
      };

      // Set active item
      const setActive = (items, targetId) => {
        items.forEach((item) => {
          if (item.id === targetId) {
            item.active = true;
            return true;
          }
          if (item.children && item.children.length > 0) {
            const found = setActive(item.children, targetId);
            if (found) {
              item.active = true;
              return true;
            }
          }
        });
        return false;
      };

      resetActive(state.navigation);
      setActive(state.navigation, itemId);
    },

    updateNavigation: (state, action) => {
      state.navigation = action.payload;
    },

    // Breadcrumb actions
    setBreadcrumbs: (state, action) => {
      state.breadcrumbs = action.payload;
    },

    addBreadcrumb: (state, action) => {
      state.breadcrumbs.push(action.payload);
    },

    removeBreadcrumb: (state, action) => {
      const index = action.payload;
      state.breadcrumbs.splice(index, 1);
    },

    clearBreadcrumbs: (state) => {
      state.breadcrumbs = [];
    },

    // Current page actions
    setCurrentPage: (state, action) => {
      const { title, subtitle, path, icon, actions } = action.payload;

      // Add to history if different from current page
      if (state.currentPage.path !== path && state.currentPage.path) {
        const historyItem = {
          title: state.currentPage.title,
          path: state.currentPage.path,
          visitedAt: new Date().toISOString(),
        };

        // Add to beginning of history
        state.history.unshift(historyItem);

        // Limit history length
        if (state.history.length > state.maxHistoryLength) {
          state.history = state.history.slice(0, state.maxHistoryLength);
        }
      }

      // Update current page
      state.currentPage = {
        title: title || "",
        subtitle: subtitle || "",
        path: path || "",
        icon: icon || null,
        actions: actions || [],
      };
    },

    updatePageTitle: (state, action) => {
      state.currentPage.title = action.payload;
    },

    updatePageSubtitle: (state, action) => {
      state.currentPage.subtitle = action.payload;
    },

    setPageActions: (state, action) => {
      state.currentPage.actions = action.payload;
    },

    // History actions
    clearHistory: (state) => {
      state.history = [];
    },

    removeFromHistory: (state, action) => {
      const path = action.payload;
      state.history = state.history.filter((item) => item.path !== path);
    },

    // Quick actions
    updateQuickActions: (state, action) => {
      state.quickActions = action.payload;
    },

    addQuickAction: (state, action) => {
      state.quickActions.push(action.payload);
    },

    removeQuickAction: (state, action) => {
      const id = action.payload;
      state.quickActions = state.quickActions.filter(
        (action) => action.id !== id
      );
    },

    // Search actions
    toggleSearch: (state) => {
      state.search.isOpen = !state.search.isOpen;
      if (!state.search.isOpen) {
        state.search.query = "";
        state.search.results = [];
      }
    },

    setSearchOpen: (state, action) => {
      state.search.isOpen = action.payload;
    },

    setSearchQuery: (state, action) => {
      state.search.query = action.payload;
    },

    setSearchResults: (state, action) => {
      state.search.results = action.payload;
      state.search.isSearching = false;
    },

    setSearching: (state, action) => {
      state.search.isSearching = action.payload;
    },

    addRecentSearch: (state, action) => {
      const query = action.payload;
      if (query && !state.search.recentSearches.includes(query)) {
        state.search.recentSearches.unshift(query);
        if (state.search.recentSearches.length > 10) {
          state.search.recentSearches.pop();
        }
      }
    },

    clearRecentSearches: (state) => {
      state.search.recentSearches = [];
    },

    // Tabs actions
    setActiveTab: (state, action) => {
      state.tabs.activeTab = action.payload;
    },

    setTabs: (state, action) => {
      state.tabs.tabs = action.payload;
    },

    addTab: (state, action) => {
      state.tabs.tabs.push(action.payload);
    },

    removeTab: (state, action) => {
      const index = action.payload;
      state.tabs.tabs.splice(index, 1);
      if (state.tabs.activeTab >= index && state.tabs.activeTab > 0) {
        state.tabs.activeTab -= 1;
      }
    },

    clearTabs: (state) => {
      state.tabs.tabs = [];
      state.tabs.activeTab = 0;
    },

    // Loading actions
    setNavigationLoading: (state, action) => {
      state.loading.navigation = action.payload;
    },

    setBreadcrumbsLoading: (state, action) => {
      state.loading.breadcrumbs = action.payload;
    },

    // Error actions
    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    // Reset action
    resetNavigation: () => {
      return initialState;
    },
  },
});

export const {
  // Sidebar actions
  toggleSidebar,
  setSidebarOpen,
  toggleSidebarPin,
  setSidebarWidth,
  toggleSidebarCollapse,
  setSidebarVariant,

  // Navigation actions
  setActiveNavItem,
  updateNavigation,

  // Breadcrumb actions
  setBreadcrumbs,
  addBreadcrumb,
  removeBreadcrumb,
  clearBreadcrumbs,

  // Current page actions
  setCurrentPage,
  updatePageTitle,
  updatePageSubtitle,
  setPageActions,

  // History actions
  clearHistory,
  removeFromHistory,

  // Quick actions
  updateQuickActions,
  addQuickAction,
  removeQuickAction,

  // Search actions
  toggleSearch,
  setSearchOpen,
  setSearchQuery,
  setSearchResults,
  setSearching,
  addRecentSearch,
  clearRecentSearches,

  // Tabs actions
  setActiveTab,
  setTabs,
  addTab,
  removeTab,
  clearTabs,

  // Loading actions
  setNavigationLoading,
  setBreadcrumbsLoading,

  // Error actions
  setError,
  clearError,

  // Reset action
  resetNavigation,
} = navSlice.actions;

export default navSlice.reducer;
