"use client";

import {
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  Download,
  Gauge,
  LayoutDashboard,
  Leaf,
  LockKeyhole,
  Menu,
  Minus,
  Plus,
  RefreshCw,
  Repeat2,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

type View = "Overview" | "Meetings" | "Reports" | "Policies";

const weekData = [
  { day: "Mon", credits: 20, meetings: 3 },
  { day: "Tue", credits: 34, meetings: 4 },
  { day: "Wed", credits: 44, meetings: 5 },
  { day: "Thu", credits: 26, meetings: 3 },
  { day: "Fri", credits: 32, meetings: 4 },
];

const meetings = [
  {
    id: "G-29A7",
    time: "Today · 10:00 AM",
    duration: 60,
    people: 9,
    credits: 18,
    type: "Recurring",
    accepted: 8,
    tone: "costly",
  },
  {
    id: "G-18C4",
    time: "Today · 1:30 PM",
    duration: 30,
    people: 5,
    credits: 5,
    type: "One-time",
    accepted: 5,
    tone: "steady",
  },
  {
    id: "G-42F1",
    time: "Tomorrow · 9:00 AM",
    duration: 45,
    people: 7,
    credits: 10.5,
    type: "Recurring",
    accepted: 6,
    tone: "watch",
  },
  {
    id: "G-71B3",
    time: "Tomorrow · 3:00 PM",
    duration: 30,
    people: 4,
    credits: 4,
    type: "One-time",
    accepted: 4,
    tone: "steady",
  },
];

const nav: { label: View; icon: typeof Gauge }[] = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Meetings", icon: CalendarDays },
  { label: "Reports", icon: BarChart3 },
  { label: "Policies", icon: Settings2 },
];

function PrivacyMark({ small = false }: { small?: boolean }) {
  return (
    <span className={small ? "privacy-mark small" : "privacy-mark"}>
      <LockKeyhole size={small ? 11 : 13} strokeWidth={2.2} />
      No meeting content stored
    </span>
  );
}

