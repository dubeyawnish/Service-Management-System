"use client";
import { createSlice } from "@reduxjs/toolkit";

// theme config import
import themeConfig from "@/config/themeConfig";

const getItemFromLocalStorage = (key, defaultValue) => {
  try {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    }
  } catch (error) {
    console.error(`Error accessing window.localStorage for key "${key}":`, error);
  }

  return defaultValue;
};

const setItemToLocalStorage = (key, value) => {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(`Error setting window.localStorage for key "${key}":`, error);
  }
};

const initialState = {
  isRTL: getItemFromLocalStorage("direction", themeConfig.layout.isRTL),
  darkMode: getItemFromLocalStorage("darkMode", themeConfig.layout.darkMode),
  isCollapsed: getItemFromLocalStorage("sidebarCollapsed", themeConfig.layout.menu.isCollapsed),
  customizer: themeConfig.layout.customizer,
  semiDarkMode: getItemFromLocalStorage("semiDarkMode", themeConfig.layout.semiDarkMode),
  skin: getItemFromLocalStorage("skin", themeConfig.layout.skin),
  contentWidth: themeConfig.layout.contentWidth,
  type: getItemFromLocalStorage("type", themeConfig.layout.type),
  menuHidden: themeConfig.layout.menu.isHidden,
  navBarType: themeConfig.layout.navBarType,
  footerType: themeConfig.layout.footerType,
  mobileMenu: themeConfig.layout.mobileMenu,
  isMonochrome: getItemFromLocalStorage("monochrome", themeConfig.layout.isMonochrome),
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    handleDarkMode: (state, action) => {
      state.darkMode = action.payload;
      setItemToLocalStorage("darkMode", action.payload);
    },
    handleSidebarCollapsed: (state, action) => {
      state.isCollapsed = action.payload;
      setItemToLocalStorage("sidebarCollapsed", action.payload);
    },
    handleCustomizer: (state, action) => {
      state.customizer = action.payload;
    },
    handleSemiDarkMode: (state, action) => {
      state.semiDarkMode = action.payload;
      setItemToLocalStorage("semiDarkMode", action.payload);
    },
    handleRtl: (state, action) => {
      state.isRTL = action.payload;
      setItemToLocalStorage("direction", action.payload);
    },
    handleSkin: (state, action) => {
      state.skin = action.payload;
      setItemToLocalStorage("skin", action.payload);
    },
    handleContentWidth: (state, action) => {
      state.contentWidth = action.payload;
    },
    handleType: (state, action) => {
      state.type = action.payload;
      setItemToLocalStorage("type", action.payload);
    },
    handleMenuHidden: (state, action) => {
      state.menuHidden = action.payload;
    },
    handleNavBarType: (state, action) => {
      state.navBarType = action.payload;
    },
    handleFooterType: (state, action) => {
      state.footerType = action.payload;
    },
    handleMobileMenu: (state, action) => {
      state.mobileMenu = action.payload;
    },
    handleMonoChrome: (state, action) => {
      state.isMonochrome = action.payload;
      setItemToLocalStorage("monochrome", action.payload);
    },
  },
});

export const {
  handleDarkMode,
  handleSidebarCollapsed,
  handleCustomizer,
  handleSemiDarkMode,
  handleRtl,
  handleSkin,
  handleContentWidth,
  handleType,
  handleMenuHidden,
  handleNavBarType,
  handleFooterType,
  handleMobileMenu,
  handleMonoChrome,
} = layoutSlice.actions;

export default layoutSlice.reducer;
