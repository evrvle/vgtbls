# Vegetable Garden Social Links

A playful, responsive landing page with a hand-drawn style where vegetables serve as interactive links to social media platforms.

## Features

- Hand-drawn, playful design with CSS animations
- Realistic vegetable images with a hand-drawn feel
- Responsive layout that works on mobile and desktop
- Interactive vegetable links with hover effects
- Placeholders for future social media links
- Accessible design with appropriate ARIA labels and semantic HTML
- Dark/Night mode toggle with special night elements (owl with headphones and mosquitos)
- DJ Pepe frog that moves chaotically and teasingly slow throughout the page in night mode
- Language switching (English, Spanish, and Russian)
- Special playful Cyrillic font (Neucha) for Russian language text
- Emoji favicon with musical note (🎵) for browser tabs
- User preferences saved across visits

## Preview

The landing page displays a garden scene with a wicker basket containing vegetable links:

### Day Mode
- Sunny outdoor setting with blue sky and green grass
- Floating clouds in the background
- Vibrant, detailed vegetable images

### Night Mode
- Starry night background with a moon
- An owl wearing headphones appears
- Animated mosquitos flying around
- DJ Pepe frog GIF bobbing around the screen with random movements
- Darker, moodier vegetable images

### Vegetable Links
- Tomato: Links to Instagram
- Bell Pepper: Links to SoundCloud
- Cucumber: Placeholder for YouTube (Coming Soon)
- Carrot: Placeholder for Spotify (Coming Soon)
- Broccoli: Placeholder for Blog (Coming Soon)

Each vegetable has a subtle hover effect and placeholder links show a "Coming Soon" message when clicked.

### Interactive Elements
- Vegetable links that bounce when clicked
- Animated owl with headphones that floats gently and reacts to hover
- Hidden easter egg: Tap/click the owl 28 times to unlock a surprise
- DJ Pepe that has chaotic, teasing movement patterns in night mode
- DJ Pepe reacts when clicked, performing a special animation

### Languages
- English: Uses Indie Flower font for a hand-drawn look
- Spanish: Uses Indie Flower font for a hand-drawn look
- Russian: Uses Neucha font for a playful Cyrillic style

## Project Structure

```
vegetable-garden/
├── index.html        # Main HTML structure with multilingual support
├── styles.css        # CSS styling with day/night mode themes
├── script.js         # JavaScript for interactivity and animations
├── images/           # Folder containing vegetable images
│   ├── tomato.png    # Tomato image for Telegram link
│   ├── pepper.png    # Pepper image for SoundCloud link
│   ├── cucumber.png  # Cucumber image for YouTube link
│   ├── carrot.png    # Carrot image for Spotify link
│   ├── broccoli.png  # Broccoli image for Blog link
│   └── owl.png       # Owl with headphones for night mode
├── pepe-pepedj.gif   # DJ Pepe animation for night mode
└── README.md         # This file
```

## Deploying to Netlify

### Option 1: Deploy with Netlify Drop

