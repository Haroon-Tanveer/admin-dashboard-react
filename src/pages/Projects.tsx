import { useState } from 'react';
import { Card, CardContent, Button } from '../components/ui';
import { Plus, MoreVertical } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      { id: '1', title: 'Design new homepage', description: 'Create mockups for new landing page', assignee: 'John Doe', priority: 'high' },
      { id: '2', title: 'Update documentation', description: 'Add API endpoint documentation', assignee: 'Jane Smith', priority: 'medium' },
      { id: '3', title: 'Fix login bug', description: 'Users cant login with email', assignee: 'Bob Johnson', priority: 'high' },
    ],
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    tasks: [
      { id: '4', title: 'Implement payment gateway', description: 'Integrate Stripe payments', assignee: 'Alice Brown', priority: 'high' },
      { id: '5', title: 'Setup CI/CD pipeline', description: 'Configure GitHub Actions', assignee: 'Charlie Wilson', priority: 'medium' },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    tasks: [
      { id: '6', title: 'Code review PR #123', description: 'Review authentication changes', assignee: 'Diana Prince', priority: 'medium' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: '7', title: 'Database migration', description: 'Migrate to PostgreSQL', assignee: 'Eve Adams', priority: 'high' },
      { id: '8', title: 'Update dependencies', description: 'Upgrade React to v18', assignee: 'Frank Miller', priority: 'low' },
    ],
  },
];

const priorityColors = {
  low: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
  medium: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
  high: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
};

export const Projects = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [draggedTask, setDraggedTask] = useState<{ task: Task; sourceColumnId: string } | null>(null);

  const handleDragStart = (task: Task, columnId: string) => {
    setDraggedTask({ task, sourceColumnId: columnId });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetColumnId: string) => {
    if (!draggedTask) return;

    const { task, sourceColumnId } = draggedTask;

    if (sourceColumnId === targetColumnId) {
      setDraggedTask(null);
      return;
    }

    const newColumns = columns.map((column) => {
      if (column.id === sourceColumnId) {
        return {
          ...column,
          tasks: column.tasks.filter((t) => t.id !== task.id),
        };
      }
      if (column.id === targetColumnId) {
        return {
          ...column,
          tasks: [...column.tasks, task],
        };
      }
      return column;
    });

    setColumns(newColumns);
    setDraggedTask(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Projects</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your project tasks with Kanban board</p>
        </div>
        <Button>
          <Plus size={20} className="mr-2" />
          New Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <div
            key={column.id}
            className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">{column.title}</h3>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  {column.tasks.length}
                </span>
              </div>
              <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                <Plus size={18} />
              </button>
            </div>

            <div className="space-y-3">
              {column.tasks.map((task) => (
                <Card
                  key={task.id}
                  className="cursor-move hover:shadow-lg transition-shadow"
                  draggable
                  onDragStart={() => handleDragStart(task, column.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">{task.title}</h4>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{task.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{task.assignee}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[task.priority]}`}>
                        {task.priority}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {columns.reduce((sum, col) => sum + col.tasks.length, 0)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {columns.find((c) => c.id === 'inprogress')?.tasks.length || 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {columns.find((c) => c.id === 'done')?.tasks.length || 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {Math.round(
                  ((columns.find((c) => c.id === 'done')?.tasks.length || 0) /
                    columns.reduce((sum, col) => sum + col.tasks.length, 0)) *
                    100
                )}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
