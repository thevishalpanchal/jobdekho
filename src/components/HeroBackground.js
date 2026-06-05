import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import GLOBE from "vanta/dist/vanta.globe.min";

function HeroBackground({ children }) {

    const vantaRef = useRef(null);

    useEffect(() => {

        let effect = null;

        if (vantaRef.current) {

            effect = GLOBE({
                el: vantaRef.current,
                THREE: THREE,

                mouseControls: true,
                touchControls: true,
                gyroControls: false,

                minHeight: 200,
                minWidth: 200,

                backgroundColor: 0x0f172a,

                color: 0x8b5cf6,
                color2: 0x6366f1,

                size: 1.2
            });

        }

        return () => {
            if (effect) effect.destroy();
        };

    }, []);

    return (
        <div
        className="vanta-container"
            ref={vantaRef}
            style={{
                minHeight: "100vh",
                width: "100vw",
                position: "relative",
                overflow: "hidden"
            }}
        >
            {children}
        </div>
    );
}

export default HeroBackground;