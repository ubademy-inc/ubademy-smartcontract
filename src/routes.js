const getWalletData = require("./handlers/getWalletHandler");
const sendMoney = require("./handlers/createPaymentHandler");
const getWalletsData = require("./handlers/getWalletsHandler");
const createWallet = require("./handlers/createWalletHandler");
const createDeposit = require("./handlers/createDepositHandler");
const getDeposit = require("./handlers/getDepositHandler");
const getTransactions = require("./handlers/getTransactionsHandler");

function getWalletDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/wallet/:id",
    schema: getWalletData.schema(config),
    handler: getWalletData.handler({ config, ...services }),
  };
}

function getWalletsDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/wallet",
    schema: getWalletsData.schema(config),
    handler: getWalletsData.handler({ config, ...services }),
  };
}

// function getWalletsFromUsersRoute({ services, config }) {
//   return {
//     method: "GET",
//     url: "/https://ubademy-grupo-13-usuarios.herokuapp.com/api/users/detail",
//     schema: getWalletsData.schema(config),
//     handler: getWalletsData.handler({ config, ...services }),
//   };
// }


function createWalletRoute({ services, config }) {
  return {
    method: "POST",
    url: "/wallet",
    schema: createWallet.schema(config),
    handler: createWallet.handler({ config, ...services }),
  };
}

function createDepositRoute({ services, config }) {
  return {
    method: "POST",
    url: "/deposit",
    schema: createDeposit.schema(config),
    handler: createDeposit.handler({ config, ...services }),
  };
}

function getDepositRoute({ services, config }) {
  return {
    method: "GET",
    url: "/deposit/:txHash",
    schema: getDeposit.schema(config),
    handler: getDeposit.handler({ config, ...services }),
  };
}
function getTransactionRoute({ services, config }) {
  return {
    method: "GET",
    url: "/transactions/:wallet",
    schema: getTransactions.schema(config),
    handler: getTransactions.handler({ config, ...services }),
  };
}

function sendMoneyRoute({ services, config }) {
  return {
    method: "POST",
    url: "/send",
    schema: sendMoney.schema(config),
    handler: sendMoney.handler({ config, ...services }),
  };
}

module.exports = [getWalletDataRoute, getWalletsDataRoute, createWalletRoute, createDepositRoute, getDepositRoute, sendMoneyRoute,getTransactionRoute];
