// models/todo.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      await this.overdue();
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      await this.dueToday();
      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      await this.dueLater();
      // await this.markAsComplete(2);
      // await this.markAsComplete(1);
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      // const overdues = [];
      const yesterday = new Date().setDate(new Date().getDate() - 1);
      const todos = await Todo.findAll({ where: { dueDate: yesterday } });
      const overdues = todos.map((todo) => todo.displayableString()).join("\n");
      console.log(overdues);

      // todos.array.forEach(element => {
      //   overdues.push(element.displayableString()).join("\n");
      // });
      // overdues.array.forEach(element => {
      //   console.log(element);
      // });
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      const today = new Date().setDate(new Date().getDate());
      const todos = await Todo.findAll({ where: { dueDate: today } });
      const duetoday = todos.map((todo) => todo.displayableString()).join("\n");
      console.log(duetoday);
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const tomorrow = new Date().setDate(new Date().getDate() + 1);
      const todos = await Todo.findAll({ where: { dueDate: tomorrow } });
      const duelater = todos.map((todo) => todo.displayableString()).join("\n");
      console.log(duelater);
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      const compTodo = await Todo.update(
        { completed: true },
        { where: { id: id } }
      );
      const comp = compTodo.displayableString().join("\n");
      console.log(comp);
    }

    // static associate(models) {
    //   // define association here
    // }
    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }

  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};