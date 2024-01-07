import './styles.css';
import QRCode from 'qrcode';

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
    return Math.random().toString(36).substring(2, 11);
}

document.getElementById('receiveButton').addEventListener('click', function() {
    var qrCodeContainer = document.getElementById('qrCodeContainer');
    var uniqueId = generateUniqueId();
    var uniqueUrl = "https://drobilica.com/trade/" + uniqueId; 

    qrCodeContainer.innerHTML = ''; // Clear the QR code container

    QRCode.toDataURL(uniqueUrl, { width: 256, version: 3 }, function (err, url) {
        if (err) {
            console.error('Error generating QR code:', err);
            return;
        }

        var img = document.createElement('img');
        img.src = url;
        qrCodeContainer.appendChild(img);

        console.log('Generated URL:', uniqueUrl);
        console.log('Generated Code:', uniqueId);
    });
});
