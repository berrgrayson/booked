"use server";

import { createAdminClient, createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";

async function createSession(previousState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      error: "Please fill out all fields",
    };
  }

  try {
    // Get account instance with admin client
    const { account } = await createAdminClient();

    // Generate session
    const session = await account.createEmailPasswordSession(email, password);

    // Create cookie
    (await cookies()).set("appwrite-session", session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(session.expire),
      path: "/",
    });

    // Get user details with session client
    const { account: sessionAccount } = await createSessionClient(
      session.secret
    );
    const user = await sessionAccount.get();

    return {
      success: true,
      userName: user.name || user.email || "User", // Fallback to email or "User"
    };
  } catch (error) {
    console.log("Authentication Error: ", error);
    return {
      error: "Invalid Credentials",
    };
  }
}

export default createSession;
