import { getSingleUser } from "@/app/actions/get-single-user";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const user = await getSingleUser(params.id);
  return (
    <div className="m-40">
      <div>{user?.email}</div>
      <div>
        Friends:
        <ul>
          {user?.friends?.map((friend) => (
            <li key={friend.id} className="bg-yellow-400 flex justify-between ">
              <div>{friend.email}</div>
              <Link href={"/pages/profile/" + friend.id}>
                View their profile
              </Link>
            </li>
            // Display each friend's email
          ))}
        </ul>
      </div>
      <div>
        Friend Of:
        <ul>
          {user?.friendOf?.map((friend) => (
            <li key={friend.id} className=" bg-orange-700 flex justify-between">
              <div>{friend.email}</div>
              <Link href={"/pages/profile/" + friend.id}>
                View their profile
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default page;
