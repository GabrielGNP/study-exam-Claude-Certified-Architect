/* ARCHIVO GENERADO AUTOMATICAMENTE por build-questions.py. NO editar a mano. */
/* Fuente de verdad: study-question-bank.en.json */
window.QUESTION_BANKS = window.QUESTION_BANKS || {};
window.QUESTION_BANKS["en"] = {
 "title": "Claude Code Study Question Bank",
 "description": "Multiple-choice study bank for Claude Code and Claude development workflows.",
 "language": "en",
 "topics": [
  {
   "id": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 1,
   "title": "Claude Code for Continuous Integration",
   "questionCount": 30
  },
  {
   "id": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 2,
   "title": "Multi-Agent Research System",
   "questionCount": 30
  },
  {
   "id": "01KT81BA4J2675N47R42Q4C716",
   "order": 3,
   "title": "Developer Productivity with Claude",
   "questionCount": 29
  },
  {
   "id": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 4,
   "title": "Code Generation with Claude Code",
   "questionCount": 27
  },
  {
   "id": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 5,
   "title": "Customer Support Resolution Agent",
   "questionCount": 50
  },
  {
   "id": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 6,
   "title": "Structured Data Extraction",
   "questionCount": 45
  }
 ],
 "questions": [
  {
   "id": "01KT81N3RTZKP46GW353B7QPQA",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 1,
   "sourceOrder": 1,
   "variant": false,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "The automated review systematically flags patterns your team uses intentionally: force-unwrapping of optionals in test files, use of large coordinator classes that follow your established architecture, and importing internal modules marked as deprecated in the public SDK. Developers dismiss roughly 30% of all findings as project-specific false positives. Which approach prevents the model from generating these findings in the first place, by providing the project conventions as persistent context on every review?",
   "options": [
    {
     "key": "A",
     "text": "Build post-processing keyword filters that suppress findings containing terms like 'force unwrap', 'large class', or 'deprecated import' before the results reach developers."
    },
    {
     "key": "B",
     "text": "Have developers add inline suppression comments on the flagged lines and preprocess the diffs to exclude the suppressed lines before sending the code to the model."
    },
    {
     "key": "C",
     "text": "Configure the review to analyze only the changed lines in the diff without the surrounding file context, reducing how much code the model evaluates per review."
    },
    {
     "key": "D",
     "text": "Document the accepted patterns and the team's intentional conventions in the project's CLAUDE.md file, so the model receives this context on every review."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "`CLAUDE.md` is the project-level mechanism for giving Claude Code persistent context such as coding conventions, review criteria, testing standards, and accepted architectural patterns. Since the problem is that the model repeatedly flags intentional project-specific decisions, the correct solution is to provide those conventions before the review is generated. Keyword filters, suppression comments, or reducing context only hide or limit the findings after the model has already misunderstood the project."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RT20D62GS0H9NAYG9G",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 2,
   "sourceOrder": 2,
   "variant": false,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "After deploying the automated review, you notice high precision but low recall: real bugs slip through. Investigation reveals that your review prompt tells Claude to 'only report high-confidence issues you are sure about' and to 'err on the side of not commenting'. Developers appreciate the low noise, but a race condition that caused a production outage was visible in a reviewed PR and was not reported. You need to substantially improve bug detection while keeping false-positive rates manageable for your team. What is the most effective approach?",
   "options": [
    {
     "key": "A",
     "text": "Add detailed few-shot examples demonstrating the bug categories Claude should flag -- race conditions, null dereferences, error-handling gaps -- while keeping the high-confidence filtering instruction to preserve current precision levels."
    },
    {
     "key": "B",
     "text": "Expand the context window by including related test files, recent git history, and the module dependency graph alongside the diff, giving Claude richer signals to assess issue severity."
    },
    {
     "key": "C",
     "text": "Split the review into a findings stage where Claude's goal is coverage -- flagging every potential issue with confidence and severity metadata -- and a separate stage that filters those findings."
    },
    {
     "key": "D",
     "text": "Remove the conservative filtering instructions and ask Claude to report all potential issues, then apply a programmatic filter to deduplicate and suppress the categories that historically produce false positives."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "The current prompt suppresses real issues because it over-aggressively optimizes for certainty. A two-stage review separates recall from publication: first, Claude identifies potential issues broadly and attaches structured confidence and severity metadata; then a separate thresholding step decides what reaches developers. This preserves visibility of serious bugs like race conditions while managing false positives. Keeping the high-confidence instruction would keep missing bugs, and simply adding more context or post-processing filters does not directly address the recall problem."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RTXEKM0BV2S96564Q5",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 3,
   "sourceOrder": 3,
   "variant": false,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "Your automated review produces many findings per PR, but developer feedback indicates that roughly half are dismissed as 'not worth addressing'. Analysis shows the dismissed findings are usually technically accurate but involve minor style preferences or acceptable patterns in your codebase. Before adding infrastructure complexity, which change to the prompt design would most effectively reduce dismissals while preserving detection of real issues?",
   "options": [
    {
     "key": "A",
     "text": "Add instructions asking Claude to rate each finding's confidence (1-10) and include only findings rated 8 or higher."
    },
    {
     "key": "B",
     "text": "Implement a secondary classification model that filters Claude's findings based on predicted developer acceptance."
    },
    {
     "key": "C",
     "text": "Add explicit criteria defining which issues to report (bugs, security) versus which to omit (minor style, local patterns)."
    },
    {
     "key": "D",
     "text": "Add instructions to 'only report findings you are very sure are real issues'."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "The dismissed findings are not necessarily wrong; they are simply low value for this codebase. The best prompt change is to define clear categories of what should be reported and what should be omitted, such as reporting bugs and security issues while excluding minor style preferences or accepted local patterns. Confidence-based instructions are too vague and may suppress important issues, while adding another model introduces unnecessary infrastructure before fixing the prompt criteria."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RTJSPDS2TFG4K2BJAJ",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 4,
   "sourceOrder": 4,
   "variant": false,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "Your automated reviewer uses a single prompt that covers security issues, API design, and business-logic correctness. Your evaluation suite shows high recall for API design findings (82%) but low recall for business-logic edge cases (34%). When you add few-shot examples of logic bugs to the prompt, logic recall improves to 41% but API design recall drops to 68%. How should you address this trade-off to improve detection in both categories?",
   "options": [
    {
     "key": "A",
     "text": "Replace the few-shot examples with a detailed checklist of specific logic edge cases to check, such as division by zero in score calculations and boundary conditions on grading thresholds."
    },
    {
     "key": "B",
     "text": "Split the review into separate, focused prompts -- one for security and API design, another for business logic -- each with dedicated examples, then consolidate the findings before publishing."
    },
    {
     "key": "C",
     "text": "Upgrade to a more capable model tier, since its stronger reasoning will handle both concern types in a single prompt and eliminate the recall trade-off."
    },
    {
     "key": "D",
     "text": "Provide the full repository as context instead of only the changed files and surrounding code, giving the model greater visibility into business-logic patterns."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "The evaluation shows prompt interference: adding examples for one concern improves business-logic recall but hurts API-design recall. Splitting the review into focused passes lets each prompt use criteria and examples tailored to its category, then consolidate results for developers. A checklist may help with logic bugs but does not address the API-design regression, and a model upgrade or more repository context does not directly resolve the conflict created by combining distinct review objectives in a single prompt."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RTEZJKR5AZKKPH66C8",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 5,
   "sourceOrder": 5,
   "variant": false,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "Your pipeline includes a release-notes generation step that classifies and summarizes roughly 200 commits at the end of each weekly release cycle. Currently each commit is sent as a separate Messages API call using a Sonnet-tier Claude model. The release notes are not needed until the next morning (results tolerate ~12 hours of latency). Your team needs to reduce API cost per token for this step while keeping the same model and prompts (no change to model tier or output quality). Which approach satisfies all these constraints?",
   "options": [
    {
     "key": "A",
     "text": "Issue the 200 Messages API requests in parallel using concurrent connections, since concurrency lowers the per-token price the API charges."
    },
    {
     "key": "B",
     "text": "Switch the summarization calls from the Sonnet-tier model to the Haiku-tier model to take advantage of Haiku's lower per-token rates."
    },
    {
     "key": "C",
     "text": "Concatenate the 200 commit messages into a single Messages API request and have the model return all summaries in one response, since fewer requests always reduces total token cost."
    },
    {
     "key": "D",
     "text": "Send the 200 requests to the Message Batches API with unique custom_ids and retrieve the results once the batch completes, which applies a 50% discount to all input and output tokens."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "This workload tolerates latency and does not require results until the next morning, so it fits batch processing. The Message Batches API keeps the same model and prompts while reducing input and output token cost, and the `custom_id` values let you correlate each commit's result after processing. Parallel Messages API calls do not reduce the per-token price, switching to Haiku violates the same-model requirement, and concatenating all commits changes the prompt structure and may hurt correlation or output quality."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RVYXJMRQ62M326SB42",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 6,
   "sourceOrder": 6,
   "variant": false,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "Your automated code review is missing real bugs in pull requests. Investigation reveals that your review prompt includes the instruction: 'Only flag critical issues that would definitely cause production failures. Ignore minor concerns and anything you are unsure about.' Developers confirm that some missed bugs are real logic errors the model investigated but decided not to report. The team requires the review output to remain structured (each finding tagged with metadata) and actionable. Which prompt change removes the cause of the suppressed findings and preserves the structured, tagged output for downstream filtering?",
   "options": [
    {
     "key": "A",
     "text": "Add a second review pass that re-reads the diff using the same prompt, looking for anything the first pass may have missed."
    },
    {
     "key": "B",
     "text": "Instruct the model to report all findings with a confidence level and a severity label, leaving filtering to a later step."
    },
    {
     "key": "C",
     "text": "Remove all severity-related instructions from the prompt and let the model use its default judgment about what to report."
    },
    {
     "key": "D",
     "text": "Enable extended thinking and instruct the model to reason step by step about each code change before producing its review."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "The missed bugs are caused by an instruction that tells the model not to report anything uncertain or below a very high severity threshold. Asking for all findings with confidence and severity metadata removes that suppression while preserving structured output for later filtering. Re-running the same conservative prompt would repeat the same failure mode, removing all severity guidance would reduce structure, and extended thinking does not address the instruction telling the model to withhold findings."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RV6GH7MHTX84DBR863",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 7,
   "sourceOrder": 7,
   "variant": false,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "After deploying automated code review, developers report that roughly 35% of flagged findings are false positives that follow consistent patterns: style suggestions that contradict team conventions, security warnings for patterns that are safe in your deployment context, and performance suggestions that would degrade your specific use case. You want to reduce false positives while keeping the ability to detect real issues. Which approach best lets the model generalize its judgment to new code patterns it has not seen before?",
   "options": [
    {
     "key": "A",
     "text": "Include few-shot examples in your prompt showing annotated code snippets that distinguish acceptable patterns from real issues in each category."
    },
    {
     "key": "B",
     "text": "Create a complete written specification of every pattern that should not be flagged, then include this full documentation in the system prompt."
    },
    {
     "key": "C",
     "text": "Implement post-processing that uses keyword matching to filter out findings containing terms like 'convention', 'context-dependent', or 'trade-off'."
    },
    {
     "key": "D",
     "text": "Add instructions to your system prompt to 'be conservative', 'only flag definite issues', and 'consider that some patterns may be intentional'."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Few-shot examples are well suited to ambiguous review judgments because they show how to distinguish project-specific acceptable patterns from real issues. Annotated examples for style, security, and performance teach the model the underlying decision boundary so it can generalize to new code, rather than just matching a fixed list. A complete blocklist is brittle, keyword filtering happens too late and can hide real issues, and vague instructions like 'be conservative' do not provide enough concrete guidance."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RVZY0BD03BKT26KNMV",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 8,
   "sourceOrder": 8,
   "variant": false,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "The automated review pipeline produces an average of 18 findings per PR. Developer feedback reveals three categories of unwanted noise: (1) style and formatting issues already enforced by your linter in CI, (2) findings about auto-generated template code under src/gen/, and (3) rendering helper patterns that are intentional project conventions but get flagged because they resemble common anti-patterns. Only about 4 findings per PR are real logic bugs. What is the most effective way to reduce this noise while preserving detection of real issues?",
   "options": [
    {
     "key": "A",
     "text": "Add the prompt parameter to the GitHub Action configuration with instructions to suppress duplicate linter findings, ignore generated template code, and apply stricter evidence requirements for rendering-related issues."
    },
    {
     "key": "B",
     "text": "Add detailed explanations to the project's CLAUDE.md describing which patterns are intentional, that linting is handled separately in CI, and that the src/gen/ directory contains auto-generated template code."
    },
    {
     "key": "C",
     "text": "Create a REVIEW.md at the repository root with skip rules for CI-enforced checks and generated files, and a verification requirement that rendering-related findings must cite a specific line demonstrating incorrect behavior."
    },
    {
     "key": "D",
     "text": "Configure separate GitHub Action workflow files for each code area -- one for generated code with findings suppressed, one for rendering code with custom review instructions, and a general workflow for everything else."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "The noise comes from missing project context: the model reviews linter-managed formatting, generated files, and intentional rendering conventions as if they were ordinary defects. Putting those details in `CLAUDE.md` gives Claude Code persistent project guidance during review, so it can avoid low-value findings while still detecting real logic bugs. Splitting workflows or filtering ad hoc adds complexity, and a one-off prompt parameter is less maintainable than documenting the stable repository conventions where Claude Code expects project context."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RVF49N9MZKNFTKD5AZ",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 9,
   "sourceOrder": 9,
   "variant": false,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "During initial testing of the automated review pipeline, you notice that reviews of large PRs (50+ changed files) sometimes take more than 20 minutes and cost $8-12 per run due to extensive agentic loops -- Claude reads files, runs analysis tools, and iterates many times. Your team needs each invocation to stop when it reaches a fixed iteration count and a fixed dollar amount, enforced by Claude Code itself rather than the surrounding job runner. Which configuration change directly enforces both limits per invocation?",
   "options": [
    {
     "key": "A",
     "text": "Add --max-turns 10 --max-budget-usd 2.00 to the claude -p invocation to cap iterations and spend."
    },
    {
     "key": "B",
     "text": "Set timeout-minutes: 5 on the GitHub Actions job step and monitor per-run costs through the Anthropic Console usage dashboard."
    },
    {
     "key": "C",
     "text": "Change the --model flag to a smaller, cheaper model so each iteration uses fewer tokens and has a lower per-call cost."
    },
    {
     "key": "D",
     "text": "Set --permission-mode dontAsk to automatically deny any tool permission request that is not in the explicitly allowed set."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The requirement is for Claude Code itself to stop each invocation after a fixed iteration count and a fixed dollar amount. The `--max-turns` cap limits agentic iterations, while `--max-budget-usd` limits spend for that run. A GitHub Actions timeout and the usage dashboard are external controls rather than caps enforced by Claude Code, changing models only reduces per-token cost without limiting loops, and permission mode controls tool approvals rather than iteration count or budget."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RVHF1RDAY99N25R5P1",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 10,
   "sourceOrder": 10,
   "variant": false,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "Your pipeline reviews roughly 200 database migration scripts daily using the Message Batches API. Each batch request includes a shared 8,000-token system prompt containing migration review guidelines and schema documentation, followed by the individual migration script. You have added cache_control breakpoints on the shared system prompt in every request, but monitoring shows cache hit rates of only 32%, with cache misses concentrated in requests processed later in the batch window. Which change addresses the root cause of these cache misses without adding sequential processing latency?",
   "options": [
    {
     "key": "A",
     "text": "Move the cache_control breakpoints from the system prompt to the individual migration script content to cache similar code patterns across reviews."
    },
    {
     "key": "B",
     "text": "Add warm-up requests with max_tokens: 0 at the start of each batch to load the cache before the review requests run."
    },
    {
     "key": "C",
     "text": "Split the 200 requests into 10 sequential batches of 20, sending each only after the previous finishes, to keep requests close enough in time for cache reuse."
    },
    {
     "key": "D",
     "text": "Use the extended 1-hour cache TTL instead of the default 5-minute TTL on your cache breakpoints."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "The shared system prompt is identical and already has cache breakpoints, so the cache misses are not caused by content placement. They are concentrated in requests processed later in the batch window, which points to the cache expiring before later requests can reuse it. Using the extended 1-hour TTL addresses that root cause while preserving parallel batch processing. Moving breakpoints to variable migration scripts would reduce reuse, warm-up does not prevent later expiration, and sequential batches would add unnecessary latency."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RVQ7DZADFKFKGNM1BW",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 11,
   "sourceOrder": 11,
   "variant": false,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "Your CI pipeline runs security-focused code reviews on roughly 50 PRs daily, currently costing $150/day using the synchronous API. The reviews are non-blocking -- developers merge after tests pass and address findings in follow-up commits. You are evaluating the Message Batches API for its 50% cost reduction. Which factor primarily determines whether batch processing is appropriate for this use case?",
   "options": [
    {
     "key": "A",
     "text": "Whether you can structure each review as a single request without multi-turn refinement."
    },
    {
     "key": "B",
     "text": "Whether your result processing can handle reviews arriving in a different order than submitted."
    },
    {
     "key": "C",
     "text": "Whether review feedback arriving up to 24 hours after PR creation is still actionable."
    },
    {
     "key": "D",
     "text": "Whether reducing per-review latency from 30-60 seconds to near-instant matters for your workflow."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "The Message Batches API is appropriate for non-blocking, latency-tolerant work because it trades latency guarantees for lower cost. Since these reviews do not block merges, the key question is whether findings delivered later, potentially up to 24 hours after submission, are still useful enough for follow-up commits. Result ordering can be handled with identifiers, and near-instant latency is not the value proposition of batch processing."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RVFQ5MJ2N2W0HX1JMZ",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 12,
   "sourceOrder": 12,
   "variant": false,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "Your automated review calls the Claude API for each PR, using tool_use with a report_findings tool that returns a JSON array of finding objects (each with file_path, line_number, severity, category, and description). While testing on a large PR that touches 30+ files, the response hits the max_tokens limit and the output truncates mid-JSON, causing your pipeline's parser to fail. What is the most effective way to handle this?",
   "options": [
    {
     "key": "A",
     "text": "Split the review into multiple API calls that each analyze a subset of the changed files, then combine the resulting finding arrays."
    },
    {
     "key": "B",
     "text": "Increase max_tokens to the model's maximum and instruct Claude to keep each finding description under 50 words."
    },
    {
     "key": "C",
     "text": "Add retry logic that detects truncated JSON and resends the request with instructions to report only critical and high severity findings."
    },
    {
     "key": "D",
     "text": "Switch from tool_use to asking Claude to return the findings as a markdown list."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The failure is caused by a single large review producing more structured output than fits in `max_tokens`, resulting in truncated JSON. Splitting the PR into smaller review units keeps each `tool_use` response bounded and parseable while preserving the same structured findings schema. Simply increasing `max_tokens` may still fail on very large PRs, retrying with only high-severity findings changes recall, and switching to Markdown removes the machine-parseable structure the pipeline depends on."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RVJ5B7A6GS57J0S5W6",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 13,
   "sourceOrder": 13,
   "variant": false,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "Your pipeline runs a `claude -p` with `--dangerously-skip-permissions` and a `--system-prompt` built by concatenation ('You are a code reviewer. Analyze the provided diff for bugs, security issues, and style violations.'), feeding the diff via stdin. Reviews complete and return feedback, but Claude only comments on the diff text piped in -- it never reads surrounding files in the cloned repository to understand the broader context, even when the diff modifies a function called by many other modules. Which change to the invocation will make Claude read related files in the repository while still applying your custom review instructions?",
   "options": [
    {
     "key": "A",
     "text": "Keep --system-prompt and add --allowedTools \"Read,Glob,Grep\" so the non-interactive -p mode permits the filesystem tools it otherwise disables."
    },
    {
     "key": "B",
     "text": "Remove --system-prompt entirely and place the review instructions in a CLAUDE.md file at the repository root, since --system-prompt is incompatible with tool use under -p."
    },
    {
     "key": "C",
     "text": "Stop piping the diff via stdin and embed the diff content within the prompt string, so Claude Code treats the invocation as an agentic session rather than stream processing."
    },
    {
     "key": "D",
     "text": "Replace --system-prompt with --append-system-prompt so the review instructions are appended to Claude Code's default prompt instead of overwriting the built-in guidance for using file-reading and code-navigation tools."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "The invocation is replacing Claude Code's default system guidance with a minimal custom prompt, so the run behaves as if it should only analyze the diff text piped via stdin. Using `--append-system-prompt` preserves Claude Code's built-in instructions for navigating the repository with tools while adding the custom review criteria. Simply allowing tools or moving the diff into the prompt does not fix the overwritten default guidance, and `CLAUDE.md` is project context, not a replacement for invocation-level review instructions."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RV9QP7F2EXVX3V8FJ4",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 14,
   "sourceOrder": 14,
   "variant": false,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "You built an LLM-based code review tool that analyzes pull requests and generates structured findings. Each finding is a JSON object with file_path, line_number, issue_category (e.g., \"security\", \"style\"), and description. Developers can click \"dismiss\" on any finding they consider unhelpful; currently 35% of findings are dismissed. You want to analyze these dismissals to understand what is going wrong in your system and improve your prompts. Which change to the output structure would be most useful for this analysis?",
   "options": [
    {
     "key": "A",
     "text": "Remove the issue_category field and track dismissal rates only at the individual-finding level."
    },
    {
     "key": "B",
     "text": "Expand the description field to include more detailed explanations of why each issue matters and how to fix it."
    },
    {
     "key": "C",
     "text": "Add a model_confidence field (0.0-1.0) and filter findings below a threshold calibrated against historical dismissal rates."
    },
    {
     "key": "D",
     "text": "Add a detected_pattern field that records the code construct (e.g., \"single-letter loop variable\") that triggered each finding."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "To improve the prompts, the team needs to know which recurring code patterns generate dismissed findings. `issue_category` is too broad, and individual-finding tracking is too granular to reveal systematic prompt failures. A `detected_pattern` field lets you segment dismissals by the actual construct that triggered the review comment, identify patterns with high false-positive rates, and refine criteria or examples for those cases. Confidence filtering may reduce volume, but it does not explain what is going wrong in the system."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RWQ2TM730EQJNRC6MQ",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 15,
   "sourceOrder": 15,
   "variant": false,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "Your code review prompts include both the implementation changes and the corresponding test file, but the LLM's review comments do not flag untested code paths. Analysis reveals the model correctly detects functions that have no tests at all, but fails to identify when conditional branches or error-handling paths inside tested functions lack coverage. What is the most effective way to improve branch-level coverage-gap detection without over-complicating the pipeline?",
   "options": [
    {
     "key": "A",
     "text": "Add explicit instructions directing the model to enumerate every conditional branch and exception path, then verify that each has a corresponding test assertion."
    },
    {
     "key": "B",
     "text": "Include few-shot examples showing code with an uncovered branch alongside the review comment that identifies the specific missing test case."
    },
    {
     "key": "C",
     "text": "Implement a multi-step pipeline where separate LLM calls first extract all conditional branches, then cross-reference each against the test assertions in a second step."
    },
    {
     "key": "D",
     "text": "Restructure the prompt to interleave implementation and tests, presenting each function immediately followed by its test cases."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "The model already detects fully untested functions, but it fails at the more ambiguous judgment of whether specific branches and error paths are covered. Few-shot examples directly demonstrate that decision pattern: a tested function can still have an uncovered conditional branch or exception path, and the review should name the missing test case. This improves branch-level detection without adding a multi-step architecture. A checklist or reordered prompt may help, but examples are more effective for teaching nuanced review behavior."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RW6F9A6X0J8S3MH4GD",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 16,
   "sourceOrder": 16,
   "variant": false,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "Users report that final reports sometimes lack depth on specific subtopics. Research shows the document-analysis agent frequently identifies gaps -- for example, noting 'the retrieved sources discuss API authentication but lack details on token refresh patterns' -- but under the current strict pipeline, this insight is not actionable since the search has already completed. What is the most effective architectural change?",
   "options": [
    {
     "key": "A",
     "text": "Have the coordinator scan the analysis output for gap indicators and re-invoke search with gap-informed queries when they are detected."
    },
    {
     "key": "B",
     "text": "Have the synthesis agent attach confidence scores to each section and flag areas with insufficient coverage for manual review."
    },
    {
     "key": "C",
     "text": "Add a research-planning agent before the search phase that decomposes topics into specific sub-questions."
    },
    {
     "key": "D",
     "text": "Have the analysis agent report specific gaps to the coordinator, which triggers targeted searches and re-invokes analysis until coverage is sufficient."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "The problem is not just initial planning; the analysis agent is discovering concrete coverage gaps after seeing the retrieved material. Those gaps need to become actionable signals in the architecture. Having the analysis agent return specific missing subtopics to the coordinator lets it run targeted searches, pass the new sources back through analysis, and iterate until coverage is adequate. Confidence flags or manual review only expose the weakness after the fact, and a planning-only step cannot react to gaps discovered during analysis."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RW6NPSN7Y2P0428FBA",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 17,
   "sourceOrder": 17,
   "variant": false,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "The synthesis agent completes its initial pass but flags that three key research questions remain unanswered because the web-search and document-analysis agents found no relevant information on those specific subtopics. The coordinator currently proceeds directly to report generation, producing reports with incomplete coverage. Which change would most effectively improve research completeness?",
   "options": [
    {
     "key": "A",
     "text": "Have the coordinator evaluate the synthesis output for gaps, then re-delegate to web search and document analysis with targeted queries before invoking synthesis again."
    },
    {
     "key": "B",
     "text": "Give the synthesis agent direct access to web-search tools so it can autonomously fill knowledge gaps without returning control to the coordinator."
    },
    {
     "key": "C",
     "text": "Have the report-generation agent annotate which research questions could not be answered, so users understand the limitations of the final result."
    },
    {
     "key": "D",
     "text": "Increase the initial breadth of the queries sent to web search and document analysis to reduce the likelihood of missing relevant information."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The synthesis agent identified specific unanswered research questions, so the coordinator should use those gaps to drive another round of targeted research. This preserves the coordinator-led architecture while letting the pipeline iteratively improve coverage before report generation. Giving synthesis broad search access weakens the separation of responsibilities, only annotating limitations does not improve completeness, and broadening the initial search is less efficient than using the concrete gaps discovered during synthesis."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RWNNJ0B7ETY3R54GJ8",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 18,
   "sourceOrder": 18,
   "variant": false,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "After the web-search and document-analysis subagents complete their tasks, the coordinator needs to start the synthesis subagent to synthesize the findings. What is the correct approach for providing the synthesis subagent with the information it needs?",
   "options": [
    {
     "key": "A",
     "text": "Pass reference identifiers and configure the subagent with read access to a shared memory store where the other subagents deposited their results."
    },
    {
     "key": "B",
     "text": "Include the complete findings from both subagents directly in the synthesis subagent's prompt."
    },
    {
     "key": "C",
     "text": "Provide the subagent with tool definitions that let it request other subagents' outputs through callbacks."
    },
    {
     "key": "D",
     "text": "Start the subagent with only a brief task description, relying on automatic context inheritance from the coordinator."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "Subagents operate with their own context, so the synthesis subagent should not rely on automatic inheritance of the coordinator's conversation. The coordinator needs to pass the web-search and document-analysis outputs directly, ideally in a structured form that preserves claims, evidence, source metadata, and attribution. Shared-memory references or callback mechanisms add unnecessary indirection, while a brief task description would leave the synthesis agent without the evidence it must combine."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RWGA6W5CE41E0KE0YP",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 19,
   "sourceOrder": 19,
   "variant": false,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "The web-search agent gathered several relevant sources for a research topic. The document-analysis agent now needs to examine these sources. How does information typically flow between these two specialized subagents?",
   "options": [
    {
     "key": "A",
     "text": "The web-search agent directly invokes the document-analysis agent, passing the discovered sources as parameters."
    },
    {
     "key": "B",
     "text": "Both agents access a shared memory store where the web-search agent writes findings and the document-analysis agent reads them."
    },
    {
     "key": "C",
     "text": "The coordinator agent receives the web-search agent's output and includes the relevant findings in the prompt when invoking the document-analysis agent."
    },
    {
     "key": "D",
     "text": "The agents communicate through an event-based message queue, with the document-analysis agent subscribed to web-search completion events."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "In a coordinator-subagent architecture, specialized agents typically do not communicate directly with each other or rely on implicit shared context. The coordinator manages task decomposition, result aggregation, and information routing. After web search completes, the coordinator should take the relevant source findings and include them explicitly when invoking the document-analysis agent. This keeps communication observable and controlled while ensuring the next subagent has the context it needs."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RWCFE8BBP43HFKBPT4",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 20,
   "sourceOrder": 20,
   "variant": false,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "When analyzing complex legal cases that cite multiple precedents, the document-analysis subagent processes them sequentially. A landmark case citing 12 precedents takes more than 3 minutes to fully analyze. What is the most effective way to reduce this latency while preserving the coordinator's ability to monitor and debug the system?",
   "options": [
    {
     "key": "A",
     "text": "Implement a message queue where precedent-analysis tasks are processed asynchronously by a pool of worker agents."
    },
    {
     "key": "B",
     "text": "Create a recursive agent hierarchy where analysis agents subdivide the work among child agents until reaching single-precedent granularity."
    },
    {
     "key": "C",
     "text": "Enable the document-analysis subagent to dynamically spawn its own specialized subagents when it encounters cases with many citations."
    },
    {
     "key": "D",
     "text": "Have the coordinator spawn document-analysis subagents in parallel, each handling a subset of precedents, then aggregate the results before synthesis."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "The work is naturally partitionable by precedent, so running multiple document-analysis subagents in parallel reduces latency. Keeping spawning and aggregation in the coordinator preserves observability, error handling, and debuggability, because the coordinator can track which subset each subagent analyzed and combine the results before synthesis. Message queues, recursive hierarchies, or subagents spawning their own subagents add complexity and make the control flow harder to monitor."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RWDY00S5VYB5CE2HE5",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 21,
   "sourceOrder": 21,
   "variant": false,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "After the web-search agent and document-analysis agent complete their tasks, the coordinator invokes the synthesis agent. However, the synthesis agent responds that it cannot complete the task because no research findings were provided. What is the most likely cause of this problem?",
   "options": [
    {
     "key": "A",
     "text": "The synthesis agent needs tools that can fetch results directly from the other agents' conversation history."
    },
    {
     "key": "B",
     "text": "The synthesis agent's context window is not large enough to hold the combined outputs of both previous agents."
    },
    {
     "key": "C",
     "text": "The subagents need to share a single API connection to enable automatic context sharing across invocations."
    },
    {
     "key": "D",
     "text": "The coordinator did not include the previous agents' outputs in the synthesis agent's prompt."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Subagents do not automatically inherit the coordinator's full conversation history or other subagents' outputs. If the synthesis agent says no findings were provided, the likely problem is that the coordinator invoked it only with the task request and omitted the web-search and document-analysis results. The fix is to include those prior outputs directly in the synthesis prompt, preferably in a structured form that preserves source metadata and evidence."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RWYKZDVRZYMQH2F80X",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 22,
   "sourceOrder": 22,
   "variant": false,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "In production, you observe that simple fact-checking queries (e.g., 'In what year was the Paris Climate Agreement signed?') traverse all four subagents sequentially, consuming more than 40 seconds and significant tokens per query. Complex comparative research does benefit from the full pipeline. The query distribution is diverse and evolves as users discover new applications. What is the most effective approach to optimize for varied query complexity?",
   "options": [
    {
     "key": "A",
     "text": "Have the coordinator analyze each query and dynamically decide which subagents to invoke based on its assessment of the query's requirements."
    },
    {
     "key": "B",
     "text": "Create a fast path for factual questions that bypasses the subagents entirely, routing all other queries through the full pipeline to guarantee research thoroughness."
    },
    {
     "key": "C",
     "text": "Implement pattern-based routing that categorizes queries by structure (single-fact vs. comparative vs. analytical) and maps each category to a predefined subagent combination."
    },
    {
     "key": "D",
     "text": "Train a query-complexity classifier on labeled historical data to predict optimal subagent combinations, retraining periodically as query patterns evolve."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The workload has diverse and evolving query types, so a fixed pipeline wastes time on simple questions and rigid routing becomes brittle. The coordinator's role is to assess query complexity, decompose tasks, and invoke only the subagents needed for that request. This lets simple fact checks take a lighter path while complex comparative research still uses the full multi-agent workflow. A static fast path or pattern table handles only known categories, and a separate classifier adds maintenance overhead without leveraging the coordinator's existing orchestration role."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RWC8A6KA0T0S68ASK1",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 23,
   "sourceOrder": 23,
   "variant": false,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "Production reviews reveal inconsistent handling of uncertainty in the final reports. Sometimes contradictory findings from the subagents are synthesized into a single confident statement (losing nuance), while other times reports have too many qualifications (becoming useless). When the web-search agent returns 'industry analysts estimate a market size of $50B (methodology varies)' and the document-analysis agent returns 'peer-reviewed study estimates $35B (+/-$7B, 95% CI)', the coordinator picks one arbitrarily or produces vague statements like 'the market could be $35B-$50B depending on factors'. Which systematic approach best addresses this?",
   "options": [
    {
     "key": "A",
     "text": "Implement a confidence-calibration layer that normalizes the subagents' uncertainty expressions to standardized probability scores (0.0-1.0), then weighted-average the findings by their calibrated confidence."
    },
    {
     "key": "B",
     "text": "Configure the subagents to report only findings that meet a high-confidence threshold, filtering out uncertain information before it reaches the coordinator."
    },
    {
     "key": "C",
     "text": "Instruct the synthesis agent to structure reports with explicit sections that distinguish well-established findings from contested ones, preserving the original source characterizations and methodological context."
    },
    {
     "key": "D",
     "text": "Add a verification subagent that cross-checks findings across sources, passing to synthesis only the claims corroborated by at least two independent sources."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "The problem is inconsistent synthesis of uncertainty, not the lack of a single numeric confidence score. Contradictory but credible findings should be preserved with attribution, source characterization, confidence intervals, and methodological context. Structuring the report to separate well-established findings from contested ones avoids arbitrary selection without falling into vague over-caution. Filtering uncertain claims or requiring two-source corroboration would discard useful nuance, and weighted averaging can hide important methodological differences."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RX8Q4TGJE5WJ00R47V",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 24,
   "sourceOrder": 24,
   "variant": false,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "The coordinator provides detailed step-by-step instructions to the web-search subagent, specifying exact search queries, source priorities, and date filters. Production monitoring reveals three problems: (1) the subagent reports 'insufficient results' instead of trying alternative approaches when the pre-specified searches fail, (2) research quality drops for emerging topics that do not match the expected patterns, and (3) the subagent rarely finds valuable tangential sources. What is the most effective way to improve the subagent's adaptability?",
   "options": [
    {
     "key": "A",
     "text": "Remove the procedural details entirely, delegating with simple goals like 'research X thoroughly' and trusting the subagent's general capabilities."
    },
    {
     "key": "B",
     "text": "Implement a topic-classification step where the coordinator categorizes requests as 'well-defined' or 'exploratory' and uses different instruction styles for each category."
    },
    {
     "key": "C",
     "text": "Specify research objectives and quality criteria (coverage breadth, source diversity, recency) instead of procedural steps, letting the subagent determine its search strategy."
    },
    {
     "key": "D",
     "text": "Add explicit fallback directives to the detailed instructions: 'If the specified searches return fewer than N results, try alternative query formulations before reporting failure'."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "The failures come from over-constraining the web-search subagent with fixed queries and procedures. For emerging or exploratory topics, the subagent needs room to adapt its search strategy while still being held to clear quality standards. Objectives and criteria like breadth, source diversity, and recency define what good research looks like without dictating brittle steps. Removing guidance entirely is too vague, fallback clauses only patch one failure mode, and classification adds complexity while still relying on predefined instruction styles."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RXEJJ97KBXA8RANBQJ",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 25,
   "sourceOrder": 25,
   "variant": false,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "Your multi-agent research pipeline failed after processing 12 of 28 documents. The web-search agent had identified relevant sources, the document analyzer had partially completed extraction, and the synthesizer had begun pattern identification. You need to resume processing without repeating work or losing the fidelity of prior findings. Which state-management approach best balances information fidelity with context efficiency when restoring agent state?",
   "options": [
    {
     "key": "A",
     "text": "Have each agent persist a structured export to a known location. On resume, the coordinator loads the manifest and injects the relevant state into the agents' prompts."
    },
    {
     "key": "B",
     "text": "Have each agent maintain its own persistent state file and reload it independently at the start of each session."
    },
    {
     "key": "C",
     "text": "Persist the coordinator's conversation log containing all task delegations and responses, providing it to the agents on resume."
    },
    {
     "key": "D",
     "text": "Index all agent outputs in a shared vector store. On resume, each agent queries the store using semantic search to retrieve relevant prior findings."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Structured state exports preserve progress with high fidelity without replaying every conversation turn. A manifest gives the coordinator a reliable map of which sources were found, which documents were processed, which extractions are complete, and what synthesis work had begun. The coordinator can then inject only the relevant state into each resumed agent's prompt. Independent per-agent state files risk inconsistent restoration, full logs waste context, and semantic retrieval may miss or distort exact prior findings."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RXY3TDCTP2EWBDXJ9N",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 26,
   "sourceOrder": 26,
   "variant": false,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "The coordinator agent has AgentDefinitions configured for all four specialized subagents, each with appropriate descriptions, prompts, and tool restrictions. During testing, you notice the coordinator reasons correctly about when to delegate -- generating messages like 'I will ask the web-search agent to find sources on this topic' -- but no subagent execution ever occurs. The coordinator then proceeds as if the delegation had happened and continues with incomplete information. The logs show no errors. What is the most likely cause?",
   "options": [
    {
     "key": "A",
     "text": "The AgentDefinitions are configured correctly, but the coordinator's system prompt does not explicitly list the available subagent types, preventing the model from knowing they can be invoked."
    },
    {
     "key": "B",
     "text": "The coordinator's max_tokens setting is too low, causing the Task tool invocation to be truncated before the subagent-type parameter can be specified."
    },
    {
     "key": "C",
     "text": "The coordinator's allowedTools setting does not include \"Task\", so although it can reason about delegation, it cannot invoke the tool needed to spawn subagents."
    },
    {
     "key": "D",
     "text": "The subagents' context isolation means the coordinator's task descriptions do not automatically reach the subagents; you need to configure explicit context forwarding in ClaudeAgentOptions."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "`AgentDefinition` entries describe the available subagent types, but the coordinator still needs permission to use the mechanism that spawns them. The `Task` tool is required for subagent invocation, so if it is missing from `allowedTools`, the coordinator can reason about delegation in natural language but never execute a subagent call. Context isolation affects what subagents receive after being spawned; it does not explain why no subagent execution occurs at all."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RXZ9S35AMBY8PVTKHG",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 27,
   "sourceOrder": 27,
   "variant": false,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "The synthesis agent receives summarized findings from the web-search and document-analysis agents, then passes a consolidated summary to the report generator. During testing, you discover that the generated reports make factual claims without proper citations -- the report generator cannot attribute statements to their original sources because that metadata was lost during the summarization steps. What is the most effective approach to ensure proper source attribution in the final reports?",
   "options": [
    {
     "key": "A",
     "text": "Skip summarization and pass the full raw outputs from web search and document analysis directly to the report generator."
    },
    {
     "key": "B",
     "text": "Have the report generator query the web-search agent to re-locate sources for the claims in the final report."
    },
    {
     "key": "C",
     "text": "Have each agent produce structured data separating content summaries from source metadata (URLs, document names, page numbers)."
    },
    {
     "key": "D",
     "text": "Instruct the synthesis agent to embed inline source references within its summary text using a consistent citation format."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "Source attribution is lost because summarization compresses claims without preserving their provenance. Structured outputs that keep summaries separate from source metadata let downstream agents preserve and merge claim-source mappings during synthesis and report generation. Passing raw outputs wastes context, relocating sources afterward is unreliable, and inline citations within text are easier to drop or distort than explicit structured metadata."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RXBQ1HHNJ51NGG3M1K",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 28,
   "sourceOrder": 28,
   "variant": false,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "You configured the system so all four subagents have access to the full set of 18 tools. During testing, the agents frequently call tools outside their specialization -- the synthesis agent attempts web searches, and the report generator attempts to analyze documents. What is the primary cause of this poor tool-selection behavior?",
   "options": [
    {
     "key": "A",
     "text": "Choosing among 18 tools instead of 4-5 relevant ones increases decision complexity beyond reliable selection thresholds."
    },
    {
     "key": "B",
     "text": "The coordinator cannot track which capabilities each subagent has, leading to misrouted tasks."
    },
    {
     "key": "C",
     "text": "The agents' role descriptions in their system prompts conflict with having access to tools outside that role."
    },
    {
     "key": "D",
     "text": "The tool definitions consume too much of the context window, leaving insufficient room for task content."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Giving each subagent all 18 tools makes tool selection harder and encourages cross-role misuse. A synthesis agent with web-search tools and a report generator with document-analysis tools can pick capabilities outside their specialization because the available tool set is too broad. The best design is scoped tool access: each subagent should receive only the tools needed for its role, with cross-role tools limited to specific high-frequency needs."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RXNPT76C1327WEQ2V8",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 29,
   "sourceOrder": 29,
   "variant": false,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "In production, final reports frequently contain claims without proper source attribution. Research shows that while the web-search and document-analysis agents correctly attach citations to their outputs, the synthesis agent loses track of which sources support which conclusions when combining findings. What is the most effective architectural change?",
   "options": [
    {
     "key": "A",
     "text": "Add a verification step where the report generator uses semantic-similarity matching against the original sources to reconstruct which claims came from which documents."
    },
    {
     "key": "B",
     "text": "Have the coordinator inject source-identifier prefixes into the text before each handoff, then parse these prefixes at report generation to reconstruct citations."
    },
    {
     "key": "C",
     "text": "Maintain full transcripts of all subagent interactions and add a citation-resolution agent to parse the logs and determine attributions before report generation."
    },
    {
     "key": "D",
     "text": "Require all subagents to produce structured claim-source mappings that the synthesis agent must preserve and merge when combining findings from multiple sources."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "The synthesis step is where attribution is lost, so the architecture must make provenance explicit and durable before synthesis occurs. Structured claim-source mappings let the synthesis agent merge conclusions while retaining which sources support each claim. Reconstructing citations after the fact via semantic similarity, logs, or text prefixes is brittle and can misattribute; preserving the mappings through the pipeline is more reliable."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RXT5EGBRVZKFHD6ZQH",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 30,
   "sourceOrder": 30,
   "variant": false,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "Production monitoring shows that follow-up queries like 'summarize what we learned about market trends' consistently take more than 40 seconds. Research reveals the coordinator spawns the synthesis subagent for every summary request, passing more than 80K tokens of accumulated findings. The coordinator already has these findings in its context from orchestrating the research. What is the most effective way to improve response time for these follow-up summaries?",
   "options": [
    {
     "key": "A",
     "text": "Have the coordinator handle direct summary requests using its existing context, reserving subagent spawning for complex analysis."
    },
    {
     "key": "B",
     "text": "Pre-generate and cache summaries at multiple granularities whenever new findings accumulate."
    },
    {
     "key": "C",
     "text": "Spawn the synthesis subagent with reduced context and have it request specific findings from the coordinator on demand."
    },
    {
     "key": "D",
     "text": "Enable prompt caching on the synthesis subagent to reduce the overhead of repeatedly transferring the same research findings."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The coordinator already has the accumulated findings in context, so spawning a synthesis subagent and passing more than 80K tokens for a simple follow-up summary adds avoidable latency and cost. The coordinator should dynamically decide whether a request needs a specialist subagent; direct summaries can be answered directly, while complex synthesis or new analysis can still be delegated. Caching or pre-generating summaries may help in specific cases, but the most direct improvement is to avoid the unnecessary subagent invocation."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RXJ6V12ZKZQ2A40ZST",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 31,
   "sourceOrder": 31,
   "variant": false,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "Your agent spent 25 minutes exploring the rendering subsystem of a game engine -- reading shader code, buffer management, and frame-synchronization logic. An engineer now asks it to understand how the physics engine integrates with rendering for collision debug overlays. You notice recent responses reference 'typical rendering patterns' instead of the specific VulkanPipeline and FrameGraph classes it discovered earlier. What is the most effective approach?",
   "options": [
    {
     "key": "A",
     "text": "Continue in the current context with more targeted prompts that reference the specific classes by name."
    },
    {
     "key": "B",
     "text": "Summarize the key rendering findings, then start a subagent for the physics exploration with that summary in its initial context."
    },
    {
     "key": "C",
     "text": "Use /clear to reset the context entirely, then start fresh with the physics exploration using file paths from the project's CLAUDE.md."
    },
    {
     "key": "D",
     "text": "Start a subagent to explore physics independently, then manually synthesize its findings with the rendering knowledge accumulated in the main conversation."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "The current session shows context degradation: responses are drifting toward generic rendering patterns instead of using the specific classes already discovered. Summarizing the concrete rendering findings preserves the important state, and giving that summary to a physics-focused subagent isolates the next exploration while keeping the necessary integration context. Continuing in the degraded context risks more generic answers, clearing the context would discard useful discoveries, and exploring physics independently would make the integration harder."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RXQZ76VKF05H2657A0",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 32,
   "sourceOrder": 32,
   "variant": false,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "You configured your Claude agent with three MCP servers: one for git operations, one for Jira ticket management, and one for documentation search. When a user asks the agent to 'create a branch for JIRA-123 and add documentation links to the ticket', how does the agent access the tools from these servers?",
   "options": [
    {
     "key": "A",
     "text": "The agent automatically selects the most relevant server based on the request and loads only that server's tools."
    },
    {
     "key": "B",
     "text": "The tools from all configured MCP servers are discovered at connection time and are available to the agent simultaneously."
    },
    {
     "key": "C",
     "text": "The agent queries each server sequentially to determine which one handles each tool, routing calls based on tool-name prefixes."
    },
    {
     "key": "D",
     "text": "You must specify which MCP server to use on each turn, and the agent can access only one server's tools at a time."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "When multiple MCP servers are configured, their tools are discovered when the agent connects and are made available together. The agent can therefore use the git tool for the branch, the Jira tool for the ticket, and the documentation-search tool for the links in the same workflow. It does not need to select just one server per turn or query servers sequentially to determine ownership."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RYHFVN7311YFG36073",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 33,
   "sourceOrder": 33,
   "variant": false,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "An engineer used the agent yesterday to analyze a legacy authentication module, identifying two distinct refactoring approaches: extracting a microservice versus refactoring in place. Today they want to explore both approaches in depth -- having the agent propose specific code changes for each -- before deciding which to implement. What is the most effective way to structure this exploration?",
   "options": [
    {
     "key": "A",
     "text": "Start two new sessions, manually providing a summary of yesterday's analysis findings to establish context."
    },
    {
     "key": "B",
     "text": "Use fork_session to create two branches from yesterday's analysis, exploring one approach in each fork."
    },
    {
     "key": "C",
     "text": "Resume yesterday's session to explore the first approach, then start a new session for the second, manually recreating the original context."
    },
    {
     "key": "D",
     "text": "Resume yesterday's session and explore both approaches sequentially within the same conversation thread."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "The engineer wants to compare two diverging refactoring approaches that share the same prior analysis base. `fork_session` is designed for this: it creates independent branches from the existing context so each approach can be explored in depth without contaminating the other. Starting fresh or recreating the context manually risks losing details, while exploring both sequentially in one conversation can mix assumptions and recommendations between the two strategies."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RYQ95W4F6W48W28AA6",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 34,
   "sourceOrder": 34,
   "variant": false,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "Your codebase exploration tool stores session IDs to let engineers continue investigations across work sessions. An engineer spent an hour yesterday analyzing a legacy authentication module, building context about its architecture and dependencies. They want to continue today. The session ID is valid, but version control shows that 3 of the 12 files the agent previously read were modified overnight by a colleague's merge. Which approach best balances efficiency and accuracy?",
   "options": [
    {
     "key": "A",
     "text": "Start a new session to ensure the agent works with the current state of the codebase without stale assumptions."
    },
    {
     "key": "B",
     "text": "Resume the session and immediately have the agent re-read all 12 previously analyzed files."
    },
    {
     "key": "C",
     "text": "Resume the session and inform the agent which specific files changed for targeted re-analysis."
    },
    {
     "key": "D",
     "text": "Resume the session without informing the agent about the modified files."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "Most of the previous session's context is still useful, but some file-level observations may be stale. Resuming the session preserves the hour of accumulated architectural understanding, while explicitly identifying the three modified files lets the agent re-read and update only the affected assumptions. Starting fresh or re-reading all twelve files wastes work, and resuming without mentioning the changes risks inaccurate conclusions based on outdated file contents."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RY03QN182KHPV110FB",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 35,
   "sourceOrder": 35,
   "variant": false,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "During testing, you observe that in extended exploration sessions (more than 30 minutes), the agent begins giving inconsistent answers about code structure it discussed earlier. Engineers report having to repeat context about modules they already explored. What is the most effective approach to address this?",
   "options": [
    {
     "key": "A",
     "text": "Create summaries of all source files before exploration begins, loading only these compressed representations into context."
    },
    {
     "key": "B",
     "text": "Implement automatic context clearing every 15 minutes to ensure the agent starts with fresh, uncontaminated context."
    },
    {
     "key": "C",
     "text": "Switch to a higher-capability model tier to provide more context-window space for the accumulated exploration data."
    },
    {
     "key": "D",
     "text": "Have the agent maintain a notes file that records key findings, referencing it for later questions."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Extended codebase exploration can degrade as context fills with verbose tool outputs and older details become less reliable. A notes file preserves key findings outside the transient conversation context, giving the agent a stable reference for modules, classes, dependencies, and conclusions already discovered. Clearing context discards useful work, pre-summarizing all files is expensive and shallow, and a larger model does not by itself guarantee that important findings stay organized and consistently referenced."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RYFFNMXYBXRZ13ZZRQ",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 36,
   "sourceOrder": 36,
   "variant": false,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "An engineer asks your agent to add comprehensive tests to a legacy codebase with 200 files and minimal existing test coverage. The engineer did not specify which modules to prioritize. How should the agent decompose this open-ended task?",
   "options": [
    {
     "key": "A",
     "text": "Create a fixed testing schedule up front based on the directory structure, assigning equal effort to each top-level directory regardless of code complexity or business importance."
    },
    {
     "key": "B",
     "text": "Systematically read all 200 files to create a complete inventory of functions before writing any tests, ensuring the testing plan accounts for every function before starting."
    },
    {
     "key": "C",
     "text": "Start writing tests for the first module alphabetically, using test failures and imports to discover related files organically."
    },
    {
     "key": "D",
     "text": "Use Glob and Grep to map the codebase structure, identify tightly coupled modules, create a prioritized plan for high-impact areas, and revise as dependencies are discovered."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "For an open-ended task in a large legacy codebase, the agent should first build an incremental map of the system rather than reading every file or starting arbitrarily. `Glob` can identify the file structure and existing tests, while `Grep` can reveal entry points, imports, call sites, and coupling. That information supports a prioritized testing plan focused on high-impact modules, and the plan can adapt as dependencies and risk areas become clearer."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RYGTVQ4DDDJY03D79E",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 37,
   "sourceOrder": 37,
   "variant": false,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "Your agent needs to insert a new helper function in the middle of a 150-line utility module, between two existing functions. The Edit tool fails because its old_string parameter cannot find unique text to match -- the file has docstrings, variable names, and structural patterns that repeat. What is the most reliable way to complete this insertion?",
   "options": [
    {
     "key": "A",
     "text": "Use Bash to append the function definition to the end of the file using heredoc syntax."
    },
    {
     "key": "B",
     "text": "Use Edit with an extremely long old_string that captures more than 30 lines of context to guarantee uniqueness."
    },
    {
     "key": "C",
     "text": "Use Edit's replace_all parameter to target a common pattern and embed the new function in the replacement text."
    },
    {
     "key": "D",
     "text": "Use Read to load the file, add the function at the appropriate location, then use Write to write the updated file."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "When `Edit` cannot find a unique `old_string`, continuing to force a replacement risks modifying the wrong location or failing again. Reading the full file, inserting the helper function at the correct location in the complete content, and writing the updated file is the reliable alternative for ambiguous or repetitive text. Appending with Bash would place the function incorrectly, very long match strings are brittle, and `replace_all` against a common pattern is unsafe."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RY40AYFABS7YQ8FQVY",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 38,
   "sourceOrder": 38,
   "variant": false,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "An engineer asks your agent to identify untested code paths in a legacy payment-processing module spanning 45 files. After reading the first 8 source files, the agent's responses become noticeably less accurate -- it is forgetting previously discussed code patterns and has not yet located all the test files or traced the critical payment flows. What is the most effective approach to complete this investigation?",
   "options": [
    {
     "key": "A",
     "text": "Clear the context with /clear, then selectively re-read only the most critical files discovered so far, writing key findings to a notes file that persists across context resets."
    },
    {
     "key": "B",
     "text": "Document all current findings in a summary report, clear the context entirely, then use that report as the sole reference to continue the investigation."
    },
    {
     "key": "C",
     "text": "Start subagents to investigate specific questions (e.g., 'find all test files for payment processing', 'trace the refund-flow dependencies') while the main agent coordinates findings and preserves high-level understanding."
    },
    {
     "key": "D",
     "text": "Switch to using Grep to search for specific function names instead of reading whole files, reducing the content loaded into context for the remaining exploration."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "The investigation is broad and the context is already degraded. Starting focused subagents lets each handle a bounded discovery task, such as locating payment tests or tracing refund dependencies, without flooding the main context with every file read. The main agent can coordinate and synthesize the results. Clearing the context or relying on a single summary risks losing detail, and using only `Grep` helps search but does not solve the broader need to split and coordinate the investigation."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RYDAXGZ29CXZTFTJEB",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 39,
   "sourceOrder": 39,
   "variant": false,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "An engineer asks the agent to find all callers of a function before deleting it. The function is defined in a core library but is also exposed through wrapper modules that rename it for domain-specific use (e.g., calculateTax in the library becomes computeOrderTax in the orders module). Which exploration strategy will most reliably identify all callers?",
   "options": [
    {
     "key": "A",
     "text": "Use Grep to search for the original function name across the entire codebase."
    },
    {
     "key": "B",
     "text": "Read the library and wrapper modules to identify all exposed names of the function, then use Grep for each name across the entire codebase."
    },
    {
     "key": "C",
     "text": "Use Grep to find all files that import from the library or the wrapper modules, then read each file to check whether it uses the function."
    },
    {
     "key": "D",
     "text": "Search for the function name in the project documentation to understand the intended usage patterns and navigate to the documented integration points."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "Searching only for the original function name will miss callers that use wrapper-level aliases like `computeOrderTax`. The reliable strategy is to understand how the function is exported and renamed across wrapper modules, collect all exposed names, and then search for each name across the entire codebase. Import-only searches can still miss indirect or aliased use, and documentation is not a complete source of the actual call sites."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RYSVFSX6Q8AK182XRN",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 40,
   "sourceOrder": 40,
   "variant": false,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "An engineer used Claude Code yesterday to investigate the authentication flows in a legacy monolith, accumulating significant context over a 2-hour session. Today she wants to continue that specific investigation. Since then she has worked on three other codebases and knows the session was named 'auth-deep-dive'. How should she resume it?",
   "options": [
    {
     "key": "A",
     "text": "Use --session-id with the UUID of yesterday's session transcript file."
    },
    {
     "key": "B",
     "text": "Use --resume auth-deep-dive to load that specific session by name."
    },
    {
     "key": "C",
     "text": "Use --continue to pick up where the most recent conversation left off."
    },
    {
     "key": "D",
     "text": "Start fresh and re-read the same files."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "The engineer wants to continue a specific named investigation, not just the most recent conversation. `--resume auth-deep-dive` loads that named session and preserves the accumulated context from the prior authentication analysis. `--continue` would risk resuming one of the other codebase sessions she worked on afterward, and starting fresh would waste the two hours of prior exploration."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RYF21RYS0B50DRCA4B",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 41,
   "sourceOrder": 41,
   "variant": false,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "Your code review assistant needs to analyze pull requests and provide feedback on three aspects: code style compliance, potential security issues, and documentation completeness. Each aspect requires reading files, running analysis tools, and generating a section of the report. The review process follows the same three-step workflow for every PR. Which task-decomposition pattern is most appropriate for this workflow?",
   "options": [
    {
     "key": "A",
     "text": "Orchestrator-workers -- have a central LLM analyze each PR to dynamically determine which checks are needed, then delegate to specialized worker LLMs for each identified subtask."
    },
    {
     "key": "B",
     "text": "Routing -- classify each PR by type (feature, bugfix, refactor) first, then route to different review prompts optimized for that category."
    },
    {
     "key": "C",
     "text": "Prompt chaining -- split the review into sequential steps where each aspect (style, security, documentation) is analyzed separately, with the outputs combined in a final synthesis step."
    },
    {
     "key": "D",
     "text": "Single comprehensive prompt -- include all instructions in one prompt and let the model handle all three aspects simultaneously."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "The review has the same known steps for every PR, and each aspect benefits from focused attention. Prompt chaining fits predictable multi-step workflows: run separate passes for style, security, and documentation, then combine the outputs in a final synthesis. Orchestrator-worker patterns are better when the needed subtasks are dynamic, routing is for choosing among different workflows, and a single comprehensive prompt risks attention dilution across the three review dimensions."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RYF650NAXV9J1DS8BJ",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 42,
   "sourceOrder": 42,
   "variant": false,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "An engineer asks the agent to find all files in the monorepo that import the @company/auth package to understand how authentication is used across services. Which built-in tool is most appropriate for this task?",
   "options": [
    {
     "key": "A",
     "text": "Glob, to find files with \"auth\" in their name or path."
    },
    {
     "key": "B",
     "text": "Bash, to run find . -type d -name \"*auth*\" and explore the matching directories."
    },
    {
     "key": "C",
     "text": "Read, starting with the package.json files to trace dependency declarations."
    },
    {
     "key": "D",
     "text": "Grep, to search for the import statement pattern within the files' contents."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "The engineer needs to find files whose contents import `@company/auth`. `Grep` is the appropriate built-in tool for searching within file contents for patterns such as import statements, function names, or error messages. `Glob` searches file paths, `Read` is too manual as a first step, and using `Bash` to inspect directories will miss imports in files whose paths do not include `auth`."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RZ8S696SAMWM2XK5TT",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 43,
   "sourceOrder": 43,
   "variant": false,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "An engineer who just joined the team asks the agent to help them understand the authentication and authorization architecture before making security improvements. The codebase has more than 800 files across multiple services. Which exploration strategy will build understanding most effectively, given Claude's built-in tools and context limits?",
   "options": [
    {
     "key": "A",
     "text": "Read all files that contain \"auth\", \"login\", \"permission\", or \"token\" in their content or filename."
    },
    {
     "key": "B",
     "text": "Read the CLAUDE.md and README files first, then ask the engineer to specify which 10-15 files are most important for understanding the auth system."
    },
    {
     "key": "C",
     "text": "Use Grep to find the authentication entry points, read those files, then follow the imports and function calls to map the authentication flow incrementally."
    },
    {
     "key": "D",
     "text": "Launch subagents in parallel to explore different services simultaneously, then synthesize their findings into an architectural overview."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "With more than 800 files, reading all auth-related files up front would flood the context and still might not reveal the flow. The best approach is incremental: use `Grep` to find concrete authentication and authorization entry points, `Read` the relevant files, then follow imports, call sites, and dependencies to build the architecture map. This keeps the context focused and grounded in real code paths. Parallel subagents can help later, but the first step should establish the actual entry points and flow."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RZ8E7WATSEYGN3EYQV",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 44,
   "sourceOrder": 44,
   "variant": false,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "An engineer asks the agent to understand how the caching layer works before adding a new cache-invalidation trigger. After initial Grep searches, the agent determined that the caching logic spans 15 files including decorators, middleware, and service classes (~8,000 lines total). What is the most effective next step to build understanding while managing context constraints?",
   "options": [
    {
     "key": "A",
     "text": "Use the Read tool to sequentially load all 15 files, building complete understanding of the entire caching implementation."
    },
    {
     "key": "B",
     "text": "Analyze the imports and class hierarchies to identify the base cache class, read that file to understand the interface, then trace the specific invalidation implementations."
    },
    {
     "key": "C",
     "text": "Use Grep to search for \"invalidate\" and \"expire\" patterns across all files, then read only those specific line ranges with minimal surrounding context."
    },
    {
     "key": "D",
     "text": "Use Glob to find files matching common cache patterns (cache.py, caching/), prioritize the largest files by reading them first, then check the smaller files for gaps."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "After finding a broad set of cache-related files, the next step should narrow the problem to the system's structure. Identifying the base cache abstraction and reading its interface gives a stable mental model, then tracing the invalidation implementations follows the actual architecture. Reading all 15 files would overload context, keyword-only searches for `invalidate` and `expire` may miss important control flow, and prioritizing by file size is not a reliable indicator of architectural importance."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RZ71SDX5Z7GAW92ZKH",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 45,
   "sourceOrder": 45,
   "variant": false,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "An engineer's exploration subagent spent 30 minutes analyzing a legacy payment system, reading 47 files and documenting data flows. The session was interrupted when the engineer's connection dropped. While they were away, a teammate merged a PR that renamed two utility functions. The engineer wants to continue the same exploration. What is the most effective approach?",
   "options": [
    {
     "key": "A",
     "text": "Resume the subagent from its previous transcript without mentioning the changes -- the architectural understanding is still valid."
    },
    {
     "key": "B",
     "text": "Launch a new subagent with a summary of the previous findings."
    },
    {
     "key": "C",
     "text": "Resume the subagent from its previous transcript and inform it about the renamed functions."
    },
    {
     "key": "D",
     "text": "Launch a new subagent and include the previous transcript in the initial prompt as context."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "The previous exploration contains substantial useful context, so restarting would waste work. However, the teammate's merge means some prior observations may be stale. Resuming the session while explicitly telling the agent which utility functions were renamed lets it preserve the 30 minutes of analysis and perform targeted re-analysis around the changed symbols. Resuming silently risks stale assumptions, and passing a full prior transcript to a new subagent is inefficient."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RZ6JA0DSHVD77DF9PS",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 46,
   "sourceOrder": 46,
   "variant": false,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "You have been assigned to add real-time updates to the application. This could be implemented using WebSockets, Server-Sent Events, or polling, each with different complexity, browser support, and infrastructure requirements. What is the most effective way to begin this task?",
   "options": [
    {
     "key": "A",
     "text": "Begin direct execution with WebSockets, then refactor if infrastructure problems arise."
    },
    {
     "key": "B",
     "text": "Enter plan mode to explore the architecture, evaluate the trade-offs, and present options for team approval before implementing."
    },
    {
     "key": "C",
     "text": "Use direct execution with a prompt asking Claude to analyze all approaches and implement the one it determines is best."
    },
    {
     "key": "D",
     "text": "Use direct execution to implement polling first, then evaluate whether to upgrade to WebSockets later."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "Real-time updates involve architectural trade-offs among WebSockets, Server-Sent Events, and polling, including infrastructure requirements, browser support, operational complexity, and product needs. Plan mode is appropriate before implementation because it lets Claude investigate the existing architecture, compare the options, and produce a decision proposal for the team. Direct execution would prematurely commit to one approach before understanding the trade-offs."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RZB1Z43B6XT1EJRY3V",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 47,
   "sourceOrder": 47,
   "variant": false,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "Your team's CLAUDE.md includes a rule: \"Use 4-space indentation and always run Prettier formatting.\" Despite this, code reviews reveal that roughly 30% of the files Claude Code generates use inconsistent formatting -- sometimes 2-space indentation, sometimes missing trailing commas. Adding emphasis (\"IMPORTANT: you MUST use Prettier formatting\") reduces violations to about 15%, but does not eliminate them. What is the most effective way to ensure all generated code is consistently formatted?",
   "options": [
    {
     "key": "A",
     "text": "Add a Stop hook with a prompt-based check that evaluates whether the generated code follows the formatting standards and asks Claude to fix violations."
    },
    {
     "key": "B",
     "text": "Split the formatting rules into path-scoped .claude/rules/ files that load when Claude works on matching file types."
    },
    {
     "key": "C",
     "text": "Extract the formatting rules into a dedicated skill that Claude loads automatically when generating code, with more detailed examples of the correct formatting."
    },
    {
     "key": "D",
     "text": "Configure a PostToolUse hook with an Edit|Write matcher that automatically runs Prettier on every file Claude modifies."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Formatting is a deterministic post-processing concern, so it should be enforced by tooling rather than relying on prompt compliance. A `PostToolUse` hook that matches `Edit` and `Write` can automatically run Prettier on modified files, eliminating inconsistent indentation and trailing-comma issues regardless of what Claude initially generated. More emphasis in instructions, path-scoped rules, or skills may improve behavior but still depend on the model following the formatting guidance."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RZDVDWJPPBH92R5AG6",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 48,
   "sourceOrder": 48,
   "variant": false,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "You need to add date validation that ensures event dates are in the future. This requires adding a conditional statement to an existing function in a single file. What is the most appropriate approach?",
   "options": [
    {
     "key": "A",
     "text": "Start with extended thinking mode enabled to ensure thorough reasoning about the validation logic."
    },
    {
     "key": "B",
     "text": "Enter plan mode to analyze how the validation might impact other parts of the booking flow."
    },
    {
     "key": "C",
     "text": "Use direct execution to make the change."
    },
    {
     "key": "D",
     "text": "Enter plan mode first to create a detailed implementation strategy before making the change."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "This is a simple, well-scoped modification: adding a validation conditional to an existing function in a single file. Direct execution is appropriate for clearly scoped changes with low architectural risk. Plan mode is better for multi-file changes, architectural decisions, or tasks with multiple viable approaches, and extended thinking is unnecessary for a straightforward validation check."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RZ5F73KKZGD0DRDTWH",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 49,
   "sourceOrder": 49,
   "variant": false,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "Your team frequently migrates components from React to Vue. You wrote a step-by-step workflow for Claude Code to follow during each migration, and you want every developer on the team to invoke it by typing /migrate-component. The workflow must stay in sync as the team iterates on it. Where should you place the skill file?",
   "options": [
    {
     "key": "A",
     "text": "In .claude/skills/migrate-component/SKILL.md at the project root, committed to version control."
    },
    {
     "key": "B",
     "text": "In the project's .claude/settings.json using a skillOverrides entry to register and define the workflow."
    },
    {
     "key": "C",
     "text": "As a detailed instruction block in the project root's CLAUDE.md file."
    },
    {
     "key": "D",
     "text": "In ~/.claude/skills/migrate-component/SKILL.md on each developer's machine."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "A workflow that must be shared by all developers and kept in sync as the team improves it belongs in the repository, not in each developer's personal configuration. A project skill at `.claude/skills/migrate-component/SKILL.md` can be versioned, reviewed, and updated with the codebase. `CLAUDE.md` would load the workflow into every conversation unnecessarily, and per-user skill files would diverge across machines."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RZTTMC0NNFJSM3STY5",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 50,
   "sourceOrder": 50,
   "variant": false,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "Your team connected a custom MCP server that provides DevOps workflow templates. The server exposes several MCP prompts (such as deploy_checklist and incident_response) in addition to tools. How do these MCP prompts become accessible within Claude Code?",
   "options": [
    {
     "key": "A",
     "text": "They are added to Claude Code's tool registry alongside the server's tools, invoked automatically by the model when relevant to the task."
    },
    {
     "key": "B",
     "text": "They are automatically prepended to every conversation as additional system-level context, influencing Claude's behavior throughout the session."
    },
    {
     "key": "C",
     "text": "They are exposed as @-mentionable resources alongside files, fetched and attached to your message when referenced."
    },
    {
     "key": "D",
     "text": "They appear as slash commands (e.g., /mcp__servername__deploy_checklist) that you can invoke, with arguments passed after the command name."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "MCP prompts are reusable prompt templates exposed by the server. In Claude Code, they are exposed for explicit invocation as slash commands, using a namespaced form that identifies the MCP server and the prompt name. They are not tools automatically selected by the model, not system context prepended to every conversation, and not `@`-mentionable resources like files or catalogs."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RZBQMDNJ030HT06WYY",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 51,
   "sourceOrder": 51,
   "variant": false,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "Your monorepo contains shared code standards in /docs/standards/: security-rules.md (for services handling user data), testing-patterns.md (for all packages), and api-conventions.md (for services exposed as APIs). Your 15 packages are organized by feature domain (/packages/auth/, /packages/billing/, /packages/notifications/, etc.) with no naming conventions indicating which handle user data or expose APIs. Package maintainers are expected to configure their own local development settings, since they know their package's domain requirements. Currently, all package CLAUDE.md files duplicate all three standards, applying irrelevant guidance. What is the most effective approach?",
   "options": [
    {
     "key": "A",
     "text": "Put all standards in the root CLAUDE.md with override instructions like \"ignore security-rules.md when working on packages that do not handle user data\"."
    },
    {
     "key": "B",
     "text": "Create a shared-standards.md that uses @imports to combine all three standards, then have each package's CLAUDE.md import that combined file."
    },
    {
     "key": "C",
     "text": "Create .claude/rules/ files for each standard with paths in YAML frontmatter listing each package directory where that standard should apply."
    },
    {
     "key": "D",
     "text": "Use @imports in each package's CLAUDE.md to reference only the standards files relevant to that package, based on the maintainer's domain knowledge."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "The standards are modular, but applicability depends on domain knowledge that cannot be inferred from package paths or names. Using `@import` in each package's `CLAUDE.md` lets maintainers include only the standards that actually apply to their package while the source files stay centralized in `/docs/standards/`. Root-level ignore instructions and combined imports would still load irrelevant guidance, while path-scoped rules require maintaining explicit package lists for criteria that are not obvious from paths."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3RZHNQKFFB0S2RA4FFT",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 52,
   "sourceOrder": 52,
   "variant": false,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "You documented API error-handling conventions in a CLAUDE.md file at the project root, specifying that endpoint handlers must use a custom ApiError class. After several sessions, you notice that Claude Code sometimes follows these conventions and sometimes uses generic try/catch blocks with text messages. The inconsistency appears random across different coding sessions. What is the most efficient first diagnostic step?",
   "options": [
    {
     "key": "A",
     "text": "Search for conflicting instructions in ~/.claude/CLAUDE.md or ~/.claude/rules/ that might be overriding the project conventions."
    },
    {
     "key": "B",
     "text": "Create path-specific rules in .claude/rules/handlers.md with YAML frontmatter that scopes the error-handling instructions to API handler files."
    },
    {
     "key": "C",
     "text": "Add more detailed code examples to your CLAUDE.md showing the exact ApiError usage pattern for different endpoint types."
    },
    {
     "key": "D",
     "text": "Run /memory to verify which memory files are loaded and confirm that your CLAUDE.md is included."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Before changing configuration, the fastest diagnostic step is to confirm whether Claude Code is actually loading the expected project memory file in the sessions where the behavior is inconsistent. `/memory` shows which memory files are active, helping identify hierarchy or loading issues. Adding examples or path-specific rules may help afterward, but first does not verify that the existing `CLAUDE.md` is being applied."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3S03YTS2VVG2YJP4V6Z",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 53,
   "sourceOrder": 53,
   "variant": false,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "Your team has three requirements for Claude Code's behavior in your project:\n\n1. Claude must never modify files in the db/migrations/ directory\n2. Claude should prefer your custom logging module over console.log\n3. All TypeScript files must be automatically formatted with Prettier after every edit\n\nAll three are currently written as instructions in your project's CLAUDE.md. During a complex refactoring session, a developer discovers that Claude edited a migration file, violating requirement #1. How should you restructure these requirements into Claude Code's configuration mechanisms?",
   "options": [
    {
     "key": "A",
     "text": "Rewrite all three requirements in CLAUDE.md using stronger directive language and add few-shot examples demonstrating Claude refusing to edit migration files and running Prettier after edits."
    },
    {
     "key": "B",
     "text": "Add Edit(./db/migrations/**) to permissions.deny in the project configuration, keep the logging preference in CLAUDE.md, and add a PostToolUse hook on the Edit tool that runs Prettier on modified TypeScript files."
    },
    {
     "key": "C",
     "text": "Move all three requirements to .claude/rules/ as path-scoped rules: one targeting db/migrations/** that forbids editing those files, and others targeting **/*.ts for the logging convention and the formatting instruction."
    },
    {
     "key": "D",
     "text": "Configure hooks for all three: a PreToolUse hook script that blocks Edit calls targeting db/migrations/, a PreToolUse hook script that adds logging-convention context before edits, and a PostToolUse hook that runs Prettier after TypeScript edits."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "These requirements have different enforcement needs. 'Never modify migrations' is a hard safety rule and should be enforced by permissions rather than prompt instructions. Preferring a custom logging module is a project-wide code convention, so `CLAUDE.md` is appropriate. Formatting after edits is deterministic automation, so a `PostToolUse` hook should run Prettier on modified TypeScript files. Stronger wording or path-scoped prompt rules still depend on model compliance for requirements that must be enforced mechanically."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3S0CPT5MC0XY26NDZHH",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 54,
   "sourceOrder": 54,
   "variant": false,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "A security audit requires updating your authentication library from v2 to v3. The migration guide documents breaking changes: authenticate() now returns a Promise instead of accepting a callback, the User type has restructured fields, and three deprecated methods were removed. Grep shows the library is imported in 45 files across several modules. What is the most effective approach?",
   "options": [
    {
     "key": "A",
     "text": "Paste the breaking changes from the migration guide into your prompt and use direct execution to update all usages across the 45 files."
    },
    {
     "key": "B",
     "text": "Update the dependency version, run the test suite, and use Claude Code to fix each failure as it appears."
    },
    {
     "key": "C",
     "text": "Create a custom slash command that encapsulates the migration transformations and run it against each file without prior code exploration."
    },
    {
     "key": "D",
     "text": "Enter plan mode to explore the library usage across all modules, map the affected code paths, and then create a migration strategy before implementing."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "This is a multi-file migration with breaking API changes across 45 files. Plan mode is appropriate because Claude Code should first map the different usage patterns, understand the callback-to-Promise change, identify the affected `User` type assumptions, and plan how to replace the removed methods before editing. Direct execution or test-failure-driven fixes would likely produce fragmented changes and miss cross-module patterns."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3S0S92C7QHM5RM2ANMW",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 55,
   "sourceOrder": 55,
   "variant": false,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "You are implementing a caching layer for API responses to speed up the /products endpoint. You have a rough idea -- Redis with a 5-minute TTL -- but you are new to production caching and unsure what other considerations a robust implementation requires. What is the most effective way to start your iterative workflow?",
   "options": [
    {
     "key": "A",
     "text": "Start with a minimal request: 'Add Redis caching to /products with a 5-minute TTL.' Add features and fix problems through follow-up prompts as they arise during testing."
    },
    {
     "key": "B",
     "text": "Use plan mode to analyze the current /products endpoint implementation, then provide the caching requirements once Claude explains how the existing code is structured."
    },
    {
     "key": "C",
     "text": "Write a spec with the known requirements and 'TBD' markers for the uncertain areas, having Claude propose solutions for each TBD while implementing."
    },
    {
     "key": "D",
     "text": "Ask Claude to interview you about the caching requirements before implementing, identifying considerations such as invalidation strategies, cache layers, consistency guarantees, and failure modes."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "The user has a rough implementation idea but lacks clarity about production requirements. The interview pattern is appropriate because it helps surface design considerations the developer may not have anticipated, such as invalidation, consistency, fallback behavior, cache stampedes, observability, and failure modes. Starting with a minimal implementation or filling in `TBD` markers would likely miss important decisions, while plan mode can only analyze the code structure without eliciting the missing product and operational requirements."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3S0671ZK85V2M9E2RWZ",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 56,
   "sourceOrder": 56,
   "variant": false,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "You are implementing a complex graph-traversal algorithm with specific performance requirements and edge cases to handle (disconnected nodes, cycles, weighted edges). You want to structure your workflow for efficient iterative refinement with Claude. Which approach will most effectively enable progressive improvement across multiple iterations?",
   "options": [
    {
     "key": "A",
     "text": "Write a test suite covering the expected behavior, edge cases, and performance requirements before implementation. Ask Claude to write code that passes the tests, then iterate by sharing test failures with each refinement request."
    },
    {
     "key": "B",
     "text": "Provide Claude with a reference implementation from the documentation, then ask it to rewrite the code to match your code style and add the required edge-case handling, comparing results against the reference."
    },
    {
     "key": "C",
     "text": "Provide Claude with a detailed natural-language specification of the algorithm, including all requirements and edge cases. Review each output manually and provide descriptive feedback about what behavior needs to change."
    },
    {
     "key": "D",
     "text": "Have Claude extensively research the algorithm and create a detailed implementation plan using extended thinking, then implement the complete solution based on that plan."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "For a complex algorithm, tests provide concrete, repeatable feedback across iterations. Covering disconnected nodes, cycles, weighted edges, expected outputs, and performance constraints gives Claude a clear target and turns each refinement into a specific response to the failing cases. Natural-language review alone is less precise, and a detailed plan does not guarantee correctness on edge cases without executable feedback."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3S04CBZ9PEMR21VH3N1",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 57,
   "sourceOrder": 57,
   "variant": false,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "Your team wants Claude to follow a detailed code-review checklist (8 items covering API changes, test coverage, documentation, security, etc.) when reviewing pull requests. The team also uses Claude extensively for other tasks: writing new features, debugging production issues, and generating documentation. Currently, developers paste the checklist at the start of each review session. Which approach best addresses this workflow need?",
   "options": [
    {
     "key": "A",
     "text": "Configure plan mode as the default for code-review sessions."
    },
    {
     "key": "B",
     "text": "Create a dedicated review subagent with the checklist embedded in its configuration."
    },
    {
     "key": "C",
     "text": "Add the checklist to the project's CLAUDE.md file under a 'Code Review' section."
    },
    {
     "key": "D",
     "text": "Create a /review slash command that contains the checklist, invoked when starting reviews."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "A slash command fits a repeatable workflow that developers intentionally start only for pull-request reviews. It keeps the detailed checklist out of ordinary feature, debugging, and documentation sessions while giving the team a consistent review procedure without pasting the checklist manually every time."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3S0REMK190Z3ZJVQZEG",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 58,
   "sourceOrder": 58,
   "variant": false,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "Your team is configuring MCP servers in Claude Code. You want to add a shared venue-search server that all team members should have access to, and personally you want to add an experimental music-playlist server that only you are testing. Which configuration approach correctly applies MCP server scopes?",
   "options": [
    {
     "key": "A",
     "text": "Add the venue server to ~/.claude.json and the playlist server to .mcp.json."
    },
    {
     "key": "B",
     "text": "Add both servers to the project-level .mcp.json file."
    },
    {
     "key": "C",
     "text": "Add the venue server to .mcp.json and the playlist server to ~/.claude.json."
    },
    {
     "key": "D",
     "text": "Add both servers to your local ~/.claude.json."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "A server that all team members should use belongs in the project-scoped `.mcp.json`, because it can be shared with the repository. A personal, experimental server belongs in the user-scoped `~/.claude.json`, because it should affect only the developer testing it."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3S0TW6567F0VNBA1TC4",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 59,
   "sourceOrder": 59,
   "variant": false,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "A critical bug is affecting production users. The error logs show exceptions in the OrderProcessing module with a clear stack trace pointing to a specific function. You have never worked with this module before. What is the most effective approach?",
   "options": [
    {
     "key": "A",
     "text": "Enter plan mode to explore the module's architecture and dependencies before attempting any fix."
    },
    {
     "key": "B",
     "text": "Start with direct execution to gather initial information, then switch to plan mode to design a comprehensive solution before implementing any changes."
    },
    {
     "key": "C",
     "text": "Use direct execution to examine the stack trace, read the relevant code, and implement a fix once the root cause is identified."
    },
    {
     "key": "D",
     "text": "Use plan mode to analyze the error in the context of the module's design, enumerate possible root causes, and prioritize fixes systematically."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "The problem is urgent and already well scoped by the logs and stack trace. Direct execution lets Claude inspect the failing function, follow the immediate code path, identify the root cause, and apply a specific fix without spending time on a broader architectural planning phase that is not needed given the available evidence."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "01KT81N3S0C1M5J6RM7SWACX1G",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 60,
   "sourceOrder": 60,
   "variant": false,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "You asked Claude Code to build a PDF report-generation feature. The initial implementation queries the database correctly, but the output has formatting problems: the table columns are too narrow, causing content truncation; dates display without the correct format; and page-break handling is incorrect. You notice these problems interact -- changing column width affects how dates render, and page breaks depend on content height. What is the most effective approach to iterate toward a working solution?",
   "options": [
    {
     "key": "A",
     "text": "Address the column-width problem first with specific measurements, verify it works, then fix the date formatting within the corrected columns, then adjust the page breaks -- testing after each change."
    },
    {
     "key": "B",
     "text": "Start from scratch with a detailed prompt specifying all formatting requirements from the beginning."
    },
    {
     "key": "C",
     "text": "Show Claude an example of a correctly formatted report and ask it to match that output, rather than listing the specific technical problems."
    },
    {
     "key": "D",
     "text": "Provide all three problems in a single detailed message with exact specifications for each, allowing Claude to address them together in one update."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "The formatting problems interact, so fixing them one at a time can cause later changes to invalidate earlier work. Providing the column-width, date-format, and page-break requirements together gives Claude the complete set of constraints needed to produce a coherent layout update."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "16NZHE8NDJRD27K97THYP3G15P",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 61,
   "sourceOrder": 61,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "In 12% of cases the agent skips `get_customer` and calls `lookup_order` using only the name the customer said, which sometimes misidentifies the account and issues incorrect refunds. Which change fixes this most reliably?",
   "options": [
    {
     "key": "A",
     "text": "A programmatic prerequisite that blocks `lookup_order` and `process_refund` until `get_customer` has returned a verified customer ID."
    },
    {
     "key": "B",
     "text": "Reinforce the system prompt to require identity verification before any order operation."
    },
    {
     "key": "C",
     "text": "Add few-shot examples showing the agent always calling `get_customer` first."
    },
    {
     "key": "D",
     "text": "A routing classifier that enables only the appropriate subset of tools per request."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Critical business logic -- verifying identity before refunding -- demands deterministic guarantees the prompt cannot provide. A programmatic prerequisite that blocks downstream tools until `get_customer` verifies the account eliminates the failure by design. Reinforcing the prompt or few-shot rely on probabilistic compliance, insufficient when money and identity are at stake; the routing classifier changes which tools are available, not the execution order, which is the real problem."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "C580FASHETYTCCRZXMN133QM3Y",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 62,
   "sourceOrder": 62,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "The agent calls `get_customer` when the user asks about an order ('check my order #12345') instead of `lookup_order`. Both tools have minimal descriptions and accept similar identifiers. What is the most effective first step?",
   "options": [
    {
     "key": "A",
     "text": "Add 5-8 few-shot examples of correct tool selection."
    },
    {
     "key": "B",
     "text": "Expand each tool's description with input formats, example queries, edge cases, and boundaries (when to use one versus the other)."
    },
    {
     "key": "C",
     "text": "A router that parses the input and pre-selects the tool by keywords."
    },
    {
     "key": "D",
     "text": "Consolidate both tools into a single `lookup_entity`."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "Tool descriptions are the model's primary selection mechanism; minimal descriptions cause confusion between similar tools. Expanding them attacks the root cause with low effort and high leverage. Few-shot adds tokens without fixing the cause, a keyword router is over-engineered, and consolidating is valid but more costly than a first step."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "GHAG13XM8G4BY47DVQW2BZ4BYX",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 63,
   "sourceOrder": 63,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "The agent reaches 55% resolution (target 80%). It escalates easy cases (damage replacements with a photo) and only resolves the complex ones (policy exceptions). What is the best way to improve escalation calibration?",
   "options": [
    {
     "key": "A",
     "text": "Define explicit escalation criteria and add few-shot examples of when to escalate versus resolve."
    },
    {
     "key": "B",
     "text": "Have the agent report its own confidence (1-10) and route to a human below a threshold."
    },
    {
     "key": "C",
     "text": "Train a classifier on labeled historical tickets."
    },
    {
     "key": "D",
     "text": "Use sentiment analysis to escalate when frustration is detected."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The problem is unclear decision boundaries; explicit criteria with few-shot teach when to escalate and when to resolve. The LLM's self-reported confidence is poorly calibrated, a trained classifier is over-engineering, and sentiment does not correlate with the real complexity of the case."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "2CN7YJ2QTAB91YJT7M6DCNR0T5",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 64,
   "sourceOrder": 64,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "Policy requires that no automatic refund exceed $500; above that it must go to a human. Today the rule is written in uppercase in the system prompt, but occasionally the agent processes larger refunds. What is the most reliable approach?",
   "options": [
    {
     "key": "A",
     "text": "A `PreToolUse` hook that intercepts `process_refund` calls, blocks amounts above $500, and redirects them to human escalation."
    },
    {
     "key": "B",
     "text": "Repeat the rule with more emphasis and examples in the system prompt."
    },
    {
     "key": "C",
     "text": "Add the limit constraint to the `process_refund` tool description."
    },
    {
     "key": "D",
     "text": "A post-review step that checks issued refunds and reverses those exceeding the limit."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Critical business and compliance rules must live in the deterministic middleware layer, not in the probabilistic fabric of the prompt. A `PreToolUse` hook blocks the action before it touches the backend, guaranteeing the limit. Emphasis in the prompt or in the description still depends on model compliance, and reversing afterward already let the improper refund happen."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "RZQP7697FEVFCREVJ7S78ZZ76K",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 65,
   "sourceOrder": 65,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "When `process_refund` fails, the tool always returns 'Operation failed'. The agent cannot tell a transient timeout from a policy violation, so it retries operations that should never be retried. Which error-response design best enables proper recovery?",
   "options": [
    {
     "key": "A",
     "text": "Have the tool retry internally with backoff and return 'unavailable' after exhausting retries."
    },
    {
     "key": "B",
     "text": "Log the detailed error to the server logs and return a generic message to the agent to avoid exposing details."
    },
    {
     "key": "C",
     "text": "Return structured metadata with `isError`, `errorCategory` (transient/validation/permission/business), and `isRetryable`, plus a human-readable description."
    },
    {
     "key": "D",
     "text": "Have the agent escalate to a human on any tool failure."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "Uniform responses prevent the agent from making good recovery decisions. Structured metadata with the error category and whether it is retryable lets the agent retry transient failures and avoid retrying business ones. Internal backoff hides the context, a generic message repeats the problem, and escalating on any failure wastes recovery of transient failures."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "1P0DZYY9A91VZNKSDF2J098VMJ",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 66,
   "sourceOrder": 66,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "When the agent escalates to a human, the operator receives the entire chat log and wastes time reconstructing the case. What improves the handoff most effectively?",
   "options": [
    {
     "key": "A",
     "text": "Generate a structured escalation package (customer_id, issue_summary, order_id, root_cause, actions_taken[], refund_amount, recommended_action, escalation_reason)."
    },
    {
     "key": "B",
     "text": "Attach the full conversation transcript with timestamps."
    },
    {
     "key": "C",
     "text": "A free-prose summary generated by the model at escalation time."
    },
    {
     "key": "D",
     "text": "A link to the customer's history for the operator to consult manually."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The human operator should not read the whole chat; they need a structured, actionable summary. A handoff package with the key facts and the recommended action lets them continue without reconstructing the case. The full transcript or a link shift the work to the human, and a free-prose summary is less reliable and may omit critical fields."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "7P4AKHCMQZ6PR1WWG597SB4NJS",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 67,
   "sourceOrder": 67,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "A customer writes: 'No bots, connect me to a person right now.' The agent still tries to diagnose the problem and offer solutions before escalating. What is the correct behavior?",
   "options": [
    {
     "key": "A",
     "text": "Escalate to a human immediately since it is an explicit request, without trying to investigate first."
    },
    {
     "key": "B",
     "text": "Attempt to resolve the problem once and escalate only if the attempt fails."
    },
    {
     "key": "C",
     "text": "Analyze sentiment to confirm the frustration before deciding to escalate."
    },
    {
     "key": "D",
     "text": "Ask the customer to explain their problem to assess whether they truly need a human."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "An explicit request to speak with a human is an escalation trigger that must be honored immediately. Insisting on resolving, measuring sentiment, or interrogating the customer ignores the direct request and degrades the experience; those steps apply when the issue is straightforward and the customer has not demanded a human."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "8SV0T4PKHS7DZDQEPWMFNNMXCZ",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 68,
   "sourceOrder": 68,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "`get_customer` returns three different customers matching the provided name. What should the agent do?",
   "options": [
    {
     "key": "A",
     "text": "Ask the customer for additional identifiers (email, order number, or postal code) to disambiguate before proceeding."
    },
    {
     "key": "B",
     "text": "Pick the match with the most recent account activity as the most likely one."
    },
    {
     "key": "C",
     "text": "Pick the match whose profile is most complete."
    },
    {
     "key": "D",
     "text": "Process the query for all three accounts and let the customer identify the correct one in the response."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "With multiple matches, choosing by heuristic risks acting on the wrong account -- especially serious before order operations or refunds. The correct move is to ask for additional identifiers to verify identity. Guessing by recency or completeness, or exposing three accounts' data, compromises accuracy and privacy."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "5CTSDGN88MD1SSNWM0RP6NQ8A3",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 69,
   "sourceOrder": 69,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "In long multi-turn conversations, the agent starts forgetting the order number and the agreed refund amount because the history is being summarized. What is the most effective way to preserve this data?",
   "options": [
    {
     "key": "A",
     "text": "Extract the transactional facts (amounts, dates, order IDs, statuses) into a persistent 'case facts' block included in every prompt, outside the summarized history."
    },
    {
     "key": "B",
     "text": "Increase the summary length so it retains more detail from each turn."
    },
    {
     "key": "C",
     "text": "Switch to a model with a larger context window so it never summarizes."
    },
    {
     "key": "D",
     "text": "Repeat the entire full history without summarizing on every request."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Precise transactional values are lost when progressive summarization condenses them. Keeping a 'case facts' block with that data in every prompt, separate from the summarized history, preserves them reliably. A longer summary still risks loss, a bigger model does not guarantee retaining the exact value, and repeating the whole history wastes context."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "NSY0WXVNGD9Y36Q30N89CXZ8K9",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 70,
   "sourceOrder": 70,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "The order and billing tools return dates in different formats (Unix timestamps, ISO 8601, and numeric status codes), which confuses the agent when comparing events. What is the most reliable approach to unify them?",
   "options": [
    {
     "key": "A",
     "text": "A `PostToolUse` hook that intercepts the tools' results and normalizes dates and statuses to a uniform format before the model processes them."
    },
    {
     "key": "B",
     "text": "Instruct the agent in the prompt to mentally convert each format when comparing."
    },
    {
     "key": "C",
     "text": "Add a note about the returned format to each tool description."
    },
    {
     "key": "D",
     "text": "A post-processing step that reformats the agent's final response to the user."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Normalizing heterogeneous formats is a deterministic transformation that must happen before the model reasons. A `PostToolUse` hook transforms the tools' results into a uniform format reliably. Asking for it in the prompt depends on model compliance, documenting the format does not unify it, and reformatting the final output does not help the intermediate reasoning."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "9BJ69C0R78NAP6DNAEZZ0HGE03",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 71,
   "sourceOrder": 71,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "Your team proposes giving the support agent access to all 20 internal tools (orders, billing, shipping, marketing, analytics...) 'just in case'. In testing, the agent sometimes invokes tools outside support. What is the best design?",
   "options": [
    {
     "key": "A",
     "text": "Give the agent only the small set of tools its role needs (get_customer, lookup_order, process_refund, escalate_to_human) and add specific tools only for real high-frequency needs."
    },
    {
     "key": "B",
     "text": "Keep the 20 tools but add prompt instructions to use only the support ones."
    },
    {
     "key": "C",
     "text": "Keep the 20 tools plus a classifier that pre-selects which to show per request."
    },
    {
     "key": "D",
     "text": "Merge the related tools into a few broad general-purpose tools."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "A tool set that is too large degrades selection reliability and encourages cross-domain misuse. Least privilege -- only the role's tools -- is the best design. Prompt instructions still depend on compliance, a classifier is over-engineering, and merging into generic tools reintroduces selection ambiguity."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "068VHSGT0D3RYPMYSXGQT7NNBX",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 72,
   "sourceOrder": 72,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "In the support agent's agentic loop, how should the host application decide that the turn is over and the text is the final response for the customer?",
   "options": [
    {
     "key": "A",
     "text": "By strictly evaluating that `stop_reason` is `end_turn`."
    },
    {
     "key": "B",
     "text": "By looking for phrases like 'done' or 'resolved' in the response text."
    },
    {
     "key": "C",
     "text": "By stopping when it reaches a fixed iteration cap (e.g., 50)."
    },
    {
     "key": "D",
     "text": "By checking whether the assistant's response contains text instead of a tool call."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The agentic loop's control flow relies on the server signal `stop_reason`; `end_turn` indicates the model is finished. Parsing natural-language text is brittle to formatting variations, the iteration cap is only a safety fallback, and the mere presence of text does not reliably distinguish an intermediate turn from the final response."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "10HX087CSB4FK0ZQMPCVQSVEGM",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 73,
   "sourceOrder": 73,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "Each `get_customer` call returns more than 40 fields, but the agent only needs 5 (name, email, tier, account status, and order IDs). In long conversations that volume fills the context and degrades responses. What is the best solution?",
   "options": [
    {
     "key": "A",
     "text": "Trim the tool output to only the relevant fields before it accumulates in the context."
    },
    {
     "key": "B",
     "text": "Increase the context window size by switching models."
    },
    {
     "key": "C",
     "text": "Periodically summarize the whole conversation as the context grows."
    },
    {
     "key": "D",
     "text": "Ask in the prompt for the agent to ignore the irrelevant fields."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Tool results accumulate tokens disproportionate to their relevance. Trimming them to the needed fields before they enter the context attacks the direct cause. A bigger model does not avoid accumulation, summarizing risks losing precise transactional facts, and asking to 'ignore' in the prompt does not stop those tokens from occupying and polluting the context."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "XQXDTJ3ZWJD79H3W4FW08F895X",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 74,
   "sourceOrder": 74,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "A customer asks to match a competitor's price. Company policy only covers price adjustments within its own site and says nothing about competitors. What should the agent do?",
   "options": [
    {
     "key": "A",
     "text": "Escalate to a human because the policy is ambiguous or silent about this specific request."
    },
    {
     "key": "B",
     "text": "Deny the request because the policy does not explicitly cover it."
    },
    {
     "key": "C",
     "text": "Grant the adjustment, assuming it is equivalent to an own-site adjustment."
    },
    {
     "key": "D",
     "text": "Report high uncertainty and let the customer decide whether to insist."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Policy exceptions and gaps -- not just complex cases -- are valid escalation triggers. When the policy does not cover the request, a human must decide. Denying or granting on its own invents policy, and shifting the decision to the customer does not resolve the gap."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "HSAC0N6K9EGC6KS4N28J7WTVEE",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 75,
   "sourceOrder": 75,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "A customer writes a single message with three issues: a refund for a damaged item, a question about another order's status, and a billing complaint. What is the best approach to resolve it?",
   "options": [
    {
     "key": "A",
     "text": "Decompose the message into the three issues, handle each with its corresponding tool, and synthesize a unified response."
    },
    {
     "key": "B",
     "text": "Handle only the most urgent issue and ask the customer to resend the others separately."
    },
    {
     "key": "C",
     "text": "Escalate to a human because the message contains multiple issues."
    },
    {
     "key": "D",
     "text": "Answer all three issues with a single call to a generic tool."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "A multi-topic request should be split into distinct issues, each resolved with the right tool, and then synthesized into a unified resolution. Handling only one or asking for resends degrades the experience, escalating merely because there are several issues is unnecessary, and no generic tool resolves heterogeneous issues in a single call."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "WWHWE7QD3ZWG4RSAAHWEYV7816",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 76,
   "sourceOrder": 76,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "Your extractor sometimes produces JSON with syntax errors (missing commas, unclosed quotes) that break the downstream parser. What is the most reliable approach to guarantee schema-conformant output?",
   "options": [
    {
     "key": "A",
     "text": "Define the extraction as a tool with a JSON schema as input and take the data from the `tool_use` block of the response."
    },
    {
     "key": "B",
     "text": "Ask in the prompt for 'return only valid JSON' and add examples of the format."
    },
    {
     "key": "C",
     "text": "A post-processing step that tries to repair malformed JSON with regular expressions."
    },
    {
     "key": "D",
     "text": "Lower the temperature to 0 so the model is more consistent with syntax."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "`tool_use` with a JSON schema is the most reliable mechanism for schema-conformant output because it eliminates JSON syntax errors by construction. Asking for it in the prompt still allows errors, repairing with regex is brittle, and lowering the temperature reduces variation but does not guarantee valid JSON."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "XT8Z6F0NKCHC82W2FK55MQN3KS",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 77,
   "sourceOrder": 77,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "You already use `tool_use` with a strict schema and the JSON is always syntactically valid. Even so, some extracted invoices have line items that do not add up to the stated total and values in the wrong fields. What best explains this?",
   "options": [
    {
     "key": "A",
     "text": "Strict schemas eliminate syntax errors but not semantic ones; content validation is needed (e.g., comparing the sum of line items to the total)."
    },
    {
     "key": "B",
     "text": "The schema is not strict enough; adding more required fields will fix it."
    },
    {
     "key": "C",
     "text": "The model needs a lower temperature to compute totals correctly."
    },
    {
     "key": "D",
     "text": "The source document must be corrupt; it is best to reject it."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "A schema guarantees shape, not meaning: it does not prevent numbers from not adding up or a value from landing in the wrong field. Semantic content validation is needed. More required fields or lower temperature do not address semantic correctness, and assuming document corruption ignores that the failure is in the extraction."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "4VTRC7V57DNV383D8HKJ2XKGN2",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 78,
   "sourceOrder": 78,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "Some contracts do not include a renewal date, but your schema marks it as required. The model then invents plausible dates to satisfy the field. What is the best solution?",
   "options": [
    {
     "key": "A",
     "text": "Make the field nullable/optional so the model can leave it empty instead of fabricating a value."
    },
    {
     "key": "B",
     "text": "Add the instruction 'do not invent data not in the document' to the prompt."
    },
    {
     "key": "C",
     "text": "A post-validation step that flags suspicious renewal dates."
    },
    {
     "key": "D",
     "text": "Retry the extraction with the same document until it returns a consistent value."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Marking a field that may not exist as required pushes the model to fabricate values. Making it nullable/optional lets it legitimately leave it empty. The prompt instruction is less reliable, post-validation does not prevent fabrication, and retrying does not create information that is not in the document."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "9EQ6BJN86QVB0CW4P47FX76NW3",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 79,
   "sourceOrder": 79,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "An extraction fails validation because the total amount does not match the sum of the line items. What is the most effective way for the system to self-correct?",
   "options": [
    {
     "key": "A",
     "text": "A follow-up that includes the original document, the failed extraction, and the specific validation errors to guide the correction."
    },
    {
     "key": "B",
     "text": "Retry the same request unchanged several times until it passes."
    },
    {
     "key": "C",
     "text": "Flag the document for human review without attempting to correct it."
    },
    {
     "key": "D",
     "text": "Reduce the number of extracted fields to lower the chance of error."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Retry-with-error-feedback appends the specific validation errors to the retry so the model corrects the specific problem. Retrying unchanged repeats the same failure, escalating immediately wastes a cheap correction, and reducing fields degrades the extraction instead of correcting it."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "Q8ENHSGD1Z3K74RYM6Y25E9QS2",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 80,
   "sourceOrder": 80,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "Validation fails because the supplier's tax identification number is missing. On inspecting the document, that data does not appear anywhere in it. What is the correct action?",
   "options": [
    {
     "key": "A",
     "text": "Recognize that retrying will not help because the information is not in the source, and mark the field as missing for review or external retrieval."
    },
    {
     "key": "B",
     "text": "Retry with error feedback until the model finds it."
    },
    {
     "key": "C",
     "text": "Let the model infer the identifier from the supplier's name."
    },
    {
     "key": "D",
     "text": "Lower the temperature and re-extract the whole document."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Retry fixes format or structure errors, but it is useless when the information simply is not in the document. The correct move is to recognize the absence and flag it, not retry in a loop, nor infer/invent the data, nor reprocess hoping something that does not exist will appear."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "1WMWFQZEQSTEFDQPE84M6EWV6H",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 81,
   "sourceOrder": 81,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "You classify each document into an enum of types (invoice, receipt, contract). Documents appear that do not fit any category, and others too ambiguous to classify. What is the best schema design?",
   "options": [
    {
     "key": "A",
     "text": "Add an `other` value with a text detail field for extensible categories and an `unclear` value for ambiguous cases."
    },
    {
     "key": "B",
     "text": "Always force the closest category among the three existing ones."
    },
    {
     "key": "C",
     "text": "Expand the enum with every conceivable category in advance."
    },
    {
     "key": "D",
     "text": "Remove the enum and leave the type as free text."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "An enum with `other` + detail allows extensible categorization without fabricating, and `unclear` captures ambiguity explicitly. Forcing the closest category introduces misclassifications, enumerating everything in advance is infeasible, and free text loses the structure the enum provides."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "3TP57A18EFDAWTSV6RFRQMCXY9",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 82,
   "sourceOrder": 82,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "You want to automatically detect when the total of an extracted invoice does not match its line items. Which output design best enables this?",
   "options": [
    {
     "key": "A",
     "text": "Extract both `stated_total` (the document's total) and `calculated_total` (the sum of line items) so you can compare and detect discrepancies."
    },
    {
     "key": "B",
     "text": "Extract only `stated_total` and trust that the document is correct."
    },
    {
     "key": "C",
     "text": "Ask the model to confirm in prose that the numbers add up."
    },
    {
     "key": "D",
     "text": "Round both values so small differences disappear."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Extracting the stated total and the calculated total separately enables a deterministic consistency check. Trusting the stated total does not detect discrepancies, a prose confirmation is not verifiable, and rounding hides real errors instead of detecting them."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "8218A44K1M7D16K25N193CVESV",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 83,
   "sourceOrder": 83,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "You must extract data from 50,000 archived documents for a quarterly audit. It is not urgent and you tolerate up to a day of latency; you want to minimize cost. Which approach is most appropriate?",
   "options": [
    {
     "key": "A",
     "text": "Send the extractions to the Message Batches API with a `custom_id` per document and retrieve the results when the batch completes."
    },
    {
     "key": "B",
     "text": "Process the 50,000 documents with the synchronous API in parallel to finish sooner."
    },
    {
     "key": "C",
     "text": "Concatenate many documents per request to reduce the number of calls."
    },
    {
     "key": "D",
     "text": "Wait until you can review each document manually before extracting."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "A large, non-blocking, latency-tolerant workload fits the Message Batches API, which cuts cost by 50% and uses `custom_id` to correlate each document. The synchronous API offers no savings, concatenating documents degrades structure and correlation, and prior manual review does not apply to 50,000 documents."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "TZ7QA076BYGXKMPJ62907GCTRR",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 84,
   "sourceOrder": 84,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "After an extraction batch, 300 of 50,000 documents failed for exceeding the context. What is the most efficient way to complete them?",
   "options": [
    {
     "key": "A",
     "text": "Resubmit only the failed documents (by their `custom_id`) in a new batch, chunking the ones that exceeded the context."
    },
    {
     "key": "B",
     "text": "Reprocess the full batch of 50,000 documents from scratch."
    },
    {
     "key": "C",
     "text": "Discard the 300 failed documents as unprocessable."
    },
    {
     "key": "D",
     "text": "Increase `max_tokens` and resubmit all 50,000 without chunking."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The efficient move is to resubmit only the failed documents, identified by `custom_id`, and chunk the ones that exceeded the context so they fit. Reprocessing everything wastes work and money, discarding loses audit data, and raising `max_tokens` does not fix documents that exceed the context window."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "5A77PVHFZD8QHBKFJYD42K89TC",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 85,
   "sourceOrder": 85,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "You extract references from academic papers, but the documents vary widely (inline citations, end bibliographies, methodology in separate or embedded sections) and detailed instructions give inconsistent results. Which technique is most effective?",
   "options": [
    {
     "key": "A",
     "text": "Add 2-4 few-shot examples showing correct extraction across varied document formats."
    },
    {
     "key": "B",
     "text": "Write even longer, more exhaustive instructions covering every possible format."
    },
    {
     "key": "C",
     "text": "A separate pipeline for each detected document format."
    },
    {
     "key": "D",
     "text": "Ask the model to first describe the format and then extract."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Few-shot is the most effective technique when detailed instructions produce inconsistent results: they demonstrate handling varied cases and let the model generalize to new formats. Longer instructions remain inconsistent, a per-format pipeline is brittle and costly, and describing the format first does not guarantee correct extraction."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "7HG498D8DNZSB1RM8FAT1RG2PZ",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 86,
   "sourceOrder": 86,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "Your system has several extraction schemas (invoice, receipt, contract) and the incoming document type is unknown in advance. Sometimes the model responds with conversational text instead of extracting. Which configuration fixes this best?",
   "options": [
    {
     "key": "A",
     "text": "Use `tool_choice: \"any\"` to force the model to call one of the extraction tools instead of returning text."
    },
    {
     "key": "B",
     "text": "Use `tool_choice: \"auto\"` and ask in the prompt to always extract."
    },
    {
     "key": "C",
     "text": "Always force the invoice tool as the default."
    },
    {
     "key": "D",
     "text": "Add a 'text response' tool to capture the non-extraction cases."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "`tool_choice: \"any\"` forces the model to call a tool (choosing the right schema) instead of returning text, appropriate when there are several schemas and the type is unknown. `\"auto\"` allows text, always forcing invoice misclassifies the other types, and adding a text tool legitimizes exactly the behavior you want to avoid."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "ZQD7E1Z3CHYYAR8FQEGSA6ADEY",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 87,
   "sourceOrder": 87,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "Your extractor reports 97% global accuracy and the team wants to reduce human review. What is the most prudent step before automating the high-confidence extractions?",
   "options": [
    {
     "key": "A",
     "text": "Validate accuracy by document type and by field via stratified random sampling, since the global metric can mask specific failures."
    },
    {
     "key": "B",
     "text": "Automate everything above 90% model-reported confidence."
    },
    {
     "key": "C",
     "text": "Reduce human review uniformly across all document types."
    },
    {
     "key": "D",
     "text": "Trust the global 97%, since it exceeds any reasonable threshold."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "An aggregate metric can hide poor performance on certain document types or fields. Stratified sampling measures accuracy by type and by field to decide where automating is safe. Self-reported confidence is poorly calibrated, and reducing review uniformly or trusting the global figure ignores the hidden weak spots."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "WTSF8PE0669MR7G9ZBH5TWPWCS",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 88,
   "sourceOrder": 88,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "Dates appear in the documents in various formats (DD/MM/YYYY, 'March 3, 2025', 2025-03-03) and you need the output to use a uniform ISO format. The strict schema defines the type, but not the normalization. What is the best approach?",
   "options": [
    {
     "key": "A",
     "text": "Include format-normalization rules in the prompt alongside the strict schema (e.g., 'convert all dates to ISO 8601 YYYY-MM-DD')."
    },
    {
     "key": "B",
     "text": "Trust the strict schema alone to normalize the dates."
    },
    {
     "key": "C",
     "text": "A post-processing step with regex that tries to reformat any date."
    },
    {
     "key": "D",
     "text": "Reject documents whose dates do not already come in ISO 8601."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The schema guarantees the field type, but format normalization must be specified: normalization rules in the prompt, alongside the strict schema, produce uniform dates. The schema alone does not normalize, later regex is brittle against the variety of formats, and rejecting documents does not process valid data that only needs normalizing."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "FFHZ23EW52EK5H8QSDXX61VMRQ",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 89,
   "sourceOrder": 89,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "Some documents contain internally inconsistent data (e.g., a different amount in the summary and in the breakdown) and you want the system to flag them instead of silently choosing a value. Which output design enables this?",
   "options": [
    {
     "key": "A",
     "text": "Include a `conflict_detected` boolean (with the conflicting values and their location) to flag inconsistent sources instead of choosing arbitrarily."
    },
    {
     "key": "B",
     "text": "Instruct the model to choose the value that seems most likely."
    },
    {
     "key": "C",
     "text": "Average the conflicting values into a single number."
    },
    {
     "key": "D",
     "text": "Discard documents that contain any inconsistency."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Faced with conflicting source data, the right move is to annotate the conflict with the values and their provenance, not silently choose one. A `conflict_detected` boolean flags those cases for review. Choosing the 'most likely' or averaging hides the problem, and discarding loses documents a human could reconcile."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "RKMZP6RX7Q6V3EJPCWYZNG40Q8",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 90,
   "sourceOrder": 90,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "You consolidate market figures extracted from several reports and sometimes values from different years are misread as contradictions. What should the structured output require to prevent this?",
   "options": [
    {
     "key": "A",
     "text": "Require the publication or collection date of the data in every extraction, so temporal differences are not confused with contradictions."
    },
    {
     "key": "B",
     "text": "Keep only the most recent value and discard the rest."
    },
    {
     "key": "C",
     "text": "Average the values from all reports into a single figure."
    },
    {
     "key": "D",
     "text": "Flag any difference between reports as an extraction error."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Without temporal context, figures from different years look contradictory. Requiring the publication/collection date in the output allows the differences to be interpreted correctly. Keeping only the most recent or averaging discards valid information, and flagging every difference as an error confuses legitimate temporal variation with a failure."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "Y2MC7HJ0YN60GFJBQDVM5ZXFHX",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 91,
   "sourceOrder": 91,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "Your fintech support agent operates the pipeline get_customer -> lookup_order -> process_refund. A SOC2 audit finds that in 3% of refunds the agent called process_refund without a verified customer ID, because in conversations where the customer gave the order number up front the model skipped get_customer. The team has already reinforced the system prompt twice without success. Which change guarantees that no refund executes without prior identity verification?",
   "options": [
    {
     "key": "A",
     "text": "A programmatic gate in the middleware layer that rejects any process_refund call whose session state does not contain a customer ID already verified by get_customer."
    },
    {
     "key": "B",
     "text": "Add a required verified_customer_id parameter to the process_refund JSON schema so the model cannot invoke it without that field."
    },
    {
     "key": "C",
     "text": "A very detailed few-shot example for each possible flow showing get_customer always running before process_refund."
    },
    {
     "key": "D",
     "text": "Uppercase instructions at the start and end of the system prompt requiring identity verification before any refund."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Verifying identity before moving money is a critical business rule that demands deterministic enforcement and must be imposed in the middleware layer as a prerequisite that blocks process_refund until a verified customer ID exists in the session state. A required schema field only forces the argument to be present in that call, but the model can fill it with an unverified value; few-shot and prompt emphasis already failed because they depend on probabilistic compliance."
   },
   "difficulty": "advanced"
  },
  {
   "id": "KBKXRGPX40ZN8JEW80EG0ZBQSJ",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 92,
   "sourceOrder": 92,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "You rewrote the descriptions of get_customer and lookup_order with input formats, examples, and clear boundaries, and the agent still calls get_customer when the customer mentions 'my account' even though they ask about an order. Reviewing the configuration, you notice the system prompt includes the line 'when the user talks about their account, first retrieve the customer data'. What is the root cause and the most effective fix?",
   "options": [
    {
     "key": "A",
     "text": "The descriptions are still ambiguous; you should add more example queries to get_customer and lookup_order."
    },
    {
     "key": "B",
     "text": "The model needs a keyword router that maps 'order' to lookup_order and 'account' to get_customer before invoking the tool."
    },
    {
     "key": "C",
     "text": "A keyword-sensitive instruction ('account') in the system prompt is overriding the descriptions; it should be reworded or removed so it stops forcing the selection."
    },
    {
     "key": "D",
     "text": "Consolidate both tools into a single get_account_data that decides internally what to return."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "The system prompt wording can create keyword associations that override well-written tool descriptions: here 'when the user talks about their account, first retrieve the customer data' pushes toward get_customer at the word 'account' even when the intent is to look up an order. The fix is to reword or remove that keyword-sensitive instruction. Adding more examples does not beat the conflicting instruction, a router is over-engineering, and consolidating tools removes a useful distinction instead of fixing the cause."
   },
   "difficulty": "advanced"
  },
  {
   "id": "030FQZ3J0NK03VD7F56T2FWQG0",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 93,
   "sourceOrder": 93,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "The agent resolves 55% on first contact (target 80%). Segmenting by category, you see it over-escalates standard photo-backed returns (which it should resolve) and tries to resolve policy exceptions on its own (which it should escalate). An engineer proposes adding 15 few-shot examples of already-resolved complex cases to 'teach it to resolve more'. What is the most effective approach?",
   "options": [
    {
     "key": "A",
     "text": "Define explicit escalation criteria and provide balanced few-shot examples showing both when to resolve (standard returns) and when to escalate (policy exceptions)."
    },
    {
     "key": "B",
     "text": "Add the 15 resolved complex-case examples so the agent gains confidence and resolves more cases on its own."
    },
    {
     "key": "C",
     "text": "Have the agent score its confidence (1-10) and escalate below 7, calibrating the threshold with historical data."
    },
    {
     "key": "D",
     "text": "Add sentiment analysis to avoid escalating when the customer is calm, reserving escalation for upset customers."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The failure is a decision boundary miscalibrated in both directions, not a lack of capability: it over-escalates the easy and under-escalates what it should hand off. It is fixed with explicit escalation criteria and balanced few-shot examples showing both sides of the boundary. Adding only resolved complex-case examples biases the agent toward attempting policy exceptions; self-reported confidence is poorly calibrated; and sentiment does not correlate with case complexity."
   },
   "difficulty": "advanced"
  },
  {
   "id": "XMS703P9GFP2EXHBR1Y55XA5CP",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 94,
   "sourceOrder": 94,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "Policy allows automatic refunds up to $500; above that it requires human approval and an auditable record. Today the rule lives in the system prompt and in 2% of cases the agent approved larger amounts. Compliance also requires an immutable log of every block. Which design reliably satisfies both requirements?",
   "options": [
    {
     "key": "A",
     "text": "Reinforce the system prompt with the limit rule and ask the agent to record in the chat whenever it blocks a high refund."
    },
    {
     "key": "B",
     "text": "A PreToolUse hook on process_refund that deterministically blocks amounts above $500, redirects them to human escalation, and writes the event to the audit log."
    },
    {
     "key": "C",
     "text": "Add a max_amount field to the process_refund schema and trust the model to respect it."
    },
    {
     "key": "D",
     "text": "A later step that reviews issued refunds each night and reverses those that exceeded the limit, logging the reversal."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "The refund limit is a critical compliance rule and must be enforced in the middleware layer, not in the prompt. A PreToolUse hook blocks deterministically before touching the backend, redirects to human escalation, and can write the immutable audit log compliance requires. Prompt emphasis and the schema field depend on model compliance, and nightly reversal lets the improper refund happen and only corrects it late."
   },
   "difficulty": "advanced"
  },
  {
   "id": "8TSQMQTWBXJZE8MMTH4MBF72AW",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 95,
   "sourceOrder": 95,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "An incident shows that, when the payment gateway had a 4-minute outage, the agent retried process_refund dozens of times and, once the service recovered, issued duplicate refunds. The tool always returns the string 'error' without distinguishing the failure type. Which change best prevents this kind of incident?",
   "options": [
    {
     "key": "A",
     "text": "Return structured errors with errorCategory (transient/validation/permission/business) and isRetryable, and apply bounded local recovery only to transient ones, treating already-initiated refunds as non-retryable by default."
    },
    {
     "key": "B",
     "text": "Increase the maximum number of retries and add random jitter to space out the calls during gateway outages."
    },
    {
     "key": "C",
     "text": "Catch the error and return an empty result marked as success so the agent does not retry."
    },
    {
     "key": "D",
     "text": "Escalate to a human every time process_refund fails, regardless of the cause."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The incident stems from indistinguishable errors: the agent did not know the failure was transient or that the operation might have started, so it retried blindly and duplicated refunds. Structured errors with category and isRetryable allow retrying only the transient ones and treating refunds as non-retryable unless confirmed. More retries worsen the problem, marking empty as success hides real failures, and escalating on any failure wastes recovery of benign transient errors."
   },
   "difficulty": "advanced"
  },
  {
   "id": "ZBRK63X7QDHAHBN93B5B705XQX",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 96,
   "sourceOrder": 96,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "In a 30-turn conversation about three orders, the agent mid-chat confuses the agreed refund amount ($85) with another order's total ($120) and offers the wrong figure. The history is progressively summarized to fit the context, and the key data ended up buried in the middle of the history. What is the most reliable way to prevent it?",
   "options": [
    {
     "key": "A",
     "text": "Switch to a model with a larger context window so you do not have to summarize the history."
    },
    {
     "key": "B",
     "text": "Increase the length of each progressive summary so it retains more detail from the intermediate turns."
    },
    {
     "key": "C",
     "text": "Keep a persistent 'case facts' block (amounts, order IDs, statuses per order) injected into every prompt, outside the summarized history and placed at the start or end."
    },
    {
     "key": "D",
     "text": "Ask the agent to re-read the entire conversation history before responding to recover the correct data."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "The transactional values are lost by two combined effects: progressive summarization condenses them and 'lost in the middle' makes the model ignore what landed in the center of the history. A 'case facts' block with the exact per-order data, injected into every prompt and placed at the start or end, preserves them reliably. A bigger model does not avoid condensation, longer summaries still bury data in the middle, and re-reading the history is costly and unreliable."
   },
   "difficulty": "advanced"
  },
  {
   "id": "PNQY80WK2A34WF5JR4EEJRW9TN",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 97,
   "sourceOrder": 97,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "When the agent escalates, the human operator takes about 6 minutes on average to pick up the case because they receive the full conversation transcript and must reconstruct what was attempted. Compliance also requires recording the reason for each escalation. What improves the handoff most effectively?",
   "options": [
    {
     "key": "A",
     "text": "Generate a structured escalation package with customer_id, issue_summary, order_id, root_cause, actions_taken[], refund_amount, recommended_action, and escalation_reason."
    },
    {
     "key": "B",
     "text": "Attach the full transcript with timestamps and highlight the customer's messages."
    },
    {
     "key": "C",
     "text": "A free-prose summary generated by the model at escalation time, prepended to the chat."
    },
    {
     "key": "D",
     "text": "A link to the CRM with the customer's history for the operator to consult during the call."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The operator should not reconstruct the case from the chat; they need a structured, actionable summary. An escalation package with the key facts, what was already attempted, the recommended action, and the escalation reason lets them pick up immediately and satisfies the record compliance requires. The full transcript and the CRM link shift the work to the human, and a free-prose summary is less reliable and may omit the required escalation_reason."
   },
   "difficulty": "advanced"
  },
  {
   "id": "NBF6MN14HA78TQYZKSE3FBY509",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 98,
   "sourceOrder": 98,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "get_customer returns two customers with the same first and last name. One has an email whose domain matches that of the company the customer is writing from; the other has more recent account activity. The customer requests a $300 refund. What should the agent do?",
   "options": [
    {
     "key": "A",
     "text": "Pick the customer whose email domain matches the sender's company, as the strongest signal."
    },
    {
     "key": "B",
     "text": "Pick the customer with the most recent account activity, since they are more likely to be the writer."
    },
    {
     "key": "C",
     "text": "Process the refund on both accounts and tell the customer to confirm which was the correct one."
    },
    {
     "key": "D",
     "text": "Ask the customer for an additional identifier (order number, last digits of the payment method, or postal code) to disambiguate before touching any account."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "With multiple matches and a financial operation involved, any heuristic -- email domain or recency -- can select the wrong account and execute an improper refund. The correct move is to ask for an additional identifier that verifies identity before acting. Choosing by domain or recency is guessing, and processing on both accounts violates privacy and may duplicate the refund."
   },
   "difficulty": "advanced"
  },
  {
   "id": "72F6FASJ7GVW66C261WQ8KYFJ9",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 99,
   "sourceOrder": 99,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "Each get_customer returns a 45-field object (marketing preferences, session history, internal flags) of which the agent uses only 5. In long conversations, that volume pushes the context above 70% and responses start to degrade and cite the wrong order's data. What is the best solution?",
   "options": [
    {
     "key": "A",
     "text": "Trim (via a PostToolUse hook or a wrapper) the get_customer output to the 5 relevant fields before it accumulates in the context."
    },
    {
     "key": "B",
     "text": "Switch to a model with a larger context window to absorb the 45 fields without degradation."
    },
    {
     "key": "C",
     "text": "Automatically summarize the whole conversation whenever the context exceeds 80%."
    },
    {
     "key": "D",
     "text": "Instruct the agent in the prompt to ignore the 40 fields it does not need."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Tool results accumulate tokens disproportionate to their relevance, and here 40 useless fields per call saturate the context and cause context rot. Trimming the output to the needed fields before it accumulates attacks the direct cause. A bigger model only delays the problem, summarizing at 80% is already too late (the model is degraded and may hallucinate its own summary), and asking to 'ignore' in the prompt does not stop those tokens from occupying the context."
   },
   "difficulty": "advanced"
  },
  {
   "id": "7PBA1DW0TD3J58GH4KEA2YT1FD",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 100,
   "sourceOrder": 100,
   "variant": false,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "Your agentic loop ends the turn when it detects phrases in the assistant text like 'I've processed your refund'. In production, the agent sometimes says that phrase while still planning and the loop cuts off before actually executing process_refund, leaving the customer without a refund; other times it says it twice and the action is duplicated. How should the loop decide the turn is over?",
   "options": [
    {
     "key": "A",
     "text": "Expand the list of completion phrases and require them to appear at the end of the message to reduce false positives."
    },
    {
     "key": "B",
     "text": "Stop the loop when it reaches an iteration cap that guarantees the action has already executed."
    },
    {
     "key": "C",
     "text": "Strictly evaluate stop_reason == 'end_turn' as the only completion signal, executing tools only when stop_reason == 'tool_use'."
    },
    {
     "key": "D",
     "text": "Check whether the response contains assistant text instead of a tool call and, if so, end."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "Parsing natural language to decide termination is a leaky abstraction: brittle to wording variations and to the model mentioning an action before executing it. Control flow must rely on the server signal stop_reason: end_turn indicates the turn is over and tool_use indicates tools must be executed. Expanding the phrase list does not remove the fragility, the iteration cap is only a safety fallback, and the mere presence of text does not distinguish an intermediate turn from the final one."
   },
   "difficulty": "advanced"
  },
  {
   "id": "0JY6RB9KYV2NPR8BGQX14AZ26R",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 101,
   "sourceOrder": 101,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "Your invoice extractor uses a prompt asking to 'return a JSON object with these fields' and, despite temperature 0, 4% of responses include prose before the JSON or trailing commas that break your parser in production. You need a guarantee that the output is always parseable JSON conformant to your fields. What is the most reliable approach?",
   "options": [
    {
     "key": "A",
     "text": "Add a post-processor that extracts the first {...} block from the response and strips trailing commas with regex."
    },
    {
     "key": "B",
     "text": "Define an extraction tool whose input is a JSON schema and take the data from the response's tool_use block, eliminating syntax errors by construction."
    },
    {
     "key": "C",
     "text": "Reinforce the prompt with 'RESPOND ONLY WITH JSON, NO ADDITIONAL TEXT' and several examples of the exact format."
    },
    {
     "key": "D",
     "text": "Lower randomness further (top_p) and validate the JSON, retrying when parsing fails."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "tool_use with a JSON schema is the most reliable mechanism for schema-conformant output because the JSON is generated against the schema and syntax errors are eliminated by construction, taking the data from the tool_use block. Regex post-processing is brittle to variations, reinforcing the prompt still allows prose and trailing commas, and adjusting top_p with retries reduces frequency but does not guarantee valid JSON."
   },
   "difficulty": "advanced"
  },
  {
   "id": "9JTHFWVP9NF4DCAWME335PSF8N",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 102,
   "sourceOrder": 102,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "You migrated your extractor to tool_use with a strict schema and since then the JSON is always syntactically valid. Even so, accounting reports that in 6% of invoices the sum of line_items does not match the total, and in some the tax landed in the subtotal field. What diagnosis and fix is correct?",
   "options": [
    {
     "key": "A",
     "text": "The schema guarantees shape but not semantics; you should extract stated_total and calculated_total, compare them, and on a discrepancy retry with the specific error or flag for review."
    },
    {
     "key": "B",
     "text": "The schema is not strict enough; making subtotal, tax, and total required fields will force the model to reconcile them."
    },
    {
     "key": "C",
     "text": "It is a model calculation problem; lowering the temperature and adding 'add carefully' to the prompt fixes it."
    },
    {
     "key": "D",
     "text": "The source documents are poorly scanned; it is best to reject them and request better copies."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "A strict schema eliminates syntax errors but not semantic ones: it does not prevent amounts from not adding up or a value from landing in the wrong field. The solution is content validation -- extract stated_total and calculated_total, compare them, and retry with the specific error or route to review. More required fields do not force arithmetic consistency, temperature does not address semantic correctness, and blaming the scan ignores that the failure is in the extraction."
   },
   "difficulty": "advanced"
  },
  {
   "id": "EQ59Q73W3AFXSM2S0MEK6Y4A8C",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 103,
   "sourceOrder": 103,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "You extract clauses from contracts and your schema marks governing_law as required. When a contract does not specify a jurisdiction, the model fills the field with a plausible one ('State of Delaware') instead of leaving it empty, introducing false data that legal caught by chance. You already added 'do not invent absent data' to the prompt without full success. What is the best solution?",
   "options": [
    {
     "key": "A",
     "text": "Make governing_law nullable/optional in the schema so the model can legitimately omit it when the document does not contain it."
    },
    {
     "key": "B",
     "text": "Reinforce the 'do not invent absent data' instruction with few-shot examples of fields left blank."
    },
    {
     "key": "C",
     "text": "A later validator that checks whether the jurisdiction appears verbatim in the text and, if not, clears the value."
    },
    {
     "key": "D",
     "text": "Retry the contract extraction until the model returns the same value twice in a row."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Marking a field that may not exist as required pushes the model to fabricate a value to satisfy the schema. Making it nullable/optional lets it legitimately omit it when the document does not contain it, which is the root cause. The prompt instruction already failed and remains probabilistic, the later validator is a patch that does not prevent the initial fabrication, and retrying does not create information that is not in the contract."
   },
   "difficulty": "advanced"
  },
  {
   "id": "DAFTFWZ0WS5BZT5Q29HP85H4P4",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 104,
   "sourceOrder": 104,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "In a batch of 2,000 invoices, 180 fail validation. On inspection, some fail because the dates come in a local format that does not match the expected pattern, and others because the document simply does not include the order number your schema expects. An engineer proposes retrying all 180 with error feedback. What is the correct approach?",
   "options": [
    {
     "key": "A",
     "text": "Retry all 180 with error feedback, since appending the specific error lets the model correct any validation failure."
    },
    {
     "key": "B",
     "text": "Flag all 180 for human review without retrying, because retries rarely help in extraction."
    },
    {
     "key": "C",
     "text": "Distinguish the failure types: retry with feedback the ones failing on date format, and flag as missing (without retrying) the ones lacking the order number in the document."
    },
    {
     "key": "D",
     "text": "Reprocess the whole batch with a stricter prompt about dates and order numbers."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "Retry with feedback corrects format or structure errors -- like locally formatted dates that only need normalizing -- but is useless when the information simply is not in the document, like an absent order number. The correct move is to branch: retry the format ones with the specific error and flag as missing the ones that do not contain the data. Retrying all 180 wastes calls on the unrecoverable ones, flagging them all discards cheap corrections, and reprocessing the whole batch is costly and unnecessary."
   },
   "difficulty": "advanced"
  },
  {
   "id": "3VMJ8C1CJ58HXP3438GW17EE7M",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 105,
   "sourceOrder": 105,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "You classify incoming documents into an enum of 6 types. 9% fall into 'None of the above' because new types you did not anticipate arrive (credit notes, purchase orders), and another 3% are illegible or ambiguous. Forcing classification to the closest type caused downstream errors. What is the best schema design?",
   "options": [
    {
     "key": "A",
     "text": "Add an 'other' value with a text detail field for unanticipated types and an 'unclear' value for ambiguous or illegible documents."
    },
    {
     "key": "B",
     "text": "Expand the enum now with credit notes and purchase orders, and repeat the expansion whenever a new type appears."
    },
    {
     "key": "C",
     "text": "Always force the closest enum type and record confidence to review the low-confidence ones later."
    },
    {
     "key": "D",
     "text": "Remove the enum and leave document_type as free text so the model writes whatever fits."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "An enum with 'other' + detail absorbs unanticipated types without fabricating an incorrect category, and 'unclear' explicitly captures the illegible or ambiguous, avoiding the downstream errors of forcing the closest type. Manually expanding the enum for each new type is endless maintenance, forcing the closest reintroduces misclassifications, and free text loses the structure and consistency the enum provides."
   },
   "difficulty": "advanced"
  },
  {
   "id": "D67VAD48NG3KXFPWZ00KW3VDYW",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 106,
   "sourceOrder": 106,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "You have two extraction workloads: (1) validating the invoice at checkout in real time, where the customer waits for confirmation within seconds, and (2) a nightly reprocessing of 200,000 historical invoices for a data warehouse. A manager proposes moving both to the Message Batches API to save 50%. How should you evaluate it?",
   "options": [
    {
     "key": "A",
     "text": "Move both to batch and poll for status, accepting the latency in exchange for the 50% savings."
    },
    {
     "key": "B",
     "text": "Keep both on the synchronous API to avoid result correlation and ordering problems."
    },
    {
     "key": "C",
     "text": "Only the nightly reprocessing goes to batch (it tolerates latency); the checkout validation stays on the synchronous API because it is blocking and latency-sensitive."
    },
    {
     "key": "D",
     "text": "Move both to batch with a fallback to the synchronous API if the batch takes longer than expected."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "The Message Batches API saves 50% but can take up to 24 hours with no latency SLA, so it only fits non-blocking, latency-tolerant workloads like the nightly reprocessing. The checkout validation is blocking -- the customer waits -- and must stay on the synchronous API. Moving both to batch breaks the real-time requirement, keeping everything synchronous gives up the savings where they do apply, and the fallback adds complexity without solving that batch does not guarantee latency."
   },
   "difficulty": "advanced"
  },
  {
   "id": "8EQWMSP36JHXB62CT4Q3N38JRZ",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 107,
   "sourceOrder": 107,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "You extract data from clinical reports with widely varying structures: some put the dose in a table, others in prose within the treatment section, others in footnotes. Increasingly long instructions give inconsistent results across formats. The team weighs options. What is the most effective technique?",
   "options": [
    {
     "key": "A",
     "text": "Write an even more exhaustive specification describing every possible location of the dose across all known formats."
    },
    {
     "key": "B",
     "text": "Add 2-4 few-shot examples showing correct dose extraction across varied formats (table, prose, footnote), teaching the criterion to generalize."
    },
    {
     "key": "C",
     "text": "Fine-tune the model on thousands of labeled clinical reports so it learns all the formats."
    },
    {
     "key": "D",
     "text": "Build a separate pipeline for each report format detected by rules."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "When detailed instructions give inconsistent results across varied formats, few-shot is the most effective technique: 2-4 examples showing correct extraction in different locations teach the underlying criterion and let the model generalize to new formats. A longer specification remains inconsistent, fine-tuning is costly and rigid (and outside the practical exam scope), and a per-format pipeline is brittle and does not scale to unforeseen variants."
   },
   "difficulty": "advanced"
  },
  {
   "id": "9JWEKBX2BTWYC4TGC0G461GA5T",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 108,
   "sourceOrder": 108,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "Your extraction pipeline must run extract_metadata (document type, date, issuer) before an enrichment step that depends on those metadata. Sometimes the model jumps straight to enrichment or responds with text, breaking the order. Which configuration guarantees that extract_metadata runs first?",
   "options": [
    {
     "key": "A",
     "text": "Use tool_choice 'auto' and describe in the prompt that extract_metadata must come first."
    },
    {
     "key": "B",
     "text": "Use tool_choice 'any' so the model calls some tool at each step and trust it to pick the right order."
    },
    {
     "key": "C",
     "text": "Merge extract_metadata and enrichment into a single tool so the order is irrelevant."
    },
    {
     "key": "D",
     "text": "Force tool_choice to the specific tool ({'type':'tool','name':'extract_metadata'}) on the first call to guarantee it runs before enrichment."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "When one step must run before another, forcing tool_choice to that specific tool on the first call deterministically guarantees extract_metadata runs first. 'auto' lets the model skip the step or return text, 'any' forces calling some tool but does not fix which one, and merging both tools blends responsibilities and loses the separation that makes enrichment dependent on already-validated metadata."
   },
   "difficulty": "advanced"
  },
  {
   "id": "Z08PWDT1D6ZJS8DF2DP0T5CPFN",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 109,
   "sourceOrder": 109,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "Your extractor reports 97% global accuracy over a mixed set of invoices, receipts, and contracts. Before reducing human review, a quick sample suggests that contracts -- 8% of the volume -- perform far below the average. What is the most prudent step before automating the high-confidence extractions?",
   "options": [
    {
     "key": "A",
     "text": "Measure accuracy by document type and by field via stratified random sampling, since the global average can mask one type (contracts) with poor performance."
    },
    {
     "key": "B",
     "text": "Automate everything above 90% model-self-reported confidence and review the rest."
    },
    {
     "key": "C",
     "text": "Reduce human review uniformly across the three types, given the 97% global figure."
    },
    {
     "key": "D",
     "text": "Trust the 97% global because it already exceeds the business threshold, and monitor complaints to detect problems."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "An aggregate metric can mask poor performance in a subgroup -- here contracts -- so automating based on the global figure risks accepting erroneous extractions of that type. Stratified sampling by document type and field reveals where automating is safe and where it is not. Self-reported confidence is poorly calibrated, reducing review uniformly ignores the weak spot, and waiting for complaints detects the problem too late."
   },
   "difficulty": "advanced"
  },
  {
   "id": "CW8SHX9RJS47FRR5DQNZ95RWX2",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 110,
   "sourceOrder": 110,
   "variant": false,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "You consolidate 'market size' extracted from 15 reports. Some cite $40B, others $52B; on review, some are from 2021 and others from 2024, and two recent reports contradict each other for the same year. Your current output picks one value and discards the rest, hiding the nuance. What should the structured output require?",
   "options": [
    {
     "key": "A",
     "text": "Require the publication/collection date of each figure and flag real disagreements with a conflict_detected that preserves the values and their source, without silently choosing one."
    },
    {
     "key": "B",
     "text": "Keep the most recent figure ($52B) and discard the others as outdated."
    },
    {
     "key": "C",
     "text": "Average the 15 figures to obtain a single representative market size."
    },
    {
     "key": "D",
     "text": "Flag the whole set as unreliable because the figures do not match."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Without temporal context, figures from different years look contradictory when they are not, and real conflicts between credible sources must be annotated, not silently resolved. Requiring each figure's date distinguishes temporal variation from contradiction, and a conflict_detected that preserves values and sources leaves the final judgment to a human or the coordinator. Keeping only the most recent or averaging discards valid information, and flagging everything as unreliable throws away legitimate nuance."
   },
   "difficulty": "advanced"
  },
  {
   "id": "EED2HX89TBGVDW4VD66W0VN1Q0",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 111,
   "sourceOrder": 1,
   "variant": true,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "Your CI's automated reviewer keeps flagging deliberate team decisions: force-unwrapping of optionals in test files, large coordinator classes that match your architecture, and imports of internal modules tagged as deprecated in the public SDK. Around 30% of findings end up dismissed as project-specific false positives. Which option prevents the model from producing those findings at the root, by handing it the project conventions as permanent context on every review?",
   "options": [
    {
     "key": "A",
     "text": "Build post-processing keyword filters that suppress findings containing terms like 'force unwrap', 'large class', or 'deprecated import' before the results reach developers."
    },
    {
     "key": "B",
     "text": "Have developers add inline suppression comments on the flagged lines and preprocess the diffs to exclude the suppressed lines before sending the code to the model."
    },
    {
     "key": "C",
     "text": "Configure the review to analyze only the changed lines in the diff without the surrounding file context, reducing how much code the model evaluates per review."
    },
    {
     "key": "D",
     "text": "Document the accepted patterns and the team's intentional conventions in the project's CLAUDE.md file, so the model receives this context on every review."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "`CLAUDE.md` is the project-level mechanism for giving Claude Code persistent context such as coding conventions, review criteria, testing standards, and accepted architectural patterns. Since the problem is that the model repeatedly flags intentional project-specific decisions, the correct solution is to provide those conventions before the review is generated. Keyword filters, suppression comments, or reducing context only hide or limit the findings after the model has already misunderstood the project."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "Z8XWZA26WS3ZCV156R5G762016",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 112,
   "sourceOrder": 2,
   "variant": true,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "Already live, your automated review shows high precision but low recall: real bugs get through. Investigating, you find the prompt tells Claude to 'report only high-confidence issues you are sure about' and to 'err on the side of not commenting'. The team likes the low noise, but a race condition that caused a production outage was in plain sight in a reviewed PR and went unreported. You must substantially raise bug detection without pushing false positives to unmanageable levels. What is the most effective approach?",
   "options": [
    {
     "key": "A",
     "text": "Add detailed few-shot examples demonstrating the bug categories Claude should flag -- race conditions, null dereferences, error-handling gaps -- while keeping the high-confidence filtering instruction to preserve current precision levels."
    },
    {
     "key": "B",
     "text": "Expand the context window by including related test files, recent git history, and the module dependency graph alongside the diff, giving Claude richer signals to assess issue severity."
    },
    {
     "key": "C",
     "text": "Split the review into a findings stage where Claude's goal is coverage -- flagging every potential issue with confidence and severity metadata -- and a separate stage that filters those findings."
    },
    {
     "key": "D",
     "text": "Remove the conservative filtering instructions and ask Claude to report all potential issues, then apply a programmatic filter to deduplicate and suppress the categories that historically produce false positives."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "The current prompt suppresses real issues because it over-aggressively optimizes for certainty. A two-stage review separates recall from publication: first, Claude identifies potential issues broadly and attaches structured confidence and severity metadata; then a separate thresholding step decides what reaches developers. This preserves visibility of serious bugs like race conditions while managing false positives. Keeping the high-confidence instruction would keep missing bugs, and simply adding more context or post-processing filters does not directly address the recall problem."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "6DN5CYDE34SRDNTTPRY6YBR9V2",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 113,
   "sourceOrder": 3,
   "variant": true,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "Your automated review emits many findings per PR, but developers dismiss about half as 'not worth it'. Analyzing them, you see the dismissed ones are usually technically correct but concern minor style preferences or patterns that are acceptable in your codebase. Before adding infrastructure complexity, which prompt-design tweak would cut dismissals the most without losing detection of real issues?",
   "options": [
    {
     "key": "A",
     "text": "Add instructions asking Claude to rate each finding's confidence (1-10) and include only findings rated 8 or higher."
    },
    {
     "key": "B",
     "text": "Implement a secondary classification model that filters Claude's findings based on predicted developer acceptance."
    },
    {
     "key": "C",
     "text": "Add explicit criteria defining which issues to report (bugs, security) versus which to omit (minor style, local patterns)."
    },
    {
     "key": "D",
     "text": "Add instructions to 'only report findings you are very sure are real issues'."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "The dismissed findings are not necessarily wrong; they are simply low value for this codebase. The best prompt change is to define clear categories of what should be reported and what should be omitted, such as reporting bugs and security issues while excluding minor style preferences or accepted local patterns. Confidence-based instructions are too vague and may suppress important issues, while adding another model introduces unnecessary infrastructure before fixing the prompt criteria."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "87X48AGC7TC5CRD83R3X64AGSC",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 114,
   "sourceOrder": 4,
   "variant": true,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "Your reviewer uses a single prompt spanning security, API design, and business-logic correctness. Your evaluation suite yields high recall on API design (82%) but low recall on business-logic edge cases (34%). Adding few-shot examples of logic bugs raises logic recall to 41% but drops API-design recall to 68%. How should you resolve this trade-off to improve detection in both categories?",
   "options": [
    {
     "key": "A",
     "text": "Replace the few-shot examples with a detailed checklist of specific logic edge cases to check, such as division by zero in score calculations and boundary conditions on grading thresholds."
    },
    {
     "key": "B",
     "text": "Split the review into separate, focused prompts -- one for security and API design, another for business logic -- each with dedicated examples, then consolidate the findings before publishing."
    },
    {
     "key": "C",
     "text": "Upgrade to a more capable model tier, since its stronger reasoning will handle both concern types in a single prompt and eliminate the recall trade-off."
    },
    {
     "key": "D",
     "text": "Provide the full repository as context instead of only the changed files and surrounding code, giving the model greater visibility into business-logic patterns."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "The evaluation shows prompt interference: adding examples for one concern improves business-logic recall but hurts API-design recall. Splitting the review into focused passes lets each prompt use criteria and examples tailored to its category, then consolidate results for developers. A checklist may help with logic bugs but does not address the API-design regression, and a model upgrade or more repository context does not directly resolve the conflict created by combining distinct review objectives in a single prompt."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "RMQT60GGMBS5P1HW7FDS1PTFGH",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 115,
   "sourceOrder": 5,
   "variant": true,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "At the end of each weekly release cycle, one pipeline step classifies and summarizes about 200 commits to generate the release notes. Today each commit is sent as a separate Messages API call with a Sonnet-tier model. The notes are not needed until the next morning (they tolerate ~12 hours of latency). You need to lower this step's API cost per token while keeping the same model and prompts (no change to tier or output quality). Which approach meets all these constraints?",
   "options": [
    {
     "key": "A",
     "text": "Issue the 200 Messages API requests in parallel using concurrent connections, since concurrency lowers the per-token price the API charges."
    },
    {
     "key": "B",
     "text": "Switch the summarization calls from the Sonnet-tier model to the Haiku-tier model to take advantage of Haiku's lower per-token rates."
    },
    {
     "key": "C",
     "text": "Concatenate the 200 commit messages into a single Messages API request and have the model return all summaries in one response, since fewer requests always reduces total token cost."
    },
    {
     "key": "D",
     "text": "Send the 200 requests to the Message Batches API with unique custom_ids and retrieve the results once the batch completes, which applies a 50% discount to all input and output tokens."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "This workload tolerates latency and does not require results until the next morning, so it fits batch processing. The Message Batches API keeps the same model and prompts while reducing input and output token cost, and the `custom_id` values let you correlate each commit's result after processing. Parallel Messages API calls do not reduce the per-token price, switching to Haiku violates the same-model requirement, and concatenating all commits changes the prompt structure and may hurt correlation or output quality."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "X57PN5WS5KBR0GXNPJ4ZHDXSM6",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 116,
   "sourceOrder": 6,
   "variant": true,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "Your automated code review lets real bugs slip through PRs. Investigating, you see the prompt contains: 'Flag only critical issues that would definitely cause production failures. Ignore anything minor and anything you are unsure about.' Developers confirm several missed bugs are real logic errors the model did investigate but chose not to report. The team requires the output to stay structured (each finding with metadata) and actionable. Which prompt change removes the cause of the suppressed findings and keeps the structured, tagged output for later filtering?",
   "options": [
    {
     "key": "A",
     "text": "Add a second review pass that re-reads the diff using the same prompt, looking for anything the first pass may have missed."
    },
    {
     "key": "B",
     "text": "Instruct the model to report all findings with a confidence level and a severity label, leaving filtering to a later step."
    },
    {
     "key": "C",
     "text": "Remove all severity-related instructions from the prompt and let the model use its default judgment about what to report."
    },
    {
     "key": "D",
     "text": "Enable extended thinking and instruct the model to reason step by step about each code change before producing its review."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "The missed bugs are caused by an instruction that tells the model not to report anything uncertain or below a very high severity threshold. Asking for all findings with confidence and severity metadata removes that suppression while preserving structured output for later filtering. Re-running the same conservative prompt would repeat the same failure mode, removing all severity guidance would reduce structure, and extended thinking does not address the instruction telling the model to withhold findings."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "1ZW7B4F6FN4DRREWQAYMMAVPYP",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 117,
   "sourceOrder": 7,
   "variant": true,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "With automated review live, developers report that ~35% of findings are false positives with consistent patterns: style suggestions clashing with team conventions, security alerts for patterns that are safe in your deployment context, and performance suggestions that would worsen your use case. You want fewer false positives without losing the ability to detect real issues. Which approach best lets the model generalize its judgment to new code patterns it has never seen?",
   "options": [
    {
     "key": "A",
     "text": "Include few-shot examples in your prompt showing annotated code snippets that distinguish acceptable patterns from real issues in each category."
    },
    {
     "key": "B",
     "text": "Create a complete written specification of every pattern that should not be flagged, then include this full documentation in the system prompt."
    },
    {
     "key": "C",
     "text": "Implement post-processing that uses keyword matching to filter out findings containing terms like 'convention', 'context-dependent', or 'trade-off'."
    },
    {
     "key": "D",
     "text": "Add instructions to your system prompt to 'be conservative', 'only flag definite issues', and 'consider that some patterns may be intentional'."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Few-shot examples are well suited to ambiguous review judgments because they show how to distinguish project-specific acceptable patterns from real issues. Annotated examples for style, security, and performance teach the model the underlying decision boundary so it can generalize to new code, rather than just matching a fixed list. A complete blocklist is brittle, keyword filtering happens too late and can hide real issues, and vague instructions like 'be conservative' do not provide enough concrete guidance."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "Y96H1M9M3Y1C8DZ8TDN3GN78PF",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 118,
   "sourceOrder": 8,
   "variant": true,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "Your review pipeline yields on average 18 findings per PR. Feedback reveals three kinds of noise: (1) style and formatting your linter already enforces in CI, (2) findings about auto-generated template code under src/gen/, and (3) rendering helpers that are intentional project conventions but get flagged for resembling anti-patterns. Barely 4 findings per PR are real logic bugs. What is the most effective way to reduce this noise without losing detection of real issues?",
   "options": [
    {
     "key": "A",
     "text": "Add the prompt parameter to the GitHub Action configuration with instructions to suppress duplicate linter findings, ignore generated template code, and apply stricter evidence requirements for rendering-related issues."
    },
    {
     "key": "B",
     "text": "Add detailed explanations to the project's CLAUDE.md describing which patterns are intentional, that linting is handled separately in CI, and that the src/gen/ directory contains auto-generated template code."
    },
    {
     "key": "C",
     "text": "Create a REVIEW.md at the repository root with skip rules for CI-enforced checks and generated files, and a verification requirement that rendering-related findings must cite a specific line demonstrating incorrect behavior."
    },
    {
     "key": "D",
     "text": "Configure separate GitHub Action workflow files for each code area -- one for generated code with findings suppressed, one for rendering code with custom review instructions, and a general workflow for everything else."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "The noise comes from missing project context: the model reviews linter-managed formatting, generated files, and intentional rendering conventions as if they were ordinary defects. Putting those details in `CLAUDE.md` gives Claude Code persistent project guidance during review, so it can avoid low-value findings while still detecting real logic bugs. Splitting workflows or filtering ad hoc adds complexity, and a one-off prompt parameter is less maintainable than documenting the stable repository conventions where Claude Code expects project context."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "BGED4HAR08KC0A1YNJQWVE9T98",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 119,
   "sourceOrder": 9,
   "variant": true,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "In early pipeline testing you notice that reviewing large PRs (50+ files) sometimes exceeds 20 minutes and costs $8-12 per run because of extensive agentic loops: Claude reads files, runs analysis tools, and iterates many times. Your team needs each invocation to stop when it hits a fixed number of iterations and a fixed dollar amount, enforced by Claude Code itself and not by the job runner. Which configuration setting imposes both limits per invocation directly?",
   "options": [
    {
     "key": "A",
     "text": "Add --max-turns 10 --max-budget-usd 2.00 to the claude -p invocation to cap iterations and spend."
    },
    {
     "key": "B",
     "text": "Set timeout-minutes: 5 on the GitHub Actions job step and monitor per-run costs through the Anthropic Console usage dashboard."
    },
    {
     "key": "C",
     "text": "Change the --model flag to a smaller, cheaper model so each iteration uses fewer tokens and has a lower per-call cost."
    },
    {
     "key": "D",
     "text": "Set --permission-mode dontAsk to automatically deny any tool permission request that is not in the explicitly allowed set."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The requirement is for Claude Code itself to stop each invocation after a fixed iteration count and a fixed dollar amount. The `--max-turns` cap limits agentic iterations, while `--max-budget-usd` limits spend for that run. A GitHub Actions timeout and the usage dashboard are external controls rather than caps enforced by Claude Code, changing models only reduces per-token cost without limiting loops, and permission mode controls tool approvals rather than iteration count or budget."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "TCWR4F9MX2YC5G4MXPV1TS7W4X",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 120,
   "sourceOrder": 10,
   "variant": true,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "Your pipeline reviews about 200 database migration scripts per day via the Message Batches API. Each batch request carries a shared 8,000-token system prompt (migration review guidelines plus schema documentation) followed by the individual script. You already placed cache_control breakpoints on that shared system prompt in every request, but monitoring shows only 32% cache hits, with the misses concentrated in requests processed later within the batch window. Which change tackles the root cause of those misses without adding sequential-processing latency?",
   "options": [
    {
     "key": "A",
     "text": "Move the cache_control breakpoints from the system prompt to the individual migration script content to cache similar code patterns across reviews."
    },
    {
     "key": "B",
     "text": "Add warm-up requests with max_tokens: 0 at the start of each batch to load the cache before the review requests run."
    },
    {
     "key": "C",
     "text": "Split the 200 requests into 10 sequential batches of 20, sending each only after the previous finishes, to keep requests close enough in time for cache reuse."
    },
    {
     "key": "D",
     "text": "Use the extended 1-hour cache TTL instead of the default 5-minute TTL on your cache breakpoints."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "The shared system prompt is identical and already has cache breakpoints, so the cache misses are not caused by content placement. They are concentrated in requests processed later in the batch window, which points to the cache expiring before later requests can reuse it. Using the extended 1-hour TTL addresses that root cause while preserving parallel batch processing. Moving breakpoints to variable migration scripts would reduce reuse, warm-up does not prevent later expiration, and sequential batches would add unnecessary latency."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "DV3GR7KZ98MWBCB7750DE1AHAY",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 121,
   "sourceOrder": 11,
   "variant": true,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "Your CI runs security-focused code reviews on about 50 PRs daily, currently at $150/day with the synchronous API. The reviews are non-blocking: developers merge when tests pass and handle findings in later commits. You are evaluating the Message Batches API for its 50% savings. Which factor primarily determines whether batch processing is appropriate here?",
   "options": [
    {
     "key": "A",
     "text": "Whether you can structure each review as a single request without multi-turn refinement."
    },
    {
     "key": "B",
     "text": "Whether your result processing can handle reviews arriving in a different order than submitted."
    },
    {
     "key": "C",
     "text": "Whether review feedback arriving up to 24 hours after PR creation is still actionable."
    },
    {
     "key": "D",
     "text": "Whether reducing per-review latency from 30-60 seconds to near-instant matters for your workflow."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "The Message Batches API is appropriate for non-blocking, latency-tolerant work because it trades latency guarantees for lower cost. Since these reviews do not block merges, the key question is whether findings delivered later, potentially up to 24 hours after submission, are still useful enough for follow-up commits. Result ordering can be handled with identifiers, and near-instant latency is not the value proposition of batch processing."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "04B32WWJ6TQSTJAXTHYGH78X7P",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 122,
   "sourceOrder": 12,
   "variant": true,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "Your automated review calls the API per PR using tool_use with a report_findings tool that returns a JSON array of findings (each with file_path, line_number, severity, category, and description). Testing on a large PR touching 30+ files, the response reaches the max_tokens limit and the JSON truncates halfway, breaking the pipeline's parser. What is the most effective way to handle it?",
   "options": [
    {
     "key": "A",
     "text": "Split the review into multiple API calls that each analyze a subset of the changed files, then combine the resulting finding arrays."
    },
    {
     "key": "B",
     "text": "Increase max_tokens to the model's maximum and instruct Claude to keep each finding description under 50 words."
    },
    {
     "key": "C",
     "text": "Add retry logic that detects truncated JSON and resends the request with instructions to report only critical and high severity findings."
    },
    {
     "key": "D",
     "text": "Switch from tool_use to asking Claude to return the findings as a markdown list."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The failure is caused by a single large review producing more structured output than fits in `max_tokens`, resulting in truncated JSON. Splitting the PR into smaller review units keeps each `tool_use` response bounded and parseable while preserving the same structured findings schema. Simply increasing `max_tokens` may still fail on very large PRs, retrying with only high-severity findings changes recall, and switching to Markdown removes the machine-parseable structure the pipeline depends on."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "JZ231XEBBNB26QY091WVZ2ND56",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 123,
   "sourceOrder": 13,
   "variant": true,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "Your pipeline runs a `claude -p` with `--dangerously-skip-permissions` and a `--system-prompt` assembled by concatenation ('You are a code reviewer. Analyze the provided diff for bugs, security issues, and style violations.'), feeding the diff via stdin. Reviews complete and return feedback, but Claude only comments on the piped diff text: it never reads neighboring files in the cloned repo to grasp the broader context, even when the diff touches a function called by many modules. Which change to the invocation will make Claude read the repository's related files without losing your custom review instructions?",
   "options": [
    {
     "key": "A",
     "text": "Keep --system-prompt and add --allowedTools \"Read,Glob,Grep\" so the non-interactive -p mode permits the filesystem tools it otherwise disables."
    },
    {
     "key": "B",
     "text": "Remove --system-prompt entirely and place the review instructions in a CLAUDE.md file at the repository root, since --system-prompt is incompatible with tool use under -p."
    },
    {
     "key": "C",
     "text": "Stop piping the diff via stdin and embed the diff content within the prompt string, so Claude Code treats the invocation as an agentic session rather than stream processing."
    },
    {
     "key": "D",
     "text": "Replace --system-prompt with --append-system-prompt so the review instructions are appended to Claude Code's default prompt instead of overwriting the built-in guidance for using file-reading and code-navigation tools."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "The invocation is replacing Claude Code's default system guidance with a minimal custom prompt, so the run behaves as if it should only analyze the diff text piped via stdin. Using `--append-system-prompt` preserves Claude Code's built-in instructions for navigating the repository with tools while adding the custom review criteria. Simply allowing tools or moving the diff into the prompt does not fix the overwritten default guidance, and `CLAUDE.md` is project context, not a replacement for invocation-level review instructions."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "KVHWCQRPM5QA9YW98NSCDV0ZRV",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 124,
   "sourceOrder": 14,
   "variant": true,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "You built an LLM-based review tool that analyzes PRs and emits structured findings. Each finding is a JSON object with file_path, line_number, issue_category (e.g., 'security', 'style'), and description. Developers can 'dismiss' any unhelpful finding; today 35% are dismissed. You want to analyze those dismissals to understand what is failing in your system and improve your prompts. Which change to the output structure would be most useful for that analysis?",
   "options": [
    {
     "key": "A",
     "text": "Remove the issue_category field and track dismissal rates only at the individual-finding level."
    },
    {
     "key": "B",
     "text": "Expand the description field to include more detailed explanations of why each issue matters and how to fix it."
    },
    {
     "key": "C",
     "text": "Add a model_confidence field (0.0-1.0) and filter findings below a threshold calibrated against historical dismissal rates."
    },
    {
     "key": "D",
     "text": "Add a detected_pattern field that records the code construct (e.g., \"single-letter loop variable\") that triggered each finding."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "To improve the prompts, the team needs to know which recurring code patterns generate dismissed findings. `issue_category` is too broad, and individual-finding tracking is too granular to reveal systematic prompt failures. A `detected_pattern` field lets you segment dismissals by the actual construct that triggered the review comment, identify patterns with high false-positive rates, and refine criteria or examples for those cases. Confidence filtering may reduce volume, but it does not explain what is going wrong in the system."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "7N31V6D01ZK3XSTG82CV54EA93",
   "topicId": "01KT81BA4J1SN6A5M3D93T1920",
   "order": 125,
   "sourceOrder": 15,
   "variant": true,
   "scenario": {
    "title": "Claude Code for Continuous Integration",
    "body": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You must design prompts that deliver actionable feedback and minimize false positives."
   },
   "prompt": "Your review prompts include both the implementation change and its test file, but the LLM's comments do not flag untested code paths. Analysis shows the model detects functions with no tests well, but does not identify when conditional branches or error-handling paths inside already-tested functions lack coverage. What is the most effective way to improve branch-level coverage-gap detection without over-complicating the pipeline?",
   "options": [
    {
     "key": "A",
     "text": "Add explicit instructions directing the model to enumerate every conditional branch and exception path, then verify that each has a corresponding test assertion."
    },
    {
     "key": "B",
     "text": "Include few-shot examples showing code with an uncovered branch alongside the review comment that identifies the specific missing test case."
    },
    {
     "key": "C",
     "text": "Implement a multi-step pipeline where separate LLM calls first extract all conditional branches, then cross-reference each against the test assertions in a second step."
    },
    {
     "key": "D",
     "text": "Restructure the prompt to interleave implementation and tests, presenting each function immediately followed by its test cases."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "The model already detects fully untested functions, but it fails at the more ambiguous judgment of whether specific branches and error paths are covered. Few-shot examples directly demonstrate that decision pattern: a tested function can still have an uncovered conditional branch or exception path, and the review should name the missing test case. This improves branch-level detection without adding a multi-step architecture. A checklist or reordered prompt may help, but examples are more effective for teaching nuanced review behavior."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "RQ2PHYH4QMF7Z5BCQ3DSJ26PXS",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 126,
   "sourceOrder": 16,
   "variant": true,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "Users report that final reports sometimes lack depth on certain subtopics. You see that the document-analysis agent often detects gaps (for example, 'the sources discuss API authentication but not token-refresh patterns'), but with the current strict pipeline that insight is not actionable because the search already finished. What is the most effective architectural change?",
   "options": [
    {
     "key": "A",
     "text": "Have the coordinator scan the analysis output for gap indicators and re-invoke search with gap-informed queries when they are detected."
    },
    {
     "key": "B",
     "text": "Have the synthesis agent attach confidence scores to each section and flag areas with insufficient coverage for manual review."
    },
    {
     "key": "C",
     "text": "Add a research-planning agent before the search phase that decomposes topics into specific sub-questions."
    },
    {
     "key": "D",
     "text": "Have the analysis agent report specific gaps to the coordinator, which triggers targeted searches and re-invokes analysis until coverage is sufficient."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "The problem is not just initial planning; the analysis agent is discovering concrete coverage gaps after seeing the retrieved material. Those gaps need to become actionable signals in the architecture. Having the analysis agent return specific missing subtopics to the coordinator lets it run targeted searches, pass the new sources back through analysis, and iterate until coverage is adequate. Confidence flags or manual review only expose the weakness after the fact, and a planning-only step cannot react to gaps discovered during analysis."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "X9P1CYWHFRREQ9BSAHAAX4MQ4H",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 127,
   "sourceOrder": 17,
   "variant": true,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "The synthesis agent finishes its initial pass but warns that three key research questions remain unanswered because the web-search and document-analysis agents found no relevant information on those subtopics. Today the coordinator goes straight to report generation, producing reports with incomplete coverage. Which change would most improve research completeness?",
   "options": [
    {
     "key": "A",
     "text": "Have the coordinator evaluate the synthesis output for gaps, then re-delegate to web search and document analysis with targeted queries before invoking synthesis again."
    },
    {
     "key": "B",
     "text": "Give the synthesis agent direct access to web-search tools so it can autonomously fill knowledge gaps without returning control to the coordinator."
    },
    {
     "key": "C",
     "text": "Have the report-generation agent annotate which research questions could not be answered, so users understand the limitations of the final result."
    },
    {
     "key": "D",
     "text": "Increase the initial breadth of the queries sent to web search and document analysis to reduce the likelihood of missing relevant information."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The synthesis agent identified specific unanswered research questions, so the coordinator should use those gaps to drive another round of targeted research. This preserves the coordinator-led architecture while letting the pipeline iteratively improve coverage before report generation. Giving synthesis broad search access weakens the separation of responsibilities, only annotating limitations does not improve completeness, and broadening the initial search is less efficient than using the concrete gaps discovered during synthesis."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "AY2QMDRTAYYPX46T34NTKNX3V4",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 128,
   "sourceOrder": 18,
   "variant": true,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "With the web-search and document-analysis subagents' tasks done, the coordinator must start the synthesis subagent to combine the findings. What is the correct way to provide the synthesis subagent with the information it needs?",
   "options": [
    {
     "key": "A",
     "text": "Pass reference identifiers and configure the subagent with read access to a shared memory store where the other subagents deposited their results."
    },
    {
     "key": "B",
     "text": "Include the complete findings from both subagents directly in the synthesis subagent's prompt."
    },
    {
     "key": "C",
     "text": "Provide the subagent with tool definitions that let it request other subagents' outputs through callbacks."
    },
    {
     "key": "D",
     "text": "Start the subagent with only a brief task description, relying on automatic context inheritance from the coordinator."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "Subagents operate with their own context, so the synthesis subagent should not rely on automatic inheritance of the coordinator's conversation. The coordinator needs to pass the web-search and document-analysis outputs directly, ideally in a structured form that preserves claims, evidence, source metadata, and attribution. Shared-memory references or callback mechanisms add unnecessary indirection, while a brief task description would leave the synthesis agent without the evidence it must combine."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "PRV2D002T4KCDVSBCJQZ2Z7701",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 129,
   "sourceOrder": 19,
   "variant": true,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "The web-search agent gathered several relevant sources for a topic. Now the document-analysis agent needs to examine them. How does information typically flow between these two specialized subagents?",
   "options": [
    {
     "key": "A",
     "text": "The web-search agent directly invokes the document-analysis agent, passing the discovered sources as parameters."
    },
    {
     "key": "B",
     "text": "Both agents access a shared memory store where the web-search agent writes findings and the document-analysis agent reads them."
    },
    {
     "key": "C",
     "text": "The coordinator agent receives the web-search agent's output and includes the relevant findings in the prompt when invoking the document-analysis agent."
    },
    {
     "key": "D",
     "text": "The agents communicate through an event-based message queue, with the document-analysis agent subscribed to web-search completion events."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "In a coordinator-subagent architecture, specialized agents typically do not communicate directly with each other or rely on implicit shared context. The coordinator manages task decomposition, result aggregation, and information routing. After web search completes, the coordinator should take the relevant source findings and include them explicitly when invoking the document-analysis agent. This keeps communication observable and controlled while ensuring the next subagent has the context it needs."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "JSM88JGAZNG8RNXS9MJ0CN135Y",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 130,
   "sourceOrder": 20,
   "variant": true,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "When analyzing complex legal cases citing multiple precedents, the document-analysis subagent processes them one by one. A landmark ruling with 12 precedents takes more than 3 minutes to fully analyze. What is the most effective way to reduce that latency without losing the coordinator's ability to monitor and debug the system?",
   "options": [
    {
     "key": "A",
     "text": "Implement a message queue where precedent-analysis tasks are processed asynchronously by a pool of worker agents."
    },
    {
     "key": "B",
     "text": "Create a recursive agent hierarchy where analysis agents subdivide the work among child agents until reaching single-precedent granularity."
    },
    {
     "key": "C",
     "text": "Enable the document-analysis subagent to dynamically spawn its own specialized subagents when it encounters cases with many citations."
    },
    {
     "key": "D",
     "text": "Have the coordinator spawn document-analysis subagents in parallel, each handling a subset of precedents, then aggregate the results before synthesis."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "The work is naturally partitionable by precedent, so running multiple document-analysis subagents in parallel reduces latency. Keeping spawning and aggregation in the coordinator preserves observability, error handling, and debuggability, because the coordinator can track which subset each subagent analyzed and combine the results before synthesis. Message queues, recursive hierarchies, or subagents spawning their own subagents add complexity and make the control flow harder to monitor."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "RHA2NS0FAFHZ1HVAVRGN4ZNC11",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 131,
   "sourceOrder": 21,
   "variant": true,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "With the web-search and document-analysis agents' tasks finished, the coordinator invokes the synthesis agent. But it replies that it cannot complete the task because no research findings were provided. What is the most likely cause?",
   "options": [
    {
     "key": "A",
     "text": "The synthesis agent needs tools that can fetch results directly from the other agents' conversation history."
    },
    {
     "key": "B",
     "text": "The synthesis agent's context window is not large enough to hold the combined outputs of both previous agents."
    },
    {
     "key": "C",
     "text": "The subagents need to share a single API connection to enable automatic context sharing across invocations."
    },
    {
     "key": "D",
     "text": "The coordinator did not include the previous agents' outputs in the synthesis agent's prompt."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Subagents do not automatically inherit the coordinator's full conversation history or other subagents' outputs. If the synthesis agent says no findings were provided, the likely problem is that the coordinator invoked it only with the task request and omitted the web-search and document-analysis results. The fix is to include those prior outputs directly in the synthesis prompt, preferably in a structured form that preserves source metadata and evidence."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "S0H2Z3BPGHH7NG1QW4GYH5TDWT",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 132,
   "sourceOrder": 22,
   "variant": true,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "In production you observe that simple fact-check queries (e.g., 'in what year was the Paris Climate Agreement signed?') run through all four subagents in sequence, spending more than 40 seconds and many tokens per query. Complex comparative research does leverage the full pipeline. The query distribution is diverse and shifts as users discover new uses. What is the most effective approach given that variety of complexity?",
   "options": [
    {
     "key": "A",
     "text": "Have the coordinator analyze each query and dynamically decide which subagents to invoke based on its assessment of the query's requirements."
    },
    {
     "key": "B",
     "text": "Create a fast path for factual questions that bypasses the subagents entirely, routing all other queries through the full pipeline to guarantee research thoroughness."
    },
    {
     "key": "C",
     "text": "Implement pattern-based routing that categorizes queries by structure (single-fact vs. comparative vs. analytical) and maps each category to a predefined subagent combination."
    },
    {
     "key": "D",
     "text": "Train a query-complexity classifier on labeled historical data to predict optimal subagent combinations, retraining periodically as query patterns evolve."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The workload has diverse and evolving query types, so a fixed pipeline wastes time on simple questions and rigid routing becomes brittle. The coordinator's role is to assess query complexity, decompose tasks, and invoke only the subagents needed for that request. This lets simple fact checks take a lighter path while complex comparative research still uses the full multi-agent workflow. A static fast path or pattern table handles only known categories, and a separate classifier adds maintenance overhead without leveraging the coordinator's existing orchestration role."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "7DPTY76Y0E8YRSGAN1EM6YTE8V",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 133,
   "sourceOrder": 23,
   "variant": true,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "Production reviews show inconsistent handling of uncertainty in the final reports. Sometimes contradictory subagent findings collapse into a single confident statement (nuance is lost), and other times the report fills with caveats until it is useless. When web search returns 'analysts estimate a $50B market (methodology varies)' and document analysis returns 'a peer-reviewed study estimates $35B (+/-$7B, 95% CI)', the coordinator picks one at random or produces vague phrases like 'the market could be $35B-$50B depending on factors'. Which systematic approach solves it best?",
   "options": [
    {
     "key": "A",
     "text": "Implement a confidence-calibration layer that normalizes the subagents' uncertainty expressions to standardized probability scores (0.0-1.0), then weighted-average the findings by their calibrated confidence."
    },
    {
     "key": "B",
     "text": "Configure the subagents to report only findings that meet a high-confidence threshold, filtering out uncertain information before it reaches the coordinator."
    },
    {
     "key": "C",
     "text": "Instruct the synthesis agent to structure reports with explicit sections that distinguish well-established findings from contested ones, preserving the original source characterizations and methodological context."
    },
    {
     "key": "D",
     "text": "Add a verification subagent that cross-checks findings across sources, passing to synthesis only the claims corroborated by at least two independent sources."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "The problem is inconsistent synthesis of uncertainty, not the lack of a single numeric confidence score. Contradictory but credible findings should be preserved with attribution, source characterization, confidence intervals, and methodological context. Structuring the report to separate well-established findings from contested ones avoids arbitrary selection without falling into vague over-caution. Filtering uncertain claims or requiring two-source corroboration would discard useful nuance, and weighted averaging can hide important methodological differences."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "4PJQ32TMRWGWVZ407V3ASNBPBA",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 134,
   "sourceOrder": 24,
   "variant": true,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "The coordinator gives the web-search subagent very detailed step-by-step instructions: exact queries, source priorities, and date filters. Production monitoring reveals three problems: (1) the subagent reports 'insufficient results' instead of trying alternatives when the pre-set searches fail, (2) quality drops for emerging topics that do not fit the expected patterns, and (3) it almost never finds valuable tangential sources. What is the most effective way to improve the subagent's adaptability?",
   "options": [
    {
     "key": "A",
     "text": "Remove the procedural details entirely, delegating with simple goals like 'research X thoroughly' and trusting the subagent's general capabilities."
    },
    {
     "key": "B",
     "text": "Implement a topic-classification step where the coordinator categorizes requests as 'well-defined' or 'exploratory' and uses different instruction styles for each category."
    },
    {
     "key": "C",
     "text": "Specify research objectives and quality criteria (coverage breadth, source diversity, recency) instead of procedural steps, letting the subagent determine its search strategy."
    },
    {
     "key": "D",
     "text": "Add explicit fallback directives to the detailed instructions: 'If the specified searches return fewer than N results, try alternative query formulations before reporting failure'."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "The failures come from over-constraining the web-search subagent with fixed queries and procedures. For emerging or exploratory topics, the subagent needs room to adapt its search strategy while still being held to clear quality standards. Objectives and criteria like breadth, source diversity, and recency define what good research looks like without dictating brittle steps. Removing guidance entirely is too vague, fallback clauses only patch one failure mode, and classification adds complexity while still relying on predefined instruction styles."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "RRB2G0P67JBQ7AYWBD5NJCX6MB",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 135,
   "sourceOrder": 25,
   "variant": true,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "Your multi-agent research pipeline failed after processing 12 of 28 documents. The web-search agent had already identified relevant sources, the document analyzer had partially completed extraction, and the synthesizer had begun identifying patterns. You need to resume without redoing work or losing the fidelity of prior findings. Which state-management approach best balances information fidelity and context efficiency when restoring the agents' state?",
   "options": [
    {
     "key": "A",
     "text": "Have each agent persist a structured export to a known location. On resume, the coordinator loads the manifest and injects the relevant state into the agents' prompts."
    },
    {
     "key": "B",
     "text": "Have each agent maintain its own persistent state file and reload it independently at the start of each session."
    },
    {
     "key": "C",
     "text": "Persist the coordinator's conversation log containing all task delegations and responses, providing it to the agents on resume."
    },
    {
     "key": "D",
     "text": "Index all agent outputs in a shared vector store. On resume, each agent queries the store using semantic search to retrieve relevant prior findings."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Structured state exports preserve progress with high fidelity without replaying every conversation turn. A manifest gives the coordinator a reliable map of which sources were found, which documents were processed, which extractions are complete, and what synthesis work had begun. The coordinator can then inject only the relevant state into each resumed agent's prompt. Independent per-agent state files risk inconsistent restoration, full logs waste context, and semantic retrieval may miss or distort exact prior findings."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "44AEQZ45E9TTR8T0KQSY5P4TXT",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 136,
   "sourceOrder": 26,
   "variant": true,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "The coordinator has AgentDefinitions for all four subagents, each with an appropriate description, prompt, and tool restrictions. Testing, you notice the coordinator reasons well about when to delegate (it emits messages like 'I will ask the web-search agent to find sources on this') but no subagent ever executes. It then proceeds as if the delegation had happened and continues with incomplete information. The logs show no errors. What is the most likely cause?",
   "options": [
    {
     "key": "A",
     "text": "The AgentDefinitions are configured correctly, but the coordinator's system prompt does not explicitly list the available subagent types, preventing the model from knowing they can be invoked."
    },
    {
     "key": "B",
     "text": "The coordinator's max_tokens setting is too low, causing the Task tool invocation to be truncated before the subagent-type parameter can be specified."
    },
    {
     "key": "C",
     "text": "The coordinator's allowedTools setting does not include \"Task\", so although it can reason about delegation, it cannot invoke the tool needed to spawn subagents."
    },
    {
     "key": "D",
     "text": "The subagents' context isolation means the coordinator's task descriptions do not automatically reach the subagents; you need to configure explicit context forwarding in ClaudeAgentOptions."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "`AgentDefinition` entries describe the available subagent types, but the coordinator still needs permission to use the mechanism that spawns them. The `Task` tool is required for subagent invocation, so if it is missing from `allowedTools`, the coordinator can reason about delegation in natural language but never execute a subagent call. Context isolation affects what subagents receive after being spawned; it does not explain why no subagent execution occurs at all."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "6ECV0ZJCEVDW2V0TWR5F1YD3A5",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 137,
   "sourceOrder": 27,
   "variant": true,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "The synthesis agent receives summarized findings from web search and document analysis and then passes a consolidated summary to the report generator. Testing, you discover the reports make factual claims without correct citations: the generator cannot attribute the statements to their original sources because that metadata was lost during the summarization steps. What is the most effective approach to ensure proper source attribution in the final reports?",
   "options": [
    {
     "key": "A",
     "text": "Skip summarization and pass the full raw outputs from web search and document analysis directly to the report generator."
    },
    {
     "key": "B",
     "text": "Have the report generator query the web-search agent to re-locate sources for the claims in the final report."
    },
    {
     "key": "C",
     "text": "Have each agent produce structured data separating content summaries from source metadata (URLs, document names, page numbers)."
    },
    {
     "key": "D",
     "text": "Instruct the synthesis agent to embed inline source references within its summary text using a consistent citation format."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "Source attribution is lost because summarization compresses claims without preserving their provenance. Structured outputs that keep summaries separate from source metadata let downstream agents preserve and merge claim-source mappings during synthesis and report generation. Passing raw outputs wastes context, relocating sources afterward is unreliable, and inline citations within text are easier to drop or distort than explicit structured metadata."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "E05T4HT7YN34CJQDP7V4S2THE0",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 138,
   "sourceOrder": 28,
   "variant": true,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "You configured the system so all four subagents have access to the full set of 18 tools. Testing, the agents often call tools outside their specialty: the synthesis agent attempts web searches and the report generator attempts to analyze documents. What is the primary cause of this poor tool selection?",
   "options": [
    {
     "key": "A",
     "text": "Choosing among 18 tools instead of 4-5 relevant ones increases decision complexity beyond reliable selection thresholds."
    },
    {
     "key": "B",
     "text": "The coordinator cannot track which capabilities each subagent has, leading to misrouted tasks."
    },
    {
     "key": "C",
     "text": "The agents' role descriptions in their system prompts conflict with having access to tools outside that role."
    },
    {
     "key": "D",
     "text": "The tool definitions consume too much of the context window, leaving insufficient room for task content."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Giving each subagent all 18 tools makes tool selection harder and encourages cross-role misuse. A synthesis agent with web-search tools and a report generator with document-analysis tools can pick capabilities outside their specialization because the available tool set is too broad. The best design is scoped tool access: each subagent should receive only the tools needed for its role, with cross-role tools limited to specific high-frequency needs."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "6MX5P2G7GFFQ9BFVG5NMCJK10J",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 139,
   "sourceOrder": 29,
   "variant": true,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "In production, final reports often contain claims without proper source attribution. Analysis shows that while the web-search and document-analysis agents do attach citations to their outputs well, the synthesis agent loses track of which sources back which conclusions when combining the findings. What is the most effective architectural change?",
   "options": [
    {
     "key": "A",
     "text": "Add a verification step where the report generator uses semantic-similarity matching against the original sources to reconstruct which claims came from which documents."
    },
    {
     "key": "B",
     "text": "Have the coordinator inject source-identifier prefixes into the text before each handoff, then parse these prefixes at report generation to reconstruct citations."
    },
    {
     "key": "C",
     "text": "Maintain full transcripts of all subagent interactions and add a citation-resolution agent to parse the logs and determine attributions before report generation."
    },
    {
     "key": "D",
     "text": "Require all subagents to produce structured claim-source mappings that the synthesis agent must preserve and merge when combining findings from multiple sources."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "The synthesis step is where attribution is lost, so the architecture must make provenance explicit and durable before synthesis occurs. Structured claim-source mappings let the synthesis agent merge conclusions while retaining which sources support each claim. Reconstructing citations after the fact via semantic similarity, logs, or text prefixes is brittle and can misattribute; preserving the mappings through the pipeline is more reliable."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "H2SPR9T6VVHXS0EB4Z1AC3RMFW",
   "topicId": "01KT81BA4JK0BAMH84VBFJK0FA",
   "order": 140,
   "sourceOrder": 30,
   "variant": true,
   "scenario": {
    "title": "Multi-Agent Research System",
    "body": "You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive reports with citations."
   },
   "prompt": "Production monitoring shows that follow-up queries like 'summarize what we learned about market trends' consistently take more than 40 seconds. Investigating, you see the coordinator spawns the synthesis subagent for every summary request, passing it more than 80K tokens of accumulated findings that the coordinator already holds in its own orchestration context. What is the most effective way to improve response time for these follow-up summaries?",
   "options": [
    {
     "key": "A",
     "text": "Have the coordinator handle direct summary requests using its existing context, reserving subagent spawning for complex analysis."
    },
    {
     "key": "B",
     "text": "Pre-generate and cache summaries at multiple granularities whenever new findings accumulate."
    },
    {
     "key": "C",
     "text": "Spawn the synthesis subagent with reduced context and have it request specific findings from the coordinator on demand."
    },
    {
     "key": "D",
     "text": "Enable prompt caching on the synthesis subagent to reduce the overhead of repeatedly transferring the same research findings."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The coordinator already has the accumulated findings in context, so spawning a synthesis subagent and passing more than 80K tokens for a simple follow-up summary adds avoidable latency and cost. The coordinator should dynamically decide whether a request needs a specialist subagent; direct summaries can be answered directly, while complex synthesis or new analysis can still be delegated. Caching or pre-generating summaries may help in specific cases, but the most direct improvement is to avoid the unnecessary subagent invocation."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "3QNG3A8WGPYAK4YCK59P49XQYM",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 141,
   "sourceOrder": 31,
   "variant": true,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "Your agent spent 25 minutes exploring a game engine's rendering subsystem (shader code, buffer management, frame-synchronization logic). Now an engineer asks it to understand how the physics engine integrates with rendering for collision debug overlays. You notice recent responses talk about 'typical rendering patterns' instead of the concrete VulkanPipeline and FrameGraph classes it had already discovered. What is the most effective approach?",
   "options": [
    {
     "key": "A",
     "text": "Continue in the current context with more targeted prompts that reference the specific classes by name."
    },
    {
     "key": "B",
     "text": "Summarize the key rendering findings, then start a subagent for the physics exploration with that summary in its initial context."
    },
    {
     "key": "C",
     "text": "Use /clear to reset the context entirely, then start fresh with the physics exploration using file paths from the project's CLAUDE.md."
    },
    {
     "key": "D",
     "text": "Start a subagent to explore physics independently, then manually synthesize its findings with the rendering knowledge accumulated in the main conversation."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "The current session shows context degradation: responses are drifting toward generic rendering patterns instead of using the specific classes already discovered. Summarizing the concrete rendering findings preserves the important state, and giving that summary to a physics-focused subagent isolates the next exploration while keeping the necessary integration context. Continuing in the degraded context risks more generic answers, clearing the context would discard useful discoveries, and exploring physics independently would make the integration harder."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "PWBPT4FVTX0CEX71GSFN264K3J",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 142,
   "sourceOrder": 33,
   "variant": true,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "Yesterday an engineer used the agent to analyze a legacy authentication module and identified two refactoring approaches: extracting a microservice or refactoring in place. Today they want to explore both in depth (having the agent propose concrete code changes for each) before deciding which to implement. What is the most effective way to structure that exploration?",
   "options": [
    {
     "key": "A",
     "text": "Start two new sessions, manually providing a summary of yesterday's analysis findings to establish context."
    },
    {
     "key": "B",
     "text": "Use fork_session to create two branches from yesterday's analysis, exploring one approach in each fork."
    },
    {
     "key": "C",
     "text": "Resume yesterday's session to explore the first approach, then start a new session for the second, manually recreating the original context."
    },
    {
     "key": "D",
     "text": "Resume yesterday's session and explore both approaches sequentially within the same conversation thread."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "The engineer wants to compare two diverging refactoring approaches that share the same prior analysis base. `fork_session` is designed for this: it creates independent branches from the existing context so each approach can be explored in depth without contaminating the other. Starting fresh or recreating the context manually risks losing details, while exploring both sequentially in one conversation can mix assumptions and recommendations between the two strategies."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "SQ24SFW6412CBQC15SA77C7SYX",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 143,
   "sourceOrder": 34,
   "variant": true,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "Your codebase exploration tool stores session IDs so engineers can resume investigations across days. An engineer spent an hour yesterday analyzing a legacy authentication module, accumulating context about its architecture and dependencies, and wants to continue today. The session ID is valid, but version control shows that 3 of the 12 files the agent had read were modified overnight by a colleague's merge. Which approach best balances efficiency and accuracy?",
   "options": [
    {
     "key": "A",
     "text": "Start a new session to ensure the agent works with the current state of the codebase without stale assumptions."
    },
    {
     "key": "B",
     "text": "Resume the session and immediately have the agent re-read all 12 previously analyzed files."
    },
    {
     "key": "C",
     "text": "Resume the session and inform the agent which specific files changed for targeted re-analysis."
    },
    {
     "key": "D",
     "text": "Resume the session without informing the agent about the modified files."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "Most of the previous session's context is still useful, but some file-level observations may be stale. Resuming the session preserves the hour of accumulated architectural understanding, while explicitly identifying the three modified files lets the agent re-read and update only the affected assumptions. Starting fresh or re-reading all twelve files wastes work, and resuming without mentioning the changes risks inaccurate conclusions based on outdated file contents."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "VK8MPMBAG260582297AC6VS1BZ",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 144,
   "sourceOrder": 35,
   "variant": true,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "Testing, you see that in long exploration sessions (more than 30 minutes) the agent starts giving inconsistent answers about code structure it had already discussed. Engineers say they must repeat context about modules they already explored. What is the most effective approach to fix it?",
   "options": [
    {
     "key": "A",
     "text": "Create summaries of all source files before exploration begins, loading only these compressed representations into context."
    },
    {
     "key": "B",
     "text": "Implement automatic context clearing every 15 minutes to ensure the agent starts with fresh, uncontaminated context."
    },
    {
     "key": "C",
     "text": "Switch to a higher-capability model tier to provide more context-window space for the accumulated exploration data."
    },
    {
     "key": "D",
     "text": "Have the agent maintain a notes file that records key findings, referencing it for later questions."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Extended codebase exploration can degrade as context fills with verbose tool outputs and older details become less reliable. A notes file preserves key findings outside the transient conversation context, giving the agent a stable reference for modules, classes, dependencies, and conclusions already discovered. Clearing context discards useful work, pre-summarizing all files is expensive and shallow, and a larger model does not by itself guarantee that important findings stay organized and consistently referenced."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "3GG64A44MDWZ45J1CN8VYYZ7VB",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 145,
   "sourceOrder": 36,
   "variant": true,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "An engineer asks your agent to add comprehensive tests to a 200-file legacy codebase with minimal existing coverage. They did not indicate which modules to prioritize. How should the agent decompose this open-ended task?",
   "options": [
    {
     "key": "A",
     "text": "Create a fixed testing schedule up front based on the directory structure, assigning equal effort to each top-level directory regardless of code complexity or business importance."
    },
    {
     "key": "B",
     "text": "Systematically read all 200 files to create a complete inventory of functions before writing any tests, ensuring the testing plan accounts for every function before starting."
    },
    {
     "key": "C",
     "text": "Start writing tests for the first module alphabetically, using test failures and imports to discover related files organically."
    },
    {
     "key": "D",
     "text": "Use Glob and Grep to map the codebase structure, identify tightly coupled modules, create a prioritized plan for high-impact areas, and revise as dependencies are discovered."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "For an open-ended task in a large legacy codebase, the agent should first build an incremental map of the system rather than reading every file or starting arbitrarily. `Glob` can identify the file structure and existing tests, while `Grep` can reveal entry points, imports, call sites, and coupling. That information supports a prioritized testing plan focused on high-impact modules, and the plan can adapt as dependencies and risk areas become clearer."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "CACNQETDH3RRS2S4HYW2ZT1TJM",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 146,
   "sourceOrder": 37,
   "variant": true,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "Your agent needs to insert a new helper function in the middle of a 150-line utility module, between two existing functions. The Edit tool fails because its old_string cannot find unique text to match: the file has repeated docstrings, variable names, and structural patterns. What is the most reliable way to complete the insertion?",
   "options": [
    {
     "key": "A",
     "text": "Use Bash to append the function definition to the end of the file using heredoc syntax."
    },
    {
     "key": "B",
     "text": "Use Edit with an extremely long old_string that captures more than 30 lines of context to guarantee uniqueness."
    },
    {
     "key": "C",
     "text": "Use Edit's replace_all parameter to target a common pattern and embed the new function in the replacement text."
    },
    {
     "key": "D",
     "text": "Use Read to load the file, add the function at the appropriate location, then use Write to write the updated file."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "When `Edit` cannot find a unique `old_string`, continuing to force a replacement risks modifying the wrong location or failing again. Reading the full file, inserting the helper function at the correct location in the complete content, and writing the updated file is the reliable alternative for ambiguous or repetitive text. Appending with Bash would place the function incorrectly, very long match strings are brittle, and `replace_all` against a common pattern is unsafe."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "B81QWNJDYKEVXTT11NTX69A7P9",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 147,
   "sourceOrder": 38,
   "variant": true,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "An engineer asks your agent to identify untested code paths in a 45-file legacy payment-processing module. After reading the first 8 source files, the agent's responses become noticeably less accurate: it forgets patterns already discussed and has not yet located all the test files or traced the critical payment flows. What is the most effective approach to complete this investigation?",
   "options": [
    {
     "key": "A",
     "text": "Clear the context with /clear, then selectively re-read only the most critical files discovered so far, writing key findings to a notes file that persists across context resets."
    },
    {
     "key": "B",
     "text": "Document all current findings in a summary report, clear the context entirely, then use that report as the sole reference to continue the investigation."
    },
    {
     "key": "C",
     "text": "Start subagents to investigate specific questions (e.g., 'find all test files for payment processing', 'trace the refund-flow dependencies') while the main agent coordinates findings and preserves high-level understanding."
    },
    {
     "key": "D",
     "text": "Switch to using Grep to search for specific function names instead of reading whole files, reducing the content loaded into context for the remaining exploration."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "The investigation is broad and the context is already degraded. Starting focused subagents lets each handle a bounded discovery task, such as locating payment tests or tracing refund dependencies, without flooding the main context with every file read. The main agent can coordinate and synthesize the results. Clearing the context or relying on a single summary risks losing detail, and using only `Grep` helps search but does not solve the broader need to split and coordinate the investigation."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "6VSH4BXFXNBSRZGY1T65W7H89D",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 148,
   "sourceOrder": 39,
   "variant": true,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "An engineer asks the agent to find all callers of a function before deleting it. The function is defined in a core library but also exposed through wrapper modules that rename it for domain use (for example, calculateTax in the library becomes computeOrderTax in the orders module). Which exploration strategy will most reliably identify all callers?",
   "options": [
    {
     "key": "A",
     "text": "Use Grep to search for the original function name across the entire codebase."
    },
    {
     "key": "B",
     "text": "Read the library and wrapper modules to identify all exposed names of the function, then use Grep for each name across the entire codebase."
    },
    {
     "key": "C",
     "text": "Use Grep to find all files that import from the library or the wrapper modules, then read each file to check whether it uses the function."
    },
    {
     "key": "D",
     "text": "Search for the function name in the project documentation to understand the intended usage patterns and navigate to the documented integration points."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "Searching only for the original function name will miss callers that use wrapper-level aliases like `computeOrderTax`. The reliable strategy is to understand how the function is exported and renamed across wrapper modules, collect all exposed names, and then search for each name across the entire codebase. Import-only searches can still miss indirect or aliased use, and documentation is not a complete source of the actual call sites."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "28W69EYK5QX2C5HHFJ9EA2GCG8",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 149,
   "sourceOrder": 40,
   "variant": true,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "An engineer used Claude Code yesterday to investigate a legacy monolith's authentication flows, accumulating substantial context over a 2-hour session. Today she wants to continue that specific investigation. Since then she has worked on three other codebases and knows the session was named 'auth-deep-dive'. How should she resume it?",
   "options": [
    {
     "key": "A",
     "text": "Use --session-id with the UUID of yesterday's session transcript file."
    },
    {
     "key": "B",
     "text": "Use --resume auth-deep-dive to load that specific session by name."
    },
    {
     "key": "C",
     "text": "Use --continue to pick up where the most recent conversation left off."
    },
    {
     "key": "D",
     "text": "Start fresh and re-read the same files."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "The engineer wants to continue a specific named investigation, not just the most recent conversation. `--resume auth-deep-dive` loads that named session and preserves the accumulated context from the prior authentication analysis. `--continue` would risk resuming one of the other codebase sessions she worked on afterward, and starting fresh would waste the two hours of prior exploration."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "D35TVPR4ZG0BB26WK24DA0MAAM",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 150,
   "sourceOrder": 41,
   "variant": true,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "Your review assistant must analyze PRs and give feedback on three aspects: code-style compliance, potential security issues, and documentation completeness. Each aspect requires reading files, running analysis tools, and generating a report section. The process follows the same three-step flow for every PR. Which task-decomposition pattern is most appropriate for this flow?",
   "options": [
    {
     "key": "A",
     "text": "Orchestrator-workers -- have a central LLM analyze each PR to dynamically determine which checks are needed, then delegate to specialized worker LLMs for each identified subtask."
    },
    {
     "key": "B",
     "text": "Routing -- classify each PR by type (feature, bugfix, refactor) first, then route to different review prompts optimized for that category."
    },
    {
     "key": "C",
     "text": "Prompt chaining -- split the review into sequential steps where each aspect (style, security, documentation) is analyzed separately, with the outputs combined in a final synthesis step."
    },
    {
     "key": "D",
     "text": "Single comprehensive prompt -- include all instructions in one prompt and let the model handle all three aspects simultaneously."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "The review has the same known steps for every PR, and each aspect benefits from focused attention. Prompt chaining fits predictable multi-step workflows: run separate passes for style, security, and documentation, then combine the outputs in a final synthesis. Orchestrator-worker patterns are better when the needed subtasks are dynamic, routing is for choosing among different workflows, and a single comprehensive prompt risks attention dilution across the three review dimensions."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "T4XK0YYZTHR6D93GC9WY74YZ5G",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 151,
   "sourceOrder": 42,
   "variant": true,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "An engineer asks the agent to find all files in the monorepo that import the @company/auth package to understand how authentication is used across services. Which built-in tool is most appropriate for this task?",
   "options": [
    {
     "key": "A",
     "text": "Glob, to find files with \"auth\" in their name or path."
    },
    {
     "key": "B",
     "text": "Bash, to run find . -type d -name \"*auth*\" and explore the matching directories."
    },
    {
     "key": "C",
     "text": "Read, starting with the package.json files to trace dependency declarations."
    },
    {
     "key": "D",
     "text": "Grep, to search for the import statement pattern within the files' contents."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "The engineer needs to find files whose contents import `@company/auth`. `Grep` is the appropriate built-in tool for searching within file contents for patterns such as import statements, function names, or error messages. `Glob` searches file paths, `Read` is too manual as a first step, and using `Bash` to inspect directories will miss imports in files whose paths do not include `auth`."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "XWC94CWDKSJFCWA7J58W47H2BV",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 152,
   "sourceOrder": 43,
   "variant": true,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "A newly onboarded engineer asks the agent for help understanding the authentication and authorization architecture before making security improvements. The codebase has more than 800 files across several services. Which exploration strategy will build understanding most effectively, given Claude's built-in tools and context limits?",
   "options": [
    {
     "key": "A",
     "text": "Read all files that contain \"auth\", \"login\", \"permission\", or \"token\" in their content or filename."
    },
    {
     "key": "B",
     "text": "Read the CLAUDE.md and README files first, then ask the engineer to specify which 10-15 files are most important for understanding the auth system."
    },
    {
     "key": "C",
     "text": "Use Grep to find the authentication entry points, read those files, then follow the imports and function calls to map the authentication flow incrementally."
    },
    {
     "key": "D",
     "text": "Launch subagents in parallel to explore different services simultaneously, then synthesize their findings into an architectural overview."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "With more than 800 files, reading all auth-related files up front would flood the context and still might not reveal the flow. The best approach is incremental: use `Grep` to find concrete authentication and authorization entry points, `Read` the relevant files, then follow imports, call sites, and dependencies to build the architecture map. This keeps the context focused and grounded in real code paths. Parallel subagents can help later, but the first step should establish the actual entry points and flow."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "DJFZ59ERH4BXBH7MXX6CB5F38F",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 153,
   "sourceOrder": 44,
   "variant": true,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "An engineer asks the agent to understand how the caching layer works before adding a new invalidation trigger. After initial Grep searches, the agent found that the caching logic spans 15 files across decorators, middleware, and service classes (~8,000 lines total). What is the most effective next step to build understanding while managing context constraints?",
   "options": [
    {
     "key": "A",
     "text": "Use the Read tool to sequentially load all 15 files, building complete understanding of the entire caching implementation."
    },
    {
     "key": "B",
     "text": "Analyze the imports and class hierarchies to identify the base cache class, read that file to understand the interface, then trace the specific invalidation implementations."
    },
    {
     "key": "C",
     "text": "Use Grep to search for \"invalidate\" and \"expire\" patterns across all files, then read only those specific line ranges with minimal surrounding context."
    },
    {
     "key": "D",
     "text": "Use Glob to find files matching common cache patterns (cache.py, caching/), prioritize the largest files by reading them first, then check the smaller files for gaps."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "After finding a broad set of cache-related files, the next step should narrow the problem to the system's structure. Identifying the base cache abstraction and reading its interface gives a stable mental model, then tracing the invalidation implementations follows the actual architecture. Reading all 15 files would overload context, keyword-only searches for `invalidate` and `expire` may miss important control flow, and prioritizing by file size is not a reliable indicator of architectural importance."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "EKRHN11788RHGXYAETAG3WKQ34",
   "topicId": "01KT81BA4J2675N47R42Q4C716",
   "order": 154,
   "sourceOrder": 45,
   "variant": true,
   "scenario": {
    "title": "Developer Productivity with Claude",
    "body": "You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers."
   },
   "prompt": "An engineer's exploration subagent spent 30 minutes analyzing a legacy payment system, reading 47 files and documenting data flows. The session dropped when the engineer's connection failed. While they were away, a teammate merged a PR that renamed two utility functions. The engineer wants to continue the same exploration. What is the most effective approach?",
   "options": [
    {
     "key": "A",
     "text": "Resume the subagent from its previous transcript without mentioning the changes -- the architectural understanding is still valid."
    },
    {
     "key": "B",
     "text": "Launch a new subagent with a summary of the previous findings."
    },
    {
     "key": "C",
     "text": "Resume the subagent from its previous transcript and inform it about the renamed functions."
    },
    {
     "key": "D",
     "text": "Launch a new subagent and include the previous transcript in the initial prompt as context."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "The previous exploration contains substantial useful context, so restarting would waste work. However, the teammate's merge means some prior observations may be stale. Resuming the session while explicitly telling the agent which utility functions were renamed lets it preserve the 30 minutes of analysis and perform targeted re-analysis around the changed symbols. Resuming silently risks stale assumptions, and passing a full prior transcript to a new subagent is inefficient."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "W7SN466G5GP76EYA8C2TKKC5EP",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 155,
   "sourceOrder": 46,
   "variant": true,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "You have been assigned to add real-time updates to the application. It could be implemented with WebSockets, Server-Sent Events, or polling, each with different complexity, browser support, and infrastructure requirements. What is the most effective way to start this task?",
   "options": [
    {
     "key": "A",
     "text": "Begin direct execution with WebSockets, then refactor if infrastructure problems arise."
    },
    {
     "key": "B",
     "text": "Enter plan mode to explore the architecture, evaluate the trade-offs, and present options for team approval before implementing."
    },
    {
     "key": "C",
     "text": "Use direct execution with a prompt asking Claude to analyze all approaches and implement the one it determines is best."
    },
    {
     "key": "D",
     "text": "Use direct execution to implement polling first, then evaluate whether to upgrade to WebSockets later."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "Real-time updates involve architectural trade-offs among WebSockets, Server-Sent Events, and polling, including infrastructure requirements, browser support, operational complexity, and product needs. Plan mode is appropriate before implementation because it lets Claude investigate the existing architecture, compare the options, and produce a decision proposal for the team. Direct execution would prematurely commit to one approach before understanding the trade-offs."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "K2R8D2ZXSRHVQ5TMKDTBH2F4TD",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 156,
   "sourceOrder": 47,
   "variant": true,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "Your team's CLAUDE.md includes the rule: 'Use 4-space indentation and always run Prettier formatting.' Even so, reviews show that ~30% of the files Claude Code generates come out with inconsistent formatting: sometimes 2 spaces, sometimes missing trailing commas. Adding emphasis ('IMPORTANT: you MUST use Prettier formatting') lowers violations to ~15% but does not eliminate them. What is the most effective way to guarantee that all generated code is consistently formatted?",
   "options": [
    {
     "key": "A",
     "text": "Add a Stop hook with a prompt-based check that evaluates whether the generated code follows the formatting standards and asks Claude to fix violations."
    },
    {
     "key": "B",
     "text": "Split the formatting rules into path-scoped .claude/rules/ files that load when Claude works on matching file types."
    },
    {
     "key": "C",
     "text": "Extract the formatting rules into a dedicated skill that Claude loads automatically when generating code, with more detailed examples of the correct formatting."
    },
    {
     "key": "D",
     "text": "Configure a PostToolUse hook with an Edit|Write matcher that automatically runs Prettier on every file Claude modifies."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "Formatting is a deterministic post-processing concern, so it should be enforced by tooling rather than relying on prompt compliance. A `PostToolUse` hook that matches `Edit` and `Write` can automatically run Prettier on modified files, eliminating inconsistent indentation and trailing-comma issues regardless of what Claude initially generated. More emphasis in instructions, path-scoped rules, or skills may improve behavior but still depend on the model following the formatting guidance."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "7JGMQMN235S7GD8QC4NMWPSHN3",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 157,
   "sourceOrder": 48,
   "variant": true,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "You need to add date validation ensuring that event dates are in the future. It requires adding a conditional to an existing function in a single file. What is the most appropriate approach?",
   "options": [
    {
     "key": "A",
     "text": "Start with extended thinking mode enabled to ensure thorough reasoning about the validation logic."
    },
    {
     "key": "B",
     "text": "Enter plan mode to analyze how the validation might impact other parts of the booking flow."
    },
    {
     "key": "C",
     "text": "Use direct execution to make the change."
    },
    {
     "key": "D",
     "text": "Enter plan mode first to create a detailed implementation strategy before making the change."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "This is a simple, well-scoped modification: adding a validation conditional to an existing function in a single file. Direct execution is appropriate for clearly scoped changes with low architectural risk. Plan mode is better for multi-file changes, architectural decisions, or tasks with multiple viable approaches, and extended thinking is unnecessary for a straightforward validation check."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "3ZC76BJEC7W889HREJ2T7MSRN3",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 158,
   "sourceOrder": 49,
   "variant": true,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "Your team often migrates components from React to Vue. You wrote a step-by-step workflow for Claude Code to follow on each migration and want everyone to invoke it by typing /migrate-component. The workflow must stay in sync as the team iterates on it. Where should you place the skill file?",
   "options": [
    {
     "key": "A",
     "text": "In .claude/skills/migrate-component/SKILL.md at the project root, committed to version control."
    },
    {
     "key": "B",
     "text": "In the project's .claude/settings.json using a skillOverrides entry to register and define the workflow."
    },
    {
     "key": "C",
     "text": "As a detailed instruction block in the project root's CLAUDE.md file."
    },
    {
     "key": "D",
     "text": "In ~/.claude/skills/migrate-component/SKILL.md on each developer's machine."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "A workflow that must be shared by all developers and kept in sync as the team improves it belongs in the repository, not in each developer's personal configuration. A project skill at `.claude/skills/migrate-component/SKILL.md` can be versioned, reviewed, and updated with the codebase. `CLAUDE.md` would load the workflow into every conversation unnecessarily, and per-user skill files would diverge across machines."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "KYZQ8K6Z08RX6TV7BEQXV3C7MV",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 159,
   "sourceOrder": 51,
   "variant": true,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "Your monorepo keeps shared standards in /docs/standards/: security-rules.md (for services handling user data), testing-patterns.md (for all packages), and api-conventions.md (for services exposed as APIs). Your 15 packages are organized by feature domain (/packages/auth/, /packages/billing/, etc.) with no naming conventions indicating which handle user data or expose APIs. Each maintainer is expected to configure their own local settings, since they know their package's requirements. Today all package CLAUDE.md files duplicate all three standards, applying irrelevant guidance. What is the most effective approach?",
   "options": [
    {
     "key": "A",
     "text": "Put all standards in the root CLAUDE.md with override instructions like \"ignore security-rules.md when working on packages that do not handle user data\"."
    },
    {
     "key": "B",
     "text": "Create a shared-standards.md that uses @imports to combine all three standards, then have each package's CLAUDE.md import that combined file."
    },
    {
     "key": "C",
     "text": "Create .claude/rules/ files for each standard with paths in YAML frontmatter listing each package directory where that standard should apply."
    },
    {
     "key": "D",
     "text": "Use @imports in each package's CLAUDE.md to reference only the standards files relevant to that package, based on the maintainer's domain knowledge."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "The standards are modular, but applicability depends on domain knowledge that cannot be inferred from package paths or names. Using `@import` in each package's `CLAUDE.md` lets maintainers include only the standards that actually apply to their package while the source files stay centralized in `/docs/standards/`. Root-level ignore instructions and combined imports would still load irrelevant guidance, while path-scoped rules require maintaining explicit package lists for criteria that are not obvious from paths."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "NJ4W4T0TFS5BXT42V3Z8ZTRKFB",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 160,
   "sourceOrder": 53,
   "variant": true,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "Your team has three requirements for Claude Code's behavior in the project: (1) Claude must never modify files in db/migrations/; (2) Claude should prefer your custom logging module over console.log; (3) all TypeScript files must be automatically formatted with Prettier after every edit. Today all three are written as instructions in the project's CLAUDE.md. During a complex refactor, a developer discovers that Claude edited a migration file, violating requirement #1. How should you restructure these requirements into Claude Code's configuration mechanisms?",
   "options": [
    {
     "key": "A",
     "text": "Rewrite all three requirements in CLAUDE.md using stronger directive language and add few-shot examples demonstrating Claude refusing to edit migration files and running Prettier after edits."
    },
    {
     "key": "B",
     "text": "Add Edit(./db/migrations/**) to permissions.deny in the project configuration, keep the logging preference in CLAUDE.md, and add a PostToolUse hook on the Edit tool that runs Prettier on modified TypeScript files."
    },
    {
     "key": "C",
     "text": "Move all three requirements to .claude/rules/ as path-scoped rules: one targeting db/migrations/** that forbids editing those files, and others targeting **/*.ts for the logging convention and the formatting instruction."
    },
    {
     "key": "D",
     "text": "Configure hooks for all three: a PreToolUse hook script that blocks Edit calls targeting db/migrations/, a PreToolUse hook script that adds logging-convention context before edits, and a PostToolUse hook that runs Prettier after TypeScript edits."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "These requirements have different enforcement needs. 'Never modify migrations' is a hard safety rule and should be enforced by permissions rather than prompt instructions. Preferring a custom logging module is a project-wide code convention, so `CLAUDE.md` is appropriate. Formatting after edits is deterministic automation, so a `PostToolUse` hook should run Prettier on modified TypeScript files. Stronger wording or path-scoped prompt rules still depend on model compliance for requirements that must be enforced mechanically."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "8DPBEDBQKKX7M54DVZXEXM9P47",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 161,
   "sourceOrder": 55,
   "variant": true,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "You are implementing a caching layer for API responses to speed up the /products endpoint. You have a rough idea (Redis with a 5-minute TTL) but you are new to production caching and unsure what other considerations a robust implementation demands. What is the most effective way to start your iterative workflow?",
   "options": [
    {
     "key": "A",
     "text": "Start with a minimal request: 'Add Redis caching to /products with a 5-minute TTL.' Add features and fix problems through follow-up prompts as they arise during testing."
    },
    {
     "key": "B",
     "text": "Use plan mode to analyze the current /products endpoint implementation, then provide the caching requirements once Claude explains how the existing code is structured."
    },
    {
     "key": "C",
     "text": "Write a spec with the known requirements and 'TBD' markers for the uncertain areas, having Claude propose solutions for each TBD while implementing."
    },
    {
     "key": "D",
     "text": "Ask Claude to interview you about the caching requirements before implementing, identifying considerations such as invalidation strategies, cache layers, consistency guarantees, and failure modes."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "The user has a rough implementation idea but lacks clarity about production requirements. The interview pattern is appropriate because it helps surface design considerations the developer may not have anticipated, such as invalidation, consistency, fallback behavior, cache stampedes, observability, and failure modes. Starting with a minimal implementation or filling in `TBD` markers would likely miss important decisions, while plan mode can only analyze the code structure without eliciting the missing product and operational requirements."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "QNZS5WHAF16K3HZCBDP5HM1J66",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 162,
   "sourceOrder": 56,
   "variant": true,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "You are implementing a complex graph-traversal algorithm with specific performance requirements and edge cases to handle (disconnected nodes, cycles, weighted edges). You want to structure your workflow to refine iteratively and efficiently with Claude. Which approach will best enable progressive improvement across several iterations?",
   "options": [
    {
     "key": "A",
     "text": "Write a test suite covering the expected behavior, edge cases, and performance requirements before implementation. Ask Claude to write code that passes the tests, then iterate by sharing test failures with each refinement request."
    },
    {
     "key": "B",
     "text": "Provide Claude with a reference implementation from the documentation, then ask it to rewrite the code to match your code style and add the required edge-case handling, comparing results against the reference."
    },
    {
     "key": "C",
     "text": "Provide Claude with a detailed natural-language specification of the algorithm, including all requirements and edge cases. Review each output manually and provide descriptive feedback about what behavior needs to change."
    },
    {
     "key": "D",
     "text": "Have Claude extensively research the algorithm and create a detailed implementation plan using extended thinking, then implement the complete solution based on that plan."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "For a complex algorithm, tests provide concrete, repeatable feedback across iterations. Covering disconnected nodes, cycles, weighted edges, expected outputs, and performance constraints gives Claude a clear target and turns each refinement into a specific response to the failing cases. Natural-language review alone is less precise, and a detailed plan does not guarantee correctness on edge cases without executable feedback."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "JVB9X4M5EH6EE9WYNXYP20NPF8",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 163,
   "sourceOrder": 57,
   "variant": true,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "Your team wants Claude to follow a detailed review checklist (8 items on API changes, test coverage, documentation, security, etc.) when reviewing PRs. The team also uses Claude for many other tasks: writing features, debugging production issues, and generating documentation. Today developers paste the checklist at the start of each review session. Which approach best addresses this workflow need?",
   "options": [
    {
     "key": "A",
     "text": "Configure plan mode as the default for code-review sessions."
    },
    {
     "key": "B",
     "text": "Create a dedicated review subagent with the checklist embedded in its configuration."
    },
    {
     "key": "C",
     "text": "Add the checklist to the project's CLAUDE.md file under a 'Code Review' section."
    },
    {
     "key": "D",
     "text": "Create a /review slash command that contains the checklist, invoked when starting reviews."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "A slash command fits a repeatable workflow that developers intentionally start only for pull-request reviews. It keeps the detailed checklist out of ordinary feature, debugging, and documentation sessions while giving the team a consistent review procedure without pasting the checklist manually every time."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "34CJXAF0K4SEFKAQQTWFY7WFD8",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 164,
   "sourceOrder": 58,
   "variant": true,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "Your team is configuring MCP servers in Claude Code. You want to add a shared venue-search server that everyone should have access to, and personally you want to add an experimental music-playlist server that only you are testing. Which configuration approach correctly applies MCP server scopes?",
   "options": [
    {
     "key": "A",
     "text": "Add the venue server to ~/.claude.json and the playlist server to .mcp.json."
    },
    {
     "key": "B",
     "text": "Add both servers to the project-level .mcp.json file."
    },
    {
     "key": "C",
     "text": "Add the venue server to .mcp.json and the playlist server to ~/.claude.json."
    },
    {
     "key": "D",
     "text": "Add both servers to your local ~/.claude.json."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "A server that all team members should use belongs in the project-scoped `.mcp.json`, because it can be shared with the repository. A personal, experimental server belongs in the user-scoped `~/.claude.json`, because it should affect only the developer testing it."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "VFTSV8C3577X1X2ZHJZVMTXWKQ",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 165,
   "sourceOrder": 59,
   "variant": true,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "A critical bug is affecting production users. The error logs show exceptions in the OrderProcessing module with a clear stack trace pointing to a specific function. You have never worked with this module. What is the most effective approach?",
   "options": [
    {
     "key": "A",
     "text": "Enter plan mode to explore the module's architecture and dependencies before attempting any fix."
    },
    {
     "key": "B",
     "text": "Start with direct execution to gather initial information, then switch to plan mode to design a comprehensive solution before implementing any changes."
    },
    {
     "key": "C",
     "text": "Use direct execution to examine the stack trace, read the relevant code, and implement a fix once the root cause is identified."
    },
    {
     "key": "D",
     "text": "Use plan mode to analyze the error in the context of the module's design, enumerate possible root causes, and prioritize fixes systematically."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "The problem is urgent and already well scoped by the logs and stack trace. Direct execution lets Claude inspect the failing function, follow the immediate code path, identify the root cause, and apply a specific fix without spending time on a broader architectural planning phase that is not needed given the available evidence."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "J8YMR3SYPSKR8728WTBTH5ZKYH",
   "topicId": "01KT81BA4JJHS623EN20YJ4JZ1",
   "order": 166,
   "sourceOrder": 60,
   "variant": true,
   "scenario": {
    "title": "Code Generation with Claude Code",
    "body": "You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and an understanding of when to use plan mode versus direct execution."
   },
   "prompt": "You asked Claude Code for a PDF report-generation feature. The initial implementation queries the database correctly, but the output has formatting problems: the table columns are too narrow and truncate content, dates display without the correct format, and page-break handling is incorrect. You notice these problems interact: changing column width affects how dates render, and page breaks depend on content height. What is the most effective approach to iterate toward a working solution?",
   "options": [
    {
     "key": "A",
     "text": "Address the column-width problem first with specific measurements, verify it works, then fix the date formatting within the corrected columns, then adjust the page breaks -- testing after each change."
    },
    {
     "key": "B",
     "text": "Start from scratch with a detailed prompt specifying all formatting requirements from the beginning."
    },
    {
     "key": "C",
     "text": "Show Claude an example of a correctly formatted report and ask it to match that output, rather than listing the specific technical problems."
    },
    {
     "key": "D",
     "text": "Provide all three problems in a single detailed message with exact specifications for each, allowing Claude to address them together in one update."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "The formatting problems interact, so fixing them one at a time can cause later changes to invalidate earlier work. Providing the column-width, date-format, and page-break requirements together gives Claude the complete set of constraints needed to produce a coherent layout update."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "W1Y7M3MGRXKAR425WHDZETS26Y",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 167,
   "sourceOrder": 61,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "The agent skips `get_customer` in 12% of interactions and runs `lookup_order` with the name the customer dictated, which sometimes ties the wrong account and issues erroneous refunds. Which measure fixes it most reliably?",
   "options": [
    {
     "key": "A",
     "text": "A programmatic prerequisite that blocks `lookup_order` and `process_refund` until `get_customer` has returned a verified customer ID."
    },
    {
     "key": "B",
     "text": "Reinforce the system prompt to require identity verification before any order operation."
    },
    {
     "key": "C",
     "text": "Add few-shot examples showing the agent always calling `get_customer` first."
    },
    {
     "key": "D",
     "text": "A routing classifier that enables only the appropriate subset of tools per request."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Critical business logic -- verifying identity before refunding -- demands deterministic guarantees the prompt cannot provide. A programmatic prerequisite that blocks downstream tools until `get_customer` verifies the account eliminates the failure by design. Reinforcing the prompt or few-shot rely on probabilistic compliance, insufficient when money and identity are at stake; the routing classifier changes which tools are available, not the execution order, which is the real problem."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "VN13YJ110G5WQ8D8GM6YXMFMZ4",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 168,
   "sourceOrder": 62,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "For 'check my order #12345' the agent invokes `get_customer` instead of `lookup_order`. Both tools carry terse descriptions and accept similar identifiers. What is the most effective first step?",
   "options": [
    {
     "key": "A",
     "text": "Add 5-8 few-shot examples of correct tool selection."
    },
    {
     "key": "B",
     "text": "Expand each tool's description with input formats, example queries, edge cases, and boundaries (when to use one versus the other)."
    },
    {
     "key": "C",
     "text": "A router that parses the input and pre-selects the tool by keywords."
    },
    {
     "key": "D",
     "text": "Consolidate both tools into a single `lookup_entity`."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "Tool descriptions are the model's primary selection mechanism; minimal descriptions cause confusion between similar tools. Expanding them attacks the root cause with low effort and high leverage. Few-shot adds tokens without fixing the cause, a keyword router is over-engineered, and consolidating is valid but more costly than a first step."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "9BPBT5Q4C3GV8EZ3HMC6KVD0Z5",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 169,
   "sourceOrder": 63,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "The agent's resolution stalls at 55% (goal 80%): it hands off the easy cases (replacements with a damage photo) and only resolves the hard ones (policy exceptions). How is escalation best calibrated?",
   "options": [
    {
     "key": "A",
     "text": "Define explicit escalation criteria and add few-shot examples of when to escalate versus resolve."
    },
    {
     "key": "B",
     "text": "Have the agent report its own confidence (1-10) and route to a human below a threshold."
    },
    {
     "key": "C",
     "text": "Train a classifier on labeled historical tickets."
    },
    {
     "key": "D",
     "text": "Use sentiment analysis to escalate when frustration is detected."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The problem is unclear decision boundaries; explicit criteria with few-shot teach when to escalate and when to resolve. The LLM's self-reported confidence is poorly calibrated, a trained classifier is over-engineering, and sentiment does not correlate with the real complexity of the case."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "M77X3ZA80J8TPBZWGZJFQ7ZAAW",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 170,
   "sourceOrder": 64,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "No automatic refund may exceed $500; above that, it goes to a human. The rule is in uppercase in the system prompt, but every so often the agent approves larger refunds. What is the most reliable mechanism?",
   "options": [
    {
     "key": "A",
     "text": "A `PreToolUse` hook that intercepts `process_refund` calls, blocks amounts above $500, and redirects them to human escalation."
    },
    {
     "key": "B",
     "text": "Repeat the rule with more emphasis and examples in the system prompt."
    },
    {
     "key": "C",
     "text": "Add the limit constraint to the `process_refund` tool description."
    },
    {
     "key": "D",
     "text": "A post-review step that checks issued refunds and reverses those exceeding the limit."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Critical business and compliance rules must live in the deterministic middleware layer, not in the probabilistic fabric of the prompt. A `PreToolUse` hook blocks the action before it touches the backend, guaranteeing the limit. Emphasis in the prompt or in the description still depends on model compliance, and reversing afterward already let the improper refund happen."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "J9SDMY73YPW4051NAMFESFP7W2",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 171,
   "sourceOrder": 65,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "`process_refund` always returns 'Operation failed' on failure, so the agent does not tell a transient timeout from a policy violation and retries things it shouldn't. Which error-response design enables proper recovery?",
   "options": [
    {
     "key": "A",
     "text": "Have the tool retry internally with backoff and return 'unavailable' after exhausting retries."
    },
    {
     "key": "B",
     "text": "Log the detailed error to the server logs and return a generic message to the agent to avoid exposing details."
    },
    {
     "key": "C",
     "text": "Return structured metadata with `isError`, `errorCategory` (transient/validation/permission/business), and `isRetryable`, plus a human-readable description."
    },
    {
     "key": "D",
     "text": "Have the agent escalate to a human on any tool failure."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "Uniform responses prevent the agent from making good recovery decisions. Structured metadata with the error category and whether it is retryable lets the agent retry transient failures and avoid retrying business ones. Internal backoff hides the context, a generic message repeats the problem, and escalating on any failure wastes recovery of transient failures."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "EMTHG8H4JY98EPWE645MGPA2NF",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 172,
   "sourceOrder": 66,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "On escalation, the human operator receives the whole chat and wastes time reconstructing the case. What makes the handoff most effective?",
   "options": [
    {
     "key": "A",
     "text": "Generate a structured escalation package (customer_id, issue_summary, order_id, root_cause, actions_taken[], refund_amount, recommended_action, escalation_reason)."
    },
    {
     "key": "B",
     "text": "Attach the full conversation transcript with timestamps."
    },
    {
     "key": "C",
     "text": "A free-prose summary generated by the model at escalation time."
    },
    {
     "key": "D",
     "text": "A link to the customer's history for the operator to consult manually."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The human operator should not read the whole chat; they need a structured, actionable summary. A handoff package with the key facts and the recommended action lets them continue without reconstructing the case. The full transcript or a link shift the work to the human, and a free-prose summary is less reliable and may omit critical fields."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "S19V1WDE7Q3FM7MH6GGKTNZ7KK",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 173,
   "sourceOrder": 67,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "The customer says: 'No bots, connect me to a person now.' Even so the agent tries to diagnose and propose solutions before escalating. What is the correct conduct?",
   "options": [
    {
     "key": "A",
     "text": "Escalate to a human immediately since it is an explicit request, without trying to investigate first."
    },
    {
     "key": "B",
     "text": "Attempt to resolve the problem once and escalate only if the attempt fails."
    },
    {
     "key": "C",
     "text": "Analyze sentiment to confirm the frustration before deciding to escalate."
    },
    {
     "key": "D",
     "text": "Ask the customer to explain their problem to assess whether they truly need a human."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "An explicit request to speak with a human is an escalation trigger that must be honored immediately. Insisting on resolving, measuring sentiment, or interrogating the customer ignores the direct request and degrades the experience; those steps apply when the issue is straightforward and the customer has not demanded a human."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "W048TWENZQPWA14RD6MN0YWXH5",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 174,
   "sourceOrder": 68,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "`get_customer` returns three different customers matching the given name. How should the agent proceed?",
   "options": [
    {
     "key": "A",
     "text": "Ask the customer for additional identifiers (email, order number, or postal code) to disambiguate before proceeding."
    },
    {
     "key": "B",
     "text": "Pick the match with the most recent account activity as the most likely one."
    },
    {
     "key": "C",
     "text": "Pick the match whose profile is most complete."
    },
    {
     "key": "D",
     "text": "Process the query for all three accounts and let the customer identify the correct one in the response."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "With multiple matches, choosing by heuristic risks acting on the wrong account -- especially serious before order operations or refunds. The correct move is to ask for additional identifiers to verify identity. Guessing by recency or completeness, or exposing three accounts' data, compromises accuracy and privacy."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "BFCK5HMZVV8RP0VF3P0M2HNB7T",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 175,
   "sourceOrder": 69,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "In long, many-turn dialogues, the agent loses the order number and the agreed refund amount because the history is summarized. What is the best way to preserve that data?",
   "options": [
    {
     "key": "A",
     "text": "Extract the transactional facts (amounts, dates, order IDs, statuses) into a persistent 'case facts' block included in every prompt, outside the summarized history."
    },
    {
     "key": "B",
     "text": "Increase the summary length so it retains more detail from each turn."
    },
    {
     "key": "C",
     "text": "Switch to a model with a larger context window so it never summarizes."
    },
    {
     "key": "D",
     "text": "Repeat the entire full history without summarizing on every request."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Precise transactional values are lost when progressive summarization condenses them. Keeping a 'case facts' block with that data in every prompt, separate from the summarized history, preserves them reliably. A longer summary still risks loss, a bigger model does not guarantee retaining the exact value, and repeating the whole history wastes context."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "2EV06D3874G4CDBTRPK2YXWVRN",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 176,
   "sourceOrder": 70,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "The order and billing tools deliver dates in different formats (Unix, ISO 8601, numeric status codes) and that confuses the agent when comparing events. What is the most reliable way to unify them?",
   "options": [
    {
     "key": "A",
     "text": "A `PostToolUse` hook that intercepts the tools' results and normalizes dates and statuses to a uniform format before the model processes them."
    },
    {
     "key": "B",
     "text": "Instruct the agent in the prompt to mentally convert each format when comparing."
    },
    {
     "key": "C",
     "text": "Add a note about the returned format to each tool description."
    },
    {
     "key": "D",
     "text": "A post-processing step that reformats the agent's final response to the user."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Normalizing heterogeneous formats is a deterministic transformation that must happen before the model reasons. A `PostToolUse` hook transforms the tools' results into a uniform format reliably. Asking for it in the prompt depends on model compliance, documenting the format does not unify it, and reformatting the final output does not help the intermediate reasoning."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "7RGF0MBVKKCMDD4S82SJDYECCS",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 177,
   "sourceOrder": 71,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "It is proposed to give the support agent all 20 internal tools 'just in case'. In testing, it invokes tools outside support. What is the best design?",
   "options": [
    {
     "key": "A",
     "text": "Give the agent only the small set of tools its role needs (get_customer, lookup_order, process_refund, escalate_to_human) and add specific tools only for real high-frequency needs."
    },
    {
     "key": "B",
     "text": "Keep the 20 tools but add prompt instructions to use only the support ones."
    },
    {
     "key": "C",
     "text": "Keep the 20 tools plus a classifier that pre-selects which to show per request."
    },
    {
     "key": "D",
     "text": "Merge the related tools into a few broad general-purpose tools."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "A tool set that is too large degrades selection reliability and encourages cross-domain misuse. Least privilege -- only the role's tools -- is the best design. Prompt instructions still depend on compliance, a classifier is over-engineering, and merging into generic tools reintroduces selection ambiguity."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "BTHKGMWG2GPT1BHQX27DH94A4B",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 178,
   "sourceOrder": 72,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "In the agentic loop, by what criterion should the host application conclude that the turn is over and the text is the final response to the customer?",
   "options": [
    {
     "key": "A",
     "text": "By strictly evaluating that `stop_reason` is `end_turn`."
    },
    {
     "key": "B",
     "text": "By looking for phrases like 'done' or 'resolved' in the response text."
    },
    {
     "key": "C",
     "text": "By stopping when it reaches a fixed iteration cap (e.g., 50)."
    },
    {
     "key": "D",
     "text": "By checking whether the assistant's response contains text instead of a tool call."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The agentic loop's control flow relies on the server signal `stop_reason`; `end_turn` indicates the model is finished. Parsing natural-language text is brittle to formatting variations, the iteration cap is only a safety fallback, and the mere presence of text does not reliably distinguish an intermediate turn from the final response."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "D50KWQEBV213AQ5Y28RZZWH5V5",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 179,
   "sourceOrder": 73,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "Each `get_customer` returns more than 40 fields and the agent uses only 5 (name, email, tier, account status, order IDs); in long chats that volume saturates the context and worsens responses. What is the best solution?",
   "options": [
    {
     "key": "A",
     "text": "Trim the tool output to only the relevant fields before it accumulates in the context."
    },
    {
     "key": "B",
     "text": "Increase the context window size by switching models."
    },
    {
     "key": "C",
     "text": "Periodically summarize the whole conversation as the context grows."
    },
    {
     "key": "D",
     "text": "Ask in the prompt for the agent to ignore the irrelevant fields."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Tool results accumulate tokens disproportionate to their relevance. Trimming them to the needed fields before they enter the context attacks the direct cause. A bigger model does not avoid accumulation, summarizing risks losing precise transactional facts, and asking to 'ignore' in the prompt does not stop those tokens from occupying and polluting the context."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "BC91TQ68FADQAW50HVPRTKEKF9",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 180,
   "sourceOrder": 74,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "The customer asks to match a competitor's price. The policy only covers adjustments within its own site and is silent about competitors. What is appropriate to do?",
   "options": [
    {
     "key": "A",
     "text": "Escalate to a human because the policy is ambiguous or silent about this specific request."
    },
    {
     "key": "B",
     "text": "Deny the request because the policy does not explicitly cover it."
    },
    {
     "key": "C",
     "text": "Grant the adjustment, assuming it is equivalent to an own-site adjustment."
    },
    {
     "key": "D",
     "text": "Report high uncertainty and let the customer decide whether to insist."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Policy exceptions and gaps -- not just complex cases -- are valid escalation triggers. When the policy does not cover the request, a human must decide. Denying or granting on its own invents policy, and shifting the decision to the customer does not resolve the gap."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "KH1RBW5VQD9PZB5S4PKYN9KPVT",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 181,
   "sourceOrder": 75,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "In a single message the customer raises three topics: a refund for a damaged item, the status of another order, and a billing complaint. What is the best approach?",
   "options": [
    {
     "key": "A",
     "text": "Decompose the message into the three issues, handle each with its corresponding tool, and synthesize a unified response."
    },
    {
     "key": "B",
     "text": "Handle only the most urgent issue and ask the customer to resend the others separately."
    },
    {
     "key": "C",
     "text": "Escalate to a human because the message contains multiple issues."
    },
    {
     "key": "D",
     "text": "Answer all three issues with a single call to a generic tool."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "A multi-topic request should be split into distinct issues, each resolved with the right tool, and then synthesized into a unified resolution. Handling only one or asking for resends degrades the experience, escalating merely because there are several issues is unnecessary, and no generic tool resolves heterogeneous issues in a single call."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "CCK8NX07Z0VG6Z22MA7K3YAW9M",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 182,
   "sourceOrder": 76,
   "variant": true,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "Sometimes your extractor emits syntactically invalid JSON (missing commas, open quotes) that breaks the downstream parser. What is the most reliable path to ensure schema-conformant output?",
   "options": [
    {
     "key": "A",
     "text": "Define the extraction as a tool with a JSON schema as input and take the data from the `tool_use` block of the response."
    },
    {
     "key": "B",
     "text": "Ask in the prompt for 'return only valid JSON' and add examples of the format."
    },
    {
     "key": "C",
     "text": "A post-processing step that tries to repair malformed JSON with regular expressions."
    },
    {
     "key": "D",
     "text": "Lower the temperature to 0 so the model is more consistent with syntax."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "`tool_use` with a JSON schema is the most reliable mechanism for schema-conformant output because it eliminates JSON syntax errors by construction. Asking for it in the prompt still allows errors, repairing with regex is brittle, and lowering the temperature reduces variation but does not guarantee valid JSON."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "RHNDJZ2RKN5VHZE98SFHB8GA7F",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 183,
   "sourceOrder": 77,
   "variant": true,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "With `tool_use` and a strict schema the JSON is always syntactically valid, but some invoices carry line items that do not add up to the total and values in the wrong field. What best explains it?",
   "options": [
    {
     "key": "A",
     "text": "Strict schemas eliminate syntax errors but not semantic ones; content validation is needed (e.g., comparing the sum of line items to the total)."
    },
    {
     "key": "B",
     "text": "The schema is not strict enough; adding more required fields will fix it."
    },
    {
     "key": "C",
     "text": "The model needs a lower temperature to compute totals correctly."
    },
    {
     "key": "D",
     "text": "The source document must be corrupt; it is best to reject it."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "A schema guarantees shape, not meaning: it does not prevent numbers from not adding up or a value from landing in the wrong field. Semantic content validation is needed. More required fields or lower temperature do not address semantic correctness, and assuming document corruption ignores that the failure is in the extraction."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "V5840ZMAM7TH8SPM33DXYE5TR1",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 184,
   "sourceOrder": 78,
   "variant": true,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "Certain contracts lack a renewal date, but your schema requires it as required, so the model invents plausible dates. What is the best solution?",
   "options": [
    {
     "key": "A",
     "text": "Make the field nullable/optional so the model can leave it empty instead of fabricating a value."
    },
    {
     "key": "B",
     "text": "Add the instruction 'do not invent data not in the document' to the prompt."
    },
    {
     "key": "C",
     "text": "A post-validation step that flags suspicious renewal dates."
    },
    {
     "key": "D",
     "text": "Retry the extraction with the same document until it returns a consistent value."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Marking a field that may not exist as required pushes the model to fabricate values. Making it nullable/optional lets it legitimately leave it empty. The prompt instruction is less reliable, post-validation does not prevent fabrication, and retrying does not create information that is not in the document."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "CVWWEQ75855P38FFAGDAEHNWJ0",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 185,
   "sourceOrder": 80,
   "variant": true,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "Validation fails for a missing supplier tax ID and, on review, that data does not appear in the document. What is the correct action?",
   "options": [
    {
     "key": "A",
     "text": "Recognize that retrying will not help because the information is not in the source, and mark the field as missing for review or external retrieval."
    },
    {
     "key": "B",
     "text": "Retry with error feedback until the model finds it."
    },
    {
     "key": "C",
     "text": "Let the model infer the identifier from the supplier's name."
    },
    {
     "key": "D",
     "text": "Lower the temperature and re-extract the whole document."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Retry fixes format or structure errors, but it is useless when the information simply is not in the document. The correct move is to recognize the absence and flag it, not retry in a loop, nor infer/invent the data, nor reprocess hoping something that does not exist will appear."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "GYBSHERFQ74WWAFCHXHBSQ3GNK",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 186,
   "sourceOrder": 81,
   "variant": true,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "You classify documents into an enum (invoice, receipt, contract), but some arrive that do not fit and others too ambiguous. What is the best schema design?",
   "options": [
    {
     "key": "A",
     "text": "Add an `other` value with a text detail field for extensible categories and an `unclear` value for ambiguous cases."
    },
    {
     "key": "B",
     "text": "Always force the closest category among the three existing ones."
    },
    {
     "key": "C",
     "text": "Expand the enum with every conceivable category in advance."
    },
    {
     "key": "D",
     "text": "Remove the enum and leave the type as free text."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "An enum with `other` + detail allows extensible categorization without fabricating, and `unclear` captures ambiguity explicitly. Forcing the closest category introduces misclassifications, enumerating everything in advance is infeasible, and free text loses the structure the enum provides."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "E2Q8CCVQX79FE5W6SW299GPYEJ",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 187,
   "sourceOrder": 83,
   "variant": true,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "You must extract data from 50,000 archived documents for a quarterly audit; there is no rush (you tolerate a day of latency) and you seek to minimize cost. Which approach is most suitable?",
   "options": [
    {
     "key": "A",
     "text": "Send the extractions to the Message Batches API with a `custom_id` per document and retrieve the results when the batch completes."
    },
    {
     "key": "B",
     "text": "Process the 50,000 documents with the synchronous API in parallel to finish sooner."
    },
    {
     "key": "C",
     "text": "Concatenate many documents per request to reduce the number of calls."
    },
    {
     "key": "D",
     "text": "Wait until you can review each document manually before extracting."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "A large, non-blocking, latency-tolerant workload fits the Message Batches API, which cuts cost by 50% and uses `custom_id` to correlate each document. The synchronous API offers no savings, concatenating documents degrades structure and correlation, and prior manual review does not apply to 50,000 documents."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "WKYA7GWDPJFZZC9CW2B56QS4JT",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 188,
   "sourceOrder": 84,
   "variant": true,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "After a batch finished, 300 of 50,000 documents failed for exceeding the context. What is the most efficient way to complete them?",
   "options": [
    {
     "key": "A",
     "text": "Resubmit only the failed documents (by their `custom_id`) in a new batch, chunking the ones that exceeded the context."
    },
    {
     "key": "B",
     "text": "Reprocess the full batch of 50,000 documents from scratch."
    },
    {
     "key": "C",
     "text": "Discard the 300 failed documents as unprocessable."
    },
    {
     "key": "D",
     "text": "Increase `max_tokens` and resubmit all 50,000 without chunking."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The efficient move is to resubmit only the failed documents, identified by `custom_id`, and chunk the ones that exceeded the context so they fit. Reprocessing everything wastes work and money, discarding loses audit data, and raising `max_tokens` does not fix documents that exceed the context window."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "KM83BMNW78240NFP803A8VFJ1F",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 189,
   "sourceOrder": 85,
   "variant": true,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "You extract references from papers, but the documents are very heterogeneous (inline citations, end bibliography, separate or embedded methodology) and detailed instructions perform inconsistently. Which technique is most effective?",
   "options": [
    {
     "key": "A",
     "text": "Add 2-4 few-shot examples showing correct extraction across varied document formats."
    },
    {
     "key": "B",
     "text": "Write even longer, more exhaustive instructions covering every possible format."
    },
    {
     "key": "C",
     "text": "A separate pipeline for each detected document format."
    },
    {
     "key": "D",
     "text": "Ask the model to first describe the format and then extract."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Few-shot is the most effective technique when detailed instructions produce inconsistent results: they demonstrate handling varied cases and let the model generalize to new formats. Longer instructions remain inconsistent, a per-format pipeline is brittle and costly, and describing the format first does not guarantee correct extraction."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "H0HC6B5KXVCKN74SKJYV0XP77S",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 190,
   "sourceOrder": 86,
   "variant": true,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "You handle several extraction schemas (invoice, receipt, contract) and the incoming document type is unknown in advance; at times the model responds with text instead of extracting. Which configuration fixes it best?",
   "options": [
    {
     "key": "A",
     "text": "Use `tool_choice: \"any\"` to force the model to call one of the extraction tools instead of returning text."
    },
    {
     "key": "B",
     "text": "Use `tool_choice: \"auto\"` and ask in the prompt to always extract."
    },
    {
     "key": "C",
     "text": "Always force the invoice tool as the default."
    },
    {
     "key": "D",
     "text": "Add a 'text response' tool to capture the non-extraction cases."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "`tool_choice: \"any\"` forces the model to call a tool (choosing the right schema) instead of returning text, appropriate when there are several schemas and the type is unknown. `\"auto\"` allows text, always forcing invoice misclassifies the other types, and adding a text tool legitimizes exactly the behavior you want to avoid."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "RF2HR5GGVXJ9C6VJD63X4NXZYJ",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 191,
   "sourceOrder": 88,
   "variant": true,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "Dates arrive in varied formats (DD/MM/YYYY, 'March 3, 2025', 2025-03-03) and you need uniform ISO output; the strict schema fixes the type but not the normalization. What is the best approach?",
   "options": [
    {
     "key": "A",
     "text": "Include format-normalization rules in the prompt alongside the strict schema (e.g., 'convert all dates to ISO 8601 YYYY-MM-DD')."
    },
    {
     "key": "B",
     "text": "Trust the strict schema alone to normalize the dates."
    },
    {
     "key": "C",
     "text": "A post-processing step with regex that tries to reformat any date."
    },
    {
     "key": "D",
     "text": "Reject documents whose dates do not already come in ISO 8601."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The schema guarantees the field type, but format normalization must be specified: normalization rules in the prompt, alongside the strict schema, produce uniform dates. The schema alone does not normalize, later regex is brittle against the variety of formats, and rejecting documents does not process valid data that only needs normalizing."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "ZW4J68FW0NWRE7SFH352DHK38Q",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 192,
   "sourceOrder": 89,
   "variant": true,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "Some documents carry internally inconsistent data (for example, one amount in the summary and another in the breakdown) and you want the system to flag them instead of silently choosing. Which output design enables this?",
   "options": [
    {
     "key": "A",
     "text": "Include a `conflict_detected` boolean (with the conflicting values and their location) to flag inconsistent sources instead of choosing arbitrarily."
    },
    {
     "key": "B",
     "text": "Instruct the model to choose the value that seems most likely."
    },
    {
     "key": "C",
     "text": "Average the conflicting values into a single number."
    },
    {
     "key": "D",
     "text": "Discard documents that contain any inconsistency."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Faced with conflicting source data, the right move is to annotate the conflict with the values and their provenance, not silently choose one. A `conflict_detected` boolean flags those cases for review. Choosing the 'most likely' or averaging hides the problem, and discarding loses documents a human could reconcile."
   },
   "difficulty": "intermediate"
  },
  {
   "id": "F0Q6VXAS9MW189BPW1VGM5DV3V",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 193,
   "sourceOrder": 91,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "A fintech runs the flow get_customer -> lookup_order -> process_refund. A SOC2 audit reveals that in 3% of refunds process_refund was called without a verified customer ID, because when the customer volunteered the order number the model skipped get_customer; reinforcing the system prompt twice was not enough. Which change ensures no refund runs without prior identity verification?",
   "options": [
    {
     "key": "A",
     "text": "A programmatic gate in the middleware layer that rejects any process_refund call whose session state does not contain a customer ID already verified by get_customer."
    },
    {
     "key": "B",
     "text": "Add a required verified_customer_id parameter to the process_refund JSON schema so the model cannot invoke it without that field."
    },
    {
     "key": "C",
     "text": "A very detailed few-shot example for each possible flow showing get_customer always running before process_refund."
    },
    {
     "key": "D",
     "text": "Uppercase instructions at the start and end of the system prompt requiring identity verification before any refund."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Verifying identity before moving money is a critical business rule that demands deterministic enforcement and must be imposed in the middleware layer as a prerequisite that blocks process_refund until a verified customer ID exists in the session state. A required schema field only forces the argument to be present in that call, but the model can fill it with an unverified value; few-shot and prompt emphasis already failed because they depend on probabilistic compliance."
   },
   "difficulty": "advanced"
  },
  {
   "id": "69RCVD9AV7Z009E0PFT6RAJT8R",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 194,
   "sourceOrder": 92,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "You already rewrote get_customer and lookup_order descriptions in detail, and the agent still invokes get_customer when the customer says 'my account' despite asking about an order. You find in the system prompt the line 'when the user talks about their account, first retrieve the customer data'. What is the root cause and the best fix?",
   "options": [
    {
     "key": "A",
     "text": "The descriptions are still ambiguous; you should add more example queries to get_customer and lookup_order."
    },
    {
     "key": "B",
     "text": "The model needs a keyword router that maps 'order' to lookup_order and 'account' to get_customer before invoking the tool."
    },
    {
     "key": "C",
     "text": "A keyword-sensitive instruction ('account') in the system prompt is overriding the descriptions; it should be reworded or removed so it stops forcing the selection."
    },
    {
     "key": "D",
     "text": "Consolidate both tools into a single get_account_data that decides internally what to return."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "The system prompt wording can create keyword associations that override well-written tool descriptions: here 'when the user talks about their account, first retrieve the customer data' pushes toward get_customer at the word 'account' even when the intent is to look up an order. The fix is to reword or remove that keyword-sensitive instruction. Adding more examples does not beat the conflicting instruction, a router is over-engineering, and consolidating tools removes a useful distinction instead of fixing the cause."
   },
   "difficulty": "advanced"
  },
  {
   "id": "PT8WK6ZQB1HS8DN140ATM2N55M",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 195,
   "sourceOrder": 93,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "The agent resolves 55% (target 80%). By category, it over-escalates standard photo-backed returns and tries to resolve policy exceptions on its own. An engineer suggests adding 15 few-shot examples of already-resolved complex cases so it 'resolves more'. What is the most effective approach?",
   "options": [
    {
     "key": "A",
     "text": "Define explicit escalation criteria and provide balanced few-shot examples showing both when to resolve (standard returns) and when to escalate (policy exceptions)."
    },
    {
     "key": "B",
     "text": "Add the 15 resolved complex-case examples so the agent gains confidence and resolves more cases on its own."
    },
    {
     "key": "C",
     "text": "Have the agent score its confidence (1-10) and escalate below 7, calibrating the threshold with historical data."
    },
    {
     "key": "D",
     "text": "Add sentiment analysis to avoid escalating when the customer is calm, reserving escalation for upset customers."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The failure is a decision boundary miscalibrated in both directions, not a lack of capability: it over-escalates the easy and under-escalates what it should hand off. It is fixed with explicit escalation criteria and balanced few-shot examples showing both sides of the boundary. Adding only resolved complex-case examples biases the agent toward attempting policy exceptions; self-reported confidence is poorly calibrated; and sentiment does not correlate with case complexity."
   },
   "difficulty": "advanced"
  },
  {
   "id": "9YE12Y79WEVC4V0ASZ5HYF3Q07",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 196,
   "sourceOrder": 94,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "Policy allows automatic refunds up to $500; above that it needs human approval and an auditable record. The rule is in the system prompt and in 2% of cases larger amounts were approved; compliance also wants an immutable log of every block. Which design reliably meets both requirements?",
   "options": [
    {
     "key": "A",
     "text": "Reinforce the system prompt with the limit rule and ask the agent to record in the chat whenever it blocks a high refund."
    },
    {
     "key": "B",
     "text": "A PreToolUse hook on process_refund that deterministically blocks amounts above $500, redirects them to human escalation, and writes the event to the audit log."
    },
    {
     "key": "C",
     "text": "Add a max_amount field to the process_refund schema and trust the model to respect it."
    },
    {
     "key": "D",
     "text": "A later step that reviews issued refunds each night and reverses those that exceeded the limit, logging the reversal."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "The refund limit is a critical compliance rule and must be enforced in the middleware layer, not in the prompt. A PreToolUse hook blocks deterministically before touching the backend, redirects to human escalation, and can write the immutable audit log compliance requires. Prompt emphasis and the schema field depend on model compliance, and nightly reversal lets the improper refund happen and only corrects it late."
   },
   "difficulty": "advanced"
  },
  {
   "id": "S8BXTKDPC4GM2VV3MYNGBKMDZB",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 197,
   "sourceOrder": 95,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "An incident reveals that, during a 4-minute payment-gateway outage, the agent retried process_refund dozens of times and, once recovered, issued duplicate refunds; the tool always returns 'error' without distinguishing the type. Which change best prevents this incident?",
   "options": [
    {
     "key": "A",
     "text": "Return structured errors with errorCategory (transient/validation/permission/business) and isRetryable, and apply bounded local recovery only to transient ones, treating already-initiated refunds as non-retryable by default."
    },
    {
     "key": "B",
     "text": "Increase the maximum number of retries and add random jitter to space out the calls during gateway outages."
    },
    {
     "key": "C",
     "text": "Catch the error and return an empty result marked as success so the agent does not retry."
    },
    {
     "key": "D",
     "text": "Escalate to a human every time process_refund fails, regardless of the cause."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The incident stems from indistinguishable errors: the agent did not know the failure was transient or that the operation might have started, so it retried blindly and duplicated refunds. Structured errors with category and isRetryable allow retrying only the transient ones and treating refunds as non-retryable unless confirmed. More retries worsen the problem, marking empty as success hides real failures, and escalating on any failure wastes recovery of benign transient errors."
   },
   "difficulty": "advanced"
  },
  {
   "id": "2QJTT768QGSC350HAQHNKDEJ23",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 198,
   "sourceOrder": 96,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "In a 30-turn chat about three orders, the agent mid-conversation confuses the agreed refund ($85) with another order's total ($120); the history is progressively summarized and the key data ended up in the middle. What is the most reliable way to prevent it?",
   "options": [
    {
     "key": "A",
     "text": "Switch to a model with a larger context window so you do not have to summarize the history."
    },
    {
     "key": "B",
     "text": "Increase the length of each progressive summary so it retains more detail from the intermediate turns."
    },
    {
     "key": "C",
     "text": "Keep a persistent 'case facts' block (amounts, order IDs, statuses per order) injected into every prompt, outside the summarized history and placed at the start or end."
    },
    {
     "key": "D",
     "text": "Ask the agent to re-read the entire conversation history before responding to recover the correct data."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "The transactional values are lost by two combined effects: progressive summarization condenses them and 'lost in the middle' makes the model ignore what landed in the center of the history. A 'case facts' block with the exact per-order data, injected into every prompt and placed at the start or end, preserves them reliably. A bigger model does not avoid condensation, longer summaries still bury data in the middle, and re-reading the history is costly and unreliable."
   },
   "difficulty": "advanced"
  },
  {
   "id": "3YVAEEPVJ1S9Y9J0720GK171TA",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 199,
   "sourceOrder": 97,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "On escalation, the human operator takes about 6 minutes to pick up the case because they receive the full transcript and must reconstruct what was attempted; compliance requires recording each escalation's reason. What improves the handoff most effectively?",
   "options": [
    {
     "key": "A",
     "text": "Generate a structured escalation package with customer_id, issue_summary, order_id, root_cause, actions_taken[], refund_amount, recommended_action, and escalation_reason."
    },
    {
     "key": "B",
     "text": "Attach the full transcript with timestamps and highlight the customer's messages."
    },
    {
     "key": "C",
     "text": "A free-prose summary generated by the model at escalation time, prepended to the chat."
    },
    {
     "key": "D",
     "text": "A link to the CRM with the customer's history for the operator to consult during the call."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "The operator should not reconstruct the case from the chat; they need a structured, actionable summary. An escalation package with the key facts, what was already attempted, the recommended action, and the escalation reason lets them pick up immediately and satisfies the record compliance requires. The full transcript and the CRM link shift the work to the human, and a free-prose summary is less reliable and may omit the required escalation_reason."
   },
   "difficulty": "advanced"
  },
  {
   "id": "573B3XH2YNARBMNK1GMQ80BJVQ",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 200,
   "sourceOrder": 98,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "get_customer returns two same-name customers: one with an email whose domain matches the sender's company, and another with more recent activity. The customer requests a $300 refund. What should the agent do?",
   "options": [
    {
     "key": "A",
     "text": "Pick the customer whose email domain matches the sender's company, as the strongest signal."
    },
    {
     "key": "B",
     "text": "Pick the customer with the most recent account activity, since they are more likely to be the writer."
    },
    {
     "key": "C",
     "text": "Process the refund on both accounts and tell the customer to confirm which was the correct one."
    },
    {
     "key": "D",
     "text": "Ask the customer for an additional identifier (order number, last digits of the payment method, or postal code) to disambiguate before touching any account."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "With multiple matches and a financial operation involved, any heuristic -- email domain or recency -- can select the wrong account and execute an improper refund. The correct move is to ask for an additional identifier that verifies identity before acting. Choosing by domain or recency is guessing, and processing on both accounts violates privacy and may duplicate the refund."
   },
   "difficulty": "advanced"
  },
  {
   "id": "6D8HGPYPY1VMS7AG70624WPAXJ",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 201,
   "sourceOrder": 99,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "Each get_customer returns 45 fields (marketing, sessions, flags) of which the agent uses 5; in long conversations that pushes the context above 70% and responses degrade and cite the wrong orders. What is the best solution?",
   "options": [
    {
     "key": "A",
     "text": "Trim (via a PostToolUse hook or a wrapper) the get_customer output to the 5 relevant fields before it accumulates in the context."
    },
    {
     "key": "B",
     "text": "Switch to a model with a larger context window to absorb the 45 fields without degradation."
    },
    {
     "key": "C",
     "text": "Automatically summarize the whole conversation whenever the context exceeds 80%."
    },
    {
     "key": "D",
     "text": "Instruct the agent in the prompt to ignore the 40 fields it does not need."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Tool results accumulate tokens disproportionate to their relevance, and here 40 useless fields per call saturate the context and cause context rot. Trimming the output to the needed fields before it accumulates attacks the direct cause. A bigger model only delays the problem, summarizing at 80% is already too late (the model is degraded and may hallucinate its own summary), and asking to 'ignore' in the prompt does not stop those tokens from occupying the context."
   },
   "difficulty": "advanced"
  },
  {
   "id": "57W0ZPJ4XQYS3E6R30MJAE2W6P",
   "topicId": "01KT81BA4JCST5PP0RTAGENT01",
   "order": 202,
   "sourceOrder": 100,
   "variant": true,
   "scenario": {
    "title": "Customer Support Resolution Agent",
    "body": "You are building a customer support resolution agent with the Claude Agent SDK. The agent uses MCP tools (get_customer, lookup_order, process_refund, escalate_to_human) to resolve customer inquiries, aiming to resolve 80%+ on first contact while knowing when to escalate to a human."
   },
   "prompt": "Your agentic loop closes the turn upon detecting phrases like 'I've processed your refund' in the text; in production the agent sometimes says it while still planning (and the loop cuts before executing process_refund) or repeats it (and duplicates the action). How should the loop decide the turn is over?",
   "options": [
    {
     "key": "A",
     "text": "Expand the list of completion phrases and require them to appear at the end of the message to reduce false positives."
    },
    {
     "key": "B",
     "text": "Stop the loop when it reaches an iteration cap that guarantees the action has already executed."
    },
    {
     "key": "C",
     "text": "Strictly evaluate stop_reason == 'end_turn' as the only completion signal, executing tools only when stop_reason == 'tool_use'."
    },
    {
     "key": "D",
     "text": "Check whether the response contains assistant text instead of a tool call and, if so, end."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "Parsing natural language to decide termination is a leaky abstraction: brittle to wording variations and to the model mentioning an action before executing it. Control flow must rely on the server signal stop_reason: end_turn indicates the turn is over and tool_use indicates tools must be executed. Expanding the phrase list does not remove the fragility, the iteration cap is only a safety fallback, and the mere presence of text does not distinguish an intermediate turn from the final one."
   },
   "difficulty": "advanced"
  },
  {
   "id": "E6KWVYAXH8HQDAFGDNPXD2VJWM",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 203,
   "sourceOrder": 101,
   "variant": true,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "Your invoice extractor asks in the prompt to 'return a JSON object with these fields' and, at temperature 0, 4% of responses carry prose before the JSON or trailing commas that break the parser in production. You need to guarantee always-parseable output conformant to your fields. What is the most reliable approach?",
   "options": [
    {
     "key": "A",
     "text": "Add a post-processor that extracts the first {...} block from the response and strips trailing commas with regex."
    },
    {
     "key": "B",
     "text": "Define an extraction tool whose input is a JSON schema and take the data from the response's tool_use block, eliminating syntax errors by construction."
    },
    {
     "key": "C",
     "text": "Reinforce the prompt with 'RESPOND ONLY WITH JSON, NO ADDITIONAL TEXT' and several examples of the exact format."
    },
    {
     "key": "D",
     "text": "Lower randomness further (top_p) and validate the JSON, retrying when parsing fails."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "tool_use with a JSON schema is the most reliable mechanism for schema-conformant output because the JSON is generated against the schema and syntax errors are eliminated by construction, taking the data from the tool_use block. Regex post-processing is brittle to variations, reinforcing the prompt still allows prose and trailing commas, and adjusting top_p with retries reduces frequency but does not guarantee valid JSON."
   },
   "difficulty": "advanced"
  },
  {
   "id": "BCEMSE2VYC0SRTMA1RQFB5TQ4D",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 204,
   "sourceOrder": 102,
   "variant": true,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "After migrating to tool_use with a strict schema, the JSON is always syntactically valid, but accounting detects that in 6% of invoices the line_items do not add up to the total and sometimes the tax is in the subtotal field. What is the correct diagnosis and fix?",
   "options": [
    {
     "key": "A",
     "text": "The schema guarantees shape but not semantics; you should extract stated_total and calculated_total, compare them, and on a discrepancy retry with the specific error or flag for review."
    },
    {
     "key": "B",
     "text": "The schema is not strict enough; making subtotal, tax, and total required fields will force the model to reconcile them."
    },
    {
     "key": "C",
     "text": "It is a model calculation problem; lowering the temperature and adding 'add carefully' to the prompt fixes it."
    },
    {
     "key": "D",
     "text": "The source documents are poorly scanned; it is best to reject them and request better copies."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "A strict schema eliminates syntax errors but not semantic ones: it does not prevent amounts from not adding up or a value from landing in the wrong field. The solution is content validation -- extract stated_total and calculated_total, compare them, and retry with the specific error or route to review. More required fields do not force arithmetic consistency, temperature does not address semantic correctness, and blaming the scan ignores that the failure is in the extraction."
   },
   "difficulty": "advanced"
  },
  {
   "id": "7Z0GRTQGD55J3CZ62XXP3CC3BK",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 205,
   "sourceOrder": 103,
   "variant": true,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "You extract contract clauses with governing_law marked as required; when the contract sets no jurisdiction, the model fills in a plausible one ('State of Delaware') instead of leaving it empty, injecting false data. Adding 'do not invent absent data' was not enough. What is the best solution?",
   "options": [
    {
     "key": "A",
     "text": "Make governing_law nullable/optional in the schema so the model can legitimately omit it when the document does not contain it."
    },
    {
     "key": "B",
     "text": "Reinforce the 'do not invent absent data' instruction with few-shot examples of fields left blank."
    },
    {
     "key": "C",
     "text": "A later validator that checks whether the jurisdiction appears verbatim in the text and, if not, clears the value."
    },
    {
     "key": "D",
     "text": "Retry the contract extraction until the model returns the same value twice in a row."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "Marking a field that may not exist as required pushes the model to fabricate a value to satisfy the schema. Making it nullable/optional lets it legitimately omit it when the document does not contain it, which is the root cause. The prompt instruction already failed and remains probabilistic, the later validator is a patch that does not prevent the initial fabrication, and retrying does not create information that is not in the contract."
   },
   "difficulty": "advanced"
  },
  {
   "id": "QJRG2NPZZTZB18NHF4RPM0TEQQ",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 206,
   "sourceOrder": 104,
   "variant": true,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "In a batch of 2,000 invoices, 180 fail validation: some due to locally formatted dates that do not match the pattern, others because the document does not include the order number the schema expects. An engineer proposes retrying all 180 with feedback. What is the correct approach?",
   "options": [
    {
     "key": "A",
     "text": "Retry all 180 with error feedback, since appending the specific error lets the model correct any validation failure."
    },
    {
     "key": "B",
     "text": "Flag all 180 for human review without retrying, because retries rarely help in extraction."
    },
    {
     "key": "C",
     "text": "Distinguish the failure types: retry with feedback the ones failing on date format, and flag as missing (without retrying) the ones lacking the order number in the document."
    },
    {
     "key": "D",
     "text": "Reprocess the whole batch with a stricter prompt about dates and order numbers."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "Retry with feedback corrects format or structure errors -- like locally formatted dates that only need normalizing -- but is useless when the information simply is not in the document, like an absent order number. The correct move is to branch: retry the format ones with the specific error and flag as missing the ones that do not contain the data. Retrying all 180 wastes calls on the unrecoverable ones, flagging them all discards cheap corrections, and reprocessing the whole batch is costly and unnecessary."
   },
   "difficulty": "advanced"
  },
  {
   "id": "A7RKQW0EX356M87R2K81C9GZH9",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 207,
   "sourceOrder": 105,
   "variant": true,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "You classify documents into a 6-type enum; 9% fall into 'None of the above' due to unanticipated new types (credit notes, purchase orders) and 3% are illegible or ambiguous, and forcing the closest type already caused downstream errors. What is the best schema design?",
   "options": [
    {
     "key": "A",
     "text": "Add an 'other' value with a text detail field for unanticipated types and an 'unclear' value for ambiguous or illegible documents."
    },
    {
     "key": "B",
     "text": "Expand the enum now with credit notes and purchase orders, and repeat the expansion whenever a new type appears."
    },
    {
     "key": "C",
     "text": "Always force the closest enum type and record confidence to review the low-confidence ones later."
    },
    {
     "key": "D",
     "text": "Remove the enum and leave document_type as free text so the model writes whatever fits."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "An enum with 'other' + detail absorbs unanticipated types without fabricating an incorrect category, and 'unclear' explicitly captures the illegible or ambiguous, avoiding the downstream errors of forcing the closest type. Manually expanding the enum for each new type is endless maintenance, forcing the closest reintroduces misclassifications, and free text loses the structure and consistency the enum provides."
   },
   "difficulty": "advanced"
  },
  {
   "id": "1H0XWZYPHEVQNYJNTZ1WB5BPCP",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 208,
   "sourceOrder": 106,
   "variant": true,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "You have two workloads: (1) validating the invoice at checkout in real time, with the customer waiting within seconds, and (2) a nightly reprocessing of 200,000 historical invoices. A manager wants to move both to the Message Batches API for the 50% savings. How do you evaluate it?",
   "options": [
    {
     "key": "A",
     "text": "Move both to batch and poll for status, accepting the latency in exchange for the 50% savings."
    },
    {
     "key": "B",
     "text": "Keep both on the synchronous API to avoid result correlation and ordering problems."
    },
    {
     "key": "C",
     "text": "Only the nightly reprocessing goes to batch (it tolerates latency); the checkout validation stays on the synchronous API because it is blocking and latency-sensitive."
    },
    {
     "key": "D",
     "text": "Move both to batch with a fallback to the synchronous API if the batch takes longer than expected."
    }
   ],
   "answer": {
    "correctOptionKey": "C",
    "justification": "The Message Batches API saves 50% but can take up to 24 hours with no latency SLA, so it only fits non-blocking, latency-tolerant workloads like the nightly reprocessing. The checkout validation is blocking -- the customer waits -- and must stay on the synchronous API. Moving both to batch breaks the real-time requirement, keeping everything synchronous gives up the savings where they do apply, and the fallback adds complexity without solving that batch does not guarantee latency."
   },
   "difficulty": "advanced"
  },
  {
   "id": "BWEMEDZB5ZMJPBWJS6B2BWZ48G",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 209,
   "sourceOrder": 107,
   "variant": true,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "You extract data from highly disparate clinical reports (the dose appears in tables, in prose, or in footnotes); increasingly long instructions perform inconsistently across formats. What is the most effective technique?",
   "options": [
    {
     "key": "A",
     "text": "Write an even more exhaustive specification describing every possible location of the dose across all known formats."
    },
    {
     "key": "B",
     "text": "Add 2-4 few-shot examples showing correct dose extraction across varied formats (table, prose, footnote), teaching the criterion to generalize."
    },
    {
     "key": "C",
     "text": "Fine-tune the model on thousands of labeled clinical reports so it learns all the formats."
    },
    {
     "key": "D",
     "text": "Build a separate pipeline for each report format detected by rules."
    }
   ],
   "answer": {
    "correctOptionKey": "B",
    "justification": "When detailed instructions give inconsistent results across varied formats, few-shot is the most effective technique: 2-4 examples showing correct extraction in different locations teach the underlying criterion and let the model generalize to new formats. A longer specification remains inconsistent, fine-tuning is costly and rigid (and outside the practical exam scope), and a per-format pipeline is brittle and does not scale to unforeseen variants."
   },
   "difficulty": "advanced"
  },
  {
   "id": "KBJ1KGNJBE450AJ07JVZTY2J6B",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 210,
   "sourceOrder": 108,
   "variant": true,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "Your pipeline must run extract_metadata (type, date, issuer) before an enrichment step that depends on those metadata, but sometimes the model jumps to enrichment or responds with text. Which configuration guarantees extract_metadata runs first?",
   "options": [
    {
     "key": "A",
     "text": "Use tool_choice 'auto' and describe in the prompt that extract_metadata must come first."
    },
    {
     "key": "B",
     "text": "Use tool_choice 'any' so the model calls some tool at each step and trust it to pick the right order."
    },
    {
     "key": "C",
     "text": "Merge extract_metadata and enrichment into a single tool so the order is irrelevant."
    },
    {
     "key": "D",
     "text": "Force tool_choice to the specific tool ({'type':'tool','name':'extract_metadata'}) on the first call to guarantee it runs before enrichment."
    }
   ],
   "answer": {
    "correctOptionKey": "D",
    "justification": "When one step must run before another, forcing tool_choice to that specific tool on the first call deterministically guarantees extract_metadata runs first. 'auto' lets the model skip the step or return text, 'any' forces calling some tool but does not fix which one, and merging both tools blends responsibilities and loses the separation that makes enrichment dependent on already-validated metadata."
   },
   "difficulty": "advanced"
  },
  {
   "id": "9BY0F0X72R98D965X38VQCMMWC",
   "topicId": "01KT81BA4JXTRCTDATA5CHMA01",
   "order": 211,
   "sourceOrder": 109,
   "variant": true,
   "scenario": {
    "title": "Structured Data Extraction",
    "body": "You are building a structured data extraction system that processes unstructured documents (invoices, contracts, reports) and produces output validated against JSON schemas. You must handle varied formats, missing fields, and edge cases while maintaining reliability."
   },
   "prompt": "Your extractor reports 97% global accuracy over invoices, receipts, and contracts; a quick sample suggests contracts (8% of volume) perform far below average. Before reducing human review, what is the most prudent step?",
   "options": [
    {
     "key": "A",
     "text": "Measure accuracy by document type and by field via stratified random sampling, since the global average can mask one type (contracts) with poor performance."
    },
    {
     "key": "B",
     "text": "Automate everything above 90% model-self-reported confidence and review the rest."
    },
    {
     "key": "C",
     "text": "Reduce human review uniformly across the three types, given the 97% global figure."
    },
    {
     "key": "D",
     "text": "Trust the 97% global because it already exceeds the business threshold, and monitor complaints to detect problems."
    }
   ],
   "answer": {
    "correctOptionKey": "A",
    "justification": "An aggregate metric can mask poor performance in a subgroup -- here contracts -- so automating based on the global figure risks accepting erroneous extractions of that type. Stratified sampling by document type and field reveals where automating is safe and where it is not. Self-reported confidence is poorly calibrated, reducing review uniformly ignores the weak spot, and waiting for complaints detects the problem too late."
   },
   "difficulty": "advanced"
  }
 ]
};
