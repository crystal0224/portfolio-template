# Firebase Integration for Permanent Data Storage

**Date:** 2026-02-16
**Author:** Claude Sonnet 4.5
**Status:** Approved

## Overview

Replace localStorage with Firebase Firestore for permanent, cloud-based storage of portfolio items and career data. This enables data persistence across browsers and devices with real-time synchronization.

## Requirements

- Permanent storage of portfolio items (35 items) and career data (13 sections)
- Real-time synchronization across devices
- Admin-only write access with public read access
- Migrate existing localStorage data to Firebase
- Maintain existing UI/UX

## Technology Choice

**Firebase Firestore** - Selected over Supabase (quota exhausted) and Neon (more complex setup)

**Advantages:**
- Easy setup (~10 minutes)
- Real-time synchronization built-in
- Excellent React integration
- Built-in authentication
- NoSQL suitable for this data structure
- Generous free tier (1GB storage, 50K reads/day)

## Architecture

### Firebase Project Structure

```
portfolio-website (Firebase Project)
├── portfolio_items/           # 35 portfolio items
│   ├── {itemId}/
│   │   ├── id, code, title, description
│   │   ├── platform, tags, links, date
│   │   └── order (for drag-and-drop)
│
├── positions/                 # Career: Experience
├── education/                 # Career: Education
├── certifications/            # Career: Certifications
├── publications/              # Career: Publications
├── skills/                    # Career: Skills
├── awards/                    # Career: Awards
├── academicProjects/          # Career: Academic Projects
├── teaching/                  # Career: Teaching
├── partTimeJobs/              # Career: Part-time Jobs
├── groupActivities/           # Career: Group Activities
├── mentoring/                 # Career: Mentoring
├── researchExchange/          # Career: Research Exchange
└── workProjects/              # Career: Work Projects
```

### Data Flow

**Before (localStorage):**
```
Original Data (portfolioData.ts)
    ↓
localStorage merge (App.tsx)
    ↓
React State
    ↓
UI Rendering
```

**After (Firebase):**
```
Firebase Firestore (cloud)
    ↓
Real-time listener (onSnapshot)
    ↓
React State (auto-update)
    ↓
UI Rendering (real-time)
```

### Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read, admin-only write
    match /{collection}/{document} {
      allow read: if true;  // Public portfolio
      allow write: if request.auth != null;  // Authenticated users only
    }
  }
}
```

## Implementation

### New Files

1. **`src/app/lib/firebase.ts`**
   - Firebase initialization
   - Firestore instance export
   - Configuration from env variables

2. **`src/app/hooks/useFirestore.ts`**
   - Generic Firestore CRUD hook
   - Real-time listener setup
   - Error handling

3. **`src/app/scripts/migrateToFirebase.ts`**
   - One-time migration script
   - Upload original data to Firestore
   - Set initial order values

### Modified Files

1. **`App.tsx`**
   - Replace localStorage logic with Firebase listener
   - Remove localStorage merge logic
   - Add Firebase data loading state

2. **`CareerDataContext.tsx`**
   - Replace localStorage operations with Firestore
   - Use real-time listeners for all collections
   - Update CRUD operations to use Firestore

3. **`PortfolioCard.tsx`** & Career Section Components
   - Update save operations to use Firestore
   - Remove localStorage calls

### Dependencies

```bash
npm install firebase
```

### Environment Variables

Create `.env.local`:
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## Authentication

**Current Approach (Maintained):**
- Simple password check (`sk1234`)
- localStorage admin state
- Works with Firestore Rules via Firebase Auth

**Future Enhancement (Optional):**
- Firebase Authentication email/password
- More secure admin access
- Multiple admin users

## Migration Strategy

1. **Setup Phase:**
   - Create Firebase project
   - Install dependencies
   - Configure Firebase in code
   - Set up security rules

2. **Migration Phase:**
   - Run migration script to upload original data
   - Verify data in Firebase console
   - Test read operations

3. **Integration Phase:**
   - Update components to use Firebase
   - Remove localStorage code
   - Test CRUD operations
   - Test drag-and-drop reordering

4. **Deployment Phase:**
   - Commit changes
   - Deploy to GitHub Pages
   - Verify production functionality

## Testing Checklist

- [ ] Firebase project created and configured
- [ ] All collections visible in Firebase console
- [ ] Data successfully migrated from localStorage
- [ ] Portfolio items: CRUD operations work
- [ ] Career sections: CRUD operations work
- [ ] Drag-and-drop reordering persists
- [ ] Real-time sync works across tabs
- [ ] Admin authentication works
- [ ] Public users can view but not edit
- [ ] Build succeeds with no errors
- [ ] Deployed site loads data from Firebase

## Rollback Plan

If issues occur:
- Original localStorage code preserved in git history
- Can revert to previous commit
- Original data files unchanged (`portfolioData.ts`, `detailedCareerData.ts`)

## Summary

**Benefits:**
- Permanent, cloud-based storage
- Real-time synchronization
- No browser-specific data loss
- Professional data management
- Scalable architecture

**Implementation Time:** ~1-2 hours

**Cost:** Free (Firebase Spark plan)
