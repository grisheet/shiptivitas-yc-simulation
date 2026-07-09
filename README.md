# Shiptivitas — YC x Forage Software Engineer Job Simulation

> **Completed:** July 9, 2026 | **Issued by:** Forage x Y Combinator

This repository contains all the work completed during the **Y Combinator "Working as a Software Engineer at a Start Up"** job simulation on Forage. The simulation covered full-stack development, backend engineering, SQL analytics, and startup application writing.

---

## Tasks Completed

### Task 1 — Frontend Updates (React)

Updated the Shiptivitas Kanban board frontend with drag-and-drop functionality using `react-beautiful-dnd`. Cards can be moved between swimlanes (Backlog, In Progress, Complete) and reordered within lanes.

**Key file:** `src/Board.js`

### Task 2 — Backend Integration (Node.js + SQLite)

Built a full Node.js/Express backend that persists card state to a SQLite database. Every drag-and-drop event triggers a `PUT /api/clients/:id` call, saving the new status and priority so state survives page refreshes.

**Key file:** `index.js`

**API Endpoints:**
- `GET /api/clients` — fetch all clients ordered by priority
- `PUT /api/clients/:id` — update a client's status and priority

### Task 3 — Analytics (SQL)

Wrote SQL queries against the Shiptivitas database to measure the impact of the new card feature on daily active users and card engagement.

**Key file:** `analytics/answer.sql`

**Queries:**
1. Daily average active users before vs after feature launch
2. Number of status changes per card
3. Cards distribution across swimlanes
4. Velocity tracking — cards completed per day
5. Full board snapshot with ordering

### Task 4 — Startup Application Notes

Researched and documented what makes a strong Y Combinator startup application, covering founder qualities, problem statements, and traction signals.

**Key file:** `applications/yc_startup_notes.md`

---

## Certificate of Completion

![Y Combinator x Forage — Certificate of Completion](Y%20Combinator%20SWE-1.png)

**Program:** Working as a Software Engineer at a Start Up
**Platform:** Forage x Y Combinator
**Completed:** July 9, 2026
**Recipient:** Grisheet

This certificate was awarded upon successful completion of all simulation tasks, demonstrating proficiency in full-stack JavaScript development, SQL analytics, and startup application research.

> Certificate file: [`certificate/Y-Combinator-SWE.md`](certificate/Y-Combinator-SWE.md)

---

## Project Structure

```
shiptivitas-yc-simulation/
├── index.js
├── src/
│   └── Board.js
├── analytics/
│   └── answer.sql
├── applications/
│   └── yc_startup_notes.md
├── certificate/
│   └── Y-Combinator-SWE.md
├── Y Combinator SWE-1.png
└── README.md
```

---

## Skills Demonstrated

- Full-stack JavaScript (React + Node.js)
- REST API design and implementation
- SQLite database integration
- SQL query writing and analytics
- Drag-and-drop UI with persistent state
- Startup application research and writing
