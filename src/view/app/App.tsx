import React from 'react';
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux';

// Store
import { RootState } from '../../store';
import { setShipList, removeShipCargo, addShipCargo } from '../../store/ships/actions'
import { Ship } from '../../store/ships/types'
import { setCargoItems, removeDockCargo, addDockCargo } from '../../store/dock/actions'
import { Cargo } from '../../store/dock/types'
import { setIsDragging } from '../../store/system/actions'

// Assets
import './App.scss';
import '../../components/CargoItem/CargoItem.scss';
import SVG_add from '../../assets/add.svg';

// Componenets
import { AppShips, AppDock, AppShipContainer, AppDropContainer, AppCargoModal } from '../../components';
import { Types as CargoTypes } from '../../components/CargoItem/types';

export interface State {
    isReady: boolean
}

class App extends React.Component<ReduxProps, State> {
    // -------------> Renders ------------- //
    // ---> Main
    public render(): JSX.Element {
        const { isReady } = this.state;

        return <div className={ "app" + ( this.isDragging ? " isDragging" : "" ) } >
            <header className="flex flex-middle">
                <div className="brand-name">Cargo Manager</div>
            </header>
        
            <main>
                <div className="column-left">
                    <div className="ship-view">
                        <div className="title">
                            <span>Ship container</span>

                            <span className={ "marg-left%b opacity%100" + this.useClassHidden( !isReady ) }>
                                <small>Volume</small>
                                <span className="col-dark marg-left%s">
                                    { this.shipVolumePerc }
                                </span>
                            </span>

                            <span className={ "marg-left opacity%100" + this.useClassHidden( !isReady ) }>
                                <small>Weight</small>
                                <span className="col-dark marg-left%s">
                                    { this.shipWeightPerc }
                                </span>
                            </span>
                        </div>
                        <AppDropContainer onError={ item => this.onErrorShip( item ) } accepts={ [ CargoTypes.DOCK ] } onDrop={ item => this.handleShipDrop( item ) }></AppDropContainer>
                        <AppShipContainer></AppShipContainer>
                    </div>

                    <div className="dock">
                        <div className="title">
                            <span>Dock</span>

                            <span className={ "marg-left opacity%50" + this.useClassHidden( !isReady ) }> { this.props.cargoItems.length } / { this.props.maxCargo }</span>
                            <div className={ this.useClassHidden( !isReady ) }>
                                <AppCargoModal title="Create Cargo">
                                    <button className="marg-left%s">
                                        <img src={ SVG_add } alt="Icon add" />
                                    </button>
                                </AppCargoModal>
                            </div>
                        </div>

                        { this.renderPreloadDock() }
                    </div>
                </div>
        
                <div className="ships">
                    <div className="title">
                        <span>Ships</span>
                        <span className="marg-left opacity%50"> { this.props.shipList.length } / { this.props.maxShips }</span>
                    </div>
                    { this.renderPreloadShips() }
                </div>
            </main>
        </div>;
    }

    // ---> Dock preload render
    public renderPreloadDock(): JSX.Element {
        if ( this.state.isReady )
            return <>
                <AppDropContainer accepts={ [ CargoTypes.SHIP ] } onDrop={ item => this.handleDockDrop( item ) }></AppDropContainer>
                <AppDock></AppDock>
            </>
        else return <div className="loading"></div>
    }

    // ---> Ships  preload render
    public renderPreloadShips(): JSX.Element {
        if ( this.state.isReady )
            return <>
                <AppShips></AppShips>
            </>
        else return <div className="loading"></div>
    }

    // -------------> Init ------------- //
    constructor( props: ReduxProps ) {
        super( props );

        this.state = {
            isReady: false
        }
    }

    componentDidMount() {
        this.getInitData( this.props.userGuid );
    }

    // -------------> Getters & Setters ------------- //
    public get isDragging(): boolean { return this.props.isDragging }
    public get shipVolumePerc(): string {
        let result: number = 0;
        let ship: Ship | undefined = this.props.shipList.find( ( ship ) => { return ship.id === this.props.activeShipId; } );
        
        if ( ship ) {
            let totalVolume: number = this.totalVolumetShip( ship );
            result = 100 / ship.maxVolume * totalVolume;
        }

        return String( result.toFixed(2) ) + "%";
    }

