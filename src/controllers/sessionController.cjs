const { createUser } = require("../models/User.cjs");
const Account = require("../models/Account.cjs");

async function auth(req, res, next) {
    if (!req.body) {
        res.status(400);
        res.end();
        return;
    }

    let username = req.body.username;
    let password = req.body.password;

    let account = await Account.findByUsername(username);
    createUser(account.id);

    if (!account) res.status(404).end();
    else if (account.password != password) res.status(401).end();
    else res.json({ id: account.id });


    next();
}

async function register(req, res, next) {
    if (!req.body) {
        res.status(400);
        res.end();
        return;
    }

    let username = req.body.username;
    let password = req.body.password;

    let account = await Account.create({ username, password });
    if (!account) res.status(401).end();
    else res.send({ id: account.id });
}

module.exports = {
    auth, register
}
