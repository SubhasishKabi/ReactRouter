import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  redirect,
} from "react-router-dom";
import { json } from "body-parser";

import classes from "./EventForm.module.css";

//this is props destructuring
//props.event
function EventForm({ method, event }) {
  const navigate = useNavigate();
  //useNavigate is used to navigate to different linka

  function cancelHandler() {
    navigate("..");
  }
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  //useNavigation is mostly used while form submission etc

  const data = useActionData();

  return (
    //this is an inbuilt form copmonent. it will send the data to 'action' function
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => {
            return <li key={err}>{err}</li>;
          })}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

//---------------------------------------------------------------------------------------------------/////////

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData(); //inbuilt property
 
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = `http://localhost:8080/events`;

  if (method === "PATCH") {
    const eventId = params.eventId;
    url = `http://localhost:8080/events/${eventId}`;
  }

  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(eventData),
    headers: {
      "Content-type": "application/json",
    },
  });


  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save event" }, { status: 500 });
  }

  return redirect("/events");
}
