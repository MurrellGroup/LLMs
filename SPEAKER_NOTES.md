# Large language models — speaker notes

A 30-minute talk for scientists from varied disciplines. These notes include transitions and animation cues. Timings exclude questions.

The examples are scripted illustrations. Dated empirical results are attributed separately; none of the illustrative prompts is presented as a recorded model run. Capability milestones are selected historical examples from 2020–2025, with a 2026 evaluation caveat. Sources checked 14 November 2026.

## Running the talk

Open index.html. Space or Right Arrow advances a reveal before moving to the next slide. N shows notes; P opens a synchronized presenter window; O opens the slide index; F toggles fullscreen. T starts or pauses the elapsed timer. Shift+T resets it. R replays the current slide. Use ? for all controls.

## Timing

| Slide | Topic | Start | End |
| --- | --- | --- | --- |
| 1 | Large language models | 00:00 | 00:45 |
| 2 | Neural networks | 00:45 | 01:45 |
| 3 | Loss functions | 01:45 | 03:00 |
| 4 | Gradient descent | 03:00 | 04:15 |
| 5 | Autoregressive prediction | 04:15 | 05:30 |
| 6 | Training on text | 05:30 | 06:15 |
| 7 | Training data | 06:15 | 07:00 |
| 8 | The 1972 Bundestag vote | 07:00 | 08:00 |
| 9 | Arithmetic in a finite field | 08:00 | 09:00 |
| 10 | Transformers | 09:00 | 10:00 |
| 11 | Attention | 10:00 | 11:30 |
| 12 | Attention through the layers | 11:30 | 13:15 |
| 13 | The KV cache | 13:15 | 14:00 |
| 14 | Pretraining | 14:00 | 15:15 |
| 15 | Instruction tuning | 15:15 | 16:30 |
| 16 | Human preference training | 16:30 | 17:30 |
| 17 | Reasoning | 17:30 | 18:45 |
| 18 | Reinforcement learning | 18:45 | 20:15 |
| 19 | AIME I 2024, Problem 1 | 20:15 | 21:30 |
| 20 | DeepSeek-R1-Zero | 21:30 | 22:45 |
| 21 | Program tests | 22:45 | 23:45 |
| 22 | IMO 2025, Problem 4 | 23:45 | 25:15 |
| 23 | Gemini Deep Think at IMO 2025 | 25:15 | 26:15 |
| 24 | AlphaEvolve | 26:15 | 28:00 |
| 25 | Experiments and outcomes | 28:00 | 29:15 |
| 26 | Discussion | 29:15 | 30:00 |

## 1. Large language models

00:00–00:45 (00:45)

I will start with how a neural network learns from examples, then apply that idea to language. We will follow a token through a transformer and look at how more recent training methods have changed what these models can do.

The examples will include political history and mathematics. You do not need to know either subject in advance; their purpose is to show how much can be involved in choosing a short continuation. We will finish with the difference between checking an answer by calculation and checking it by doing an experiment.

Presenter cue: The planned timings total 30 minutes, excluding questions. Space or Right Arrow advances each build. P opens the presenter window; N opens notes.

## 2. Neural networks

00:45–01:45 (01:00)

Suppose we have numerical measurements and want to predict another quantity. We can represent the predictor as a function: put numbers in and get a number out. For this illustration the input is 2 and the network predicts 3. The units and the particular application do not matter.

Inside the box are many adjustable numbers, called parameters or weights. Changing them changes the function. We do not need to draw all the individual operations to understand training. We need examples of inputs and the outputs that were actually observed, and a way of comparing the predictions with those observations.

A useful predictor should also work on examples that were not used to fit it. Getting a low error on the training examples alone is not enough.

Presenter cue: Reveal the parameters, then the numerical prediction. Keep this same example for the loss slide. Do not introduce language modelling yet.

Animation steps:

1. A numerical input, x equals 2, enters a neural network.
2. The network contains many adjustable parameters, represented by theta.
3. For this input and these parameters, the network predicts y hat equals 3.

