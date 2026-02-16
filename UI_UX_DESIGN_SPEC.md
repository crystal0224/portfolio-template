# UI/UX Design Specification
## Portfolio Platform - Full Resume Version

---

## 1. Existing Design Pattern Analysis

### 1.1 Current Design Language

**Color System (from theme.css + Tailwind utilities)**
- Primary Gradient: `from-blue-500 to-purple-500` (accent line, dots, badges)
- Background: `bg-gray-50` (page), `bg-white` (cards, sections)
- Text: `text-gray-900` (headings), `text-gray-600` (body), `text-gray-500` (captions)
- Interactive: `bg-blue-600` (active filter, primary buttons), hover: `bg-blue-700`
- Platform badges: yellow (HuggingFace), teal (Netlify), black (Vercel), gray (GitHub)
- CSS Variables: `--primary: #030213`, `--radius: 0.625rem`, oklch-based color tokens

**Typography**
- Base: 16px (`--font-size`)
- Hero name: `text-5xl sm:text-6xl lg:text-7xl font-bold`
- Section headings: `text-4xl font-bold`
- Sub-headings: `text-2xl font-bold`
- Card title: `text-lg font-semibold`
- Body: `text-sm` to `text-base`
- Font weight: medium (500) for labels/buttons, normal (400) for body

**Spacing & Layout**
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Section padding: `py-24` (large sections), `py-12` (stats), `py-8` (footer)
- Card padding: `p-5` (content area), `p-6` (timeline items)
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Border radius: `rounded-xl` (cards), `rounded-2xl` (featured), `rounded-full` (buttons, badges)

**Animation (motion/react - Framer Motion)**
- Fade-in-up: `initial={{ opacity: 0, y: 20 }}` with staggered delays
- Slide-in: `initial={{ opacity: 0, x: -20 }}` (timeline)
- Scale: `whileHover={{ y: -5 }}` (cards), `whileHover={{ scale: 1.05 }}` (buttons)
- `viewport={{ once: true }}` for scroll-triggered animations

**UI Components Available (shadcn/ui)**
- Accordion, Tabs, Badge, Card, Dialog, Sheet, Tooltip, Collapsible
- All Radix UI primitives installed

### 1.2 Current Page Structure
```
PortfolioHeader (sticky, z-50)
  -> HeroSection (profile + bio)
  -> AboutSection (expertise, experience timeline, achievements, tech stack)
  -> StatsSection (4 metric cards)
  -> FilterBar (sticky, z-40, category pills + search)
  -> Portfolio Grid (3-column cards)
  -> Footer
```

### 1.3 Current Data Model (PortfolioItem)
```typescript
{
  id: string;
  title: string;
  description: string;
  category: "projects" | "lectures" | "publications" | "articles";
  platform?: string;
  image: string;
  tags: string[];
  links: { live?: string; github?: string; external?: string; };
  date: string;
  protected?: boolean;
}
```

---

## 2. Information Architecture

### 2.1 Section Order (New Full Resume Layout)

```
[Navigation Bar]          -- sticky header with section links
[Hero Section]            -- enhanced with key metrics overlay
[Overview Section]        -- NEW: executive summary + career highlights
[Experience Section]      -- enhanced: 4 companies with detailed descriptions
[Projects Section]        -- enhanced: 97 projects with smart filtering
[Education Section]       -- NEW: academic background
[Certifications Section]  -- NEW: 11 certifications in grid
[Publications Section]    -- NEW: 4 publications with detail
[Skills Section]          -- NEW: 13 skills organized by category
[Footer]                  -- contact info, social links
```

### 2.2 Project Organization Strategy (97 Projects)

97 projects should NOT all render at once. The strategy:

1. **Category Tabs** (top-level): 진단/리더십/채용/CEO브리프/분석방법론/강의/교육/제도
2. **Year Filter** (secondary): 2018-2022 horizontal slider or pills
3. **Compact List View** (default) with expand-on-click detail
4. **Lazy rendering**: Only render visible items (virtualized or paginated)
5. **Search**: Full-text search across title, description, tags

---

## 3. UI Pattern Decisions

### 3.1 Project Display: Grouped Timeline + Accordion

For 97 work projects (distinct from the existing tech/side projects):

**Pattern**: Year-grouped accordion sections, each containing a compact card list.

