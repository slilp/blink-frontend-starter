import { fireEvent, render, screen } from "utils/test-utils";
import ZustandPage from "./index";
import countStore from "../../zustand/countStore";

describe("Zustand page", () => {
  it("should mock initial store", () => {
    //given
    countStore.setState({ count2: 7777 });

    render(<ZustandPage />);
    const text = screen.getByTestId("twoUpText");
    expect(text).toHaveTextContent("7777");
  });

  it("should plus number", async () => {
    countStore.setState({ count: 2 });

    //when
    render(<ZustandPage />);

    //then
    const btn = screen.getByTestId("oneUp");
    fireEvent.click(btn);
    fireEvent.click(btn);
    const text = screen.getByTestId("oneUpText");
    expect(text).toHaveTextContent("4");
  });
});
