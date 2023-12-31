import { Component, OnInit, Input } from '@angular/core';
import { TrackFeature } from '../../data/track-feature';

@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css']
})
export class ThermometerComponent implements OnInit {
  @Input() trackFeature:TrackFeature;

  constructor() { }

  ngOnInit() {
  }

}
