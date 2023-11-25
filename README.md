# spotify-browser

<p>Posted for the purpose of showcasing previous coursework using Angular. This project was completed alone.</p>

<p>This project was partially received as starter code, where my actual contributions are to the following directories:</p>
<ul>
    <li>components</li>
    <li>album-page</li>
    <li>artist-page</li>
    <li>track-page</li>
    <li>services</li>
</ul>

## Functionality

<ul>
    <li>Log into existing Spotify Account using OAuth (must be logged in for other functionality)</li>
    <li>Load and display profile name and image</li>
    <li>Search and display information for any artist, album, or track</li>
    <li>When searching artists, clicking on artist image will display page with: their music genre, top 10 tracks, available albums, and similar artists</li>
    <li>Clicking a track link will display page with: associated album, track duration, and track features</li>
    <li>Clicking an album link will display page with: album image, contained tracks, and artist</li>
</ul>

## Instructions

<p>How to run the project on your local machine, step-by-step.</p>

<p>Firstly, ensure you have Node and Angular installed on your device.</p>

<p>Running the project requires a valid Spotify account and Spotify App. You can create a Spotify App from <a href="https://developer.spotify.com/dashboard">here</a> (create as a website, not a commercial application). Once created, save the app's Client ID and Client secret from under "Basic Information".</p>

<p>Add the Client ID and Client secret to "webserver\client_secret_template.json" in their respective positions. Then rename the file to "client_secret.json".</p>

<p>Rename "tokens_template.json" to "tokens.json".</p>

<p>Navigate to the webserver directory in the command-line, then run:</p>

```bash
npm install
# then
npm start
```

<p>Navgiate to the client directory in a separate tab, then run:</p>

```bash
npm install
# then
ng serve --open
```