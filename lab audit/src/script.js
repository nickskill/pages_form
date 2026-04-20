const initialTasks = [
  { id: 1, title: "Сверстать главную", description: "Hero + адаптив",  priority: "high",   tag: "frontend", status: "todo" },
  { id: 2, title: "API авторизации",   description: "JWT + refresh",   priority: "high",   tag: "backend",  status: "in-progress" },
  { id: 3, title: "Логотип v2",        description: "Векторный SVG",   priority: "low",    tag: "design",   status: "done" },
  { id: 4, title: "CI/CD пайплайн",    description: "GitHub Actions",  priority: "medium", tag: "devops",   status: "todo" },
  { id: 5, title: "Карточка товара",   description: "Состояния hover", priority: "medium", tag: "frontend", status: "in-progress" },
  { id: 6, title: "Миграция БД",       description: "Alembic + тесты", priority: "high",   tag: "backend",  status: "done" }
];

const { useState, useEffect } = React;

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('kanban-tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [tagFilter, setTagFilter]           = useState('all');

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
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, status: newStatus } : t
    ));
  }

  function resetTasks() {
    if (confirm('Вернуть начальные задачи? Все изменения будут потеряны.')) {
    setTasks(initialTasks);
    }
  }
  
  const filteredTasks = tasks.filter(t => {
    const okPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    const okTag      = tagFilter === 'all'      || t.tag === tagFilter;
    return okPriority && okTag;
  });

  // JSX-разметка
  return (
    <div className="app">
      <header className="app-header">
        <h1>Kanban-доска задач</h1>
        <button className="btn-reset" onClick={resetTasks}>Сбросить</button>
      </header>
      <AddTaskForm onAdd={addTask} />
      <FilterBar
        priorityFilter={priorityFilter}
        tagFilter={tagFilter}
        onPriorityChange={setPriorityFilter}
        onTagChange={setTagFilter}
      />
      <Board tasks={filteredTasks} onDelete={deleteTask} onMove={moveTask} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

function Column({ title, status, tasks, onDelete, onMove }) {
  return (
    <div className={`column column-${status}`}>
      <h2>{title} ({tasks.length})</h2>
      {tasks.length === 0 && <p className="empty-hint">Здесь пока нет задач</p>}
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onMove={onMove}
        />
      ))}
    </div>
  );
}

function Board({ tasks, onDelete, onMove }) {
  
  const todoTasks       = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const doneTasks       = tasks.filter(t => t.status === 'done');

  
  return (
    <div className="board">
      <Column
        title="Сделать"
        status="todo"
        tasks={todoTasks}
        onDelete={onDelete}
        onMove={onMove}
      />
      <Column
        title="В работе"
        status="in-progress"
        tasks={inProgressTasks}
        onDelete={onDelete}
        onMove={onMove}
      />
      <Column
        title="Готово"
        status="done"
        tasks={doneTasks}
        onDelete={onDelete}
        onMove={onMove}
      />
    </div>
  );
}

const STATUS_ORDER = ['todo', 'in-progress', 'done'];

function TaskCard({ task, onDelete, onMove }) {
  const currentIndex = STATUS_ORDER.indexOf(task.status);
  const prevStatus = currentIndex > 0 ? STATUS_ORDER[currentIndex - 1] : null;
  const nextStatus = currentIndex < STATUS_ORDER.length - 1 ? STATUS_ORDER[currentIndex + 1] : null;

  return (
    <div className={`task-card priority-${task.priority}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className={`badge badge-${task.priority}`}>{task.priority}</span>
      </div>
      <p className="task-desc">{task.description}</p>
      <div className="task-footer">
        <div className="task-actions">
          <button
            className="btn-move"
            disabled={!prevStatus}
            onClick={() => onMove(task.id, prevStatus)}
            
          >◀</button>
          
          <button
            className="btn-move"
            disabled={!nextStatus}
            onClick={() => onMove(task.id, nextStatus)}
            
          >▶</button>
          
        </div>
        <span className={`tag tag-${task.tag}`}>#{task.tag}</span>
        <button className="btn-delete" onClick={() => onDelete(task.id)}>×</button>
      </div>
    </div>
  );
}

function AddTaskForm({ onAdd }) {
  const [title, setTitle]             = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority]       = useState('medium');
  const [tag, setTag]                 = useState('frontend');

  function handleSubmit(event) {
    event.preventDefault();
    if (title.trim() === '') return;

    onAdd({
      title: title.trim(),
      description: description.trim(),
      priority,
      tag,
      status:'todo'
    });
    setTitle('');
    setDescription('');
    setPriority('medium');
    setTag('frontend');
  }

  
  
  
  
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Название задачи"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        
        
        type="text"
        placeholder="Описание"
        value={description}
        onChange={e => setDescription(e.target.value)}
        
        
      />
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>
      <select value={tag} onChange={e => setTag(e.target.value)}>
        <option value="frontend">frontend</option>
        <option value="backend">backend</option>
        <option value="design">design</option>
        <option value="devops">devops</option>
      </select>
      <button type="submit">Добавить</button>
    </form>
  );
}

function FilterBar({ priorityFilter, tagFilter, onPriorityChange, onTagChange }) {
  return (
    <div className="filter-bar">
      <label>
        Приоритет:
        <select value={priorityFilter} onChange={e => onPriorityChange(e.target.value)}>
          <option value="all">Все</option>
          <option value="high">high</option>
          <option value="medium">medium</option>
          <option value="low">low</option>
        </select>
      </label>
      <label>
        Тег:
        <select value={tagFilter} onChange={e => onTagChange(e.target.value)}>
          <option value="all">Все</option>
          <option value="frontend">frontend</option>
          <option value="backend">backend</option>
          <option value="design">design</option>
          <option value="devops">devops</option>
        </select>
      </label>
    </div>
  );
}