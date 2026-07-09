-- Shiptivitas Analytics Queries
-- Y Combinator x Forage Software Engineer Job Simulation
-- Task 3: SQL Analytics

-- ============================================
-- Query 1: Count cards by status
-- Shows distribution of work across swimlanes
-- ============================================
SELECT
  status,
  COUNT(*) AS card_count,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM cards), 1) AS percentage
FROM cards
GROUP BY status
ORDER BY
  CASE status
    WHEN 'backlog' THEN 1
    WHEN 'in-progress' THEN 2
    WHEN 'done' THEN 3
  END;

-- ============================================
-- Query 2: Cards moved to 'done' in last 7 days
-- Tracks recent team velocity
-- ============================================
SELECT
  id,
  title,
  status,
  updated_at
FROM cards
WHERE status = 'done'
  AND updated_at >= datetime('now', '-7 days')
ORDER BY updated_at DESC;

-- ============================================
-- Query 3: Average time cards spend in each status
-- Uses updated_at as proxy for time-in-status
-- ============================================
SELECT
  status,
  COUNT(*) AS total_cards,
  MIN(created_at) AS earliest_created,
  MAX(updated_at) AS latest_updated
FROM cards
GROUP BY status;

-- ============================================
-- Query 4: Cards currently in progress
-- Used for daily standup reporting
-- ============================================
SELECT
  id,
  title,
  position,
  created_at
FROM cards
WHERE status = 'in-progress'
ORDER BY position ASC;

-- ============================================
-- Query 5: Full board snapshot with ordering
-- Complete state for dashboard rendering
-- ============================================
SELECT
  id,
  title,
  status,
  position,
  created_at,
  updated_at
FROM cards
ORDER BY
  CASE status
    WHEN 'backlog' THEN 1
    WHEN 'in-progress' THEN 2
    WHEN 'done' THEN 3
  END,
  position ASC;
