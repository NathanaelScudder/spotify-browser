import { Component, OnInit } from '@angular/core';
import { ProfileData } from 'src/app/data/profile-data';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  name:string = null;
  profile_pic:string = "../../../assets/unknown.jpg";
  profile_link:string = null;

  constructor(private spotify:SpotifyService) { }

  ngOnInit() {
  }

  /* Gets the "about me" information from Spotify when the button in the view is clicked.
     Updates the name, profile_pic, and profile_link fields */
  loadAboutMe()
  { 
    this.spotify.aboutMe()
                .then((myProfile:ProfileData) => {
                  
                  this.name = myProfile.name;
                  this.profile_pic = myProfile.imageURL;
                  this.profile_link = myProfile.spotifyProfile;

                });
  }
}
