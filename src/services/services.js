const walletService = require("./WalletService");
const contractInteraction = require("./contractInteraction");

module.exports = ({ config }) => ({
  walletService: walletService({ config }),
  contractInteraction: contractInteraction({ config }),
});