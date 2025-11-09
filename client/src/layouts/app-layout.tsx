import AppWrapper from "@/components/app-wrapper";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <AppWrapper>
      <div className="h-full">
        {/* ChatList */}
        <Outlet />
      </div>
    </AppWrapper>
  );
};

export default AppLayout;
