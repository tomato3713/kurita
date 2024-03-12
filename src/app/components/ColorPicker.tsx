type ColorPickerProps = Readonly<{
  color: string;
  setColor: (color: string) => unknown;
}>;

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  setColor,
}) => {
  return (
    <div className="flex justify-center space-x-2">
      <input
        id="nativeColorPicker1"
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  );
};
