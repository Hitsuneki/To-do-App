'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useTheme } from './context/ThemeContext'

interface Todo {
  id: number
  text: string
  completed: boolean
}

type FilterType = 'all' | 'active' | 'completed'

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTask = useCallback(() => {
    if (newTask.trim() !== '') {
      setTodos(prevTodos => [
        ...prevTodos,
        { id: Date.now(), text: newTask, completed: false }
      ])
      setNewTask('')
    }
  }, [newTask])

  const removeTask = useCallback((id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }, [])

  const toggleTask = useCallback((id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }, [])

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed)
      case 'completed':
        return todos.filter(todo => todo.completed)
      default:
        return todos
    }
  }, [todos, filter])

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Todo List</h1>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>

        <div className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
          />
          <button
            onClick={addTask}
            className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
          >
            Add
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          {(['all', 'active', 'completed'] as FilterType[]).map(filterType => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === filterType
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>

        <ul className="space-y-2">
          {filteredTodos.map(todo => (
            <li
              key={todo.id}
              className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTask(todo.id)}
                className="w-5 h-5 cursor-pointer"
              />
              <span
                className={`flex-1 ${
                  todo.completed
                    ? 'line-through text-gray-400 dark:text-gray-500'
                    : ''
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => removeTask(todo.id)}
                className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        {filteredTodos.length === 0 && (
          <p className="text-center text-gray-400 dark:text-gray-500 mt-8">
            No tasks to display
          </p>
        )}
      </div>
    </div>
  )
}

export default TodoList