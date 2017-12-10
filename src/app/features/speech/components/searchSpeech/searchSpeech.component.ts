import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SpeechService } from '../../speech.service';
import { SpeechSearch } from '../../model/speechSearch.model';
import { BusySpinnerService } from '../../../../shared/components/busyspinner/busyspinner.service';
import { SpeechConstant } from '../../speechConstants';

@Component({
    selector: 'search-speech',
    templateUrl: `./searchSpeech.component.html`,
    styleUrls: ['./searchSpeech.component.min.css']
})
export class SearchSpeechComponent {

    routeName: string = SpeechConstant.SearchSpeech_RouteName;
    speechSearch: SpeechSearch = new SpeechSearch();

    constructor(private router: Router, public speechService: SpeechService, public busySpinnerService: BusySpinnerService,
       public toastr: ToastsManager, public vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() { }

    globalSearch() {
        this.SearchSpeech();
    }

    advanceSearch() {
        this.SearchSpeech();
    }

    SearchSpeech() {
        this.busySpinnerService.dispatcher.next(true);

        this.updateFilterSpeechCollection();
    }

    updateFilterSpeechCollection() {
        this.speechService.getAdvanceSearchSpeechCollection(this.speechSearch)
            .subscribe(speechlist => {
                this.clearData();
                // this.sideMenuService.sideMenuDispatcher.next(speechlist);
            },
            err => {
                this.toastr.error('We are getting error to connect with server! Try again', 'Oops!'); console.log(err)
                this.busySpinnerService.dispatcher.next(false);
            });
    }

    clearData() {
        this.speechSearch = new SpeechSearch();
    }
}