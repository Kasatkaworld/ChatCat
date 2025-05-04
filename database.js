const fs = require('fs');

const dbFile = "./chat.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const dbWrapper = require("sqlite");
const crypto = require("crypto")
let db;

dbWrapper
.open({
    filename: dbFile,
    driver: sqlite3.Database
})
.then(async dBase =>{
    db = dBase;
    try{
        if(!exists){
            await db.run(
                `
                CREATE TABLE user(
                    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    login TEXT,
                    password TEXT
                );`
            );
            await db.run(
                `
                INSERT INTO user(login, password) Values("?", "?")
                );`
            );
            await db.run(
                `
                CREATE TABLE message(
                    message_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    message TEXT,
                    autor INTEGER,
                    FOREIGN KEY (autor) REFERENCES user(user_id)
                );`
            );
        }
        else{
            console.log(await db.all("SELECT * from user"));
        }
    }
    catch(dbError){
        console.error(dbError);
    }
    module.exports = {
        getMessages: async () => {
            try{
                return await db.all(
                    `SELECT message_id, content, login, user_id from message
                    JOIN user ON message.autor = user.user_id`
                );
            }
            catch(dbError){
                console.log(dbError)
            }
            
        },
        addMessage: async (msg, userId) => {
            await db.run(
                `INSERT INTO message (content, author) VALUES(?, ?)`,
                [msg, userId]
            );
        },
        login_exists: async(login, password, password_confirm) => {
            try{
                if( db.run(`SELECT * from user WHERE login='${login}'`)== null & password == password_confirm){
                     db.run(
                        `
                        INSERT INTO user(login, password) Values("${login}", "${password}")
                        );`
                    );
                }else{
        
                }
            }
            catch(dbError){
                console.error(dbError);
            }
        },
        getAuthToken: async (user) => {
            const candidate = await db.all(`SELECT * FROM user WHERE login = ?`, [user.login]);
            if(!candidate.length){
                throw 'Wrong login';
            }
            if(candidate[0].password !== user.password){
                throw 'Wrong password';
            }
            token = user_id + '.' + login + '.' + crypto.randomBytes(20).toString('hex');
        }

    }

});
// dbWrapper
// .open({
//     filename: dbFile,
//     driver: sqlite3.Database
// })
// .then(async dBase =>{
//     db = dBase;
//     try{
//         if(await db.run(`SELECT * from user WHERE login='?'`)== null){
//             await db.run(
//                 `
//                 INSERT INTO user(login, password) Values("?", "?")
//                 );`
//             );
//         }else{

//         }
//     }
//     catch(dbError){
//         console.error(dbError);
//     }

// });
