const todoList = require('../models/todoListModels')

exports.createTodoList = async (req, res) => {
    try {
        const newTodoList = await todoList.create({
            userId: req.body.userId,
            title: req.body.title,
            description: req.body.description,
            deadlineDate: req.body.deadlineDate,
        });

        res.status(201).json({
            status: "Success",
            data: {
                newTodoList: newTodoList
            }
        });

    } catch (error) {
        // console.log(error);
        res.status(401).json({
            status: "fail",
            data: {
                message: error.message
            }
        });
    }
}

exports.findMyTodoList = async (req, res) => {
    try {
        const { userId } = req.params

        const myTodoList = await todoList.find({ userId: userId })

        if (myTodoList.length === 0) {
            res.status(201).json({
                status: "Success",
                data: {
                    message: "Nothing in the list"
                }
            });
        } else {
            res.status(201).json({
                status: "Success",
                myTodoList: myTodoList
            });
        }

    } catch (error) {
        res.status(401).json({
            status: "fail",
            data: {
                message: error.message
            }
        });
    }
}

exports.findOneTodoList = async (req, res) => {
    try {
        const { listId } = req.params

        const myTodoList = await todoList.findById({ _id: listId })

        if (myTodoList) {
            res.status(201).json({
                status: "Success",
                myTodoList: myTodoList
            });
        } else {
            res.status(401).json({
                status: "fail",
                message: "Invalid list Id"
            });
        }

    } catch (error) {
        res.status(401).json({
            status: "fail",
            data: {
                message: error.message
            }
        });
    }
}

exports.editMyTodoList = async (req, res) => {
    try {
        const { id } = req.params;

        // Checking if the todo list exists
        const findMyTodoList = await todoList.findById(id);
        if (!findMyTodoList) {
            return res.status(404).json({
                status: "fail",
                data: {
                    message: "Todo list not found"
                }
            });
        }

        const editTodoList = await todoList.updateOne(
            { _id: id },
            {
                title: req.body.task,
                description: req.body.description,
                deadlineDate: req.body.deadlineDate,
                status: req.body.status,
            }
        );

        res.status(201).json({
            status: "Success",
            data: {
                editTodoList: editTodoList
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            data: {
                message: error.message
            }
        });
    }
};


exports.updateTodoListStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        const findMyTodoList = await todoList.findById({ _id: id });

        if (findMyTodoList) {
            if (status === "in Progress" || status === "completed" || status === "aborted") {
                const updatedStatus = await todoList.findByIdAndUpdate(
                    { _id: id },
                    // { $set: { status: status } },
                    { status: status },
                    { new: true } // This will return the updated document
                );

                res.status(201).json({
                    status: "Success",
                    data: {
                        updatedStatus: updatedStatus
                    }
                });
            } else {
                res.status(400).json({
                    status: "Fail",
                    data: {
                        message: "Invalid status"
                    }
                });
            }

        }

    } catch (error) {
        res.status(401).json({
            status: "fail",
            data: {
                message: error.message
            }
        });
    }
}

exports.deleteTodoList = async (req, res) => {
    try {
        const { id } = req.body;
        const deletedData = await todoList.deleteOne({ _id: id })

        res.status(200).json({
            status: "success",
            message: "Data deleted successfully",
            data: deletedData
        })
    } catch (error) {
        res.status(401).json({
            status: "fail",
            data: {
                message: error.message
            }
        });
    }
}