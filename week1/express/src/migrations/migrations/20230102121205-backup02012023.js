module.exports = {
    async up(db) {
        await db.collection('tasks').updateMany({ estimateTime: { $gt: 10 } }, { $set: { status: 'done' } });
        await db.collection('tasks').updateMany({ estimateTime: { $lt: 10 } }, { $set: { status: 'in progress' } });
    },

    async down(db) {
        await db.collection('tasks').updateMany({ status: { $exists: true } }, { $unset: { status: '' } });
    },
};