function Overview({
  onView,
  onToast,
}: {
  onView: (view: View) => void;
  onToast: (message: string) => void;
}) {
  const [period, setPeriod] = useState("This week");
  const used = 156;
  const budget = 220;
  const percent = Math.round((used / budget) * 100);

  return (
    <>
      <section className="hero-row">
        <div>
          <span className="eyebrow">TEAM OVERVIEW</span>
          <h1>Make room for work.</h1>
          <p className="hero-copy">
            Your team is using fewer meeting credits—and protecting more focus
            time.
          </p>
        </div>
        <label className="select-wrap">
          <span className="sr-only">Reporting period</span>
          <select value={period} onChange={(event) => setPeriod(event.target.value)}>
            <option>This week</option>
            <option>Last week</option>
            <option>Last 4 weeks</option>
          </select>
          <ChevronDown size={15} />
        </label>
      </section>

      <section className="budget-panel">
        <div className="budget-copy">
          <div className="section-kicker">
            <Gauge size={17} />
            ENGINEERING · WEEKLY BUDGET
          </div>
          <div className="budget-value">
            <strong>{budget - used}</strong>
            <span>credits left</span>
          </div>
          <p>
            {used} of {budget} used · Resets Monday
          </p>
        </div>
        <div className="budget-visual">
          <div className="budget-meta">
            <span>{percent}% used</span>
            <span>On track</span>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-valuenow={used}
            aria-valuemin={0}
            aria-valuemax={budget}
            aria-label="Weekly credits used"
          >
            <span style={{ width: `${percent}%` }} />
          </div>
          <div className="budget-scale">
            <span>0</span>
            <span>{budget} credits</span>
          </div>
        </div>
        <div className="budget-note">
          <ArrowDownRight size={19} />
          <div>
            <strong>14% less than last week</strong>
            <span>22 credits returned to focus time</span>
          </div>
        </div>
      </section>

      <section className="metric-grid">
        <article className="metric-block">
          <div className="metric-label">
            <Clock3 size={16} />
            INTERNAL HOURS
          </div>
          <strong>78h</strong>
          <span className="good-stat">↓ 9.2% vs. baseline</span>
        </article>
        <article className="metric-block">
          <div className="metric-label">
            <Users size={16} />
            LARGE MEETINGS
          </div>
          <strong>4</strong>
          <span>More than 8 people</span>
        </article>
        <article className="metric-block">
          <div className="metric-label">
            <Repeat2 size={16} />
            RECURRING LOAD
          </div>
          <strong>1,248</strong>
          <span>Credits projected / quarter</span>
        </article>
        <article className="metric-block accent">
          <div className="metric-label">
            <Leaf size={16} />
            FOCUS RECLAIMED
          </div>
          <strong>11.5h</strong>
          <span>Across 12 teammates</span>
        </article>
      </section>

      <section className="overview-grid">
        <article className="chart-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">MEETING LOAD</span>
              <h2>Credits by day</h2>
            </div>
            <span className="comparison">— team daily target</span>
          </div>
          <div className="bar-chart" aria-label="Meeting credits by weekday">
            {weekData.map((item) => (
              <div className="bar-column" key={item.day}>
                <span className="bar-value">{item.credits}</span>
                <div className="bar-rail">
                  <span style={{ height: `${item.credits * 1.7}%` }} />
                </div>
                <strong>{item.day}</strong>
                <small>{item.meetings} mtgs</small>
              </div>
            ))}
            <span className="target-line" />
          </div>
        </article>

        <article className="opportunity-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">NEXT BEST ACTION</span>
              <h2>Save 12 credits</h2>
            </div>
            <Sparkles size={21} />
          </div>
          <p>
            One recurring 60-minute meeting has 9 internal attendees. Trimming
            it to 30 minutes would return 234 credits this quarter.
          </p>
          <div className="meeting-token">
            <Repeat2 size={15} />
            <span>Private event · Tuesdays at 10:00 AM</span>
          </div>
          <button
            className="primary-button"
            onClick={() => onToast("Recommendation opened in Google Calendar")}
          >
            Review in Calendar <ArrowRight size={16} />
          </button>
        </article>
      </section>

      <section className="meeting-section">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">COMING UP</span>
            <h2>Highest-impact meetings</h2>
          </div>
          <button className="text-button" onClick={() => onView("Meetings")}>
            View all meetings <ArrowRight size={15} />
          </button>
        </div>
        <div className="meeting-table">
          <div className="table-row table-head">
            <span>EVENT</span>
            <span>FORMAT</span>
            <span>ATTENDANCE</span>
            <span>COST</span>
            <span />
          </div>
          {meetings.slice(0, 3).map((meeting) => (
            <div className="table-row" key={meeting.id}>
              <span className="event-cell">
                <span className={`cost-dot ${meeting.tone}`} />
                <span>
                  <strong>Private event · {meeting.id}</strong>
                  <small>{meeting.time}</small>
                </span>
              </span>
              <span>
                <strong>{meeting.duration} min</strong>
                <small>{meeting.type}</small>
              </span>
              <span>
                <strong>{meeting.people} internal</strong>
                <small>{meeting.accepted} accepted</small>
              </span>
              <span className="credit-cell">
                <strong>{meeting.credits}</strong>
                <small>credits</small>
              </span>
              <button
                className="row-action"
                aria-label={`Open ${meeting.id}`}
                onClick={() => onToast(`${meeting.id} opened in Calendar`)}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
        <PrivacyMark />
      </section>
    </>
  );
}

function Meetings({ onToast }: { onToast: (message: string) => void }) {
  const [minutes, setMinutes] = useState(45);
  const [people, setPeople] = useState(6);
  const calculated = (minutes / 30) * people;

  return (
    <>
      <section className="hero-row">
        <div>
          <span className="eyebrow">MEETING LEDGER</span>
          <h1>See the cost, not the content.</h1>
          <p className="hero-copy">
            Plan proposed meetings, review realized attendance, and understand
            every adjustment.
          </p>
        </div>
        <PrivacyMark />
      </section>

      <section className="calculator-panel">
        <div className="calculator-intro">
          <span className="section-kicker">
            <Zap size={17} /> QUICK CALCULATOR
          </span>
          <h2>What will this meeting cost?</h2>
          <p>Credits = meeting minutes ÷ 30 × internal participants.</p>
        </div>
        <div className="stepper-field">
          <label>Duration</label>
          <div className="stepper">
            <button
              aria-label="Reduce duration"
              onClick={() => setMinutes(Math.max(15, minutes - 15))}
            >
              <Minus size={16} />
            </button>
            <strong>{minutes} min</strong>
            <button
              aria-label="Increase duration"
              onClick={() => setMinutes(Math.min(180, minutes + 15))}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        <div className="stepper-field">
          <label>Internal people</label>
          <div className="stepper">
            <button
              aria-label="Reduce participants"
              onClick={() => setPeople(Math.max(1, people - 1))}
            >
              <Minus size={16} />
            </button>
            <strong>{people}</strong>
            <button
              aria-label="Increase participants"
              onClick={() => setPeople(Math.min(30, people + 1))}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        <div className="calculated-credit">
          <span>PROPOSED COST</span>
          <strong>{Number.isInteger(calculated) ? calculated : calculated.toFixed(1)}</strong>
          <small>credits</small>
        </div>
      </section>

      <section className="meeting-section full-ledger">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">THIS WEEK</span>
            <h2>Credit ledger</h2>
          </div>
          <button
            className="outline-button"
            onClick={() => onToast("Ledger export prepared")}
          >
            <Download size={15} /> Export
          </button>
        </div>
        <div className="meeting-table">
          <div className="table-row table-head">
            <span>EVENT</span>
            <span>FORMAT</span>
            <span>ATTENDANCE</span>
            <span>COST</span>
            <span />
          </div>
          {meetings.map((meeting) => (
            <div className="table-row" key={meeting.id}>
              <span className="event-cell">
                <span className={`cost-dot ${meeting.tone}`} />
                <span>
                  <strong>Private event · {meeting.id}</strong>
                  <small>{meeting.time}</small>
                </span>
              </span>
              <span>
                <strong>{meeting.duration} min</strong>
                <small>{meeting.type}</small>
              </span>
              <span>
                <strong>{meeting.people} internal</strong>
                <small>{meeting.accepted} accepted</small>
              </span>
              <span className="credit-cell">
                <strong>{meeting.credits}</strong>
                <small>credits</small>
              </span>
              <button
                className="row-action"
                aria-label={`Review ${meeting.id}`}
                onClick={() => onToast(`Reviewing ${meeting.id}`)}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Reports({ onToast }: { onToast: (message: string) => void }) {
  return (
    <>
      <section className="hero-row">
        <div>
          <span className="eyebrow">WEEKLY REPORT</span>
          <h1>Small changes, compounding returns.</h1>
          <p className="hero-copy">
            A private view for each employee and an aggregated pulse for the
            team.
          </p>
        </div>
        <button
          className="outline-button"
          onClick={() => onToast("Weekly report downloaded")}
        >
          <Download size={15} /> Download report
        </button>
      </section>

      <section className="report-hero">
        <div className="report-lead">
          <span className="eyebrow">JULY 20–26</span>
          <strong>11.5 hours</strong>
          <h2>returned to focused work</h2>
          <p>
            Engineering reduced internal meeting time without changing team
            participation or collaboration quality.
          </p>
        </div>
        <div className="report-scorecard">
          <div>
            <span>Credits / employee</span>
            <strong>13.0</strong>
            <small>↓ 9.2%</small>
          </div>
          <div>
            <span>Recurring projection</span>
            <strong>1,248</strong>
            <small>↓ 16%</small>
          </div>
          <div>
            <span>Overrides</span>
            <strong>3.1%</strong>
            <small>Within target</small>
          </div>
        </div>
      </section>

      <section className="report-grid">
        <article>
          <span className="report-number">01</span>
          <div>
            <h3>Three meetings got shorter</h3>
            <p>
              Organizers accepted three 30-minute suggestions, saving 18
              credits this week.
            </p>
          </div>
        </article>
        <article>
          <span className="report-number">02</span>
          <div>
            <h3>One recurring series ended</h3>
            <p>
              A monthly series was removed, returning 96 projected annual
              credits.
            </p>
          </div>
        </article>
        <article>
          <span className="report-number">03</span>
          <div>
            <h3>Collaboration stayed steady</h3>
            <p>
              Team pulse remained at 4.3 / 5, matching the pre-pilot baseline.
            </p>
          </div>
        </article>
      </section>
    </>
  );
}

function Policies({ onToast }: { onToast: (message: string) => void }) {
  const [weeklyBudget, setWeeklyBudget] = useState(220);
  const [carryover, setCarryover] = useState(false);
  const [warnings, setWarnings] = useState(true);

  return (
    <>
      <section className="hero-row">
        <div>
          <span className="eyebrow">TEAM POLICIES</span>
          <h1>Guardrails people can trust.</h1>
          <p className="hero-copy">
            Set a clear budget, keep useful exemptions, and make overrides
            visible—not punitive.
          </p>
        </div>
        <button className="primary-button" onClick={() => onToast("Policy saved")}>
          <Check size={16} /> Save changes
        </button>
      </section>

      <section className="policy-layout">
        <div className="policy-main">
          <article className="settings-section">
            <div className="settings-title">
              <span>01</span>
              <div>
                <h2>Weekly team budget</h2>
                <p>Credits reset every Monday at 12:00 AM local time.</p>
              </div>
            </div>
            <div className="budget-input">
              <button
                aria-label="Reduce budget"
                onClick={() => setWeeklyBudget(Math.max(50, weeklyBudget - 10))}
              >
                <Minus size={17} />
              </button>
              <strong>{weeklyBudget}</strong>
              <span>credits / week</span>
              <button
                aria-label="Increase budget"
                onClick={() => setWeeklyBudget(weeklyBudget + 10)}
              >
                <Plus size={17} />
              </button>
            </div>
          </article>

          <article className="settings-section">
            <div className="settings-title">
              <span>02</span>
              <div>
                <h2>Behavior</h2>
                <p>Choose how the team experiences its credit policy.</p>
              </div>
            </div>
            <div className="toggle-list">
              <label>
                <span>
                  <strong>Contextual cost warnings</strong>
                  <small>Show guidance when a meeting is unusually costly.</small>
                </span>
                <input
                  type="checkbox"
                  checked={warnings}
                  onChange={(event) => setWarnings(event.target.checked)}
                />
              </label>
              <label>
                <span>
                  <strong>Unused credit carryover</strong>
                  <small>Move up to 10% of unused credits into next week.</small>
                </span>
                <input
                  type="checkbox"
                  checked={carryover}
                  onChange={(event) => setCarryover(event.target.checked)}
                />
              </label>
            </div>
          </article>

          <article className="settings-section">
            <div className="settings-title">
              <span>03</span>
              <div>
                <h2>Automatic exemptions</h2>
                <p>These events never consume the organizer team’s budget.</p>
              </div>
            </div>
            <div className="exemption-list">
              {["All-day events", "Focus time", "Out of office", "Externally organized"].map(
                (item) => (
                  <span key={item}>
                    <Check size={14} /> {item}
                  </span>
                ),
              )}
            </div>
          </article>
        </div>
        <aside className="privacy-card">
          <ShieldCheck size={28} />
          <span className="eyebrow">PRIVACY BY DEFAULT</span>
          <h2>Measure time. Leave content alone.</h2>
          <p>
            Interval stores provider IDs, timing, attendance counts, responses,
            credits, and cancellation state.
          </p>
          <div className="never-list">
            <span>
              <X size={14} /> No titles
            </span>
            <span>
              <X size={14} /> No descriptions
            </span>
            <span>
              <X size={14} /> No guest notes
            </span>
            <span>
              <X size={14} /> No conferencing URLs
            </span>
          </div>
        </aside>
      </section>
    </>
  );
}

export default function Home() {
  const [view, setView] = useState<View>("Overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const content = useMemo(() => {
    if (view === "Meetings") return <Meetings onToast={showToast} />;
    if (view === "Reports") return <Reports onToast={showToast} />;
    if (view === "Policies") return <Policies onToast={showToast} />;
    return <Overview onView={setView} onToast={showToast} />;
  }, [view]);

  return (
    <main className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brand">
          <span className="brand-mark">I</span>
          <span>INTERVAL</span>
        </div>
        <button
          className="mobile-close"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation"
        >
          <X size={20} />
        </button>

        <div className="workspace-switcher">
          <span className="workspace-avatar">AC</span>
          <span>
            <small>WORKSPACE</small>
            <strong>Acme & Co.</strong>
          </span>
          <ChevronDown size={15} />
        </div>

        <nav aria-label="Main navigation">
          <span className="nav-label">WORKSPACE</span>
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={view === item.label ? "active" : ""}
                onClick={() => {
                  setView(item.label);
                  setMobileOpen(false);
                }}
              >
                <Icon size={17} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="pilot-card">
            <span>PILOT · DAY 18 OF 30</span>
            <strong>12 days to build a calmer week.</strong>
            <div>
              <span style={{ width: "60%" }} />
            </div>
          </div>
          <button onClick={() => showToast("Help center opened")}>
            <CircleHelp size={17} /> Help center
          </button>
          <div className="user-row">
            <span className="user-avatar">AM</span>
            <span>
              <strong>Alex Morgan</strong>
              <small>Workspace admin</small>
            </span>
            <ChevronDown size={15} />
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <button
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <section className="main-area">
        <header className="topbar">
          <button
            className="mobile-menu"
            aria-label="Open navigation"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="sync-status">
            <span className="sync-dot" />
            Google Calendar connected
            <span className="sync-time">Synced 4 min ago</span>
          </div>
          <div className="top-actions">
            <button
              className="icon-button"
              aria-label="Sync calendar"
              onClick={() => showToast("Calendar sync started")}
            >
              <RefreshCw size={17} />
            </button>
            <button
              className="icon-button notification"
              aria-label="Notifications"
              onClick={() => showToast("No new notifications")}
            >
              <Bell size={17} />
              <span />
            </button>
          </div>
        </header>
        <div className="content">{content}</div>
        <footer>
          <span>INTERVAL</span>
          <span>Privacy-first meeting intelligence</span>
          <span>© 2026</span>
        </footer>
      </section>

      {toast && (
        <div className="toast" role="status">
          <Check size={16} /> {toast}
        </div>
      )}
    </main>
  );
}
