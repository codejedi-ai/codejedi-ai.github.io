document.addEventListener('DOMContentLoaded', function() {
    // Find the QR code element
    const qrCodeElement = document.getElementById('qr-code');
    
    if (qrCodeElement && !qrCodeElement.closest('.footer_wrapper')) {
        // Only create business card if not in footer
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
                <div class="business-card-logo">CJ</div>
                <div class="business-card-name">CodeJedi</div>
                <div class="business-card-title">Software Developer & AI Specialist</div>
                <div class="business-card-contact"><i class="fa fa-envelope"></i> contact@codejedi.ai</div>
                <div class="business-card-contact"><i class="fa fa-map-marker"></i> Waterloo, ON, Canada</div>
                <div class="business-card-contact"><i class="fa fa-github"></i> github.com/codejedi-ai</div>
                <div class="business-card-contact"><i class="fa fa-linkedin"></i> linkedin.com/in/codejediatuw</div>
            `;
            
            // Create QR section
            const qrSection = document.createElement('div');
            qrSection.className = 'business-card-qr';
            qrSection.innerHTML = `
                <img src="${imgSrc}" alt="QR Code">
                <div class="business-card-qr-text">Scan to visit my portfolio</div>
            `;
            
            // Assemble business card
            businessCard.appendChild(infoSection);
            businessCard.appendChild(qrSection);
            
            // Replace the original QR code with the business card
            qrCodeElement.innerHTML = '';
            qrCodeElement.appendChild(businessCard);
        }
    }
});
