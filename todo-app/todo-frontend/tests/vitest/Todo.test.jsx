import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Todo from "../../src/Todos/Todo";

describe("Todo component", () => {
  it("renders todo text", () => {
    const todo = { text: "Buy milk", done: false };
    // give functions to Todo.

    const onClickDelete = (todo) => () => {
      // mock
    };

    const onClickComplete = (todo) => () => {
      // mock
    };

    render(
      <Todo
        todo={todo}
        onClickDelete={onClickDelete}
        onClickComplete={onClickComplete}
      />
    );
    expect(screen.getByText("Buy milk")).not.toBeNull();
  });
});
