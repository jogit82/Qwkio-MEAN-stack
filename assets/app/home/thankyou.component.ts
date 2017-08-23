import { Component } from '@angular/core';

@Component({
    selector: 'app-thankyou',
    templateUrl: 
    `
    <div class="container">
      <div class="panel panel-info">
            <div class="panel-heading">Thank You</div>
            <div class="panel-body">
                <div id="main" role="main">
                    <div class="centered">
                        <div id="admin-survey">
                            <div class="survey-link">
                            <p>Your response had been submitted successfully! </p>
                            <p>Thank you for participating in the survey.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
})

export class ThankyouComponent {

}