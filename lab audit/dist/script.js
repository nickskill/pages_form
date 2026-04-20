const initialTasks = [
{ id: 1, title: "Сверстать главную", description: "Hero + адаптив", priority: "high", tag: "frontend", status: "todo" },
{ id: 2, title: "API авторизации", description: "JWT + refresh", priority: "high", tag: "backend", status: "in-progress" },
{ id: 3, title: "Логотип v2", description: "Векторный SVG", priority: "low", tag: "design", status: "done" },
{ id: 4, title: "CI/CD пайплайн", description: "GitHub Actions", priority: "medium", tag: "devops", status: "todo" },
{ id: 5, title: "Карточка товара", description: "Состояния hover", priority: "medium", tag: "frontend", status: "in-progress" },
{ id: 6, title: "Миграция БД", description: "Alembic + тесты", priority: "high", tag: "backend", status: "done" }];


const { useState, useEffect } = React;

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('kanban-tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');

  // Сохранение при каждом изменении
  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Функции-обработчики
  function addTask(taskData) {
    const maxId = tasks.reduce((max, t) => Math.max(max, t.id), 0);
    const newTask = { id: maxId + 1, ...taskData };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  function moveTask(id, newStatus) {
    setTasks(tasks.map((t) =>
    t.id === id ? { ...t, status: newStatus } : t));

  }

  function resetTasks() {
    if (confirm('Вернуть начальные задачи? Все изменения будут потеряны.')) {
      setTasks(initialTasks);
    }
  }

  const filteredTasks = tasks.filter(t => {
    const okPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    const okTag = tagFilter === 'all' || t.tag === tagFilter;
    return okPriority && okTag;
  });

  // JSX-разметка
  return /*#__PURE__*/(
    React.createElement("div", { className: "app" }, /*#__PURE__*/
    React.createElement("header", { className: "app-header" }, /*#__PURE__*/
    React.createElement("h1", null, "Kanban-\u0434\u043E\u0441\u043A\u0430 \u0437\u0430\u0434\u0430\u0447"), /*#__PURE__*/
    React.createElement("button", { className: "btn-reset", onClick: resetTasks }, "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C")), /*#__PURE__*/

    React.createElement(AddTaskForm, { onAdd: addTask }), /*#__PURE__*/
    React.createElement(FilterBar, {
      priorityFilter: priorityFilter,
      tagFilter: tagFilter,
      onPriorityChange: setPriorityFilter,
      onTagChange: setTagFilter }), /*#__PURE__*/

    React.createElement(Board, { tasks: filteredTasks, onDelete: deleteTask, onMove: moveTask })));


}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( /*#__PURE__*/React.createElement(App, null));

function Column({ title, status, tasks, onDelete, onMove }) {
  return /*#__PURE__*/(
    React.createElement("div", { className: `column column-${status}` }, /*#__PURE__*/
    React.createElement("h2", null, title, " (", tasks.length, ")"),
    tasks.length === 0 && /*#__PURE__*/React.createElement("p", { className: "empty-hint" }, "\u0417\u0434\u0435\u0441\u044C \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0437\u0430\u0434\u0430\u0447"),
    tasks.map((task) => /*#__PURE__*/
    React.createElement(TaskCard, {
      key: task.id,
      task: task,
      onDelete: onDelete,
      onMove: onMove }))));




}

function Board({ tasks, onDelete, onMove }) {

  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const doneTasks = tasks.filter(t => t.status === 'done');


  return /*#__PURE__*/(
    React.createElement("div", { className: "board" }, /*#__PURE__*/
    React.createElement(Column, {
      title: "\u0421\u0434\u0435\u043B\u0430\u0442\u044C",
      status: "todo",
      tasks: todoTasks,
      onDelete: onDelete,
      onMove: onMove }), /*#__PURE__*/

    React.createElement(Column, {
      title: "\u0412 \u0440\u0430\u0431\u043E\u0442\u0435",
      status: "in-progress",
      tasks: inProgressTasks,
      onDelete: onDelete,
      onMove: onMove }), /*#__PURE__*/

    React.createElement(Column, {
      title: "\u0413\u043E\u0442\u043E\u0432\u043E",
      status: "done",
      tasks: doneTasks,
      onDelete: onDelete,
      onMove: onMove })));



}

const STATUS_ORDER = ['todo', 'in-progress', 'done'];

