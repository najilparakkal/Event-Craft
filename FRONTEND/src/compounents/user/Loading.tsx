import React from 'react';

const Loading: React.FC = () => {
  // Define keyframes for the pulsate animation
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes pulsate {
        0% {
          transform: scale(.1);
          opacity: 0.0;
        }
        50% {
          opacity: 1;
        }
        100% {
          transform: scale(1.2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Define styles using React.CSSProperties
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    position: 'relative',
    margin: 0,
  };

  const loaderStyle: React.CSSProperties = {
    border: '5px solid #fff',
    borderRadius: '30px',
    height: '30px',
    width: '30px',
    opacity: 0,
    animation: 'pulsate 1s ease-out infinite',
  };

  return (
    <div style={containerStyle} className='bg-black'>
      <div style={loaderStyle} />
    </div>
  );
};

export default Loading;
