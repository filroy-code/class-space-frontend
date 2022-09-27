import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { AssignmentPanel } from "../components/AssignmentPanel";
import { SWRConfig } from "swr";
import "@testing-library/jest-dom";
import "whatwg-fetch";

const server = setupServer(
  rest.get(
    "http://localhost:8000/:user/:classID/assignments",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          classInfo: [
            {
              students: null,
              id: null,
              firstname: null,
              lastname: null,
              email: null,
              assignments: "Recess",
              admins: null,
            },
          ],
        })
      );
    }
  )
);

const fetcher = (...args) => {
  fetch(args).then((response) => response.json());
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("AssignmentPanel", () => {
  it("displays a list of assignments", async () => {
    render(
      <SWRConfig value={{ fetcher }}>
        <AssignmentPanel></AssignmentPanel>
      </SWRConfig>
    );
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    const assignmentBox = await screen.findByText("Recess");
    expect(assignmentBox).toBeInTheDocument();
  });

  it("opens new assignment modal", async () => {
    render(
      <div id="portal">
        <SWRConfig value={{ fetcher }}>
          <AssignmentPanel></AssignmentPanel>
        </SWRConfig>
      </div>
    );

    const newAssignmentButton = screen.getByTestId("newAssignmentButton");
    fireEvent.click(newAssignmentButton);
    expect(await screen.findByText("New Assignment:")).toBeInTheDocument();
  });
});
