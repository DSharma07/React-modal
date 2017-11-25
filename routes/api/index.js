const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
var _ = require('lodash');

const MemberModel = require('../../models/member');
const TransactionsModel = require('../../models/transaction');

router.get('/aye', (req, res) => {
    res.send('aye aye');
});

router.get('/list-members', (req, res) => {
    MemberModel
        .find({})
        .sort({number: 1})
        .then(members => {
            const mappedMembers = members.map(member => {
                return {
                    id: member._id,
                    first_name: member.first_name,
                    last_name: member.last_name,
                    email: member.email,
                    number: member.number
                };
            });
            res.json(mappedMembers);
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

router.get('/transactions/:id', (req, res) => {
    var id = req.params.id;
    TransactionsModel
        .find({"member": mongoose.Types.ObjectId(id)})
        .then(transactions => {
            const mappedTransactions = transactions.map(transaction => {
                return {
                    id: transaction._id,
                    amount: transaction.amount,
                    type: transaction.type,
                    date: transaction.date
                };
            });
            res.json(mappedTransactions);
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});


router.get('/graph/:id', (req, res) => {
    var id = req.params.id;
    TransactionsModel
        .aggregate([{"$match":{"member":mongoose.Types.ObjectId(id)}},{"$group":{_id:{$month:"$date"},details: {$push:{ type: "$type", amount: "$amount", id: "$_id", date: "$date" }}}}])
        .then(transactions => {
            const mappedTransactions = transactions.map(transaction => {
                return {
                    month: transaction._id,
                    details : transaction.details
                };
            });
           res.json(mappedTransactions);
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

module.exports = router;
