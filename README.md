# Drobilica ShipIt

## Overview
Drobilica ShipIt is a pioneering web-based application enabling direct file sharing between devices. Operating entirely client-side, it emulates functionalities similar to Apple's AirDrop, offering a streamlined, serverless file transfer process. This application is particularly designed for simplicity, security, and speed.

## Key Features
- **Serverless Architecture**: All functionalities are client-side, eliminating reliance on backend servers.
- **Peer-to-Peer File Sharing**: Leverages WebRTC for direct, real-time file transfers between users.
- **Temporary Sharing Codes**: Generates unique, time-limited sharing codes for secure file transfer sessions.
- **Intuitive User Interface**: Focuses on a user-friendly experience for effortless file sharing.

## How to Use
Go to https://drobilica.com/shipit 

## Development Steps
1. **Front-End Development**:
   - Implement the user interface using React or Vue.js.
   - Develop code generation logic for file-sharing sessions.
   - Ensure responsive design for cross-device compatibility.

2. **WebRTC and File Transfer**:
   - Set up WebRTC for peer-to-peer communication.
   - Handle file transfer logic including file chunking and progress tracking.

3. **Signaling Server**:
   - Create a lightweight Node.js server for WebRTC signaling using WebSockets.
   - Implement secure and scalable connection handling.

4. **Security Measures**:
   - Integrate end-to-end encryption for file transfers.
   - Ensure code generation is secure and codes are not predictable.

5. **Testing and Quality Assurance**:
   - Conduct thorough testing for functionality, performance, and security.
   - Optimize based on test results and user feedback.

6. **Deployment**:
   - Host the static front-end files.
   - Deploy the signaling server with scalability considerations.

## Use Cases
- **Professional Environments**: Ideal for workplaces needing quick, secure file sharing without external devices or services.
- **Educational Institutions**: Facilitates easy sharing of academic materials between students and educators.
- **Personal Use**: Simplifies file transfers between friends and family, enhancing user convenience.