    public get shipWeightPerc(): string {
        let result: number = 0;
        let ship: Ship | undefined = this.props.shipList.find( ( ship ) => { return ship.id === this.props.activeShipId; } );

        if ( ship ) {
            let totalWeight: number = this.totalWeightShip( ship )
            result = 100 / ship.maxWeight * totalWeight;
        }

        return String( result.toFixed(2) ) + "%";
    }

    // -------------> Methods ------------- //
    // ---> Booleans
    public isCargoType( type: string ): boolean {
        return this.props.dragItemType === type;
    }

    public isErrorDock( ship: Ship,cargoItem: Cargo ): boolean {
        return false;
    }

    public isErrorShip( ship: Ship, cargoItem: Cargo ): boolean {
        return ( 
            this.totalWeightShip( ship ) + cargoItem.weight * cargoItem.volume > ship.maxWeight ||
            this.totalVolumetShip( ship ) + cargoItem.volume > ship.maxVolume
        )
    }

    // ---> Actions
    public totalWeightShip( ship: Ship ) {
        let totalWeight: number = 0;

        if ( ship ) {
            ship.cargoItems.forEach( ( cargo ) => {
                totalWeight += cargo.weight * cargo.volume;
            } );
        }

        return totalWeight;
    }

    public totalVolumetShip( ship: Ship ) {
        let totalVolume: number = 0;

        if ( ship ) {
            ship.cargoItems.forEach( ( cargo ) => {
                totalVolume += cargo.volume;
            } );
        }

        return totalVolume;
    }

    public useClassHidden( state: boolean ): string {
        if ( state )
            return ' hidden'
        else return ''
    }

    public onErrorShip( item: any ): boolean {
        if ( !item ) return false;
        
        let ship: Ship | undefined = this.props.shipList.find( ( ship ) => { return ship.id === this.props.activeShipId; } );

        if ( !ship) return false;

        let cargoIndex: number = this.props.cargoItems.map( ( cargo ) => { return cargo.id; } ).indexOf( item.id );
        let cargoItem = this.props.cargoItems[ cargoIndex ];

        if ( !cargoItem) return false;

        return this.isErrorShip( ship, cargoItem );
    }

    public handleShipDrop( item: any ) {
        let index: number = this.props.cargoItems.map( ( cargo ) => { return cargo.id; } ).indexOf( item.id );
        let cargoItem = this.props.cargoItems[ index ];
        let ship: Ship | undefined = this.props.shipList.find( ( ship ) => { return ship.id === this.props.activeShipId; } );

        if ( !ship) return false;

        if ( !this.isErrorShip( ship, cargoItem) ) {
            this.props.removeDockCargo( item.id );
            this.props.addShipCargo( this.props.activeShipId, cargoItem )
        }

        this.props.setIsDragging( false );
    }

    public handleDockDrop( item: any ) {
        let ship: Ship | undefined = this.props.shipList.find( ( ship ) => { return ship.id === this.props.activeShipId; } );
        let cargoItem: Cargo | undefined;

        if ( ship )
            cargoItem = ship.cargoItems.find( ( cargo ) => { return cargo.id === item.id; } );

        if ( cargoItem ) {
            this.props.removeShipCargo( this.props.activeShipId, item.id )
            this.props.addDockCargo( cargoItem )
        }

        this.props.setIsDragging( false );
    }

