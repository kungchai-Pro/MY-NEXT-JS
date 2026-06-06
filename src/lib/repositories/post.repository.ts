import "server-only";

import { FieldValue, Timestamp } from "firebase-admin/firestore";
import type {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import type {
  Post,
  PostFirestoreDoc,
  CreatePostInput,
  UpdatePostInput,
} from "@/types";

const COLLECTION = "posts";

// ─── Converter ───────────────────────────────────────────────────────────────
// Firestore converter gives end-to-end type safety on every read.
// Timestamps are serialized to ISO strings so data crosses the
// Server → Client boundary without losing type information.

const postConverter: FirestoreDataConverter<Post> = {
  toFirestore(post: Post) {
    // Strip id and date strings — Firestore manages these
    const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = post;
    return rest;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Post {
    const data = snapshot.data() as PostFirestoreDoc;
    return {
      id: snapshot.id,
      title: data.title,
      content: data.content,
      authorId: data.authorId,
      published: data.published,
      createdAt: data.createdAt.toDate().toISOString(),
      updatedAt: data.updatedAt.toDate().toISOString(),
    };
  },
};

const postsRef = () =>
  adminDb.collection(COLLECTION).withConverter(postConverter);

// ─── Repository ──────────────────────────────────────────────────────────────

export const postRepository = {
  async findAll(filters?: { published?: boolean }): Promise<Post[]> {
    let query = postsRef().orderBy("createdAt", "desc");
    if (filters?.published !== undefined) {
      query = query.where("published", "==", filters.published) as typeof query;
    }
    const snap = await query.get();
    return snap.docs.map((doc) => doc.data());
  },

  async findById(id: string): Promise<Post | null> {
    const snap = await postsRef().doc(id).get();
    return snap.exists ? snap.data() ?? null : null;
  },

  async create(input: CreatePostInput): Promise<Post> {
    const now = FieldValue.serverTimestamp() as unknown as Timestamp;
    const ref = await adminDb.collection(COLLECTION).add({
      ...input,
      createdAt: now,
      updatedAt: now,
    });
    const snap = await ref.withConverter(postConverter).get();
    if (!snap.exists) throw new Error("Post not found after create");
    return snap.data()!;
  },

  async update(id: string, input: UpdatePostInput): Promise<void> {
    await adminDb
      .collection(COLLECTION)
      .doc(id)
      .update({ ...input, updatedAt: FieldValue.serverTimestamp() });
  },

  async delete(id: string): Promise<void> {
    await adminDb.collection(COLLECTION).doc(id).delete();
  },
};
