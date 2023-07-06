import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Events, { loader as eventsLoader } from "./pages/events";
import EventDetails, {
  loader as eventDetailsLoader,
  action as deleteEventAction,
} from "./pages/eventDetails";
import NewEvent from "./pages/newEvent";
import EditEvent from "./pages/editEvent";
import RootLayout from "./pages/root";
import EventsRootLayout from "./pages/eventsRoot";
import Error from "./pages/error";
import { action as manipulateEventAction } from "./components/EventForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <Events />,
            loader: eventsLoader,
            //keep the loader function is the element it is implemented in.
          }, 
          {
            path: ":eventId",
            id: "event-details",
            loader: eventDetailsLoader,
            children: [
              {
                index: true,
                element: <EventDetails />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEvent />,
                action: manipulateEventAction,
              },
            ],
          },
          { path: "new", element: <NewEvent />, action: manipulateEventAction },
          //these are relaive path
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
  