/* Slide content and timed speaker notes. Teaching examples are scripted. */
window.LLMTalk = {
  "sources": {
    "backprop": {
      "label": "Rumelhart, Hinton & Williams, 1986",
      "title": "Learning representations by back-propagating errors",
      "url": "https://www.nature.com/articles/323533a0",
      "note": "Backpropagation computes derivatives through a network. The loss landscape in the talk is a teaching example."
    },
    "transformer": {
      "label": "Vaswani et al., 2017",
      "title": "Attention Is All You Need",
      "url": "https://arxiv.org/html/1706.03762v7",
      "note": "Masked self-attention, learned query/key/value projections, residual updates, and positionwise transformations. The talk explains only the causal language-model stack."
    },
    "cache": {
      "label": "Hugging Face, Transformers documentation",
      "title": "How caching works",
      "url": "https://huggingface.co/docs/transformers/cache_explanation",
      "note": "Per-layer key/value caching during autoregressive inference. Accessed 14 November 2026."
    },
    "gpt3": {
      "label": "Brown et al., GPT-3, 2020",
      "title": "Language Models are Few-Shot Learners",
      "url": "https://arxiv.org/abs/2005.14165",
      "note": "GPT-3 demonstrated multiple tasks from examples in context, without task-specific gradient updates. The toy prompts in this talk are constructed illustrations."
    },
    "llama": {
      "label": "The Llama 3 Herd of Models, 2024",
      "title": "The Llama 3 Herd of Models",
      "url": "https://arxiv.org/html/2407.21783v3",
      "note": "The flagship Llama 3.1 model was pretrained on 15.6 trillion text tokens. Training tokens are not a count of unique words."
    },
    "politics": {
      "label": "Deutscher Bundestag, historical archive",
      "title": "27. April 1972: Das Misstrauensvotum gegen Willy Brandt",
      "url": "https://www.bundestag.de/dokumente/textarchiv/1972-04-27-misstrauensvotum-brandt-890810",
      "note": "The official account gives 496 voting members, 260 votes cast, 247 in favor, and 249 required. The teaching prompt is paraphrased."
    },
    "fields": {
      "label": "MIT OpenCourseWare, Algebra II, Lecture 26",
      "title": "Finite Fields",
      "url": "https://ocw.mit.edu/courses/res-18-012-algebra-ii-student-notes-spring-2022/mit18_702s22_lec26.pdf",
      "note": "A finite field has prime-power order and characteristic equal to that prime. The 256-element example is a direct mathematical deduction."
    },
    "instruct": {
      "label": "Ouyang et al. / OpenAI, 2022",
      "title": "Aligning language models to follow instructions",
      "url": "https://openai.com/index/instruction-following/",
      "note": "InstructGPT used demonstrations and human preference feedback. The small-model preference result is for that combined pipeline and the evaluated prompts."
    },
    "o1": {
      "label": "OpenAI, September 2024",
      "title": "Learning to reason with LLMs",
      "url": "https://openai.com/index/learning-to-reason-with-llms/",
      "note": "Historical report of gains from reasoning RL and additional inference computation. The talk does not use a 64-sample consensus result as single-attempt accuracy."
    },
    "r1": {
      "label": "DeepSeek-AI, January 2025",
      "title": "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning",
      "url": "https://arxiv.org/html/2501.12948v1",
      "note": "R1-Zero AIME 2024 estimated pass@1 rose from 15.6% to 71.0% during RL. Figure 2 averages 16 responses per question; this is not best-of-16 success."
    },
    "aime": {
      "label": "MAA, AIME I 2024, Problem 1 (paraphrased)",
      "title": "2024 AIME I problems, authorized reproduction",
      "url": "https://live.poshenloh.com/past-contests/aime/2024I",
      "note": "MAA-authored problem reproduced with permission. The walk-and-café question is the opening item, chosen for accessibility. Its answer is 204 minutes."
    },
    "humaneval": {
      "label": "Chen et al., 2021",
      "title": "Evaluating Large Language Models Trained on Code",
      "url": "https://arxiv.org/abs/2107.03374",
      "note": "Primary reference for evaluating generated functions with tests. The missing-positive-integer exercise is an original teaching example, not a quoted HumanEval item or measured model run."
    },
    "imo": {
      "label": "IMO 2025, Problem 4 (paraphrased)",
      "title": "IMO 2025 problems",
      "url": "https://www.imo-official.org/problems/2025/",
      "note": "Paraphrased divisor-sequence problem. The displayed 18 and 12 examples are direct arithmetic illustrations."
    },
    "gemini": {
      "label": "Google DeepMind / IMO coordinators, July 2025",
      "title": "Advanced Gemini Deep Think reaches gold-medal standard at IMO 2025",
      "url": "https://deepmind.google/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/",
      "note": "35/42, five of six problems, officially graded. An advanced evaluation system with additional RL, mathematical data, and parallel reasoning; not an isolated RL ablation."
    },
    "imoresults": {
      "label": "IMO, official 2025 results",
      "title": "66th International Mathematical Olympiad results",
      "url": "https://www.imo-official.org/editions/2025/",
      "note": "Gold-medal-level is not better than every contestant. Five human contestants scored 42/42."
    },
    "alphaevolve": {
      "label": "Google DeepMind, May 2025",
      "title": "AlphaEvolve: a Gemini-powered coding agent for designing advanced algorithms",
      "url": "https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/",
      "note": "An LLM-driven evolutionary search system with automatic evaluation improved a known construction for complex 4×4 matrix multiplication from 49 to 48 scalar multiplications."
    },
    "swe": {
      "label": "OpenAI, February 2026",
      "title": "Why SWE-bench Verified no longer measures frontier coding capabilities",
      "url": "https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/",
      "note": "Evidence that executable tests and benchmark exposure can undermine evaluation. The talk makes no current SWE-bench leaderboard claim."
    }
  },
  "slides": [
    {
      "id": "title",
      "title": "Large language models",
      "duration": 45,
      "className": "title-slide",
      "steps": 0,
      "html": "<div class=\"title-content\"><h1>Large language models</h1><p>Learning, attention and reasoning</p></div>",
      "notes": "<p>I will start with how a neural network learns from examples, then apply that idea to language. We will follow a token through a transformer and look at how more recent training methods have changed what these models can do.</p><p>The examples will include political history and mathematics. You do not need to know either subject in advance; their purpose is to show how much can be involved in choosing a short continuation. We will finish with the difference between checking an answer by calculation and checking it by doing an experiment.</p><p class=\"cue\">The planned timings total 30 minutes, excluding questions. Space or Right Arrow advances each build. P opens the presenter window; N opens notes.</p>"
    },
    {
      "id": "network",
      "title": "Neural networks",
      "duration": 60,
      "scene": "blackbox",
      "sources": [
        "backprop"
      ],
      "notes": "<p>Suppose we have numerical measurements and want to predict another quantity. We can represent the predictor as a function: put numbers in and get a number out. For this illustration the input is 2 and the network predicts 3. The units and the particular application do not matter.</p><p>Inside the box are many adjustable numbers, called parameters or weights. Changing them changes the function. We do not need to draw all the individual operations to understand training. We need examples of inputs and the outputs that were actually observed, and a way of comparing the predictions with those observations.</p><p>A useful predictor should also work on examples that were not used to fit it. Getting a low error on the training examples alone is not enough.</p><p class=\"cue\">Reveal the parameters, then the numerical prediction. Keep this same example for the loss slide. Do not introduce language modelling yet.</p>"
    },
    {
      "id": "loss",
      "title": "Loss functions",
      "duration": 75,
      "sources": [
        "backprop"
      ],
      "notes": "<p>For this input, the observed output was 5. The prediction was 3, so the error is minus 2. A loss function converts that discrepancy into a number that we try to reduce. Squared error is one choice: here it gives 4.</p><p>Squaring makes both positive and negative errors costly and penalizes larger errors more strongly. Other tasks call for other loss functions. The choice specifies what the training procedure is trying to achieve.</p><p>In practice we compute an average over many examples. Changing one parameter can improve some predictions while worsening others, so we use the aggregate loss. We now have a numerical objective, but a network may have billions of parameters. How do we decide which of them to change?</p><p class=\"cue\">Reveal the observed value and the error, then squared error. The network and its prediction stay in the same positions as on the preceding slide.</p>",
      "scene": "loss"
    },
    {
      "id": "gradient",
      "title": "Gradient descent",
      "duration": 75,
      "scene": "optimization",
      "sources": [
        "backprop"
      ],
      "notes": "<p>This curve shows a deliberately simple one-parameter example: the prediction is the parameter itself, and the target is 5. At our starting value of 3, the squared loss is 4.</p><p>The tangent gives the local slope. Here that slope is negative, so increasing the parameter reduces the loss. Gradient descent subtracts the slope multiplied by a learning rate. With a learning rate of 0.2, the first update moves the parameter from 3 to 3.8. Subsequent updates move it closer to 5.</p><p>For a full network, there is one derivative for each parameter; together they form the gradient. Backpropagation calculates these derivatives through the network using the chain rule. The optimizer uses them to update the parameters, and the process repeats on batches of examples.</p><p>Real loss surfaces have many dimensions and are much more complicated than this curve. Modern optimizers also use information from previous gradients. An update need not improve every example, and it need not find the best possible solution.</p><p class=\"cue\">Show the tangent and direction before advancing through the parameter updates. We have now introduced a general learning procedure; the next slide chooses a particular task for it.</p>"
    },
    {
      "id": "autoregression",
      "title": "Autoregressive prediction",
      "duration": 75,
      "scene": "autoregression",
      "sources": [
        "gpt3"
      ],
      "notes": "<p>For a language model, the input is text represented as a sequence of tokens. A token may be a word, part of a word, punctuation or another encoded piece. The network produces probabilities for the token that follows the input.</p><p>Here it reads “The sky is” and gives a higher probability to “blue” than to the alternatives shown. After choosing “blue”, we add it to the input and run the model again. The next prediction now depends on “The sky is blue”. This repeated conditioning on previous values is called autoregressive prediction.</p><p>Choosing the highest-probability token is one option; sampling from the distribution can produce different continuations. The model uses the same trained parameters for each pass. A growing answer changes its input and intermediate activations.</p><p>The probabilities and word-sized tokens in this animation are for illustration. An actual vocabulary contains many more alternatives, and its tokenizer may split these words differently.</p><p class=\"cue\">Read the first distribution, select and append blue, then process the expanded context to predict punctuation.</p>"
    },
    {
      "id": "training-text",
      "title": "Training on text",
      "duration": 45,
      "steps": 2,
      "sources": [
        "transformer"
      ],
      "html": "<div class=\"training-layout\"><table class=\"academic-table prefix-table\"><thead><tr><th>Input</th><th>Observed continuation</th></tr></thead><tbody><tr><td>The</td><td class=\"blue\">sky</td></tr><tr class=\"reveal\" data-reveal=\"1\"><td>The sky</td><td class=\"blue\">is</td></tr><tr class=\"reveal\" data-reveal=\"1\"><td>The sky is</td><td class=\"blue\">blue</td></tr><tr class=\"reveal\" data-reveal=\"1\"><td>The sky is blue</td><td class=\"blue\">.</td></tr></tbody></table><div class=\"text-loss reveal\" data-reveal=\"2\"><div class=\"math\">L = −log p</div><dl><dt>p = 0.10</dt><dd>L = 2.30</dd><dt>p = 0.50</dt><dd>L = 0.69</dd></dl></div></div>",
      "notes": "<p>A passage supplies its own targets. After “The” the observed continuation is “sky”. After “The sky” it is “is”, and so on. We can obtain vast numbers of training examples without asking a person to label each one.</p><p>The loss for this task is minus the logarithm of the probability assigned to the observed token. If that probability is 0.1, the loss is about 2.30. At probability 0.5, the loss falls to about 0.69. We average this over positions and examples, then use gradients to adjust the parameters as before.</p><p>During training the whole passage is available, so its positions can be processed in parallel. A causal mask prevents a position from reading the continuation it is being asked to predict. Generation must wait until a new token has been chosen before it can use that token as context.</p><p class=\"cue\">Reveal the remaining training pairs, then the language-model loss. Here p refers to the probability of the observed continuation in each row.</p>"
    },
    {
      "id": "data",
      "title": "Training data",
      "duration": 45,
      "steps": 1,
      "sources": [
        "llama",
        "gpt3"
      ],
      "html": "<div class=\"corpus-layout\"><div class=\"corpus-sources\"><p>Web pages</p><p>Books</p><p>Code</p></div><div class=\"corpus-brace\" aria-hidden=\"true\">→</div><div class=\"corpus-result\"><p class=\"corpus-name\">Llama 3.1 · 2024</p><p class=\"corpus-count\">15.6 trillion</p><p>training tokens</p><p class=\"corpus-limit reveal\" data-reveal=\"1\">Selected, filtered and sampled.<br>Much text is missing.</p></div></div>",
      "notes": "<p>“All the text that has ever existed” is an exaggeration. Training uses a finite collection assembled from sources such as web pages, books and code. Some material cannot be accessed; some is excluded by filtering; much human knowledge was never written down.</p><p>For a documented example of the scale, the flagship Llama 3.1 model was pretrained on 15.6 trillion text tokens. This is a count of tokens encountered during training, not unique words or unique documents. Sampling can repeat material. Data mixtures differ across models, and their full composition is often undisclosed.</p><p>Pretraining changes the network’s parameters. The trained model can learn regularities and also memorize passages, but it does not thereby acquire a live connection to every source. The age and coverage of the training collection matter.</p>"
    },
    {
      "id": "politics",
      "title": "The 1972 Bundestag vote",
      "duration": 60,
      "steps": 2,
      "sources": [
        "politics"
      ],
      "html": "<div class=\"political-example\"><p class=\"problem\">Barzel received 247 of the 260 votes cast.<br>His attempt to replace Brandt <span class=\"answer-slot\"><span class=\"reveal blue\" data-reveal=\"1\">failed</span></span>.</p><table class=\"academic-table reveal\" data-reveal=\"2\"><tbody><tr><th>Voting members</th><td>496</td></tr><tr><th>Votes required</th><td>249</td></tr><tr><th>Votes for Barzel</th><td>247</td></tr></tbody></table></div>",
      "notes": "<p>Take a moment to choose a continuation. Barzel received exactly 95 percent of the votes cast, so if we only consider those numbers, success seems the obvious guess.</p><p>The attempt failed. This was a constructive vote of no confidence in West Germany. The rule required a majority of all voting members of the Bundestag, not just those who cast a vote. There were 496 voting members, so Barzel needed 249 votes and received 247.</p><p>Reliable prediction of political writing can depend on knowing the relevant institutions and applying their rules. A model could memorize this particular event; one correct completion would not tell us whether it had reasoned about the rule. Across many texts, however, learning such structure can help with prediction. The task gives a reason to acquire knowledge far beyond word frequencies.</p><p class=\"cue\">Pause at the blank, reveal failed, then show the parliamentary arithmetic.</p>"
    },
    {
      "id": "mathematics",
      "title": "Arithmetic in a finite field",
      "duration": 60,
      "steps": 2,
      "sources": [
        "fields"
      ],
      "html": "<div class=\"finite-field\"><p>In a field with 256 elements,</p><div class=\"math finite-equation\">1 + 1 = <span class=\"answer-slot\"><span class=\"reveal blue\" data-reveal=\"1\">0</span></span></div><div class=\"field-explanation reveal\" data-reveal=\"2\"><span class=\"math\">256 = 2⁸</span><span>Characteristic 2</span></div></div>",
      "notes": "<p>The correct continuation is zero. The words “a field with 256 elements” specify a number system in which the usual-looking symbols have this consequence. You do not need to know finite fields to see what the example demands of a predictor.</p><p>A finite field has a prime-power number of elements. If that number is p to the n, its characteristic is p: adding one to itself p times gives zero. Since 256 is 2 to the 8, one plus one is zero. This is different from arithmetic modulo 256, which is not a field.</p><p>To predict mathematical text reliably, the model benefits from relationships between definitions, theorems and calculations. The shortness of the next token does not limit the complexity of the calculation that could help predict it. This example is a mathematical deduction, not a recorded response from a particular model.</p><p class=\"cue\">Reveal zero before the explanation. Leave time for the audience to register why the context matters.</p>"
    },
    {
      "id": "transformer",
      "title": "Transformers",
      "duration": 60,
      "scene": "transformer",
      "sources": [
        "transformer"
      ],
      "notes": "<p>We can now look inside the network. Each token is represented by a vector, which is a list of numbers. The representation is repeatedly updated through a stack of layers. Information about position lets the model distinguish different orders.</p><p>A layer combines attention with a transformation applied separately at each position. Attention reads information from the available context; the other transformation computes an update using the resulting representation. Residual connections add those updates to the running representation. Normalization and other details are omitted from this diagram.</p><p>Follow the last observed token upwards. At the top, its representation is converted into probabilities for the following token. We choose that next token only after these computations. The diagram uses three layers for readability; large models have many more.</p><p class=\"cue\">Build the path from the observed token through the layers to the prediction. The next slide opens up attention within a single layer.</p>"
    },
    {
      "id": "attention",
      "title": "Attention",
      "duration": 90,
      "scene": "attention",
      "sources": [
        "transformer"
      ],
      "notes": "<p>At one layer, every available position has a key and a value. The position being updated also makes a query. These are vectors computed from the current representations using learned parameters.</p><p>The query is compared with each key. The scores are normalized to give nonnegative weights that add up to one. The layer then forms a weighted sum of the value vectors. In this illustration, the position containing “key” contributes most strongly when updating “it”. The current position also has its own key and value and can attend to itself.</p><p>A key determines the weight assigned to a position; its value supplies the information being combined. The comparison is a scaled dot product and the normalization is a softmax. Multiple attention heads carry out separate versions of this operation in parallel.</p><p>The weights here were chosen to make the calculation visible. They are not measurements from a model. Attention can capture many kinds of relationship, and an attention map alone does not fully explain an answer.</p><p class=\"cue\">First locate the query. Advance through key comparisons, normalized weights, and the weighted combination of values. Keep the token positions fixed throughout.</p>"
    },
    {
      "id": "flow",
      "title": "Attention through the layers",
      "duration": 105,
      "scene": "flow",
      "sources": [
        "transformer",
        "cache"
      ],
      "notes": "<p>We now follow both routes through the stack. The blue route carries the current token’s representation upwards. At each layer, attention also reads keys and values from the context, shown in rust.</p><p>The keys and values for a layer are computed from the representations entering that layer. Earlier tokens therefore supply different keys and values at different depths. The current token makes its query, and its own key and value, from its representation at the same depth. Attention combines the available values before the layer finishes updating the current representation.</p><p>After the first layer has finished, the updated representation enters the second layer. Its new query can read the second layer’s stored keys and values. The same sequence happens at each depth, until the final representation produces the next-token distribution.</p><p>During generation, the earlier tokens have already been processed. A causal mask prevented them from reading future tokens, so adding the current token does not require us to redo their earlier computations. Only positions at or before the current one are available.</p><p class=\"cue\">Advance one layer at a time. Point first to the rust input, then follow the blue output upwards. Do not describe lateral attention as reading the final output vectors of earlier tokens.</p>"
    },
    {
      "id": "cache",
      "title": "The KV cache",
      "duration": 45,
      "scene": "cache",
      "sources": [
        "cache"
      ],
      "notes": "<p>Each layer keeps the keys and values already computed for earlier positions. This collection is the KV cache. When we append a token, its query can read those stored values, and each layer adds the new token’s keys and values to its cache.</p><p>Causal attention means that a later token cannot change what an earlier position could see. Its stored keys and values can therefore be reused. This saves the cost of repeatedly processing the entire prefix while generating an answer.</p><p>The cache contains intermediate activations for this context. The learned parameters are stored separately. Extending the context normally increases the cache’s memory use, and long contexts can make attention more expensive even when these previous computations are reused.</p><p class=\"cue\">Show the existing per-layer cache, then the new token’s entries being added. Connect each row to the corresponding layer in the preceding diagram.</p>"
    },
    {
      "id": "pretraining",
      "title": "Pretraining",
      "duration": 75,
      "steps": 1,
      "sources": [
        "gpt3"
      ],
      "html": "<div class=\"prompt-sheet translation\"><div><span>sea</span><span>→</span><span>mer</span></div><div><span>sun</span><span>→</span><span>soleil</span></div><div><span>house</span><span>→</span><span class=\"answer-slot\"><span class=\"reveal blue\" data-reveal=\"1\">maison</span></span></div></div>",
      "notes": "<p>Pretraining applies next-token prediction to a large collection of text. That text contains conversations, arguments, code, worked solutions and translations. Learning to continue these different kinds of material can produce capabilities that were not individually programmed into the model.</p><p>GPT-3 demonstrated in 2020 that a pretrained model could perform a variety of tasks when its prompt contained a few examples. Here the first two translations establish the pattern for the third. This is a teaching illustration, rather than a recorded GPT-3 response.</p><p>The examples influence the prediction through the input. They are not a new round of parameter training. A pretrained model can also continue a request in an inconvenient way, for example by producing more questions or imitating an unsuitable kind of text. The next training stages make it easier to use as an assistant.</p><p class=\"cue\">Reveal maison. The source dates the capability milestone to GPT-3 in 2020.</p>"
    },
    {
      "id": "instructions",
      "title": "Instruction tuning",
      "duration": 75,
      "steps": 1,
      "sources": [
        "instruct"
      ],
      "html": "<div class=\"instruction-example\"><div class=\"instruction-part\"><h3>Prompt</h3><p>Explain why the Moon has phases.</p></div><div class=\"instruction-part reveal\" data-reveal=\"1\"><h3>Example answer</h3><p class=\"blue\">We see different portions of its sunlit half<br>as it orbits Earth.</p></div></div>",
      "notes": "<p>Instruction tuning uses examples in the form we want the model to produce: a request followed by a suitable response. Someone supplies the response, or selects it from generated candidates, and the model is trained to predict its tokens.</p><p>This uses the same kind of prediction loss that we saw for text. The difference is the training material and which tokens contribute to the loss. In a common setup, the request provides context and the loss is calculated on the response tokens.</p><p>The Moon example illustrates that format. A collection of such examples teaches the model how requests are usually answered, how explanations are written, and when a short response is appropriate. The 2022 InstructGPT work also used human preference feedback, so its reported improvement reflects the combined procedure.</p><p class=\"cue\">Reveal the example answer beneath its prompt. Keep the entire training pair visible.</p>"
    },
    {
      "id": "preferences",
      "title": "Human preference training",
      "duration": 60,
      "steps": 3,
      "sources": [
        "instruct"
      ],
      "html": "<div class=\"preference-layout\"><div class=\"preference-process\"><div class=\"process-step\"><div class=\"response-pair\"><span>A</span><span>B</span></div><p>Responses</p></div><span class=\"process-arrow reveal\" data-reveal=\"1\">→</span><div class=\"process-step reveal\" data-reveal=\"1\"><div class=\"ranking\">A &gt; B</div><p>Human rankings</p></div><span class=\"process-arrow reveal\" data-reveal=\"2\">→</span><div class=\"process-step reveal\" data-reveal=\"2\"><div class=\"process-box\">Reward model</div></div><span class=\"process-arrow reveal\" data-reveal=\"2\"><small>RL</small>→</span><div class=\"process-step reveal\" data-reveal=\"2\"><div class=\"process-box model-box\">Language<br>model θ</div></div></div><div class=\"preference-result reveal\" data-reveal=\"3\"><p>Raters preferred</p><div class=\"model-comparison\"><span><strong>1.3B</strong> InstructGPT</span><span>to</span><span><strong>175B</strong> GPT-3</span></div></div></div>",
      "notes": "<p>People compare several responses to the same prompt. The comparisons train a reward model that predicts which response people would prefer. Reinforcement learning then uses its scores to adjust the language model.</p><p>In the InstructGPT study, raters preferred the 1.3-billion-parameter trained assistant to the original 175-billion-parameter GPT-3 on the evaluated prompts. A much smaller network could be more useful for these requests after demonstrations and preference training. This comparison is about judged responses, not a claim that the smaller network was better at every task.</p><p>Preference scores can favor a confident explanation that is wrong. The language model can also find ways to obtain high scores without doing what we intended. Some later methods train directly from preference pairs instead of fitting a separate reward model. Here we are following the original InstructGPT procedure.</p><p class=\"cue\">Reveal the rankings, the reward model and its update route, then the measured preference result. The result belongs to the combined demonstration-and-preference procedure.</p>"
    },
    {
      "id": "reasoning",
      "title": "Reasoning",
      "duration": 75,
      "steps": 3,
      "sources": [
        "o1"
      ],
      "html": "<div class=\"calculation\"><div><span>17 × 19</span><span></span></div><div class=\"reveal\" data-reveal=\"1\"><span>=</span><span>17 × (20 − 1)</span></div><div class=\"reveal\" data-reveal=\"2\"><span>=</span><span>340 − 17</span></div><div class=\"reveal blue\" data-reveal=\"3\"><span>=</span><span>323</span></div></div>",
      "notes": "<p>A model can generate intermediate calculations before producing its answer. Each new token involves another pass through the network, and later tokens can read the preceding calculation through attention. A partial result written into the context can therefore be used in a later step.</p><p>The arithmetic here is intentionally simple and is not a transcript from a model. More difficult tasks can benefit from decomposing a problem, trying an approach, noticing a contradiction or checking a result.</p><p>OpenAI reported in 2024 that o1 improved with more reinforcement learning during training and with more computation while answering. Generating more text by itself is not sufficient; the training has to make useful computations more likely. Visible reasoning also need not be a faithful description of every internal computation.</p><p>While answering, the model usually extends its context without changing its parameters. Reinforcement learning changes those parameters beforehand, using the outcomes of many attempts. The next example shows how an outcome can supply that training signal.</p><p class=\"cue\">Reveal one line per advance. Relate each new line to another generation step, with the previous lines available as context.</p>"
    },
    {
      "id": "rl",
      "title": "Reinforcement learning",
      "duration": 90,
      "steps": 3,
      "sources": [
        "r1"
      ],
      "html": "<div class=\"rl-example\"><p class=\"problem\">Find positive integers with sum 10 and product 21.</p><div class=\"rl-board\"><div class=\"rl-model\">Model<span class=\"parameter-mark\">θ</span></div><div class=\"rl-out-arrow\">→</div><table class=\"academic-table reward-table\"><thead><tr><th>Candidate</th><th class=\"reveal\" data-reveal=\"1\">Sum</th><th class=\"reveal\" data-reveal=\"1\">Product</th><th class=\"reveal\" data-reveal=\"2\">Reward</th></tr></thead><tbody><tr><td>2, 8</td><td class=\"reveal\" data-reveal=\"1\">10</td><td class=\"reveal\" data-reveal=\"1\">16</td><td class=\"reveal\" data-reveal=\"2\">0</td></tr><tr><td>3, 7</td><td class=\"reveal\" data-reveal=\"1\">10</td><td class=\"reveal blue\" data-reveal=\"1\">21</td><td class=\"reveal blue\" data-reveal=\"2\">1</td></tr><tr><td>4, 6</td><td class=\"reveal\" data-reveal=\"1\">10</td><td class=\"reveal\" data-reveal=\"1\">24</td><td class=\"reveal\" data-reveal=\"2\">0</td></tr></tbody></table><div class=\"rl-return reveal\" data-reveal=\"3\"><svg viewBox=\"0 0 1010 70\" aria-hidden=\"true\"><path d=\"M950 4 V48 H92 V4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\"/><path d=\"M84 15 L92 3 L100 15\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\"/></svg><span>Parameter update</span></div></div></div>",
      "notes": "<p>During training, the model produces several attempts. In this example a short program can check the sum and product and assign a reward of one when both constraints hold. The displayed candidates are just final answers; on a difficult problem, each would follow a longer attempted solution.</p><p>Reinforcement learning uses the rewards to adjust the probabilities of those generated sequences. Successful attempts receive a different learning signal from unsuccessful ones. Across many problems, the model can learn computations that tend to lead to better outcomes.</p><p>The checker does not have to be differentiable. A policy-gradient-style calculation uses the probabilities of the model’s generated tokens and the reward it receives; it does not differentiate through the checker.</p><p>A reward for the final answer does not specify which intermediate steps to use. It may also reward lucky guesses or exploit an incomplete checker. The quality and coverage of the feedback matter. In verifiable tasks, that feedback can be obtained at a scale that would be difficult with human-written demonstrations alone.</p><p class=\"cue\">Reveal the arithmetic checks, then rewards, then the returning parameter-update arrow. The arrow marks training; ordinary generation does not perform this update.</p>"
    },
    {
      "id": "aime",
      "title": "AIME I 2024, Problem 1",
      "duration": 75,
      "steps": 1,
      "sources": [
        "aime"
      ],
      "html": "<div class=\"task-table\"><p class=\"problem\">A 9 km walk followed by a café stop of fixed duration.</p><table class=\"academic-table\"><thead><tr><th>Walking speed</th><th>Total time</th></tr></thead><tbody><tr><td><i>s</i> km/h</td><td>4 hours</td></tr><tr><td><i>s</i> + 2 km/h</td><td>2 hours 24 minutes</td></tr><tr class=\"target-row\"><td><i>s</i> + ½ km/h</td><td><span data-until=\"1\">?</span><span class=\"reveal blue\" data-reveal=\"1\">204 minutes</span></td></tr></tbody></table></div>",
      "notes": "<p>Before looking at an accuracy score, consider one of the questions. The walk is nine kilometres each time, and the café stop always lasts the same amount of time. At speed s the total is four hours. At s plus two kilometres per hour, it is two hours and 24 minutes. We need the total at s plus one half.</p><p>Let the stop last T hours. The equations are 9/s + T = 4 and 9/(s + 2) + T = 2.4. Solving gives s = 2.5 and T = 0.4. The requested speed is therefore 3 kilometres per hour, giving three hours of walking and 24 minutes at the café: 204 minutes.</p><p>This is the opening problem of AIME I 2024. It is chosen to be accessible; later questions are harder. The answer key makes scoring the final integer inexpensive even when finding it takes substantial work.</p><p class=\"cue\">Leave a moment to read the table, then reveal the answer. The algebra can be explained aloud without adding another block of slide text.</p>"
    },
    {
      "id": "rl-result",
      "title": "DeepSeek-R1-Zero",
      "duration": 75,
      "steps": 1,
      "sources": [
        "r1"
      ],
      "html": "<div class=\"result-chart\"><div class=\"chart-head\"><span>AIME 2024</span><span>Correct responses (%)</span></div><div class=\"chart-bars\"><span class=\"chart-label\">Before RL</span><div class=\"chart-track\"><div class=\"chart-bar\" style=\"width:15.6%\"><b>15.6</b></div></div><span class=\"chart-label reveal\" data-reveal=\"1\">After RL</span><div class=\"chart-track reveal\" data-reveal=\"1\"><div class=\"chart-bar improved\" style=\"width:71%\"><b>71.0</b></div></div></div><div class=\"chart-axis\"><span>0</span><span>25</span><span>50</span><span>75</span><span>100</span></div></div>",
      "notes": "<p>DeepSeek followed one pretrained model through reinforcement learning and reported that its AIME 2024 accuracy rose from 15.6 to 71 percent. This result was published in January 2025.</p><p>The authors estimated single-attempt accuracy by averaging sixteen sampled responses per question. They were not selecting the best answer from each group of sixteen. The distinction matters when comparing reported scores.</p><p>R1-Zero began with pretraining and skipped an initial supervised instruction-tuning stage. Its rewards included correctness and formatting. During training, its responses became longer and included more checking, although readability remained a problem. The production R1 model used additional supervised and reinforcement-learning stages.</p><p>This result ties the improvement to an RL training run more directly than a comparison between unrelated model releases would. It does not separately control all the effects of increased computation while answering, and it does not establish that every domain will improve by the same amount.</p><p class=\"cue\">Reveal the second bar. Both bars share a scale from zero to one hundred percent.</p>"
    },
    {
      "id": "code",
      "title": "Program tests",
      "duration": 60,
      "steps": 2,
      "sources": [
        "humaneval",
        "swe"
      ],
      "html": "<div class=\"task-table\"><p class=\"problem\">Return the smallest missing positive integer.</p><table class=\"academic-table code-table\"><thead><tr><th>Input</th><th>Expected output</th></tr></thead><tbody><tr><td>[3, 4, −1, 1]</td><td class=\"reveal blue\" data-reveal=\"1\">2</td></tr><tr><td>[1, 2, 3]</td><td class=\"reveal blue\" data-reveal=\"1\">4</td></tr><tr><td>[]</td><td class=\"reveal blue\" data-reveal=\"2\">1</td></tr></tbody></table></div>",
      "notes": "<p>A coding task can specify a function and then execute the generated program on test inputs. For the first input here, one is present and two is missing, so the answer is two. For the next input, the answer is four. The empty list checks whether the function handles an edge case; its answer is one.</p><p>Additional hidden tests can reveal errors that the examples in the prompt miss. The same mechanism can evaluate programs during training or guide a search over generated candidates. Larger tasks can ask the model to modify an existing repository while preserving its other behavior.</p><p>A test suite can still miss bugs or reject a valid solution. Benchmark examples may also have appeared in training data. OpenAI’s February 2026 analysis of SWE-bench Verified documents these problems. Passing tests is therefore a result about those tests, not a guarantee of correctness in every setting.</p><p>This small exercise is for teaching. It is not a measured model result or a question taken from HumanEval.</p><p class=\"cue\">Reveal the first two expected outputs, then the empty-input case.</p>"
    },
    {
      "id": "imo-task",
      "title": "IMO 2025, Problem 4",
      "duration": 90,
      "steps": 2,
      "sources": [
        "imo"
      ],
      "html": "<div class=\"olympiad-example\"><p class=\"problem\">Repeatedly replace a positive integer by the sum of its three largest proper divisors. Stop if it has fewer than three.<br>Determine, with proof, which starting values give an infinite sequence.</p><div class=\"divisor-sequences\"><div class=\"reveal\" data-reveal=\"1\"><span>18</span><span>→ 9 + 6 + 3 = 18 → 18 → …</span></div><div class=\"reveal\" data-reveal=\"2\"><span>12</span><span>→ 6 + 4 + 3 = 13 → stop</span></div></div></div>",
      "notes": "<p>A proper divisor is a positive divisor smaller than the number. Eighteen has largest proper divisors nine, six and three. Their sum is eighteen, so this sequence continues forever. Twelve gives thirteen; thirteen is prime and has only one proper divisor, so that sequence stops.</p><p>Calculating a few cases is much easier than answering the question. It asks for every possible starting value, and a proof that the classification is complete. A successful answer must establish both that the proposed values work and that every other value eventually fails.</p><p>At the IMO, expert graders assess the proof. This takes more work than comparing a final integer with an answer key. Formal proof systems can automate verification when a proof is expressed in their language, but these particular solutions were written in natural language and graded by people.</p><p class=\"cue\">Show the repeating example, then the one that stops. The statement is paraphrased; the full problem is linked below.</p>"
    },
    {
      "id": "imo-result",
      "title": "Gemini Deep Think at IMO 2025",
      "duration": 60,
      "steps": 0,
      "sources": [
        "gemini",
        "imoresults"
      ],
      "html": "<div class=\"imo-score\"><div class=\"score-fraction\"><strong>35</strong><span>/ 42</span></div><table class=\"academic-table\"><tbody><tr><th>Problems solved</th><td>5 / 6</td></tr><tr><th>Award standard</th><td>Gold medal</td></tr></tbody></table></div>",
      "notes": "<p>In July 2025, an advanced Gemini Deep Think system solved five of the six IMO problems, including the divisor problem. IMO coordinators graded its natural-language proofs and awarded 35 out of 42 points, meeting the gold-medal standard. Five human contestants scored 42.</p><p>The evaluated system used additional reinforcement learning, mathematical solution data and parallel exploration of reasoning paths. This result cannot isolate the contribution of RL alone. It also describes a particular evaluation system rather than the reliability of every response from a general chat product.</p><p>The comparison is already demanding: a few years after general-purpose text models began performing tasks from examples in a prompt, a system could produce proofs that met this competition standard. To examine performance beyond a previous human result, we can look at a more narrowly defined algorithmic task.</p>"
    },
    {
      "id": "verification",
      "title": "AlphaEvolve",
      "duration": 105,
      "steps": 2,
      "sources": [
        "alphaevolve",
        "r1"
      ],
      "html": "<div class=\"alpha-example\"><p class=\"problem\">Complex 4 × 4 matrix multiplication</p><div class=\"matrix-product\" aria-label=\"Four by four matrix A times four by four matrix B equals four by four matrix C\"><span class=\"matrix-grid\" aria-hidden=\"true\">a₁₁　⋯　a₁₄<br>⋮　　　　⋮<br>a₄₁　⋯　a₄₄</span><span>×</span><span class=\"matrix-grid\" aria-hidden=\"true\">b₁₁　⋯　b₁₄<br>⋮　　　　⋮<br>b₄₁　⋯　b₄₄</span><span>=</span><span class=\"matrix-grid\" aria-hidden=\"true\">c₁₁　⋯　c₁₄<br>⋮　　　　⋮<br>c₄₁　⋯　c₄₄</span></div><table class=\"academic-table compact\"><thead><tr><th>Construction</th><th>Scalar multiplications</th></tr></thead><tbody><tr class=\"reveal\" data-reveal=\"1\"><td>Previous best known</td><td>49</td></tr><tr class=\"reveal\" data-reveal=\"2\"><td>AlphaEvolve</td><td class=\"blue\">48</td></tr></tbody></table></div>",
      "notes": "<p>AlphaEvolve combined an LLM with evolutionary search and automatic evaluators. In 2025 it found a construction for multiplying complex four-by-four matrices using 48 scalar multiplications, improving on the previous best-known construction using 49.</p><p>The usual entry-by-entry method uses 64 scalar multiplications. Faster constructions reuse combinations of entries. The task is to find such a construction and check that it computes the correct product for arbitrary matrices. Saving one multiplication compared with the previous record is a precise improvement on known human work.</p><p>Automatic evaluation lets the system reject incorrect candidates and continue searching from useful ones. This was a result from the complete search system, not an unaided chat response. Feedback can also supply RL rewards or help collect training examples, although those are different uses of evaluation.</p><p>This is the kind of setting where a system can attempt many candidates and receive informative feedback repeatedly. The comparison becomes harder when an answer cannot be assessed without collecting new evidence from the world.</p><p class=\"cue\">Reveal the previous record, then 48. Discuss what the evaluator makes possible, rather than treating the count as a general measure of intelligence.</p>"
    },
    {
      "id": "reality",
      "title": "Experiments and outcomes",
      "duration": 75,
      "steps": 2,
      "html": "<div class=\"evaluation-comparison\"><table class=\"academic-table\"><thead><tr><th>Task</th><th>Evaluation</th></tr></thead><tbody><tr><td>Generated program</td><td>Run tests</td></tr><tr><td>Mathematical solution</td><td>Check the answer or proof</td></tr><tr class=\"reveal\" data-reveal=\"1\"><td>Experimental prediction</td><td>Make measurements</td></tr><tr class=\"reveal\" data-reveal=\"2\"><td>Proposed treatment</td><td>Measure patient outcomes</td></tr></tbody></table></div>",
      "notes": "<p>For many scientific questions, evaluating an answer requires new measurements. A proposed treatment may require an intervention and follow-up before we can assess its effects. Such evaluations can be expensive, slow and noisy, and the results may still leave causal ambiguity.</p><p>The distinction applies to tasks within a field. A medical exam question can be scored from an answer key, while a claim about patient outcomes requires different evidence. Experimental science also contains calculations, software and constrained design tasks that can be checked efficiently.</p><p>The clearest examples we have examined of matching or exceeding very strong human performance involve mathematical and computational tasks with usable verification. They do not establish comparable performance in autonomous experimental science or improved clinical outcomes. It would also be too broad to claim that models cannot outperform people on any task outside mathematics and coding.</p><p>Better simulations, automated experiments and collaboration with researchers could provide more feedback. We do not know whether these will support the same rate of improvement, or how much progress will be limited by the time and cost of obtaining evidence.</p><p class=\"cue\">Reveal measurement and patient-outcome rows separately. Discuss the delay and cost of each evaluation, rather than drawing a boundary between whole disciplines.</p>"
    },
    {
      "id": "closing",
      "title": "Discussion",
      "duration": 45,
      "steps": 0,
      "className": "discussion-slide",
      "html": "<p class=\"discussion-question\">How quickly can models improve when evaluating an answer requires an experiment?</p>",
      "notes": "<p>We started with a general learning procedure: measure a loss and use gradients to adjust a network. Next-token prediction applies that procedure to a broad range of written material. Attention lets the network use its context, and generating intermediate tokens supplies additional computation.</p><p>Demonstrations, preference feedback and reasoning training change how the resulting model responds. We now have strong results on several tasks where candidate answers can be evaluated repeatedly. Applying similar methods to experimental questions depends in part on how much reliable feedback we can obtain and how quickly.</p><p class=\"cue\">End at 30 minutes. Questions.</p>"
    }
  ]
};
