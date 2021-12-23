function schema() {
  return {
    params: {
      type: "object",
      properties: {
        sender: {
          type: "string",
        },
        prevSusc: {
          type: "integer",
        },
        newSusc: {
          type: "integer",
        },
      },
    },
    required: ["sender", "amountInEthers"],
  };
}
var subscriptions = { 0: 0, 1: 0.00011, 2: 0.00012, 3: 0.00013 };

function handler({ contractInteraction, walletService }) {
  return async function (req, reply) {
    let wallet = await walletService.getWallet(req.body.sender);
    let amount = subscriptions[req.body.newSusc] - subscriptions[req.body.prevSusc];
    let susc = await contractInteraction.deposit(wallet, amount.toFixed(5));
    console.log(susc);
    return reply.code(200).send({ message: "Suscripción realizada", status: 200 });
  };
}

module.exports = { schema, handler };