```
[2022] -------- (12 projects)
  > [Project Card] [Project Card] [Project Card]
  > [Project Card] ...

[2021] -------- (18 projects)
  > [Project Card] [Project Card] ...

... etc
```

Each card is a **compact horizontal card** (not the tall image card used for tech projects):
```
+---------------------------------------------------+
| [Category Badge]  Project Title           2022.03  |
| Brief description (1 line, truncated)              |
| [tag] [tag] [tag]                                  |
+---------------------------------------------------+
```

Click expands to full detail (accordion/collapsible behavior).

**Rationale**: 97 items in a 3-column image grid would be overwhelming. The compact list with year grouping provides scanability while still allowing deep exploration.

### 3.2 Experience Section: Enhanced Timeline

Expand the current 4-entry timeline with richer content:

```
+----------------------------------------------------------+
| [Company Logo/Icon]                                       |
| SK Group - SK Academy                    2023.05-Present  |
| Research Fellow | Leadership Assessment Team              |
|                                                           |
| - Key responsibility 1                                    |
| - Key responsibility 2                                    |
| - Key achievement with metric                             |
|                                                           |
| [Related Projects: 12]  [Skills: PA, Leadership, ...]     |
+----------------------------------------------------------+
         |  (timeline connector)
+----------------------------------------------------------+
| Samsung Global Research                   2018-2023       |
| ...                                                       |
+----------------------------------------------------------+
```

### 3.3 Certifications Grid

11 certifications in a responsive grid:

```
Desktop: 4 columns
Tablet: 3 columns
Mobile: 2 columns

+-----------------------+
| [Icon]                |
| Cert Name             |
| Issuing Organization  |
| Date                  |
+-----------------------+
```

### 3.4 Publications Section

4 publications - each gets a featured card:

```
+-------------------------------------------------------+
| [Book Cover/Icon]                                      |
| Publication Title                                      |
| Authors | Publisher | Year                              |
| Brief description                                      |
| [View Link]                                             |
+-------------------------------------------------------+
```

### 3.5 Skills Visualization

13 skills grouped by domain:

```
+--------- Research & Analytics ---------+
| [People Analytics]  [Data Analysis]    |
| [Statistical Modeling]                 |
+----------------------------------------+

+--------- HR & Leadership --------+
| [Leadership Assessment]  [HRD]  |
| [Talent Management]             |
+---------------------------------+

+--------- Technical ----------+
| [Python]  [R]  [SQL]        |
| [AI/ML]  [Visualization]    |
+------------------------------+
```

Use progress bars or radar chart (recharts is already installed) for proficiency levels.

### 3.6 Navigation: Section-Based ScrollSpy

Replace the current simple header with a navigation that highlights the active section:

```
[Logo] [Overview] [Experience] [Projects] [Education] [Certs] [Pubs] [Skills] [Contact]
```

- Desktop: horizontal nav bar, sticky
- Mobile: hamburger menu with Sheet component (already available)
- Active section highlighted via IntersectionObserver

---

## 4. Component Hierarchy

```
App.tsx
  +-- AdminProvider
  +-- AppContent
       +-- NavigationBar (enhanced from PortfolioHeader)
       |    +-- NavLink[] (scroll-to-section)
       |    +-- MobileMenu (Sheet)
       |    +-- SocialLinks
       |
       +-- HeroSection (enhanced)
       |    +-- ProfileImage
       |    +-- HeroInfo (name, title, bio)
       |    +-- QuickStats (inline metrics)
       |    +-- CTAButtons
       |
       +-- OverviewSection (NEW)
       |    +-- ExecutiveSummary
       |    +-- CareerHighlights (icon + metric cards)
       |
       +-- ExperienceSection (enhanced from AboutSection)
       |    +-- ExperienceTimeline
       |         +-- ExperienceCard[] (4 companies)
       |              +-- CompanyInfo
       |              +-- Responsibilities
       |              +-- RelatedProjectsBadge
       |
       +-- ProjectsSection (NEW - for 97 work projects)
       |    +-- ProjectFilterBar
       |    |    +-- CategoryTabs (8 categories)
       |    |    +-- YearFilter (pill buttons or slider)
       |    |    +-- SearchInput
       |    |    +-- ViewToggle (list/grid)
       |    +-- ProjectStatsBar (filtered count display)
       |    +-- ProjectYearGroup[] (grouped by year)
       |         +-- YearHeader (collapsible)
       |         +-- WorkProjectCard[] (compact)
       |              +-- CategoryBadge
       |              +-- ProjectTitle
       |              +-- ProjectMeta (date, tags)
       |              +-- ExpandedDetail (collapsible)
       |
       +-- TechProjectsSection (existing portfolio cards, renamed)
       |    +-- FilterBar (existing - for tech/side projects)
       |    +-- PortfolioCard[] (existing - 25+ tech projects)
       |
       +-- EducationSection (NEW)
       |    +-- EducationCard[]
       |         +-- DegreeInfo
       |         +-- InstitutionInfo
       |         +-- AcademicDetails (GPA, thesis, etc.)
       |
       +-- CertificationsSection (NEW)
       |    +-- CertificationGrid
       |         +-- CertificationCard[] (11 items)
       |
       +-- PublicationsSection (NEW)
       |    +-- PublicationCard[] (4 items)
       |         +-- BookCover/Icon
       |         +-- PublicationMeta
       |         +-- ExternalLink
       |
       +-- SkillsSection (NEW)
       |    +-- SkillCategory[]
       |    |    +-- SkillBadge[] (grouped)
       |    +-- SkillRadarChart (recharts, optional)
       |
       +-- Footer (enhanced)
            +-- ContactInfo
            +-- SocialLinks
            +-- Copyright
```

