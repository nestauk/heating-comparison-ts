import React, {} from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { mount, ReactWrapper } from 'enzyme';
import { Period, Unit } from "calculator";
import { Button, RadioGroup, TextField } from "@mui/material";
import { Report } from "Report";
import { createWaitForElement } from 'enzyme-wait';
import { InputUsage } from "InputUsage";

test("renders button to help estimate", () => {
  render(<App />);
  const linkElement = screen.getByText(/Help me estimate/i);
  expect(linkElement).toBeInTheDocument();
});


describe("Usage input, typical bill amount", () => {
  it("Should capture usage correctly and report", async () => {
      const usage = { value: 95, period: Period.Month, units: Unit.GBP };

      const wrapper = mount(
        <App/>
      );
      const inputUsage = wrapper.find(InputUsage);
      const usageInput = inputUsage.find(TextField).at(0);
      const unitInput = inputUsage.find(RadioGroup).at(0);
      const periodInput = inputUsage.find(RadioGroup).at(1);
      const button = inputUsage.find(Button).at(1);
      usageInput.simulate('change', {target: {value: 95}});
      unitInput.simulate('change', {target: {value: Unit.GBP}});
      periodInput.simulate('change', {target: {value: Period.Quarter}});

      wrapper.update();

      await submit(inputUsage, Button);

      wrapper.update();

      const report = wrapper.find(Report).at(0);

      expect(report).toBeDefined;
      // TODO - currently this test does not produce the conditions to display
      // the report or validate it appears
  });
});


test("submit usage, no value entered", () => {
  

  // toHaveErrorMessage('Invalid usage, please enter a non-zero value')
});

test("submit usage, too low", () => {
  // { value: 95, period: Period.Year, units: Unit.GBP })).toHaveErrorMessage('Invalid usage, please enter a non-zero value')
});



export default async function submit(component: ReactWrapper<any, any>, selector: any) {
  const find = createWaitForElement(selector);
  await find(component);
  const element = component.find(selector);
  element.simulate('submit');
}

