import React from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux';
import { DragSource, ConnectDragSource, ConnectDragPreview, DragPreviewImage, DragSourceConnector, DragSourceMonitor } from 'react-dnd'

// Store
import { RootState } from '../../store';
import { setIsDragging, setDragItemType } from '../../store/system/actions'

// Assets
import './CargoItem.scss';
import SVG_weight from '../../assets/weight.svg';
import SVG_draggable from '../../assets/draggable.svg';
import PNG_dragpreview from '../../assets/drag-preview.png';

export interface OwnProps {
    id: number,
    type: string
    volume: number,
    weight: number

    // Collected Props
    connectDragPreview: ConnectDragPreview
    connectDragSource: ConnectDragSource
    isDragging: boolean
}

class CargoItem extends React.Component<Props> {
    // -------------> Renders ------------- //
    // ---> Main
    public render() {
        const { volume, weight, connectDragSource, connectDragPreview } = this.props;

        return ( <>
            <DragPreviewImage connect={ connectDragPreview } src={ PNG_dragpreview } />
            <div ref={ connectDragSource } className={ "app-cargo-item anime-fade-in" + ( this.isDragging ? " isDragged" : "" ) } >
                <div className="volume">{ volume }</div>
    
                <div className="weight">
                    <img className="opacity%60" src={ SVG_weight } alt="Icon weight" />
                
                    <div className="text-right">
                        <span>{ weight } t</span>
                        <div className="total">{ weight * volume } t</div>
                    </div>
                </div>
                
                <img className="marker" src={ SVG_draggable } alt="Drag marker" />
            </div>
        </> )
    }
    
    // -------------> Getters & Setters ------------- //
    public get isDragging(): boolean {
        return this.props.isDragging;
    }
}

// DND source
const cargoItemSource = {
    isDragging( props: Props, monitor: DragSourceMonitor ) {
        return monitor.getItem().id === props.id
    },
    beginDrag( props: Props, monitor: DragSourceMonitor, component: Element ) {
        // Return the data describing the dragged item
        props.setIsDragging( true );
        props.setDragItemType( props.type );
        const item = { id: props.id, type: props.type }
        return item
    },
    endDrag( props: Props, monitor: DragSourceMonitor, component: Element ) {
        if ( !monitor.didDrop() ) {
            props.setIsDragging( false );
            // You can check whether the drop was successful
            // or if the drag ended but nobody handled the drop
            return
        }
    },
}

// DND collect
function collect( connect: DragSourceConnector, monitor: DragSourceMonitor ) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    }
}

// ---> Redux data structure
// Append state to this.props
const mapStateToProps = ( { dock, ships, system }: RootState ) => {
    return { };
}

// Append dispatch to this.props
const mapDispatchToProps = ( dispatch: ThunkDispatch<{}, {}, any> ) => {
    return {
        setIsDragging: ( isDragging: boolean ) => dispatch( setIsDragging( isDragging ) ),
        setDragItemType: ( itemType: string ) => dispatch( setDragItemType( itemType ) )
    }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
type Props = ReduxType & OwnProps;

export default  connect( mapStateToProps, mapDispatchToProps )( 
    DragSource( ( props: Props ) => props.type , cargoItemSource , collect )( CargoItem )
)
