/* ---------------------------------------------------------------------------
   course-data.js — the single source of truth for the 90-day (12-week) checklist.

   Both the site (site/index.html) and the markdown plan
   (ai-engineer-90-day-plan.md, via scripts/build_plan.py) read the day
   titles, tasks and "Done when" lines from here. Edit this file, run
   `make plan`, and the two stay in step.

   Everything after the `=` is strict JSON so scripts/build_plan.py can parse
   it without a JavaScript engine — keep it that way.
   --------------------------------------------------------------------------- */

window.COURSE_WEEKS =
[
  {
    "n": 1,
    "title": "Start Here: Python, Projects &amp; Asking Good Questions",
    "range": "Days 1–7",
    "outcome": "I can run a small Python project, make a change safely, and explain what I learned in my own words.",
    "days": [
      {
        "d": "1",
        "t": "Meet the terminal: giving your computer tiny instructions",
        "tasks": [
          "With a trusted adult, open the coding workspace and find where your project files live",
          "Run a tiny Python instruction and change one word or number to see what changes",
          "Learn what a folder, file, and error message are by exploring a pretend project",
          "<b>Build:</b> a tiny program that introduces your made-up character, creature, or robot"
        ],
        "done": "You can run your program, change it, and explain what one line does."
      },
      {
        "d": "2",
        "t": "Python recipes: names, values, and simple functions",
        "tasks": [
          "Store a name, number, or sentence in a variable and print it back",
          "Use an if/else choice to make your program react to different answers",
          "Turn repeated instructions into a function with a name you choose",
          "<b>Build:</b> a short quiz about a topic you like, with at least two possible responses"
        ],
        "done": "Your quiz runs twice with different answers, and you can point out its choice and function."
      },
      {
        "d": "3",
        "t": "Make a small collection and explore it with a loop",
        "tasks": [
          "Put a few made-up facts, creatures, or objects into a Python list",
          "Use a loop to show each item without copying the same instruction many times",
          "Count the items and find one that matches a simple rule",
          "<b>Build:</b> a tiny explorer that displays and counts entries in your collection"
        ],
        "done": "You can add an item and explain how the loop visits each entry."
      },
      {
        "d": "4",
        "t": "Save versions: how to undo a change safely",
        "tasks": [
          "Make a copy of a tiny project before changing it; compare the old and new versions",
          "Use the editor's undo and save features, and talk through what each one does",
          "Ask an adult to show how a version history remembers earlier snapshots",
          "<b>Build:</b> make one planned change, save a named version, then return to the earlier version with adult help"
        ],
        "done": "You can find an earlier saved version and describe why keeping copies helps."
      },
      {
        "d": "5",
        "t": "Be a program detective: try examples that might break it",
        "tasks": [
          "Write down what you expect your quiz or explorer to do before you run it",
          "Try an ordinary answer, an empty answer, and a surprising answer",
          "When something goes wrong, read the error slowly and change one thing at a time",
          "<b>Build:</b> a short list of three tests another person can try on your program"
        ],
        "done": "You found one surprising result, fixed it or explained it, and saved your three tests."
      },
      {
        "d": "6",
        "t": "Turn your small program into a mini-game",
        "tasks": [
          "Give your program a goal, such as guessing a number or choosing a creature",
          "Add a score, clue, or second round using ideas from earlier days",
          "Ask someone to try it and notice where they hesitate",
          "<b>Build:</b> a playable little game or interactive story in Python"
        ],
        "done": "Someone else can play your game and tell you what they think its goal is."
      },
      {
        "d": "7",
        "t": "Checkpoint: show your first Python creation",
        "ship": true,
        "tasks": [
          "Choose one favorite part of your game and make it easier to understand",
          "Draw the steps your program follows from start to finish",
          "Show it privately to someone you trust, or simply save it for yourself",
          "Rest and choose one question you want to explore next"
        ],
        "done": "You can show or describe your creation and name one thing you learned."
      }
    ]
  },
  {
    "n": 2,
    "title": "How Programs Talk: Web Requests, Waiting &amp; Helpful Errors",
    "range": "Days 8–14",
    "outcome": "I can send a program a request, understand its reply, and make my project handle common problems safely.",
    "days": [
      {
        "d": "8",
        "t": "How websites talk: send a question, get a reply",
        "tasks": [
          "Use a picture or pretend example to see a browser ask a website for information",
          "Learn that a request is a question and a response is the reply; status numbers are clues about what happened",
          "Try a safe, public example with an adult, or act out the request and response with paper cards",
          "<b>Build:</b> a small Python program that shows a pretend request, response, and status clue"
        ],
        "done": "You can explain the question/reply idea and name one clue that a request did not work."
      },
      {
        "d": "9",
        "t": "Keep secrets secret: passwords and private information",
        "tasks": [
          "Spot private information in examples and replace it with clearly made-up details",
          "Learn that a password or API key is like a key to a locked room—never paste one into a lesson or chat",
          "Ask a trusted adult before using an online service, making an account, or installing a tool",
          "<b>Build:</b> a pretend secret-spotting game that marks fake passwords in sample text"
        ],
        "done": "You can identify three kinds of private information and explain who to ask before sharing anything."
      },
      {
        "d": "10",
        "t": "Waiting without getting stuck: what programs do while they wait",
        "tasks": [
          "Compare a program that waits doing nothing with one that can do a second small task",
          "Use a kitchen timer or pretend message delivery to model waiting for a reply",
          "Learn that some Python tools can wait politely instead of freezing everything",
          "<b>Build:</b> a tiny two-task demonstration that prints what it does while waiting"
        ],
        "done": "You can explain the difference between waiting and doing a useful second task."
      },
      {
        "d": "11",
        "t": "Give your project a simple doorway",
        "tasks": [
          "Learn what a doorway (an interface) lets another part of a program ask your project",
          "Sketch the input your project needs and the kind of answer it should return",
          "Try a local example; any online setup or account needs adult help and approval",
          "<b>Build:</b> a simple function that accepts a pretend question and returns a clear answer"
        ],
        "done": "You can show what goes in and what comes out of your function."
      },
      {
        "d": "12",
        "t": "What if the reply is late or missing?",
        "tasks": [
          "Imagine asking a question and not getting an answer right away; decide what your program should do",
          "Try a pretend slow reply and a pretend missing reply without contacting a real service",
          "Add a friendly message and a safe way to try again",
          "<b>Build:</b> a small example that handles a successful answer and a missing answer differently"
        ],
        "done": "Your program stays understandable when a reply is late or missing."
      },
      {
        "d": "13",
        "t": "Retry kindly: don’t ask again and again too fast",
        "tasks": [
          "Model what happens when many people knock on the same door at once",
          "Compare trying every second with waiting a little longer between tries",
          "Set a small retry limit so your program can stop and explain what happened",
          "<b>Build:</b> a pretend helper that waits between tries and then gives a friendly stop message"
        ],
        "done": "You can explain why waiting between tries is kinder and why a retry limit matters."
      },
      {
        "d": "14",
        "t": "Checkpoint: make your program handle a missing reply",
        "ship": true,
        "tasks": [
          "Put together your pretend request, reply, and friendly error message",
          "Try one example that works and one where no answer arrives",
          "Ask a trusted adult to review any optional account or online setup"
        ],
        "done": "Your practice program can send a pretend request, read the reply, and explain one kind of error it might receive."
      }
    ]
  },
  {
    "n": 3,
    "title": "Talking to AI: Patterns, Prompts &amp; Text Pieces",
    "range": "Days 15–21",
    "outcome": "I can try different instructions, notice how an AI answer changes, and understand that models use numbered pieces of text.",
    "days": [
      {
        "d": "15",
        "t": "Meet a language model: a pattern guesser, not an oracle",
        "tasks": [
          "Learn that a language model guesses likely next pieces of text from patterns it learned",
          "Ask two made-up questions and compare the answers",
          "Notice that a confident answer can still be wrong or change when the wording changes",
          "<b>Build:</b> a small experiment card with your question, what you expected, and what happened"
        ],
        "done": "You can explain that a model guesses likely next pieces of text and may give different answers to the same question."
      },
      {
        "d": "16",
        "t": "Why a model sometimes misses letters and tiny details",
        "tasks": [
          "Explore how text is divided into pieces called tokens; a piece can be a whole word or part of one",
          "Try asking a model to count letters in \"strawberry\" and check its answer yourself",
          "Compare a word as one piece, several pieces, or separate letters",
          "<b>Build:</b> a little example showing why a computer program can count letters more reliably"
        ],
        "done": "You can explain that tokens are pieces of text and that any online account or spending needs adult approval."
      },
      {
        "d": "17",
        "t": "Give clear instructions and compare the answers",
        "tasks": [
          "Ask for an answer with a clear goal, audience, and shape",
          "Add one made-up example to show the kind of response you want",
          "Change only one instruction and compare the result",
          "<b>Build:</b> a small set of two prompts and notes describing how the answers differed"
        ],
        "done": "You have two versions of an instruction and notes on how their answers changed."
      },
      {
        "d": "18",
        "t": "How much can a model read at once?",
        "lever": true,
        "tasks": [
          "Try a short question and a longer set of notes; notice how much information the model is given",
          "Learn that a model has a limit on how much text it can consider at once",
          "Notice that a longer prompt is not automatically a better prompt",
          "<b>Try:</b> choose only the notes that seem useful for one pretend question"
        ],
        "done": "You can explain that a model has a limit on how much text it can consider at once."
      },
      {
        "d": "19",
        "t": "Models can work with pictures too",
        "tasks": [
          "Use an adult-approved picture or a drawing you made yourself; do not upload personal photos",
          "Ask what a picture model notices and compare that with what you can see",
          "Check carefully: a model may miss an object or describe something incorrectly",
          "<b>Build:</b> write down one thing it noticed and one thing you corrected"
        ],
        "done": "You can describe one thing a picture model noticed and one detail you checked yourself."
      },
      {
        "d": "20",
        "t": "Keep a notebook of your experiments",
        "tasks": [
          "Write your question and prediction in a notebook before trying it",
          "Record the answer and whether it matched what you expected",
          "Change one thing, try again, and compare the result",
          "<b>Build:</b> an experiment notebook with two observations and a new question"
        ],
        "done": "You have a notebook showing what you tried, what happened, and what you might test next."
      },
      {
        "d": "21",
        "t": "Checkpoint: a prompt experiment you can explain",
        "ship": true,
        "tasks": [
          "Choose a topic you like and compare two clear instructions using made-up examples",
          "Write down what you expected and what the model did",
          "Ask whether a detail needs checking instead of assuming the answer is true"
        ],
        "done": "You can compare two instructions using made-up examples and describe what changed. Keep the project private unless a trusted adult helps you share it safely."
      }
    ]
  },
  {
    "n": 4,
    "title": "Getting Useful Answers: Shapes, Streams &amp; Mistakes",
    "range": "Days 22–28",
    "outcome": "I can ask for a predictable answer shape, watch an answer arrive piece by piece, and plan for things going wrong.",
    "days": [
      {
        "d": "22",
        "t": "Ask for answers in a shape your program can use",
        "lever": true,
        "tasks": [
          "Ask for a pretend answer with a few parts, such as a creature's name, habitat, and special skill",
          "Compare a free-form answer with one that follows your chosen shape",
          "Notice that a neat shape does not prove the facts are true",
          "<b>Build:</b> a small made-up creature card with the fields you chose"
        ],
        "done": "Your pretend answer has the shape you asked for, and you can spot one part that does not fit."
      },
      {
        "d": "23",
        "t": "Check an answer and help fix its shape",
        "tasks": [
          "Remove one part from a pretend answer and see whether you notice",
          "Tell the program which part is missing in a friendly, clear way",
          "Try again once, then stop if the shape is still not right",
          "<b>Build:</b> a checker that notices a missing field in a made-up card"
        ],
        "done": "You can spot an answer with a missing part and explain how to fix it."
      },
      {
        "d": "24",
        "t": "Watch an answer arrive a little at a time",
        "tasks": [
          "Imagine a sentence appearing word by word instead of all at once",
          "Use paper cards to reveal a pretend answer one piece at a time",
          "Compare how it feels to wait for the whole answer versus seeing it grow",
          "<b>Build:</b> a tiny local demonstration that prints a sentence in pieces"
        ],
        "done": "You can explain why seeing a response arrive in pieces can feel different from waiting for all of it."
      },
      {
        "d": "25",
        "t": "Make a backup plan for when a model is unavailable",
        "tasks": [
          "List what your project should do if an answer does not arrive",
          "Choose a helpful message and a safe stop instead of trying forever",
          "Use pretend failures; do not create accounts or spend money for this lesson",
          "<b>Build:</b> add a friendly unavailable message to a local example"
        ],
        "done": "Your project gives a friendly message and stops safely when its helper is unavailable."
      },
      {
        "d": "26",
        "t": "Test with pretend answers before using real services",
        "tasks": [
          "Write down a few pretend answers your program might receive",
          "Check what happens with a normal answer, a missing part, and a confusing answer",
          "Repeat the same examples after you make a change",
          "<b>Build:</b> a small offline test list for your project"
        ],
        "done": "You can test the project without spending money or sending real information anywhere."
      },
      {
        "d": "27",
        "t": "Keep your project easy to run again",
        "tasks": [
          "Write simple steps for opening and running your local project",
          "Add one clear note about what the project cannot do yet",
          "Ask an adult before installing new tools or putting anything online",
          "<b>Build:</b> a small run-it-again guide with a drawing"
        ],
        "done": "Your program handles an example input and a pretend failure without crashing. Public deployment is an optional adult-supported extension."
      },
      {
        "d": "28",
        "t": "Checkpoint: your first AI-powered experiment",
        "ship": true,
        "tasks": [
          "Choose a small task for your helper, such as sorting or explaining made-up facts",
          "Try three examples and note where the answer shape helped",
          "Keep the project local and private unless a trusted adult reviews sharing"
        ],
        "done": "You can show how your small helper works, test it with a few examples, and explain one limitation."
      }
    ]
  },
  {
    "n": 5,
    "title": "Making Notes Searchable: Meaning, Maps &amp; Chunks",
    "range": "Days 29–35",
    "outcome": "I can turn a small collection of chosen notes into useful searchable pieces and explain how a computer guesses which pieces are related.",
    "days": [
      {
        "d": "29",
        "t": "How computers compare meanings with number arrows",
        "tasks": [
          "Represent each pretend note with a simple list of numbers that gives it a location on a page",
          "Draw notes about similar topics near each other and very different topics farther apart",
          "Compare which note is nearest to a question's pretend number list",
          "<b>Build:</b> a paper or Python example that finds a nearby note"
        ],
        "done": "You can explain the number-arrow idea and notice when two notes about a similar topic appear near each other."
      },
      {
        "d": "30",
        "t": "When similar-sounding ideas fool a search",
        "tasks": [
          "Ask meaning-search about a topic and see what nearby notes appear",
          "Try a question with the word 'not' or an exact made-up code and notice if search misses it",
          "Add exact-word search as a second clue",
          "<b>Build:</b> one example where each search method helps in a different way"
        ],
        "done": "You have an example where meaning-search misses an exact word, and can explain why exact-word search might help."
      },
      {
        "d": "31",
        "t": "Turn notes into small, useful pieces",
        "tasks": [
          "Choose a few short, made-up notes about a topic you like",
          "Split a long note into smaller pieces while keeping each idea together",
          "Add a title so you can tell what each piece is about",
          "<b>Build:</b> a tiny searchable collection from your notes"
        ],
        "done": "You can show how you split a note while keeping its important idea together."
      },
      {
        "d": "32",
        "t": "Choose where each note should be split",
        "tasks": [
          "Try splitting a paragraph in the middle of an idea and notice what becomes confusing",
          "Try splitting at the end of a complete thought",
          "Add the title or topic to each piece so it makes sense on its own",
          "<b>Build:</b> compare two note-splitting plans and choose the clearer one"
        ],
        "done": "You can compare two ways of splitting notes and explain which keeps the idea clearer."
      },
      {
        "d": "33",
        "t": "Notice when a note has changed",
        "tasks": [
          "Change one pretend note and notice which search result should change",
          "Keep track of the note's title and the version you last used",
          "Remove a pretend note and make sure the search no longer shows it",
          "<b>Build:</b> a tiny before-and-after list showing what changed"
        ],
        "done": "You can explain why reusing an unchanged result can save work."
      },
      {
        "d": "34",
        "t": "Search notes or give the model all the notes?",
        "lever": true,
        "tasks": [
          "Try giving a pretend helper all five notes, then try giving it only the best two",
          "Compare whether the shorter set makes the useful clue easier to notice",
          "Notice that more information is not always more helpful",
          "<b>Try:</b> choose which notes belong with one made-up question"
        ],
        "done": "You can explain one reason to search a library instead of handing every note to the model."
      },
      {
        "d": "35",
        "t": "Organize your project's small library",
        "tasks": [
          "Give each pretend note a short title and keep related notes together",
          "Check that each note can be understood without the rest of the collection",
          "Write down how your small library is organized"
        ],
        "done": "Your small collection is organized into notes your program can search."
      }
    ]
  },
  {
    "n": 6,
    "title": "Finding the Right Clue: Search, Keywords &amp; Ranking",
    "range": "Days 36–42",
    "outcome": "I can compare word-matching and meaning-matching search, combine their clues, and see whether the right passage moves nearer the top.",
    "days": [
      {
        "d": "36",
        "t": "Find nearby ideas with a simple local search",
        "tasks": [
          "Search through a short local list of your pretend notes",
          "Return the closest few notes instead of the entire collection",
          "Keep a title and a source note beside each result",
          "<b>Build:</b> a simple local search for your small library"
        ],
        "done": "You can show a local search finding a note that is related to a question."
      },
      {
        "d": "37",
        "t": "Search for an exact word",
        "tasks": [
          "Search for the exact words in a question",
          "Try an unusual made-up code or name that meaning-search may not understand",
          "Compare the exact-word result with the closest-meaning result",
          "<b>Build:</b> a short example showing when matching the exact word helps"
        ],
        "done": "You can show how exact-word search finds a word that meaning-search might miss."
      },
      {
        "d": "38",
        "t": "Use meaning and exact words together",
        "lever": true,
        "tasks": [
          "Put the meaning-search and exact-word results side by side",
          "Give a point for each method when it finds a useful note",
          "Combine the clues from both methods into one list",
          "<b>Build:</b> a simple combined list and explain why one note came first"
        ],
        "done": "You can compare the results from meaning-search, exact-word search, and a combination."
      },
      {
        "d": "39",
        "t": "Sort search results so the best clue comes first",
        "tasks": [
          "Make a small list of search results and choose which seems most useful for the question",
          "Move a good clue higher when it directly answers the question",
          "Compare your new order with the original search order",
          "<b>Build:</b> show a before-and-after list and explain what changed"
        ],
        "done": "You can move a useful note higher in your results and explain the clue you used."
      },
      {
        "d": "40",
        "t": "Try asking the same question in another way",
        "tasks": [
          "Take a vague question and rewrite it with one extra helpful detail",
          "Try two ways to ask the same pretend question",
          "Compare which wording helped your search find the note",
          "<b>Build:</b> a small list of clearer questions and the clues they found"
        ],
        "done": "You can rewrite a vague question more clearly and see whether the search finds a better note."
      },
      {
        "d": "41",
        "t": "Keep each pretend library separate",
        "tasks": [
          "Make two pretend libraries with different made-up notes",
          "Give each library its own label and only search inside the chosen one",
          "Try a question in each library and check that the notes stay separate",
          "<b>Build:</b> draw how your program keeps the two pretend collections apart"
        ],
        "done": "You can explain why pretend libraries should not accidentally show each other's notes."
      },
      {
        "d": "42",
        "t": "Notice where your search spends its time",
        "tasks": [
          "Try the same search a few times and notice where it seems to wait",
          "Measure with a simple timer if you want; an exact speed target is not needed",
          "Guess which step takes longest and check your guess"
        ],
        "done": "You have noticed which part of your small search takes the longest."
      }
    ]
  },
  {
    "n": 7,
    "title": "Checking Answers: Evidence, Fair Tests &amp; Improvements",
    "range": "Days 43–49",
    "outcome": "I can make a small fair test, check whether answers use the right evidence, and compare one change with the previous version.",
    "days": [
      {
        "d": "43",
        "t": "Make a small answer key to test your search",
        "lever": true,
        "tasks": [
          "Choose five questions about your pretend library and write which note should help answer each one",
          "Include an easy question, a tricky question, and one question whose answer is not in your notes",
          "Try each question and mark whether search found the note you expected",
          "<b>Build:</b> make a small answer key you can use again after changing your search"
        ],
        "done": "You have five test questions and can compare search results with your answer key."
      },
      {
        "d": "44",
        "t": "Count how often search finds the right note",
        "tasks": [
          "Count how many of your five questions found the note you expected",
          "Notice whether the right note appeared first or further down the list",
          "Compare your simple search with a version that also looks for exact words",
          "<b>Build:</b> a tiny scorecard with one row per question"
        ],
        "done": "You can say which search worked better on your examples and show the evidence."
      },
      {
        "d": "45",
        "t": "Check whether answers match the notes",
        "tasks": [
          "Choose one sentence in an answer and look for the note that supports it",
          "Find a sentence that is not in any of your notes",
          "Try asking your helper to say when it does not know",
          "<b>Build:</b> a two-column table: answer sentence and supporting note"
        ],
        "done": "You can find one sentence that is supported by a note and one that is not."
      },
      {
        "d": "46",
        "t": "Let a program repeat your tests for you",
        "tasks": [
          "Evaluation runner architecture: Golden Dataset -&gt; Pipeline Runner -&gt; Metric Judge -&gt; Aggregator -&gt; Scorecard",
          "Async batch execution: evaluating 40 questions concurrently with semaphore concurrency limits to avoid provider rate limits",
          "Telemetry artifact generation: outputting formatted markdown comparison tables and committing JSON evaluation runs to git",
          "<b>Build:</b> author a standalone CLI command <code>python3 eval.py</code> that executes the full benchmark and displays a summary scorecard"
        ],
        "done": "Your program can repeat a few tests and show which ones worked."
      },
      {
        "d": "47",
        "t": "Show which note supports each answer",
        "tasks": [
          "Show the title of the note that helped answer a question",
          "Check that the answer really matches that note",
          "When no note contains the answer, say that you do not know yet",
          "<b>Build:</b> an answer that names its clue"
        ],
        "done": "An answer can point to a note, and you can check whether the note really supports it."
      },
      {
        "d": "48",
        "t": "Check that a change did not make search worse",
        "tasks": [
          "Keep your small answer key from Day 43",
          "Try it again after changing your search",
          "Notice if a change helped one question but made another harder",
          "<b>Build:</b> a before-and-after scorecard with a few questions"
        ],
        "done": "You can compare before and after a change and catch when a helpful answer disappears."
      },
      {
        "d": "49",
        "t": "Checkpoint: a searchable library that shows its clues",
        "ship": true,
        "tasks": [
          "Show how your small library answers a few pretend questions",
          "Point to the note that supports one answer and identify one answer that needs checking",
          "Keep the project private unless an adult reviews sharing"
        ],
        "done": "You can compare a few search examples and explain which one found a useful passage."
      }
    ]
  },
  {
    "n": 8,
    "title": "Giving AI Safe Tools: Tiny Actions &amp; Clear Limits",
    "range": "Days 50–56",
    "outcome": "I can let a model ask for a small, safe action, decide what my program is allowed to do, and stop the loop when it should.",
    "days": [
      {
        "d": "50",
        "t": "Let a program use one small, safe tool",
        "tasks": [
          "Give your pretend helper one tool that can look up a made-up fact",
          "Draw what information the tool receives and what answer it returns",
          "Keep the tool read-only: it cannot send, delete, buy, or publish anything",
          "<b>Build:</b> a tiny local lookup tool with one clearly described job"
        ],
        "done": "You can explain what the tool is allowed to do and what it must not do."
      },
      {
        "d": "51",
        "t": "Help your tool recover from a mistake",
        "tasks": [
          "Give your tool an input it cannot understand and notice what happens",
          "Show a kind message instead of a confusing error",
          "Let the person try again once, then stop safely",
          "<b>Build:</b> make the tool explain what kind of input it can use"
        ],
        "done": "Your tool gives a clear message when it receives something it cannot use."
      },
      {
        "d": "52",
        "t": "Give a helper clear steps and a stopping point",
        "tasks": [
          "Draw a short list of steps for a pretend helper to follow",
          "Choose one clear point where it should stop",
          "Try a made-up example and see whether the steps are easy to follow",
          "<b>Build:</b> a helper plan that can read a pretend note and answer one question"
        ],
        "done": "Your helper follows a short plan and stops when it reaches the end."
      },
      {
        "d": "53",
        "t": "A shared plug shape for tools (optional idea)",
        "lever": true,
        "tasks": [
          "Optional curiosity: imagine a shared plug that helps different programs connect to tools",
          "Draw two programs and a tool with the shared plug between them",
          "This is an idea to explore, not a setup you need to install",
          "<b>Try:</b> explain why shared shapes can make connections easier"
        ],
        "done": "You can explain that a shared tool format helps different programs connect. You can skip this optional idea."
      },
      {
        "d": "54",
        "t": "Connect a pretend helper to your project",
        "tasks": [
          "Draw how a pretend helper might ask a program to use a safe tool",
          "Label what the helper can ask and what it must not be allowed to do",
          "No account or online connection is needed for this activity",
          "<b>Try:</b> explain why the tool should only do its small allowed job"
        ],
        "done": "You can draw how a pretend helper might connect to your project; no account or online connection is needed."
      },
      {
        "d": "55",
        "t": "Use a plan instead of letting a helper wander",
        "lever": true,
        "tasks": [
          "Draw a flowchart for a helper with a few clear steps",
          "Add a check that decides whether the answer is good enough or needs a human look",
          "Compare your plan with a helper that is allowed to choose any next step",
          "<b>Build:</b> explain why your planned version is easier to understand"
        ],
        "done": "You can explain why clear steps and a stopping point make a helper easier to understand."
      },
      {
        "d": "56",
        "t": "Checkpoint: a helpful guide to your chosen topic",
        "ship": true,
        "tasks": [
          "Choose a topic and prepare a small set of pretend notes about it",
          "Ask a few questions and check whether the guide shows useful clues",
          "Keep the project private unless a trusted adult reviews sharing"
        ],
        "done": "Your guide can find a useful note and show where an answer came from."
      }
    ]
  },
  {
    "n": 9,
    "title": "When Inputs Try to Trick You: Privacy &amp; Safe Experiments",
    "range": "Days 57–63",
    "outcome": "I can recognize tricky instructions in untrusted text, protect private information, and explain why no single prompt trick makes an AI perfectly safe.",
    "days": [
      {
        "d": "57",
        "t": "Tricky notes: when text tries to boss the AI around",
        "lever": true,
        "tasks": [
          "Read a harmless pretend note that says, 'Ignore the question and do something else.'",
          "Notice that a model may treat text inside a note as an instruction, even when it should just read it",
          "Try a few made-up tricky notes and compare what your project does",
          "<b>Build:</b> make a short list of safe tests and ask whether each answer followed the actual question"
        ],
        "done": "You can explain why notes from outside your project should not automatically get to control its tools."
      },
      {
        "d": "58",
        "t": "Keep private details out of your project",
        "tasks": [
          "Use made-up names and pretend details in every example",
          "Practice spotting a name, address, password, school, or private photo that should not be shared",
          "Ask a trusted adult before using online tools or sending any information anywhere",
          "<b>Build:</b> replace private-looking details in a pretend paragraph with safe placeholders"
        ],
        "done": "You can spot several kinds of private information and replace them with pretend details."
      },
      {
        "d": "59",
        "t": "Labels can help organize text, but they are not magic shields",
        "tasks": [
          "Try adding a label around made-up notes to show which words came from somewhere else",
          "Compare what happens with and without the label",
          "Remember: labels and instructions can help, but they cannot promise that a model will behave safely",
          "<b>Build:</b> try labels around fake instructions and explain why they may help but cannot guarantee safety"
        ],
        "done": "You can show that labels may help organize text but cannot guarantee an AI will ignore every tricky instruction."
      },
      {
        "d": "60",
        "t": "Give tools only the tiny jobs they need",
        "tasks": [
          "List exactly what your pretend tool can read or change",
          "Make the tool read-only for this lesson: it can look up a made-up fact but cannot send, delete, buy, or publish anything",
          "Try a tricky pretend request and check whether the tool stays within its small job",
          "<b>Build:</b> a diagram showing the tool's one allowed job and the jobs it must refuse"
        ],
        "done": "You can explain why a tool should get only the smallest permissions it needs."
      },
      {
        "d": "61",
        "t": "Ask a trusted person before anything important happens",
        "tasks": [
          "Sort pretend actions into safe-to-look-at and ask-first groups",
          "Practice pausing before sharing, changing, deleting, buying, or sending anything",
          "Write down who the trusted adult is for your project",
          "<b>Build:</b> make a clear stop sign in your project for anything outside its small safe job"
        ],
        "done": "You can name actions that should stop and wait for an adult's help."
      },
      {
        "d": "62",
        "t": "Try harmless tricky examples and notice what goes wrong",
        "tasks": [
          "Try three harmless, made-up notes that give confusing or conflicting instructions",
          "See whether your helper follows your real question or gets distracted by the note",
          "Write down what happened without including private information",
          "<b>Build:</b> choose one small change that could make the project clearer or safer"
        ],
        "done": "You have three safe examples and can explain one limit of your project."
      },
      {
        "d": "63",
        "t": "Remember safety checks when you make changes",
        "tasks": [
          "Choose one safety check from your earlier notes and try it again",
          "Make one small improvement, then test the same examples",
          "Remember that tests can find problems but cannot prove a project is perfectly safe"
        ],
        "done": "You can show one safety check you repeat after changing your project."
      }
    ]
  },
  {
    "n": 10,
    "title": "Learning from Runs: Notes, Feedback &amp; Troubleshooting",
    "range": "Days 64–70",
    "outcome": "I can keep a simple record of what my project did, find a pattern in mistakes, and choose one useful improvement.",
    "days": [
      {
        "d": "64",
        "t": "Draw a map of what your program does",
        "lever": true,
        "tasks": [
          "Draw each step from a question to your project's answer",
          "Mark where the program reads notes, searches, or asks a model",
          "Circle a step where something could go wrong and add a check",
          "<b>Build:</b> a map another person can follow to understand your project"
        ],
        "done": "You can use your map to explain the main steps and one place you would check carefully."
      },
      {
        "d": "65",
        "t": "Notice what works well and what feels slow or confusing",
        "tasks": [
          "Try your project with a few pretend questions and note which answers are useful",
          "Notice whether any part feels slow, confusing, or surprising",
          "If using an online service, ask an adult to check its settings and any possible cost first",
          "<b>Build:</b> a small table of what worked, what did not, and what you might change"
        ],
        "done": "You can point to one useful result and one thing you might improve."
      },
      {
        "d": "66",
        "t": "Keep private information out of project notes",
        "tasks": [
          "Only use pretend examples in project notes and experiment logs",
          "Check that notes do not contain a real name, school, address, password, or private photo",
          "Ask a trusted adult before storing or sharing any information online",
          "<b>Build:</b> replace private-looking details in a pretend note with safe placeholders"
        ],
        "done": "Your project notes use made-up examples and contain no private information."
      },
      {
        "d": "67",
        "t": "Look for patterns in pretend mistakes",
        "tasks": [
          "Collect a few pretend examples where your project gave a surprising result",
          "Group similar surprises together: missing note, confusing question, or answer not supported by a note",
          "Choose the group that seems easiest or most useful to improve first",
          "<b>Build:</b> draw a small chart showing the patterns you noticed"
        ],
        "done": "You can name one pattern in your examples and choose a small improvement to try."
      },
      {
        "d": "68",
        "t": "Use helpful feedback to improve your project",
        "tasks": [
          "Ask someone you trust what they found clear or confusing when trying your project",
          "Listen for a specific example rather than only 'good' or 'bad'",
          "Decide which suggestion fits what you want your project to do",
          "<b>Build:</b> write down one piece of feedback and what you chose to do with it"
        ],
        "done": "You have one useful suggestion and a reason for accepting or not accepting it."
      },
      {
        "d": "69",
        "t": "Turn a surprising result into a new test",
        "tasks": [
          "When an example surprises you, save a made-up version of it",
          "Add it to your small test list so you can try it again after changing the project",
          "Compare what happened before and after the change",
          "<b>Build:</b> turn one surprise into a new test question"
        ],
        "done": "Your test list includes a question that once surprised you."
      },
      {
        "d": "70",
        "t": "Make a simple plan for when something goes wrong",
        "tasks": [
          "Write down what to do if the project gets stuck or gives a confusing answer",
          "Include a safe stop or reset step",
          "Name the trusted adult who can help with setup or sharing questions",
          "<b>Build:</b> add a short help note to your project"
        ],
        "done": "Someone you trust can find a safe way to stop or reset your project."
      }
    ]
  },
  {
    "n": 11,
    "title": "Optional Deep Dive: Models on Your Computer",
    "range": "Days 71–77",
    "outcome": "With adult help and suitable hardware, I can explore a model that runs locally and describe what shrinking a model changes.",
    "days": [
      {
        "d": "71",
        "t": "An optional peek at a model that runs on your computer",
        "tasks": [
          "Why self-host: data sovereignty, zero external API latency, regulatory compliance, and offline operational guarantees",
          "Running open models (Llama 3.1 8B, Qwen 2.5, Mistral 7B) locally on Apple Silicon or Linux GPUs using Ollama and llama.cpp",
          "Interacting via OpenAI-compatible REST endpoints (<code>http://localhost:11434/v1</code>) using standard client libraries",
          "<b>Build:</b> point your Week 4 extraction pipeline to a locally hosted open model and execute an extraction completely offline"
        ],
        "done": "With adult help, you tried a local model and can describe one thing it did differently. This challenge is optional."
      },
      {
        "d": "72",
        "t": "Optional: how busy computers share their memory",
        "tasks": [
          "The multi-user bottleneck: why naive HuggingFace pipelines choke and run out of GPU memory under concurrent traffic",
          "PagedAttention mechanics: managing Key-Value (KV) cache memory like OS virtual memory pages to eliminate memory fragmentation",
          "Continuous batching: dynamically pairing incoming and completing token sequences to maximize GPU tensor core utilization",
          "<b>Build:</b> deploy an open model with vLLM and benchmark throughput under concurrent load against a standard inference baseline"
        ],
        "done": "You can use a drawing to explain one way computers share limited memory. This challenge is optional."
      },
      {
        "d": "73",
        "t": "Optional: how computers make models smaller",
        "tasks": [
          "Quantization math: compressing 16-bit floating-point weights into 4-bit integer representations (AWQ, GPTQ, GGUF)",
          "The physical memory equation: calculating exact GPU VRAM requirements: $\\text{VRAM} = (\\text{parameters} \\times \\text{bytes\\_per\\_weight}) + \\text{KV\\_cache}$",
          "Measuring perplexity degradation: evaluating reasoning loss across 4-bit vs 8-bit vs 16-bit weight representations",
          "<b>Build:</b> run benchmark inference comparing memory usage, tokens per second, and perplexity across 4-bit and 8-bit quantized weights"
        ],
        "done": "You can describe one trade-off when making a model smaller. This challenge is optional."
      },
      {
        "d": "74",
        "t": "Optional: teach a model with examples or clearer instructions?",
        "lever": true,
        "tasks": [
          "When fine-tuning is the winning move: enforcing rigid bespoke schemas, dropping latency by eliminating long prompts, or distilling large models",
          "When fine-tuning is an expensive trap: trying to inject dynamic factual knowledge (which is what RAG does) or working with &lt;500 examples",
          "The total cost of ownership: data curation overhead, training compute costs, and perpetual model maintenance vs prompt iteration speed",
          "<b>Build:</b> author a technical decision matrix analyzing an enterprise use case and defend why fine-tuning is or is not justified"
        ],
        "done": "You can explain one difference between changing instructions and changing a model with examples. This challenge is optional."
      },
      {
        "d": "75",
        "t": "Optional: make practice examples and check them carefully",
        "tasks": [
          "Teacher-student distillation: prompting a frontier model (Claude 3.5 Sonnet / GPT-4o) to generate diverse, high-quality instruction-response pairs",
          "Data quality filtering: applying LLM-as-a-judge heuristics, schema checks, and deduplication to purge low-quality or corrupt training rows",
          "Formatting datasets: converting raw data into standardized ChatML format stored as clean JSONL files",
          "<b>Build:</b> generate, filter, and validate a 300-example high-signal synthetic training dataset for a specialized extraction task"
        ],
        "done": "You can describe why practice examples should be checked carefully. This challenge is optional."
      },
      {
        "d": "76",
        "t": "Optional: a small add-on that changes a model's style",
        "tasks": [
          "Low-Rank Adaptation (LoRA) mechanics: freezing multi-billion parameter base weights and training tiny rank decomposition matrices ($W = W_0 + B \\cdot A$)",
          "Hyperparameter tuning: selecting Rank ($r=8, 16, 32$), Alpha scaling ($\\alpha = 2r$), target projection modules, and learning rate schedules",
          "Executing a LoRA fine-tuning run on a hosted GPU instance (Unsloth, Modal, or RunPod) in under 30 minutes for less than $2.00",
          "<b>Build:</b> fine-tune an open 8B model (Llama 3.1 8B or Qwen 2.5 7B) on your custom dataset and export the trained LoRA adapter weights"
        ],
        "done": "You can explain one way a small add-on might influence a model. This challenge is optional."
      },
      {
        "d": "77",
        "t": "Optional: compare two ways to change an answer",
        "tasks": [
          "Optional: choose a model idea that interests you and ask a trusted adult to help explore it",
          "Compare two made-up answers and decide which one better follows the same instruction",
          "Write down one thing that stayed the same and one thing that changed",
          "<b>Try:</b> draw or describe how training examples might influence a model's patterns"
        ],
        "done": "You can explain one difference you noticed and one question you still have."
      }
    ]
  },
  {
    "n": 12,
    "title": "Your Big Project: Make It Work, Explain It &amp; Share Safely",
    "range": "Days 78–84",
    "outcome": "I have improved a project I chose, tested it with examples, and can show or explain it safely to people I trust.",
    "days": [
      {
        "d": "78",
        "t": "Plan a small project around a question you care about",
        "tasks": [
          "Choose a small job for your project, such as finding a fact in a story-world guide",
          "Draw the steps from a question to a helpful answer",
          "Choose fictional or public information for it to use",
          "<b>Build:</b> sketch a simple plan and ask an adult to check any setup that uses accounts or downloads"
        ],
        "done": "You can explain what your project is for and show its main steps in a drawing."
      },
      {
        "d": "79",
        "t": "Connect the pieces you understand",
        "tasks": [
          "Connect the parts you understand: question, notes, search, and answer",
          "Show which note might support the answer",
          "Keep it on your own computer with pretend examples",
          "<b>Build:</b> try one question from beginning to end and write down what happened"
        ],
        "done": "Your project can try one useful question and show a note that may help answer it."
      },
      {
        "d": "80",
        "t": "Try new examples and look for surprises",
        "tasks": [
          "Try your project with three different pretend questions",
          "Include one question you expect it to find difficult",
          "Notice where it takes longer or gives a less useful answer",
          "<b>Try:</b> change one small thing and compare again"
        ],
        "done": "You can name one example that worked well and one that needs improvement."
      },
      {
        "d": "81",
        "t": "Write a friendly guide to your project",
        "lever": true,
        "tasks": [
          "List two things someone might find confusing when trying your project",
          "Write simple steps for trying it with pretend examples",
          "Add a note about what the project cannot do yet",
          "<b>Build:</b> make a one-page friendly guide with a picture or diagram"
        ],
        "done": "You have a short note that tells someone you trust how to try your project and what to do if it gets stuck."
      },
      {
        "d": "82",
        "t": "Tell the story of your project",
        "lever": true,
        "tasks": [
          "Tell the story: what you wondered, what you made, and what happened",
          "Add one example that worked and one that surprised you",
          "Explain one limitation and one thing you would like to improve",
          "<b>Build:</b> write a short project story, draw it, or explain it to someone you trust"
        ],
        "done": "Someone you trust can understand what your project does and what you learned from making it."
      },
      {
        "d": "83",
        "t": "Choose a question you still want to explore",
        "tasks": [
          "Look back through your experiment notes",
          "Choose one result that surprised you and try to explain why",
          "Draw or describe what you might test next",
          "<b>Try:</b> explain one idea to a curious friend or trusted adult"
        ],
        "done": "You can choose one question about your project and explain what you know, what you are unsure about, and how you might find out."
      },
      {
        "d": "84",
        "t": "Show what you made: a project you can explain",
        "ship": true,
        "tasks": [
          "Choose one small part of your project you would like to show",
          "Try it with a few pretend examples and note what happens",
          "Draw a simple picture showing how a question becomes an answer",
          "Celebrate the project, including the parts you are still figuring out"
        ],
        "done": "You can demonstrate your project privately or share it with a trusted adult, and explain one thing you are proud of and one thing you would improve."
      }
    ]
  },
  {
    "n": 13,
    "title": "Optional Challenges: What Else Can Your Project Do?",
    "range": "Days 85–90",
    "outcome": "I can choose a challenge that interests me, test a project under new conditions, and decide what I want to explore next.",
    "days": [
      {
        "d": "85",
        "t": "Optional: what should happen if a helper is unavailable?",
        "tasks": [
          "Optional: imagine what your project should do if its helper is unavailable",
          "Add a friendly message explaining that it cannot answer right now",
          "Try a simple pretend failure in a local example",
          "<b>Try:</b> draw what the learner should see when something goes wrong"
        ],
        "done": "You have a friendly message for when your project cannot answer."
      },
      {
        "d": "86",
        "t": "Optional: compare how long two versions take",
        "tasks": [
          "Optional: compare how long two pretend versions of your program take",
          "Guess which step takes the longest, then measure it",
          "Try one small change and compare again",
          "<b>Try:</b> draw a simple before-and-after chart"
        ],
        "done": "You can describe what changed and whether your guess about speed was right."
      },
      {
        "d": "87",
        "t": "Add a friendly help note for your project",
        "tasks": [
          "Imagine three ways your project might get confused",
          "Write a calm note describing what to try if one happens",
          "Make sure the project cannot spend money or change real information by itself",
          "<b>Try:</b> add a friendly help or reset instruction"
        ],
        "done": "Someone you trust can follow your guide to try the project and reset it safely."
      },
      {
        "d": "88",
        "t": "Draw how your project works",
        "tasks": [
          "Draw the path from a question to the answer your project gives",
          "Label any notes, search, or model steps that are involved",
          "Circle one place where the project could make a mistake",
          "<b>Try:</b> explain the drawing in your own words"
        ],
        "done": "You can explain the main steps in your project and point to one place that needs careful checking."
      },
      {
        "d": "89",
        "t": "Optional: improve one small thing",
        "tasks": [
          "Optional: choose one part of your project to make a little clearer or more useful",
          "Try a new made-up example and see what happens",
          "Ask someone you trust what they find confusing",
          "<b>Try:</b> improve one small thing, or decide it is good enough for now"
        ],
        "done": "You tried one new idea and can say what you learned, even if you decide not to keep the change."
      },
      {
        "d": "90",
        "t": "Celebrate, reflect &amp; choose your next question",
        "ship": true,
        "tasks": [
          "Show your project privately to someone you trust, or keep it for yourself",
          "Explain one thing you learned and one question you still have",
          "Choose one question you want to explore next, then draw or write down how you might investigate it",
          "Celebrate what you made, what surprised you, and what you want to discover next"
        ],
        "done": "You have followed your curiosity, built something you understand, and chosen a next question to explore. The optional challenges can be skipped or revisited any time."
      }
    ]
  }
];
