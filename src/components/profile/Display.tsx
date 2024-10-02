"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { user } from "@/server/queries/queries";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Loading from "../Loading";

const Display = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserSchedule = async () => {
      toast({ title: "Fetching Schedules!" });
      if (!session?.user?.id) {
        setError("User not logged in");
        toast({
          title: "Failed to fetch user schedule!",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      try {
        const schedule = await user(session.user.id);
        // console.log(schedule);
        toast({ title: "✅ Schedules Fetched!" });
        setUserData(schedule);
      } catch (err) {
        setError("Failed to fetch user schedule");
        toast({
          title: "Failed to fetch user schedule!",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadUserSchedule();
  }, [session?.user?.id]);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div className="text-3xl text-red-600">Error: {error}</div>;

  const uniqueScheduleNames = [
    ...new Set(userData?.map((item) => item.scheduleName)),
  ];

  return (
    <div className="flex h-screen w-full flex-col items-center gap-5">
      <div className="text-3xl"> My Schedules</div>

      {userData && uniqueScheduleNames.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {uniqueScheduleNames.map((scheduleName) => {
            const scheduleItems = userData.filter(
              (item) => item.scheduleName === scheduleName,
            );

            return (
              <div
                className="flex flex-col border border-black p-3 text-center"
                key={scheduleName}
              >
                {/* Pass schedule data as query parameters */}
                <Link
                  href={{
                    pathname: `/profile/${scheduleName}`,
                    query: { schedule: JSON.stringify(scheduleItems) },
                  }}
                >
                  <p className="mb-4 cursor-pointer text-xl font-semibold">
                    {scheduleName}
                  </p>
                </Link>

                {scheduleItems.map(
                  ({
                    classId,
                    courseName,
                    classDayOfWeek,
                    classStartTime,
                    classEndTime,
                    classLocation,
                  }) => (
                    <div className="mb-3" key={classId}>
                      <div className="font-bold">{courseName}</div>
                      <div>
                        {classDayOfWeek} from {classStartTime} to {classEndTime}
                      </div>
                      <div>at {classLocation}</div>
                    </div>
                  ),
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p>No schedule available.</p>
      )}
    </div>
  );
};

export default Display;
