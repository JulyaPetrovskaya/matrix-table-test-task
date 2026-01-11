# Matrix Table — Frontend React Test Task

Implementation of a technical assignment for a Frontend React position.

Original task description:  
https://docs.memcrab.com/s/856a01a7-c84c-4753-98e4-ccb1e178b384

Live demo:  
https://julyapetrovskaya.github.io/matrix-table-test-task/

Repository:  
https://github.com/JulyaPetrovskaya/matrix-table-test-task

---

## Overview

This project implements an interactive matrix table with dynamic calculations and user interactions using:

- React
- TypeScript
- React Context API
- Pure CSS (no UI libraries, no styled-components, no CSS-in-JS)

The application allows generating a matrix of random values and performing multiple operations such as sums, percentiles, nearest-value highlighting, heatmaps, and dynamic row management.

---

## Features

### Matrix generation
- Input for number of rows (M) and columns (N)
- Each cell contains a random three-digit number
- Each cell has a unique ID

### Calculations
- Additional column with the sum of each row
- Additional row with the 60th percentile value for each column

### Interactions
- Click on a cell to increase its value by 1
- Hover over a cell to highlight X nearest cells by value
- Hover over a row sum to:
  - Display percentages of each cell relative to the row total
  - Show a heatmap based on the maximum value in the row

### Dynamic rows
- Remove any row
- Add a new row at the end of the table
- All sums, percentiles and highlights are recalculated automatically

---

## Tech Stack

- React
- TypeScript
- Context API
- Vite
- CSS

---

## Running locally

1. Clone the repository:

```bash
git clone https://github.com/JulyaPetrovskaya/matrix-table-test-task.git
cd matrix-table-test-task/matrix-table
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

