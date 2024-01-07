import './styles.css';
import QRCode from 'qrcode';


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



// Establish a connection to the signaling server
const signalingServer = new WebSocket('ws://turbo-space-broccoli-q5jp4jjxvvh55x-8080.app.github.dev/');

// Create a WebRTC peer connection
const peerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302' // Google's public STUN server
      }
    ]
  });
  

// Send any ICE candidates to the other peer
peerConnection.onicecandidate = ({ candidate }) => {
  if (candidate) {
    sendSignalingData({ 'ice': candidate });
  }
};

// Let the 'negotiationneeded' event trigger offer generation
peerConnection.onnegotiationneeded = async () => {
    try {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      // Only send the offer if the connection is still open
      if (peerConnection.signalingState !== "closed") {
        sendSignalingData({ 'offer': offer });
      }
    } catch (err) {
      console.error(err);
    }
  };
  

// Set up the data channel for file transfer
const dataChannel = peerConnection.createDataChannel("fileTransfer");

dataChannel.onopen = () => {
  console.log("Data channel is open and ready to be used.");
};

dataChannel.onmessage = (event) => {
  // Handle incoming data (files) here
};

// Handle messages from the signaling server
signalingServer.onmessage = async (event) => {
  const message = JSON.parse(event.data);

  if (message.offer) {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    sendSignalingData({ 'answer': answer });
  } else if (message.answer) {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(message.answer));
  } else if (message.ice) {
    try {
      await peerConnection.addIceCandidate(message.ice);
    } catch (err) {
      console.error('Error adding received ice candidate', err);
    }
  }
};

// Function to send signaling data to the signaling server
function sendSignalingData(data) {
    if (signalingServer.readyState === WebSocket.OPEN) {
      signalingServer.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not open. State:', signalingServer.readyState);
    }
  }
  
// Function to extract the uniqueId from the URL
function getSessionIdFromUrl() {
    const url = new URL(window.location.href);
    return url.pathname.split('/').pop();
}

// Connect users based on the session ID
document.addEventListener('DOMContentLoaded', (event) => {
    const sessionId = getSessionIdFromUrl();
    if (sessionId) {
        // Establish a connection using this sessionId
        // For example, you can store it and use it when initializing the WebRTC connection
    }
});


// Combined sendFile function
function sendFile(file) {
    updateTransferStatus("Sending file...");

    const reader = new FileReader();
    reader.onload = function(event) {
        dataChannel.send(event.target.result);
        updateTransferStatus("File sent.");
    };
    reader.readAsArrayBuffer(file);
}

// Assuming you already have a file input element in your HTML
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        sendFile(file);
    }
});

// Handling incoming file data on the data channel
dataChannel.onmessage = (event) => {
    // Assuming the data is an ArrayBuffer. Adjust as needed.
    const receivedArrayBuffer = event.data;
    // You need to handle the reconstruction of the file here.
};



// When the data channel is open, show the file input
dataChannel.onopen = () => {
    console.log("Data channel is open and ready to be used.");
    document.getElementById('fileTradeBox').classList.remove('hidden');
};

// Update the UI when a file is being transferred
function updateTransferStatus(message) {
    document.getElementById('transferStatus').textContent = message;
}


// Update the UI when a file transfer is complete
dataChannel.onmessage = (event) => {
    updateTransferStatus("File received.");
    // Rest of the onmessage logic...
};
