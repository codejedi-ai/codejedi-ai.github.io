document.addEventListener('DOMContentLoaded', function() {
    // This script ensures the QR code is properly loaded
    // The QR code is generated using the QR Server API
    
    // Check if QR code exists and is loaded correctly
    const qrCodeImg = document.querySelector('.qr-code img');
    
    if (qrCodeImg) {
        qrCodeImg.onerror = function() {
            // If the QR code fails to load, replace with a fallback message
            const qrCodeContainer = document.querySelector('.qr-code');
            if (qrCodeContainer) {
                qrCodeContainer.innerHTML = `
                    <div style="width: 150px; height: 150px; display: flex; align-items: center; justify-content: center; background: #f5f5f5; border-radius: 10px;">
                        <p style="text-align: center; padding: 10px;">Visit: codejedi-ai.github.io</p>
                    </div>
                    <p>Visit my portfolio</p>
                `;
            }
        };
    }
    
    // Find the QR code element in projects page
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
