function schema() {
    return {
      params: {
        type: "object",
        properties: {
          receiver: {
            type: "string",
          },
          amountInEthers: {
            type: "string",
          },
        },
      },
      required: ["receiver","amountInEthers"],
    };
  }
  
  function handler({ contractInteraction, walletService }) {
    return async function (req) {
      let wallet = await walletService.getWallet(req.body.receiver);
      if (!wallet) {
          return res.code(400).send({message: 'user does not have a wallet', status: 400});
      }
      let deployerWallet = await walletService.getDeployerWallet();
      return contractInteraction.sendPayment(wallet, req.body.amountInEthers,deployerWallet);
    };
  }
  
  module.exports = { schema, handler };