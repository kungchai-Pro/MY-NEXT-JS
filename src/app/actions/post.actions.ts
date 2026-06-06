"use server";

import { revalidatePath } from "next/cache";
import { postRepository } from "@/lib/repositories/post.repository";
import type { CreatePostInput, UpdatePostInput } from "@/types";

export async function createPost(input: CreatePostInput) {
  const post = await postRepository.create(input);
  revalidatePath("/");
  return post;
}

export async function updatePost(id: string, input: UpdatePostInput) {
  await postRepository.update(id, input);
  revalidatePath("/");
}

export async function deletePost(id: string) {
  await postRepository.delete(id);
  revalidatePath("/");
}
