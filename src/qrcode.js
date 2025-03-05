/**
 * QR Code Generator
 * 
 * This script dynamically generates a QR code for a given text or URL.
 */

import QRCode from 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';

export function generateQRCode(text, elementId) {
    const qrContainer = document.getElementById(elementId);
    if (!qrContainer) {
        console.error(`Element with ID '${elementId}' not found.`);
        return;
    }

    // Clear any existing QR code
    qrContainer.innerHTML = '';

    new QRCode(qrContainer, {
        text: text,
        width: 128,
        height: 128
    });
}
