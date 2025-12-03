"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, RotateCcw } from "lucide-react";

interface GlowTrailState {
  // Colors (RGB values)
  frontColorPrimary: string; // sky-200
  frontColorSecondary: string; // sky-300
  
  // Opacities (0-1)
  frontOpacityStart: number;
  frontOpacity10deg: number;
  frontOpacity20deg: number;
  trailOpacity35deg: number;
  trailOpacity50deg: number;
  trailOpacity70deg: number;
  trailOpacity90deg: number;
  trailOpacity110deg: number;
  trailOpacity130deg: number;
  
  // Angles (0-360)
  brightSectionEnd: number;
  fadeStartAngle: number;
  trailEndAngle: number;
  
  // Visual effects
  blurAmount: number;
  animationDuration: number;
  borderRadius: number;
}

const DEFAULT_STATE: GlowTrailState = {
  frontColorPrimary: "186, 230, 253", // sky-200
  frontColorSecondary: "125, 211, 252", // sky-300
  frontOpacityStart: 1.0,
  frontOpacity10deg: 1.0,
  frontOpacity20deg: 0.9,
  trailOpacity35deg: 0.8,
  trailOpacity50deg: 0.6,
  trailOpacity70deg: 0.4,
  trailOpacity90deg: 0.25,
  trailOpacity110deg: 0.12,
  trailOpacity130deg: 0.05,
  brightSectionEnd: 10,
  fadeStartAngle: 20,
  trailEndAngle: 150,
  blurAmount: 1.5,
  animationDuration: 4,
  borderRadius: 43,
};

