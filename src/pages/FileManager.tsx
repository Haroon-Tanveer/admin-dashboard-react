import { useState } from 'react';
import { Card, Button, Input } from '../components/ui';
import { File, Folder, Upload, Grid, List, Search, Download, Trash2, MoreVertical } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified: string;
  thumbnail?: string;
}

const mockFiles: FileItem[] = [
  { id: '1', name: 'Documents', type: 'folder', modified: '2024-11-10' },
  { id: '2', name: 'Images', type: 'folder', modified: '2024-11-12' },
  { id: '3', name: 'Projects', type: 'folder', modified: '2024-11-08' },
  { id: '4', name: 'presentation.pdf', type: 'file', size: '2.4 MB', modified: '2024-11-15', thumbnail: 'https://images.pexels.com/photos/4792285/pexels-photo-4792285.jpeg?auto=compress&cs=tinysrgb&w=200&h=150' },
  { id: '5', name: 'report.docx', type: 'file', size: '1.2 MB', modified: '2024-11-14', thumbnail: 'https://images.pexels.com/photos/4491881/pexels-photo-4491881.jpeg?auto=compress&cs=tinysrgb&w=200&h=150' },
  { id: '6', name: 'budget.xlsx', type: 'file', size: '856 KB', modified: '2024-11-13', thumbnail: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=200&h=150' },
  { id: '7', name: 'logo.png', type: 'file', size: '324 KB', modified: '2024-11-12', thumbnail: 'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=200&h=150' },
  { id: '8', name: 'video.mp4', type: 'file', size: '45.2 MB', modified: '2024-11-11', thumbnail: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=200&h=150' },
];

export const FileManager = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFiles = mockFiles.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">File Manager</h1>
          <p className="text-gray-600 dark:text-gray-400">Browse and manage your files</p>
        </div>
        <Button>
          <Upload size={18} className="mr-2" />
          Upload Files
        </Button>
      </div>

      <Card>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search files and folders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                aria-label="Grid view"
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                aria-label="List view"
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredFiles.map((file) => (
                <Card key={file.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="p-4">
                    <div className="relative mb-3">
                      {file.type === 'folder' ? (
                        <div className="aspect-square bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                          <Folder className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                        </div>
                      ) : (
                        <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                          {file.thumbnail ? (
                            <img src={file.thumbnail} alt={file.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <File className="w-16 h-16 text-gray-400" />
                            </div>
                          )}
                        </div>
                      )}
                      <button className="absolute top-2 right-2 p-1 bg-white dark:bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical size={16} className="text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate mb-1">
                      {file.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {file.size || file.modified}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {file.type === 'folder' ? (
                      <Folder className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    ) : (
                      <File className="w-8 h-8 text-gray-400 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                        {file.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {file.size ? `${file.size} • ` : ''}Modified {file.modified}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {file.type === 'file' && (
                      <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg">
                        <Download size={16} />
                      </button>
                    )}
                    <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Storage Usage</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Used: 52.3 GB of 100 GB</span>
              <span className="text-gray-600 dark:text-gray-400">52.3%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '52.3%' }} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
