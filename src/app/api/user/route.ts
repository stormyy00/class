// import { NextResponse } from "next/server"
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from "@/server/auth"; // Adjust this path to where your authOptions are defined

// export async function GET(request: NextRequest) {
//   try {
//     // Get session to verify user authentication
//     const session = await getServerSession(authOptions);

//     if (session?.user) {
//       return NextResponse.json({ userId: session.user });
//     } else {
//       return NextResponse.json({ message: 'No active session' }, { status: 401 });
//     }
//   } catch (error) {
//     console.error("Error handling GET request:", error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }
