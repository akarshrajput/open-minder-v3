"use server";

import { signIn, signOut } from "./auth";

export async function signInAction() {
  await signIn("google", { redirectTo: "/" });
}

export async function signInGithub() {
  await signIn("github", { redirectTo: "/" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
