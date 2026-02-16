/**
 * Firebase Migration Script
 *
 * This script migrates data from the original TypeScript files to Firebase Firestore.
 * Run this ONCE to initialize Firebase with existing data.
 *
 * Usage:
 * 1. Ensure Firebase is configured in lib/firebase.ts
 * 2. Run: npx tsx src/app/scripts/migrateToFirebase.ts
 * (or import and call from browser console)
 */

import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { portfolioData } from '../data/portfolioData';
import {
  positions,
  education,
  certifications,
  publications,
  skills,
  awards,
  academicProjects,
  teaching,
  partTimeJobs,
  groupActivities,
  mentoring,
  researchExchange,
  workProjects,
} from '../data/detailedCareerData';

interface MigrationItem {
  [key: string]: any;
}

async function migrateCollection(
  collectionName: string,
  data: MigrationItem[],
  idField: string = 'id'
) {
  console.log(`Migrating ${collectionName}...`);

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const docId = item[idField] || `${collectionName}-${i}`;

    try {
      const docRef = doc(collection(db, collectionName), docId);
      await setDoc(docRef, {
        ...item,
        _id: docId,
        order: i, // For drag-and-drop ordering
        migratedAt: new Date().toISOString(),
      });
      console.log(`  ✓ Migrated ${docId}`);
    } catch (error) {
      console.error(`  ✗ Failed to migrate ${docId}:`, error);
    }
  }

  console.log(`✅ ${collectionName}: ${data.length} items migrated\n`);
}

export async function migrateAllData() {
  console.log('🚀 Starting Firebase migration...\n');

  try {
    // Portfolio items
    await migrateCollection('portfolio_items', portfolioData, 'id');

    // Career data
    await migrateCollection('positions', positions);
    await migrateCollection('education', education);
    await migrateCollection('certifications', certifications);
    await migrateCollection('publications', publications);
    await migrateCollection('skills', skills);
    await migrateCollection('awards', awards);
    await migrateCollection('academicProjects', academicProjects);
    await migrateCollection('teaching', teaching);
    await migrateCollection('partTimeJobs', partTimeJobs);
    await migrateCollection('groupActivities', groupActivities);
    await migrateCollection('mentoring', mentoring);
    await migrateCollection('researchExchange', researchExchange);
    await migrateCollection('workProjects', workProjects);

    console.log('🎉 Migration completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Check Firebase Console to verify data');
    console.log('2. Update Security Rules if needed');
    console.log('3. Deploy the updated app');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// Export for manual execution
if (typeof window !== 'undefined') {
  (window as any).migrateToFirebase = migrateAllData;
  console.log('Migration function loaded. Run: migrateToFirebase()');
}
