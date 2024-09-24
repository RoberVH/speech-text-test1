import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="spinner border-8  border-t-gray-400 rounded-full w-48 h-48 animate-spin"></div>
  </div>
  );
};

export default Loading;