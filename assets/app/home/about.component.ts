import { Component } from '@angular/core';

@Component({
    selector: 'app-about',
    templateUrl: 
    `
    <div class="container">
      <div class="panel panel-info">
            <div class="panel-heading">About Qwk.io</div>
            <div class="panel-body">
                <h1>About</h1>
                <p>
                    Qwk.io is the quickest, easiest way to conduct surveys. If you just want to ask a bunch of people some questions and
                    don’t need fancy templates or crosstabs, and don’t want to be re-billed $20/month until your great grandchildren get
                    a notarized letter from the Canadian ambassador to Fiji, Qwk.io is the service for you.
                </p>
                <hr>
                
                <h1>Survey Advice</h1>
                    <p>Use number ranges in radio buttons rather than single line text to collect numeric responses. Odds are you’re going to want to group responses into ranges anyway, and it’s easier to process the results if people are selecting “six to ten” rather than writing in “7”, “nine”, “6”, and “eight” [sic].</p>
                    <p>Arrange answers in a consistent manner. Either arrange answers alphabetically or in ascending numerical order, or arrange them by some other logical order like distance or month. But be consistant, as much as possible.</p>
                    <p>Avoid leading questions or leading answers. If you find yourself writing “Don’t you think that…”, you’ve gone astray. Likewise, if your ratings are “Terrible”, “Poor”, “Fair”, “Good”, and “Excellent!!!!!!!”, you may be skewing your results.</p>
            </div>
      </div>
</div>
    `
})

export class AboutComponent {

}