function rgbToHex(rgb: string): string {
  const [r, g, b] = rgb.split(",").map((n) => parseInt(n.trim()));
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "186, 230, 253";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

export function GlowTrailDebugTool() {
  const [state, setState] = useState<GlowTrailState>(DEFAULT_STATE);
  const [showCode, setShowCode] = useState(false);

  const updateState = (key: keyof GlowTrailState, value: string | number) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const resetToDefaults = () => {
    setState(DEFAULT_STATE);
  };

  // Generate CSS gradient string
  const gradientString = useMemo(() => {
    const stops = [
      `rgba(${state.frontColorPrimary}, ${state.frontOpacityStart}) 0deg`,
      `rgba(${state.frontColorPrimary}, ${state.frontOpacity10deg}) ${state.brightSectionEnd}deg`,
      `rgba(${state.frontColorPrimary}, ${state.frontOpacity20deg}) ${state.fadeStartAngle}deg`,
      `rgba(${state.frontColorSecondary}, ${state.trailOpacity35deg}) 35deg`,
      `rgba(${state.frontColorSecondary}, ${state.trailOpacity50deg}) 50deg`,
      `rgba(${state.frontColorSecondary}, ${state.trailOpacity70deg}) 70deg`,
      `rgba(${state.frontColorSecondary}, ${state.trailOpacity90deg}) 90deg`,
      `rgba(${state.frontColorSecondary}, ${state.trailOpacity110deg}) 110deg`,
      `rgba(${state.frontColorSecondary}, ${state.trailOpacity130deg}) 130deg`,
      `transparent ${state.trailEndAngle}deg`,
      `transparent 360deg`,
    ].join(", ");

    return `conic-gradient(from 0deg, ${stops})`;
  }, [state]);

  // Generate CSS code
  const cssCode = useMemo(() => {
    return `.glow-trail-button::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: ${state.borderRadius}px;
  background: ${gradientString};
  filter: blur(${state.blurAmount}px);
  animation: rotate-glow-trail ${state.animationDuration}s linear infinite;
  z-index: 1;
  pointer-events: none;
}`;
  }, [state, gradientString]);

  // Inject dynamic styles
  useEffect(() => {
    const styleId = "glow-trail-debug-styles";
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    styleElement.textContent = `
      .glow-trail-debug-preview::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: ${state.borderRadius}px;
        background: ${gradientString};
        filter: blur(${state.blurAmount}px);
        animation: rotate-glow-trail ${state.animationDuration}s linear infinite;
        z-index: 1;
        pointer-events: none;
      }
    `;
    
    return () => {
      // Cleanup on unmount
      const element = document.getElementById(styleId);
      if (element) {
        element.remove();
      }
    };
  }, [state, gradientString]);

  return (
    <div className="space-y-6">
      {/* Live Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
          <CardDescription>See your changes in real-time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-12 bg-muted/50 rounded-lg">
            <div
              className="glow-trail-debug-preview glow-trail-button bg-sky-900/40 box-border content-stretch flex flex-col items-start p-[2px] relative rounded-[43px] shadow-[0px_0px_20px_0px_rgba(14,165,233,0.15)]"
            >
              <div className="bg-[#130d0e] box-border content-stretch flex gap-[12.99px] h-14 items-center px-6 py-2 relative rounded-[1000px] shrink-0 cursor-pointer transition-all hover:bg-[#1a1213] z-10">
                <div className="content-stretch flex flex-col items-start relative shrink-0">
                  <div className="flex flex-col font-medium justify-center leading-[0] not-italic relative shrink-0 text-lg text-nowrap text-white tracking-[0.2px]">
                    <p className="leading-[1.2] whitespace-pre">Get Started</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Color Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Color Controls</CardTitle>
            <CardDescription>Adjust the glow colors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Front Color (Primary)</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={rgbToHex(state.frontColorPrimary)}
                  onChange={(e) =>
                    updateState("frontColorPrimary", hexToRgb(e.target.value))
                  }
                  className="h-10 w-20 rounded border border-border cursor-pointer"
                />
                <Input
                  type="text"
                  value={state.frontColorPrimary}
                  onChange={(e) => updateState("frontColorPrimary", e.target.value)}
                  placeholder="R, G, B"
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Trail Color (Secondary)</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={rgbToHex(state.frontColorSecondary)}
                  onChange={(e) =>
                    updateState("frontColorSecondary", hexToRgb(e.target.value))
                  }
                  className="h-10 w-20 rounded border border-border cursor-pointer"
                />
                <Input
                  type="text"
                  value={state.frontColorSecondary}
                  onChange={(e) => updateState("frontColorSecondary", e.target.value)}
                  placeholder="R, G, B"
                  className="flex-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visual Effects */}
        <Card>
          <CardHeader>
            <CardTitle>Visual Effects</CardTitle>
            <CardDescription>Blur, animation, and border settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Blur Amount</label>
                <span className="text-sm text-muted-foreground">{state.blurAmount}px</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={state.blurAmount}
                  onChange={(e) => updateState("blurAmount", parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <Input
                  type="number"
                  value={state.blurAmount}
                  onChange={(e) => updateState("blurAmount", parseFloat(e.target.value) || 0)}
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Animation Duration</label>
                <span className="text-sm text-muted-foreground">{state.animationDuration}s</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={state.animationDuration}
                  onChange={(e) => updateState("animationDuration", parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <Input
                  type="number"
                  value={state.animationDuration}
                  onChange={(e) => updateState("animationDuration", parseFloat(e.target.value) || 1)}
                  min="1"
                  max="10"
                  step="0.5"
                  className="w-20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Border Radius</label>
                <span className="text-sm text-muted-foreground">{state.borderRadius}px</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="range"
                  min="20"
                  max="60"
                  step="1"
                  value={state.borderRadius}
                  onChange={(e) => updateState("borderRadius", parseInt(e.target.value))}
                  className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <Input
                  type="number"
                  value={state.borderRadius}
                  onChange={(e) => updateState("borderRadius", parseInt(e.target.value) || 43)}
                  min="20"
                  max="60"
                  className="w-20"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Front Section Opacities */}
        <Card>
          <CardHeader>
            <CardTitle>Front Section</CardTitle>
            <CardDescription>Brightness and opacity at the front</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Opacity at 0deg</label>
                <span className="text-sm text-muted-foreground">{state.frontOpacityStart}</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={state.frontOpacityStart}
                  onChange={(e) => updateState("frontOpacityStart", parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <Input
                  type="number"
                  value={state.frontOpacityStart}
                  onChange={(e) => updateState("frontOpacityStart", parseFloat(e.target.value) || 0)}
                  min="0"
                  max="1"
                  step="0.01"
                  className="w-20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Bright Section End Angle</label>
                <span className="text-sm text-muted-foreground">{state.brightSectionEnd}deg</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="1"
                  value={state.brightSectionEnd}
                  onChange={(e) => updateState("brightSectionEnd", parseInt(e.target.value))}
                  className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <Input
                  type="number"
                  value={state.brightSectionEnd}
                  onChange={(e) => updateState("brightSectionEnd", parseInt(e.target.value) || 0)}
                  min="0"
                  max="360"
                  className="w-20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Opacity at {state.brightSectionEnd}deg</label>
                <span className="text-sm text-muted-foreground">{state.frontOpacity10deg}</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={state.frontOpacity10deg}
                  onChange={(e) => updateState("frontOpacity10deg", parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <Input
                  type="number"
                  value={state.frontOpacity10deg}
                  onChange={(e) => updateState("frontOpacity10deg", parseFloat(e.target.value) || 0)}
                  min="0"
                  max="1"
                  step="0.01"
                  className="w-20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Opacity at {state.fadeStartAngle}deg</label>
                <span className="text-sm text-muted-foreground">{state.frontOpacity20deg}</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={state.frontOpacity20deg}
                  onChange={(e) => updateState("frontOpacity20deg", parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <Input
                  type="number"
                  value={state.frontOpacity20deg}
                  onChange={(e) => updateState("frontOpacity20deg", parseFloat(e.target.value) || 0)}
                  min="0"
                  max="1"
                  step="0.01"
                  className="w-20"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="1"
                  value={state.fadeStartAngle}
                  onChange={(e) => updateState("fadeStartAngle", parseInt(e.target.value))}
                  className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <Input
                  type="number"
                  value={state.fadeStartAngle}
                  onChange={(e) => updateState("fadeStartAngle", parseInt(e.target.value) || 0)}
                  min="0"
                  max="360"
                  className="w-20"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trail Section Opacities */}
        <Card>
          <CardHeader>
            <CardTitle>Trail Section</CardTitle>
            <CardDescription>Fade-out opacity values</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: "trailOpacity35deg" as const, angle: 35, label: "35deg" },
              { key: "trailOpacity50deg" as const, angle: 50, label: "50deg" },
              { key: "trailOpacity70deg" as const, angle: 70, label: "70deg" },
              { key: "trailOpacity90deg" as const, angle: 90, label: "90deg" },
              { key: "trailOpacity110deg" as const, angle: 110, label: "110deg" },
              { key: "trailOpacity130deg" as const, angle: 130, label: "130deg" },
            ].map(({ key, angle, label }) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Opacity at {label}</label>
                  <span className="text-sm text-muted-foreground">{state[key]}</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={state[key]}
                    onChange={(e) => updateState(key, parseFloat(e.target.value))}
                    className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <Input
                    type="number"
                    value={state[key]}
                    onChange={(e) => updateState(key, parseFloat(e.target.value) || 0)}
                    min="0"
                    max="1"
                    step="0.01"
                    className="w-20"
                  />
                </div>
              </div>
            ))}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Trail End Angle</label>
                <span className="text-sm text-muted-foreground">{state.trailEndAngle}deg</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="1"
                  value={state.trailEndAngle}
                  onChange={(e) => updateState("trailEndAngle", parseInt(e.target.value))}
                  className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <Input
                  type="number"
                  value={state.trailEndAngle}
                  onChange={(e) => updateState("trailEndAngle", parseInt(e.target.value) || 0)}
                  min="0"
                  max="360"
                  className="w-20"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Actions</CardTitle>
            <Button variant="outline" onClick={resetToDefaults}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* CSS Code Display */}
      <Card>
        <CardHeader>
          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center justify-between w-full text-left"
          >
            <CardTitle>Generated CSS Code</CardTitle>
            {showCode ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          <CardDescription>Copy this CSS to apply your changes</CardDescription>
        </CardHeader>
        {showCode && (
          <CardContent>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
              <code>{cssCode}</code>
            </pre>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

