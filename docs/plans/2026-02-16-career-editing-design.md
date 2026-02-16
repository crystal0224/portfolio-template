# Career Data Editing System Design

**Date:** 2026-02-16
**Author:** Claude Sonnet 4.5
**Status:** Approved

## Overview

Add comprehensive admin editing capabilities to all 13 career sections in the detailed career page. Implement full CRUD operations (Create, Read, Update, Delete) plus drag-and-drop reordering for all career data types.

## Requirements

- **Scope:** All 13 career sections
- **Features:** Add, Edit, Delete, Reorder (drag-and-drop)
- **Storage:** localStorage (consistent with portfolio items)
- **UI:** Modal popups for editing
- **Reordering:** Drag-and-drop handles (⋮⋮ icon)
- **Access Control:** Admin-only editing (via existing useAdmin hook)

## Architecture

### Approach: Hybrid System

Balance between code reuse and flexibility:
- Shared base components for common functionality
- Section-specific field configurations
- Unified drag-and-drop library (@dnd-kit/sortable)
- Consistent UX with customization capability

### Project Structure

```
src/app/
├── components/
│   ├── career/                          # New
│   │   ├── BaseCareerEditModal.tsx      # Common modal base
│   │   ├── CareerItemCard.tsx           # Draggable card wrapper
│   │   └── AddItemButton.tsx            # "Add item" button
│   │
│   ├── career-sections/                 # Modify existing
│   │   ├── ExperienceSection.tsx        # Add drag-and-drop + edit buttons
│   │   ├── EducationSection.tsx         # Same pattern
│   │   └── ... (11 more)
│
├── config/
│   └── careerFieldConfigs.ts            # New: 13 section field definitions
│
├── contexts/
│   └── CareerDataContext.tsx            # New: Career data management
│
└── hooks/
    ├── useCareerData.ts                 # New: CRUD hook
    └── useCareerDragDrop.ts             # New: Drag-and-drop hook
```

### Data Flow

1. **CareerDataContext** - Merges localStorage with original data, provides global state
2. **Section Components** - Fetch data from Context, render UI
3. **On Edit** - useCareerData hook handles CRUD, auto-saves to localStorage
4. **On Reorder** - useCareerDragDrop hook handles drag-and-drop, updates localStorage

## Component Design

### 1. BaseCareerEditModal.tsx

Common modal component used by all sections.

```typescript
interface BaseCareerEditModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  item?: T;                              // undefined = add mode
  fieldConfig: FieldConfig[];            // Field definitions
  onSave: (data: T) => void;
  onDelete?: (id: string) => void;
  title: string;                         // "Edit Experience", "Add Education", etc.
}
```

**Features:**
- Dynamic form generation (based on fieldConfig)
- Input validation
- Auto-switch between add/edit mode
- Save/Delete/Cancel buttons

### 2. CareerItemCard.tsx

Draggable card wrapper.

```typescript
interface CareerItemCardProps {
  id: string;
  children: ReactNode;                   // Actual content
  onEdit: () => void;
  onDelete: () => void;
  isAdmin: boolean;
}
```

**Features:**
- Show drag handle `⋮⋮` only to admins
- Edit/Delete buttons (admin-only)
- Style changes during drag
- Highlight edit buttons on hover

### 3. careerFieldConfigs.ts

Unified field definitions for 13 sections.

```typescript
export const positionFields: FieldConfig[] = [
  { name: 'company', label: '회사명', type: 'text', required: true },
  { name: 'title', label: '직책', type: 'text', required: true },
  { name: 'startDate', label: '시작일', type: 'month', required: true },
  { name: 'endDate', label: '종료일', type: 'month', required: false },
  { name: 'description', label: '설명', type: 'textarea' },
];

export const educationFields: FieldConfig[] = [...];
// ... 11 more
```

**Supported Field Types:**
- `text`, `textarea`, `number`, `month`, `date`, `select`, `multi-select`

### 4. CareerDataContext.tsx

Global state management Context.

