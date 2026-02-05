
import React from 'react';

const Loader: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  return (
    <div className={`fixed inset-0 bg-background z-[9998] flex items-center justify-center transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center w-24 h-24 mb-4">
          <div className="absolute w-full h-full rounded-full border-4 border-primary/20"></div>
          <div
            className="absolute w-full h-full rounded-full border-4 border-primary border-t-transparent animate-spin"
            style={{ animationDuration: '1s' }}
          ></div>
          <div className="text-primary font-bold text-lg">
            <img src="/school-logo.png" alt="School Logo" className="w-16 h-16" />
          </div>
        </div>
        <p className="text-lg text-primary font-semibold animate-pulse">Loading...</p>
        <p className="text-sm text-muted-foreground">Made with ❤️ by <b>Amanat Ali</b></p>
      </div>
    </div>
  );
};

export default Loader;
