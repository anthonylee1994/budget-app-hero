import React from "react";

interface Props {
    value: string;
    onChange: (color: string) => void;
}

const DEFAULT_COLORS = [
    // red
    "#F56565",
    "#E53E3E",
    "#C53030",
    // orange
    "#ED8936",
    "#DD6B20",
    "#C05621",
    // yellow
    "#ECC94B",
    "#D69E2E",
    "#B7791F",
    // green
    "#48BB78",
    "#38A169",
    "#2F855A",
    // teal
    "#38B2AC",
    "#319795",
    "#2C7A7B",
    // blue
    "#4299E1",
    "#3182CE",
    "#2B6CB0",
    // cyan
    "#0BC5EA",
    "#00B5D8",
    "#00A3C4",
    // purple
    "#9F7AEA",
    "#805AD5",
    "#6B46C1",
    // pink
    "#ED64A6",
    "#D53F8C",
    "#B83280",
    // gray
    "#A0AEC0",
    "#718096",
    "#4A5568",
];

export const ColorPicker = React.forwardRef<HTMLDivElement, Props>(({value, onChange}, ref) => {
    const handleColorSelect = (color: string) => {
        onChange(color);
    };

    return (
        <div ref={ref} className="flex flex-col space-y-4">
            {/* Current Color Preview */}
            <div className="flex w-full items-center space-x-3">
                <div
                    className="rounded-2xl"
                    style={{
                        width: 40,
                        height: 40,
                        backgroundColor: value,
                    }}
                />
                <div className="flex flex-col items-start space-y-1">
                    <p className="text-sm text-default-600">已選擇顏色</p>
                    <p className="font-mono text-xs text-default-500">{value}</p>
                </div>
            </div>

            {/* Color Grid */}
            <div className="w-full">
                <p className="mb-3 text-sm text-default-600">選擇顏色</p>
                <div className="grid grid-cols-6 gap-2 sm:grid-cols-10">
                    {DEFAULT_COLORS.map(color => (
                        <button
                            key={color}
                            type="button"
                            className={`cursor-pointer rounded-2xl border-3 transition-all duration-200 hover:scale-110 ${
                                value === color ? "scale-105 border-default-800" : "border-transparent hover:border-default-500"
                            }`}
                            style={{
                                width: 32,
                                height: 32,
                                backgroundColor: color,
                            }}
                            onClick={() => handleColorSelect(color)}
                            title={color}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
});

ColorPicker.displayName = "ColorPicker";
