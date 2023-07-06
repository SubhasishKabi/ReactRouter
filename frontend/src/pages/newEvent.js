import React from "react";
import EventForm from "../components/EventForm";
import { json } from "body-parser";
import { redirect } from "react-router-dom";

export default function NewEvent() {
  return <EventForm method="post" />;
}



//action function to create new event

/*

export async function action({ request, params }) {
  const data = await request.formData(); //inbuilt property

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    body: JSON.stringify(eventData),
    headers: {
      "Content-type": "application/json",
    },
  });

  console.log(response.status)
  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save event" }, { status: 500 });
  }

  return redirect("/events");
}

*/