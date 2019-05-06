import React from 'react';

export default class ImageModalComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let imageName = this.props.image.split('/').pop().split('.')[0];
    return (
      <div className={ this.props.columnClass }>
        <img src={ this.props.image } data-toggle="modal" data-target={ '#' + imageName } className="img-thumbnail"/>

        <div className="modal fade" id={ imageName } tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <img src={ this.props.image } data-toggle="modal" data-target="#myModal" style={{width: '100%'}} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}