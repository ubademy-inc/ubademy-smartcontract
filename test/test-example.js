const app = require('../src/server');
const mongoose = require("mongoose");
const TestDBManager = require('../src/database/testdb');
const dbTest = new TestDBManager();
const {Wallet} = require("../src/schemas/Wallet")

// before((done) => {
//      dbTest.connect().then(() => {done();
//     }); 
// });


// describe('Test Database', function() {
//     //Save object 
//     it('New wallet saved to test database', function(done) {
//       let walletToSave = wallet.create({
//         user: "Pepito",
//         password: "1236",
//         authType: "Ejemplo",
//         displayName:"pepi"
//       });
 
//       dbTest.save(walletToSave);
//     });

// });

// after((done) => {
//     dbTest.closeDataBase().then(() => {done();
//     }); 
// });

// describe('App Request', () => {

//     it('registers user', async () => {
    
//         expect(200).toBe(200);
            
//       })


// });


