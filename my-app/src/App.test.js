import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

test("renders App with correct initial content on page load", () => {
  render(<App />);
  const heading = screen.getByText("Brock Paper Scissors");
  const brockPhoto = screen.getByAltText("It's Brock!");
  const attackButton = screen.getByText("Attack");
  const defendButton = screen.getByText("Defend");
  const playerInstruction = screen.getByText("Choose your Pokémon type!");
  const playerPkmnImg = screen.getByAltText("Player Pokémon");
  const rivalPkmnImg = screen.getByAltText("Rival Pokémon");
  const buttons = screen.getByTestId("button-list");
  const scoresAndShinies = screen.getByTestId("scores-and-shinies");
  expect(heading).toBeInTheDocument();
  expect(brockPhoto).toBeInTheDocument();
  expect(attackButton).toBeInTheDocument();
  expect(defendButton).toBeInTheDocument();
  expect(playerInstruction).toBeInTheDocument();
  expect(playerPkmnImg).toBeInTheDocument();
  expect(rivalPkmnImg).toBeInTheDocument();
  expect(buttons).toBeInTheDocument();
  expect(scoresAndShinies).toBeInTheDocument();
});

test("default brockPhoto and Pokeball images on page load", () => {
  render(<App />);
  const brockPhoto = screen.getByAltText("It's Brock!");
  const playerPkmnImg = screen.getByAltText("Player Pokémon");
  const rivalPkmnImg = screen.getByAltText("Rival Pokémon");
  const brockAttack = "http://localhost/brock-attack.png";
  const pokeball = "http://localhost/pokeball.png";
  expect(brockPhoto.src).toContain(brockAttack);
  expect(playerPkmnImg.src).toContain(pokeball);
  expect(rivalPkmnImg.src).toContain(pokeball);
});

test("round 1, attack mode: when type button clicked, round processed,leading to matching player type update in line 1", async () => {
  render(<App />);
  const electricButton = screen.getByText("ELECTRIC");
  fireEvent.click(electricButton);
  await waitFor(() => {
    expect(screen.getByTestId("p1")).toHaveTextContent(/electric/);
  });
});
cd