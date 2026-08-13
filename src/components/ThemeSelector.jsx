import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/themeContext';
import { Palette, Check, RotateCcw } from 'lucide-react';

const PRESET_THEMES = [
  {
    id: 'brand-purple',
    name: 'Brand Purple',
    theme: {
      primary: '#ba0000',
      primaryHover: '#a70e0e',
      secondary: '#7c3aed',
      accent: '#f59e0b',
    }
  },
  {
    id: 'blue',
    name: 'Blue',
    theme: {
      primary: '#2563eb',
      primaryHover: '#1d4ed8',
      secondary: '#7c3aed',
      accent: '#f59e0b',
    }
  },
  {
    id: 'green',
    name: 'Green',
    theme: {
      primary: '#059669',
      primaryHover: '#047857',
      secondary: '#2563eb',
      accent: '#f59e0b',
    }
  },
  {
    id: 'red',
    name: 'Red',
    theme: {
      primary: '#dc2626',
      primaryHover: '#b91c1c',
      secondary: '#7c3aed',
      accent: '#f59e0b',
    }
  },
  {
    id: 'orange',
    name: 'Orange',
    theme: {
      primary: '#ea580c',
      primaryHover: '#c2410c',
      secondary: '#7c3aed',
      accent: '#2563eb',
    }
  },
];

const ThemeSelector = () => {
  const { darkMode, theme, setTheme, resetTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  const isDark = darkMode;

  return (
    <div className="relative">
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-1 sm:p-1.5 md:p-2 rounded-lg transition-colors ${
          isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
        }`}
        title="Change Theme Color"
      >
        <Palette className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
      </button>

      {/* Theme Selector Dropdown */}
      {isOpen && (
        <div className={`absolute right-0 mt-2 w-72 rounded-lg shadow-xl border overflow-hidden z-50 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
        }`}>
          <div className={`px-4 py-3 border-b ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Brand Theme
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Select a preset color scheme
            </p>
          </div>

          <div className="p-3 space-y-2">
            {PRESET_THEMES.map((preset) => {
              const isActive = theme.primary === preset.theme.primary;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    setTheme(preset.theme);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? isDark ? 'bg-gray-700' : 'bg-gray-100'
                      : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex gap-1">
                    <div 
                      className="w-6 h-6 rounded-full border-2"
                      style={{ 
                        backgroundColor: preset.theme.primary,
                        borderColor: isDark ? '#374151' : '#e5e7eb'
                      }}
                    />
                    <div 
                      className="w-6 h-6 rounded-full border-2"
                      style={{ 
                        backgroundColor: preset.theme.secondary,
                        borderColor: isDark ? '#374151' : '#e5e7eb'
                      }}
                    />
                    <div 
                      className="w-6 h-6 rounded-full border-2"
                      style={{ 
                        backgroundColor: preset.theme.accent,
                        borderColor: isDark ? '#374151' : '#e5e7eb'
                      }}
                    />
                  </div>
                  <span className={`flex-1 text-sm font-medium text-left ${
                    isDark ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    {preset.name}
                  </span>
                  {isActive && (
                    <Check className="w-4 h-4" style={{ color: theme.primary }} />
                  )}
                </button>
              );
            })}
          </div>

          <div className={`px-3 py-2 border-t flex justify-between ${
            isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-100 bg-gray-50'
          }`}>
            <button
              onClick={() => {
                resetTheme();
                setIsOpen(false);
              }}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
              }`}
            >
              <RotateCcw className="w-3 h-3" />
              Reset to Default
            </button>
            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Current: {theme.primary}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;