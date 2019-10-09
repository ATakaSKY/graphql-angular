import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { LaunchDetailsGQL } from '../services/spacexGraphql.service';

@Component({
  selector: 'app-launch-details',
  templateUrl: './launch-details.component.html',
  styleUrls: ['./launch-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchDetailsComponent {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly launchDetailsService: LaunchDetailsGQL
  ) {}

  launchDetails$ = this.route.paramMap.pipe(
    map((params) => params.get('id') as string),
    switchMap((id) => this.launchDetailsService.fetch({ id })),
    map((res) => res.data.launch)
  );

}
