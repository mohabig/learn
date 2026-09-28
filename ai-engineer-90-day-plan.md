# The Curious AI Builder: A Guided Course for a Brilliant Young Learner

> **Who this is for:** A curious young person who wants to understand AI by making things. No previous software-engineering job or AI experience is assumed. Some setup, accounts, online services, and spending require a trusted adult.
> **The goal:** Build things you care about, learn the real ideas underneath them, and get good at checking whether they work. This is a learning journey, not a race, a hiring boot camp, or a promise of professional mastery in 90 days.

## How to use this course

- Follow the guided path, but take as long as you need. A course day is a learning unit, not a demand to finish in one sitting. Short sessions with breaks are fine; repeat a day whenever an idea is still fuzzy.
- Start with the foundations week unless you already know the material. A short diagnostic helps you choose; skipping is allowed and never a test of intelligence.
- Pick a project theme you genuinely like: a creature or space field guide, a mystery-solving helper, a story-world librarian, a sports-stats explorer, or a study helper. Use public, fictional, or adult-approved material. You can change themes later.
- Each lesson should follow this rhythm: **big question → plain explanation → worked example → build together → playful experiment → explain what you noticed → optional challenge**. New technical words should be explained before they are used as if familiar.
- The main path is local and private wherever possible. Ask a trusted adult before creating accounts, using paid APIs, sharing data, publishing a project, downloading software, or contacting anyone online. Never put a real name, school, address, password, API key, photo, or private family information into a project or public post.
- A grown-up can help with setup and safety without taking over the learner's choices. Celebrate a good question, a surprising result, and a thoughtful decision to simplify—not just finished features.

The 30-day plan is a separate, optional professional sprint for experienced adult developers. It is not the recommended route through this course. Days 71–77 and the reference material are optional curiosities; you can skip them without missing the main learning goals.

---

## 0. A first picture of how language models work

**An AI builder makes useful things with models other people have trained—and learns to test what those models say and do.**

An AI model is not a person or an oracle. It is a computer program that learned patterns from examples. It can produce helpful answers, but it can also make things up. We will investigate how, rather than ask you to take anyone's word for it.

### A first picture of what a language model does

1. **A learned recipe:** A trained model contains a huge collection of numbers that capture patterns from its training. When you ask a question, the numbers do not update; the model uses what it learned to make a response.
2. **Text becomes numbered pieces:** Before the model handles text, a tokenizer divides it into small pieces called *tokens*. A piece might be a whole common word or just part of a rarer word. We will inspect examples rather than pretend every word becomes one piece.
3. **One piece at a time:** The model estimates which next token would fit, chooses one, and repeats. This is why the result can sound convincing without being guaranteed true. The technical details—probabilities, logits, and sampling—come later, after the basic experiment makes sense.
4. **A limited reading space:** A model can only handle a certain amount of text in one go. That limit is called its *context window*. Some services charge for the text they process; an adult should help manage any paid account.
5. **A helper with a book:** If a model needs facts from a set of notes, our program can search those notes and show useful passages alongside the question. This is retrieval-augmented generation, or RAG. The model still needs to use the passages carefully, and we will test whether it did.

The useful habit is simple: ask what evidence supports an answer, try examples that might break it, and never mistake confidence for proof.

Your job as a learner is to make small systems that are helpful, understandable, and safe—and to improve them when experiments reveal a problem.

### The journey: from first experiments to a thoughtful project

| Phase | What you will explore | Optional deep dives for later |
|---|---|---|
| **Weeks 1–4: Get curious** | Python and the terminal, asking a model questions, giving it a shape for its answers, and seeing how small programs can work together. | Memorizing jargon, rushing through setup, or paying for services without adult help. |
| **Weeks 5–8: Give it useful things to read** | Turn a topic you chose into searchable notes, compare ways to find a useful passage, and check whether answers match their sources. | Production-sized databases, enterprise-scale performance tuning, and advanced ranking mathematics. |
| **Weeks 9–12: Make it careful** | Let a model use a few safe tools, test tricky cases, improve your project, and explain what it can and cannot do. | Public deployment, real customer data, expensive hardware, and career-interview drills. |
| **Optional challenge days** | Explore open models, model shrinking, reliability, and project presentation with adult guidance. | Treating advanced topics as required knowledge or a measure of talent. |

### The key habit: test your ideas

AI answers can change, so one successful example is not enough. Make a small set of questions, decide what a useful answer looks like, and try the same questions after each change. This is called evaluation. It is a way to learn from evidence, not a test you can fail.

**A good experiment:** Change one thing, keep a note of what you expected, and compare the result with the old version. Use the short, plain-language missions as the core path; any technical API, cloud, or production detail is an optional adult/pro extension.

- **Choose a question:** What should your project help someone do?
- **Make a few examples:** Write questions and note which source passage should help answer each one.
- **Compare fairly:** Change one thing at a time and record whether answers became more useful, less useful, or simply different.

---

## 1. The course at a glance: from first experiments to a project of your own

```
Weeks 1–4: Get curious — learn enough Python to make small programs, ask a model questions, and test how instructions change its answers.
Weeks 5–8: Find helpful clues — make a small collection of notes searchable and see whether good sources help the model answer carefully.
Weeks 9–12: Make it careful — give the project a few safe tools, explore privacy and mistakes, and improve something you chose.
Optional challenge days: explore advanced ideas if they interest you. They are invitations, not requirements.
```

---

## 2. How to learn in this course

1. **Go at your own pace.** “Day” means one lesson, not one deadline. Take breaks, split a lesson across sessions, or repeat it.
2. **Be curious before being correct.** Guess what will happen, try it, and compare. A surprising result is useful evidence.
3. **Explain ideas in your own words.** Draw a picture, tell a story, or write a few sentences. It is fine if the first explanation is incomplete.
4. **Keep an experiment notebook.** Note what you tried, what happened, and what you still wonder. A failed experiment is still a result.
5. **Choose a theme you care about.** Use imaginary characters, public facts, or material a trusted adult has approved. You can change the theme at any time.
6. **Make small versions first.** A tiny program you understand is a stronger start than a giant project copied from instructions.
7. **Ask a trusted adult before accounts, downloads, online services, spending, or sharing.** Never put passwords, API keys, real names, school details, photos, addresses, or private family information into a project.
8. **Use the memory games when they help.** They are optional practice, not a daily test or streak you must maintain.
9. **Celebrate the questions and discoveries.** Finishing is nice; noticing a problem, asking why, and deciding what to try next are part of the work too.

---

## 3. Choose a safe starting setup with a trusted adult