```typescript
interface CareerDataContextType {
  positions: Position[];
  education: Education[];
  // ... 11 more

  updatePosition: (id: string, data: Position) => void;
  deletePosition: (id: string) => void;
  addPosition: (data: Position) => void;
  reorderPositions: (oldIndex: number, newIndex: number) => void;

  // Same 4 functions for each data type
}
```

**Features:**
- Load edit history from localStorage
- Merge with original data
- Auto-save to localStorage on CRUD operations
- Filter deleted items

## Drag-and-Drop Implementation

### Library: @dnd-kit/sortable

**Why:**
- Optimized for React 18+, excellent touch support
- Built-in accessibility (keyboard reordering)
- Lightweight (~15KB), performant
- Full TypeScript support

### Implementation Pattern

```typescript
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

function ExperienceSection() {
  const { positions, reorderPositions } = useCareerData();

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = positions.findIndex(p => p.id === active.id);
      const newIndex = positions.findIndex(p => p.id === over.id);
      reorderPositions(oldIndex, newIndex);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <SortableContext items={positions} strategy={verticalListSortingStrategy}>
        {positions.map(position => (
          <CareerItemCard key={position.id} id={position.id} ...>
            {/* Actual content */}
          </CareerItemCard>
        ))}
      </SortableContext>
    </DndContext>
  );
}
```

### UX Details

- **Drag Handle:** Admin-only `⋮⋮` icon, top-left placement
- **During Drag:** Semi-transparent + blue border, increased shadow
- **Drop Zone:** Dashed guide line at drop position
- **Non-Admin:** Hide drag handle, disable dragging

## localStorage Data Structure

### Storage Keys

```typescript
// Separate keys per section
localStorage.setItem('career_positions_edits', JSON.stringify(edits));
localStorage.setItem('career_positions_deleted', JSON.stringify(deletedIds));
localStorage.setItem('career_positions_order', JSON.stringify(orderedIds));
localStorage.setItem('career_positions_added', JSON.stringify(addedItems));

// 13 sections × 4 keys = 52 localStorage keys
```

### Data Structures

**1) Edits**
```typescript
{
  "pos-1": { company: "Updated Company", title: "Updated Title" },
  "pos-2": { startDate: "2024-01" }
}
```

**2) Deleted Items**
```typescript
["pos-3", "pos-5", "pos-7"]
```

**3) Order**
```typescript
["pos-1", "pos-4", "pos-2", "pos-6"]  // Reordered by drag-and-drop
```

**4) Added Items**
```typescript
[
  { id: "new-1", company: "New Company", title: "New Title", ... },
  { id: "new-2", ... }
]
```

### Merge Logic (in Context)

```typescript
function mergeCareerData(original, edits, deleted, order, added) {
  // 1. Remove deleted items from original
  let items = original.filter(item => !deleted.includes(item.id));

  // 2. Apply edits
  items = items.map(item =>
    edits[item.id] ? { ...item, ...edits[item.id] } : item
  );

  // 3. Merge added items
  items = [...items, ...added];

  // 4. Apply order (if exists)
  if (order?.length) {
    items = order.map(id => items.find(item => item.id === id)).filter(Boolean);
  }

  return items;
}
```

## UI/UX Design

### Admin Mode Entry

- Use existing admin login system (`useAdmin` hook)
- Show edit UI only when logged in
- Non-admin users see regular view only

### Section UI Pattern

**Regular User View:**
```
[Career Card 1]
[Career Card 2]
[Career Card 3]
```

**Admin View:**
```
[⋮⋮ Career Card 1  [✏️Edit] [🗑️Delete]]
[⋮⋮ Career Card 2  [✏️Edit] [🗑️Delete]]
[⋮⋮ Career Card 3  [✏️Edit] [🗑️Delete]]

[+ Add New Item]  ← Button at section bottom
```

### Modal UI Structure

```
┌─────────────────────────────────────┐
│  ✕  Edit Experience                 │
├─────────────────────────────────────┤
│  Company Name *                      │
│  [________________]                 │
│                                      │
│  Title *                             │
│  [________________]                 │
│                                      │
│  Start Date *    End Date            │
│  [2023-05]      [2024-12]           │
│                                      │
│  Description                         │
│  [___________________________]      │
│  [___________________________]      │
│                                      │
├─────────────────────────────────────┤
│  [Delete]        [Cancel]  [Save]   │
└─────────────────────────────────────┘
```

