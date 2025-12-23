# Premium Component Library

This document provides an overview of all the premium components available in the VCQ Cotizador application.

## Core Components

### Toast & Notifications
- **Toast** - Individual toast notification component
- **useToast()** - Hook to show notifications globally
- Supports: success, error, info, warning

### Form Components
- **PremiumInput** - Enhanced input with icons, validation, and error states
- **Button** - Versatile button with variants (primary, secondary, danger, success)
- **PremiumSelect** - (can be created using glass-select classes)
- **FormSection** - Wrapper for organizing form fields into sections

### Data Display
- **DataTable** - Sortable table with glass aesthetic
- **StatCard** - KPI card with trends and icons
- **InfoCard** - Information display with color variants
- **Badge** - Status/tag badges with colors and sizes
- **Progress** - Progress bar with animations

### Layout & Structure
- **Card** - Flexible card component with header/footer support
- **Modal** - Animated modal with customizable content
- **ConfirmDialog** - Confirmation modal for dangerous actions
- **SectionHeader** - Section title with icon and description
- **PageTransition** - Smooth page transition animation wrapper
- **NavigationBar** - Top navigation with back button
- **Breadcrumb** - Navigation breadcrumbs

### Enhanced Components
- **TabNavigation** - Tab switcher with glass styling
- **Tabs** - Advanced tab component with content
- **SkeletonLoader** - Loading placeholders for various content types
- **LoadingSpinner** - Animated loading spinner
- **EmptyState** - Empty state with icon and action
- **Breadcrumb** - Enhanced navigation breadcrumb

## Context Providers

### ToastContext
Provides global toast notifications throughout the app.

```typescript
import { useToast } from '@/hooks/useToast';

function MyComponent() {
  const { success, error, info, warning } = useToast();

  success('Operation completed', 'Your changes have been saved');
}
```

## Styling Classes

### Glass Effects
- `.glass-panel` - Basic glass panel
- `.liquid-glass` - Frosted glass effect
- `.glass-card` - Card with glass styling

### Buttons
- `.glass-button-primary` - Primary action button
- `.glass-button-secondary` - Secondary button
- `.glass-button-danger` - Destructive action button
- `.glass-button-success` - Success/confirm button

### Inputs
- `.glass-input` - Text input with glass styling
- `.glass-label` - Label styling
- `.glass-select` - Select dropdown styling

### Animations
- `.animate-slide-in-right` - Slide in from right
- `.animate-slide-in-left` - Slide in from left
- `.animate-fade-in-up` - Fade in with upward movement
- `.animate-scale-in` - Scale in animation
- `.animate-float` - Floating animation

## Color System

### Primary Colors
- **Obsidian** (#1A1A1A) - Dark background
- **Frost** (#F8F9FA) - Light text
- **Cyan** (#00D1FF) - Primary accent

### Semantic Colors
- **Emerald** - Success, positive states
- **Amber** - Warning, caution
- **Rose** - Danger, negative states
- **Sky** - Info, neutral states

## Usage Examples

### Toast Notifications
```typescript
const { success, error } = useToast();

// Show success
success('Saved', 'Your data has been saved successfully');

// Show error
error('Error', 'Something went wrong');
```

### Forms
```typescript
<FormSection title="User Details" columns={2}>
  <PremiumInput
    label="First Name"
    value={firstName}
    onChange={(e) => setFirstName(e.target.value)}
  />
  <PremiumInput
    label="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    icon={<Mail />}
  />
</FormSection>
```

### Data Tables
```typescript
<DataTable
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'status', label: 'Status', render: (val) => <Badge>{val}</Badge> }
  ]}
  data={data}
  onRowClick={(row) => console.log(row)}
/>
```

### Modals
```typescript
const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Create New Item"
  primaryAction={{
    label: 'Create',
    onClick: handleCreate
  }}
>
  {/* Modal content */}
</Modal>
```

### Stats
```typescript
<StatCard
  icon={Package}
  label="Active Orders"
  value="24"
  change={{ value: 12, isPositive: true }}
  color="cyan"
/>
```

## Premium Features

1. **Smooth Animations** - All interactions use smooth CSS transitions
2. **Loading States** - Skeleton loaders and spinners for better UX
3. **Validation Feedback** - Real-time form validation with visual indicators
4. **Toast Notifications** - Non-intrusive notification system
5. **Modal Animations** - Smooth modal open/close transitions
6. **Color System** - Consistent, cohesive color palette
7. **Micro-interactions** - Hover effects, scale animations, and more
8. **Responsive Design** - All components work on mobile and desktop
9. **Accessibility** - Proper ARIA labels and keyboard navigation
10. **Dark Mode** - Glass aesthetic works perfectly in dark environments

## Best Practices

1. Use **PremiumInput** instead of plain input elements
2. Use **Button** component for all interactive elements
3. Wrap forms with **FormSection** for organization
4. Use **Toast** for success/error feedback
5. Use **Modal** for important actions or confirmations
6. Use **DataTable** for displaying lists of items
7. Use **SkeletonLoader** while data is loading
8. Use **PageTransition** to wrap page content

## Notes

- All components follow the glass morphism design aesthetic
- Colors are consistent with the primary cyan (#00D1FF) accent
- Animations use duration-300 for smooth transitions
- All components are fully typed with TypeScript
- Components are accessible with proper semantic HTML
