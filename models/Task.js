const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

  title: {
    type: String,
    required: [true, "Title not entered"],
  },
  body: {
    type: String,
    required: [true, "Body not entered"],
  },
  status: {
    type: Boolean,
    required: [true, "status not set"],
  },
  deadline: {
    type: Date,
    required: [true, "Deadline not set"],
  }
},{ timestamps:true });

// fire a function after doc saved to db
taskSchema.post("save", function (doc, next) {
  // console.log("new task was added:", doc);
  next();
});

const Task = mongoose.model("Task",taskSchema);

module.exports = Task;
