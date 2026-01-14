import React from 'react';
import Envelope from './Envelope';

const CoverLetter = ({ message }) => {
    return (
        <div className="w-full min-h-screen flex items-center justify-center p-4">
            <Envelope message={message} />
        </div>
    );
};

export default CoverLetter;
