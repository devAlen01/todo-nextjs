import scss from "./HomePage.module.scss";
import AddTodo from "../AddTodo";
import TodoList from "../TodoList";

const HomePage = () => {
  return (
    <div className={scss.HomePage}>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default HomePage;
