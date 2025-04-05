# Optikos - Data Visualization

## Run the project

- pnpm dev
- http://localhost:5173/

## Data

- I noticed duplicate data and assumed this was part of the evaluation. I removed the duplicates but that is an assumption.
- The mocks appeared to ignore the `privacy_declarations` level in the data hierarchy. I included it but that might not be necessary.

## App Structure

- I did not include routing as that felt out of scope for this project.
- Hamburger menu in the top left of the app will switch between the view outlined in the instructions and a tree view.
- The data is hierarchical so I thought it might be helpful to display it as a tree view as well. This view was done quickly to demonstrate an idea and there are some issues like truncated text.

## Controls

- Added the ability to show / hide data categories, subjects, and uses.
- Added the ability to filter privacy declarations by name.

## Utility Functions

- Generated most of these functions using AI and edited as needed.
- Ignored some TS errors for time consideration.