| Layer | Standard Choice | Why |
|---|---|---|
| **First language** | Python and a local editor | Start with examples the learner can run and change. Ask an adult before installing tools. |
| **Model** | Offline examples first; an adult-approved service if needed | Do not create accounts, enter API keys, or spend money without a trusted adult. |
| **Project data** | Fictional notes, public facts, or adult-approved material | Never use private family, school, account, or identifying information. |
| **Search** | A short Python list, then a local index if useful | Learn what search is doing before choosing a database. |
| **Safety** | Small permissions, fake examples, and human checks | A prompt or label alone cannot guarantee that a model is safe. |
| **Sharing** | Private demonstration first | Public publishing is optional and needs adult agreement and review. |

---

<!-- BEGIN GENERATED DAYS -->

<!-- Generated from site/course-data.js by scripts/build_plan.py — do not edit
     this region by hand. Edit the data file and run `make plan`. -->

## Week 1 — Start Here: Python, Projects & Asking Good Questions
*Days 1–7*

**Outcome: "I can run a small Python project, make a change safely, and explain what I learned in my own words."**

### Day 1 — Meet the terminal: giving your computer tiny instructions
- [ ] With a trusted adult, open the coding workspace and find where your project files live
- [ ] Run a tiny Python instruction and change one word or number to see what changes
- [ ] Learn what a folder, file, and error message are by exploring a pretend project
- [ ] **Build:** a tiny program that introduces your made-up character, creature, or robot
- [ ] **Done when:** You can run your program, change it, and explain what one line does.

### Day 2 — Python recipes: names, values, and simple functions
- [ ] Store a name, number, or sentence in a variable and print it back
- [ ] Use an if/else choice to make your program react to different answers
- [ ] Turn repeated instructions into a function with a name you choose
- [ ] **Build:** a short quiz about a topic you like, with at least two possible responses
- [ ] **Done when:** Your quiz runs twice with different answers, and you can point out its choice and function.

### Day 3 — Make a small collection and explore it with a loop
- [ ] Put a few made-up facts, creatures, or objects into a Python list
- [ ] Use a loop to show each item without copying the same instruction many times
- [ ] Count the items and find one that matches a simple rule
- [ ] **Build:** a tiny explorer that displays and counts entries in your collection
- [ ] **Done when:** You can add an item and explain how the loop visits each entry.

### Day 4 — Save versions: how to undo a change safely
- [ ] Make a copy of a tiny project before changing it; compare the old and new versions
- [ ] Use the editor's undo and save features, and talk through what each one does
- [ ] Ask an adult to show how a version history remembers earlier snapshots
- [ ] **Build:** make one planned change, save a named version, then return to the earlier version with adult help
- [ ] **Done when:** You can find an earlier saved version and describe why keeping copies helps.

### Day 5 — Be a program detective: try examples that might break it
- [ ] Write down what you expect your quiz or explorer to do before you run it
- [ ] Try an ordinary answer, an empty answer, and a surprising answer
- [ ] When something goes wrong, read the error slowly and change one thing at a time
- [ ] **Build:** a short list of three tests another person can try on your program
- [ ] **Done when:** You found one surprising result, fixed it or explained it, and saved your three tests.

### Day 6 — Turn your small program into a mini-game
- [ ] Give your program a goal, such as guessing a number or choosing a creature
- [ ] Add a score, clue, or second round using ideas from earlier days
- [ ] Ask someone to try it and notice where they hesitate
- [ ] **Build:** a playable little game or interactive story in Python
- [ ] **Done when:** Someone else can play your game and tell you what they think its goal is.

### Day 7 — Checkpoint: show your first Python creation
- [ ] Choose one favorite part of your game and make it easier to understand
- [ ] Draw the steps your program follows from start to finish
- [ ] Show it privately to someone you trust, or simply save it for yourself
- [ ] Rest and choose one question you want to explore next
- [ ] **Done when:** You can show or describe your creation and name one thing you learned.

---

## Week 2 — How Programs Talk: Web Requests, Waiting & Helpful Errors
*Days 8–14*

**Outcome: "I can send a program a request, understand its reply, and make my project handle common problems safely."**

### Day 8 — How websites talk: send a question, get a reply
- [ ] Use a picture or pretend example to see a browser ask a website for information
- [ ] Learn that a request is a question and a response is the reply; status numbers are clues about what happened
- [ ] Try a safe, public example with an adult, or act out the request and response with paper cards
- [ ] **Build:** a small Python program that shows a pretend request, response, and status clue
- [ ] **Done when:** You can explain the question/reply idea and name one clue that a request did not work.

### Day 9 — Keep secrets secret: passwords and private information
- [ ] Spot private information in examples and replace it with clearly made-up details
- [ ] Learn that a password or API key is like a key to a locked room—never paste one into a lesson or chat
- [ ] Ask a trusted adult before using an online service, making an account, or installing a tool
- [ ] **Build:** a pretend secret-spotting game that marks fake passwords in sample text
- [ ] **Done when:** You can identify three kinds of private information and explain who to ask before sharing anything.

### Day 10 — Waiting without getting stuck: what programs do while they wait
- [ ] Compare a program that waits doing nothing with one that can do a second small task
- [ ] Use a kitchen timer or pretend message delivery to model waiting for a reply
- [ ] Learn that some Python tools can wait politely instead of freezing everything
- [ ] **Build:** a tiny two-task demonstration that prints what it does while waiting
- [ ] **Done when:** You can explain the difference between waiting and doing a useful second task.

### Day 11 — Give your project a simple doorway
- [ ] Learn what a doorway (an interface) lets another part of a program ask your project
- [ ] Sketch the input your project needs and the kind of answer it should return
- [ ] Try a local example; any online setup or account needs adult help and approval
- [ ] **Build:** a simple function that accepts a pretend question and returns a clear answer
- [ ] **Done when:** You can show what goes in and what comes out of your function.

### Day 12 — What if the reply is late or missing?
- [ ] Imagine asking a question and not getting an answer right away; decide what your program should do
- [ ] Try a pretend slow reply and a pretend missing reply without contacting a real service
- [ ] Add a friendly message and a safe way to try again
- [ ] **Build:** a small example that handles a successful answer and a missing answer differently
- [ ] **Done when:** Your program stays understandable when a reply is late or missing.

### Day 13 — Retry kindly: don’t ask again and again too fast
- [ ] Model what happens when many people knock on the same door at once
- [ ] Compare trying every second with waiting a little longer between tries
- [ ] Set a small retry limit so your program can stop and explain what happened
- [ ] **Build:** a pretend helper that waits between tries and then gives a friendly stop message
- [ ] **Done when:** You can explain why waiting between tries is kinder and why a retry limit matters.

### Day 14 — Checkpoint: make your program handle a missing reply
- [ ] Put together your pretend request, reply, and friendly error message
- [ ] Try one example that works and one where no answer arrives
- [ ] Ask a trusted adult to review any optional account or online setup
- [ ] **Done when:** Your practice program can send a pretend request, read the reply, and explain one kind of error it might receive.

---

## Week 3 — Talking to AI: Patterns, Prompts & Text Pieces
*Days 15–21*

**Outcome: "I can try different instructions, notice how an AI answer changes, and understand that models use numbered pieces of text."**

