/**
 * Theme Settings - Admin Theme Configuration Page
 * 
 * Located at: /admin/settings/theme
 * 
 * Features:
 * - Full color picker with react-colorful
 * - Recent colors history (last 4)
 * - Preset themes
 * - Live preview
 * - Persistent storage
 */

import { useState, useCallback, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { 
  useTheme, 
  COLOR_PRESETS, 
  DEFAULT_ACCENT_COLOR,
  type ColorPreset 
} from '@/lib/theme';
import PageHeader from '../../components/PageHeader';
import { 
  Palette, 
  RotateCcw, 
  Check, 
  Monitor,
  Type,
  MousePointerClick,
  Square,
  Info,
  History,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

// =============================================================================
// COLOR SWATCH COMPONENT (for presets and recent colors)
// =============================================================================

interface ColorSwatchProps {
  color: string;
  label?: string;
  isSelected: boolean;
  onClick: () => void;
  showRemove?: boolean;
  onRemove?: () => void;
}

function ColorSwatch({ color, label, isSelected, onClick, showRemove, onRemove }: ColorSwatchProps) {
  return (
    <button
      onClick={onClick}
      className={`
        group relative flex flex-col items-center gap-2 p-3 rounded-lg
        border-2 transition-all duration-200
        ${isSelected 
          ? 'border-[var(--accent)] bg-[var(--accent)]/10' 
          : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-800'
        }
      `}
      title={label || color}
    >
      {/* Color circle */}
      <div
        className="w-12 h-12 rounded-full shadow-lg transition-transform duration-200 group-hover:scale-110 relative"
        style={{ 
          backgroundColor: color,
          boxShadow: `0 0 20px ${color}40`
        }}
      >
        {isSelected && (
          <div className="w-full h-full rounded-full flex items-center justify-center bg-black/30">
            <Check className="w-5 h-5 text-white" strokeWidth={3} />
          </div>
        )}
        
        {/* Remove button for recent colors */}
        {showRemove && onRemove && (
          <div 
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-zinc-700 
                       flex items-center justify-center opacity-0 group-hover:opacity-100
                       transition-opacity cursor-pointer hover:bg-rose-500"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <X className="w-3 h-3 text-white" />
          </div>
        )}
      </div>
      
      {/* Label */}
      {label && (
        <span className={`
          text-xs font-medium transition-colors
          ${isSelected ? 'text-[var(--accent)]' : 'text-zinc-400 group-hover:text-zinc-300'}
        `}>
          {label}
        </span>
      )}
    </button>
  );
}

// =============================================================================
// RECENT COLORS COMPONENT
// =============================================================================

interface RecentColorsProps {
  colors: string[];
  currentColor: string;
  onSelect: (color: string) => void;
  onClear: () => void;
}

function RecentColors({ colors, currentColor, onSelect, onClear }: RecentColorsProps) {
  if (colors.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2">
          <History className="w-4 h-4 text-zinc-500" />
          Recent Colors
        </Label>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-auto py-1 px-2 text-xs text-zinc-500 hover:text-rose-400"
        >
          Clear
        </Button>
      </div>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <ColorSwatch
            key={color}
            color={color}
            isSelected={color.toLowerCase() === currentColor.toLowerCase()}
            onClick={() => onSelect(color)}
          />
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// FULL COLOR PICKER COMPONENT
// =============================================================================

interface FullColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

function FullColorPicker({ value, onChange }: FullColorPickerProps) {
  const [inputValue, setInputValue] = useState(value);
  
  // Sync input with external value
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Update picker if valid hex
    if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-4">
      {/* react-colorful picker */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="custom-color-picker">
          <HexColorPicker 
            color={value} 
            onChange={onChange}
            style={{ width: '100%', height: '200px' }}
          />
        </div>
        
        {/* Color preview and input */}
        <div className="flex-1 space-y-3">
          {/* Large preview */}
          <div 
            className="w-full h-20 rounded-lg border-2 border-zinc-700 shadow-lg transition-colors duration-200"
            style={{ 
              backgroundColor: value,
              boxShadow: `0 0 30px ${value}30`
            }}
          />
          
          {/* Hex input */}
          <div className="space-y-1">
            <Label className="text-xs text-zinc-500">HEX Color</Label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="#0D9488"
                className="flex-1 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg 
                           text-white font-mono text-sm uppercase
                           focus:outline-none focus:border-[var(--accent)] transition-colors"
                maxLength={7}
              />
              <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-10 h-10 p-0 border-0 rounded-lg cursor-pointer bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom styles for react-colorful */}
      <style>{`
        .custom-color-picker .react-colorful {
          width: 100%;
          height: 200px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(0,0,0,0.3);
        }
        .custom-color-picker .react-colorful__saturation {
          border-radius: 8px 8px 0 0;
        }
        .custom-color-picker .react-colorful__hue {
          height: 24px;
          border-radius: 0 0 8px 8px;
        }
        .custom-color-picker .react-colorful__pointer {
          width: 20px;
          height: 20px;
          border: 2px solid white;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
}

// =============================================================================
// PRESET SWATCH COMPONENT
// =============================================================================

interface PresetSwatchProps {
  preset: ColorPreset;
  isSelected: boolean;
  onClick: () => void;
}

function PresetSwatch({ preset, isSelected, onClick }: PresetSwatchProps) {
  return (
    <button
      onClick={onClick}
      className={`
        group relative flex flex-col items-center gap-2 p-3 rounded-lg
        border-2 transition-all duration-200
        ${isSelected 
          ? 'border-[var(--accent)] bg-[var(--accent)]/10' 
          : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-800'
        }
      `}
      title={preset.name}
    >
      {/* Color circle */}
      <div
        className="w-12 h-12 rounded-full shadow-lg transition-transform duration-200 group-hover:scale-110"
        style={{ 
          backgroundColor: preset.value,
          boxShadow: `0 0 20px ${preset.value}40`
        }}
      >
        {isSelected && (
          <div className="w-full h-full rounded-full flex items-center justify-center bg-black/20">
            <Check className="w-6 h-6 text-white" strokeWidth={3} />
          </div>
        )}
      </div>
      
      {/* Label */}
      <span className={`
        text-xs font-medium transition-colors
        ${isSelected ? 'text-[var(--accent)]' : 'text-zinc-400 group-hover:text-zinc-300'}
      `}>
        {preset.name}
      </span>
    </button>
  );
}

// =============================================================================
// THEME PREVIEW COMPONENT
// =============================================================================

function ThemePreview() {
  return (
    <div className="space-y-6">
      {/* Button Preview */}
      <div className="space-y-2">
        <Label className="text-xs text-zinc-500 uppercase tracking-wider flex items-center gap-2">
          <MousePointerClick className="w-3 h-3" />
          Buttons
        </Label>
        <div className="flex flex-wrap gap-3">
          <Button 
            className="bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-black font-semibold"
          >
            Primary Button
          </Button>
          <Button 
            variant="outline" 
            className="border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10"
          >
            Outline Button
          </Button>
          <Button 
            variant="ghost" 
            className="text-[var(--accent)] hover:bg-[var(--accent)]/10"
          >
            Ghost Button
          </Button>
        </div>
      </div>

      {/* Text Preview */}
      <div className="space-y-2">
        <Label className="text-xs text-zinc-500 uppercase tracking-wider flex items-center gap-2">
          <Type className="w-3 h-3" />
          Text & Highlights
        </Label>
        <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 space-y-2">
          <p className="text-white">
            Regular text with <span className="text-[var(--accent)] font-semibold">accent highlight</span> inline
          </p>
          <p className="text-[var(--accent)]">
            Full accent colored text
          </p>
          <p className="text-[var(--accent-light)]">
            Light accent variant
          </p>
          <div className="inline-block px-2 py-1 rounded bg-[var(--accent)]/20 text-[var(--accent)] text-sm">
            Accent badge
          </div>
        </div>
      </div>

      {/* Border & Glow Preview */}
      <div className="space-y-2">
        <Label className="text-xs text-zinc-500 uppercase tracking-wider flex items-center gap-2">
          <Square className="w-3 h-3" />
          Borders & Glows
        </Label>
        <div className="flex flex-wrap gap-4">
          <div className="w-20 h-20 rounded-lg border-2 border-[var(--accent)] bg-zinc-900 flex items-center justify-center">
            <span className="text-xs text-zinc-500">Border</span>
          </div>
          <div 
            className="w-20 h-20 rounded-lg bg-zinc-900 flex items-center justify-center"
            style={{ boxShadow: '0 0 30px var(--accent)' }}
          >
            <span className="text-xs text-zinc-500">Glow</span>
          </div>
          <div className="w-20 h-20 rounded-lg bg-[var(--accent)] flex items-center justify-center">
            <span className="text-xs text-black font-medium">Fill</span>
          </div>
          <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center">
            <span className="text-xs text-white font-medium">Gradient</span>
          </div>
        </div>
      </div>

      {/* Selection Preview */}
      <div className="space-y-2">
        <Label className="text-xs text-zinc-500 uppercase tracking-wider flex items-center gap-2">
          <Monitor className="w-3 h-3" />
          Selection & Scrollbar
        </Label>
        <div 
          className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 overflow-auto max-h-24"
        >
          <p className="text-zinc-400 text-sm">
            Try selecting this text to see the accent color in action. 
            The selection background uses the accent color. 
            This demonstrates how the theme color affects native browser elements.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <p className="text-xs text-zinc-600">
          The scrollbar on the right also uses the accent color
        </p>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function ThemeSettings() {
  const { 
    accentColor, 
    setAccentColor, 
    resetToDefault, 
    themeColors,
    recentColors,
    clearRecentColors
  } = useTheme();
  
  // Check if current color matches a preset
  const selectedPreset = COLOR_PRESETS.find(
    p => p.value.toLowerCase() === accentColor.toLowerCase()
  );
  
  const isCustomColor = !selectedPreset;

  const handlePresetSelect = useCallback((preset: ColorPreset) => {
    setAccentColor(preset.value);
    toast.success(`Theme changed to ${preset.name}`, {
      description: `Accent color updated to ${preset.value}`,
    });
  }, [setAccentColor]);
  
  const handleColorChange = useCallback((color: string) => {
    setAccentColor(color);
  }, [setAccentColor]);
  
  const handleReset = useCallback(() => {
    resetToDefault();
    toast.success('Theme reset to default', {
      description: `Accent color restored to ${DEFAULT_ACCENT_COLOR}`,
    });
  }, [resetToDefault]);

  return (
    <div>
      <PageHeader 
        title="Theme Settings"
        subtitle="Customize the accent color theme for the entire website. Changes are applied immediately."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Color Selection */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Full Color Picker Section */}
          <Card className="border-zinc-800/50 bg-zinc-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-[var(--accent)]" />
                Accent Color
                <span 
                  className="w-4 h-4 rounded-full ml-auto ring-2 ring-zinc-700"
                  style={{ backgroundColor: accentColor }}
                />
              </CardTitle>
              <CardDescription>
                Choose any color using the picker below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Full Color Picker */}
              <FullColorPicker 
                value={accentColor}
                onChange={handleColorChange}
              />

              <Separator className="bg-zinc-800" />

              {/* Recent Colors */}
              <RecentColors
                colors={recentColors}
                currentColor={accentColor}
                onSelect={handleColorChange}
                onClear={clearRecentColors}
              />

              {recentColors.length > 0 && <Separator className="bg-zinc-800" />}

              {/* Preset Themes */}
              <div className="space-y-3">
                <Label>Preset Themes</Label>
                <div className="grid grid-cols-4 gap-3">
                  {COLOR_PRESETS.map((preset) => (
                    <PresetSwatch
                      key={preset.value}
                      preset={preset}
                      isSelected={
                        !isCustomColor && selectedPreset?.value === preset.value
                      }
                      onClick={() => handlePresetSelect(preset)}
                    />
                  ))}
                </div>
              </div>

              {/* Current Selection Info */}
              <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-400">Current Color</p>
                    <p className="text-lg font-mono text-[var(--accent)]">
                      {accentColor.toUpperCase()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div 
                      className="w-10 h-10 rounded-lg border border-zinc-700"
                      style={{ backgroundColor: themeColors.accentDark }}
                      title="Dark variant"
                    />
                    <div 
                      className="w-10 h-10 rounded-lg border border-zinc-700 ring-2 ring-[var(--accent)]"
                      style={{ backgroundColor: themeColors.accent }}
                      title="Main accent"
                    />
                    <div 
                      className="w-10 h-10 rounded-lg border border-zinc-700"
                      style={{ backgroundColor: themeColors.accentLight }}
                      title="Light variant"
                    />
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset to Default
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Information */}
          <Card className="border-zinc-800/50 bg-zinc-900/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Info className="w-4 h-4 text-zinc-400" />
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)]">•</span>
                  <span>Theme color is stored in browser localStorage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)]">•</span>
                  <span>Recent colors history is also persisted locally</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)]">•</span>
                  <span>Changes persist across page reloads</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)]">•</span>
                  <span>Affects buttons, links, borders, glows, and selection colors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)]">•</span>
                  <span>Default color: {DEFAULT_ACCENT_COLOR} (Cyan)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Live Preview */}
        <div>
          <Card className="border-zinc-800/50 bg-zinc-900/20 sticky top-24">
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>
                See how the accent color appears across different UI elements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ThemePreview />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
