FIXIT — MASTER PROJECT CONTEXT

Project tagline: Understand. Investigate. Verify.
Project type: Windows-focused PC diagnostics and troubleshooting companion
Current stage: Planning and MVP development
Primary goal: Build a genuinely useful, reliable product that can eventually become a serious portfolio project or an independent product.

1. PROJECT OVERVIEW

I am building a project called FixIt.

FixIt is intended to be a Windows-focused intelligent PC diagnostics and troubleshooting application.

Its purpose is to help users understand why their computers are experiencing problems, investigate those problems using actual system data, suggest appropriate solutions, and verify whether those solutions worked.

For example, a user might report:

My laptop has become unusually slow.

My battery drains too quickly.

My laptop overheats.

My computer freezes randomly.

My storage is filling up.

My system crashes frequently.

My laptop performance has decreased over time.

Instead of simply displaying system statistics or giving generic AI-generated advice, FixIt should investigate the reported problem using relevant diagnostic checks.

The application should then:

Understand the user's reported symptoms.

Collect relevant system information.

Run appropriate diagnostic checks.

Identify evidence that may explain the problem.

Present possible causes with supporting evidence.

Recommend safe, understandable troubleshooting steps.

Allow the user to apply approved changes.

Run diagnostic checks again.

Compare the results and determine whether the problem improved.

The central idea is not just monitoring a computer. It is investigating a computer problem and checking whether the proposed solution actually worked.

2. THE PROBLEM WE WANT TO SOLVE

Many existing tools already provide PC monitoring, hardware testing, performance statistics, and troubleshooting.

Examples include:

Dell SupportAssist

HP PC Hardware Diagnostics

Lenovo Vantage

Windows built-in troubleshooters

HWiNFO

CrystalDiskInfo

Windows Reliability Monitor

FixIt must not pretend these products do not exist.

We need to identify a meaningful gap between individual diagnostic utilities and the experience we want to build.

Our potential differentiator is:

Symptom-driven diagnostic orchestration + evidence-based explanations + post-fix verification.

Rather than forcing users to understand multiple tools, FixIt should guide them through a structured investigation.

For example:

A user reports that their laptop is slow.

FixIt might:

Check CPU utilization.

Check RAM utilization.

Identify processes consuming unusually high resources.

Check available storage.

Examine relevant startup applications.

Inspect available system stability information.

Connect the observations to possible causes.

Recommend appropriate actions.

Recheck performance after the user applies a solution.

The system must distinguish between:

Confirmed observations.

Possible explanations.

Unsupported checks.

Recommendations.

Verified improvements.

It must never invent measurements or claim certainty without evidence.

3. TARGET PLATFORM

Initial target: Windows 10/11 computers.

The first version will be Windows-only.

A normal website cannot freely access all the hardware information, running processes, protected system information, and Windows diagnostic data required by this project.

Therefore, FixIt will use a local desktop companion that communicates with its frontend.

We are not initially building a cloud-based application or a multi-platform product.

The first priority is making the Windows version work reliably.

4. PROPOSED TECH STACK

The following is our proposed stack. It is not necessarily final; evaluate alternatives when they genuinely improve the project.

Component

Proposed technology

Frontend

React

Frontend styling

CSS

Desktop/system companion

Python

Local API

FastAPI

System information

psutil, Windows APIs, PowerShell

Local database

SQLite

Charts

Chart.js

Version control

Git and GitHub

Architecture

The intended architecture is:

React frontend
↓
Local FastAPI interface
↓
Python diagnostic engine
↓
Windows system information and diagnostic sources
↓
SQLite for local diagnostic history

The frontend should communicate with the locally running companion.

Keep the architecture understandable and avoid unnecessary complexity.

Do not introduce MongoDB, cloud infrastructure, microservices, or additional technologies unless there is a clear technical reason.

5. INITIAL MVP FEATURES

The first version should focus on a small number of features that actually work.

A. System Health Dashboard

Display useful information such as:

CPU utilization.

RAM utilization.

Running processes.

Storage usage.

Available battery information.

System uptime.

Supported hardware information.

The dashboard should be clean, understandable, and visually appealing.

However, the dashboard is not the main purpose of FixIt.

B. Symptom-Based Investigation

Allow users to select or describe a problem.

Initial categories:

Slow performance.

