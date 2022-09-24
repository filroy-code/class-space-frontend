import { render, screen } from "react-testing-library";
import { AssignmentPanel } from "../components/AssignmentPanel";

describe("AssignmentPanel", () => {
  it("displays a list of assignments", () => {
    const { getByTestId } = render(<AssignmentPanel></AssignmentPanel>);
  });
});
