function schema() {
  return {
      params: {
          type: "object",
          properties: {
              receiverId: {
                  type: "integer",
              },
              amountInEthers: {
                  type: "string",
              },
          },
      },
      required: ["sender", "amountInEthers"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req) {
    let wallet = await walletService.getWallet(req.body.sender);
    return contractInteraction.deposit(wallet, req.body.amountInEthers);
  };
}

module.exports = { schema, handler };
