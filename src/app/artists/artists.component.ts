import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotiService } from '../services/spoti.service';
import {Location} from '@angular/common';

interface Artist {
  name: string
  id: string
  images: Array<any>
  url: string
}

interface Songs {
  name: string
  albumName: string
  popularity: string
  images: Array<any>
  pista: string
  uri: string
}

interface ArtistSongs {
  artist: Artist
  songs: Array<Songs>
}


@Component({
  selector: 'artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {

  public artistAlbum: ArtistSongs = {
    artist: { name: "", id: "" , images: [], url: "" },
    songs: []
  };

  constructor(private spoti: SpotiService, private route: ActivatedRoute, private location: Location) {
    this.route.params.subscribe(parameters => {
      let id = parameters['id'];
      if (id) {

        this.spoti.getArtistById(id).then((value)=> {
          if (typeof value === 'string') {
            let response = JSON.parse(value);
            this.artistAlbum.artist.name = response.name;
            this.artistAlbum.artist.id = id;
            this.artistAlbum.artist.images = response.images;
            this.artistAlbum.artist.url = response.external_urls.spotify;
          }
        }).catch((reason:any)=>{console.log(reason)});

        this.spoti.getArtistTracksWithId(id).then((value) => {
          if (typeof value === 'string') {
            let response = JSON.parse(value);

            for(let track of response.tracks){
              this.artistAlbum.songs.push(
                {
                  name: track.name,
                  albumName : track.album.name,
                  popularity: track.popularity,
                  images: track.album.images,
                  pista: track.preview_url,
                  uri: track.uri
                });
            }
          }
        }).catch((reason:any)=>{console.log("Error:" + reason)});
      }
    });
  }

  ngOnInit() {
    // This is intentional
  }

  backClicked() {
    this.location.back();
  }

}
