// Initialize Thirdweb with the Polygon Amoy testnet
const sdk = new thirdweb.ThirdwebSDK('polygon-amoy');
const contractABI = require('./src/contractABI.json');

// Replace with your contract address
const contractAddress = '0x5B45172c3d4D47006596871575606499C3cC7661';
const contract = sdk.getContract(contractAddress,contractABI);

// Connect Wallet
const connectWalletBtn = document.getElementById('connectWallet');
connectWalletBtn.addEventListener('click', async () => {
    await sdk.wallet.connect();
    alert('Wallet Connected');
});

// Handle List Property form submission
const listPropertyForm = document.getElementById('listPropertyForm');
listPropertyForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Get form values
    const owner = document.getElementById('owner').value;
    const price = parseInt(document.getElementById('price').value);
    const propertyTitle = document.getElementById('propertyTitle').value;
    const category = document.getElementById('category').value;
    const images = document.getElementById('images').value;
    const propertyAddress = document.getElementById('propertyAddress').value;
    const description = document.getElementById('description').value;

    // Call the listProperty function
    try {
        await contract.call('listProperty', [owner, price, propertyTitle, category, images, propertyAddress, description]);
        alert('Property listed successfully');
    } catch (error) {
        console.error('Error listing property:', error);
    }
});

// Add more event listeners and functions as needed for other contract functions and actions

// Function to fetch and display properties
async function fetchProperties() {
    try {
        const properties = await contract.call('getAllProperties');
        // Display properties on the frontend
        // Update the properties element
    } catch (error) {
        console.error('Error fetching properties:', error);
    }
}

// Call fetchProperties on page load
fetchProperties();