### Day 15 — Meet a language model: a pattern guesser, not an oracle
- [ ] Learn that a language model guesses likely next pieces of text from patterns it learned
- [ ] Ask two made-up questions and compare the answers
- [ ] Notice that a confident answer can still be wrong or change when the wording changes
- [ ] **Build:** a small experiment card with your question, what you expected, and what happened
- [ ] **Done when:** You can explain that a model guesses likely next pieces of text and may give different answers to the same question.

### Day 16 — Why a model sometimes misses letters and tiny details
- [ ] Explore how text is divided into pieces called tokens; a piece can be a whole word or part of one
- [ ] Try asking a model to count letters in "strawberry" and check its answer yourself
- [ ] Compare a word as one piece, several pieces, or separate letters
- [ ] **Build:** a little example showing why a computer program can count letters more reliably
- [ ] **Done when:** You can explain that tokens are pieces of text and that any online account or spending needs adult approval.

### Day 17 — Give clear instructions and compare the answers
- [ ] Ask for an answer with a clear goal, audience, and shape
- [ ] Add one made-up example to show the kind of response you want
- [ ] Change only one instruction and compare the result
- [ ] **Build:** a small set of two prompts and notes describing how the answers differed
- [ ] **Done when:** You have two versions of an instruction and notes on how their answers changed.

### Day 18 — How much can a model read at once? ⭐
- [ ] Try a short question and a longer set of notes; notice how much information the model is given
- [ ] Learn that a model has a limit on how much text it can consider at once
- [ ] Notice that a longer prompt is not automatically a better prompt
- [ ] **Try:** choose only the notes that seem useful for one pretend question
- [ ] **Done when:** You can explain that a model has a limit on how much text it can consider at once.

### Day 19 — Models can work with pictures too
- [ ] Use an adult-approved picture or a drawing you made yourself; do not upload personal photos
- [ ] Ask what a picture model notices and compare that with what you can see
- [ ] Check carefully: a model may miss an object or describe something incorrectly
- [ ] **Build:** write down one thing it noticed and one thing you corrected
- [ ] **Done when:** You can describe one thing a picture model noticed and one detail you checked yourself.

### Day 20 — Keep a notebook of your experiments
- [ ] Write your question and prediction in a notebook before trying it
- [ ] Record the answer and whether it matched what you expected
- [ ] Change one thing, try again, and compare the result
- [ ] **Build:** an experiment notebook with two observations and a new question
- [ ] **Done when:** You have a notebook showing what you tried, what happened, and what you might test next.

### Day 21 — Checkpoint: a prompt experiment you can explain
- [ ] Choose a topic you like and compare two clear instructions using made-up examples
- [ ] Write down what you expected and what the model did
- [ ] Ask whether a detail needs checking instead of assuming the answer is true
- [ ] **Done when:** You can compare two instructions using made-up examples and describe what changed. Keep the project private unless a trusted adult helps you share it safely.

---

## Week 4 — Getting Useful Answers: Shapes, Streams & Mistakes
*Days 22–28*

**Outcome: "I can ask for a predictable answer shape, watch an answer arrive piece by piece, and plan for things going wrong."**

### Day 22 — Ask for answers in a shape your program can use ⭐
- [ ] Ask for a pretend answer with a few parts, such as a creature's name, habitat, and special skill
- [ ] Compare a free-form answer with one that follows your chosen shape
- [ ] Notice that a neat shape does not prove the facts are true
- [ ] **Build:** a small made-up creature card with the fields you chose
- [ ] **Done when:** Your pretend answer has the shape you asked for, and you can spot one part that does not fit.

### Day 23 — Check an answer and help fix its shape
- [ ] Remove one part from a pretend answer and see whether you notice
- [ ] Tell the program which part is missing in a friendly, clear way
- [ ] Try again once, then stop if the shape is still not right
- [ ] **Build:** a checker that notices a missing field in a made-up card
- [ ] **Done when:** You can spot an answer with a missing part and explain how to fix it.

### Day 24 — Watch an answer arrive a little at a time
- [ ] Imagine a sentence appearing word by word instead of all at once
- [ ] Use paper cards to reveal a pretend answer one piece at a time
- [ ] Compare how it feels to wait for the whole answer versus seeing it grow
- [ ] **Build:** a tiny local demonstration that prints a sentence in pieces
- [ ] **Done when:** You can explain why seeing a response arrive in pieces can feel different from waiting for all of it.

### Day 25 — Make a backup plan for when a model is unavailable
- [ ] List what your project should do if an answer does not arrive
- [ ] Choose a helpful message and a safe stop instead of trying forever
- [ ] Use pretend failures; do not create accounts or spend money for this lesson
- [ ] **Build:** add a friendly unavailable message to a local example
- [ ] **Done when:** Your project gives a friendly message and stops safely when its helper is unavailable.

### Day 26 — Test with pretend answers before using real services
- [ ] Write down a few pretend answers your program might receive
- [ ] Check what happens with a normal answer, a missing part, and a confusing answer
- [ ] Repeat the same examples after you make a change
- [ ] **Build:** a small offline test list for your project
- [ ] **Done when:** You can test the project without spending money or sending real information anywhere.

### Day 27 — Keep your project easy to run again
- [ ] Write simple steps for opening and running your local project
- [ ] Add one clear note about what the project cannot do yet
- [ ] Ask an adult before installing new tools or putting anything online
- [ ] **Build:** a small run-it-again guide with a drawing
- [ ] **Done when:** Your program handles an example input and a pretend failure without crashing. Public deployment is an optional adult-supported extension.

### Day 28 — Checkpoint: your first AI-powered experiment
- [ ] Choose a small task for your helper, such as sorting or explaining made-up facts
- [ ] Try three examples and note where the answer shape helped
- [ ] Keep the project local and private unless a trusted adult reviews sharing
- [ ] **Done when:** You can show how your small helper works, test it with a few examples, and explain one limitation.

---

## Week 5 — Making Notes Searchable: Meaning, Maps & Chunks
*Days 29–35*

**Outcome: "I can turn a small collection of chosen notes into useful searchable pieces and explain how a computer guesses which pieces are related."**

### Day 29 — How computers compare meanings with number arrows
- [ ] Represent each pretend note with a simple list of numbers that gives it a location on a page
- [ ] Draw notes about similar topics near each other and very different topics farther apart
- [ ] Compare which note is nearest to a question's pretend number list
- [ ] **Build:** a paper or Python example that finds a nearby note
- [ ] **Done when:** You can explain the number-arrow idea and notice when two notes about a similar topic appear near each other.

### Day 30 — When similar-sounding ideas fool a search
- [ ] Ask meaning-search about a topic and see what nearby notes appear
- [ ] Try a question with the word 'not' or an exact made-up code and notice if search misses it
- [ ] Add exact-word search as a second clue
- [ ] **Build:** one example where each search method helps in a different way
- [ ] **Done when:** You have an example where meaning-search misses an exact word, and can explain why exact-word search might help.