---

## 5. Detailed Section Layouts

### 5.1 NavigationBar

```
+-----------------------------------------------------------------------+
| [Logo: "SJ Bae"]  [Overview] [Experience] [Projects] [Education]      |
|                    [Certifications] [Publications] [Skills]  [Contact] |
+-----------------------------------------------------------------------+
```

- **Style**: `bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200`
- **Active link**: `text-blue-600 font-semibold` with blue underline indicator
- **Mobile**: Hamburger icon, opens `Sheet` from right side
- **Scroll behavior**: Shows/hides on scroll direction (optional enhancement)

### 5.2 HeroSection (Enhanced)

Layout remains the same (2-column: info left, photo right). Add:

```
Left column (below CTA buttons):
+------------------------------------------+
| [10+yrs Experience] [97 Projects]        |
| [11 Certifications] [4 Publications]     |
+------------------------------------------+
```

- Quick stat pills: `inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full shadow-sm`

### 5.3 OverviewSection

```
+-----------------------------------------------------------------------+
|                        Career Overview                                 |
|  "10년 이상 심리학과 데이터 분석을 결합하여..."                              |
|                                                                        |
|  +--- Highlight Card ---+  +--- Highlight Card ---+                    |
|  | [icon] 97            |  | [icon] 11            |                    |
|  | 업무 프로젝트         |  | 자격증               |                    |
|  | 진단, 리더십, 채용 등 |  | SPHR, PMP, ...       |                    |
|  +----------------------+  +----------------------+                    |
|  +--- Highlight Card ---+  +--- Highlight Card ---+                    |
|  | [icon] 4개사 경력     |  | [icon] 4             |                    |
|  | SK, Samsung, ...      |  | 출판물               |                    |
|  +----------------------+  +----------------------+                    |
+-----------------------------------------------------------------------+
```

- Background: `bg-white py-20`
- Cards: `bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl`
- Grid: `grid grid-cols-2 lg:grid-cols-4 gap-6`

### 5.4 ExperienceSection

Vertical timeline (existing pattern, enhanced):

```
  [dot]-- SK Group - SK Academy ----- 2023.05 - Present
  |       Research Fellow
  |       Leadership Assessment Team
  |
  |       - 리더십 진단 및 분석 연구
  |       - People Analytics 기반 조직 효과성 향상
  |       - 심리학/데이터 분석 기반 진단 도구 개발
  |
  |       [Related: 15 projects]  [Skills: PA, Leadership]
  |
  [dot]-- Samsung Global Research ---- 2018.08 - 2023.05
  |       ...
```

- Timeline line: `w-0.5 bg-gradient-to-b from-blue-500 to-purple-500` (existing)
- Timeline dot: `w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500` (existing)
- Company card: `bg-gray-50 rounded-lg p-6 hover:shadow-md` (existing, add more detail)
- Max width: `max-w-3xl mx-auto` (existing)

### 5.5 ProjectsSection (97 Work Projects)

