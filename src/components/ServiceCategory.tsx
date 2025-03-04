import React from 'react';
import { ServiceOption } from '../types';

interface ServiceCategoryProps {
  title: string;
  services: ServiceOption[];
  selectedServices: string[];
  onServiceToggle: (serviceId: string) => void;
  isRadioSelect?: boolean;
}

export default function ServiceCategory({
  title,
  services,
  selectedServices,
  onServiceToggle,
  isRadioSelect = false
}: ServiceCategoryProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4 text-[#131D5A]">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <label key={service.id} className="flex items-center space-x-3">
            <input
              type={isRadioSelect ? "radio" : "checkbox"}
              name={isRadioSelect ? "websiteType" : undefined}
              checked={selectedServices.includes(service.id)}
              onChange={() => onServiceToggle(service.id)}
              className={`h-5 w-5 ${isRadioSelect ? 'text-[#FD625D]' : 'text-[#FD625D]'}`}
            />
            <span className="text-gray-700">{service.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}