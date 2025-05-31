# Rugzula NFT Marketplace

**Rugzula NFT Marketplace** is a modern, fully functional NFT marketplace built on the Ethereum blockchain, enabling users to mint, buy, sell, and update NFTs.

---

## 📋 Project Overview

- ReactJS-based frontend
- Web3.js for Ethereum blockchain interaction
- Solidity smart contracts deployed on Ethereum
- IPFS for NFT metadata and file storage (via Pinata)
- MetaMask and other Web3-compatible wallet integration
- NFT minting, buying, price updating, and listing functionalities
- Global state management for application state
- Alert system for transaction notifications and error handling

---

## 🧰 Technologies and Libraries

| Technology                  | Purpose                                    |
|-----------------------------|--------------------------------------------|
| React.js                    | Frontend UI development                    |
| React Hooks                 | State and lifecycle management             |
| react-hooks-global-state    | Global state management                    |
| Web3.js                     | Ethereum blockchain interaction            |
| Solidity                    | Smart contract programming                 |
| Pinata (IPFS)               | NFT metadata and file storage              |
| MetaMask                    | User wallet connection                     |
| Tailwind CSS (or CSS3)      | UI styling and responsive design           |

---

## ⚙️ Setup & Installation

1. Clone the repository:

```bash
git clone https://github.com/gkseelbngl/rugzulaNFTMarketplace.git
cd rugzulaNFTMarketplace

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the root directory and add the following environment variables:

```bash
REACT_APP_PINATA_JWT=your_pinata_jwt_token
```

4. Start the development server:

```bash
npm start
```

---

## 🔧 Project Structure

rugzulaNFTMarketplace/
│
├── src/
│   ├── components/        # React components for UI elements
│   ├── blockchain/        # Blockchain interaction functions and services
│   ├── store.js           # Global state management and alert functions
│   ├── abis/              # Smart contract ABI files
│   ├── App.jsx            # Main application component
│   └── index.jsx          # Application entry point
│
├── contracts/             # Solidity smart contract files
│
├── public/                # Static files and index.html
│
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation

---

## 💻 Core Features and Smart Contract Interaction

- **connectWallet:** Connects the user's MetaMask wallet and stores the address in the global state.

- **isWalletConnected:** Automatically checks if the user's wallet is connected on page load.

- **getEthereumContract:** Initializes the smart contract object using the ABI and contract address.

- **mintNFT:** Mints a new NFT with user-provided title, description, metadata URI, and price.

- **buyNFT:** Allows users to purchase an NFT by specifying its ID and price.

- **updateNFT:** Updates the price of an existing NFT.

- **getAllNFTs:** Retrieves all NFTs and transaction data from the blockchain for display.

- **setAlert:** Updates the global alert state to display notifications or error messages to the user.

---

## 🛡️ Error and State Management

- Errors and user notifications are managed via the **setAlert** function using the global state.

- Loading states are handled with dedicated state management and messaging.

- Blockchain transaction errors are caught and displayed to the user as red alerts.

---

## 🚀 Usage Flow

- On page load, **isWalletConnected** checks if the user's wallet is connected and stores the address in the global state.

- Users can click the "Connect Wallet" button to connect their MetaMask wallet.

- To mint an NFT, users provide a title, description, metadata URI, and price, then call **mintNFT**.

- Users can view available NFTs, select one, and purchase it using **buyNFT**.

- NFT owners can update their NFT's price using **updateNFT**.

- All actions are synchronized with the global state, and appropriate notifications are displayed to the user.

---

## 📌 Notes

- The project has been tested on Ethereum testnets (e.g., Rinkeby).

- Compatible with MetaMask and other Web3 wallets.

- Smart contracts are written in Solidity version 0.8.x.

- NFT metadata is stored using Pinata's IPFS service.

- Built with React 18 and Web3.js 1.x.

---

## 📂 Smart Contracts (Solidity)

Key functions in the smart contract:

```bash
function payToMint(string memory title, string memory description, string memory metadataURI, uint256 cost) public payable;
function payToBuy(uint256 id) public payable;
function changePrice(uint256 id, uint256 cost) public;
function getAllNFTs() public view returns (NFT[] memory);
function getAllTransactions() public view returns (Transaction[] memory);
```

---

## 🤝 Contributing

- Fork the repository, make changes, and submit a pull request.

- Open an issue to report bugs or request features.

---

## 📄 License

MIT License © 2025 gkseelbngl

---

## 📞 Contact

For questions or support:  
- Email: gkseelbngl34@gmail.com 

- GitHub: https://github.com/gkseelbngl  

Rugzula NFT Marketplace — Your gateway to the blockchain-based NFT world!

