// ─── Firestore Document Shapes ───────────────────────────────────────────────
// These mirror the raw Firestore structure (server-only, used in repositories).
// Timestamps are converted to ISO strings before leaving the server layer.

export interface PostFirestoreDoc {
  title: string;
  content: string;
  authorId: string;
  published: boolean;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

// ─── Application Models (serializable — safe for Server→Client boundary) ─────

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  published: boolean;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export type CreatePostInput = Omit<Post, "id" | "createdAt" | "updatedAt">;
export type UpdatePostInput = Partial<
  Pick<Post, "title" | "content" | "published">
>;
