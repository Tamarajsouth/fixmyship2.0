const { Schema, model } = require('mongoose');

const checkboxes = new Schema(
    {
        name: 'dating-1',
        key: 'dating1',
        label: 'Dating',
    },
    {
        name: 'breaking-up',
        key: 'breakingUp',
        label: 'Breaking Up',
    },
    {
        name: 'marriage',
        key: 'marriage-3',
        label: 'Marriage',
    },
    {
        name: 'lqbtq',
        key: 'lqbtq-4',
        label: 'LGBTQ+',
    },
    {
        name: 'women',
        key: 'women-5',
        label: 'Women',
    },
    {
        name: 'men',
        key: 'men-6',
        label: 'Men',
    },
    {
        name: 'just-friends',
        key: 'justFriends-7',
        label: 'Just Friends',
    },

);

const checkboxes = model('Checkboxes', checkboxes);

module.exports = checkboxes;