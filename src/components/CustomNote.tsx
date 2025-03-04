import React from 'react';

interface CustomNoteProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CustomNote({ value, onChange }: CustomNoteProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4 text-[#131D5A]">Custom Note</h3>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add any special requirements or notes here..."
        className="w-full h-32 p-3 border rounded-md focus:ring-2 focus:ring-[#FD625D] focus:border-transparent"
      />
    </div>
  );
}