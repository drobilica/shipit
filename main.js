document.getElementById('fileInput').addEventListener('change', function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
        localStorage.setItem('uploadedFile', reader.result);
    }

    if (file) {
        reader.readAsDataURL(file);
    }
});

function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

document.getElementById('receiveButton').addEventListener('click', function() {
    var qrCodeContainer = document.getElementById('qrCodeContainer');
    var uniqueId = generateUniqueId();
    var uniqueUrl = "https://drobilica.com/trade/" + uniqueId; // Replace "https://yourwebsite.com/trade/" with your actual URL

    qrCodeContainer.innerHTML = ''; // Clear the QR code container

    if (typeof QRCode !== 'undefined') {
        new QRCode(qrCodeContainer, {
            text: uniqueUrl,
            width: 256,
            height: 256
        });

        console.log('Generated URL:', uniqueUrl);
        console.log('Generated Code:', uniqueId);
    } else {
        console.error('QRCode object is not available. Please ensure the QRCode.js library is properly imported.');
    }
});