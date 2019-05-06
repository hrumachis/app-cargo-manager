import React from 'react';
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux';

// Store
import { RootState } from '../../store';
import { setActiveShip, removeShipCargo, addShipCargo } from '../../store/ships/actions'

// Assets
import './Ships.scss';
import SVG_cargo from '../../assets/cargo.svg';
import SVG_ship from '../../assets/ship.svg';

// Componenets
import { AppDropContainer } from '../'
import { Types as CargoTypes } from '../CargoItem/types'
import { setIsDragging } from '../../store/system/actions';
import { Cargo } from '../../store/dock/types';
import { addDockCargo, removeDockCargo } from '../../store/dock/actions';
import { Ship } from '../../store/ships/types';

class Ships extends React.Component<ReduxProps> {
    // -------------> Renders ------------- //
    // ---> Main
    public render(): JSX.Element {
        return <div className="app-ships scrollable">
            { this.renderShips() }
        </div>
    }

    // ---> Ship list
    public renderShips(): JSX.Element[] | JSX.Element {
        if ( !this.isEmpty )
            return this.props.shipList.map( ( ship, index ) => 
                <div className={ "ship " + ( this.isActiveShip( ship.id ) ? "active" : "" ) } onClick={ ( e ) => { this.selectShip( ship.id, e ) } } key={ ship.id } >
                    <AppDropContainer onError={ item => this.onError( ship, item ) } accepts={ [ CargoTypes.DOCK ] } onDrop={ item => this.handleDrop( ship, item, index ) }></AppDropContainer>
                    <div className="name">
                        <img src={ SVG_ship } alt="Icon ship" />
                        <span>{ ship.name }</span>
                    </div>

                    <div className="volume">
                        <span className="opacity%50 marg-right">Volume</span>
                        <span>{ this.totalVolume( ship ) } / { ship.maxVolume }</span>
                    </div>

                    <div className="weight">
                        <span className="opacity%50 marg-right">Weight</span>
                        <span>{ this.totalWeight( ship ) } / { ship.maxWeight }</span>
                    </div>

                    <div className="cargo-placeholder">
                        <div className="quantity">{ ship.cargoItems.length }</div>
                        <img src={ SVG_cargo } alt="Icon ship" />
                    </div>
                </div>
            );
        else
            return <div className="empty-placeholder pos-center anime-fade-in">
                <img src={ SVG_ship } alt="Icon ship" />
                <div className="opacity%50 marg-top%xs">No ships are currently available</div>
            </div>
    }

    // -------------> Getters & Setters ------------- //
    public get isEmpty(): boolean | undefined {
        if ( this.props.shipList )
            return this.props.shipList.length <= 0;
        else
            return undefined;
    }

    // -------------> Init ------------- //
    componentDidMount() {
        if ( this.props.shipList[ 0 ] )
            this.selectShip( this.props.shipList[ 0 ].id, null );
    }

    // -------------> Methods ------------- //
    // ---> Booleans
    private isActiveShip( id: string ): boolean {
        return this.props.activeShipId === id;
    }
    
    private isError( ship: Ship, cargoItem: Cargo ): boolean {
        if ( !cargoItem || !ship ) return false;

        return ( 
            this.totalWeight( ship ) + cargoItem.weight * cargoItem.volume > ship.maxWeight ||
            this.totalVolume( ship ) + cargoItem.volume > ship.maxVolume
        )
    }

    // ---> Actions
    public onError( ship: Ship, item: any ): boolean {
        if ( !item ) return false;

        let cargoIndex: number = this.props.cargoItems.map( ( cargo ) => { return cargo.id; } ).indexOf( item.id );
        let cargoItem = this.props.cargoItems[ cargoIndex ];
        return this.isError( ship, cargoItem );
    }

    public totalVolume( ship: Ship ): number {
        let totalVolume: number = 0;

        if ( ship ) {
            ship.cargoItems.forEach( ( cargo ) => {
                totalVolume += cargo.volume;
            } );
        }

        return totalVolume;
    }

    public totalWeight( ship: Ship ): number {
        let totalWeight: number = 0;

        if ( ship ) {
            ship.cargoItems.forEach( ( cargo ) => {
                totalWeight += cargo.weight * cargo.volume;
            } );
        }

        return totalWeight;
    }

    public selectShip( id: string, event: any ): any {
        if ( event )
            event.preventDefault();
        
        this.props.setActiveShip( id );
    }

    public handleDrop( ship: Ship, item: any, index: number ) {
        let cargoIndex: number = this.props.cargoItems.map( ( cargo ) => { return cargo.id; } ).indexOf( item.id );
        let cargoItem = this.props.cargoItems[ cargoIndex ];
        
        if ( !this.isError( ship, cargoItem ) ) {
            this.props.removeDockCargo( item.id );
            this.props.addShipCargo( this.props.shipList[ index ].id, cargoItem )
        } 

        this.props.setIsDragging( false );
    }
    
}

// ---> Redux data structure
// Append state to this.props
const mapStateToProps = ( { dock, ships, system }: RootState ) => {
    const { cargoItems } = dock;
    const { shipList, activeShipId, maxShips } = ships;
    return { cargoItems, shipList, activeShipId, maxShips };
}

// Append dispatch to this.props
const mapDispatchToProps = ( dispatch: ThunkDispatch<{}, {}, any> ) => {
    return {
        setActiveShip: ( id: string ) => dispatch( setActiveShip( id ) ),
        setIsDragging: ( isDragging: boolean ) => dispatch( setIsDragging( isDragging ) ),
        addDockCargo: ( cargoItem: Cargo ) => dispatch( addDockCargo( cargoItem ) ),
        removeDockCargo: ( id: string ) => dispatch( removeDockCargo( id ) ),
        addShipCargo: ( id: string, cargoItem: Cargo ) => dispatch( addShipCargo( id, cargoItem ) ),
        removeShipCargo: ( id: string, cargoId: string ) => dispatch( removeShipCargo( id, cargoId ) ),
    }
}

type ReduxProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

// ---> Export
export default connect( mapStateToProps, mapDispatchToProps )( Ships );