Battery drain.

Overheating.

Storage problems.

Random crashes.

System instability.

The diagnostic engine should select relevant checks based on the reported symptoms.

C. Diagnostic Engine

This is one of the most important components.

It should:

Collect actual system information.

Execute relevant diagnostic checks.

Interpret the results.

Identify unusual observations.

Associate observations with possible causes.

Provide evidence for its conclusions.

Do not create an AI chatbot that simply guesses what is wrong.

AI may eventually help explain findings, but actual diagnostic evidence must come from the system.

D. Guided Troubleshooting

For every identified issue, provide:

What was detected.

Why it might be happening.

Supporting evidence.

Suggested solution.

Expected outcome.

Risk level.

Users must understand what a suggested action does before applying it.

E. Post-Fix Verification

This is a key differentiating feature.

After a user applies a solution, FixIt should run relevant checks again.

It should compare the previous and current results.

For example:

Before:

RAM utilization: 91%.

Background process consuming excessive memory.

After:

RAM utilization: 64%.

Memory usage decreased.

The application should report whether the measured condition improved.

It must not claim that an issue is fixed merely because a recommendation was followed.

F. Diagnostic History

Store previous investigations locally.

Allow users to see:

Previous problems.

Diagnostic results.

Suggested solutions.

Actions taken.

Before-and-after comparisons.

6. IMPORTANT TECHNICAL AND PRODUCT RULES

These rules must be followed throughout development.

Never fabricate system measurements.

Never claim a diagnostic check succeeded if it was not actually executed.

Clearly identify unsupported hardware information.

Distinguish confirmed findings from possible causes.

Never automatically delete user files.

Never modify the Windows registry without explicit user approval.

Never execute potentially harmful system commands without user consent.

Explain what a diagnostic test does before running it when appropriate.

Allow users to cancel long-running investigations.

Keep user data local by default.

Use minimum required permissions.

Handle errors and unavailable data gracefully.

Do not claim that FixIt has solved a problem without verification.

Reliability and user trust are more important than having a large number of features.

7. DEVELOPMENT ROADMAP

Phase 1 — Research and Planning

Understand the existing PC diagnostic ecosystem.

Study relevant Windows diagnostic capabilities.

Identify what information can be collected without administrator privileges.

Identify information requiring elevated permissions.

Finalize the first MVP features.

Define the architecture.

Phase 2 — Project Setup

Create the GitHub repository.

Set up React.

Set up Python.

Configure FastAPI.

Establish local communication.

Create a clean project structure.

Phase 3 — System Information Collection

Collect CPU information.

Collect RAM information.

Collect storage information.

Collect battery information where supported.

Collect process information.

Handle unsupported data.

Phase 4 — Dashboard

Build the React interface.

Display live system information.

Add appropriate charts.

Add loading and error states.

Connect the frontend to the local API.

Phase 5 — Diagnostic Engine

Implement initial diagnostic checks.

Create symptom-specific investigation workflows.

Store diagnostic results.

Associate findings with supporting evidence.

Phase 6 — Troubleshooting

Generate understandable explanations.

Recommend safe solutions.

Introduce explicit user approval for actions.

Record actions taken.

Phase 7 — Verification

Run relevant checks after troubleshooting.

Compare before-and-after measurements.

Report whether the situation improved.

Handle cases where improvement cannot be confirmed.

Phase 8 — Product Refinement

Add diagnostic history.

Improve error handling.

Improve UI/UX.

Add tests.

Improve security.

Package the desktop companion.

Prepare documentation and demonstrations.

8. PROJECT DEVELOPMENT PHILOSOPHY

I do not want to build a project just to put something on my resume.

I want to build something that could genuinely be useful to people.

The project should eventually demonstrate:

Full-stack development.

Python development.

Operating-system interaction.

System diagnostics.

API development.

Database design.

Software architecture.

Problem-solving.

Testing and reliability.

Potential future integration of machine learning.

However, do not add technologies just to make the project look impressive.

A working, well-engineered product is more valuable than a complicated project with unfinished features.

9. ABOUT ME — THE DEVELOPER

I am an undergraduate ECE student at MNNIT Allahabad, India.

I am interested in software development, machine learning, and understanding how computers work internally.

My current programming and development level is beginner to early intermediate.

I have:

