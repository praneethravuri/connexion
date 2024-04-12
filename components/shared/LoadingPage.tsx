import React from 'react';
import { DNA } from "react-loader-spinner"

const LoadingPage = () => {
    return (
        <div className="flex justify-center items-center h-screen w-full">
            <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperClass="dna-wrapper"
            />
        </div>
    );
}

export default LoadingPage;
