const ethers = require("ethers");
const Wallet = require("../schemas/Wallet");
const contract = require("../services/contractInteraction");

const getDeployerWallet = ({ config }) => () => {
  const provider = new ethers.providers.InfuraProvider(config.network, config.infuraApiKey);
  const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
  return wallet;
};

const createWallet = (req, res) => async req => {
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
    isAdmin: req.body.isAdmin,
  });
  await Wallet.create(walletToSave);
  return wallet;
};

const getWalletsData = () => async () => {
  return await Wallet.find();
};

const getWalletData = () => async user => {
  let accounts = await Wallet.findOne({ user: user });
  return accounts;
};

const getWallet = ({}) => async user => {
  console.log(user);
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  let obtenerwallet = await Wallet.findOne({ user: user });
  console.log("Billetera", obtenerwallet);
  return new ethers.Wallet(obtenerwallet.privateKey, provider);
};

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletsData: getWalletsData({ config }),
  getWalletData: getWalletData({ config }),
  getWallet: getWallet({ config }),
});
