import { fireEvent, render, screen } from "utils/test-utils";
import ZustandPage from "./index";

describe("Zustand page", () => {
  it("should plus number", async () => {
    //when
    render(<ZustandPage />);

    //then
    const btn = screen.getByTestId("oneUp");
    fireEvent.click(btn);
    fireEvent.click(btn);
    const text = screen.getByTestId("oneUpText");
    expect(text).toHaveTextContent("3");
  });
});
