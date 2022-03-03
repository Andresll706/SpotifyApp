import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
interface Artist {
  name: string;
  id: string;
}

@Component({
  selector: 'albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  @Input()
  public albums: any;

  public artists: Artist[] = [];

  @Input()
  public showArtist = false;

  @Input()
  public showAlbums = false;

  constructor(private router: Router) {}

  ngOnInit() {

    if (this.albums != undefined) {
      for (let artist of this.albums.artist) {
        this.artists.push({ name: artist.name, id: artist.id });
      }
    }

  }

  goArtist(id: string) {
    this.router.navigate(['artists/'+id]);
  }
}
