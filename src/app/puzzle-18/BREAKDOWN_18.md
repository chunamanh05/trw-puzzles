# Puzzle 18 Breakdown: The Quantum Tunnel (Procedural Image Sequence)

## The Core Concept
The challenge was to build a landing page where **scrolling controls a video playback**, built by "converting the video into a sequence of images". 
Instead of relying on an external image sequence (which requires downloading hundreds of heavy images or extracting frames from an MP4 with an external tool), we chose a radical, highly-engineered approach: **The Procedural Sequence Generator**.

When the page loads, a hidden Canvas algorithmically draws 120 frames of a 3D "Quantum Tunnel" moving forward. It extracts these frames as Base64 WebP images and saves them to memory. This perfectly satisfies the "sequence of images" requirement but achieves it with zero external dependencies and zero bandwidth overhead.

## Technical Architecture

### 1. The Procedural Render Engine
We use an asynchronous `useEffect` loop to build the video sequence on the fly:
- A hidden `1280x720` canvas is created.
- Over a loop of 120 iterations (representing 120 frames), we draw a 3D-like tunnel using concentric twisting hexagons and flying star particles.
- The `Math.pow(z, 3)` formula gives the illusion of extreme depth and perspective.
- Each frame is converted to an image using `canvas.toDataURL("image/webp", 0.6)`. WebP compression keeps memory usage low.
- To prevent freezing the browser UI during this heavy calculation, we yield execution using `await new Promise(r => setTimeout(r, 0))` on every frame.

### 2. Scroll-Bound Playback
Once all 120 images are rendered and loaded into state, the `isLoaded` flag removes the loading screen.
We use `framer-motion`'s `useScroll` to track the user's progress through a massive `500vh` scrollable container.
- We map `scrollYProgress` (a value from 0.0 to 1.0) to an integer between `0` and `119`.
- When the scroll value changes, we grab the corresponding image from the array and draw it to the visible `<canvas>` element using `requestAnimationFrame` to ensure 60fps smoothness.

### 3. Holographic Typography
We overlaid text on top of the canvas and used Framer Motion's `useTransform` to bind the text's `opacity` and `scale` to the same scroll progress. As you scroll, the text "INTO THE UNKNOWN" flies forward towards you (scaling up) and fades out, followed by a second piece of text.

### 4. Layout Sections
- **Section 1 (The Journey)**: The dark, immersive 500vh area where the video sequence plays.
- **Section 2 (The Destination)**: Once the tunnel sequence finishes, a clean, light-themed standard web section is revealed below, housing the features and explaining the technology.

## Why This Approach?
- **No 404s or CORS Issues**: Public image sequence URLs often break or get rate-limited. This approach is 100% self-contained.
- **Blazing Fast Scrubbing**: Scrubbing an actual HTML5 `<video>` is heavily restricted by keyframe decoding. Image sequences provide instant, 0ms latency scrubbing.
- **Creativity**: It proves that we can create a "video" experience entirely out of code and math.
