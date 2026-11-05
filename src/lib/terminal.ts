/**
 * Interactive hero terminal (src/components/home/Terminal.astro).
 *
 * Plain DOM, no framework. All output is built with textContent / anchors, so
 * nothing typed by a visitor is ever parsed as HTML. Hidden commands are the
 * easter eggs; they are left out of `help` and tab completion on purpose.
 */
import { toggleDarkMode, setDarkMode, isDarkMode } from './theme';
import { openSearch } from './search';

export interface TerminalData {
  user: string;
  owner: string;
  host: string;
  role: string;
  company: string;
  startYear: number;
  timezone: string;
  email: string;
  about: string;
  posts: { title: string; href: string; date: string }[];
  links: { label: string; href: string }[];
}

type Segment = string | { text: string; href: string };
type Line = Segment | Segment[];

interface Command {
  summary?: string; // present = listed in help and tab completion
  run: (args: string[]) => Line[] | void;
}

const PAGES: Record<string, string> = {
  '~': '/',
  home: '/',
  blog: '/blog',
  posts: '/blog',
  projects: '/projects',
  series: '/series',
  archive: '/archive',
  tags: '/blog/tags',
  contact: '/contact',
};

const isTypingTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));

export function initTerminal(root: HTMLElement): void {
  const data = JSON.parse(root.querySelector('[data-term-data]')?.textContent ?? '{}') as TerminalData;
  const screen = root.querySelector<HTMLElement>('[data-term-screen]');
  const form = root.querySelector<HTMLFormElement>('[data-term-form]');
  const input = root.querySelector<HTMLInputElement>('[data-term-input]');
  const fetchBlock = root.querySelector<HTMLElement>('[data-term-fetch]');
  if (!screen || !form || !input) return;

  const prompt = `${data.user}@${data.host}:~$`;
  const history: string[] = [];
  let historyIndex = 0;

  /* ---------- output ---------- */

  const renderSegment = (segment: Segment): Node => {
    if (typeof segment === 'string') return document.createTextNode(segment);
    const link = document.createElement('a');
    link.href = segment.href;
    link.textContent = segment.text;
    if (/^https?:/.test(segment.href)) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    return link;
  };

  const print = (lines: Line[], className = '') => {
    const block = document.createElement('div');
    block.className = `term__out ${className}`.trim();
    for (const line of lines) {
      const row = document.createElement('p');
      (Array.isArray(line) ? line : [line]).forEach((segment) => row.append(renderSegment(segment)));
      block.append(row);
    }
    screen.append(block);
  };

  const echo = (raw: string) => {
    const row = document.createElement('p');
    row.className = 'term__echo';
    const promptEl = document.createElement('span');
    promptEl.className = 'term__prompt';
    promptEl.textContent = prompt;
    row.append(promptEl, ` ${raw}`);
    screen.append(row);
  };

  const scrollToEnd = () => {
    screen.scrollTop = screen.scrollHeight;
  };

  const navigate = (path: string): Line[] => {
    window.setTimeout(() => window.location.assign(path), 300);
    return [`Opening ${path} …`];
  };

  const years = new Date().getFullYear() - data.startYear;
  const jakartaTime = (options: Intl.DateTimeFormatOptions) =>
    new Date().toLocaleString('en-GB', { timeZone: data.timezone, ...options });

  /* ---------- commands ---------- */

  const commands: Record<string, Command> = {
    help: {
      summary: 'list commands',
      run: () => [
        'Commands:',
        ...Object.entries(commands)
          .filter(([, command]) => command.summary)
          .map(([name, command]) => `  ${name.padEnd(14)}${command.summary}`),
        '',
        'A few commands are hidden. Press ` anywhere on this page to jump back here.',
      ],
    },
    whoami: {
      summary: 'who you are, and whose machine this is',
      run: () => [
        data.user,
        `You're on ${data.owner}'s machine: ${data.role} at ${data.company}. Linux by day, AI on the side.`,
      ],
    },
    about: {
      summary: 'a short introduction',
      run: () => [data.about],
    },
    ls: {
      summary: 'latest posts',
      run: () => [
        ...data.posts.map((post) => [`${post.date}  `, { text: post.title, href: post.href }] as Segment[]),
        ['More: ', { text: '/blog', href: '/blog' }],
      ],
    },
    open: {
      summary: '<page> go to blog, projects, series, archive, contact',
      run: ([page]) => {
        if (!page) return ['Usage: open <page>', `Pages: ${Object.keys(PAGES).filter((p) => p !== '~').join(', ')}`];
        const path = PAGES[page.toLowerCase().replace(/^\/+|\/+$/g, '')];
        if (!path) return [`open: ${page}: No such page. Try: blog, projects, series, archive, contact`];
        return navigate(path);
      },
    },
    search: {
      summary: 'search every post',
      run: () => {
        openSearch();
        return ['Opening search …'];
      },
    },
    contact: {
      summary: 'how to reach me',
      run: () => [
        ['Email  ', { text: data.email, href: `mailto:${data.email}` }],
        'Or leave a comment under any post.',
        ...data.links.map((link) => [`${link.label.padEnd(7)}`, { text: link.href.replace(/^https?:\/\//, ''), href: link.href }] as Segment[]),
      ],
    },
    fetch: {
      summary: 'system info again',
      run: () => {
        if (fetchBlock) {
          const copy = fetchBlock.cloneNode(true) as HTMLElement;
          copy.removeAttribute('data-term-fetch');
          copy.classList.add('term__fetch--again');
          screen.append(copy);
        }
      },
    },
    uptime: {
      summary: 'how long this has been running',
      run: () => [
        ` ${jakartaTime({ hour: '2-digit', minute: '2-digit' })} up ${years} years (since ${data.startYear}), 1 user, load average: 0.42, 0.42, 0.42`,
      ],
    },
    date: {
      summary: 'time in Bogor',
      run: () => [jakartaTime({ dateStyle: 'full', timeStyle: 'long' })],
    },
    theme: {
      summary: '[dark|light] switch the color theme',
      run: ([mode]) => {
        if (mode === 'dark' || mode === 'light') setDarkMode(mode === 'dark');
        else toggleDarkMode();
        return [`Theme: ${isDarkMode() ? 'dark' : 'light'}`];
      },
    },
    history: {
      summary: 'commands you typed',
      run: () => (history.length ? history.map((cmd, i) => `${String(i + 1).padStart(4)}  ${cmd}`) : ['(empty)']),
    },
    clear: {
      summary: 'clear the screen (Ctrl+L)',
      run: () => {
        screen.replaceChildren();
      },
    },

    /* ---------- hidden: the easter eggs ---------- */
    cd: { run: ([dir]) => (!dir || dir === '~' ? ['Already home.'] : PAGES[dir] ? navigate(PAGES[dir]) : [`bash: cd: ${dir}: No such file or directory`]) },
    pwd: { run: () => [`/home/${data.user}`] },
    echo: { run: (args) => [args.join(' ')] },
    cat: {
      run: ([file]) =>
        !file ? ['cat: missing file operand'] : /^(readme(\.md)?|about(\.txt)?)$/i.test(file) ? [data.about] : [`cat: ${file}: No such file or directory`],
    },
    neofetch: { run: (args) => commands.fetch.run(args) },
    fastfetch: { run: (args) => commands.fetch.run(args) },
    email: { run: (args) => commands.contact.run(args) },
    sudo: {
      run: () => [`[sudo] password for ${data.user}: `, `${data.user} is not in the sudoers file. This incident will be reported.`],
    },
    rm: {
      run: (args) => {
        const recursive = args.some((a) => /^-[a-zA-Z]*r/.test(a));
        if (recursive && args.includes('/') && args.includes('--no-preserve-root')) {
          return ['Nice try. This is a static site, everything here is read-only.'];
        }
        if (recursive && args.includes('/')) {
          return ["rm: it is dangerous to operate recursively on '/'", 'rm: use --no-preserve-root to override this failsafe'];
        }
        return [`rm: cannot remove '${args.at(-1) ?? ''}': Read-only file system`];
      },
    },
    vim: { run: () => ["You'd never get out. For future reference: Esc, then :q!"] },
    vi: { run: () => commands.vim.run([]) },
    nvim: { run: () => commands.vim.run([]) },
    nano: { run: () => ['nano is fine. Nobody here will judge you.'] },
    emacs: { run: () => ['emacs: a great operating system, lacking only a decent editor.'] },
    exit: { run: () => ['logout', "There's no escape. Try open blog instead."] },
    logout: { run: () => commands.exit.run([]) },
    make: {
      run: ([target]) =>
        target ? [`make: *** No rule to make target '${target}'.  Stop.`] : ['make: *** No targets specified and no makefile found.  Stop.'],
    },
    ping: { run: () => ['pong. Still up.'] },
    hello: { run: () => ['Hi! Type help to look around.'] },
    hi: { run: () => commands.hello.run([]) },
  };

  const visibleNames = Object.keys(commands).filter((name) => commands[name].summary);

  const run = (raw: string) => {
    const [name = '', ...args] = raw.split(/\s+/);
    const command = commands[name.toLowerCase()];
    if (!command) {
      print([`bash: ${name}: command not found. Type help for the list.`], 'term__out--error');
      return;
    }
    const lines = command.run(args);
    if (lines?.length) print(lines);
  };

  /* ---------- input ---------- */

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const raw = input.value.trim();
    input.value = '';
    echo(raw);
    if (raw) {
      history.push(raw);
      historyIndex = history.length;
      run(raw);
    }
    scrollToEnd();
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      if (!history.length) return;
      event.preventDefault();
      historyIndex = Math.max(0, Math.min(history.length, historyIndex + (event.key === 'ArrowUp' ? -1 : 1)));
      input.value = history[historyIndex] ?? '';
    } else if (event.key === 'Tab' && input.value && !input.value.includes(' ')) {
      const matches = visibleNames.filter((name) => name.startsWith(input.value.toLowerCase()));
      if (matches.length === 1) {
        event.preventDefault();
        input.value = `${matches[0]} `;
      } else if (matches.length > 1) {
        event.preventDefault();
        echo(input.value);
        print([matches.join('  ')]);
        scrollToEnd();
      }
    } else if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();
      screen.replaceChildren();
    }
  });

  // Clicking the screen focuses the prompt, unless the visitor is selecting text or clicking a link
  screen.addEventListener('click', (event) => {
    if ((event.target as Element).closest('a') || window.getSelection()?.toString()) return;
    input.focus({ preventScroll: true });
  });

  // ` (backtick) anywhere on the page jumps back to the terminal
  window.addEventListener('keydown', (event) => {
    if (event.key !== '`' || event.metaKey || event.ctrlKey || event.altKey || isTypingTarget(event.target)) return;
    event.preventDefault();
    root.scrollIntoView({ behavior: 'smooth', block: 'center' });
    input.focus({ preventScroll: true });
  });
}
