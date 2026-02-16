import { useState, useEffect } from 'react';
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface FirestoreItem {
  _id: string;
  [key: string]: any;
}

interface UseFirestoreOptions {
  orderByField?: string;
  orderDirection?: 'asc' | 'desc';
}

export function useFirestore<T extends FirestoreItem>(
  collectionName: string,
  options: UseFirestoreOptions = {}
) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Real-time listener
  useEffect(() => {
    const constraints: QueryConstraint[] = [];

    if (options.orderByField) {
      constraints.push(orderBy(options.orderByField, options.orderDirection || 'asc'));
    }

    const q = query(collection(db, collectionName), ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
        })) as T[];
        setItems(data);
        setLoading(false);
      },
      (err) => {
        console.error(`Error fetching ${collectionName}:`, err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, options.orderByField, options.orderDirection]);

  // Add item
  const addItem = async (data: Omit<T, '_id'>): Promise<string> => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return docRef.id;
    } catch (err) {
      console.error(`Error adding item to ${collectionName}:`, err);
      throw err;
    }
  };

  // Update item
  const updateItem = async (id: string, data: Partial<T>): Promise<void> => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, data as any);
    } catch (err) {
      console.error(`Error updating item in ${collectionName}:`, err);
      throw err;
    }
  };

  // Delete item
  const deleteItem = async (id: string): Promise<void> => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error(`Error deleting item from ${collectionName}:`, err);
      throw err;
    }
  };

  // Reorder items (update order field for each item)
  const reorderItems = async (reorderedItems: T[]): Promise<void> => {
    try {
      const updatePromises = reorderedItems.map((item, index) =>
        updateItem(item._id, { order: index } as Partial<T>)
      );
      await Promise.all(updatePromises);
    } catch (err) {
      console.error(`Error reordering items in ${collectionName}:`, err);
      throw err;
    }
  };

  return {
    items,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    reorderItems,
  };
}
