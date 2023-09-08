export class Place {
    constructor(title, imageUri, location, id) {
        this.title= title;
        this.imageUri = imageUri;
        this.address = JSON.stringify(location);
        this.location = location;   // { lat: 0.366656, lng: 0.45555 }
        this.id = id;
    }
}