```
+-----------------------------------------------------------------------+
|                     Work Projects (97)                                  |
|                                                                        |
| [전체] [진단] [리더십] [채용] [CEO브리프] [분석방법론] [강의] [교육] [제도]  |
| [2018] [2019] [2020] [2021] [2022]                  [Search...]        |
|                                                                        |
| Showing 23 of 97 projects                                              |
|                                                                        |
| -- 2022 (12 projects) --------- [expand/collapse] ---                  |
| +---------------------------+ +---------------------------+            |
| | [진단] 리더십 다면진단 개선 | | [리더십] 리더 역량 모델링  |            |
| | 설문 문항 재설계 및 타당도  | | 역량 프레임워크 개발 및    |            |
| | 검증 프로젝트...           | | 적용...                    |            |
| | [Python] [R] [IRT]   03월  | | [Analytics] [HR]     06월  |            |
| +---------------------------+ +---------------------------+            |
|                                                                        |
| -- 2021 (18 projects) --------- [expand/collapse] ---                  |
| ...                                                                    |
+-----------------------------------------------------------------------+
```

- Category tabs: Same pill style as existing FilterBar
- Year pills: `px-3 py-1 rounded-full text-xs` (smaller than category)
- Project cards: Compact 2-column grid
  - `bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow`
  - Category badge top-left: small colored dot or badge
  - Title: `text-base font-semibold`
  - Description: `text-sm text-gray-600 line-clamp-2`
  - Tags + date: bottom row, `text-xs text-gray-500`
- Year header: `text-xl font-bold text-gray-900` with project count badge
- Collapsible: Use existing `Collapsible` or `Accordion` component

### 5.6 TechProjectsSection (Existing Projects - Renamed)

Keep existing PortfolioCard grid as-is. Just rename section to "Tech & Side Projects" or "Featured Projects" and position it after work projects.

### 5.7 EducationSection

```
+-----------------------------------------------------------------------+
|                          Education                                     |
|                                                                        |
| +-- Main Degree Card -----------+  +-- Other Education Cards -------+ |
| | [GraduationCap icon]          |  | [University name]              | |
| | 서울대학교                     |  | Degree, Major                  | |
| | 인지심리학 박사 (통합과정)      |  | Period                         | |
| | 2011 - 2017                   |  | ...                            | |
| | GPA: 4.20 / 4.30              |  |                                | |
| |                               |  |                                | |
| | Thesis: "학습자 질문 및        |  |                                | |
| |  측정 방법론..."               |  |                                | |
| +-------------------------------+  +--------------------------------+ |
+-----------------------------------------------------------------------+
```

- Main degree: Featured card with gradient border
- Style: `bg-white border-2 border-transparent bg-clip-padding` with gradient pseudo-element
- Grid: `grid md:grid-cols-2 gap-8`

### 5.8 CertificationsSection

```
+-----------------------------------------------------------------------+
|                      Certifications (11)                               |
|                                                                        |
| +----------+ +----------+ +----------+ +----------+                   |
| | [icon]   | | [icon]   | | [icon]   | | [icon]   |                   |
| | Cert 1   | | Cert 2   | | Cert 3   | | Cert 4   |                   |
| | Issuer   | | Issuer   | | Issuer   | | Issuer   |                   |
| | 2023     | | 2022     | | 2021     | | 2020     |                   |
| +----------+ +----------+ +----------+ +----------+                   |
| +----------+ +----------+ +----------+                                |
| | ...      | | ...      | | ...      |                                |
| +----------+ +----------+ +----------+                                |
+-----------------------------------------------------------------------+
```

- Card: `bg-white border border-gray-200 rounded-xl p-5 text-center hover:shadow-lg transition-shadow`
- Icon: `inline-flex p-3 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 mb-3`
- Grid: `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`

### 5.9 PublicationsSection

