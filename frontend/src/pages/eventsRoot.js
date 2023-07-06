import React from "react";
import { Outlet } from "react-router-dom";
import EventsNavigation from '../components/EventsNavigation'

export default function EventsRootLayout() {
  return (
    <>
      <main>
        <EventsNavigation/>
        <Outlet />
      </main>
    </>
  );
}
