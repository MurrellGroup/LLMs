# Sources and interpretation

Sources checked 14 November 2026. These are selected historical results, not a current model ranking.

## Rumelhart, Hinton & Williams, 1986

[Learning representations by back-propagating errors](https://www.nature.com/articles/323533a0)

Backpropagation computes derivatives through a network. The loss landscape in the talk is a teaching example.

Slides: 2, 3, 4.

## Vaswani et al., 2017

[Attention Is All You Need](https://arxiv.org/html/1706.03762v7)

Masked self-attention, learned query/key/value projections, residual updates, and positionwise transformations. The talk explains only the causal language-model stack.

Slides: 6, 10, 11, 12.

## Hugging Face, Transformers documentation

[How caching works](https://huggingface.co/docs/transformers/cache_explanation)

Per-layer key/value caching during autoregressive inference. Accessed 14 November 2026.

Slides: 12, 13.

## Brown et al., GPT-3, 2020

[Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)

GPT-3 demonstrated multiple tasks from examples in context, without task-specific gradient updates. The toy prompts in this talk are constructed illustrations.

Slides: 5, 7, 14.

## The Llama 3 Herd of Models, 2024

[The Llama 3 Herd of Models](https://arxiv.org/html/2407.21783v3)

The flagship Llama 3.1 model was pretrained on 15.6 trillion text tokens. Training tokens are not a count of unique words.

Slides: 7.

## Deutscher Bundestag, historical archive

[27. April 1972: Das Misstrauensvotum gegen Willy Brandt](https://www.bundestag.de/dokumente/textarchiv/1972-04-27-misstrauensvotum-brandt-890810)

The official account gives 496 voting members, 260 votes cast, 247 in favor, and 249 required. The teaching prompt is paraphrased.

Slides: 8.

## MIT OpenCourseWare, Algebra II, Lecture 26

[Finite Fields](https://ocw.mit.edu/courses/res-18-012-algebra-ii-student-notes-spring-2022/mit18_702s22_lec26.pdf)

A finite field has prime-power order and characteristic equal to that prime. The 256-element example is a direct mathematical deduction.

Slides: 9.

## Ouyang et al. / OpenAI, 2022

[Aligning language models to follow instructions](https://openai.com/index/instruction-following/)

InstructGPT used demonstrations and human preference feedback. The small-model preference result is for that combined pipeline and the evaluated prompts.

Slides: 15, 16.

## OpenAI, September 2024

[Learning to reason with LLMs](https://openai.com/index/learning-to-reason-with-llms/)

Historical report of gains from reasoning RL and additional inference computation. The talk does not use a 64-sample consensus result as single-attempt accuracy.

Slides: 17.

## DeepSeek-AI, January 2025

[DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning](https://arxiv.org/html/2501.12948v1)

R1-Zero AIME 2024 estimated pass@1 rose from 15.6% to 71.0% during RL. Figure 2 averages 16 responses per question; this is not best-of-16 success.

Slides: 18, 20, 24.

## MAA, AIME I 2024, Problem 1 (paraphrased)

[2024 AIME I problems, authorized reproduction](https://live.poshenloh.com/past-contests/aime/2024I)

MAA-authored problem reproduced with permission. The walk-and-café question is the opening item, chosen for accessibility. Its answer is 204 minutes.

Slides: 19.

## Chen et al., 2021

[Evaluating Large Language Models Trained on Code](https://arxiv.org/abs/2107.03374)

Primary reference for evaluating generated functions with tests. The missing-positive-integer exercise is an original teaching example, not a quoted HumanEval item or measured model run.

Slides: 21.

## IMO 2025, Problem 4 (paraphrased)

[IMO 2025 problems](https://www.imo-official.org/problems/2025/)

Paraphrased divisor-sequence problem. The displayed 18 and 12 examples are direct arithmetic illustrations.

Slides: 22.

## Google DeepMind / IMO coordinators, July 2025

[Advanced Gemini Deep Think reaches gold-medal standard at IMO 2025](https://deepmind.google/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/)

35/42, five of six problems, officially graded. An advanced evaluation system with additional RL, mathematical data, and parallel reasoning; not an isolated RL ablation.

Slides: 23.

## IMO, official 2025 results

[66th International Mathematical Olympiad results](https://www.imo-official.org/editions/2025/)

Gold-medal-level is not better than every contestant. Five human contestants scored 42/42.

Slides: 23.

## Google DeepMind, May 2025

[AlphaEvolve: a Gemini-powered coding agent for designing advanced algorithms](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/)

An LLM-driven evolutionary search system with automatic evaluation improved a known construction for complex 4×4 matrix multiplication from 49 to 48 scalar multiplications.

Slides: 24.

## OpenAI, February 2026

[Why SWE-bench Verified no longer measures frontier coding capabilities](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/)

Evidence that executable tests and benchmark exposure can undermine evaluation. The talk makes no current SWE-bench leaderboard claim.

Slides: 21.

## Interpretation

The main conclusion is a mechanistic inference: useful, repeatable feedback can support rapid iteration, selection, and learning. It is not a universal claim that all superhuman performance occurs only in mathematics or coding. Whether similar progress will occur where verification requires expensive experiments or long-term outcomes remains uncertain.

The attention values, token splits, toy loss surface, translation prompt, lunar-phase response, arithmetic trace, and coding exercise are constructed teaching material. The political example is grounded in the official historical record; the finite-field answer is a mathematical deduction. AIME and IMO questions are paraphrased and attributed.
