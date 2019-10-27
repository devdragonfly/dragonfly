import React from "react";
// import ReactDOM from "react-dom";


export default class BuildNewDragonflyModal extends React.Component {


    // viewModalState = { show: false };

    constructor(props) {
        super(props);
        this.viewModalState = { show: false};
    }

    componentDidMount() {
        console.log('I was triggered during componentDidMount')
    }


    toggleModal(state) {
        console.log('I was triggered. modal btn')

        console.log(state);
        if (this.viewModalState.show) {
            this.viewModalState = { show: false};
            return;
        } else {
            this.viewModalState = { show: true};
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
    
        if (this.viewModalState.show) {
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
                        Hello
                        <span onClick={this.toggleModal.bind(this, this)} className="close">&times;</span>
                    </div>
                    <div className="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div className="modal-footer">
                        <a onClick={this.handleNewDragonflySubmit.bind(this, this)} className="btn btn-success modal-submit-btn">Submit</a>
                    </div>

                </div>

            </div>
        );
    }

}
