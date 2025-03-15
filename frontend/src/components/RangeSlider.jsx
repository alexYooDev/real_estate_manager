import { useState } from 'react';

const RangeSlider = ({ min, max, step }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - step);
    setMinValue(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + step);
    setMaxValue(value);
  };

  return (
    <div className='w-full p-4'>
      <div className='relative w-full'>
        {/* Range Track */}
        <div className='absolute w-full h-1 transform -translate-y-1/2 bg-gray-300 top-1/2'></div>

        {/* Min Input */}
        <input
          type='range'
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={handleMinChange}
          className='absolute w-full h-1 bg-transparent pointer-events-none'
          style={{ zIndex: minValue > max - 10 ? '10' : '5' }}
        />

        {/* Max Input */}
        <input
          type='range'
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          className='absolute w-full h-1 bg-transparent pointer-events-none'
          style={{ zIndex: '10' }}
        />
      </div>

      {/* Display Values */}
      <div className='flex justify-between mt-3 text-sm text-gray-700'>
        <span>Min: ${minValue}</span>
        <span>Max: ${maxValue}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