Sources: [Rumelhart, Hinton & Williams, 1986](https://www.nature.com/articles/323533a0).

## 3. Loss functions

01:45–03:00 (01:15)

For this input, the observed output was 5. The prediction was 3, so the error is minus 2. A loss function converts that discrepancy into a number that we try to reduce. Squared error is one choice: here it gives 4.

Squaring makes both positive and negative errors costly and penalizes larger errors more strongly. Other tasks call for other loss functions. The choice specifies what the training procedure is trying to achieve.

In practice we compute an average over many examples. Changing one parameter can improve some predictions while worsening others, so we use the aggregate loss. We now have a numerical objective, but a network may have billions of parameters. How do we decide which of them to change?

Presenter cue: Reveal the observed value and the error, then squared error. The network and its prediction stay in the same positions as on the preceding slide.

Animation steps:

1. The same network predicts 3 from input 2.
2. The observed value is 5. The prediction error is 3 minus 5, or minus 2.
3. The squared error is L equals 3 minus 5 squared, which is 4.

Sources: [Rumelhart, Hinton & Williams, 1986](https://www.nature.com/articles/323533a0).

## 4. Gradient descent

03:00–04:15 (01:15)

This curve shows a deliberately simple one-parameter example: the prediction is the parameter itself, and the target is 5. At our starting value of 3, the squared loss is 4.

The tangent gives the local slope. Here that slope is negative, so increasing the parameter reduces the loss. Gradient descent subtracts the slope multiplied by a learning rate. With a learning rate of 0.2, the first update moves the parameter from 3 to 3.8. Subsequent updates move it closer to 5.

For a full network, there is one derivative for each parameter; together they form the gradient. Backpropagation calculates these derivatives through the network using the chain rule. The optimizer uses them to update the parameters, and the process repeats on batches of examples.

Real loss surfaces have many dimensions and are much more complicated than this curve. Modern optimizers also use information from previous gradients. An update need not improve every example, and it need not find the best possible solution.

Presenter cue: Show the tangent and direction before advancing through the parameter updates. We have now introduced a general learning procedure; the next slide chooses a particular task for it.

Animation steps:

1. A one-parameter loss curve, L of theta equals theta minus 5 squared. The starting parameter is 3 and the loss is 4.
2. The tangent has slope minus 4. A learning rate of 0.2 gives an update from 3 to 3.8.
3. The parameter moves to 3.8, reducing the loss to 1.44.
4. Another gradient update moves the parameter to 4.28, reducing the loss to 0.5184.
5. The next update moves the parameter to 4.568, reducing the loss to approximately 0.187.

Sources: [Rumelhart, Hinton & Williams, 1986](https://www.nature.com/articles/323533a0).

## 5. Autoregressive prediction

04:15–05:30 (01:15)

For a language model, the input is text represented as a sequence of tokens. A token may be a word, part of a word, punctuation or another encoded piece. The network produces probabilities for the token that follows the input.

Here it reads “The sky is” and gives a higher probability to “blue” than to the alternatives shown. After choosing “blue”, we add it to the input and run the model again. The next prediction now depends on “The sky is blue”. This repeated conditioning on previous values is called autoregressive prediction.

Choosing the highest-probability token is one option; sampling from the distribution can produce different continuations. The model uses the same trained parameters for each pass. A growing answer changes its input and intermediate activations.

The probabilities and word-sized tokens in this animation are for illustration. An actual vocabulary contains many more alternatives, and its tokenizer may split these words differently.

Presenter cue: Read the first distribution, select and append blue, then process the expanded context to predict punctuation.

Animation steps:

1. The context is The sky is. The model assigns illustrative probabilities to the next tokens blue, grey, and dark.
2. The token blue is selected and added after the existing context.
3. The expanded context, The sky is blue, enters the model. It now predicts punctuation and other possible next tokens.
4. A full stop is selected and appended, giving The sky is blue full stop.

Sources: [Brown et al., GPT-3, 2020](https://arxiv.org/abs/2005.14165).

## 6. Training on text

05:30–06:15 (00:45)

A passage supplies its own targets. After “The” the observed continuation is “sky”. After “The sky” it is “is”, and so on. We can obtain vast numbers of training examples without asking a person to label each one.

The loss for this task is minus the logarithm of the probability assigned to the observed token. If that probability is 0.1, the loss is about 2.30. At probability 0.5, the loss falls to about 0.69. We average this over positions and examples, then use gradients to adjust the parameters as before.

During training the whole passage is available, so its positions can be processed in parallel. A causal mask prevents a position from reading the continuation it is being asked to predict. Generation must wait until a new token has been chosen before it can use that token as context.

Presenter cue: Reveal the remaining training pairs, then the language-model loss. Here p refers to the probability of the observed continuation in each row.

Sources: [Vaswani et al., 2017](https://arxiv.org/html/1706.03762v7).

## 7. Training data

06:15–07:00 (00:45)

“All the text that has ever existed” is an exaggeration. Training uses a finite collection assembled from sources such as web pages, books and code. Some material cannot be accessed; some is excluded by filtering; much human knowledge was never written down.

For a documented example of the scale, the flagship Llama 3.1 model was pretrained on 15.6 trillion text tokens. This is a count of tokens encountered during training, not unique words or unique documents. Sampling can repeat material. Data mixtures differ across models, and their full composition is often undisclosed.

Pretraining changes the network’s parameters. The trained model can learn regularities and also memorize passages, but it does not thereby acquire a live connection to every source. The age and coverage of the training collection matter.

Sources: [The Llama 3 Herd of Models, 2024](https://arxiv.org/html/2407.21783v3); [Brown et al., GPT-3, 2020](https://arxiv.org/abs/2005.14165).

## 8. The 1972 Bundestag vote

07:00–08:00 (01:00)

Take a moment to choose a continuation. Barzel received exactly 95 percent of the votes cast, so if we only consider those numbers, success seems the obvious guess.

The attempt failed. This was a constructive vote of no confidence in West Germany. The rule required a majority of all voting members of the Bundestag, not just those who cast a vote. There were 496 voting members, so Barzel needed 249 votes and received 247.

Reliable prediction of political writing can depend on knowing the relevant institutions and applying their rules. A model could memorize this particular event; one correct completion would not tell us whether it had reasoned about the rule. Across many texts, however, learning such structure can help with prediction. The task gives a reason to acquire knowledge far beyond word frequencies.

Presenter cue: Pause at the blank, reveal failed, then show the parliamentary arithmetic.

Sources: [Deutscher Bundestag, historical archive](https://www.bundestag.de/dokumente/textarchiv/1972-04-27-misstrauensvotum-brandt-890810).

## 9. Arithmetic in a finite field

08:00–09:00 (01:00)

The correct continuation is zero. The words “a field with 256 elements” specify a number system in which the usual-looking symbols have this consequence. You do not need to know finite fields to see what the example demands of a predictor.

A finite field has a prime-power number of elements. If that number is p to the n, its characteristic is p: adding one to itself p times gives zero. Since 256 is 2 to the 8, one plus one is zero. This is different from arithmetic modulo 256, which is not a field.

To predict mathematical text reliably, the model benefits from relationships between definitions, theorems and calculations. The shortness of the next token does not limit the complexity of the calculation that could help predict it. This example is a mathematical deduction, not a recorded response from a particular model.

Presenter cue: Reveal zero before the explanation. Leave time for the audience to register why the context matters.

Sources: [MIT OpenCourseWare, Algebra II, Lecture 26](https://ocw.mit.edu/courses/res-18-012-algebra-ii-student-notes-spring-2022/mit18_702s22_lec26.pdf).

## 10. Transformers

09:00–10:00 (01:00)

We can now look inside the network. Each token is represented by a vector, which is a list of numbers. The representation is repeatedly updated through a stack of layers. Information about position lets the model distinguish different orders.

A layer combines attention with a transformation applied separately at each position. Attention reads information from the available context; the other transformation computes an update using the resulting representation. Residual connections add those updates to the running representation. Normalization and other details are omitted from this diagram.

Follow the last observed token upwards. At the top, its representation is converted into probabilities for the following token. We choose that next token only after these computations. The diagram uses three layers for readability; large models have many more.

Presenter cue: Build the path from the observed token through the layers to the prediction. The next slide opens up attention within a single layer.

Animation steps:

1. The observed token “its” and its position form an input representation. Three layers are shown above it.
2. The representation enters layer one: attention, followed by a transformation at this position.
3. The updated representation enters layer two.
4. Layer three produces the final representation.
5. The final representation produces probabilities for the following token.

Sources: [Vaswani et al., 2017](https://arxiv.org/html/1706.03762v7).

## 11. Attention

10:00–11:30 (01:30)

At one layer, every available position has a key and a value. The position being updated also makes a query. These are vectors computed from the current representations using learned parameters.

The query is compared with each key. The scores are normalized to give nonnegative weights that add up to one. The layer then forms a weighted sum of the value vectors. In this illustration, the position containing “cat” contributes most strongly when updating “its”. The current position also has its own key and value and can attend to itself.

A key determines the weight assigned to a position; its value supplies the information being combined. The comparison is a scaled dot product and the normalization is a softmax. Multiple attention heads carry out separate versions of this operation in parallel.

The weights here were chosen to make the calculation visible. They are not measurements from a model. Attention can capture many kinds of relationship, and an attention map alone does not fully explain an answer.

Presenter cue: First locate the query. Advance through key comparisons, normalized weights, and the weighted combination of values. Keep the token positions fixed throughout.

Animation steps:

1. A query is made from the current token “its”. Every available token has a key and a value.
2. The same query is compared with each key, including the key of the current position.
3. The comparison scores are normalized into weights summing to one: 0.10, 0.60, 0.20 and 0.10.
4. The values are multiplied by those weights and summed. The token “cat” contributes the largest share in this illustrative head.

Sources: [Vaswani et al., 2017](https://arxiv.org/html/1706.03762v7).

## 12. Attention through the layers

11:30–13:15 (01:45)

We now follow both routes through the stack. The blue route carries the current token’s representation upwards. At each layer, attention also reads keys and values from the context, shown in rust.

The keys and values for a layer are computed from the representations entering that layer. Earlier tokens therefore supply different keys and values at different depths. The current token makes its query, and its own key and value, from its representation at the same depth. Attention combines the available values before the layer finishes updating the current representation.

After the first layer has finished, the updated representation enters the second layer. Its new query can read the second layer’s stored keys and values. The same sequence happens at each depth, until the final representation produces the next-token distribution.

During generation, the earlier tokens have already been processed. A causal mask prevented them from reading future tokens, so adding the current token does not require us to redo their earlier computations. Only positions at or before the current one are available.

Presenter cue: Advance one layer at a time. Point first to the rust input, then follow the blue output upwards. Do not describe lateral attention as reading the final output vectors of earlier tokens.

Animation steps:

1. Earlier tokens have a separate cached key and value at every layer. The current observed token “its” begins at the bottom of the stack.
2. Layer one reads the cached keys and values from earlier positions and its own key and value, then updates the current representation.
3. The representation moves upwards into layer two, which reads its own row of cached keys and values.
4. Layer three reads its row of cached keys and values. Keys and values are made from the input to their corresponding layer; they do not propagate vertically between layers.
5. The final representation produces the next-token distribution. Blue shows the current position through layers, and rust shows the active read from keys and values.

Sources: [Vaswani et al., 2017](https://arxiv.org/html/1706.03762v7); [Hugging Face, Transformers documentation](https://huggingface.co/docs/transformers/cache_explanation).

## 13. The KV cache

13:15–14:00 (00:45)

Each layer keeps the keys and values already computed for earlier positions. This collection is the KV cache. When we append a token, its query can read those stored values, and each layer adds the new token’s keys and values to its cache.

Causal attention means that a later token cannot change what an earlier position could see. Its stored keys and values can therefore be reused. This saves the cost of repeatedly processing the entire prefix while generating an answer.

The cache contains intermediate activations for this context. The learned parameters are stored separately. Extending the context normally increases the cache’s memory use, and long contexts can make attention more expensive even when these previous computations are reused.

Presenter cue: Show the existing per-layer cache, then the new token’s entries being added. Connect each row to the corresponding layer in the preceding diagram.

Animation steps:

1. The three earlier tokens have cached keys and values at all three layers. The current token “its” has an empty column.
2. The current token adds its layer-one key and value.
3. Its layer-two key and value are added.
4. Its layer-three key and value complete the new cache column. Earlier columns have been reused.

Sources: [Hugging Face, Transformers documentation](https://huggingface.co/docs/transformers/cache_explanation).

## 14. Pretraining

14:00–15:15 (01:15)

Pretraining applies next-token prediction to a large collection of text. That text contains conversations, arguments, code, worked solutions and translations. Learning to continue these different kinds of material can produce capabilities that were not individually programmed into the model.

GPT-3 demonstrated in 2020 that a pretrained model could perform a variety of tasks when its prompt contained a few examples. Here the first two translations establish the pattern for the third. This is a teaching illustration, rather than a recorded GPT-3 response.

The examples influence the prediction through the input. They are not a new round of parameter training. A pretrained model can also continue a request in an inconvenient way, for example by producing more questions or imitating an unsuitable kind of text. The next training stages make it easier to use as an assistant.

Presenter cue: Reveal maison. The source dates the capability milestone to GPT-3 in 2020.

Sources: [Brown et al., GPT-3, 2020](https://arxiv.org/abs/2005.14165).

## 15. Instruction tuning

15:15–16:30 (01:15)

Instruction tuning uses examples in the form we want the model to produce: a request followed by a suitable response. Someone supplies the response, or selects it from generated candidates, and the model is trained to predict its tokens.

This uses the same kind of prediction loss that we saw for text. The difference is the training material and which tokens contribute to the loss. In a common setup, the request provides context and the loss is calculated on the response tokens.

The Moon example illustrates that format. A collection of such examples teaches the model how requests are usually answered, how explanations are written, and when a short response is appropriate. The 2022 InstructGPT work also used human preference feedback, so its reported improvement reflects the combined procedure.

Presenter cue: Reveal the example answer beneath its prompt. Keep the entire training pair visible.

Sources: [Ouyang et al. / OpenAI, 2022](https://openai.com/index/instruction-following/).

## 16. Human preference training

16:30–17:30 (01:00)

People compare several responses to the same prompt. The comparisons train a reward model that predicts which response people would prefer. Reinforcement learning then uses its scores to adjust the language model.

In the InstructGPT study, raters preferred the 1.3-billion-parameter trained assistant to the original 175-billion-parameter GPT-3 on the evaluated prompts. A much smaller network could be more useful for these requests after demonstrations and preference training. This comparison is about judged responses, not a claim that the smaller network was better at every task.

Preference scores can favor a confident explanation that is wrong. The language model can also find ways to obtain high scores without doing what we intended. Some later methods train directly from preference pairs instead of fitting a separate reward model. Here we are following the original InstructGPT procedure.

Presenter cue: Reveal the rankings, the reward model and its update route, then the measured preference result. The result belongs to the combined demonstration-and-preference procedure.

Sources: [Ouyang et al. / OpenAI, 2022](https://openai.com/index/instruction-following/).

## 17. Reasoning

17:30–18:45 (01:15)

A model can generate intermediate calculations before producing its answer. Each new token involves another pass through the network, and later tokens can read the preceding calculation through attention. A partial result written into the context can therefore be used in a later step.

The arithmetic here is intentionally simple and is not a transcript from a model. More difficult tasks can benefit from decomposing a problem, trying an approach, noticing a contradiction or checking a result.

OpenAI reported in 2024 that o1 improved with more reinforcement learning during training and with more computation while answering. Generating more text by itself is not sufficient; the training has to make useful computations more likely. Visible reasoning also need not be a faithful description of every internal computation.

While answering, the model usually extends its context without changing its parameters. Reinforcement learning changes those parameters beforehand, using the outcomes of many attempts. The next example shows how an outcome can supply that training signal.

Presenter cue: Reveal one line per advance. Relate each new line to another generation step, with the previous lines available as context.

Sources: [OpenAI, September 2024](https://openai.com/index/learning-to-reason-with-llms/).

## 18. Reinforcement learning

18:45–20:15 (01:30)

During training, the model produces several attempts. In this example a short program can check the sum and product and assign a reward of one when both constraints hold. The displayed candidates are just final answers; on a difficult problem, each would follow a longer attempted solution.

Reinforcement learning uses the rewards to adjust the probabilities of those generated sequences. Successful attempts receive a different learning signal from unsuccessful ones. Across many problems, the model can learn computations that tend to lead to better outcomes.

The checker does not have to be differentiable. A policy-gradient-style calculation uses the probabilities of the model’s generated tokens and the reward it receives; it does not differentiate through the checker.

A reward for the final answer does not specify which intermediate steps to use. It may also reward lucky guesses or exploit an incomplete checker. The quality and coverage of the feedback matter. In verifiable tasks, that feedback can be obtained at a scale that would be difficult with human-written demonstrations alone.

Presenter cue: Reveal the arithmetic checks, then rewards, then the returning parameter-update arrow. The arrow marks training; ordinary generation does not perform this update.

Sources: [DeepSeek-AI, January 2025](https://arxiv.org/html/2501.12948v1).

## 19. AIME I 2024, Problem 1

20:15–21:30 (01:15)

Before looking at an accuracy score, consider one of the questions. The walk is nine kilometres each time, and the café stop always lasts the same amount of time. At speed s the total is four hours. At s plus two kilometres per hour, it is two hours and 24 minutes. We need the total at s plus one half.

Let the stop last T hours. The equations are 9/s + T = 4 and 9/(s + 2) + T = 2.4. Solving gives s = 2.5 and T = 0.4. The requested speed is therefore 3 kilometres per hour, giving three hours of walking and 24 minutes at the café: 204 minutes.

This is the opening problem of AIME I 2024. It is chosen to be accessible; later questions are harder. The answer key makes scoring the final integer inexpensive even when finding it takes substantial work.

Presenter cue: Leave a moment to read the table, then reveal the answer. The algebra can be explained aloud without adding another block of slide text.

Sources: [MAA, AIME I 2024, Problem 1 (paraphrased)](https://live.poshenloh.com/past-contests/aime/2024I).

## 20. DeepSeek-R1-Zero

21:30–22:45 (01:15)

DeepSeek followed one pretrained model through reinforcement learning and reported that its AIME 2024 accuracy rose from 15.6 to 71 percent. This result was published in January 2025.

The authors estimated single-attempt accuracy by averaging sixteen sampled responses per question. They were not selecting the best answer from each group of sixteen. The distinction matters when comparing reported scores.

R1-Zero began with pretraining and skipped an initial supervised instruction-tuning stage. Its rewards included correctness and formatting. During training, its responses became longer and included more checking, although readability remained a problem. The production R1 model used additional supervised and reinforcement-learning stages.

This result ties the improvement to an RL training run more directly than a comparison between unrelated model releases would. It does not separately control all the effects of increased computation while answering, and it does not establish that every domain will improve by the same amount.

Presenter cue: Reveal the second bar. Both bars share a scale from zero to one hundred percent.

Sources: [DeepSeek-AI, January 2025](https://arxiv.org/html/2501.12948v1).

## 21. Program tests

22:45–23:45 (01:00)

A coding task can specify a function and then execute the generated program on test inputs. For the first input here, one is present and two is missing, so the answer is two. For the next input, the answer is four. The empty list checks whether the function handles an edge case; its answer is one.

Additional hidden tests can reveal errors that the examples in the prompt miss. The same mechanism can evaluate programs during training or guide a search over generated candidates. Larger tasks can ask the model to modify an existing repository while preserving its other behavior.

A test suite can still miss bugs or reject a valid solution. Benchmark examples may also have appeared in training data. OpenAI’s February 2026 analysis of SWE-bench Verified documents these problems. Passing tests is therefore a result about those tests, not a guarantee of correctness in every setting.

This small exercise is for teaching. It is not a measured model result or a question taken from HumanEval.

Presenter cue: Reveal the first two expected outputs, then the empty-input case.

Sources: [Chen et al., 2021](https://arxiv.org/abs/2107.03374); [OpenAI, February 2026](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/).

## 22. IMO 2025, Problem 4

23:45–25:15 (01:30)

A proper divisor is a positive divisor smaller than the number. Eighteen has largest proper divisors nine, six and three. Their sum is eighteen, so this sequence continues forever. Twelve gives thirteen; thirteen is prime and has only one proper divisor, so that sequence stops.

Calculating a few cases is much easier than answering the question. It asks for every possible starting value, and a proof that the classification is complete. A successful answer must establish both that the proposed values work and that every other value eventually fails.

At the IMO, expert graders assess the proof. This takes more work than comparing a final integer with an answer key. Formal proof systems can automate verification when a proof is expressed in their language, but these particular solutions were written in natural language and graded by people.

Presenter cue: Show the repeating example, then the one that stops. The statement is paraphrased; the full problem is linked below.

Sources: [IMO 2025, Problem 4 (paraphrased)](https://www.imo-official.org/problems/2025/).

## 23. Gemini Deep Think at IMO 2025

25:15–26:15 (01:00)

In July 2025, an advanced Gemini Deep Think system solved five of the six IMO problems, including the divisor problem. IMO coordinators graded its natural-language proofs and awarded 35 out of 42 points, meeting the gold-medal standard. Five human contestants scored 42.

The evaluated system used additional reinforcement learning, mathematical solution data and parallel exploration of reasoning paths. This result cannot isolate the contribution of RL alone. It also describes a particular evaluation system rather than the reliability of every response from a general chat product.

The comparison is already demanding: a few years after general-purpose text models began performing tasks from examples in a prompt, a system could produce proofs that met this competition standard. To examine performance beyond a previous human result, we can look at a more narrowly defined algorithmic task.

Sources: [Google DeepMind / IMO coordinators, July 2025](https://deepmind.google/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/); [IMO, official 2025 results](https://www.imo-official.org/editions/2025/).

## 24. AlphaEvolve

26:15–28:00 (01:45)

AlphaEvolve combined an LLM with evolutionary search and automatic evaluators. In 2025 it found a construction for multiplying complex four-by-four matrices using 48 scalar multiplications, improving on the previous best-known construction using 49.

The usual entry-by-entry method uses 64 scalar multiplications. Faster constructions reuse combinations of entries. The task is to find such a construction and check that it computes the correct product for arbitrary matrices. Saving one multiplication compared with the previous record is a precise improvement on known human work.

Automatic evaluation lets the system reject incorrect candidates and continue searching from useful ones. This was a result from the complete search system, not an unaided chat response. Feedback can also supply RL rewards or help collect training examples, although those are different uses of evaluation.

This is the kind of setting where a system can attempt many candidates and receive informative feedback repeatedly. The comparison becomes harder when an answer cannot be assessed without collecting new evidence from the world.

Presenter cue: Reveal the previous record, then 48. Discuss what the evaluator makes possible, rather than treating the count as a general measure of intelligence.

Sources: [Google DeepMind, May 2025](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/); [DeepSeek-AI, January 2025](https://arxiv.org/html/2501.12948v1).

## 25. Experiments and outcomes

28:00–29:15 (01:15)

For many scientific questions, evaluating an answer requires new measurements. A proposed treatment may require an intervention and follow-up before we can assess its effects. Such evaluations can be expensive, slow and noisy, and the results may still leave causal ambiguity.

The distinction applies to tasks within a field. A medical exam question can be scored from an answer key, while a claim about patient outcomes requires different evidence. Experimental science also contains calculations, software and constrained design tasks that can be checked efficiently.

The clearest examples we have examined of matching or exceeding very strong human performance involve mathematical and computational tasks with usable verification. They do not establish comparable performance in autonomous experimental science or improved clinical outcomes. It would also be too broad to claim that models cannot outperform people on any task outside mathematics and coding.

Better simulations, automated experiments and collaboration with researchers could provide more feedback. We do not know whether these will support the same rate of improvement, or how much progress will be limited by the time and cost of obtaining evidence.

Presenter cue: Reveal measurement and patient-outcome rows separately. Discuss the delay and cost of each evaluation, rather than drawing a boundary between whole disciplines.

## 26. Discussion

29:15–30:00 (00:45)

We started with a general learning procedure: measure a loss and use gradients to adjust a network. Next-token prediction applies that procedure to a broad range of written material. Attention lets the network use its context, and generating intermediate tokens supplies additional computation.

Demonstrations, preference feedback and reasoning training change how the resulting model responds. We now have strong results on several tasks where candidate answers can be evaluated repeatedly. Applying similar methods to experimental questions depends in part on how much reliable feedback we can obtain and how quickly.

Presenter cue: End at 30 minutes. Questions.
