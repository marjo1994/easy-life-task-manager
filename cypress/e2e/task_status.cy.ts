describe("E2E: task status update via mocked GraphQL API", () => {
  it("moves the task from TODO to DONE using API mocks", () => {
    const taskId = "task-123";
    const taskName = "Mi tarea de ejemplo";

    cy.intercept(
      "POST",
      "https://syn-api-prod.herokuapp.com/graphql",
      (req) => {
        if (req.body.operationName === "GetTasks") {
          req.reply({
            statusCode: 200,
            body: {
              data: {
                tasks: [
                  {
                    id: taskId,
                    name: taskName,
                    status: "TODO",
                    position: 1,
                    assignee: null,
                    dueDate: null,
                    pointEstimate: null,
                    tags: [],
                  },
                ],
              },
            },
          });
        }
      }
    ).as("getTasksInitial");

    cy.visit("http://localhost:5173");
    cy.wait(3000);
    cy.wait("@getTasksInitial");

    cy.get(`[data-cy-id="${taskId}"]`)
      .parents('[data-cy="column-TODO"]')
      .should("exist");

    cy.intercept(
      "POST",
      "https://syn-api-prod.herokuapp.com/graphql",
      (req) => {
        if (req.body.operationName === "UpdateTask") {
          req.reply({
            statusCode: 200,
            body: {
              data: {
                updateTask: {
                  id: taskId,
                  name: taskName,
                  status: "DONE",
                  position: 1,
                  assignee: null,
                  dueDate: null,
                  pointEstimate: null,
                  tags: [],
                },
              },
            },
          });
        }
      }
    ).as("updateTask");

    cy.window().then((win) => {
      return win.__APOLLO_CLIENT__.mutate({
        mutation: win.gql`
        mutation UpdateTask($input: UpdateTaskInput!) {
          updateTask(input: $input) {
            id
            name
            status
          }
        }
      `,
        variables: {
          input: { id: taskId, status: "DONE" },
        },
      });
    });

    cy.wait("@updateTask");

    cy.intercept(
      "POST",
      "https://syn-api-prod.herokuapp.com/graphql",
      (req) => {
        if (req.body.operationName === "GetTasks") {
          req.reply({
            statusCode: 200,
            body: {
              data: {
                tasks: [
                  {
                    id: taskId,
                    name: taskName,
                    status: "DONE",
                    position: 1,
                    assignee: null,
                    dueDate: null,
                    pointEstimate: null,
                    tags: [],
                  },
                ],
              },
            },
          });
        }
      }
    ).as("getTasksAfter");

    cy.reload();
    cy.wait("@getTasksAfter");

    cy.get(`[data-cy-id="${taskId}"]`)
      .parents('[data-cy="column-DONE"]')
      .should("exist");
  });
});