### Day 31 — Turn notes into small, useful pieces
- [ ] Choose a few short, made-up notes about a topic you like
- [ ] Split a long note into smaller pieces while keeping each idea together
- [ ] Add a title so you can tell what each piece is about
- [ ] **Build:** a tiny searchable collection from your notes
- [ ] **Done when:** You can show how you split a note while keeping its important idea together.

### Day 32 — Choose where each note should be split
- [ ] Try splitting a paragraph in the middle of an idea and notice what becomes confusing
- [ ] Try splitting at the end of a complete thought
- [ ] Add the title or topic to each piece so it makes sense on its own
- [ ] **Build:** compare two note-splitting plans and choose the clearer one
- [ ] **Done when:** You can compare two ways of splitting notes and explain which keeps the idea clearer.

### Day 33 — Notice when a note has changed
- [ ] Change one pretend note and notice which search result should change
- [ ] Keep track of the note's title and the version you last used
- [ ] Remove a pretend note and make sure the search no longer shows it
- [ ] **Build:** a tiny before-and-after list showing what changed
- [ ] **Done when:** You can explain why reusing an unchanged result can save work.

### Day 34 — Search notes or give the model all the notes? ⭐
- [ ] Try giving a pretend helper all five notes, then try giving it only the best two
- [ ] Compare whether the shorter set makes the useful clue easier to notice
- [ ] Notice that more information is not always more helpful
- [ ] **Try:** choose which notes belong with one made-up question
- [ ] **Done when:** You can explain one reason to search a library instead of handing every note to the model.

### Day 35 — Organize your project's small library
- [ ] Give each pretend note a short title and keep related notes together
- [ ] Check that each note can be understood without the rest of the collection
- [ ] Write down how your small library is organized
- [ ] **Done when:** Your small collection is organized into notes your program can search.

---

## Week 6 — Finding the Right Clue: Search, Keywords & Ranking
*Days 36–42*

**Outcome: "I can compare word-matching and meaning-matching search, combine their clues, and see whether the right passage moves nearer the top."**

### Day 36 — Find nearby ideas with a simple local search
- [ ] Search through a short local list of your pretend notes
- [ ] Return the closest few notes instead of the entire collection
- [ ] Keep a title and a source note beside each result
- [ ] **Build:** a simple local search for your small library
- [ ] **Done when:** You can show a local search finding a note that is related to a question.

### Day 37 — Search for an exact word
- [ ] Search for the exact words in a question
- [ ] Try an unusual made-up code or name that meaning-search may not understand
- [ ] Compare the exact-word result with the closest-meaning result
- [ ] **Build:** a short example showing when matching the exact word helps
- [ ] **Done when:** You can show how exact-word search finds a word that meaning-search might miss.

### Day 38 — Use meaning and exact words together ⭐
- [ ] Put the meaning-search and exact-word results side by side
- [ ] Give a point for each method when it finds a useful note
- [ ] Combine the clues from both methods into one list
- [ ] **Build:** a simple combined list and explain why one note came first
- [ ] **Done when:** You can compare the results from meaning-search, exact-word search, and a combination.

### Day 39 — Sort search results so the best clue comes first
- [ ] Make a small list of search results and choose which seems most useful for the question
- [ ] Move a good clue higher when it directly answers the question
- [ ] Compare your new order with the original search order
- [ ] **Build:** show a before-and-after list and explain what changed
- [ ] **Done when:** You can move a useful note higher in your results and explain the clue you used.

### Day 40 — Try asking the same question in another way
- [ ] Take a vague question and rewrite it with one extra helpful detail
- [ ] Try two ways to ask the same pretend question
- [ ] Compare which wording helped your search find the note
- [ ] **Build:** a small list of clearer questions and the clues they found
- [ ] **Done when:** You can rewrite a vague question more clearly and see whether the search finds a better note.

### Day 41 — Keep each pretend library separate
- [ ] Make two pretend libraries with different made-up notes
- [ ] Give each library its own label and only search inside the chosen one
- [ ] Try a question in each library and check that the notes stay separate
- [ ] **Build:** draw how your program keeps the two pretend collections apart
- [ ] **Done when:** You can explain why pretend libraries should not accidentally show each other's notes.

### Day 42 — Notice where your search spends its time
- [ ] Try the same search a few times and notice where it seems to wait
- [ ] Measure with a simple timer if you want; an exact speed target is not needed
- [ ] Guess which step takes longest and check your guess
- [ ] **Done when:** You have noticed which part of your small search takes the longest.

---

## Week 7 — Checking Answers: Evidence, Fair Tests & Improvements
*Days 43–49*

**Outcome: "I can make a small fair test, check whether answers use the right evidence, and compare one change with the previous version."**

### Day 43 — Make a small answer key to test your search ⭐
- [ ] Choose five questions about your pretend library and write which note should help answer each one
- [ ] Include an easy question, a tricky question, and one question whose answer is not in your notes
- [ ] Try each question and mark whether search found the note you expected
- [ ] **Build:** make a small answer key you can use again after changing your search
- [ ] **Done when:** You have five test questions and can compare search results with your answer key.

### Day 44 — Count how often search finds the right note
- [ ] Count how many of your five questions found the note you expected
- [ ] Notice whether the right note appeared first or further down the list
- [ ] Compare your simple search with a version that also looks for exact words
- [ ] **Build:** a tiny scorecard with one row per question
- [ ] **Done when:** You can say which search worked better on your examples and show the evidence.

### Day 45 — Check whether answers match the notes
- [ ] Choose one sentence in an answer and look for the note that supports it
- [ ] Find a sentence that is not in any of your notes
- [ ] Try asking your helper to say when it does not know
- [ ] **Build:** a two-column table: answer sentence and supporting note
- [ ] **Done when:** You can find one sentence that is supported by a note and one that is not.

### Day 46 — Let a program repeat your tests for you
- [ ] Evaluation runner architecture: Golden Dataset -> Pipeline Runner -> Metric Judge -> Aggregator -> Scorecard
- [ ] Async batch execution: evaluating 40 questions concurrently with semaphore concurrency limits to avoid provider rate limits
- [ ] Telemetry artifact generation: outputting formatted markdown comparison tables and committing JSON evaluation runs to git
- [ ] **Build:** author a standalone CLI command `python3 eval.py` that executes the full benchmark and displays a summary scorecard
- [ ] **Done when:** Your program can repeat a few tests and show which ones worked.

### Day 47 — Show which note supports each answer
- [ ] Show the title of the note that helped answer a question
- [ ] Check that the answer really matches that note
- [ ] When no note contains the answer, say that you do not know yet
- [ ] **Build:** an answer that names its clue
- [ ] **Done when:** An answer can point to a note, and you can check whether the note really supports it.

