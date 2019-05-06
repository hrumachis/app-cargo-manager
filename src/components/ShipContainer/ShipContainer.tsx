import React from 'react';
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux';

// Store
import { RootState } from '../../store';
import { Ship } from '../../store/ships/types'
import { setActiveShip } from '../../store/ships/actions'

// Assets
import './ShipContainer.scss';
import { Types as CargoTypes } from '../CargoItem/types';
import SVG_drag from '../../assets/drag.svg';

// Components
import { AppCargoItem } from '../'

class ShipContainer extends React.Component<Props> {
    // -------------> Renders ------------- //
    // ---> Main
    public render(): JSX.Element {
        return <div className="app-ship-container scrollable">
            { this.renderCargoItems() }
        </div>
    }

    // ---> Cargo list
    public renderCargoItems() {
        if ( this.ship && !this.isEmptyShip )
            return this.ship.cargoItems.map( ( cargoItem, index ) => this.renderCargoItem( cargoItem.id, cargoItem.volume, cargoItem.weight, index ) );
        else if ( !this.ship )
            return <div className="empty-placeholder pos-center anime-fade-in">
                <div className="opacity%50 marg-top%xs">No ship selected</div>
            </div>
        else
            return <div className="empty-placeholder pos-center anime-fade-in">
                <img src={ SVG_drag } alt="Icon drag" />
                <div className="opacity%70"><span className="col-primary">Drag & Drop</span> cargo items here</div>
                <div className="opacity%50 marg-top%xs">Container is empty</div>
            </div>
    }

    // --> Cargo item
    public renderCargoItem( id: number, volume: number, weight: number, index: number ) {
        return <AppCargoItem type={ CargoTypes.SHIP } id={ id } volume={ volume} weight={ weight } key={ "s-"+id } ></AppCargoItem>
    }

    // -------------> Getters & Setters ------------- //
    get ship(): Ship | undefined {
        return this.props.shipList.find( ( obj ) => {
            return obj.id === this.props.activeShipId;
        } );
    }

    get isEmptyShip(): boolean | undefined {
        if ( this.ship )
            return this.ship.cargoItems.length <= 0;
        else
            return undefined;
    }

    // -------------> Methods ------------- //
    // ---> Booleans
    
    // ---> Actions
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
        setActiveShip: ( id: string ) => dispatch( setActiveShip( id ) )
    }
}

type ReduxProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
type Props = ReduxProps;

// ---> Export
export default connect( mapStateToProps, mapDispatchToProps )( ShipContainer );