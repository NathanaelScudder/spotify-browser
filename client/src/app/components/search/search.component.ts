import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  searchString:string = "";
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[] = null;
  showCarousel:Boolean = false;
  showTrackList:Boolean = false;

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  async search() {
    // Get the response for the specified search parameters
    this.resources = await this.spotifyService.searchFor(this.searchCategory, this.searchString);

    // Only show the carousel if the category is artist or album
    this.showCarousel = (this.searchCategory == 'artist') || ((this.searchCategory == 'album'));

    // Only show the track list if the category is track
    this.showTrackList = this.searchCategory == 'track';
  }

  // Remove the carousel or track list if the search category is changed
  staleSearch() {
    this.showCarousel = false;
    this.showTrackList = false;
  }
}
