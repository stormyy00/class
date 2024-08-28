"use server";
import { db } from "../db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth";
import { schedules, classes } from "../db/schema";
import { sql } from "drizzle-orm";

export async function createClass({
  courseId,
  startTime,
  endTime,
  dayOfWeek,
  location,
}: {
  courseId: string;
  startTime: string;
  endTime: string;
  dayOfWeek: string;
  location: string;
}): Promise<string> {
  try {
    const result = await db
      .insert(classes)
      .values({
        courseId,
        startTime,
        endTime,
        dayOfWeek,
        location,
      })
      .returning({ id: sql`id` })
      .execute();

    if (result && result.length > 0) {
      const id = result[0]?.id;
      if (id && typeof id === "string") {
        return id;
      }
    }

    throw new Error("Failed to create class");
  } catch (error) {
    console.error("Error creating class:", error);
    throw error;
  }
}

export async function createSchedule({
  classId,
  scheduleName,
}: {
  classId: string;
  scheduleName: string;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  const userId = session.user.id;
  console.log("Creating schedule with:", { userId, classId, scheduleName });

  if (!classId) {
    throw new Error("classId cannot be null");
  }

  await db.insert(schedules).values({
    userId,
    classId,
    scheduleName,
  });
}
