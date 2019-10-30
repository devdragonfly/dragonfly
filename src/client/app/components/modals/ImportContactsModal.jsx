import React from "react";
// import ReactDOM from "react-dom";


export default class ImportContactsModal extends React.Component {


    // viewModalState = { show: false };

    constructor(props) {
        super(props);
        this.viewModalState = { show: false };
    }

    componentDidMount() {
        console.log('I was triggered during componentDidMount')
    }


    toggleModal(state) {
        console.log('I was triggered. modal btn')

        console.log(state);
        if (this.viewModalState.show) {
            this.viewModalState = { show: false };
            return;
        } else {
            this.viewModalState = { show: true };
            return;
        }

    }


    handleNewDragonflySubmit(btn) {
        console.log('I was triggered. submit btn')
        console.log(btn);
    }


    render() {
        // let imageName = this.props.image.split('/').pop().split('.')[0];


        var divStyle;

        if (this.props.show) {
            divStyle = {
                display: 'block'
            }
        } else {
            divStyle = {
                display: 'none'
            }
        }

        return (
            <div className="modal" style={divStyle}>
                <div className="modal-content" role="document">
                    <div className="modal-header">
                        <h4>Import Contact List (.xlsx)</h4>
                        <span onClick={this.props.onClose} className="close">&times;</span>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12">
                                <input onChange={this.props.handleSubmit} type="file" accept=".xlsx" className="form-control" id="input" placeholder="exel file" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}
