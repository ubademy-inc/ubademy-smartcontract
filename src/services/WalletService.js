const ethers = require("ethers");
const Wallet = require("../schemas/Wallet");



// class WalletService {

//   constructor({config}) {
//     this.Wallet = Wallet;
//     this.config = config
//   }
const getDeployerWallet = ({ config }) => () => {
    const provider = new ethers.providers.InfuraProvider(config.network, config.infuraApiKey);
    const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
    console.log("Deployer wallet" + wallet.address);
    return wallet;
};

const createWallet = (req, res) => async (req) => {
  // let data = await this.db.getWallet(req.body.user)
  // if (data){
  //   return {id: data.user,
  //   address: data.address,
  //   privateKey: data.privateKey
  //   }
  // }

    const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
    // This may break in some environments, keep an eye on it
    const wallet = ethers.Wallet.createRandom().connect(provider);
    //create and save wallet
    let walletToSave = new Wallet({
      user: req.body.user,
      address: wallet.address,
      privateKey: wallet.privateKey,
      authType: "kovan",
      displayName: req.body.displayName,
      isAdmin: req.body.isAdmin
    });
    await Wallet.create(walletToSave)  
    return {
      id: req.body.user,
      address: wallet.address,
      privateKey: wallet.privateKey,
    };
  }
  
  const getWalletsData = () =>async () => {
      return await Wallet.find();
  }

  const getWalletData = () =>async (user) => {
    console.log("ESTA EN WALLUET",user,"\n");
    let accounts = await Wallet.findOne({user: user});
    return accounts;
  }

  const getWallet = ({}) =>async (user) => {
    const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
    let obtenerwallet = await Wallet.findOne({user: user});
    return  new ethers.Wallet(obtenerwallet.privateKey, provider);
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