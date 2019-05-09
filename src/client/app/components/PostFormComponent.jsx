import React from 'react';

export default class PostFormComponent extends React.Component {

  constructor (props) {
    super(props)
  }

  render() {
    if (!this.props.showForm) return null;
    return(
      <div className="form-horizontal">
        <div className="form-group">
          <label for="address" className="col-sm-2 control-label" style={{ fontWeight: 'normal'}}>Address</label>
          <div className="col-sm-6">
            <input type="text" className="form-control" id="address" placeholder="Address" value={this.props.address} onChange={this.props.updateAddressValue} />
          </div>
        </div>
        <div className="form-group">
          <label for="cityState" className="col-sm-2 control-label" style={{ fontWeight: 'normal'}}>City state</label>
          <div className="col-sm-6">
            <input type="text" className="form-control" id="cityState" placeholder="City state" value={this.props.cityState} onChange={this.props.updateCityStateValue} />
          </div>
        </div>
        <div className="form-group">
          <label for="pobox" className="col-sm-2 control-label" style={{ fontWeight: 'normal'}}>P.O. Box</label>
          <div className="col-sm-6">
            <input type="text" className="form-control" id="pobox" placeholder="P.O. Box" value={this.props.poBox} onChange={this.props.updatePoBoxValue} />
          </div>
        </div>
      </div>
    );
  }

}