### Day 48 — Check that a change did not make search worse
- [ ] Keep your small answer key from Day 43
- [ ] Try it again after changing your search
- [ ] Notice if a change helped one question but made another harder
- [ ] **Build:** a before-and-after scorecard with a few questions
- [ ] **Done when:** You can compare before and after a change and catch when a helpful answer disappears.

### Day 49 — Checkpoint: a searchable library that shows its clues
- [ ] Show how your small library answers a few pretend questions
- [ ] Point to the note that supports one answer and identify one answer that needs checking
- [ ] Keep the project private unless an adult reviews sharing
- [ ] **Done when:** You can compare a few search examples and explain which one found a useful passage.

---

## Week 8 — Giving AI Safe Tools: Tiny Actions & Clear Limits
*Days 50–56*

**Outcome: "I can let a model ask for a small, safe action, decide what my program is allowed to do, and stop the loop when it should."**

### Day 50 — Let a program use one small, safe tool
- [ ] Give your pretend helper one tool that can look up a made-up fact
- [ ] Draw what information the tool receives and what answer it returns
- [ ] Keep the tool read-only: it cannot send, delete, buy, or publish anything
- [ ] **Build:** a tiny local lookup tool with one clearly described job
- [ ] **Done when:** You can explain what the tool is allowed to do and what it must not do.

### Day 51 — Help your tool recover from a mistake
- [ ] Give your tool an input it cannot understand and notice what happens
- [ ] Show a kind message instead of a confusing error
- [ ] Let the person try again once, then stop safely
- [ ] **Build:** make the tool explain what kind of input it can use
- [ ] **Done when:** Your tool gives a clear message when it receives something it cannot use.

### Day 52 — Give a helper clear steps and a stopping point
- [ ] Draw a short list of steps for a pretend helper to follow
- [ ] Choose one clear point where it should stop
- [ ] Try a made-up example and see whether the steps are easy to follow
- [ ] **Build:** a helper plan that can read a pretend note and answer one question
- [ ] **Done when:** Your helper follows a short plan and stops when it reaches the end.

### Day 53 — A shared plug shape for tools (optional idea) ⭐
- [ ] Optional curiosity: imagine a shared plug that helps different programs connect to tools
- [ ] Draw two programs and a tool with the shared plug between them
- [ ] This is an idea to explore, not a setup you need to install
- [ ] **Try:** explain why shared shapes can make connections easier
- [ ] **Done when:** You can explain that a shared tool format helps different programs connect. You can skip this optional idea.

### Day 54 — Connect a pretend helper to your project
- [ ] Draw how a pretend helper might ask a program to use a safe tool
- [ ] Label what the helper can ask and what it must not be allowed to do
- [ ] No account or online connection is needed for this activity
- [ ] **Try:** explain why the tool should only do its small allowed job
- [ ] **Done when:** You can draw how a pretend helper might connect to your project; no account or online connection is needed.

### Day 55 — Use a plan instead of letting a helper wander ⭐
- [ ] Draw a flowchart for a helper with a few clear steps
- [ ] Add a check that decides whether the answer is good enough or needs a human look
- [ ] Compare your plan with a helper that is allowed to choose any next step
- [ ] **Build:** explain why your planned version is easier to understand
- [ ] **Done when:** You can explain why clear steps and a stopping point make a helper easier to understand.

### Day 56 — Checkpoint: a helpful guide to your chosen topic
- [ ] Choose a topic and prepare a small set of pretend notes about it
- [ ] Ask a few questions and check whether the guide shows useful clues
- [ ] Keep the project private unless a trusted adult reviews sharing
- [ ] **Done when:** Your guide can find a useful note and show where an answer came from.

---

## Week 9 — When Inputs Try to Trick You: Privacy & Safe Experiments
*Days 57–63*

**Outcome: "I can recognize tricky instructions in untrusted text, protect private information, and explain why no single prompt trick makes an AI perfectly safe."**

### Day 57 — Tricky notes: when text tries to boss the AI around ⭐
- [ ] Read a harmless pretend note that says, 'Ignore the question and do something else.'
- [ ] Notice that a model may treat text inside a note as an instruction, even when it should just read it
- [ ] Try a few made-up tricky notes and compare what your project does
- [ ] **Build:** make a short list of safe tests and ask whether each answer followed the actual question
- [ ] **Done when:** You can explain why notes from outside your project should not automatically get to control its tools.

### Day 58 — Keep private details out of your project
- [ ] Use made-up names and pretend details in every example
- [ ] Practice spotting a name, address, password, school, or private photo that should not be shared
- [ ] Ask a trusted adult before using online tools or sending any information anywhere
- [ ] **Build:** replace private-looking details in a pretend paragraph with safe placeholders
- [ ] **Done when:** You can spot several kinds of private information and replace them with pretend details.

### Day 59 — Labels can help organize text, but they are not magic shields
- [ ] Try adding a label around made-up notes to show which words came from somewhere else
- [ ] Compare what happens with and without the label
- [ ] Remember: labels and instructions can help, but they cannot promise that a model will behave safely
- [ ] **Build:** try labels around fake instructions and explain why they may help but cannot guarantee safety
- [ ] **Done when:** You can show that labels may help organize text but cannot guarantee an AI will ignore every tricky instruction.

### Day 60 — Give tools only the tiny jobs they need
- [ ] List exactly what your pretend tool can read or change
- [ ] Make the tool read-only for this lesson: it can look up a made-up fact but cannot send, delete, buy, or publish anything
- [ ] Try a tricky pretend request and check whether the tool stays within its small job
- [ ] **Build:** a diagram showing the tool's one allowed job and the jobs it must refuse
- [ ] **Done when:** You can explain why a tool should get only the smallest permissions it needs.

### Day 61 — Ask a trusted person before anything important happens
- [ ] Sort pretend actions into safe-to-look-at and ask-first groups
- [ ] Practice pausing before sharing, changing, deleting, buying, or sending anything
- [ ] Write down who the trusted adult is for your project
- [ ] **Build:** make a clear stop sign in your project for anything outside its small safe job
- [ ] **Done when:** You can name actions that should stop and wait for an adult's help.

### Day 62 — Try harmless tricky examples and notice what goes wrong
- [ ] Try three harmless, made-up notes that give confusing or conflicting instructions
- [ ] See whether your helper follows your real question or gets distracted by the note
- [ ] Write down what happened without including private information
- [ ] **Build:** choose one small change that could make the project clearer or safer
- [ ] **Done when:** You have three safe examples and can explain one limit of your project.

### Day 63 — Remember safety checks when you make changes
- [ ] Choose one safety check from your earlier notes and try it again
- [ ] Make one small improvement, then test the same examples
- [ ] Remember that tests can find problems but cannot prove a project is perfectly safe
- [ ] **Done when:** You can show one safety check you repeat after changing your project.

---

## Week 10 — Learning from Runs: Notes, Feedback & Troubleshooting
*Days 64–70*

