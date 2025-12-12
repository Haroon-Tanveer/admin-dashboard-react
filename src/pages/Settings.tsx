import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Checkbox } from '../components/ui';
import { useAppContext } from '../store';
import { Save } from 'lucide-react';

export const Settings = () => {
  const { state, dispatch } = useAppContext();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your application preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Theme Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Color Theme
            </label>
            <Select
              value={state.theme.theme}
              onChange={(e) => dispatch({ type: 'SET_THEME', payload: e.target.value as 'light' | 'dark' })}
              options={[
                { value: 'light', label: 'Light Mode' },
                { value: 'dark', label: 'Dark Mode' },
              ]}
            />
          </div>

          <Checkbox
            label="Enable RTL (Right to Left) Mode"
            checked={state.theme.isRTL}
            onChange={(e) => dispatch({ type: 'SET_RTL', payload: e.target.checked })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Layout Mode
            </label>
            <Select
              value={state.layout.layoutMode}
              onChange={(e) => dispatch({ type: 'SET_LAYOUT_MODE', payload: e.target.value as 'sidebar' | 'topnav' | 'minimal' })}
              options={[
                { value: 'sidebar', label: 'Sidebar Layout' },
                { value: 'topnav', label: 'Top Navigation' },
                { value: 'minimal', label: 'Minimal Layout' },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Input
            label="Full Name"
            type="text"
            defaultValue={state.auth.user?.name || ''}
            placeholder="Enter your name"
          />
          <Input
            label="Email Address"
            type="email"
            defaultValue={state.auth.user?.email || ''}
            placeholder="Enter your email"
          />
          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Password Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Input
            label="Current Password"
            type="password"
            placeholder="Enter current password"
          />
          <Input
            label="New Password"
            type="password"
            placeholder="Enter new password"
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Confirm new password"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Checkbox label="Email notifications for new messages" defaultChecked />
          <Checkbox label="Push notifications for updates" defaultChecked />
          <Checkbox label="Weekly summary emails" />
          <Checkbox label="Marketing and promotional emails" />
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave} isLoading={isSaving}>
          <Save size={18} className="mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};
