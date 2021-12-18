const ethers = require("ethers");
const getDepositHandler = require("../handlers/getDepositHandler");
const Deposits = require("../schemas/Deposits");
const Payments = require("../schemas/Payments");

const getContract = (config, wallet) => {
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};


const deposit = ({ config }) => async (senderWallet, amountToSend) => {
  const basicPayments = await getContract(config, senderWallet);
  const tx = await basicPayments.deposit({
    value: await ethers.utils.parseEther(amountToSend).toHexString(),
  });
  tx.wait(1).then(
    receipt => {
      console.log("Transaction mined");
      const firstEvent = receipt && receipt.events && receipt.events[0];
      console.log(firstEvent);
      if (firstEvent && firstEvent.event == "DepositMade") {
        let data = new Deposits({
          sender:tx.from,
          amount: firstEvent.args.amount,
          tx: tx.hash,
          status: "completed"
        });
        Deposits.create(data);
        return {
          tx_hash: tx.hash,
          status: "completed"
        };
      } else {
        console.error(`Payment not created in tx ${tx.hash}`);
      }
    },
    error => {
      const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
      const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
      console.error("reasons List");
      console.error(reasonsList);
      console.error("message");
      console.error(message);
    },
  );
  return tx;
};
const sendPayment = ({ config }) => async (receiverWallet, amountToSend, deployerWallet) => {
    const basicPayments = await getContract(config, deployerWallet);
    let amount = await ethers.utils.parseEther(amountToSend).toHexString();
    const tx = await basicPayments.sendPayment(receiverWallet.address,amount, {gasLimit: 300000});
      tx.wait(1).then(
      receipt => {  
        console.log("Transaction mined", receiverWallet.address, "\n");
        const firstEvent = receipt && receipt.events && receipt.events[0];
        console.log(firstEvent);
        if (firstEvent && firstEvent.event == "PaymentMade") {
          return addPaymentToDatabase(receiverWallet, firstEvent.args.amount, tx);
        } else {
          console.error(`Payment not created in tx ${tx.hash}`);
        }
      },
    );
  return tx;
};

const addPaymentToDatabase = () => async (receiverWallet, amountToSend, tx) => {
  if (Payments.findOne({receiver: receiverWallet.address}) !== null){
    await Payments.updateOne(receiverWallet.address, 
                      {amount: amountToSend,
                      tx: tx.hash,
                      status: "completed"});
    return{
      tx_hash: tx.hash,
      status: "completed"
    };  
  }    
  let data = new Payments({
    receiver: tx.to,
    transactions: { amount: amountToSend,
    tx: tx.hash,
    status: "completed"
  }
}); 
  await Payments.create(data); 
  return {
    tx_hash: tx.hash,
    status: "completed"
  };
};

const getDepositReceipt = ({}) => async depositTxHash => {
  return await Deposits.findOne({transactions: depositTxHash });
};

const getTransactionsMadeByWallet= ({})=> async wallet => {
  let depositsMade = await Deposits.findOne({sender: wallet});
  let paymentsMade = await Payments.findOne({reciever: wallet});
  return {depositsMade, paymentsMade};
}
const getDepositsMadeByWallet= ({})=> async wallet => {
  return await Deposits.findOne({sender: wallet});
}
module.exports = dependencies => ({
  deposit: deposit(dependencies),
  getDepositReceipt: getDepositReceipt(dependencies),
  getDepositsMadeByWallet: getDepositsMadeByWallet(dependencies),
  getTransactionsMadeByWallet: getTransactionsMadeByWallet(dependencies),
  sendPayment: sendPayment(dependencies),
  addPaymentToDatabase : addPaymentToDatabase(dependencies)

});
