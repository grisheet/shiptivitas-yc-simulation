# Shiptivitas — YC x Forage Software Engineer Job Simulation

![Certificate of Completion](./certificate/Y-Combinator-SWE.pdf)

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

**Feature Ideas proposed to increase DAU:**
1. Daily Digest Email / Push Notification
2. Card Assignment & @Mention Notifications
3. Progress Streaks & Gamification

### Task 4 — YC Startup Application Notes
Researched and wrote personalised outreach notes to three YC startups matching my full-stack skill set.

**Key file:** `applications/yc_startup_notes.md`

**Startups targeted:**
- Substack (YC W18)
- Swif.ai (YC S22)
- Cuckoo (YC W25)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, react-beautiful-dnd |
| Backend | Node.js, Express |
| Database | SQLite3 |
| Analytics | SQL |
| Styling | CSS |

---

## Project Structure

```
shiptivitas-yc-simulation/
├── index.js                  # Express backend server
├── src/
│   └── Board.js              # React Kanban board with drag-and-drop
├── analytics/
│   └── answer.sql            # SQL queries for DAU and card activity
├── applications/
│   └── yc_startup_notes.md   # Personalised notes to 3 YC startups
├── certificate/
│   └── Y-Combinator-SWE.pdf  # Certificate of completion
└── README.md
```

---

## Certificate of Completion

Issued by Forage on July 9th, 2026.

- **Enrolment Verification Code:** `6a4d0442b8122bb0e5e5de2d`
- **User Verification Code:** `69c1d8b61f80e1537fa76202`

See [`certificate/Y-Combinator-SWE.pdf`](./certificate/Y-Combinator-SWE.pdf) for the full certificate.

---

## Skills Demonstrated

- Full-stack JavaScript (React + Node.js)
- REST API design and implementation
- SQLite database integration
- SQL query writing and analytics
- Product thinking and feature ideation
- Startup-style rapid development
