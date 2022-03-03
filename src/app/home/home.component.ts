import { Component, OnInit } from '@angular/core';
import { SpotiService } from '../services/spoti.service';

interface Albums {
  name: string
  images: any
  artist: Array<any>
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public releases: Array<any> | undefined;

  public albums: Albums[] = [];

  public showAlbums = false;

  public error = false;

  public loading = false;

  constructor(private spoti: SpotiService) { }

  ngOnInit() {
    this.loading = true;
    this.spoti.getNewReleases().then((value) => {
      if (typeof value === 'string') {
        let v = JSON.parse(value);
        this.releases = v.albums.items;
      }

      if (this.releases != undefined) {
        for(let release of this.releases){
          this.albums?.push({name: release.name, images: release.images, artist : release.artists});
        }
        this.showAlbums = true;
      }
      this.loading = false;
      this.error = false;
    }).catch((reason:any)=>{
      this.error = true;
      this.loading = false;
      console.log("Error: " + reason);
    });


  }

}
