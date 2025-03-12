import React from "react";
import Profile from "@app/profile/(components)/Profile";
import { loginIsRequiredServer } from "@utils/auth"; // Import the auth check function

const ProfilePage = async () => {
  await loginIsRequiredServer(); // Ensures user is authenticated before rendering

  return (
    <div>
      <Profile />
    </div>
  );
};

export default ProfilePage;
