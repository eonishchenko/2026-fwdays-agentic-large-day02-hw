---
name: codebase-explore
description: Explores unfamiliar code areas read-only—maps directories, key files, data flow, and cross-package dependencies, then summarizes findings. Use when the user says explore, investigate, how does X work, or wants to understand a module, feature, or file pattern without modifying code.
---

# Skill: Codebase Explorer

## When to use

When you need to understand an unfamiliar area of the codebase.
Triggered by: "explore", "investigate", "how does X work?"

## Inputs

- Area of interest (module, feature, file pattern)

## Steps

1. Identify relevant directory/files using @folder or @codebase
2. Read README or top-level comments in the area
3. Map the key files and their responsibilities
4. Trace data flow: entry point → processing → output
5. Identify dependencies (imports from other packages)
6. Document findings in a summary

## Outputs

- Summary: purpose, key files, data flow, dependencies
- List of related files for deeper investigation

## Safety

- READ-ONLY — do not modify any files during exploration
- Verify findings against actual code, not assumptions