### Interactions

1. **Edit Button Click:**
   - Open modal, pre-fill with existing data
   - Show required fields (`*` mark)

2. **Delete Button Click:**
   - Confirmation dialog: "Are you sure?"
   - On confirm: immediately update localStorage + UI

3. **Drag Start:**
   - Only drag handle `⋮⋮` is draggable
   - Card body is not draggable (allow text selection)

4. **Reorder Complete:**
   - Drop immediately updates localStorage
   - Smooth animation (framer-motion)

5. **Add Button Click:**
   - Open empty modal
   - On save: generate temp ID (`new-${Date.now()}`)

### Responsive Design

- **Mobile:** Full-screen modal, large drag handles
- **Tablet/Desktop:** Centered modal popup (max 600px width)

### Animations

- Modal open/close: fade + scale
- During drag: opacity 0.5, scale 1.02
- Item delete: fade out + collapse
- Reorder: smooth slide (200ms)

## Error Handling

### Input Validation

```typescript
const validationRules = {
  required: (value) => value?.trim() ? null : '필수 항목입니다',
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : '이메일 형식이 올바르지 않습니다',
  date: (value) => !isNaN(Date.parse(value)) ? null : '날짜 형식이 올바르지 않습니다',
  url: (value) => /^https?:\/\/.+/.test(value) ? null : 'URL 형식이 올바르지 않습니다',
};
```

### Error Scenarios

1. **localStorage Quota Exceeded** (5MB limit)
   - Show toast: "저장 공간이 부족합니다"
   - Auto-compress old edit history

2. **localStorage Unavailable** (incognito mode)
   - Memory-only operation, show warning: "변경사항이 저장되지 않습니다"

3. **JSON Parse Error**
   - Ignore corrupted localStorage data, use original
   - Log error to console

4. **Duplicate ID Collision**
   - Prevent with UUID v4 for new items

5. **Date Validation Failure**
   - Check startDate < endDate
   - Error message: "종료일은 시작일 이후여야 합니다"

## Implementation Plan

### Phase 1: Foundation (4 hours)
1. Install `@dnd-kit` library
2. Create `CareerDataContext`
3. Implement `BaseCareerEditModal`
4. Implement `CareerItemCard`
5. Write `careerFieldConfigs.ts` (13 sections)

### Phase 2: Section Integration (6 hours)
1. Apply drag-and-drop to ExperienceSection (test case)
2. Apply same pattern to remaining 12 sections
3. Connect localStorage save/load
4. Integrate add/edit/delete features

### Phase 3: Polish (2 hours)
1. Adjust responsive design
2. Add animations
3. Enhance error handling
4. Test and fix bugs

**Total Estimated Time: 12 hours**

## Testing Checklist

- [ ] Can add items in each section
- [ ] Can edit items in each section
- [ ] Can delete items in each section (with confirmation dialog)
- [ ] Can reorder items with drag-and-drop
- [ ] Changes saved to localStorage
- [ ] Changes persist after refresh
- [ ] Non-admin users don't see edit UI
- [ ] Required field validation works
- [ ] Date validation works (startDate < endDate)
- [ ] Unsaved changes warning on modal close
- [ ] Mobile/tablet/desktop responsive
- [ ] Only drag handle is draggable, card body allows text selection

## Summary

**Core Architecture:**
- Hybrid approach: Shared components + section-specific configs
- CareerDataContext for global state management
- localStorage for persistent changes

**Key Components:**
- BaseCareerEditModal (common edit modal)
- CareerItemCard (draggable card)
- careerFieldConfigs (13 section field definitions)
- useCareerData, useCareerDragDrop (custom hooks)

**Features:**
- Add/Edit/Delete (CRUD)
- Drag-and-drop reordering (@dnd-kit)
- localStorage auto-save/restore
- Admin-only UI

**Implementation Time:** ~12 hours
