"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { user } from "@/server/queries/queries";
import { useToast } from "@/hooks/use-toast";
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
        console.log(schedule);
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

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <div className="text-3xl">{session?.user?.name} Schedules</div>
      {userData && userData.length > 0 ? (
        <div className="grid grid-cols-4">
          {userData.map((scheduleItem) => (
            <div
              className="flex flex-col border border-black text-center"
              key={scheduleItem.classId}
            >
              <p className="text-xl font-semibold">
                {scheduleItem.scheduleName}
              </p>
              <div>
                <div>
                  <span className="font-bold">{scheduleItem.courseName}</span> -
                  <span className="font-bold">
                    {scheduleItem.classDayOfWeek}
                  </span>{" "}
                  from{" "}
                  <div>
                    <span className="font-bold">
                      {scheduleItem.classStartTime}
                    </span>{" "}
                    to
                    <span className="font-bold">
                      {scheduleItem.classEndTime}
                    </span>
                  </div>
                </div>
              </div>
              at {scheduleItem.classLocation}
            </div>
          ))}
        </div>
      ) : (
        <p>No schedule available.</p>
      )}
    </div>
  );
};

export default Display;