Basic HTML knowledge.

Basic CSS knowledge.

Some JavaScript learning experience.

C++ programming experience.

Basic Git and GitHub familiarity.

A Windows 11 laptop.

A Dell G15 5530.

I have VS Code and Git installed.

I am still learning how to build complete software projects.

Important: Do not assume I already understand advanced development concepts.

I want to understand what I am building, not blindly copy code.

10. HOW I WANT THE AI TO HELP ME

This section is extremely important.

Act as my:

Technical mentor.

Software architect.

Project planner.

Programming tutor.

Debugging assistant.

Product development advisor.

Follow these instructions:

A. Teach me, don't just give me code

Whenever you introduce a new technology or concept:

Explain what it is.

Explain why we need it.

Explain how it works.

Show how it fits into FixIt.

Give beginner-friendly examples.

Avoid unnecessary jargon.

B. Work incrementally

Do not give me an enormous implementation all at once.

Divide development into small, achievable tasks.

For every task, explain:

What we are building.

Why we are building it.

Which files are involved.

What the code does.

How to run it.

How to test it.

What successful output should look like.

Do not move to the next major task until the current one is understood and reasonably working.

C. Be honest and critical

Do not agree with every idea I suggest.

If a feature is unnecessary, say so.

If an architecture is unnecessarily complicated, simplify it.

If FixIt does not have a meaningful advantage over existing tools, explain that honestly.

Prioritize actual usefulness over impressive-sounding features.

D. Give precise coding instructions

When suggesting code changes:

Mention the exact filename.

Explain where the code belongs.

Avoid unexplained code.

Prefer simple implementations initially.

Explain important functions and logic.

Avoid changing unrelated files.

E. Help me use AI coding tools properly

I may use Google Antigravity or other AI coding agents alongside ChatGPT.

When appropriate, provide a precise prompt that I can give to an AI coding agent.

The prompt should clearly specify:

The task.

The files it may modify.

The expected behavior.

Technical restrictions.

What it must not change.

How it should test its work.

What it should report after completion.

Do not let a coding agent rewrite the entire project unnecessarily.

F. Maintain project continuity

This is essential because I may move between different AI chats or different AI platforms.

At the end of every significant development session, create a concise PROJECT HANDOFF UPDATE containing:

Current project stage.

What has been completed.

Files created or modified.

Technologies and architecture decisions.

Features currently working.

Bugs and unresolved issues.

Decisions made and their reasoning.

Next exact development task.

Commands needed to run the project.

Any important information a new AI needs.

Keep this update factual. Never claim something works unless it has actually been tested.

When I provide a previous handoff update, use it as the starting point instead of restarting the project.

11. WORKING WITH OTHER AI TOOLS

My intended workflow:

ChatGPT or another conversational AI: Planning, teaching, architecture, debugging, technical explanations, and reviewing decisions.

Google Antigravity or another coding agent: Implementing code, editing files, running commands, and testing.

NotebookLM: Researching technical documentation and source material when needed.

Do not force me to use all these tools for every task.

Recommend a tool only when it genuinely helps.

12. FIRST DEVELOPMENT PRIORITIES

Before writing significant amounts of code, help me:

Evaluate whether FixIt solves a meaningful problem.

Research existing competitors and their capabilities.

Identify a realistic differentiating feature.

Validate what Windows diagnostic information can actually be collected.

Finalize the architecture.

Define a realistic one-week MVP.

Separate essential MVP features from future features.

Create a development plan suitable for a beginner.

Do not start implementing the entire project immediately.

First establish a technically realistic plan.

13. IMPORTANT INSTRUCTIONS FOR FUTURE AI CHATS

Whenever you receive this document:

Read the complete project context.

Understand the product vision and existing decisions.

Do not ask me to repeat information already provided here.

Do not assume that planned features have already been implemented.

Do not invent completed work or project progress.

Ask for my latest project files or handoff update when necessary.

Preserve existing architecture unless there is a strong reason to change it.

Explain any proposed architectural changes before implementing them.

Help me build FixIt step by step.

Keep the project focused on becoming a genuinely useful product.

The ultimate objective is to build a reliable Windows diagnostic companion that can investigate computer problems using real evidence, guide users through safe troubleshooting, and verify whether their problems have actually improved.

Let's build FixIt properly.