**Outcome: "I can keep a simple record of what my project did, find a pattern in mistakes, and choose one useful improvement."**

### Day 64 — Draw a map of what your program does ⭐
- [ ] Draw each step from a question to your project's answer
- [ ] Mark where the program reads notes, searches, or asks a model
- [ ] Circle a step where something could go wrong and add a check
- [ ] **Build:** a map another person can follow to understand your project
- [ ] **Done when:** You can use your map to explain the main steps and one place you would check carefully.

### Day 65 — Notice what works well and what feels slow or confusing
- [ ] Try your project with a few pretend questions and note which answers are useful
- [ ] Notice whether any part feels slow, confusing, or surprising
- [ ] If using an online service, ask an adult to check its settings and any possible cost first
- [ ] **Build:** a small table of what worked, what did not, and what you might change
- [ ] **Done when:** You can point to one useful result and one thing you might improve.

### Day 66 — Keep private information out of project notes
- [ ] Only use pretend examples in project notes and experiment logs
- [ ] Check that notes do not contain a real name, school, address, password, or private photo
- [ ] Ask a trusted adult before storing or sharing any information online
- [ ] **Build:** replace private-looking details in a pretend note with safe placeholders
- [ ] **Done when:** Your project notes use made-up examples and contain no private information.

### Day 67 — Look for patterns in pretend mistakes
- [ ] Collect a few pretend examples where your project gave a surprising result
- [ ] Group similar surprises together: missing note, confusing question, or answer not supported by a note
- [ ] Choose the group that seems easiest or most useful to improve first
- [ ] **Build:** draw a small chart showing the patterns you noticed
- [ ] **Done when:** You can name one pattern in your examples and choose a small improvement to try.

### Day 68 — Use helpful feedback to improve your project
- [ ] Ask someone you trust what they found clear or confusing when trying your project
- [ ] Listen for a specific example rather than only 'good' or 'bad'
- [ ] Decide which suggestion fits what you want your project to do
- [ ] **Build:** write down one piece of feedback and what you chose to do with it
- [ ] **Done when:** You have one useful suggestion and a reason for accepting or not accepting it.

### Day 69 — Turn a surprising result into a new test
- [ ] When an example surprises you, save a made-up version of it
- [ ] Add it to your small test list so you can try it again after changing the project
- [ ] Compare what happened before and after the change
- [ ] **Build:** turn one surprise into a new test question
- [ ] **Done when:** Your test list includes a question that once surprised you.

### Day 70 — Make a simple plan for when something goes wrong
- [ ] Write down what to do if the project gets stuck or gives a confusing answer
- [ ] Include a safe stop or reset step
- [ ] Name the trusted adult who can help with setup or sharing questions
- [ ] **Build:** add a short help note to your project
- [ ] **Done when:** Someone you trust can find a safe way to stop or reset your project.

---

## Week 11 — Optional Deep Dive: Models on Your Computer
*Days 71–77*

**Outcome: "With adult help and suitable hardware, I can explore a model that runs locally and describe what shrinking a model changes."**

### Day 71 — An optional peek at a model that runs on your computer
- [ ] Why self-host: data sovereignty, zero external API latency, regulatory compliance, and offline operational guarantees
- [ ] Running open models (Llama 3.1 8B, Qwen 2.5, Mistral 7B) locally on Apple Silicon or Linux GPUs using Ollama and llama.cpp
- [ ] Interacting via OpenAI-compatible REST endpoints (`http://localhost:11434/v1`) using standard client libraries
- [ ] **Build:** point your Week 4 extraction pipeline to a locally hosted open model and execute an extraction completely offline
- [ ] **Done when:** With adult help, you tried a local model and can describe one thing it did differently. This challenge is optional.

### Day 72 — Optional: how busy computers share their memory
- [ ] The multi-user bottleneck: why naive HuggingFace pipelines choke and run out of GPU memory under concurrent traffic
- [ ] PagedAttention mechanics: managing Key-Value (KV) cache memory like OS virtual memory pages to eliminate memory fragmentation
- [ ] Continuous batching: dynamically pairing incoming and completing token sequences to maximize GPU tensor core utilization
- [ ] **Build:** deploy an open model with vLLM and benchmark throughput under concurrent load against a standard inference baseline
- [ ] **Done when:** You can use a drawing to explain one way computers share limited memory. This challenge is optional.

### Day 73 — Optional: how computers make models smaller
- [ ] Quantization math: compressing 16-bit floating-point weights into 4-bit integer representations (AWQ, GPTQ, GGUF)
- [ ] The physical memory equation: calculating exact GPU VRAM requirements: $\text{VRAM} = (\text{parameters} \times \text{bytes\_per\_weight}) + \text{KV\_cache}$
- [ ] Measuring perplexity degradation: evaluating reasoning loss across 4-bit vs 8-bit vs 16-bit weight representations
- [ ] **Build:** run benchmark inference comparing memory usage, tokens per second, and perplexity across 4-bit and 8-bit quantized weights
- [ ] **Done when:** You can describe one trade-off when making a model smaller. This challenge is optional.

### Day 74 — Optional: teach a model with examples or clearer instructions? ⭐
- [ ] When fine-tuning is the winning move: enforcing rigid bespoke schemas, dropping latency by eliminating long prompts, or distilling large models
- [ ] When fine-tuning is an expensive trap: trying to inject dynamic factual knowledge (which is what RAG does) or working with <500 examples
- [ ] The total cost of ownership: data curation overhead, training compute costs, and perpetual model maintenance vs prompt iteration speed
- [ ] **Build:** author a technical decision matrix analyzing an enterprise use case and defend why fine-tuning is or is not justified
- [ ] **Done when:** You can explain one difference between changing instructions and changing a model with examples. This challenge is optional.

### Day 75 — Optional: make practice examples and check them carefully
- [ ] Teacher-student distillation: prompting a frontier model (Claude 3.5 Sonnet / GPT-4o) to generate diverse, high-quality instruction-response pairs
- [ ] Data quality filtering: applying LLM-as-a-judge heuristics, schema checks, and deduplication to purge low-quality or corrupt training rows
- [ ] Formatting datasets: converting raw data into standardized ChatML format stored as clean JSONL files
- [ ] **Build:** generate, filter, and validate a 300-example high-signal synthetic training dataset for a specialized extraction task
- [ ] **Done when:** You can describe why practice examples should be checked carefully. This challenge is optional.

### Day 76 — Optional: a small add-on that changes a model's style
- [ ] Low-Rank Adaptation (LoRA) mechanics: freezing multi-billion parameter base weights and training tiny rank decomposition matrices ($W = W_0 + B \cdot A$)
- [ ] Hyperparameter tuning: selecting Rank ($r=8, 16, 32$), Alpha scaling ($\alpha = 2r$), target projection modules, and learning rate schedules
- [ ] Executing a LoRA fine-tuning run on a hosted GPU instance (Unsloth, Modal, or RunPod) in under 30 minutes for less than $2.00
- [ ] **Build:** fine-tune an open 8B model (Llama 3.1 8B or Qwen 2.5 7B) on your custom dataset and export the trained LoRA adapter weights
- [ ] **Done when:** You can explain one way a small add-on might influence a model. This challenge is optional.