function TaskCard({ task, onDelete, onMove }) {
  const currentIndex = STATUS_ORDER.indexOf(task.status);
  const prevStatus = currentIndex > 0 ? STATUS_ORDER[currentIndex - 1] : null;
  const nextStatus = currentIndex < STATUS_ORDER.length - 1 ? STATUS_ORDER[currentIndex + 1] : null;

  return /*#__PURE__*/(
    React.createElement("div", { className: `task-card priority-${task.priority}` }, /*#__PURE__*/
    React.createElement("div", { className: "task-header" }, /*#__PURE__*/
    React.createElement("h3", null, task.title), /*#__PURE__*/
    React.createElement("span", { className: `badge badge-${task.priority}` }, task.priority)), /*#__PURE__*/

    React.createElement("p", { className: "task-desc" }, task.description), /*#__PURE__*/
    React.createElement("div", { className: "task-footer" }, /*#__PURE__*/
    React.createElement("div", { className: "task-actions" }, /*#__PURE__*/
    React.createElement("button", {
      className: "btn-move",
      disabled: !prevStatus,
      onClick: () => onMove(task.id, prevStatus) }, "\u25C0"), /*#__PURE__*/



    React.createElement("button", {
      className: "btn-move",
      disabled: !nextStatus,
      onClick: () => onMove(task.id, nextStatus) }, "\u25B6")), /*#__PURE__*/




    React.createElement("span", { className: `tag tag-${task.tag}` }, "#", task.tag), /*#__PURE__*/
    React.createElement("button", { className: "btn-delete", onClick: () => onDelete(task.id) }, "\xD7"))));



}

function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [tag, setTag] = useState('frontend');

  function handleSubmit(event) {
    event.preventDefault();
    if (title.trim() === '') return;

    onAdd({
      title: title.trim(),
      description: description.trim(),
      priority,
      tag,
      status: 'todo' });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setTag('frontend');
  }





  return /*#__PURE__*/(
    React.createElement("form", { className: "add-form", onSubmit: handleSubmit }, /*#__PURE__*/
    React.createElement("input", {
      type: "text",
      placeholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438",
      value: title,
      onChange: e => setTitle(e.target.value) }), /*#__PURE__*/

    React.createElement("input", {


      type: "text",
      placeholder: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435",
      value: description,
      onChange: e => setDescription(e.target.value) }), /*#__PURE__*/



    React.createElement("select", { value: priority, onChange: e => setPriority(e.target.value) }, /*#__PURE__*/
    React.createElement("option", { value: "low" }, "low"), /*#__PURE__*/
    React.createElement("option", { value: "medium" }, "medium"), /*#__PURE__*/
    React.createElement("option", { value: "high" }, "high")), /*#__PURE__*/

    React.createElement("select", { value: tag, onChange: e => setTag(e.target.value) }, /*#__PURE__*/
    React.createElement("option", { value: "frontend" }, "frontend"), /*#__PURE__*/
    React.createElement("option", { value: "backend" }, "backend"), /*#__PURE__*/
    React.createElement("option", { value: "design" }, "design"), /*#__PURE__*/
    React.createElement("option", { value: "devops" }, "devops")), /*#__PURE__*/

    React.createElement("button", { type: "submit" }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C")));


}

function FilterBar({ priorityFilter, tagFilter, onPriorityChange, onTagChange }) {
  return /*#__PURE__*/(
    React.createElement("div", { className: "filter-bar" }, /*#__PURE__*/
    React.createElement("label", null, "\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442:", /*#__PURE__*/

    React.createElement("select", { value: priorityFilter, onChange: e => onPriorityChange(e.target.value) }, /*#__PURE__*/
    React.createElement("option", { value: "all" }, "\u0412\u0441\u0435"), /*#__PURE__*/
    React.createElement("option", { value: "high" }, "high"), /*#__PURE__*/
    React.createElement("option", { value: "medium" }, "medium"), /*#__PURE__*/
    React.createElement("option", { value: "low" }, "low"))), /*#__PURE__*/


    React.createElement("label", null, "\u0422\u0435\u0433:", /*#__PURE__*/

    React.createElement("select", { value: tagFilter, onChange: e => onTagChange(e.target.value) }, /*#__PURE__*/
    React.createElement("option", { value: "all" }, "\u0412\u0441\u0435"), /*#__PURE__*/
    React.createElement("option", { value: "frontend" }, "frontend"), /*#__PURE__*/
    React.createElement("option", { value: "backend" }, "backend"), /*#__PURE__*/
    React.createElement("option", { value: "design" }, "design"), /*#__PURE__*/
    React.createElement("option", { value: "devops" }, "devops")))));




}