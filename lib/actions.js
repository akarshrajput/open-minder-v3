"use server";

import { signIn, signOut } from "./auth";

export async function signInAction() {
  await signIn("google", { redirectTo: "/" }); // Redirect to home if user loggedin successfully
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" }); // Redirect to home if user loggedout successfully
}
