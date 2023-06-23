import React from "react";
import ChangePassword from "../../components/dashboardLayout/profile/changePassword";
import SettingsComponent from "../../components/dashboardLayout/settings";
import LanguageComponent from "../../components/dashboardLayout/profile/language";
import Sidebar from "../../components/_common/sideBar/sidebar";
import PrivateRoute from "../../components/PrivateRoute";

const Profile = () => {
  return (
    <>
      <PrivateRoute>
        <LanguageComponent />
        <ChangePassword />
      </PrivateRoute>
    </>
  );
};
Profile.getLayout = (page) => <Sidebar>{page}</Sidebar>;
export default Profile;
