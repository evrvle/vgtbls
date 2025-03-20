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
│   └── broccoli.png  # Broccoli image for Blog link
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

## License

This project is open source and available under the MIT License. 