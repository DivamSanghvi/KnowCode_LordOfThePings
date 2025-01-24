import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const ModernCard = ({ title, subtitle, description, url }) => {
  const descriptionList = description.split('\n').map(item => item.trim()).filter(item => item);

  return (
    <Link to={url} className="block w-full max-w-sm">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
          <p className="text-sm font-medium text-blue-600 mb-4">{subtitle}</p>
          <ul className="space-y-2">
            {descriptionList.map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500 mr-2" />
                <p className="text-sm text-gray-600">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default ModernCard;