import React from 'react';
import { FC } from "react"
import { ContentLoader } from 'react-content-loader';

const Sceleton : FC = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={460}
        viewBox="0 0 280 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="111" cy="112" r="74" />
        <rect x="46" y="195" rx="0" ry="0" width="126" height="15" />
        <rect x="24" y="219" rx="0" ry="0" width="170" height="43" />
        <rect x="26" y="275" rx="0" ry="0" width="52" height="23" />
        <rect x="141" y="275" rx="0" ry="0" width="52" height="23" />
    </ContentLoader>
)

export default Sceleton