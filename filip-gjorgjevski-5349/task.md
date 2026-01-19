# Internet Programming Exam - Movie Database Application (2026)

**Duration:** 2 hours  
**Tools Allowed:** All resources including LLMs, documentation, and search engines  
**Framework:** Angular (latest stable version)

## Overview

Build a modern, responsive web application for managing and exploring a movie database. The application should demonstrate your ability to architect a feature-rich frontend that integrates with a REST API, handles complex state, and provides an excellent user experience.

**Scoring System:** Total possible points: **150**. You need **100 points for full grade (10/10)**. This means you have flexibility in choosing which features to implement - focus on your strengths and interests!

## API Information

**Base URL:** `https://ip-exam-g12.onrender.com`  
**Authentication:** All requests require an API key via `x-api-key` header or `apiKey` query parameter  
**Your API Key:** Will be provided at exam start

### Available Endpoints

#### Movies

- `GET /movies` - Returns array of all movies
- `GET /movies/:id` - Returns single movie by ID
- `POST /movies` - Creates a new movie (body: movie object without ID)
- `PUT /movies/:id` - Updates existing movie (body: partial movie object)
- `DELETE /movies/:id` - Deletes a movie

#### Genres

- `GET /genres` - Returns array of genre strings

#### Actors

- `GET /actors` - Returns array of all actors
- `GET /actors/:id` - Returns single actor by ID
- `GET /actors?name=<name>` - Searches for actor by name (case-insensitive)

#### Auth

- `GET /whoami` - Returns your user information

### Data Schemas

#### Movie

```typescript
{
  id: number;
  title: string;
  year?: number;
  director?: string;
  genre?: string[];
  plot?: string;
  cast?: Array<{
    actor: string;
    character: string;
  }>;
  oscars?: Record<string, string>; // e.g., { "bestPicture": "Movie Name" }
  rating?: number;
}
```

#### Actor

```typescript
{
  id: number;
  name: string;
  birthdate: string;
  height: number | null;
  nationality: string;
  notable_works: string[];
}
```

## Core Requirements (60 points)

### 1. Application Structure (10 points)

- **Routing:** Implement proper Angular routing for navigation between pages
- **Services:** Create dedicated services for API communication (movies, actors, genres)
- **Error Handling:** Global HTTP interceptor for API errors and authentication
- **Loading States:** Show loading indicators during async operations
- **Responsive Design:** Mobile-first design that works from 320px to 4K displays

### 2. Movie List Page `/movies` (15 points)

**Display Requirements:**

