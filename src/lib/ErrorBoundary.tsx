import React, { Component, ErrorInfo, ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
interface Error {
  message?: string;
  prevBoundary?: JSX.Element;
}
const ErrorFallback = ({ error }: { error: Error }) => {
  return (
    <div role="alert">
      <p>Something went wrong</p>
      <pre>{error.message}</pre>
      <button onClick={() => error.prevBoundary}>Try again</button>
    </div>
  );
};
export { ErrorFallback };