### Day 77 — Optional: compare two ways to change an answer
- [ ] Optional: choose a model idea that interests you and ask a trusted adult to help explore it
- [ ] Compare two made-up answers and decide which one better follows the same instruction
- [ ] Write down one thing that stayed the same and one thing that changed
- [ ] **Try:** draw or describe how training examples might influence a model's patterns
- [ ] **Done when:** You can explain one difference you noticed and one question you still have.

---

## Week 12 — Your Big Project: Make It Work, Explain It & Share Safely
*Days 78–84*

**Outcome: "I have improved a project I chose, tested it with examples, and can show or explain it safely to people I trust."**

### Day 78 — Plan a small project around a question you care about
- [ ] Choose a small job for your project, such as finding a fact in a story-world guide
- [ ] Draw the steps from a question to a helpful answer
- [ ] Choose fictional or public information for it to use
- [ ] **Build:** sketch a simple plan and ask an adult to check any setup that uses accounts or downloads
- [ ] **Done when:** You can explain what your project is for and show its main steps in a drawing.

### Day 79 — Connect the pieces you understand
- [ ] Connect the parts you understand: question, notes, search, and answer
- [ ] Show which note might support the answer
- [ ] Keep it on your own computer with pretend examples
- [ ] **Build:** try one question from beginning to end and write down what happened
- [ ] **Done when:** Your project can try one useful question and show a note that may help answer it.

### Day 80 — Try new examples and look for surprises
- [ ] Try your project with three different pretend questions
- [ ] Include one question you expect it to find difficult
- [ ] Notice where it takes longer or gives a less useful answer
- [ ] **Try:** change one small thing and compare again
- [ ] **Done when:** You can name one example that worked well and one that needs improvement.

### Day 81 — Write a friendly guide to your project ⭐
- [ ] List two things someone might find confusing when trying your project
- [ ] Write simple steps for trying it with pretend examples
- [ ] Add a note about what the project cannot do yet
- [ ] **Build:** make a one-page friendly guide with a picture or diagram
- [ ] **Done when:** You have a short note that tells someone you trust how to try your project and what to do if it gets stuck.

### Day 82 — Tell the story of your project ⭐
- [ ] Tell the story: what you wondered, what you made, and what happened
- [ ] Add one example that worked and one that surprised you
- [ ] Explain one limitation and one thing you would like to improve
- [ ] **Build:** write a short project story, draw it, or explain it to someone you trust
- [ ] **Done when:** Someone you trust can understand what your project does and what you learned from making it.

### Day 83 — Choose a question you still want to explore
- [ ] Look back through your experiment notes
- [ ] Choose one result that surprised you and try to explain why
- [ ] Draw or describe what you might test next
- [ ] **Try:** explain one idea to a curious friend or trusted adult
- [ ] **Done when:** You can choose one question about your project and explain what you know, what you are unsure about, and how you might find out.

### Day 84 — Show what you made: a project you can explain
- [ ] Choose one small part of your project you would like to show
- [ ] Try it with a few pretend examples and note what happens
- [ ] Draw a simple picture showing how a question becomes an answer
- [ ] Celebrate the project, including the parts you are still figuring out
- [ ] **Done when:** You can demonstrate your project privately or share it with a trusted adult, and explain one thing you are proud of and one thing you would improve.

---

## Week 13 — Optional Challenges: What Else Can Your Project Do?
*Days 85–90*

**Outcome: "I can choose a challenge that interests me, test a project under new conditions, and decide what I want to explore next."**

### Day 85 — Optional: what should happen if a helper is unavailable?
- [ ] Optional: imagine what your project should do if its helper is unavailable
- [ ] Add a friendly message explaining that it cannot answer right now
- [ ] Try a simple pretend failure in a local example
- [ ] **Try:** draw what the learner should see when something goes wrong
- [ ] **Done when:** You have a friendly message for when your project cannot answer.

### Day 86 — Optional: compare how long two versions take
- [ ] Optional: compare how long two pretend versions of your program take
- [ ] Guess which step takes the longest, then measure it
- [ ] Try one small change and compare again
- [ ] **Try:** draw a simple before-and-after chart
- [ ] **Done when:** You can describe what changed and whether your guess about speed was right.

### Day 87 — Add a friendly help note for your project
- [ ] Imagine three ways your project might get confused
- [ ] Write a calm note describing what to try if one happens
- [ ] Make sure the project cannot spend money or change real information by itself
- [ ] **Try:** add a friendly help or reset instruction
- [ ] **Done when:** Someone you trust can follow your guide to try the project and reset it safely.

### Day 88 — Draw how your project works
- [ ] Draw the path from a question to the answer your project gives
- [ ] Label any notes, search, or model steps that are involved
- [ ] Circle one place where the project could make a mistake
- [ ] **Try:** explain the drawing in your own words
- [ ] **Done when:** You can explain the main steps in your project and point to one place that needs careful checking.

### Day 89 — Optional: improve one small thing
- [ ] Optional: choose one part of your project to make a little clearer or more useful
- [ ] Try a new made-up example and see what happens
- [ ] Ask someone you trust what they find confusing
- [ ] **Try:** improve one small thing, or decide it is good enough for now
- [ ] **Done when:** You tried one new idea and can say what you learned, even if you decide not to keep the change.

### Day 90 — Celebrate, reflect & choose your next question
- [ ] Show your project privately to someone you trust, or keep it for yourself
- [ ] Explain one thing you learned and one question you still have
- [ ] Choose one question you want to explore next, then draw or write down how you might investigate it
- [ ] Celebrate what you made, what surprised you, and what you want to discover next
- [ ] **Done when:** You have followed your curiosity, built something you understand, and chosen a next question to explore. The optional challenges can be skipped or revisited any time.

<!-- END GENERATED DAYS -->

---

## 4. Optional Curious Extras: Questions to Explore

These are questions for an adult practitioner or a learner who has already mastered the main path and wants a serious technical stretch. They are deliberately advanced, may involve paid or online systems, and are not assignments or a measure of ability. A gifted learner should get more room to investigate—not be expected to perform a professional engineering job.

