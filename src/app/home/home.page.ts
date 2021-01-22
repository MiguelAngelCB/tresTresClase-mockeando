import { Geolocation, Geoposition } from "@ionic-native/geolocation/ngx";
import { Platform, ToastController } from "@ionic/angular";
import { Component } from "@angular/core";
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  uno:Geoposition;
  ubicacion = { lat: 1, long: 0 };
  path:string;
  //En este proyecto ya tenemos instalado el geolocation
  constructor(
    private plat: Platform,
    private geolocation: Geolocation,
    public toast: ToastController,
    public camera: Camera
  ) {}
  localizar() {
    this.plat
      .ready()
      .then(() => {
        this.geolocation
          .getCurrentPosition()
          .then((info) => {
            this.ubicacion.lat = info.coords.latitude;
            this.ubicacion.long = info.coords.longitude;
          })
          .catch(async (error) => {
            let toast=this.toast.create({
              message:'error '+error,
              duration:1000
            });
            (await toast).present();
          });
      })
      .catch();
  }

  hacerFotos() {

    this.plat.ready().then(() => {

        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then((imageData) => {
            console.log(imageData);
            this.path=imageData;
        }, (err) => {
        });
    });
}
}
