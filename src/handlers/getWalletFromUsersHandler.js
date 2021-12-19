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

function handler({ walletService }) {
  return async function (req, reply) {
    //   const user = axios.get(url , headers = req.headers);
    const body = await walletService.getWalletData(req.params.id);
    reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
