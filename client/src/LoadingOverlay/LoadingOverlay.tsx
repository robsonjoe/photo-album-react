import React from 'react';
import { SpinnerCircular } from 'spinners-react';
import { LoadingProps } from '../tools/photos.model';


const LoadingOverlay = ({ bgColor, spinnerColor, enabled }:LoadingProps) => {

    return (
        <div className={`bg-[${bgColor}] w-full h-screen absolute top-0 left-0 justify-center items-center`} style={{display: (enabled ? 'flex' : 'none')}}>
            <SpinnerCircular enabled={enabled} color = "{spinnerColor}"/>      
        </div>
    );
}

export default LoadingOverlay;