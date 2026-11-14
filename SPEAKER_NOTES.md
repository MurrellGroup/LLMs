# Large language models — speaker notes

A 30-minute talk for scientists from varied disciplines. These notes include transitions and animation cues. Timings exclude questions.

The examples are scripted illustrations. Dated empirical results are attributed separately; none of the illustrative prompts is presented as a recorded model run. Capability milestones are selected historical examples from 2020–2025, with a 2026 evaluation caveat. Sources checked 14 November 2026.

## Running the talk

Open index.html. Space or Right Arrow advances a reveal before moving to the next slide. N shows notes; P opens a synchronized presenter window; O opens the slide index; F toggles fullscreen. T starts or pauses the elapsed timer. Shift+T resets it. R replays the current slide. Use ? for all controls.

## Timing

| Slide | Topic | Start | End |
| --- | --- | --- | --- |
| 1 | Large language models | 00:00 | 00:45 |
| 2 | A function with many adjustable numbers | 00:45 | 01:45 |
| 3 | Learning starts with a measurable error | 01:45 | 03:00 |
| 4 | Learning follows the local slope | 03:00 | 04:15 |
| 5 | One token at a time | 04:15 | 05:30 |
| 6 | One passage supplies many training examples | 05:30 | 06:15 |
| 7 | “All the text that has ever existed”? | 06:15 | 07:00 |
| 8 | A continuation can require political knowledge | 07:00 | 08:00 |
| 9 | A few words can change the mathematics | 08:00 | 09:00 |
| 10 | Inside the box: repeated layers | 09:00 | 10:00 |
| 11 | Attention matches keys and combines values | 10:00 | 11:30 |
| 12 | Two directions of information flow | 11:30 | 13:15 |
| 13 | The next token reuses earlier work | 13:15 | 14:00 |
| 14 | Pretraining learns to continue text | 14:00 | 15:15 |
| 15 | Instruction tuning: learn from demonstrations | 15:15 | 16:30 |
| 16 | Human preferences provide another training signal | 16:30 | 17:30 |
| 17 | Intermediate tokens provide a working space | 17:30 | 18:45 |
| 18 | Reinforcement learning with a checker | 18:45 | 20:15 |
| 19 | What does a mathematics benchmark ask? | 20:15 | 21:30 |
| 20 | Progress during reinforcement learning | 21:30 | 22:45 |
| 21 | Code can be checked by running it | 22:45 | 23:45 |
| 22 | What does an olympiad proof require? | 23:45 | 25:15 |
| 23 | 2025: gold-medal-level mathematical proofs | 25:15 | 26:15 |
| 24 | Reliable feedback supports repeated improvement | 26:15 | 28:00 |
| 25 | What if the answer requires an experiment? | 28:00 | 29:15 |
| 26 | What we know, and what remains open | 29:15 | 30:00 |

## 1. Large language models

00:00–00:45 (00:45)

We will build a mechanistic picture of a language model: what is being optimized, how text becomes a prediction, and how additional training changes what the model can do. Then we will ask where the evidence is strongest and where the future remains uncertain.

The central question is how such a simple objective can support such varied behavior. A short output does not imply a simple computation. We will use political and mathematical examples, but neither requires prior knowledge of those subjects.

Presenter cue: The planned timings total 30 minutes, excluding questions. Advance at your own pace; no animation runs on a timer. P opens a separate presenter window.

## 2. A function with many adjustable numbers

00:45–01:45 (01:00)

For now, treat the neural network as a function in a black box. Give it an input and it produces a prediction. The box contains a very large collection of adjustable numbers, called parameters or weights. Changing these numbers changes the function.

The network is not a collection of separately programmed facts or rules. Its computation is built from many simple numerical operations. Training chooses parameters that make those operations useful together.

Presenter cue: Advance to reveal the parameters, then the output distribution. Emphasize that the bars are probabilities over possible continuations, not a single stored answer. These probabilities are illustrative.

We can understand learning before examining what is inside the box.

Animation steps:

1. Text enters a neural network.
2. The model contains many numerical parameters, represented by theta.
3. The same model maps the context to a probability distribution over possible next tokens. These numbers are illustrative.

