# Reminder: Debugging Job Matching (Phase 4)

## Problem
Job recommendations are showing a "Failed to load" error in production with an `Adzuna API error 400`.

## Current Progress
- Refactored Skills/Strengths/Languages to Rich Text.
- Updated `job-matcher.ts` and `adzuna.ts` to handle HTML keywords.
- Added dynamic country detection (mapping "India" -> "in").
- Added credential trimming and User-Agent headers.

## To-Do (Next Session)
1. **Check Vercel Logs**: Look for the `Calling Adzuna API:` log to see the generated URL.
2. **Verify Adzuna Account**: Check if the keys work for the `in` (India) endpoint.
3. **Simulate in Local**: Try to reproduce the 400 error by using the same "Hyderabad, India" parameters locally.

## Context
Resume ID: `cmk2l6lk9000011vzechlhlzk`
Location: Hyderabad, India
Last Commit: `acaabf1`
