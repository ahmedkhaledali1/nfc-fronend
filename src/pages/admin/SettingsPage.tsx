import { Settings } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import PageHeader from './_components/pageHeader';

const SettingsPage = () => {
  return (
    <div className="p-6 !w-full">
      <PageHeader
        title="Settings"
        description="Configure system preferences and options"
      />

      <Card className="card-premium">
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>
            Configure order form fields and system preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8">
            <Settings className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Settings panel coming soon...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
