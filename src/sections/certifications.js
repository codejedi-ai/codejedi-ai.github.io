let certifications = [];

// Fetch certifications data from JSON file
async function fetchCertificationsData() {
    try {
        const response = await fetch('/data/certifications.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        certifications = data.items;
        
        // After data is loaded, generate the certifications
        generateCertifications();
    } catch (error) {
        console.error('Error loading certifications data:', error);
    }
}

function generateCertifications() {
    const container = document.getElementById('certifications-container');
    if (!container) {
        console.error('Certifications container not found');
        return;
    }
    
    // Clear existing content
    container.innerHTML = '';
    
    // Generate certification items
    certifications.forEach(cert => {
        const certItem = document.createElement('div');
        certItem.className = 'certification-item col-md-4 col-sm-6';
        
        certItem.innerHTML = `
            <div class="certification-card">
                <div class="certification-image">
                    <a href="${cert.url}" target="_blank">
                        <img src="${cert.image}" alt="${cert.title}">
                    </a>
                </div>
                <div class="certification-info">
                    <h3>${cert.title}</h3>
                    <p class="issuer">${cert.issuer}</p>
                    <p class="date">Issued: ${cert.date}</p>
                    <p class="credential-id">Credential ID: ${cert.credentialId}</p>
                    <a href="${cert.url}" target="_blank" class="verify-btn">Verify</a>
                </div>
            </div>
        `;
        
        container.appendChild(certItem);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchCertificationsData();
});