1. **RAG vs. Fine-Tuning vs. Long-Context Prompt Caching:** How do you choose between them for a dynamic enterprise dataset of 500,000 pages? Break down the physical cost, latency, and knowledge update velocity trade-offs.
2. **BPE Tokenization Mechanics:** Why does a frontier model stumble when asked to count the letter 'r' in "strawberry" or reverse a 10-digit number? Explain the physical mechanism of Byte-Pair Encoding merges.
3. **Chunking Topography:** What is the physical failure mode of a naive 512-token fixed chunking window on complex technical documentation, and how does structural AST chunking with breadcrumb prepending fix context loss?
4. **Bi-Encoder vs. Cross-Encoder Geometry:** Why does bi-encoder cosine similarity fail on negation queries like "companies not based in California", and how does full joint cross-attention in a reranker resolve the semantic ambiguity?
5. **Hybrid Search & Reciprocal Rank Fusion (RRF):** Why is directly summing normalized vector cosine scores and BM25 keyword scores an architectural mistake? What does the constant $k=60$ in $\frac{1}{k + \text{rank}}$ physically accomplish?
6. **Quantitative RAG Calipers:** Define Recall@k, Mean Reciprocal Rank (MRR), and Faithfulness mathematically. How do you compute them automatically in CI without relying on subjective human vibes?
7. **Curating the Golden Set:** How do you construct an unpolluted 40-question evaluation dataset with verified ground-truth chunk citations, and why do synthetic LLM-generated evaluation sets create dangerous blind spots?
8. **LLM-as-a-Judge Calibration:** What are position bias, verbosity bias, and self-enhancement bias in model evaluators, and what concrete prompting and scoring techniques neutralize them?
9. **Indirect Prompt Injection Vectors:** Trace the physical execution path of an indirect prompt injection payload hidden inside a customer invoice PDF. How does it hijack an autonomous agent with tool execution privileges?
10. **Ironclad Tool Sandboxing:** If an LLM emits a generated SQL query or shell command, how do you mathematically guarantee it cannot execute a destructive write or escape its execution sandbox?
11. **Deterministic State Machines vs. Autonomous ReAct Loops:** When is an unconstrained ReAct agent loop an architectural anti-pattern? What are the exact criteria for replacing an autonomous agent with a deterministic state graph?
12. **Model Context Protocol (MCP) Architecture:** What physical problem does the Model Context Protocol solve over custom REST tool schemas, and how does its JSON-RPC transport operate over stdio and SSE?
13. **The Millisecond Waterfall:** Break down the end-to-end p95 latency budget of a hybrid RAG query: embedding generation (45ms), vector distance traversal (15ms), BM25 scoring (10ms), RRF merging (2ms), cross-encoder reranking (40ms), and Time-To-First-Token (TTFT).
14. **Token Economics & Prompt Caching:** How does prompt prefix caching physically operate in GPU memory, and how do you structure prompt templates to maximize cache hits and cut token spend by 80%?
15. **Handling Structured Output Violations:** What is the physical difference between regex/JSON-schema logit masking at generation time versus self-repair retry loops when enforcing Pydantic models?
16. **Distributed Tracing & PII Scrubbing:** What exact metadata must be captured in an end-to-end LLM trace (spans, tokens, latencies, costs), and how do you prevent customer PII or authentication keys from leaking into trace databases?
17. **Empirical Failure Clustering:** How do you perform forensic error analysis on 100 failed production traces to categorize retrieval misses, context dilution, schema invalidations, and hallucinations?
18. **Continuous Evaluation Flywheels:** How do you harvest production user thumbs-down events and convert them into automated regression test fixtures in GitHub Actions CI?
19. **Quantization Arithmetic & VRAM Budgeting:** Calculate the exact GPU VRAM required to host a 70-billion parameter model in 4-bit quantization with an 8,192-token KV cache. How does 4-bit AWQ compare to 16-bit FP16 in perplexity?
20. **Self-Hosted vLLM vs. Proprietary APIs:** At what exact queries-per-second (QPS) threshold and data sensitivity level does spinning up dedicated GPUs with vLLM become cheaper and safer than paying OpenAI or Anthropic per token?
21. **PagedAttention & KV-Cache Fragmentation:** What physical memory bottleneck does vLLM's PagedAttention solve during concurrent multi-user serving, and how does it mimic operating system virtual memory paging?
22. **LoRA Mechanics & Hyperparameter Selection:** Why does Low-Rank Adaptation freeze base model weights and train decomposed low-rank matrices $W = W_0 + B \cdot A$? What physical trade-off governs your choice of rank $r$ and scaling factor $\alpha$?
23. **Multi-Tenant Vector Isolation:** Why is filtering search results by tenant permissions after vector retrieval a critical security flaw, and how do you enforce hard pre-filtering during index graph traversal?
24. **The 2 AM Production Outage Playbook:** When your primary model provider experiences a complete outage or severe rate-limiting storm, how does your infrastructure failover automatically without dropping active user streams?
25. **The Senior Decision Bar:** How do you prove to an executive leadership team that an AI feature is ready for production deployment using quantitative evaluation metrics, latency guarantees, and cost ceilings instead of subjective demos?

---

## 5. A Project Is for Learning, Not Proving Your Worth

You do not need to publish your work, impress a hiring manager, or build production software. A small project you understand is a real achievement. Keep it private unless a trusted adult agrees it is safe to share.

Use these as optional project ideas, not grades:
- **Try:** Make a small helper for a topic you care about.
- **Explore:** Add a searchable set of made-up notes and test it with a few questions.
- **Explain:** Show what it can do, where it gets confused, and what you learned.

---

### Project 1: A small helper that shapes an answer
*Try asking for a made-up creature card or story character with a few fields.*

| Try | Make a pretend answer with a few parts, then check whether any part is missing. |
| Explore | Compare two instructions and see how the answer changes. |
| Explain | Describe one thing the model gets wrong and how you checked it. |

---

### Project 2: A searchable pretend library
*Use a small set of notes, ask questions, and check whether the answer points to a useful clue.*

| Try | Make five pretend notes and search for a word in them. |
| Explore | Ask a question in two ways and compare which note each search finds. |
| Explain | Show which note supports an answer, and identify when the notes do not contain enough information. |

---

### Project 3: A project of your own
*Combine ideas you understand into a small project you can test, explain, and keep private.*

| Try | Choose a question you care about and build a small helper for it. |
| Explore | Add one safe tool or a searchable set of pretend notes. |
| Explain | Draw how it works, try examples, and name one limitation. Keep it private unless an adult reviews sharing. |

---

## 6. Curated High-Signal Resource List (One per Category)

- **Book (adult extension):** *AI Engineering* — Chip Huyen (O'Reilly). Written for professional practitioners; ask an adult to help choose chapters.
- **Evals & Error Analysis (adult extension):** Hamel Husain (`hamel.dev`). Pick a specific question and explore it with adult guidance.
- **Field Awareness (adult extension):** Simon Willison (`simonwillison.net`). Some material is technical; browse with a trusted adult.
- **Retrieval Quality:** Ragas Documentation (`docs.ragas.io`) and Cohere Rerank guides.
- **Protocols & Standards:** Model Context Protocol Specification (`modelcontextprotocol.io`).
- **Tracing & Telemetry:** Langfuse Documentation (`langfuse.com/docs`).
- **Open Model Serving:** vLLM Documentation (`docs.vllm.ai`).
