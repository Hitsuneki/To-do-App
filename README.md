# Todo App with Theme and Performance Optimization

A modern, performant Todo application built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. This project demonstrates best practices for React hooks usage, state management, and performance optimization.

## Features

- ✅ **Add/Remove Todos** - Create and delete tasks with a clean interface
- 💾 **LocalStorage Persistence** - Your todos are saved automatically and persist across sessions
- 🌓 **Theme Toggle** - Switch between light and dark modes with global theme context
- ⚡ **Performance Optimized** - Uses React hooks for optimal rendering performance
- 📱 **Responsive Design** - Works seamlessly on all device sizes
- 🎯 **Filter Todos** - View all, active, or completed tasks

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Hooks (useState, useContext)
- **Performance**: useMemo, useCallback

## React Hooks Implementation

This project showcases proper usage of all essential React hooks:

### 1. **useState** - State Management
```tsx
const [todos, setTodos] = useState<Todo[]>([])
const [newTask, setNewTask] = useState('')
const [filter, setFilter] = useState<FilterType>('all')
```
Manages the todo list, input field, and filter state.

### 2. **useEffect** - Side Effects & Persistence
```tsx
// Load from localStorage on mount
useEffect(() => {
  const savedTodos = localStorage.getItem('todos')
  if (savedTodos) setTodos(JSON.parse(savedTodos))
}, [])

// Save to localStorage on changes
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos))
}, [todos])
```
Handles data persistence with localStorage synchronization.

### 3. **useContext** - Global Theme
```tsx
const { theme, toggleTheme } = useTheme()
```
Provides global theme state across the application without prop drilling.

### 4. **useMemo** - Performance Optimization
```tsx
const filteredTodos = useMemo(() => {
  switch (filter) {
    case 'active': return todos.filter(todo => !todo.completed)
    case 'completed': return todos.filter(todo => todo.completed)
    default: return todos
  }
}, [todos, filter])
```
Memoizes filtered results to prevent unnecessary recalculations.

### 5. **useCallback** - Function Memoization
```tsx
const addTask = useCallback(() => {
  if (newTask.trim() !== '') {
    setTodos(prevTodos => [...prevTodos, { id: Date.now(), text: newTask, completed: false }])
    setNewTask('')
  }
}, [newTask])
```
Prevents function recreation on every render, optimizing child component performance.

## How It Works

### Theme System
- Uses React Context API for global state
- Persists theme preference in localStorage
- Applies Tailwind's dark mode classes dynamically

### Todo Management
- Each todo has: `id`, `text`, and `completed` status
- Todos are stored as JSON in localStorage
- Filter system shows all, active, or completed tasks

### Performance Optimizations
- **useMemo**: Filters are only recalculated when todos or filter type changes
- **useCallback**: Event handlers maintain referential equality across renders
- **Proper dependencies**: All hooks have correct dependency arrays

## License

MIT
