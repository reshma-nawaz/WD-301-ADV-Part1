/* eslint-disable no-unused-vars */
const todoList = () => {
    let all = [];
    const add = (todoItem) => {
      all.push(todoItem);
    };
    const markAsComplete = (index) => {
      all[index].completed = true;
    };
  
    const overdue = () => {
      const od = [];
      const yesterday = new Date(Date.now() - 864e5);
      all.forEach((element) => {
        const date = JSON.stringify(yesterday).substring(1, 11);
        if (element.dueDate === date) {
          od.push(element);
        }
      });
      return od;
    };
  
    const dueToday = () => {
      const dt = [];
      const today = new Date(Date.now());
      all.forEach((element) => {
        const date = JSON.stringify(today).substring(1, 11);
        if (element.dueDate === date) {
          dt.push(element);
        }
      });
      return dt;
    };
  
    const dueLater = () => {
      const dl = [];
      const tomorrow = new Date(Date.now() + 864e5);
      all.forEach((element) => {
        const date = JSON.stringify(tomorrow).substring(1, 11);
        if (element.dueDate === date) {
          dl.push(element);
        }
      });
      return dl;
    };
  
    const toDisplayableList = (list) => {
      var str = "";
      for (var i = 0; i < list.length; i++) {
        if (i > 0) {
          str += "\n";
        }
        if (list[i].completed == true) {
          str += "[x] ";
        } else {
          str += "[ ] ";
        }
        var today = new Date(Date.now());
        var date = JSON.stringify(today).substring(1, 11);
        if (list[i].dueDate == date) {
          str += list[i].title;
        } else {
          str += list[i].title + " " + list[i].dueDate;
        }
      }
      return str;
    };
  
    return {
      all,
      add,
      markAsComplete,
      overdue,
      dueToday,
      dueLater,
      toDisplayableList,
    };
  };
  
  // ####################################### #
  // DO NOT CHANGE ANYTHING BELOW THIS LINE. #
  // ####################################### #
  
  const formattedDate = (d) => {
    return d.toISOString().split("T")[0];
  };
  
  var dateToday = new Date();
  const today = formattedDate(dateToday);
  const yesterday = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() - 1))
  );
  const tomorrow = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() + 1))
  );
  module.exports = todoList;