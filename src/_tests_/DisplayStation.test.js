import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import DisplayStation from "../Components/Radio/DisplayStation/DisplayStation";

describe("DisplayStation", () => {
  const validProps = {
    currentStation : [
      {
        id: "test id",
        name: "test name",
        favicon: "test_favicon.jpg",
        urlResolved: "url 1"
      }
    ],
    onPresetSaveClicked: jest.fn(),
    onPresetRemoveClicked: jest.fn(),
    presets: []  
  }

  test("renders correctly", () => {
    const { asFragment } = render(<DisplayStation
      currentStation = {validProps.currentStation}
      onPresetSaveClicked = {validProps.onPresetSaveClicked}
      onPresetRemoveClicked = {validProps.onPresetRemoveClicked}
      presets = {validProps.presets}
    />)
    
    expect(asFragment()).toMatchSnapshot();
  })
})

describe("Save preset function", () => {
  const validProps = {
    userID: "test userID",
    tuned: true,
    currentStation : [
      {
        id: "test id",
        name: "test name",
        favicon: "test_favicon.jpg"
      }
    ],
    onPresetSaveClicked: jest.fn(),
    onPresetRemoveClicked: jest.fn(),
  }

  test("preset save clicked calls correct function", async () => {
    render(<DisplayStation
      userID = {validProps.userID}
      tuned = {validProps.tuned}
      currentStation = {validProps.currentStation}
      onPresetSaveClicked = {validProps.onPresetSaveClicked}
      onPresetRemoveClicked = {validProps.onPresetRemoveClicked}
      presets = {[]}
    />)

    const button = screen.getByTestId("save_preset")
    await fireEvent.click(button)

    expect(validProps.onPresetSaveClicked).toHaveBeenCalledTimes(1)    
  })

})

describe("Remove preset function", () => {
  const validProps = {
    userID: "test userID",
    tuned: true,
    currentStation : [
      {
        id: "test id",
        name: "test name",
        favicon: "test_favicon.jpg"
      }
    ],
    onPresetSaveClicked: jest.fn(),
    onPresetRemoveClicked: jest.fn(),
  }

  xtest("remove save clicked calls correct function", async () => {
    const presets = [
      {
        id: "test id",
        name: "test name",
        favicon: "test_favicon.jpg"
      }
    ]

    render(<DisplayStation
      userID = {validProps.userID}
      tuned = {validProps.tuned}
      currentStation = {validProps.currentStation}
      onPresetSaveClicked = {validProps.onPresetSaveClicked}
      onPresetRemoveClicked = {validProps.onPresetRemoveClicked}
      presets = {presets}

    />)

    const button = screen.getByTestId("remove_preset")
    await fireEvent.click(button)

    expect(validProps.onPresetRemoveClicked).toHaveBeenCalledTimes(1)    
  }) 


})


