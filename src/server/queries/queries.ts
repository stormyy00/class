"use server";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { users, schedules, classes, courses } from "../db/schema";

export async function getCourses() {
  const classes = db.query.courses.findMany({
    orderBy: (model, { asc }) => asc(model.code),
  });
  return classes;
}

export async function user(userId: string) {
  const userExists = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (userExists.length === 0) {
    throw new Error("User not found");
  }

  const userSchedule = await db
    .select({
      scheduleId: schedules.id,
      scheduleName: schedules.scheduleName,
      userId: schedules.userId,
      classId: classes.id,
      courseName: courses.name,
      courseCode: courses.code,
      classStartTime: classes.startTime,
      classEndTime: classes.endTime,
      classDayOfWeek: classes.dayOfWeek,
      classLocation: classes.location,
    })
    .from(schedules)
    .innerJoin(users, eq(users.id, schedules.userId))
    .innerJoin(classes, eq(classes.id, schedules.classId))
    .innerJoin(courses, eq(courses.id, classes.courseId))
    .where(eq(schedules.userId, userId))
    .groupBy(
      schedules.id,
      schedules.scheduleName,
      schedules.userId,
      classes.id,
      courses.name,
      courses.code,
      classes.startTime,
      classes.endTime,
      classes.dayOfWeek,
      classes.location,
    );
  return userSchedule;
}

// interface ClassResult {
//     id: string;
//   }
// export async function createClass({
//     courseId,
//     startTime,
//     endTime,
//     dayOfWeek,
//     location,
// }: {
//     courseId: string;
//     startTime: string;
//     endTime: string;
//     dayOfWeek: string;
//     location: string;
//   }): Promise<string> {
//     try {

//       const result = await db.insert(classes)
//         .values({
//           courseId,
//           startTime,
//           endTime,
//           dayOfWeek,
//           location,
//         })
//         .returning<{ id: string }[]>();

//       if (result.length > 0) {
//         return result[0].id;
//       }

//       throw new Error('Failed to create class');
//     } catch (error) {
//       console.error('Error creating class:', error);
//       throw error;
//     }
//   }

//   export async function createSchedule({
//     classId,
//     scheduleName,
//   }:{
//     classId: string,
//     scheduleName: string,
//   }) {
//     const session = await getServerSession(authOptions);

//     if (!session?.user?.id) {
//       throw new Error('User not authenticated');
//     }

//     const userId = session.user.id;
//     console.log('Creating schedule with:', { userId, classId, scheduleName });

//   if (!classId) {
//     throw new Error('classId cannot be null');
//   }

//     await db.insert(schedules)
//       .values({
//         userId,
//         classId,
//         scheduleName,
//       });
//   }

// export async function createSchedule({ courseId, classId, scheduleName }) {

//     const session = await getServerSession(authOptions);

//     if (!session?.user?.id) {
//       throw new Error('User not authenticated');
//     }

//     const userId = session.user.id;

//     await db.insert(schedules).values({
//       userId,
//       classId,
//       scheduleName
//     });
//   }

// export async function createClassAndSchedule({
//     courseId,
//     startTime,
//     endTime,
//     dayOfWeek,
//     location,
//     scheduleName,
//   }) {
//     const session = await getServerSession(authOptions);

//     if (!session?.user?.id) {
//       throw new Error('User not authenticated');
//     }

//     const userId = session.user.id;

//     // Insert the new class into the classes table
//     const newClass = await db.insert(classes).values({
//       courseId,
//       startTime,
//       endTime,
//       dayOfWeek,
//       location,
//     }).returning('id');

//     const classId = newClass.id;

//     // Insert the schedule using the newly created classId
//     await db.insert(schedules).values({
//       userId,
//       classId,
//       scheduleName,
//     });
//   }
