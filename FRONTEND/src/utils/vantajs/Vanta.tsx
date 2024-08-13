import { useEffect, useRef } from "react";
import WAVES from 'vanta/dist/vanta.waves.min';
import * as THREE from 'three';

function Vanta({ children }: any) {
    const vantaRef = useRef<HTMLDivElement | null>(null);
    const vantaEffect = useRef<any>(null);

    useEffect(() => {
        if (!vantaEffect.current && vantaRef.current) {
            vantaEffect.current = WAVES({
                el: vantaRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.0,
                minWidth: 200.0,
                scale: 1.0,
                scaleMobile: 1.0,
                color: 0x0,
                shininess: 47.0,
                waveHeight: 24.0,
                waveSpeed: 0.7,
                zoom: 0.65,
                THREE: THREE,  // Ensure THREE.js is passed correctly
            });
        }

        // Cleanup on component unmount
        return () => {
            if (vantaEffect.current) vantaEffect.current.destroy();
        };
    }, []);

    return (
        <div ref={vantaRef} className="relative z-50 w-full h-screen overflow-hidden">
            {children}
        </div>
    );
}

export default Vanta;
