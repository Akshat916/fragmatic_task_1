const socket = new WebSocket('ws://localhost:3000'); // Update the WebSocket URL to match the server's address and port.

async function getUserIP() {
    try {
        const response = await fetch('/getip');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error getting IP:', error);
        return null;
    }
}

async function sendIPDetails() {
//   const ipAddress = await getUserIP();
  getUserIP().then(ip => {
    const ipAddress = ip;
  if (ipAddress) {
    const ipDetails = [ipAddress]; // Send data as an array

    console.log(ipDetails);
    console.log('Inside WebSocket connection.');
    socket.send(JSON.stringify(ipDetails));
    console.log('Data sent:', ipDetails);
  } else {
    console.log('IP address not available.');
  }
});
}

socket.addEventListener('open', (event) => {
  console.log('WebSocket connection is open.');
  sendIPDetails();
});

socket.addEventListener('error', (event) => {
  console.error('WebSocket Error:', event);
});
