import React from 'react';
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux';

// Store
import { RootState } from '../../store';
import { Cargo } from '../../store/dock/types';
import { setActiveShip } from '../../store/ships/actions'

// Assets
import './CargoModal.scss';

export interface OwnProps {
    title: string
    cargoItem?: Cargo
}

export interface State {
    isOpen: boolean
}

class CargoModal extends React.Component<Props, State> {
    // -------------> Renders ------------- //
    // ---> Main
    public render(): JSX.Element {
        const { children } = this.props;

        return <div className={ "app-cargo-modal" }>
            <div onClick={ ( e ) => { this.open( e ) } } >
                { children }
            </div>
            
            { this.renderModal() }
        </div>
    }

    // ---> Modal
    private renderModal() {
        const { title } = this.props;


        return <div className={ "bg" + ( this.state.isOpen ? " open" : "" ) }>
            <div className="modal">
                <div className="title">{ title }</div>
            </div>
        </div>
    }

    // -------------> Init ------------- //
    constructor( props: Props ) {
        super( props );

        this.state = {
            isOpen: false
        }
    }

    componentDidMount() {
    }

    // -------------> Methods ------------- //
    // ---> Booleans
    private isActiveShip( id: string ): boolean {
        return this.props.activeShipId === id;
    }
    
    // ---> Actions
    public open( event: any): any {
        if ( event )
            event.preventDefault();
    
        this.setState( {
            isOpen: true
        });
    }

    public close( event: any): any {
        if ( event )
            event.preventDefault();
    
        this.setState( {
            isOpen: false
        });
    }

    public handleDrop( item: any ) {

    }
}

// ---> Redux data structure
// Append state to this.props
const mapStateToProps = ( { dock, ships }: RootState ) => {
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
type Props = OwnProps & ReduxProps;

// ---> Export
export default connect( mapStateToProps, mapDispatchToProps )( CargoModal );