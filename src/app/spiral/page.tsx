'use client';

import Image from 'next/image';

export default function SpiralPage() {
  return (
    <main className="flex flex-col items-center justify-center bg-white" style={{ height: 'calc(100vh - 5rem)' }}>
      <div className="relative w-[70vw] max-w-[min(626px,80svh)]" style={{ maxWidth: 'min(626px, 80svh)' }}>
      <div className="w-full h-full" style={{ opacity: 1, transform: 'none' }}>
        <div className="aspect-square w-full relative icon-spiral-animated">
          <div className="icon-spiral-container-dark">
            <div className="icon-spiral-bg-dark icon-spiral-bg-dark-animated"></div>
          </div>
          <div className="icon-spiral-container-med">
            <div className="icon-spiral-bg-med icon-spiral-bg-med-animated"></div>
          </div>
          <div className="icon-spiral-container-light">
            <div className="icon-spiral-bg-light icon-spiral-bg-light-animated"></div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .icon-spiral-animated {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .icon-spiral-container-dark,
        .icon-spiral-container-med,
        .icon-spiral-container-light {
          position: absolute;
          inset: 0;
          mask-size: 100%;
          mask-repeat: no-repeat;
          mask-position: center;
          -webkit-mask-size: 100%;
          -webkit-mask-repeat: no-repeat;
          -webkit-mask-position: center;
        }
        
        .icon-spiral-container-dark {
          mask-image: url('/icon-hero-dark.svg');
          -webkit-mask-image: url('/icon-hero-dark.svg');
        }
        
        .icon-spiral-container-med {
          mask-image: url('/icon-hero-med.svg');
          -webkit-mask-image: url('/icon-hero-med.svg');
        }
        
        .icon-spiral-container-light {
          mask-image: url('/icon-hero-light.svg');
          -webkit-mask-image: url('/icon-hero-light.svg');
        }
        
        .icon-spiral-bg-dark,
        .icon-spiral-bg-med,
        .icon-spiral-bg-light {
          position: absolute;
          width: 100%;
          height: 100%;
          background-size: 144px;
          background-repeat: repeat;
          background-position: center;
        }
        
        .icon-spiral-bg-dark {
          background-image: url('/bg-hero-tile-dark-crop.png');
        }
        
        .icon-spiral-bg-med {
          background-image: url('/bg-hero-tile-med-crop.png');
        }
        
        .icon-spiral-bg-light {
          background-image: url('/bg-hero-tile-light-crop.png');
        }
        
        /* Animation for the spiral effect */
        @keyframes spiralRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .icon-spiral-bg-dark-animated {
          animation: spiralRotate 35s linear infinite;
        }
        
        .icon-spiral-bg-med-animated {
          animation: spiralRotate 25s linear infinite reverse;
        }
        
        .icon-spiral-bg-light-animated {
          animation: spiralRotate 20s linear infinite;
        }
        
        /* Optional: Add some opacity variations for depth */
        .icon-spiral-container-dark {
          opacity: 1;
        }
        
        .icon-spiral-container-med {
          opacity: 0.9;
        }
        
        .icon-spiral-container-light {
          opacity: 0.8;
        }
      `}</style>
    </div>
    </main>
  );
} 