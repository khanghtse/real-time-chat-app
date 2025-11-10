import AppWrapper from "@/components/app-wrapper";
import ChatList from "@/components/chat/chat-list";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <AppWrapper>
      <div className="h-full">
        <div className="block">
          <ChatList/>
        </div>
        <div>
          <Outlet />
        </div>
        
      </div>
    </AppWrapper>
  );
};

export default AppLayout;
