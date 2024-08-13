import React from 'react';

const TestUI = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">TailwindCSS & DaisyUI 테스트</h1>

      <button className="btn btn-primary mb-4">Primary Button</button>
      <button className="btn btn-secondary mb-4">Secondary Button</button>
      <button className="btn btn-accent mb-4">Accent Button</button>

      <div className="card w-96 bg-base-100 shadow-xl mb-4">
        <div className="card-body">
          <h2 className="card-title">Card Title</h2>
          <p>This is a card component. TailwindCSS and DaisyUI are working!</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Action</button>
          </div>
        </div>
      </div>

      <input type="text" placeholder="Input Field" className="input input-bordered w-full max-w-xs mb-4" />

      <div className="alert alert-info w-full max-w-xs">
        <span>Information alert using DaisyUI!</span>
      </div>
    </div>
  );
};

export default TestUI;
