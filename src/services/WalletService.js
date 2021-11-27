const ethers = require("ethers");
const Wallet = require("../schemas/Wallet");



// class WalletService {

//   constructor({config}) {
//     this.Wallet = Wallet;
//     this.config = config
//   }
const getDeployerWallet = ({ config }) => () => {
    const provider = new ethers.providers.InfuraProvider(this.config.network, this.config.infuraApiKey);
    const wallet = ethers.Wallet.fromMnemonic(this.config.deployerMnemonic).connect(provider);
    console.log("Deployer wallet" + wallet.address);
    return wallet;
};

const createWallet = (req, res) => async () => {
    const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
    // This may break in some environments, keep an eye on it
    const wallet = ethers.Wallet.createRandom().connect(provider);
    //create and save wallet


    let walletToSave = new Wallet({
      user: req.body.user,
      password: wallet.privateKey,
      authType: "kovan",
      displayName: req.body.name,
      isAdmin: True
    });
    this.Wallet.save(walletToSave)  
    return {
      id: accounts.length,
      address: wallet.address,
      privateKey: wallet.privateKey,
    };
  }
  
  const getWalletsData = () => () => {
      return this.Wallet.find();
  }

  const getWalletData = () => index => {
    let accounts = this.Wallet.findOne(address);
    return accounts;
  }

  const getWallet = ({}) => privateKey => {
    const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
    return new ethers.Wallet(this.Wallet.findOne(privateKey), provider);
  }


// }
// module.exports.WalletService = WalletService



module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletsData: getWalletsData({ config }),
  getWalletData: getWalletData({ config }),
  getWallet: getWallet({ config }),
});