import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { AssignmentPanel } from "../components/AssignmentPanel";
import { SWRConfig } from "swr";
import "@testing-library/jest-dom";

const server = setupServer(
  rest.get(":user/:classID/assignments", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          students: "605",
          id: "605",
          firstname: "Chef",
          lastname: "Lastie",
          email: "jias",
          assignments: "asj",
          admins: "null",
        },
        {
          students: null,
          id: null,
          firstname: null,
          lastname: null,
          email: null,
          assignments: "Recess",
          admins: null,
        },
      ])
    );
  })
);

const fetcher = (...args) => {
  fetch(args).then((response) => response.json());
};

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("AssignmentPanel", () => {
  it("displays a list of assignments", async () => {
    render(
      <SWRConfig value={{ fetcher }}>
        <AssignmentPanel></AssignmentPanel>
      </SWRConfig>
    );
    // await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    const assignmentBox = screen.getByText("Loading...");
    expect(assignmentBox).toBeInTheDocument();
  });
});
