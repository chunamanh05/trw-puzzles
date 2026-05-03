# Puzzle 103 Breakdown: Dynamic Pricing Recommender

## The Objective
Create a dynamic pricing tier recommender for a SaaS website that asks user-based questions and recommends a plan based on scoring logic.

## Technical Implementation

### 1. Recommendation Logic (Scoring)
The engine uses a **Requirement Threshold** algorithm. 
- Each answer to each question is associated with a `tier` index (0 to 3).
- The final recommendation is calculated using `Math.max(...answers)`. 
- This ensures that if a user needs Enterprise-level security (tier 3) but only has a team of 1 (tier 0), they are still recommended the Enterprise plan because their security requirements exceed the lower tiers.

### 2. Animated UI Wizard
- **Framer Motion**: Used for slide transitions between questions.
- **Directional Animation**: The `direction` state tracks if the user is moving forward or backward, allowing the animation to slide from the correct side.
- **State Management**: Local state handles the current step, the array of selected answers, and the animation direction.

### 3. Dynamic UI Components
- **Progress Bar**: Animates linearly as the user progresses through questions.
- **Breakdown Section**: Maps the user's selected answers back to the "Reasoning" string defined in the data constants, providing a clear "Why this match?" section.
- **Contextual CTA**: The button text and styling change dynamically based on the resulting plan (e.g., "Contact Sales" for Enterprise vs "Start Pro Trial" for Pro).

## Key Features
- **Auto-Advance**: Questions automatically advance after a short delay (300ms) once an option is selected, improving UX speed.
- **Full Responsiveness**: Designed to work on mobile and desktop using Tailwind's flexible grid and padding system.
- **Dark Luxury Aesthetic**: Uses a deep slate/blue palette with subtle borders and glows to maintain the TRW project brand.