    // ---> Api requests
    // Get init data
    public async getInitData( userGuid: string ) {
        const url = 'http://demos.dev.flinkefolk.lt/Home/GetInitData/userGuid=' + userGuid;

        let request = await fetch( url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {
                'userGuid': userGuid
            } )
        } );

        console.log ( request )
        if ( request.ok )
            request.json().then( res => {
                console.log( res )

                this.props.setShipList( res.ships );
                this.props.setCargoItems( res.dock.cargoItems );

                this.setState( {
                    isReady: true
                } );
            } )
        else {
            if ( request.status === 401 ) {
                // Check API_KEY and try again
                console.log( "Credentials error, checking API_KEY and trying again");
                console.log( userGuid.length > 0  )

                if ( userGuid.length > 0 )
                    this.getInitData( userGuid );
            }
        }

            /* GENERATE MOCK
            
            .then( res => res )
            .then( ( result ) => {
                    let res: any;

                    // If server offline generate data
                    if ( !result.ok )
                        res = this.genInit();
                    else
                        res = result.json();

                    // Connection timeout ~2s
                    setTimeout( () => {
                        if ( this.getRandInt( 0, 100 ) > 50 ) {
                            console.log( "Connection failed" );

                            // Try again
                            this.getInitData( userGuid );
                            return false;
                        }

                        this.props.setShipList( res.ships );
                        this.props.setCargoItems( res.dock.cargoItems );

                        this.setState( {
                            isReady: true
                        } );
                    }, this.getRandInt( 1200, 3000 ) );
                }, ( error ) => {
                    // Try again
                    this.getInitData( userGuid );
            } );*/
    }

    // ---> Generate
    private genInit() {
        var init = {
            ships: [
                { id: "0", name: "Lavite", maxWeight: 5000, maxVolume: 6520, cargoItems: [
                    { id: "18", weight: 5, volume: 652 },
                    { id: "19", weight: 4, volume: 52 },
                ] },
                { id: "1", name: "Lavite", maxWeight: 5000, maxVolume: 6520, cargoItems: [
                    { id: "20", weight: 5, volume: 652 },
                    { id: "21", weight: 4, volume: 52 },
                    { id: "22", weight: 3, volume: 152 },
                ] },
                { id: "2", name: "Lavite", maxWeight: 5000, maxVolume: 6520, cargoItems: [] },
                { id: "3", name: "Lavite", maxWeight: 5000, maxVolume: 6520, cargoItems: [] },
                { id: "4", name: "Lavite", maxWeight: 5000, maxVolume: 6520, cargoItems: [
                    { id: "23", weight: 5, volume: 652 },
                    { id: "24", weight: 0.8, volume: 52 },
                    { id: "25", weight: 3, volume: 152 },
                ] }
            ],
            dock: {
                cargoItems: [
                    { id: "0", weight: 5, volume: 652 },
                    { id: "1", weight: 8, volume: 52 },
                    { id: "2", weight: 10, volume: 152 },
                    { id: "3", weight: 51, volume: 452 },
                    { id: "4", weight: 0.8, volume: 652 },
                    { id: "5", weight: 4.5, volume: 52 },
                    { id: "6", weight: 51, volume: 452 },
                    { id: "7", weight: 5, volume: 652 },
                    { id: "8", weight: 45, volume: 52 },
                    { id: "9", weight: 32, volume: 152 },
                    { id: "10", weight: 51, volume: 452 },
                    { id: "11", weight: 5, volume: 652 },
                    { id: "12", weight: 45, volume: 52 },
                    { id: "13", weight: 32, volume: 152 },
                    { id: "14", weight: 51, volume: 452 },
                    { id: "16", weight: 51, volume: 452 },
                    { id: "17", weight: 51, volume: 452 },
                ]
            }
        }

        return init;
    }

    public getRandInt( min: number, max: number): number {
        return Math.floor( Math.random() * max ) + min ;
    }
}

// ---> Redux data structure
// Append state to this.props
const mapStateToProps = ( { dock, ships, system }: RootState ) => {
    const { cargoItems, maxCargo } = dock;
    const { shipList, activeShipId, maxShips } = ships;
    const { isDragging, dragItemType, userGuid } = system;

    return { cargoItems, maxCargo, shipList, activeShipId, maxShips, isDragging, dragItemType, userGuid };
}

// Append dispatch to this.props
const mapDispatchToProps = ( dispatch: ThunkDispatch<{}, {}, any> ) => {
    return {
        setShipList: ( shipList: Ship[] ) => dispatch( setShipList( shipList ) ),
        setCargoItems: ( cargoItems: Cargo[] ) => dispatch( setCargoItems( cargoItems ) ),
        setIsDragging: ( isDragging: boolean ) => dispatch( setIsDragging( isDragging ) ),
        addDockCargo: ( cargoItem: Cargo ) => dispatch( addDockCargo( cargoItem ) ),
        removeDockCargo: ( id: string ) => dispatch( removeDockCargo( id ) ),
        addShipCargo: ( id: string, cargoItem: Cargo ) => dispatch( addShipCargo( id, cargoItem ) ),
        removeShipCargo: ( id: string, cargoId: string ) => dispatch( removeShipCargo( id, cargoId ) ),
    }
}

type ReduxProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

// ---> Export
export default connect( mapStateToProps, mapDispatchToProps )( App );