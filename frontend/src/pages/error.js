import React from "react";
import PageContent from "../components/pageContent";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function Error() {
  const error = useRouteError();
  //console.log(error)
  let title = "An error occured";
  let message = "Something went wrong";

  if (error.status === 500) {
    //message = JSON.parse(error.data).message;
    message = error.data.message;
    console.log(message)
  }

  if (error.status === 404) {
    title = "Not found";
    message = "Could not find resource or page";
  }
  return (
    <>
      <MainNavigation></MainNavigation>
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}
