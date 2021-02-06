## Fix

- pompt edit name doesnt work properly on mobile
    - maybe all setting should be in a separate window
    - being able to delete seq
    -> or use https://ionicframework.com/docs/api/modal
    - might use ion-range for stepPerBeat

- sometime note are not off because reload data before
    - try to always noteOff

## Todo

- home page with active sequences
    - being able to do track (sequence chaining)

- might use https://ionicframework.com/docs/api/progress-bar for save/load
   or https://ionicframework.com/docs/api/spinner
   - might use https://ionicframework.com/docs/api/refresher for reload

- output name / id, should be editable even if not plug so we can work remotely... eventually keep an history of the ids in a cache

- ion-fab play button

- edit instrument page beside midi sound:
    - we need samples
    - we need kind of "analog" sound using tonejs with sin/triangle/square sound and filters

- clicking add note should open a modal to select note

- simple way to delete a note (drag up)

- save cache?
    - for caching might use api cache https://web.dev/cache-api-quick-guide/ or indexedDb https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
    - save key with https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API ?

- randomize
    - group of sequence played
    - range of note played?
    - change picth every time sequence end

- github could have multiples sequences files but also repo / branch ??

