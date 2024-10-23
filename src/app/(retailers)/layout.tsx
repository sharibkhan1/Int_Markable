import React from 'react';
import Sidebar from '@/components/sidebar';
import AlertContainer from '@/components/stateMangement/alert-contaienr';
import InfoBar from '@/components/infobar';

type Props = { children: React.ReactNode };

const Layout = (props: Props) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
      <div className="sticky top-0 z-10">
          <InfoBar />
        </div>
        <AlertContainer /> {/* Include AlertContainer here */}
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
