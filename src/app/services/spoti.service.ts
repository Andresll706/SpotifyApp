import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class SpotiService {

  constructor() {
    // This is intentional
  }

  // Get Token
  getToken() {
    return new Promise(function (resolve, reject) {
      // do the usual XHR stuff
      var req = new XMLHttpRequest();
      req.open('post', "https://accounts.spotify.com/api/token", false);
      //NOW WE TELL THE SERVER WHAT FORMAT OF POST REQUEST WE ARE MAKING
      req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      req.onload = function () {
        if (req.status == 200) {
          if (typeof req.response === 'string') {
            resolve(req.response);
          }
        } else {
          reject(Error("Network Error"));
        }
      };

      req.onreadystatechange = function() {
        if (req.readyState === 4) {
          if (req.status === 200) {
            console.log(req.responseText);
          } else {
            console.log("Error : " + req.status + " , " + req.statusText );
          }
        }
      }

      // handle network errors
      req.onerror = function () {
        reject(Error("Error : " + req.status + " , " + req.statusText));
      };

      // make the request
      req.send("grant_type=client_credentials&client_id=d491c56768584819a96395b8c4b126fb&client_secret=edffe31e694344448c4a6faa14934e7b");

    });
  }

  async getArtists(name: string) {

    let access_token = '';
    let promiseToken = await this.getToken().catch((reason)=>{console.log("Error :" + reason);});

    if (typeof promiseToken === 'string')
    {
      let token = JSON.parse(promiseToken);
      access_token = token.access_token;
    }

    if(access_token != '') {
      return new Promise(function (resolve, reject) {
        // do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('get', "https://api.spotify.com/v1/search?q=" + name + "&type=artist&limit=15");
        //NOW WE TELL THE SERVER WHAT FORMAT OF POST REQUEST WE ARE MAKING
        req.setRequestHeader('Accept', 'application/json');
        req.setRequestHeader('Content-Type', 'application/json');
        req.setRequestHeader('Authorization', 'Bearer ' + access_token);

        req.onload = function () {
          if (req.status == 200) {
            resolve(req.response);
          } else {
            console.log("Error : " + req.status + " , " + req.statusText );
          }
        };
        // handle network errors
        req.onerror = function () {
          reject(Error("Error : " + req.status + " , " + req.statusText));
        }; // make the request
        req.send();
      });
    }else{
      throw new Error();
    }
  }


  async getNewReleases() {
    let access_token = '';
    let promiseToken = await this.getToken().catch((reason)=>{console.log("Error: " + reason);});

    if (typeof promiseToken === 'string')
    {
      let token = JSON.parse(promiseToken);
      access_token = token.access_token;
    }

    if(access_token != '') {
      return new Promise(function (resolve, reject) {
        // do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('get', "https://api.spotify.com/v1/browse/new-releases?limit=15", false);
        //NOW WE TELL THE SERVER WHAT FORMAT OF POST REQUEST WE ARE MAKING
        req.setRequestHeader('Accept', 'application/json');
        req.setRequestHeader('Content-Type', 'application/json');
        req.setRequestHeader('Authorization', 'Bearer ' + access_token);

        req.onload = function () {
          if (req.status == 200) {
            resolve(req.response);
          }
          else {
            console.log(req.statusText);
          }
        };
        // handle network errors
        req.onerror = function () {
          reject(Error("Error : " + req.status + " , " + req.statusText));
        };
        // make the request
        req.send();
      });
    }else{
      throw new Error();
    }
  }



  async getArtistById(id:string) {
    let access_token = '';
    let promiseToken = await this.getToken().catch((reason)=>{console.log("Error: " + reason);});

    if (typeof promiseToken === 'string')
    {
      let token = JSON.parse(promiseToken);
      access_token = token.access_token;
    }

    if(access_token != '') {
      return new Promise(function (resolve, reject) {
        // do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('get', 'https://api.spotify.com/v1/artists/' + id , false);
        //NOW WE TELL THE SERVER WHAT FORMAT OF POST REQUEST WE ARE MAKING
        req.setRequestHeader('Accept', 'application/json');
        req.setRequestHeader('Content-Type', 'application/json');
        req.setRequestHeader('Authorization', 'Bearer ' + access_token);

        req.onload = function () {
          if (req.status == 200) {
            resolve(req.response);
          }
          else {
            reject(Error("Error : " + req.status + " , " + req.statusText));
          }
        };
        // handle network errors
        req.onerror = function () {
          reject(Error("Error : " + req.status + " , " + req.statusText));
        };
        // make the request
        req.send();
      });
    }else{
      throw new Error();
    }
  }

  async getArtistTracksWithId(id:string) {
    let access_token = '';
    let promiseToken = await this.getToken().catch((reason)=>{console.log("Error: " + reason);});

    if (typeof promiseToken === 'string')
    {
      let token = JSON.parse(promiseToken);
      access_token = token.access_token;
    }

    if(access_token != '') {
      return new Promise(function (resolve, reject) {
        // do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('get', 'https://api.spotify.com/v1/artists/' + id + '/top-tracks?market=ES', false);
        //NOW WE TELL THE SERVER WHAT FORMAT OF POST REQUEST WE ARE MAKING
        req.setRequestHeader('Accept', 'application/json');
        req.setRequestHeader('Content-Type', 'application/json');
        req.setRequestHeader('Authorization', 'Bearer ' + access_token);

        req.onload = function () {
          if (req.status == 200) {
            resolve(req.response);
          }
          else {
            reject(Error("Error : " + req.status + " , " + req.statusText));
          }
        };
        // handle network errors
        req.onerror = function () {
          reject(Error("Error : " + req.status + " , " + req.statusText));
        }; // make the request
        req.send();
      });
    }else{
      throw new Error();
    }
  }

}
