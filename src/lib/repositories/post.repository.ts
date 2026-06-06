import "server-only";
// Legacy file — not used by the e-commerce feature set.
// Stubbed out for MVP 1 alongside the Firebase suspension.
// Restore when Firebase credentials are added.

import type { Post, CreatePostInput, UpdatePostInput } from "@/types";

export const postRepository = {
  async findAll(_filters?: { published?: boolean }): Promise<Post[]> {
    return [];
  },
  async findById(_id: string): Promise<Post | null> {
    return null;
  },
  async create(_input: CreatePostInput): Promise<Post> {
    throw new Error("postRepository.create: Firebase not connected in MVP 1");
  },
  async update(_id: string, _input: UpdatePostInput): Promise<void> {},
  async delete(_id: string): Promise<void> {},
};
