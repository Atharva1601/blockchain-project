

/** @type import('hardhat/config').HardhatUserConfig */
const PRIVATE_KEY="25bbb1e6501c2e22f944fa50e967f47e9ae58707c2cec68e8d165d1ba85c9f28";

module.exports = {
  defaultNetwork: "Amoy",
  networks: {
    hardhat: {
    },
    Amoy: {
      url: "https://polygon-amoy.g.alchemy.com/v2/AtkVPdYirbpd_zepSumAuv060PUt_0R6",
      accounts: ["25bbb1e6501c2e22f944fa50e967f47e9ae58707c2cec68e8d165d1ba85c9f28","9c7b0256195ff4e64b451d2038b422d9a3dc76e9f01691f942a338a79d24c718"]
    }
  },
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  
}