1. Visit [Netlify Drop](https://app.netlify.com/drop)
2. Drag and drop the folder containing your files (index.html, styles.css, script.js, images/ folder, pepe-pepedj.gif)
3. Netlify will automatically deploy your site and provide a URL

### Option 2: Deploy with Git

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Sign in to [Netlify](https://app.netlify.com/)
3. Click "New site from Git"
4. Select your repository
5. Configure build settings (leave blank for this simple site)
6. Click "Deploy site"

### Option 3: Deploy with Netlify CLI

1. Install Netlify CLI: `npm install netlify-cli -g`
2. Navigate to your project directory
3. Run `netlify deploy`
4. Follow the prompts to deploy your site

## Customization

- **Vegetable Images**: Replace the images in the "images" folder with your own designs while maintaining the naming convention
- **Social Media Links**: Update the href attributes in index.html to point to your social media profiles
- **Colors**: Modify the color values in styles.css to match your brand
- **Vegetables**: Add or remove vegetables by following the existing pattern in the HTML and CSS
- **Night Mode Elements**: Customize the owl, DJ Pepe, and mosquitos in the CSS and JavaScript
- **Fonts**: The site uses Google Fonts (Indie Flower for English/Spanish, Neucha for Russian)
- **Languages**: Edit the translations directly in the HTML file

## User Preferences

The site uses localStorage to remember:
- User's preferred language (English, Spanish, or Russian)
- User's preferred theme (day or night mode)

## Browser Compatibility

This site is compatible with modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Performance and SEO Optimizations

The website has been optimized for both performance and SEO:

### Performance Optimizations

1. **Resource Preloading:**
   - Critical CSS and JS are preloaded
   - Key images use fetchpriority="high" to load faster
   - Font preconnects for faster font loading

2. **Animation Optimizations:**
   - Used `will-change` property for elements that animate
   - Implemented `requestAnimationFrame` for mosquito animations
   - Added `content-visibility: auto` for off-screen content
   - Used `contain` properties for static elements like stars

3. **Event Handling Optimizations:**
   - Implemented debouncing for resize events
   - Used event delegation for hover effects
   - Optimized animation loops

4. **Responsive Optimizations:**
   - Media queries for various screen sizes
   - Print-specific styles
   - Responsive image scaling

### SEO Optimizations

1. **Meta Tags:**
   - Descriptive title and meta description
   - Keywords meta tag with relevant terms
   - Canonical URL to prevent duplicate content issues

2. **Open Graph & Social Tags:**
   - OG tags for better social media sharing
   - Twitter card integration
   - Proper image and description tags

3. **Technical SEO:**
   - Sitemap.xml for better indexing
   - Robots.txt for crawler guidance
   - Semantic HTML structure
   - Descriptive alt texts for images

4. **Performance SEO:**
   - Improved page load time (a known ranking factor)
   - Mobile-friendly design
   - Reduced layout shifts

These optimizations ensure that the website loads quickly, runs smoothly even with animations and interactive elements, and is properly indexed by search engines.

## License

This project is open source and available under the MIT License.

# VGTBLS Podcast - Electronic Music & DJ Sets

A unique electronic music podcast and DJ mix platform with a playful, hand-drawn vegetable garden interface.

## SEO Optimization for Music Content

This project has been optimized for search engines to better index and rank electronic music and DJ content. Key optimizations include:

### Meta Tag Optimizations

- Updated title, description, and keywords to focus on electronic music, DJ sets, and mixes
- Added Open Graph and Twitter Card meta tags with music-specific content
- Implemented Schema.org structured data for MusicGroup and MusicPlaylist types
- Custom music-specific meta tags added dynamically via JavaScript

### Content Structure

- Created dedicated content paths for different music genres (/techno-mixes/, /house-music/, etc.)
- Organized audio content with appropriate metadata and structured markup
- Added descriptive text for all audio content to help search engines understand context

### Technical SEO

- Optimized sitemap.xml with music content prioritization
- Added dedicated audio-sitemap.xml with detailed information about each mix/track
- Updated robots.txt to guide crawlers to music content
- Improved service worker caching for better audio file handling
- Added dynamically injected structured data in JSON-LD format

### Performance Optimizations

- Audio preloading with the Web Audio API for faster playback
- Resource prioritization for critical audio content
- Optimized audio file handling with modern browser APIs
- Background loading of non-critical audio resources

### User Experience Enhancements

- Night mode with ambient background sounds
- Interactive DJ Pepe animation with sound effects
- Multilingual support for wider audience reach
- Playful tap counter and easter eggs to increase engagement

## Usage

1. Visit the website and interact with the vegetable-themed navigation
2. Toggle between day mode and night mode to experience different UI themes
3. Find links to our music on various platforms including SoundCloud, Spotify, etc.
4. Discover the hidden easter eggs by interacting with elements like the owl and DJ Pepe

## Technical Implementation

The website uses:
- HTML5, CSS3, and vanilla JavaScript
- Progressive Web App (PWA) capabilities
- Web Audio API for enhanced sound processing
- Service Worker for offline functionality
- Responsive design for all device types

## Browser Support

Optimized for modern browsers including:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers on iOS and Android

## License

[MIT License](LICENSE)

## Credits

- Sound effects: Various sources, properly licensed
- Fonts: Google Fonts (Indie Flower, Neucha)
- Idea & Implementation: VGTBLS Collective 