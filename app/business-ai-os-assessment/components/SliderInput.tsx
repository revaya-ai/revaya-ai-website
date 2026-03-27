"use client";

interface SliderInputProps {
  value: number;
  min: number;
  max: number;
  prefix?: string;
  suffix?: string;
  onChange: (value: number) => void;
}

function formatValue(value: number, prefix?: string, suffix?: string): string {
  if (prefix === "$") {
    return `$${value.toLocaleString()}`;
  }
  return `${prefix ?? ""}${value.toLocaleString()}${suffix ?? ""}`;
}

export default function SliderInput({
  value,
  min,
  max,
  prefix,
  suffix,
  onChange,
}: SliderInputProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full space-y-3">
      {/* Current value display */}
      <div className="text-center">
        <span className="font-display text-3xl font-black text-brand-accent">
          {formatValue(value, prefix, suffix)}
        </span>
      </div>

      {/* Slider */}
      <div className="relative px-1">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #028090 0%, #028090 ${pct}%, rgba(255,255,255,0.12) ${pct}%, rgba(255,255,255,0.12) 100%)`,
          }}
        />
      </div>

      {/* Min/max labels */}
      <div className="flex justify-between text-sm text-white/40">
        <span>{formatValue(min, prefix, suffix)}</span>
        <span>{formatValue(max, prefix, suffix)}</span>
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #028090;
          box-shadow: 0 0 12px rgba(2, 128, 144, 0.5);
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
        input[type="range"]::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #028090;
          box-shadow: 0 0 12px rgba(2, 128, 144, 0.5);
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
