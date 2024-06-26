import React from 'react';

interface CardProps {
  title: string;
  value: string;
  description: string;
  icon: JSX.Element;
  bgColor: string;
}

const DashboardCard: React.FC<CardProps> = ({ title, value, description, icon, bgColor }) => {
  return (
    <div className={`p-4 rounded shadow-custom ${bgColor} text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xl font-semibold">{title}</h4>
          <p className="text-3xl">{value}</p>
          <p>{description}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
};

export default DashboardCard;
