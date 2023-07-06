import React from "react";
import { useRouteLoaderData, useParams, redirect } from "react-router-dom";
import EventItem from "../components/EventItem";
import { json } from "body-parser";

export default function EventDetails() {
  const data = useRouteLoaderData("event-details");
  return (
    <> 
      <EventItem event={data.event} />
    </>
  );
}


//loader function to load single event

export async function loader({ request, params }) {
  //react router which calls the loader function, passes an object executin. the on=bject contains req, params
  const id = params.eventId;

  // const response = await fetch(`http://localhost:8080/events/` + id);
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw json( 
      { message: "Could not fetch details for selected event" },
      { status: 500 }
    );
  } else { 
    return response;
  }  
}

export async function action({ request, params }) {
  //react router which calls the action function, passes an object executin. the on=bject contains req, params

  const eventId = params.eventId;
  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      {
        message: " Could not delete event",
      },
      { status: 500 }
    );
  }

  return redirect("/events");
}
