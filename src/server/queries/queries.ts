"use server";
import { db } from "../db";

export async function getCourses() {
  const classes = db.query.courses.findMany({
    orderBy: (model, { asc }) => asc(model.code),
  });
  return classes;
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
