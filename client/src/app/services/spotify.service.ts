import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    // Send a request to the specified endpoint and return the reponse as a promise
    return this.http.get(`${this.expressBaseUrl}${endpoint}`).toPromise()
  }

  aboutMe():Promise<ProfileData> {
    // Parse the incoming data to Profile data
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  async searchFor(category:string, resource:string):Promise<ResourceData[]> {
    // Get the search results for the given category and resource
    let searchResult = await this.sendRequestToExpress(`/search/${category}/${encodeURIComponent(resource)}`)

    // Extract the items based on the given category
    var items:Array<Object> = searchResult[`${category}s`]["items"];

    let returnedResources:ResourceData[] = []; // To hold the array of resource data to return
    
    // Loop through each of the search result items
    for(var nextItem of items)
    {
      // Store the item as a data type according to its category
      switch (category) {
        case "artist":
          returnedResources.push(new ArtistData(nextItem));
          break;
        case "track":
          returnedResources.push(new TrackData(nextItem));
          break;
        case "album":
          returnedResources.push(new AlbumData(nextItem));
          break;
        default:
          console.log(`Invalid item category received: ${category}`);
          return returnedResources;
      }
    }

    return returnedResources;
  }

  async getArtist(artistId:string):Promise<ArtistData> {
    // Get data for the artist associated with the specified ID
    let artistData = await this.sendRequestToExpress(`/artist/${encodeURIComponent(artistId)}`);

    return new ArtistData(artistData);
  }

  async getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    // Get data for related artists for the specified ID
    let relatedArtistData = await this.sendRequestToExpress(`/artist-related-artists/${encodeURIComponent(artistId)}`);
    var relatedArtistDataArray:ArtistData[] = []; // To hold the related artist data objects

    // Parse out the data for each related artist and push it onto the data array
    for(var nextArtist of relatedArtistData["artists"])
    {
      relatedArtistDataArray.push(new ArtistData(nextArtist))
    }

    return relatedArtistDataArray;
  }

  async getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    // Get data for the top tracks of the artist associated with the specified ID
    let topTrackData = await this.sendRequestToExpress(`/artist-top-tracks/${encodeURIComponent(artistId)}`);
    var topTrackDataArray:TrackData[] = []; // To hold the track data objects

    // Parse out the data for each track and push it onto the data array
    for(var nextTrack of topTrackData["tracks"])
    {
      topTrackDataArray.push(new TrackData(nextTrack))
    }

    return topTrackDataArray;
  }

  async getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    // Get data for the albums of the artist associated with the specified ID
    let albumData = await this.sendRequestToExpress(`/artist-albums/${encodeURIComponent(artistId)}`);
    var albumDataArray:AlbumData[] = []; // To hold the album data objects

    // Parse out the data for each album and push it onto the data array
    for(var nextAlbum of albumData["items"])
    {
      albumDataArray.push(new AlbumData(nextAlbum))
    }

    return albumDataArray;
  }

  async getAlbum(albumId:string):Promise<AlbumData> {
    // Get data for the album associated with the specified ID
    let albumData = await this.sendRequestToExpress(`/album/${encodeURIComponent(albumId)}`);

    return new AlbumData(albumData);
  }

  async getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    // Get data for the tracks contained in the album associated with the specified ID
    let albumTrackData = await this.sendRequestToExpress(`/album-tracks/${encodeURIComponent(albumId)}`);
    var albumTrackDataArray:TrackData[] = []; // To hold the track data objects

    // Parse out the data for each track and push it onto the data array
    for(var nextTrack of albumTrackData["items"])
    {
      albumTrackDataArray.push(new TrackData(nextTrack))
    }

    return albumTrackDataArray;
  }

  async getTrack(trackId:string):Promise<TrackData> {
    // Get data for the track associated with the specified ID
    let trackData = await this.sendRequestToExpress(`/track/${encodeURIComponent(trackId)}`);

    return new TrackData(trackData);
  }

  async getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    // Get the audio features data for the track associated with the specified ID
    let trackFeatureData = await this.sendRequestToExpress(`/track-audio-features/${encodeURIComponent(trackId)}`);
    var trackFeatureDataArray:TrackFeature[] = []; // To hold the track feature data objects

    // Parse out the data for each track feature and push it onto the data array
    for(var nextFeature of TrackFeature.FeatureTypes)
    {
      trackFeatureDataArray.push(new TrackFeature(nextFeature, trackFeatureData[nextFeature]))
    }

    return trackFeatureDataArray;
  }
}
