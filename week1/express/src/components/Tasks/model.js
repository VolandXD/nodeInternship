const { Schema, model } = require('mongoose');

const TasksSchema = new Schema({
    assignee: Schema.Types.ObjectId,
    title: { type: String, unique: true, required: true },
    description: { type: String, required: false },
    estimateTime: { type: Number, required: true },
    createBy: { type: String, required: false },
});

module.exports = model('Tasks', TasksSchema);
