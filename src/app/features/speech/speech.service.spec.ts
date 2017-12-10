import {
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { SpeechService } from './speech.service';
import { AppSettings } from '../../../app/appSettings.setting';
import { WebApiManager } from '../../shared/service/webApiManager.service';
import { AuthService } from '../../shared/service/auth.service';
import { Speech } from './model/speech.model';

describe('SpeechService', () => {

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                { provide: AppSettings.BaseAPIUrl, useValue: 'http://example.com' },
                WebApiManager, AuthService, SpeechService,
                { provide: XHRBackend, useClass: MockBackend },
            ]
        });
    });

    describe('getGlobalSearchSpeechCollection()', () => {

        it('should return an Observable<Array<Speech>>',
            inject([SpeechService, XHRBackend], (speechService, mockBackend) => {

                const mockResponse = {
                    data: [
                        { id: 0, title: 'Video 0' },
                        { id: 1, title: 'Video 1' },
                        { id: 2, title: 'Video 2' },
                        { id: 3, title: 'Video 3' },
                    ]
                };

                mockBackend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

                speechService.getGlobalSearchSpeechCollection().subscribe((speech) => {
                    let mySpeech = speech.data;
                    expect(mySpeech.length).toBe(4);
                    expect(mySpeech[0].title).toEqual('Video 0');
                    expect(mySpeech[1].title).toEqual('Video 1');
                    expect(mySpeech[2].title).toEqual('Video 2');
                    expect(mySpeech[3].title).toEqual('Video 3');
                });

            }));
    });
});