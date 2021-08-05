import React, { useEffect, useContext } from 'react';
import QRCode from 'qrcode.react';
import { isEqual } from '@7urtle/lambda';

import { StoreContext } from '../store/StoreContext';

const AuthenticationQRCode = () => {
    // We do need state to get ngrokURL
    const { state, actions } = useContext(StoreContext);
    const isDevelopment = isEqual('development')(process.env.NODE_ENV);

    useEffect(() => isDevelopment && actions.requestNgrokURL(), []);

    return (
        <>
            {isDevelopment && <>{state.ngrokURL ? <QRCode value={`didcomm://${state.ngrokURL}/did/authentication`} size={300} /> : <p>Loading QR Code</p>}</>}
            {!isDevelopment && <QRCode value={`didcomm://${window.location}/.netlify/functions/did/authentication`} size={300} />}
        </>
    );
};

export default AuthenticationQRCode;
