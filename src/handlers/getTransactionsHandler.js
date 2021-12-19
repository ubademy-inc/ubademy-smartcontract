function schema() {
  return {
    params: {
      type: "object",
      properties: {
        txHash: {
          type: "string",
        },
      },
    },
    required: ["wallet"],
  };
}

function handler({ contractInteraction }) {
  return async function (req, reply) {
    const body = await contractInteraction.getTransactionsMadeByWallet(req.params.wallet);
    reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
