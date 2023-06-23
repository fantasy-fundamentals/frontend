import React from "react";
import SettingsComponent from "../../components/dashboardLayout/settings";
import Sidebar from "../../components/_common/sideBar/sidebar";
import PrivateRoute from "../../components/PrivateRoute";

const Settings = () => {
  return (
    <PrivateRoute>
      <SettingsComponent />
    </PrivateRoute>
  );
};

Settings.getLayout = (page) => <Sidebar>{page}</Sidebar>;
export default Settings;
