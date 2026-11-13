// Sidebar structure copied from the original application.
export const MENU = [
  { label: 'Home', path: '/home' },
  { label: 'Master', children: [
    { label: 'Block', path: '/master/block' },
    { label: 'Panchayat', path: '/master/panchayat' },
    { label: 'Village', path: '/master/village' },
    { label: 'Hierarchy', path: '/master/hierarchy' },
    { label: 'List', path: '/master/list' },
    { label: 'Medical Chart', path: '/master/medical-chart' },
    { label: 'Question', path: '/master/question' },
  ]},
  { label: 'Screening', children: [{ label: 'Screening', path: '/screening' }] },
  { label: 'Activity', children: [
    { label: 'ATP', path: '/activity/atp' },
    { label: 'Tasks', path: '/activity/tasks' },
    { label: 'Attendance', path: '/activity/attendance' },
  ]},
  { label: 'Service User', children: [{ label: 'Service User', path: '/service-user' }] },
  { label: 'Programs', children: [
    { label: 'Awareness', path: '/programs/awareness' },
    { label: 'Training', path: '/programs/training' },
  ]},
  { label: 'Intervention', children: [
    { label: 'Intervention Plans', path: '/intervention/plans' },
    { label: 'Intervention Approvals', path: '/intervention/approvals' },
    { label: 'Multi Intervention Evaluation', path: '/intervention/evaluation' },
    { label: 'Multi Feedback', path: '/intervention/feedback' },
  ]},
  { label: 'Dashboard', children: [
    { label: 'Management Dashboard', path: '/dashboard/management' },
    { label: 'Manager Console', path: '/dashboard/manager-console' },
    { label: 'CRW Dashboard', path: '/dashboard/crw' },
    { label: 'FTL Dashboard', path: '/dashboard/ftl' },
    { label: 'Intervention Performance', path: '/dashboard/intervention-performance' },
    { label: 'Specialist Dashboard', path: '/dashboard/specialist' },
    { label: 'User Dashboard', path: '/dashboard/user' },
  ]},
  { label: 'Resources', children: [{ label: 'Manuals', path: '/resources/manuals' }] },
]

// Gear (settings) menu in the header
export const SETTINGS_MENU = [
  { label: 'Help Center', path: '/settings/help-center' },
  { label: 'Authorization', path: '/settings/authorization' },
  { label: 'Authorization Access', path: '/settings/authorization-access' },
  { label: 'Profile', path: '/settings/profile' },
  { label: 'Profile Assignment', path: '/settings/profile-assignment' },
  { label: 'User Maintenance', path: '/settings/user-maintenance' },
  { label: 'Holiday', path: '/settings/holiday' },
  { label: 'Menu', path: '/settings/menu' },
  { label: 'Browse Data', path: '/settings/browse-data' },
  { label: 'Sql report', path: '/settings/sql-report' },
]