```
+-----------------------------------------------------------------------+
|                       Publications (4)                                 |
|                                                                        |
| +------------------------------------------------------------------+  |
| | [Book icon / cover]                                               | |
| |                                                                   | |
| |  "HR테크혁명"                                                     | |
| |  공저 | 출판사 | 2023                                             | |
| |  HR 분야의 디지털 전환과 기술 활용에 대한                           | |
| |  전문서적...                                                      | |
| |                                            [View Details ->]      | |
| +------------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

- Card: Horizontal layout (image left, text right) on desktop
- `bg-white border border-gray-200 rounded-xl overflow-hidden flex`
- Mobile: Stack vertically
- Grid: `grid grid-cols-1 md:grid-cols-2 gap-6`

### 5.10 SkillsSection

```
+-----------------------------------------------------------------------+
|                          Skills (13)                                    |
|                                                                        |
|  +-- Research & Analytics --------+  +-- HR & Leadership -----------+ |
|  | [People Analytics ****]        |  | [Leadership Assessment ***]  | |
|  | [Data Analysis *****]          |  | [HRD ***]                    | |
|  | [Statistical Modeling ****]    |  | [Talent Mgmt ***]            | |
|  +--------------------------------+  +-------------------------------+ |
|                                                                        |
|  +-- Technical -------------------+  +-- Soft Skills ---------------+ |
|  | [Python ****]                  |  | [Research Design ****]       | |
|  | [R ***]                        |  | [Project Management ***]     | |
|  | [SQL ***]                      |  | [Communication ****]         | |
|  +--------------------------------+  +-------------------------------+ |
+-----------------------------------------------------------------------+
```

- Group cards: `bg-gray-50 rounded-xl p-6`
- Skill row: flex with name left, proficiency bar right
- Proficiency bar: `bg-gradient-to-r from-blue-500 to-purple-500` with width percentage
- Optional: Radar chart (recharts already installed)

---

## 6. Animation Specification

### 6.1 Consistent Animation Patterns

| Element | Animation | Duration | Delay |
|---------|-----------|----------|-------|
| Section header | fade-in-up | 0.6s | 0 |
| Cards in grid | fade-in-up, staggered | 0.6s | index * 0.1s |
| Timeline items | slide-in-left | 0.6s | index * 0.1s |
| Stats numbers | count-up | 1s | 0.3s |
| Skill bars | width grow | 0.8s | index * 0.05s |
| Nav links | fade-in-down | 0.5s | index * 0.05s |

### 6.2 Scroll Animations (viewport-triggered)

All section content uses `viewport={{ once: true }}` for performance.

### 6.3 Micro-interactions

- Card hover: `whileHover={{ y: -5 }}` + shadow increase (existing)
- Button hover: `whileHover={{ scale: 1.05 }}` (existing)
- Filter transition: `layout` animation on grid change
- Accordion: `animate-accordion-down/up` (existing Radix primitives)
- Collapsible year groups: smooth height transition

---

## 7. Responsive Breakpoints

### 7.1 Breakpoint Strategy (Tailwind defaults)

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Default (mobile) | < 640px | Single column, stacked layout, hamburger nav |
| `sm` | >= 640px | 2-column grids begin |
| `md` | >= 768px | 2-3 column grids, horizontal cards |
| `lg` | >= 1024px | Full nav bar, 3-4 column grids, timeline side-by-side |
| `xl` | >= 1280px | Max container width (`max-w-7xl` = 1280px) |

### 7.2 Component-Specific Breakpoints

**Navigation**
- Mobile (< lg): Hamburger menu -> Sheet slide-in
- Desktop (>= lg): Horizontal nav bar

**Hero Section**
- Mobile: Stacked (image on top, info below)
- Desktop: 2-column (info left, image right) - existing

**Projects Grid (97 work projects)**
- Mobile: 1 column, compact cards
- Tablet: 2 columns
- Desktop: 2-3 columns

**Tech Projects Grid (existing)**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns - existing

**Certifications**
- Mobile: 2 columns
- Tablet: 3 columns
- Desktop: 4 columns

**Filter Bar**
- Mobile: Scroll-x for category pills, search below
- Desktop: Flex row with search on right - existing

---

## 8. New Data Models

### 8.1 Work Project (for 97 projects)

```typescript
interface WorkProject {
  id: string;
  title: string;
  description: string;
  category: string;  // 진단 | 리더십 | 채용 | CEO브리프 | 분석방법론 | 강의 | 교육 | 제도
  year: number;      // 2018-2022
  month?: number;
  company: string;   // SK | Samsung | MIDAS | etc.
  tags: string[];
  details?: string;  // expanded description
  outcomes?: string[];  // key results/metrics
}
```

### 8.2 Experience (Enhanced)

```typescript
interface Experience {
  id: string;
  company: string;
  companyFull: string;
  role: string;
  team: string;
  period: { start: string; end: string | "Present"; };
  description: string;
  responsibilities: string[];
  achievements: string[];
  relatedProjectCount: number;
  skills: string[];
}
```

### 8.3 Education

```typescript
interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: { start: string; end: string; };
  gpa?: string;
  thesis?: string;
  honors?: string[];
  isFeatured: boolean;
}
```

### 8.4 Certification

```typescript
interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  icon?: string;  // lucide icon name
}
```

### 8.5 Publication

```typescript
interface Publication {
  id: string;
  title: string;
  type: "book" | "paper" | "article" | "report";
  authors: string[];
  publisher: string;
  year: number;
  description: string;
  link?: string;
  coverImage?: string;
}
```

### 8.6 Skill

```typescript
interface Skill {
  id: string;
  name: string;
  category: string;  // Research | HR | Technical | Soft Skills
  proficiency: number;  // 1-5 or percentage
}
```

---

## 9. Navigation Flow

### 9.1 Single Page with Smooth Scroll

The portfolio remains a single-page application (SPA). Navigation links scroll to the corresponding section using `scrollIntoView({ behavior: 'smooth' })`.

- URL hash updates: `#overview`, `#experience`, `#projects`, etc.
- Active section detection via IntersectionObserver
- react-router is already installed for future multi-page expansion

