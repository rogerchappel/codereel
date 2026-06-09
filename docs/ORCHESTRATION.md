# Orchestration

`codereel` is intended to run inside a release or launch-prep agent workflow.

1. Inspect the repository with `codereel inspect`.
2. Review `claims.json` before using generated copy externally.
3. Run `codereel verify` after editing the storyboard.
4. Export frames only after unsupported claims have been removed or grounded.
5. Hand `storyboard.json` to a renderer, video editor, or downstream media agent.

## Side Effects

The CLI only reads the target repository and writes files under the chosen output directory. It does not call external services, publish media, mutate the inspected repo, or execute package scripts except for allow-listed command detection.

## Approval Boundaries

Agents must ask for approval before cloning remote repositories, running generated demo commands against live services, calling video providers, or posting the resulting assets.
