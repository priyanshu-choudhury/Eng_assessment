const examples = {
intro: `name = "Priyanshu"
interests = ["Mathematics", "AI", "Building", "Wildlife photography"]

print(f"Hi, I'm {name}!")
for interest in interests:
    print(f"  Exploring: {interest}")

print("Still learning. Always curious.")`,
primes: `# Change the limit and run again.
limit = 50
primes = []

for number in range(2, limit + 1):
    if all(number % d != 0 for d in range(2, int(number ** 0.5) + 1)):
        primes.append(number)

print(f"Primes up to {limit}:")
print(primes)
print(f"Found {len(primes)} prime numbers.")`,
fibonacci: `# Each number is the sum of the previous two.
terms = 12
a, b = 0, 1
sequence = []

for _ in range(terms):
    sequence.append(a)
    a, b = b, a + b

print("Fibonacci sequence:")
print(sequence)`
};
const editor = document.querySelector('#python-code');
const output = document.querySelector('#python-output');
const runButton = document.querySelector('#run-python');
const stopButton = document.querySelector('#stop-python');
editor.value = examples.intro;
document.querySelectorAll('[data-preset]').forEach(button => button.addEventListener('click', () => {
  editor.value = examples[button.dataset.preset];
  document.querySelectorAll('[data-preset]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
}));
let worker, timer, running = false, printed = 0;
function endRun() { clearTimeout(timer); running = false; runButton.disabled = false; stopButton.disabled = true; runButton.textContent = '▶ Run Python'; }
function terminate(message) { if (worker) worker.terminate(); worker = null; endRun(); output.textContent += '\n' + message; }
function makeWorker() {
  worker = new Worker('python-worker.js');
  worker.onmessage = event => {
    const {type, text} = event.data;
    if (type === 'ready') { output.textContent = ''; runButton.textContent = 'Running…'; }
    if (type === 'stdout' && printed++ < 500) output.textContent += text.slice(0, 2000) + '\n';
    if (type === 'done') { if (!output.textContent) output.textContent = 'Completed. Add print(...) to display output.'; endRun(); }
    if (type === 'error') { output.textContent += '\n' + text; worker.terminate(); worker = null; endRun(); }
  };
  worker.onerror = () => terminate('Could not start Python. Check your internet connection and try again. You can also copy the code into a local Python editor.');
}
runButton.addEventListener('click', () => {
  if (running) return;
  printed = 0; running = true; runButton.disabled = true; stopButton.disabled = false;
  output.textContent = '> Loading Python… The first run can take a little while.';
  runButton.textContent = 'Loading…';
  if (!worker) makeWorker();
  worker.postMessage({code: editor.value});
  timer = setTimeout(() => terminate('Stopped after 60 seconds. If the runtime was still loading, check your connection and retry.'), 60000);
});
stopButton.addEventListener('click', () => terminate('Stopped.'));
document.querySelector('#copy-python').addEventListener('click', async event => {
  try { await navigator.clipboard.writeText(editor.value); event.target.textContent = 'Copied ✓'; }
  catch { editor.focus(); editor.select(); event.target.textContent = 'Selected — press Ctrl/Cmd+C'; }
  setTimeout(() => event.target.textContent = 'Copy code', 2500);
});
const svg = document.querySelector('#pattern');
const slider = document.querySelector('#multiplier');
function drawPattern() {
  const factor = Number(slider.value); document.querySelector('#multiplier-value').value = factor.toFixed(1);
  let markup = '<circle cx="150" cy="150" r="131" fill="none" stroke="currentColor" opacity=".3"/>';
  for (let i=0;i<100;i++) {
    const a = i / 100 * Math.PI * 2, b = ((i * factor) % 100) / 100 * Math.PI * 2;
    markup += `<line x1="${150+130*Math.cos(a)}" y1="${150+130*Math.sin(a)}" x2="${150+130*Math.cos(b)}" y2="${150+130*Math.sin(b)}" stroke="currentColor" stroke-width=".7" opacity=".55"/>`;
  }
  svg.innerHTML = markup; svg.setAttribute('aria-label', `Circular multiplication pattern with multiplier ${factor.toFixed(1)}`);
}
slider.addEventListener('input', drawPattern);
document.querySelector('#random-pattern').addEventListener('click',()=>{slider.value=(2+Math.random()*28).toFixed(1);drawPattern()});
drawPattern();
const themeButton=document.querySelector('.theme-toggle');
function setTheme(light){document.body.classList.toggle('light',light);themeButton.textContent=light?'☾ Dark mode':'☀ Light mode';themeButton.setAttribute('aria-label',light?'Switch to dark theme':'Switch to light theme');}
try{setTheme(localStorage.getItem('portfolio-theme')==='light')}catch{}
themeButton.addEventListener('click',()=>{const light=!document.body.classList.contains('light');setTheme(light);try{localStorage.setItem('portfolio-theme',light?'light':'dark')}catch{}});
const curiosities = ['Every prime greater than 2 is odd. But not every odd number is prime!', 'The Fibonacci sequence starts 0, 1, 1, 2, 3, 5… Try it in the Python playground.', 'A model can sound confident and still be wrong. Curiosity includes checking the answer.', 'A good photograph starts with noticing. So does a good question.', 'Try multiplier 2 in the Pattern Lab. Then try 3. Same rule, different shape!'];
let curiosity = 0;
document.querySelector('#companion-button').addEventListener('click',()=>{document.querySelector('#companion-message').textContent=curiosities[curiosity++ % curiosities.length]});
