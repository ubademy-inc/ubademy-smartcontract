function schema() {
  return {
    params: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
      },
    },
    required: ["id"],
  };
}

function handler({ walletService, contractInteraction }) {
  return async function (req, reply) {
    let deployerWallet = await walletService.getDeployerWallet();
    let wallet = await walletService.createWallet(req, deployerWallet);
    if (!wallet) {
      return res.code(400).send({ message: "couldn't create a wallet", status: 400 });
    }
    await contractInteraction.sendPayment(wallet, "0.001", deployerWallet);
    return reply.code(200).send({ id: req.body.user, address: wallet.address, privateKey: wallet.privateKey });
  };
}

module.exports = { handler, schema };
