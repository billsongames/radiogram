import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Tuner from "../Components/Radio/Tuner/Tuner";

describe("Tuner", () => {
  const validProps= {
    tunerDisplayData: [
      {
        id: "test id",
        name: "test name 1",
        favicon: "test_favicon 1.jpg",
        urlResolved: "test url 1"
      }
    ],
    onStationLogoClick: jest.fn()
  }


  test("renders correctly" ,() => {
    const { asFragment } = render(<Tuner
      onStationLogoClick={validProps.onStationLogoClick}
    />)

    expect(asFragment()).toMatchSnapshot()
  })


  xtest("tuner renders correctly", () => {

  })

  test("filters render correctly", () => {

  })

  test("handles search submit correctly", () => {

  })

  xtest("click logo calls correct function", () => {

  })
})  