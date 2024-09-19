import { db } from "@/server/db";
import { compare, hash } from "bcrypt";
import { users } from "@/server/db/schema";
import { signIn } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signinUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const res = await signIn("credentials", {
    redirect: false, // Prevent automatic redirect for custom handling
    email,
    password,
  });

  if (res?.error) {
    // Return or handle the error (e.g., show toast notification)
    return { error: res.error };
  }

  // Handle success (e.g., redirect or show success message)
  return { success: true };
}

export async function signupUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  // Check if the user already exists in the database
  const existingUser = await db.query.users.findFirst({
    // If user exists, try to sign them in
    where: (users, { eq }) => eq(users.email, email),
  });

  if (existingUser) {
    // If user already exists, return an error
    await signIn("credentials", {
      redirect: false, // Prevent automatic redirect for custom handling
      email,
      password,
    });
    return { error: "Account already exists. Please sign in." };
  }

  // Hash the password before storing it
  const hashedPassword = await hash(password, 10);

  // Insert the new user into the database
  const [newUser] = await db
    .insert(users)
    .values({
      name: name,
      email: email,
      password: hashedPassword,
    })
    .returning();

  if (!newUser) {
    return { error: "Failed to create user. Please try again." };
  }

  // After successful sign-up, auto-sign in the user
  const res = await signIn("credentials", {
    redirect: false, // Prevent automatic redirect for custom handling
    email: email,
    password: password,
  });

  if (res?.error) {
    return { error: res.error };
  }

  // Success: User is signed in and redirected
  return { success: true };
}
