import React from 'react';
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux';
// Store
import { RootState } from '../../store';
import { setActiveShip } from '../../store/ships/actions'

// Assets
import './Dock.scss';
import { Types as CargoTypes } from '../CargoItem/types';
import SVG_add from '../../assets/add.svg';

// Components
import { AppCargoItem } from '../'

class Dock extends React.Component<Props> {
    // -------------> Renders ------------- //
    // ---> Main
    public render(): JSX.Element {
        return <div className="app-dock scrollable">
            { this.renderDockItems() }
        </div>
    }

    // ---> Dock list
    public renderDockItems() {
        if ( this.props.cargoItems && !this.isEmptyDock )
            return this.renderCargoItems();
        else 
            return <div className="empty-placeholder pos-center anime-fade-in">
                <img src={ SVG_add } alt="Icon add" />
                <div className="opacity%70">Press <span className="col-primary">Create</span> icon</div>
                <div className="opacity%50 marg-top%xs">Dock is empty</div>
            </div>
    }
    
    // ---> Dock cargo items
    public renderCargoItems(): any {
        if ( this.props.cargoItems.length )
            return this.props.cargoItems.map( ( cargoItem, index ) =>
                <AppCargoItem id={ cargoItem.id } type={ CargoTypes.DOCK } volume={ cargoItem.volume} weight={ cargoItem.weight } key={ cargoItem.id } ></AppCargoItem>
            );
    }

    get isEmptyDock(): boolean | undefined {
        if ( this.props.cargoItems )
            return this.props.cargoItems.length <= 0;
        else
            return undefined;
    }

    // -------------> Init ------------- //
    componentDidMount() {
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

    return { cargoItems, shipList, activeShipId, maxShips  };
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
export default connect( mapStateToProps, mapDispatchToProps )( Dock );