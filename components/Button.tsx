import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  size = 'md',
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center border font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    // Primary uses Brand Pink
    primary: "border-transparent text-white bg-brand hover:bg-brand-dark focus:ring-brand shadow-sm",
    // Secondary uses Brand Purple tint
    secondary: "border-transparent text-brand-purple bg-brand-purple/10 hover:bg-brand-purple/20 focus:ring-brand-purple",
    // Outline matches brand on hover
    outline: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-brand hover:text-brand focus:ring-brand"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;