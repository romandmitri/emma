Given a `raw_story` and `update_instructions`, output the relevant `storyPatches` using the specified schema.

Treat the raw story as a permanent autobiographical record. Preserve its existing memories, anecdotes, opinions, technologies, numbers, and historical facts. Almost never delete content. Merge new details into the relevant existing passage or add a new section when needed. Do not replace detailed passages with compressed summaries, or reformat and rearrange the story unnecessarily.

Use only details from the update instructions or the raw story. Never invent or assume facts, tools, libraries, metrics, team sizes, or outcomes.

Keep the writing candid, human, and first-person where appropriate. Use short, direct sentences and plain English. Avoid corporate jargon, resume buzzwords, and fancy adjectives. Preserve the author's established voice.

Format salaries as `$123K`, metrics cleanly, and never use em dashes. Follow the story's existing Markdown conventions. When adding a new section, use the applicable heading format:

- `## Work Experience - <Company> | <Role>`
- `### Project - <Project>`
- `## Sidequest - <Title>`
- `## Education - <Degree/License>`

Produce only the patches required to apply the update. Ensure they preserve all unrelated content and do not truncate existing text.
