document.addEventListener('DOMContentLoaded', function() {
    // Find the QR code element
    const qrCodeElement = document.getElementById('qr-code');
    
    if (qrCodeElement) {
        // Get the current QR code image
        const qrImage = qrCodeElement.querySelector('img');
        
        if (qrImage) {
            const imgSrc = qrImage.src;
            
            // Create business card structure
            const businessCard = document.createElement('div');
            businessCard.className = 'business-card';
            
            // Create info section
            const infoSection = document.createElement('div');
            infoSection.className = 'business-card-info';
            infoSection.innerHTML = `
                <div class="business-card-name">Your Name</div>
                <div class="business-card-title">Software Developer</div>
                <div class="business-card-contact">email@example.com</div>
                <div class="business-card-contact">+1 (123) 456-7890</div>
                <div class="business-card-contact">github.com/yourusername</div>
            `;
            
            // Create QR section
            const qrSection = document.createElement('div');
            qrSection.className = 'business-card-qr';
            qrSection.innerHTML = `<img src="${imgSrc}" alt="QR Code">`;
            
            // Assemble business card
            businessCard.appendChild(infoSection);
            businessCard.appendChild(qrSection);
            
            // Replace the original QR code with the business card
            qrCodeElement.innerHTML = '';
            qrCodeElement.appendChild(businessCard);
        }
    }
});
