"use server"

type SetVisitedUserProps = {
    userId: string | undefined;
    postId: string;
  };

export async function AddView({ userId, postId }: SetVisitedUserProps) {
    try {
      const response = await fetch("/api/add-view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, postId }),
      });
    } catch (error) {
      console.log(error);
    }
  
    return null;
  }
  