import React from 'react';
import QRCode from 'react-qr-code';

interface QRCodeDisplayProps {
    fileId: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({fileId}) => {
    return (
        <div>
            <div className="qrCodeBox">
                <h2>QR code</h2>
                <br/>
                <QRCode value={fileId}/>
            </div>
        </div>
    );
};