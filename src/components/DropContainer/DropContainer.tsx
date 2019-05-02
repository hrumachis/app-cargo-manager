import React from 'react';
import { DropTarget, ConnectDropTarget, DropTargetMonitor, DropTargetConnector } from 'react-dnd'
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux';

// Store
import { RootState } from '../../store';
import { setActiveShip } from '../../store/ships/actions'

// Assets
import './DropContainer.scss';

export interface OwnProps {
    accepts: string[],
    lastDroppedItem?: any
    onDrop: ( item: any ) => void,
    onError?: ( item: any ) => boolean
  
    // Collected Props
    isError: boolean
    canDrop: boolean
    isOver: boolean
    connectDropTarget: ConnectDropTarget
}

class DropContainer extends React.Component<Props> {
    // -------------> Renders ------------- //
    // ---> Main
    public render(): JSX.Element {
        const { connectDropTarget } = this.props;

        return <div ref={ connectDropTarget } className={ "app-drop-container" + this.useClassVisible() + this.useClassActive() + this.useClassError() }>
            <div className="error-message">No capacity</div>
        </div>
    }

    // -------------> Getters & Setters ------------- //
    public get isAcceptedDrag(): boolean {
        return this.props.accepts.indexOf( this.props.dragItemType) > -1
    }

    // -------------> Methods ------------- //
    // ---> Booleans
    
    // ---> Actions
    public useClassVisible(): string { return ( this.isAcceptedDrag  && this.props.isDragging ) ? " visible" : ""; }
    public useClassActive(): string { return ( this.isAcceptedDrag  && this.props.isDragging && this.props.isOver ) ? " active" : ""; }
    public useClassError(): string { return ( this.props.isError && this.props.isOver ) ? " error" : ""; }
}

// ---> Redux data structure
// DND collect
function collect( connect: DropTargetConnector, monitor: DropTargetMonitor, props: OwnProps ) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        isError: ( props.onError ? props.onError( monitor.getItem() ) : false )
    }
}

// DND source
const shipContainerSource = {
    drop( props: OwnProps, monitor: DropTargetMonitor ) {
        let item = monitor.getItem();
        props.onDrop( item );
    },
}

// Append state to this.props
const mapStateToProps = ( { dock, ships, system }: RootState ) => {
    const { cargoItems } = dock;
    const { shipList, activeShipId, maxShips } = ships;
    const { isDragging, dragItemType } = system;
    
    return { cargoItems, shipList, activeShipId, maxShips, dragItemType, isDragging };
}

// Append dispatch to this.props
const mapDispatchToProps = ( dispatch: ThunkDispatch<{}, {}, any> ) => {
    return {
        setActiveShip: ( id: string ) => dispatch( setActiveShip( id ) )
    }
}

type ReduxProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
type Props = ReduxProps & OwnProps;

// ---> Export
export default connect( mapStateToProps, mapDispatchToProps )( DropTarget(
    ( props: Props ) => props.accepts,
    shipContainerSource,
    collect,
) ( DropContainer ) );