### 9.2 Section IDs

| Section | ID | Nav Label |
|---------|----|-----------|
| Overview | `#overview` | Overview |
| Experience | `#experience` | Experience |
| Work Projects | `#projects` | Projects |
| Tech Projects | `#tech-projects` | Tech Projects |
| Education | `#education` | Education |
| Certifications | `#certifications` | Certifications |
| Publications | `#publications` | Publications |
| Skills | `#skills` | Skills |

---

## 10. Performance Considerations

### 10.1 Project Rendering (97 items)

- **Default collapsed**: Year groups collapsed by default, only first year open
- **Virtualization**: Consider `react-window` if scroll performance degrades
- **Filter debounce**: 300ms debounce on search input (existing pattern)
- **Memo**: `useMemo` for filtered/grouped project lists (existing pattern)

### 10.2 Images

- Existing projects use Unsplash URLs with `w=800` parameter
- Work projects (97) should NOT have images (text-only compact cards)
- Profile image: local `/profile.png`

### 10.3 Bundle Size

- All UI components from shadcn/ui are tree-shakeable
- Motion (Framer Motion) is already the largest dependency
- Recharts only loaded if skills chart is visible (lazy import)

---

## 11. Design Tokens Summary

### Colors (keep existing)
```
Accent Gradient: from-blue-500 to-purple-500
Primary Button: bg-blue-600 hover:bg-blue-700
Secondary Button: bg-gray-800 hover:bg-gray-900
Card Background: bg-white
Section Alt Background: bg-gray-50
Category Colors:
  진단: blue-100/blue-700
  리더십: purple-100/purple-700
  채용: green-100/green-700
  CEO브리프: orange-100/orange-700
  분석방법론: cyan-100/cyan-700
  강의: pink-100/pink-700
  교육: yellow-100/yellow-700
  제도: indigo-100/indigo-700
```

### Spacing (keep existing)
```
Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
Section Gap: py-20 to py-24
Card Gap: gap-4 to gap-6
Inner Padding: p-4 to p-6
```

### Border Radius (keep existing)
```
Small: rounded-md (tags, badges)
Medium: rounded-lg (inputs, small cards)
Large: rounded-xl (cards, sections)
Full: rounded-full (pills, avatar)
```

---

## 12. Implementation Priority

### Phase 1: Data & Structure (Task #1 dependency)
1. Define new data models (WorkProject, Education, Certification, Publication, Skill)
2. Populate data files from structured data (Task #1 output)

### Phase 2: Core Sections (Task #3)
1. NavigationBar (enhanced from PortfolioHeader)
2. OverviewSection (new)
3. ExperienceSection (enhance AboutSection)
4. ProjectsSection (new - 97 work projects)
5. EducationSection (new)

### Phase 3: Supporting Sections (Task #3)
6. CertificationsSection (new)
7. PublicationsSection (new)
8. SkillsSection (new)
9. Enhanced Footer

### Phase 4: Polish (Task #4, #5)
10. Scroll-spy navigation
11. Animation fine-tuning
12. Responsive testing
13. Performance optimization

---

*Document created: 2026-02-16*
*For: Portfolio Platform Full Resume Enhancement*