Sources: [Rumelhart, Hinton & Williams, 1986](https://www.nature.com/articles/323533a0).

## 3. Learning starts with a measurable error

01:45–03:00 (01:15)

A loss function turns a prediction error into a number. For next-token training, the observed text supplies the target. Here the text actually continues with “blue”. The network initially assigns that token probability 0.1.

The usual loss is minus the logarithm of the probability given to the observed token. With natural logarithms, a probability of 0.1 gives a loss of about 2.30. If an update raises the probability to 0.5, the loss falls to about 0.69. There is no need to remember the logarithm; the key is that confidently missing the target is expensive.

Training averages this signal over many positions and many examples. Individual continuations can be ambiguous. The statistical goal is a useful probability distribution, not certainty about every sentence.

Presenter cue: Reveal the improved prediction, then the equation. Next: how do we know which numbers in the box to change?

Sources: [Rumelhart, Hinton & Williams, 1986](https://www.nature.com/articles/323533a0).

## 4. Learning follows the local slope

03:00–04:15 (01:15)

Imagine plotting the loss against one adjustable number. The slope tells us which small change would reduce the loss locally. A gradient is the corresponding collection of slopes for all parameters.

Backpropagation efficiently computes those derivatives through the network. It does not try perturbing every parameter one by one. An optimizer uses the gradient to update the parameters; the learning rate controls the size of the step.

Presenter cue: Advance through the tangent, downhill direction, and successive updates. The same cycle repeats on many batches of training examples.

The basic update is θ ← θ − η∇L. Modern optimizers modify this rule using information from previous gradients. Real loss surfaces have enormous dimension and are not smooth convex bowls like this teaching diagram. A step need not improve every example, and there is no guarantee of a global optimum.

Animation steps:

1. The current parameter has high loss and a negative local slope.
2. Move the parameter opposite the gradient. The loss decreases.
3. Calculate the new gradient and move again.
4. The gradient becomes smaller near the minimum.
5. Further updates approach the minimum. Real models optimize many parameters together.

Sources: [Rumelhart, Hinton & Williams, 1986](https://www.nature.com/articles/323533a0).

## 5. One token at a time

04:15–05:30 (01:15)

The model takes a sequence of tokens and returns a distribution over the next token. We choose one continuation, append it to the sequence, and repeat. “Autoregressive” means that the model conditions later predictions on earlier values, including its own previous outputs.

Presenter cue: Show the distribution, select “blue”, then append it and predict again. The toy probabilities and token boundaries are for teaching, not measured model outputs.

A token is an encoded piece of text; it is not always a word. Different tokenizers split the same text differently. For readability, most examples in this talk show meaningful words or expressions.

Sampling can yield different answers from the same prompt. Ordinary generation keeps the model parameters fixed. What changes during an answer is the context and its activations. Choosing the most probable token every time is one possible decoding rule, not a requirement.

Animation steps:

1. The context is The sky is. The model predicts an illustrative next-token distribution.
2. Choose the token blue from the distribution.
3. Append blue to the context and run the same model again. The next distribution now favors a full stop.
4. Append a full stop. Each chosen token becomes context for later predictions.

Sources: [Brown et al., 2020](https://arxiv.org/abs/2005.14165).

## 6. One passage supplies many training examples

05:30–06:15 (00:45)

During training we already have the whole passage. Shift the target sequence by one position: from “The” predict “sky”; from “The sky” predict “is”; and so on. The target is the observed continuation, even if the model would have chosen something else.

A causal mask prevents any position from looking ahead at its answer. Each layer can therefore process many positions in parallel. The final layer supplies their next-token predictions. This is different from generating new text, where the next token has not yet been chosen.

The prompt can also be processed in parallel before generation begins. Autoregressive generation is sequential across newly generated tokens, not a claim that all computation inside a model happens serially.

Sources: [Vaswani et al., 2017](https://arxiv.org/html/1706.03762v7).

## 7. “All the text that has ever existed”?

06:15–07:00 (00:45)

“All the text that has ever existed” is a vivid exaggeration. Training corpora are finite, selected mixtures. Much human knowledge was never written down, much text is inaccessible, and filtering changes what remains.

As a documented scale example, the flagship Llama 3.1 model used 15.6 trillion text tokens. Counts of training tokens are not counts of unique words or documents; some material may be sampled repeatedly. Data mixtures differ across models, and full details are often unavailable.

Training changes the parameters. It does not give the resulting model a live connection to every source. It can learn broad regularities and can also memorize particular passages. Uneven coverage, outdated information, and errors in the data all matter.

Sources: [The Llama 3 Herd of Models, 2024](https://arxiv.org/html/2407.21783v3); [Brown et al., 2020](https://arxiv.org/abs/2005.14165).

## 8. A continuation can require political knowledge

07:00–08:00 (01:00)

Pause before completing the sentence. Exactly 95 percent of the votes cast supported Barzel. The natural guess from those numbers alone is that he succeeded.

Presenter cue: Reveal “failed”. Then reveal the required majority.

The constructive vote of no confidence in West Germany required an absolute majority of all voting Bundestag members, not merely the votes cast. Of 496 voting members, 249 had to support the successor. Barzel received 247.

Reliable prediction across political text benefits from knowing institutions and interpreting their consequences. This is a constructed teaching prompt based on the official parliamentary record. A model might memorize this particular event; one correct continuation does not establish human-like understanding. The point is the richness of the knowledge that can be useful for predicting text.

Sources: [Deutscher Bundestag, historical archive](https://www.bundestag.de/dokumente/textarchiv/1972-04-27-misstrauensvotum-brandt-890810).

## 9. A few words can change the mathematics

08:00–09:00 (01:00)

No prior knowledge of finite fields is needed. The phrase “a field with 256 elements” specifies a particular kind of number system. It changes the correct continuation of the most familiar arithmetic expression.

A finite field has p to the n elements for a prime p, and its characteristic is p. Since 256 is 2 to the 8, adding one to itself gives zero. This is not arithmetic modulo 256, which is not a field.

Presenter cue: Reveal zero, then the short explanation. Leave a moment for the surprise.

The output is tiny; the relevant mathematical structure is not. Predicting mathematical text consistently can reward learning that structure. The training objective specifies what counts as success, not how simple the learned computation must be. Again, this is a known mathematical example, not a measurement of a named model.

Sources: [MIT OpenCourseWare, Algebra II, Lecture 26](https://ocw.mit.edu/courses/res-18-012-algebra-ii-student-notes-spring-2022/mit18_702s22_lec26.pdf).

## 10. Inside the box: repeated layers

09:00–10:00 (01:00)

Now open the black box. Each token becomes a vector, a list of numbers representing it. Position information lets the model distinguish different orders. The vector is repeatedly updated through a stack of layers.

Each layer contains attention and a transformation applied at each position. Attention combines information from the context. The local transformation computes with that information. Residual connections add updates to the representation instead of replacing it wholesale.

Presenter cue: Build the stack from the bottom. At the top, show the next-token distribution.

The highlighted position contains an actual observed token. Its final representation predicts the following token. We do not feed an unknown blank future token through the network before choosing it. A realistic model has many layers and attention heads; three layers are enough to show the mechanism.

Animation steps:

1. A token and its position become a numerical representation.
2. The first layer combines attention with a local transformation of the current state.
3. The second layer transforms the updated representation again.
4. The final layer produces a state used to calculate next-token probabilities.

Sources: [Vaswani et al., 2017](https://arxiv.org/html/1706.03762v7).

## 11. Attention matches keys and combines values

10:00–11:30 (01:30)

At one layer, the current position makes a query, Q. Each available position, including the current one, has a key, K, and a value, V. All three are numerical projections made with learned parameters.

The query is compared with each key. The resulting scores become nonnegative weights that sum to one. The model then takes a weighted combination of the values. Keys determine how much to read; values determine what information arrives.

Presenter cue: Advance from the query, to key comparisons, to normalized weights, then to value mixing. Read the wide and narrow paths as larger and smaller contributions. The weights are illustrative.

For one head, the weights are softmax(q·k/√d), and the result is the sum of weight times value. Several heads do this in parallel. The analogy of “asking” is useful, but these are numerical operations, not a conscious lookup. An attention map alone does not completely explain an answer.

Animation steps:

1. Each available position supplies a key and a value. The current position also supplies a query.
2. Match the current query against the keys of earlier positions and its own position.
3. Normalize the match scores to weights that sum to one. The weights shown are illustrative.
4. Mix the values using these weights. The result contributes to the current token representation.

Sources: [Vaswani et al., 2017](https://arxiv.org/html/1706.03762v7).

## 12. Two directions of information flow

11:30–13:15 (01:45)

This is the diagram to dwell on. Read upward for layers and left to right for positions in the text. The earlier positions have already produced their layer-specific activations. The right-hand column is the current observed token.

Presenter cue: First follow the blue representation upward. Then reveal the lateral inputs to the first attention operation. Repeat for the next layers.

At each layer, the current query matches keys made from that layer’s input representations. Their associated values contribute an attention update. That update and a local transformation modify the current representation before it moves to the next layer. The next layer uses its own keys and values.

Earlier tokens’ final outputs are not injected into every layer. The lateral connections join the appropriate layer. The current position can also attend to itself; future positions are excluded. Earlier activations stay fixed during this generation step because causal attention prevents them from depending on later tokens.

Weights are persistent learned parameters. K,V here are temporary activations for this particular text.

Animation steps:

1. Earlier positions have fixed layer-input activations. Each layer derives its own keys and values from those inputs.
2. Highlight the vertical route (not execution yet).
3. At layer one, earlier keys and values feed laterally into the current attention operation.
4. At layer two, a different set of keys and values contributes to the updated current state.
5. At layer three, attention again reads that layer’s keys and values. Earlier positions remain unchanged.

Sources: [Vaswani et al., 2017](https://arxiv.org/html/1706.03762v7); [Hugging Face, Transformers documentation](https://huggingface.co/docs/transformers/cache_explanation).

## 13. The next token reuses earlier work

13:15–14:00 (00:45)

After choosing the next token, append it to the context and process that new position. Earlier keys and values can be reused, because future tokens cannot change them under the causal mask.

The cache grows with the context and contains separate entries at each layer. It holds activations, not newly learned weights. This is one reason longer contexts consume memory.

Presenter cue: Advance to store the current K,V, then move the active position to the newly generated token. The old entries remain fixed while the new query reads them.

Now we have the core computation. The same architecture can behave very differently depending on what happens during training.

Animation steps:

1. Earlier positions already have cached keys and values at every layer. Compute the current position.
2. Use the current output to choose the next token, blue.
3. Store the previous position’s keys and values, then compute only the new position while reusing the earlier cache.

Sources: [Hugging Face, Transformers documentation](https://huggingface.co/docs/transformers/cache_explanation).

## 14. Pretraining learns to continue text

14:00–15:15 (01:15)

Pretraining is the large-scale next-token learning process we have just described. The data contain many kinds of structure: descriptions, arguments, dialogue, code, worked solutions, and patterns relating one language to another.

GPT-3 in 2020 made the breadth of this approach especially visible: one pretrained model could attempt translation, question answering, and other tasks from examples placed in the prompt, without task-specific parameter updates.

Presenter cue: Reveal the French continuation. This tiny demonstration illustrates the format; it is not a recorded GPT-3 response.

In-context learning changes the computation by changing its input. It is different from training the weights. Pretraining gave models broad capabilities, but a model trained to continue arbitrary text was not yet a reliably helpful conversational assistant.

Sources: [Brown et al., 2020](https://arxiv.org/abs/2005.14165).

## 15. Instruction tuning: learn from demonstrations

15:15–16:30 (01:15)

Instruction tuning gives the model examples of prompts paired with desirable answers. The learning machinery can remain ordinary next-token prediction, now applied to assistant responses in a structured conversation.

Presenter cue: Reveal the response, then the training rule. This is an illustrative prompt and answer, not a source transcript.

InstructGPT’s full 2022 pipeline also used human preferences. In the reported API-prompt evaluation, labelers preferred its 1.3-billion-parameter model to the original 175-billion-parameter GPT-3. That result belongs to the combined instruction-tuning and feedback pipeline, not supervised tuning alone.

The comparison concerns preference on the evaluated prompts, not superiority on every task. It nevertheless shows why model size alone does not tell us how useful a system will be. Training changes what kind of continuation the model tends to produce.

Sources: [Ouyang et al. / OpenAI, 2022](https://openai.com/index/instruction-following/).

## 16. Human preferences provide another training signal

16:30–17:30 (01:00)

Demonstrations are one signal; comparisons are another. Generate several responses, ask people which they prefer, and train a reward model to predict those rankings. Reinforcement learning can then increase the probability of responses with higher predicted reward.

This is a common RLHF pattern, although implementations differ and some preference-training methods do not use an online RL loop. It helps explain the shift toward useful conversational behavior.

People can prefer a clear, confident explanation that is wrong. A learned reward can also be exploited. A reward is a measurable training target, not an automatic certificate of truth.

For reasoning tasks, we can sometimes obtain a different kind of feedback: test whether the proposed answer actually works. That leads to the next training stage.

Sources: [Ouyang et al. / OpenAI, 2022](https://openai.com/index/instruction-following/).

## 17. Intermediate tokens provide a working space

17:30–18:45 (01:15)

Each new token triggers another pass through the network. Intermediate tokens can carry partial results that later tokens read through attention. A sequence of computations can therefore be distributed across many generation steps.

Presenter cue: Reveal the decomposition, intermediate subtraction, and final answer. This is an intentionally simple worked illustration, not a model trace.

The 2024 o1 report made reasoning training and additional inference computation a prominent part of the capability story. It reported improvements with more RL during training and more computation while answering.

Merely producing a longer answer is not sufficient. The challenge is learning useful intermediate computations, checks, and revisions. Visible reasoning text also need not be a faithful report of every internal computation. At inference time, reasoning usually changes the context and activations, not the model’s weights.

Sources: [OpenAI, September 2024](https://openai.com/index/learning-to-reason-with-llms/).

## 18. Reinforcement learning with a checker

18:45–20:15 (01:30)

During training, sample multiple solution attempts. A checker can evaluate the final answer, or sometimes intermediate steps. An RL update changes the probability of the generated trajectories according to their rewards.

Presenter cue: Show the checker, then the outcomes, then the update. In this example both constraints must hold. The actual training set contains many different problems.

The checker does not have to be differentiable. The model can use a policy-gradient-style learning signal based on the probabilities of its generated tokens and the observed reward. We are not backpropagating through a yes-or-no mathematical proof checker.

A final-answer reward does not specify the best reasoning route, and successful-looking answers can exploit a weak checker. Still, reliable feedback can make repeated search and learning much more effective. Keep this training update separate from ordinary answering, during which the weights remain fixed.

Sources: [DeepSeek-AI, January 2025](https://arxiv.org/html/2501.12948v1).

## 19. What does a mathematics benchmark ask?

20:15–21:30 (01:15)

Before showing a benchmark score, look at a real task. The walker covers the same 9 km and spends the same amount of time at the café. At speed s the total is four hours; at s plus two it is two hours and 24 minutes. What is the total at s plus one half?

Let T be the stop duration in hours. The equations are 9/s + T = 4 and 9/(s + 2) + T = 2.4. Their positive solution is s = 2.5 km/h and T = 0.4 hours. At 3 km/h, the walk takes three hours; add 24 minutes to obtain 204.

Presenter cue: Reveal the answer. You need not solve it live; the point is the kind of reasoning required.

This is the opening AIME problem, chosen to be approachable. Later questions are substantially harder. An answer key makes the final result cheap to score, even if finding it is difficult.

Sources: [MAA, AIME I 2024, Problem 1 (paraphrased)](https://live.poshenloh.com/past-contests/aime/2024I).

## 20. Progress during reinforcement learning

21:30–22:45 (01:15)

This January 2025 result starts from a pretrained model and follows its improvement during reinforcement learning. The reported AIME 2024 estimated single-attempt accuracy rises from 15.6 to 71.0 percent.

Figure 2 averages 16 sampled responses per question to estimate pass-at-one. It is not success after choosing the best of 16 answers. R1-Zero skipped preliminary supervised instruction tuning; “Zero” does not mean it lacked pretraining.

The reward included correctness and formatting. Longer reasoning and checking behavior emerged, alongside readability problems. Production R1 used additional supervised and RL stages.

This is stronger evidence for an RL contribution than a comparison between unrelated model releases. It still does not establish that any domain will improve equally, or that increasing answer length alone caused the gain.

Sources: [DeepSeek-AI, January 2025](https://arxiv.org/html/2501.12948v1).

## 21. Code can be checked by running it

22:45–23:45 (01:00)

In coding, a benchmark can specify a function and execute the generated program against tests. Here the requested output is the smallest positive integer absent from the input. Different inputs expose different mistakes, including mishandling an empty list.

Hidden tests prevent a solution from merely listing the examples shown in the prompt. Richer tasks can require editing a repository and preserving existing behavior. This is a powerful source of fast feedback, both for evaluation and for training.

Tests are nevertheless incomplete specifications. They can miss errors or reject valid solutions. Benchmark data can also leak into training. OpenAI’s February 2026 analysis of SWE-bench Verified is a concrete reminder of these problems. We therefore distinguish a program that passes a particular test suite from one that is correct in every real setting.

This exercise is illustrative, not an actual benchmark score or a live generated program.

Sources: [Chen et al., 2021](https://arxiv.org/abs/2107.03374); [OpenAI, February 2026](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/).

## 22. What does an olympiad proof require?

23:45–25:15 (01:30)

A proper divisor is a positive divisor smaller than the number itself. We repeatedly add the three largest proper divisors, requiring every term to have at least three.

Presenter cue: Show 18 first. Its three largest proper divisors are 9, 6, and 3, so it returns to itself forever. Next show 12: it goes to 13, which is prime and has only one proper divisor, so the process stops.

The problem is not to calculate these two examples. It is to characterize every positive integer that permits an infinite sequence and prove that the characterization is complete. That distinction explains why a short problem statement can require substantial reasoning.

At the IMO, expert graders assess the mathematical proof, not just a final multiple-choice answer. Proof checking is more demanding than comparing an integer with an answer key; formal proof systems can make some verification automatic.

Sources: [International Mathematical Olympiad, 2025, Problem 4](https://www.imo-official.org/problems/2025/).

## 23. 2025: gold-medal-level mathematical proofs

25:15–26:15 (01:00)

In July 2025, an advanced Gemini Deep Think system earned 35 out of 42 points, solving five of the six IMO problems, including the divisor problem we just saw. IMO coordinators officially graded the natural-language solutions.

The result is gold-medal-level performance. It is above most competitors, but five human contestants scored 42. Do not turn this into a claim of exceeding every human mathematician.

This system combined additional RL, mathematical solution data, and parallel exploration of reasoning paths. Its score cannot isolate the effect of RL alone. It is also a result for the evaluated system, not a promise about every response from an ordinary chat product.

The progress from broad text continuation to proofs at this level is substantial. The remaining question is how much of this success depends on the availability of useful feedback.

Sources: [Google DeepMind / IMO coordinators, July 2025](https://deepmind.google/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/); [IMO, official 2025 results](https://www.imo-official.org/editions/2025/).

## 24. Reliable feedback supports repeated improvement

26:15–28:00 (01:45)

When a system can propose a candidate, check it, and revise it, it can run many useful iterations. A reliable outcome can select successful attempts, become training data, or supply an RL reward. These are related uses of feedback, not identical algorithms.

AlphaEvolve in 2025 provides a concrete example of improving on a previously known human result: its LLM-driven evolutionary search found a construction for complex 4 by 4 matrix multiplication using 48 scalar multiplications rather than 49. Automatic evaluators made the search useful. This was a whole search system, not one unaided chat response.

Such results support a precise kind of exceptional performance on a specified task. “Superhuman” needs a reference group and a task definition. Olympiad medals, benchmark percentages, and a new best-known construction describe different comparisons.

The mechanism suggests why checkable domains have advanced quickly. It does not prove a universal law of progress.

Sources: [Google DeepMind, May 2025](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/); [DeepSeek-AI, January 2025](https://arxiv.org/html/2501.12948v1).

## 25. What if the answer requires an experiment?

28:00–29:15 (01:15)

Many scientific and medical questions cannot be settled by checking the text of an answer. They require measurements, experiments, interventions, or follow-up. Feedback may arrive slowly, cost substantial resources, and leave causal ambiguity.

This is a property of the task, not a strict division between disciplines. A medical exam question is cheaply scored; an effect on patient outcomes is not. Experimental science also contains checkable calculations, code, and constrained design tasks.

The strongest examples in this talk concern tasks with usable verification. That does not justify claiming that no model can ever outperform a human on any task outside mathematics or coding. Nor does high performance on scientific questions demonstrate autonomous scientific discovery or improved real-world outcomes.

Possible futures include better simulators, automated experiments, and more effective human–AI workflows. Whether those feedback systems support equally rapid progress is an open empirical question. This is an inference from the mechanism, not a forecast with an established answer.

## 26. What we know, and what remains open

29:15–30:00 (00:45)

The basic learning objective is simple, but the function that minimizes it can be complex. Attention lets each position read the context, and repeated layers and generated tokens support extended computation.

Pretraining builds broad capabilities. Demonstrations and preference feedback shape how they are used. Reasoning-focused training and additional inference computation have produced striking results, especially where feedback is useful and repeatable.

The unresolved question is how far those methods carry us when the world, rather than a cheap checker, must supply the evidence. That is an appropriate place to remain both interested and uncertain.

Presenter cue: End at 30 minutes. Questions.
