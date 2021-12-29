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
    console.log(
      "******************************************\n",
      "BODY: ",
      req.body,
      "\n",
      "******************************************\n",
    );
    console.log("******************************************\n", "deployerWallet: ", deployerWallet, "\n");
    let wallet = await walletService.createWallet(req, deployerWallet);
    if (!wallet) {
      return res.code(400).send({ message: "couldn't create a wallet", status: 400 });
    }
    // let receiverWallet = { address: "0x449D18a317fb3Dc08ac0aBE595D71758dC90Aa98" };
    // let amountToSend = "0.0001";
    // let tx = { hash: "0x0" };
    // let wallet = { address: "0x449D18a317fb3Dc08ac0aBE595D71758dC90Aa98", privateKey: "0x0" };
    // await contractInteraction.addPaymentToDatabase(receiverWallet, amountToSend, { hash: "0x0" });
    await contractInteraction.sendPayment(wallet, "0.001", deployerWallet);
    return reply.code(200).send({ id: req.body.user, address: wallet.address, privateKey: wallet.privateKey });
  };
}

module.exports = { handler, schema };
