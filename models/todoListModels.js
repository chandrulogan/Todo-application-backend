const mongoose = require('mongoose');
const validator = require('validator');

const todoListSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "Id is required"]
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9 ]*$/.test(value);
            },
            message: "Title must not contain special characters"
        }
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9 ]*$/.test(value);
            },
            message: "Description must not contain special characters"
        }
    },
    status: {
        type: String,
        enum: ['In progress', 'Completed', 'Aborted'],
        default: "In progress",
        validate: {
            validator: function (value) {
                return ['In progress', 'Completed', 'Aborted'].includes(value);
            },
            message: 'Invalid status value'
        }
    },
    deadlineDate:{
        type: String,
        required: [true,"Deadline date is required to add the task"]
    }
});


const todoList = mongoose.model("todoList", todoListSchema);

module.exports = todoList;
