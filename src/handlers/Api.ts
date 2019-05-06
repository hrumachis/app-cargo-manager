export default class Api {
    private urlOrigin: string = 'http://demos.dev.flinkefolk.lt';
    private userGuid: string;

    constructor( userGuid: string ) {
        this.userGuid = userGuid;
    }

    public async getInitData( successCallback?: CallableFunction, errorCallback?: CallableFunction ): Promise<void> {
        const path: string = "/Home/GetInitData";

        let request = await fetch( this.urlOrigin + path, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {
                'userGuid': this.userGuid
            } )
        } );

        this.handler( request, () => {
            this.getInitData( successCallback, errorCallback );
        }, successCallback, errorCallback );
    }

    private handler( request: Response, tryAgainCallback: CallableFunction, successCallback?: CallableFunction, errorCallback?: CallableFunction ): boolean {
        console.log( request)
        if ( request.ok ) {
                request.json().then( res => {
                    if ( successCallback )
                        successCallback( res );
                } )

            return true;
        } else {
            if ( request.status === 401 ) {
                // Check API_KEY and try again
                console.log( "Credentials error, checking API_KEY and trying again");

                if ( this.userGuid.length <= 0 )
                    return false;

                tryAgainCallback();
            } else {
                if ( errorCallback )
                    errorCallback();
            }
            
            return false;
        }
    }
}