- Show all movies in a data table or card grid (user's choice) **bonus** if you implement both views with a toggle
- Display: Title, Year, Director, Genres (comma-separated), Rating, Oscar count
- Minimum 8 movies visible without scrolling on desktop
- Action buttons: View, Edit, Delete (with confirmation)

**Filtering & Search (All filters work together):**

- Text search: Filter by title (partial match, case-insensitive, debounced)
- Year filter: Dropdown with unique years from movies + "All Years" option
- Genre filter: Multi-select dropdown (show movies having ANY selected genre)
- Rating filter: Slider or input for minimum rating (0-10)
- Active filter indicators with clear/reset functionality

**Sorting:**

- Sortable columns: Title, Year, Director, Rating, Oscar Count
- Click column header to sort ascending, click again for descending
- Visual indicator of current sort (arrow up/down)
- Default sort: Rating descending

**Additional Features:**

- Add Movie button → navigates to create page
- Pagination OR infinite scroll (your choice, but must handle 100+ movies gracefully)
- Empty state message when no movies match filters
- Display total count: "Showing X of Y movies"

### 3. Movie Details Page `/movies/:id` (10 points)

**Display All Information:**

- All movie fields in readable format
- Genres as styled badges/chips
- Cast list with actor names and characters
- Oscars as formatted list (e.g., "Best Picture: The Godfather")
- Action buttons: Edit, Delete, Back to List

**Enhanced Features:**

- Actor names as clickable links → navigate to `/actors/:id`
- "Similar Movies" section: Show 3-5 movies sharing at least one genre, actor, or director
  - Display as clickable cards/list items
  - Show title, year, and shared genres highlighted

### 4. Movie Create/Edit Pages (15 points)

**Create Page `/movies/create`:**

- Form with validation for all movie fields
- Title: Required, 1-200 characters
- Year: Optional, 1888-2026, number input
- Director: Optional, text input
- Genres: Multi-select from available genres (fetch from API)
- Plot: Optional, textarea, max 1000 characters
- Rating: Optional, 0-10, step 0.1
- Cast: Dynamic list (add/remove cast members)
  - Each entry: Actor name + Character name
- Oscars: Dynamic key-value pairs (add/remove)
  - Use proper labels (e.g., "Best Picture", "Best Actor")
- Save button: POST to API, navigate to details on success
- Cancel button: Navigate back without saving

**Edit Page `/movies/:id/edit`:**

- Same form as create, pre-filled with existing data
- ID field: Display-only (not editable)
- Save button: PUT to API, navigate to details on success
- Validation: Same as create page

**Form Features:**

- Show validation errors inline
- Disable submit while request in progress
- Show success/error messages
- Unsaved changes warning when navigating away

### 5. Actor Details Page `/actors/:id` (10 points)

**Display:**

- All actor information: Name, Birthdate, Height (in cm), Nationality
- Notable works as a list
- "Movies in Database" section:
  - Query movies API for this actor's name in cast
  - Display matching movies with their titles and the character this actor played
  - Each movie title is a link to its details page
  - Show count: "Found in X movies in database"
  - Handle case where actor appears in 0 movies

## Advanced Features (50 points)

### 6. Statistics Dashboard `/statistics` (20 points)

Create a comprehensive statistics page with:

**Basic Stats (always visible):**

- Total movies, Total actors (from API), Total genres
- Average movie rating (calculate from movies)
- Total Oscar awards (sum all oscars objects)

**Charts/Visualizations (choose at least 3):**

- Movies per decade (bar chart or histogram)
- Movies per genre (top 10, bar/pie chart)
- Oscars by type (pie/donut chart)
- Rating distribution (histogram, 0-1, 1-2, 2-3... 9-10)
- Directors with most movies (top 10, bar chart)
- Actors appearing in most movies (from cast data, top 10)

**Requirements:**

- Use a charting library (Chart.js, ng2-charts, ngx-charts, or similar)
- Responsive charts that resize properly
- Interactive (tooltips, legends)
- Color-coded and visually appealing
- Loading state while calculating

### 7. Advanced Search & Filters Page `/search` (15 points)

Create a dedicated advanced search page with:

**Complex Filters:**

- All filters from movie list page
- Plus:
  - Director search (autocomplete from existing directors)
  - Actor search (search in cast members)
  - Oscar winner filter (only movies with oscars)
  - Date range: Year from/to
  - Multiple rating comparisons (min/max)

**Search Results:**

- Display matching movies
- Show which filters matched for each movie
- Sortable results
- Export results as JSON (download button)
- Shareable search URL (encode filters in query params, restore on load)

### 8. User Experience Enhancements (15 points)

Implement at least 5 of these (3 points each):

- **Dark Mode:** Toggle between light/dark themes, persist preference
- **Favorites:** Mark movies as favorites (local storage), filter to show only favorites
- **Recent Views:** Track last 5 viewed movies, show in header/sidebar
- **Keyboard Navigation:** Support keyboard shortcuts (e.g., '/' for search, 'n' for new movie)
- **Breadcrumbs:** Show navigation breadcrumbs on detail/edit pages
- **Toast Notifications:** Non-intrusive notifications for success/error actions
- **Animations:** Smooth transitions between views, list animations
- **Offline Detection:** Show banner when API is unreachable, queue actions for retry
- **Accessibility:** ARIA labels, keyboard navigation, screen reader support
- **Performance:** Virtual scrolling for large lists, image lazy loading

## Bonus Features (40 points)

### 9. Creative Features (Choose and implement, 10 points each, up to 40 points)

Implement additional substantial features of your choice. You can do multiple bonus features. Examples:

- **Comparison Tool:** Compare 2-3 movies side-by-side
- **Recommendation Engine:** Based on user's favorite genres/directors
- **Movie Timeline:** Visual timeline of movies by year with filtering
- **Actor Network Graph:** Visualize connections between actors who worked together
- **Export/Import:** Export your data, import from file
- **Progressive Web App:** Make app installable with offline support
- **Advanced Analytics:** Complex statistical analysis with multiple visualizations
- **Movie Collections:** User-created playlists/collections of movies
- **Social Features:** Share movies, ratings, or collections via link
- **Full-Text Search:** Search across title, plot, director, actors
- **Real-time Collaboration:** Show when other users are viewing same movie
- **Advanced Filtering:** Complex boolean queries (AND/OR/NOT)
- **Data Visualization:** Interactive graphs showing movie data trends

**Document your bonus features in a `BONUS.md` file with:**

- Feature name and description
- Implementation approach
- Challenges solved
- Time spent

## Technical Requirements

### Code Quality (Required)

- Follow Angular style guide
- Proper TypeScript typing (no `any` without justification)
- Reusable components (at least 3 shared components)
- RxJS for async operations (proper subscription handling)

### Documentation

- EXAM.md with:
  - Setup instructions
  - Features implemented (checklist)
  - Bonus feature description (if any)
  - Known issues/limitations
  - Time spent (approximate)

### Deliverables

- Complete Angular project (runnable with `npm install && npm start`)
- All source code
- EXAM.md
- Any additional configuration files

## Evaluation Criteria

**Points-Based System (150 total, 100 needed for full marks):**

- **Core Requirements:** 60 points - Essential functionality
- **Advanced Features:** 50 points - Enhanced functionality and UX
- **Bonus Features:** 40 points - Creative additions and extra polish

**Quality Assessment (within point categories):**

- **Functionality:** Does it work correctly and handle edge cases?
- **Code Quality:** Clean, readable, properly typed, reusable components
- **User Experience:** Responsive, intuitive, loading states, error handling
- **Innovation:** Creative solutions, going beyond requirements

## Grading Scale (Based on Total Points Earned)

- **100+ points (10/10):** Excellent - Full marks achieved through any combination
- **90-99 points (9/10):** Very Good - Strong implementation, minor gaps
- **80-89 points (8/10):** Good - Solid core features, some advanced work
- **70-79 points (7/10):** Satisfactory - Core features mostly working
- **60-69 points (6/10):** Passing - Basic functionality present
- **Below 60 points:** Needs Improvement - Missing critical features

**Example Paths to 100 Points:**

- All Core (60) + Most Advanced (40) = 100
- All Core (60) + Some Advanced (25) + Bonuses (15+) = 100+
- Most Core (50) + All Advanced (50) = 100

## Notes

- **LLM Usage:** You are encouraged to use LLMs for:
  - Code generation and boilerplate
  - Debugging and problem-solving
  - Learning new concepts
  - However, you must understand and be able to explain your code

- **API Key:** Your data is isolated per API key. Don't share your key.

- **Testing:** Start the API server with `npm run start:dev`

- **Time Management:** Focus on core features first, then add advanced features

- **Questions:** If API behavior is unclear, make reasonable assumptions and document them

## Getting Started

You are provided with an Angular 19 template project with basic scaffolding.

### Setup Steps

1. **Extract the provided template** to your workspace
2. **Install dependencies:** `npm install`
3. **Get your API key** from instructor
4. **Test the API** to ensure it's working:

   ```bash
   curl -H "x-api-key: YOUR_KEY" https://ip-exam-g12.onrender.com/movies
   ```

5. **Configure your Angular app** to use the API:
   - Create an HTTP interceptor to add the API key header to all requests
   - Set up services for API communication
   - Base URL: `https://ip-exam-g12.onrender.com`

6. **Start your Angular app:** `npm start`
   - Default Angular dev server runs on `http://localhost:4200`

### Template Structure

The provided template includes:

- Angular 19 with standalone components
- Basic routing setup (empty routes)
- Standard Angular CLI configuration
- No pre-built components (you build everything)

### Important Notes

- **DO NOT use json-server** - Connect to the real NestJS API server at `https://ip-exam-g12.onrender.com`
- **API Authentication:** All requests require `x-api-key` header - implement this in an HTTP interceptor
- **CORS:** Already configured on the API server
- **Your data:** Each API key has isolated data - your changes won't affect other students

Good luck! 🎬
