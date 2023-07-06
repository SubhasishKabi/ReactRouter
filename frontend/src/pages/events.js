import { useEffect, useState } from "react";
import { useLoaderData, json } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();

  // if (data.isError) {
  //   return <p> {data.message}</p>;
  // }
  const fetchedEvents = data.events;

  return (
    <>
      <EventsList events={fetchedEvents} />
    </>
  );
}

export default EventsPage;

//loader function to load all events

export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    //return { isError: true, message: "Could not fetch events" };
    //we return an response

    //throw {message: 'Could not fetch events'}

    // throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
    //   status: 500,
    // });

    throw json({ message: "Could not fetch events" }, { status: 500 });
    
    //this thrown data can be caught in the error component
  } else {
    // const resData = await response.json();
    // return resData.events;

    //or

    //data is automatically extraced by react. hence we need not write await response.json()
    return response;

    //the returned data can be accesses by all the components that is peresent in the assigned element
  }
}

/*

//WITHOUT USING LOADER FUNCTION

function EventsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState();
  const [error, setError] = useState();

  //here the fetch is performed after the coponent in rendered. this might not be optimal for big applications.
  //hence we use LOADER to perform some action.i.e in this case it is fetch, before the component is rendered by react
  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/events");

      if (!response.ok) {
        setError("Fetching events failed.");
      } else {
        const resData = await response.json();
        //redData is an object containing an array of events
        // console.log(resData)
        setFetchedEvents(resData.events);
      }
      setIsLoading(false);
    }

    fetchEvents();
  }, []);
  return (
    <>
      <div style={{ textAlign: "center" }}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
      {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />}
    </>
  );
}

export default EventsPage;


*/
